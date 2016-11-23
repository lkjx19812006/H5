<template>
<<<<<<< HEAD
  <div class="hello" >
     <mt-navbar v-model="active">
	  <mt-tab-item id="tab-container1">选项一</mt-tab-item>
	  <mt-tab-item id="tab-container2">选项二</mt-tab-item>
	  <mt-tab-item id="tab-container3">选项三</mt-tab-item>
	</mt-navbar>

    <mt-tab-container v-model="active">
	  <mt-tab-container-item id="tab-container1">
	    <mt-cell v-for="n in 10" :title="'内容 ' + n" />
	  </mt-tab-container-item>
	  <mt-tab-container-item id="tab-container2">
	    <mt-cell v-for="n in 4" :title="'测试 ' + n" />
	  </mt-tab-container-item>
	  <mt-tab-container-item id="tab-container3">
	    <mt-cell v-for="n in 6" :title="'选项 ' + n" />
	  </mt-tab-container-item>
   </mt-tab-container>

   
  </div>

=======
    <div class="content">
        <h1 class="page-title">Pull down</h1>
        <p class="page-loadmore-desc">在列表顶端, 按住 - 下拉 - 释放可以获取更多数据</p>
        <p class="page-loadmore-desc">此例请使用手机查看</p>
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                <ul class="page-loadmore-list">
                    <li v-for="item in list" class="page-loadmore-listitem">{{ item }}</li>
                </ul>
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                    <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
                </div>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                    <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
                </div>
            </mt-loadmore>
        </div>
    </div>
>>>>>>> 5274ded178ac91cd5d5390b4dd8fe5a2df64d4b4
</template>
<script>

export default {
<<<<<<< HEAD
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      active: 'tab-container1'
    }
  }
=======
    data() {
            return {
                list: [],
                topStatus: '',
                wrapperHeight: 0,
                allLoaded: false,
                bottomStatus: '',
            };
        },

        methods: {
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom(id) {
                setTimeout(() => {
                    let lastValue = this.list[this.list.length - 1];
                    if (lastValue < 40) {
                        for (let i = 1; i <= 10; i++) {
                            this.list.push(lastValue + i);
                        }
                    } else {
                        this.allLoaded = true;
                    }
                    this.$refs.loadmore.onBottomLoaded(id);
                }, 1500);
            },

            handleTopChange(status) {
                this.topStatus = status;
            },

            loadTop(id) {
                setTimeout(() => {
                    let firstValue = this.list[0];
                    for (let i = 1; i <= 10; i++) {
                        this.list.unshift(firstValue - i);
                    }
                    this.$refs.loadmore.onTopLoaded(id);
                }, 1500);
            }
        },

        created() {
            for (let i = 1; i <= 20; i++) {
                this.list.push(i);
            }
        },

        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
>>>>>>> 5274ded178ac91cd5d5390b4dd8fe5a2df64d4b4
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
<<<<<<< HEAD

 
=======
.content {
    padding-bottom: 100px;
}

.page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px;
    &:last-of-type {
        border-bottom: solid 1px #eee;
    }
}

.page-loadmore-listitem {
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px #eee;
    text-align: center;
    &:first-child {
        border-top: solid 1px #eee;
    }
}

.page-loadmore-wrapper {
    margin-top: -1px;
    overflow: scroll;
    padding-bottom: 120px;
}

.mint-spinner {
    display: inline-block;
    vertical-align: middle;
}

.mint-loadmore-top span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
}

.mint-loadmore-bottom span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
}
>>>>>>> 5274ded178ac91cd5d5390b4dd8fe5a2df64d4b4
</style>
