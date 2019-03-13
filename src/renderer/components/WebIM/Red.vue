<template>
    <div class="shade">
        <div class="contain">
            <div class="exit" @click="__exit"></div>
            <div class="title">发红包</div>

            <div class="clearfix num">
                <div class="fl">金额</div>
                <div class="fl">
                    <input type="text" v-model="num" />
                </div>
                <div class="fl" @click="currentyShow=true">
                    {{select.symbol}}
                    <div v-if="currentyShow">
                        <div v-for="(item,index) in propertyList" :key="index" @click.stop='__select(item)'>
                            {{item.symbol}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="explain">
                <textarea placeholder="说明" v-model="explain"></textarea>
            </div>

            <div class="btn" @click="__sendRed">塞钱进钱包</div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: ["userIdx", "userId", "userName"],
    data() {
        return {
            num: "",
            currentyShow: false,
            select: "",
            explain: "",
            collectionAddress: ""
        };
    },
    mounted() {
        this.__getUserInfo();
        this.select = this.propertyList[0];
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            addressList: state => state.UserInfo.addressList,
            seed: state => state.UserInfo.seed,
            propertyList: state => state.Wallet.propertyList
        })
    },
    methods: {
        __exit() {
            this.$emit("changeStatus", false);
        },
        __sureTransfer() {
            this.__transferToSeedAddress();
        },
        __select(item) {
            this.select = item;
            this.currentyShow = false;
        },
        //获取对方用户信息
        async __getUserInfo() {
            const res = await this.api.userInfo({ id: this.userId });
            this.collectionAddress = res.data.collectionAddress;
        },
        //发红包
        async __sendRed() {
            let param = {
                amount: this.num,
                collectionAddress: this.userInfo.collectionAddress,
                contractAddress: this.select.address,
                currency: this.select.name,
                dec: this.explain,
                num: this.num,
                receiverUserId: this.userId,
                senderUserId: this.userInfo.userId,
                type: 1
            };
            const res = await this.api.sendRed(param);
            this.$Toast(res.msg);
            if (res.code == 0) {
                this.__exit();
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.shade {
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.4);
}
.contain {
    width: 90%;
    height: 74%;
    background: #fff;
    margin: 0 auto;
    padding-top: 1px;
    margin-top: 10px;
    position: relative;
}
.exit {
    width: 14px;
    height: 14px;
    position: absolute;
    background: url(./img/link_cancel.png);
    background-size: 100%;
    top: 2px;
    right: 2px;
}
.title {
    margin-top: 10px;
    text-align: center;
    font-weight: 600;
}
.num {
    margin-top: 10px;
    margin-left: 4px;
    line-height: 20px;
    input {
        width: 100px;
        height: 20px;
        outline: none;
        border: none;
        background: #efefef;
        border-radius: 8px;
        margin-left: 4px;
        padding-left: 10px;
    }
    > div:last-child {
        height: 20px;
        width: 40px;
        background: #efefef;
        margin-left: -10px;
        border-radius: 8px;
        text-align: center;
        color: #3f61a6;
        font-weight: 600;
        position: relative;
        > div {
            position: absolute;
            background: #efefef;
            border-radius: 8px;
            left: -10px;
            > div {
                height: 20px;
            }
        }
    }
}
.explain {
    textarea {
        width: 90%;
        resize: none;
        margin-left: 5%;
        margin-top: 20px;
        outline: none;
        border: none;
    }
}
.btn {
    color: #fff;
    background: #cd3333;
    text-align: center;
    width: 90%;
    height: 26px;
    line-height: 26px;
    margin-left: 5%;
    margin-top: 20px;
    border-radius: 13px;
}
</style>


