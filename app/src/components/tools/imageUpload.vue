<template>
    <div class="img_upload">
        <form>
            <input type="file" @change="previewImg" class="input_image" name="photo" accept="image/png,image/jpeg,image/jpg,image/bmp">
            <img v-bind:src="image" class="image_show" v-if="!showurl">
            <img v-bind:src="showurl" class="image_show" v-if="showurl">
            <img src="/static/icons/close_selected.png" v-show="showurl" @click="delImage" class="close_image">
        </form>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
export default {
    data() {
            return {
                image: "/static/images/default_image.png",
                close: false,
                size: 0
            }
        },
        props: {
            param: {
                default: null
            },
            value: '',
            showurl: ''
        },
        methods: {
            previewImg: function(e) {
                let _self = this;
                let input = e.target;
                if (input.files && input.files[0]) {
                    let reader = new FileReader();
                    _self.size = input.files[0].size;
                    let img = new Image();
                    reader.onload = function(e) {
                        if (input.files[0].size > 204800) { //图片大于200kb则压缩
                            img.src = e.target.result;
                            img.onload = function() {
                                _self.image = _self.compress(img);

                                _self.close = true;
                                _self.upload(_self.image);
                            }
                        } else {
                            _self.image = e.target.result;
                            _self.close = true;
                            _self.upload(_self.image);
                        }
                    }
                    reader.readAsDataURL(input.files[0]);
                    return 1;
                }
            },
            compress: function(img) {
                let _self = this;
                let initSize = img.src.length;
                let width = img.width;
                let height = img.height;
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext('2d');
                let ratio;
                if ((ratio = width * height / 300000) > 1) {
                    ratio = Math.sqrt(ratio);
                    width /= ratio;
                    height /= ratio;
                } else {
                    ratio = 1;
                }
                canvas.width = width;
                canvas.height = height;
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, width, height);

                let ndata = canvas.toDataURL(img.src.split(';')[0].split(':')[1], 1);
                if (ndata.length > 3000000) {
                    ndata = canvas.toDataURL(img.src.split(';')[0].split(':')[1], 3000000 / ndata.length);
                }

                function convertBase64UrlToBlob(urlData) {

                    var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
                    var ab = new ArrayBuffer(bytes.length);
                    var ia = new Uint8Array(ab);
                    for (var i = 0; i < bytes.length; i++) {
                        ia[i] = bytes.charCodeAt(i);
                    }

                    return new Blob([ab], {
                        type: 'image/png'
                    });
                }

                console.log(convertBase64UrlToBlob(ndata));
                 _self.size = convertBase64UrlToBlob(ndata).size;

                canvas.width = canvas.height = 0;
                return ndata;
            },
            delImage: function(e) {
                e.target.parentElement.reset();
                this.close = false;
                this.image = "/static/images/default_image.png";
                this.value = '';
                this.showurl = '';
            },
            upload: function(file) {
                // common.$emit('show-load');
                file = file.split(',')[1];
                let _self = this;
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'filesService',
                    biz_method: 'getQiNiuToken',
                    version: 1,
                    time: 0,
                    sign: '',
                    biz_param: {
                        bucketName: _self.param.name
                    }
                };
                console.log(common.difTime);
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.getQiniuToken(url, body, function(res) {
                    console.log(res);
                    if (res.code == '1c01') {
                        var timestamp = new Date().getTime();
                        var data = new FormData();
                        data.append("file", file);
                        data.append("key", timestamp);
                        data.append("token", res.biz_result.token);
                        var pic = file;
                        var url = 'http://upload.qiniu.com' + '/putb64/' + _self.size;
                        var xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState == 4) {
                                let res = JSON.parse(xhr.response);
                                console.log(res.key);
                            }
                        }
                        xhr.open("POST", url, true);
                        xhr.setRequestHeader("Content-Type", "application/octet-stream");
                        xhr.setRequestHeader("Authorization", "UpToken " + res.biz_result.token);
                        xhr.send(pic);
                    } else {

                    }
                }, function(err) {
                    console.log(err);
                })
                this.$emit("postUrl", 'dfdfdf');

            }
        }
}
</script>
<style scoped>
.img_upload {
    position: relative;
}

.img_upload .input_image {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
}

.img_upload .image_show {
    width: 100%;
    height: 4rem;
}

.img_upload .close_image {
    position: absolute;
    top: -16px;
    right: -14px;
    width: 30px;
}
</style>
