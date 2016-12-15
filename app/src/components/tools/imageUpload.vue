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
export default {
    data() {
            return {
                image: "/static/images/default_image.png",
                close: false
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
                    let img = new Image();
                    reader.onload = function(e) {
                        if (input.files[0].size > 204800) { //图片大于200kb则压缩
                            img.src = e.target.result;
                            img.onload = function() {
                                _self.image = _self.compress(img);
                                _self.close = true;
                                _self.upload(_self.image, 'base64');
                            }
                        } else {
                            _self.image = e.target.result;
                            _self.close = true;
                            _self.upload(_self.image, 'base64');
                        }
                    }
                    reader.readAsDataURL(input.files[0]);
                    return 1;
                }
            },
            compress: function(img) {
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
                if (ndata.length > 165399) {
                    ndata = canvas.toDataURL(img.src.split(';')[0].split(':')[1], 165399 / ndata.length);
                }
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
            upload: function(data, url) {
                 // common.$emit('show-load');
                console.log('sdfsdfsfdsfdsdf');
               this.$emit("postUrl",'dfdfdf');

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
