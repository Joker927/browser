<template>
    <div class="mask"
         v-if="storageDialogState">
        <div class="box">
            <div class="title">
                <p v-if="isUpload">{{$t('email.upload')}}</p>
                <p v-else>{{$t('email.delete')}}</p>
                <span class="exit cp"
                      @click="__out"></span>
            </div>

            <div class="fileList">
                <div v-for="(item,index) in storageList"
                     :key="index"
                     class="fileList-item cp"
                     @click="__selectStorage(item)">
                    <input type="checkbox"
                           v-model="item.selected">
                    <div class="storage-item"
                         :class="'bgImg'+(index+1)"></div>
                    <div>空间{{item.id}}</div>

                </div>
            </div>
            <div class="btn">
                <span class="cp confirm"
                      @click="__confirm">{{$t('confirm')}}</span>
                <span class="cp cancel"
                      @click="__out">{{$t('cancel')}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            storageList: [], //空间列表
            storageId: '' //当前空间id
        }
    },
    components: {},
    computed: {
        ...mapState({
            storageDialogState: state => state.Mail.storageDialogState,
            isUpload: state => state.Mail.isUpload
        })
    },
    mounted() {},
    methods: {
        ...mapMutations(['SET_STORAGEDIALOG_STATE', 'SET_STORAGEIDS']),
        //获取我的空间列表
        async __getAllStorage() {
            const res = await this.api.cloudStorageList({
                optType: 2
            })

            this.storageList = res.data
            this.storageList.forEach(item => {
                this.$set(item, 'selected', false)
            })
        },
        __selectStorage(item) {
            item.selected = !item.selected
        },
        __out() {
            this.SET_STORAGEDIALOG_STATE(false)
        },
        __confirm() {
            let ids = []
            this.storageList.forEach(item => {
                if (item.selected) ids.push(item.id)
            })
            this.SET_STORAGEIDS(ids)
            this.__out()
            this.$bus.emit('emailCloudOperate')
        }
    },
    watch: {
        storageDialogState: {
            handler() {
                if (this.storageDialogState) {
                    this.__getAllStorage()
                }
            },
            immediate: true
        }
    },
    created() {}
}
</script>

<style lang='scss'  scoped>
.mask {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
    overflow: auto;
    .box {
        position: absolute;
        left: 50%;
        top: 20%;
        width: 660px;
        transform: translate(-50%, -50%);
        text-align: center;
        background: #ffffff;
    }
}

.title {
    display: flex;
    height: 40px;
    background: #f8f8f8;
    border-bottom: 1px solid #eaeaea;
    > p {
        font-size: 16px;
        line-height: 40px;
        padding-left: 10px;
    }
}
.fileList {
    display: flex;
    flex-wrap: wrap;
    max-height: 400px;
    overflow: auto;
    padding: 20px;
    &-item {
        position: relative;
        background: #f8f8f8;
        margin: 5px;
        padding: 5px;
        border-radius: 4px;
        input {
            position: absolute;
            right: 4px;
            top: 4px;
        }
    }
}

.exit {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 12px;
    height: 12px;
    background: url('./img/popup_cancel@3x.png');
    background-size: 100% 100%;
}
.btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
    background: #f8f8f8;
    border-top: 1px solid #eaeaea;

    > span {
        width: 100px;
        height: 30px;
        line-height: 30px;
    }
    .confirm {
        color: #ffffff;
        background: #3f61a6;
    }
    .cancel {
    }
}
.storage-item {
    width: 61px;
    height: 61px;
    margin: 0 10px;
}
.bgImg1 {
    background: url(./img/disk1.png);
    background-size: 100% 100%;
}
.bgImg2 {
    background: url(./img/disk2.png);
    background-size: 100% 100%;
}
.bgImg3 {
    background: url(./img/disk3.png);
    background-size: 100% 100%;
}
.bgImg4 {
    background: url(./img/disk4.png);
    background-size: 100% 100%;
}
.bgImg5 {
    background: url(./img/disk5.png);
    background-size: 100% 100%;
}
.bgImg6 {
    background: url(./img/disk6.png);
    background-size: 100% 100%;
}
.bgImg7 {
    background: url(./img/disk7.png);
    background-size: 100% 100%;
}
.bgImg8 {
    background: url(./img/disk8.png);
    background-size: 100% 100%;
}
.bgImg9 {
    background: url(./img/disk9.png);
    background-size: 100% 100%;
}
.bgImg10 {
    background: url(./img/disk10.png);
    background-size: 100% 100%;
}
.bgImg11 {
    background: url(./img/disk11.png);
    background-size: 100% 100%;
}
.bgImg12 {
    background: url(./img/disk12.png);
    background-size: 100% 100%;
}
</style>
