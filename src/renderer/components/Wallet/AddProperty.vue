<template>
    <div class="mask">
        <div class="box">
            <div class="title">添加资产
                <span class="exit" @click='SET_ADDPROPERTY_STATE'></span>
            </div>

            <div class="contain clearfix">
                <div class="fl">
                    <div class="search">
                        <input type="text" :placeholder="$t('search')" @focus="__foucus" v-model="searchVal" />
                        <span class="search-icon" :class="{'focusIcon':focusIcon}" @click="__search"></span>
                    </div>

                    <div class="list">
                        <div class="list-item clearfix" v-for="(item,index) in currencyList" :key="index">
                            <img class="fl" :src="item.logoUrl" v-if="item.logoUrl"/>
                            <img src="./img/gitium@3x.png" v-else class="fl">
                            <span>{{item.name}}</span>
                            <input type="checkbox" class="fr" v-model="item.isChecked" @click='__selectC(item)' />
                        </div>
                    </div>
                </div>

                <div class="fl">
                    <div class="selectNum">
                        {{$t('wallet.selected')}}{{selectCList.length}} {{$t('wallet.num')}}
                    </div>
                    <div class="list">
                        <div class="list-item clearfix" v-for="(item,index) in selectCList" :key="index">
                            <img class="fl" :src="item.logoUrl" v-if="item.logoUrl"/>
                            <img src="./img/gitium@3x.png" v-else class="fl">
                            <span>{{item.name}}</span>
                            <span @click="__deleteF(index)" class="deleteC"></span>
                        </div>
                    </div>

                    <div class="br-btns clearfix">
                        <div @click='SET_ADDPROPERTY_STATE'>{{$t('cancel')}}</div>
                        <div @click="__sure">{{$t('confirm')}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            searchVal: "",
            focusIcon: false,
            currencyList: [],
            originArr: [], //储存原始的币种列表数据
            selectCList: []
        };
    },
    computed: {
        ...mapState({
            propertyList: state => state.Wallet.propertyList
        })
    },
    mounted() {
        this.__getCuurrercyList();
    },
    methods: {
        ...mapMutations(["SET_ADDPROPERTY_STATE", "SET_PROPERTY_LIST"]),
        //获取币种列表
        async __getCuurrercyList() {
            const res = await this.api.getCuurrercyList();
            var arr = [];
            Object.assign(arr, res.data);
            this.originArr = arr;
            res.data.forEach(val => {
                let flag = this.propertyList.some(subVal => {
                    return val.name == subVal.name;
                });
                this.$set(val, "isChecked", flag);
            });

            this.currencyList = res.data;
            var arr1 = this.propertyList;
            var arr2 = [];
            Object.assign(arr2, arr1);
            this.selectCList = arr2;
        },
        __foucus() {
            this.focusIcon = true;
        },
        __search() {
            let arr1 = [];
            this.originArr.forEach(val => {
                if (val.name.indexOf(this.searchVal) >= 0) {
                    arr1.push(val);
                }
            })
            this.currencyList = arr1;
        },
        __selectC(item) {
            if (!item.isChecked) {
                let flag = this.selectCList.some(val => {
                    return val.name == item.name;
                });
                if (!flag) this.selectCList.push(item);
            }
        },
        __deleteF(index) {
            this.currencyList.forEach(val => {
                if (this.selectCList[index].name == val.name) {
                    val.isChecked = false;
                }
            });
            this.selectCList.splice(index, 1);
        },
        __sure() {
            if (this.selectCList.length == 0) {
                this.$Toast("请选择添加资产");
                return;
            }
            this.SET_PROPERTY_LIST(this.selectCList);
            this.SET_ADDPROPERTY_STATE();
        }
    }
};
</script>

<style lang="scss" scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.box {
    width: 600px;
    height: 550px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
}

.title {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    border-bottom: 1px solid #dfdfe0;
    font-size: 16px;
}

.exit {
    width: 21px;
    height: 21px;
    display: block;
    background: url("./img/popup_cancel@3x.png");
    background-size: 100% 100%;
    float: right;
    margin: 15px 20px;
}

.contain {
    height: 500px;
    > div {
        width: 300px;
        height: 500px;
    }
    > div:first-child {
        position: relative;
        border-right: 1px solid #dfdfe0;
        .search {
            width: 254px;
            height: 30px;
            margin: 20px auto 0;
            position: relative;
            input {
                width: 100%;
                border-radius: 4px;
                height: 25px;
                line-height: 25px;
                border: 1px solid #efefe0;
                background: #f5f6f7;
                padding-left: 10px;
                outline: none;
            }
            input::-webkit-input-placeholder {
                padding-left: 26px;
            }
        }
    }
    > div:nth-child(2) {
        position: relative;
    }
    .selectNum {
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        color: #999;
    }
    .list {
        position: absolute;
        top: 50px;
        width: 100%;
        height: 450px;
        overflow-y: scroll;
        overflow-x: hidden;
        &-item {
            height: 30px;
            width: 100%;
            line-height: 30px;
            margin: 5px 0;
            padding: 0 20px;
            > img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: #d9d9da;
            }
            > span:nth-child(2) {
                margin-left: 10px;
            }
        }
    }
}
.search-icon {
    display: block;
    width: 14px;
    height: 14px;
    background: url("./img/search-icon.png");
    background-size: 100% 100%;
    position: absolute;
    top: 5px;
    right: 230px;
}
.focusIcon {
    right: 10px;
}
.deleteC {
    display: block;
    float: right;
    width: 12px;
    height: 12px;
    background: url(./img/addFriends_clear@3x.png);
    background-size: 100% 100%;
    margin-top: 9px;
    margin-right: 20px;
}
.br-btns {
    width: 100%;
    position: absolute;
    bottom: 20px;
    div {
        float: right;
        width: 66px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        margin-right: 18px;
    }
    > div:first-child {
        background: #dbdbdb;
    }
    > div:nth-child(2) {
        background: #3f61a6;
        color: #fff;
    }
}
</style>