<template>
    <div class="options">
        <p>{{$t('cloud.userGuide')}}</p>
        <div class="clearfix guide">
            <!-- <p class="fr download"
               @click="__download">{{$t('cloud.userGuide')}}</p> -->
            <div class="file fl ">
                <a download
                   href='http://139.196.98.22/resource/ipfs/go-ipfs_v0.4.19_linux-amd64.tar.gz'>
                    <div class="icon tar"></div>
                    <p class="highlight cp">
                        go-ipfs_v0.4.20_linux-amd64.tar

                    </p>

                </a>
            </div>
            <div class="file fl">
                <a download
                   href="http://139.196.98.22/resource/ipfs/go-ipfs_v0.4.20_windows-amd64.zip">
                    <div class="icon zip"></div>
                    <p class="highlight cp">
                        go-ipfs_v0.4.20_windows-amd64.zip
                    </p>
                </a>
            </div>
            <div class="file fl">
                <a :download="$t('cloud.userGuide').pdf"
                   href="http://139.196.98.22/resource/ipfs/操作手册.pdf">
                    <div class="icon pdf"></div>
                    <p class="highlight cp">
                        {{$t('cloud.userGuide')}}.pdf</p>
                </a>
            </div>

        </div>
        <p>{{$t('cloud.sellTitle')}}</p>
        <div>
            <ul class="list">
                <li>
                    <span class="title">{{$t('cloud.time')}}</span>
                    <div class="select">
                        <span class="cp"
                              :class="{'active':form.type==1}"
                              @click="__setForm('type',1)">{{$t('cloud.typeArr[0]')}}</span>
                        <span class="cp"
                              :class="{'active':form.type==2}"
                              @click="__setForm('type',2)">{{$t('cloud.typeArr[1]')}}</span>
                        <span class="cp"
                              :class="{'active':form.type==3}"
                              @click="__setForm('type',3)">{{$t('cloud.typeArr[2]')}}</span>
                        <span class="cp"
                              :class="{'active':form.type==4}"
                              @click="__setForm('type',4)">{{$t('cloud.typeArr[3]')}}</span>
                        <span class="cp"
                              :class="{'active':form.type==5}"
                              @click="__setForm('type',5)">{{$t('cloud.typeArr[4]')}}</span>
                    </div>
                    <span class="tip">{{$t('cloud.tip1')}}</span>
                </li>
                <li>
                    <span class="title">{{$t('cloud.sellTitle1')}}</span>
                    <div class="select">
                        <input type="Number"
                               v-model="form.size"
                               placeholder=0>
                        <span class="cp"
                              :class="{'active':form.sizeType=='mb'}"
                              @click="__setForm('sizeType','mb')">mb</span>
                        <span class="cp"
                              :class="{'active':form.sizeType=='gb'}"
                              @click="__setForm('sizeType','gb')">gb</span>
                        <span class="cp"
                              :class="{'active':form.sizeType=='tb'}"
                              @click="__setForm('sizeType','tb')">tb</span>

                    </div>
                    <span class="tip">{{$t('cloud.tip')}}</span>
                </li>

                <li>
                    <span class="title">{{$t('cloud.sellTitle2')}}</span>
                    <div class="select">
                        <input type="Number"
                               placeholder=0
                               v-model="form.price">
                        <span>GIT</span>
                    </div>
                    <span class="tip">
                        <strong>{{$t('cloud.tip2[0]')}} <i class="color">{{deposit}}</i> GIT {{$t('cloud.tip2[1]')}}</strong>
                        <span>{{$t('cloud.tip2[2]')}}</span></span>

                </li>
                <li>
                    <span class="title">{{$t('cloud.sellTitle3')}}</span>
                    <div class="select">
                        <input type="Number"
                               placeholder="0"
                               v-model="form.netSpeed">
                        <span>{{$t('cloud.default')}}mbps</span>
                    </div>
                    <span class="tip">
                        <span>2mbps</span></span>
                </li>
                <li>
                    <span class="title">{{$t('cloud.sellTitle4')}}</span>
                    <div class="select">
                        <input type="text"
                               class="path"
                               placeholder=""
                               v-model="form.ipfsServer">

                    </div>
                    <span class="tip">
                        {{$t('cloud.cloudTips[5]')}}
                    </span>

                    <!-- <div class="cp gray">
                        <span class="button ">选择路径</span>
                    </div> -->

                </li>
            </ul>
            <div class="btn">
                <div class="tip">
                    <!-- <span>計費換算: 約 xxx mb 每 xxx 日</span>
                    <span>現階市場均價:約 xxx mb 每 xxx 日</span> -->
                </div>
                <span></span>
                <div class="cp "
                     @click="__confirm">
                    <span class="button">{{$t('confirm')}}</span>
                </div>
            </div>
        </div>
        <div class="mask"
             v-if="dialogState"
             @click.self="__out">
            <div class="details">
                <p class="title">{{$t('cloud.tip4')}}</p>
                <div class="btn">
                    <span class="cp"
                          @click="__updateCloudStorage">{{$t('cloud.tip5')}}</span>
                    <span class="cp"
                          @click="__out">{{$t('cancel')}}</span>
                </div>
                <div class="tips">
                    <input type="checkbox"
                           v-model="isOnce">
                    <span class="cp"
                          @click="__toggle">{{$t('cloud.tip6')}}</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import FileSaver from 'file-saver'
import JSZip from 'jszip'
import fs from 'fs'
import path from 'path'
export default {
    props: {},
    data() {
        return {
            form: {
                ipfsServer: '127.0.0.1:5001',
                currency: 'GIT',
                sizeType: 'gb',
                size: 500,
                price: 20,
                netSpeed: '2',
                type: 1
            },
            amount: 0,
            order: {},
            dialogState: false,
            isOnce: JSON.parse(localStorage.getItem('ISONCE')) || false
        }
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            addressList: state => state.UserInfo.addressList,
            seed: state => state.UserInfo.seed,
            propertyList: state => state.Wallet.propertyList
        }),
        deposit() {
            return Math.ceil(Number(this.form.price) * 0.25)
        }
    },
    methods: {
        ...mapMutations(['SET_LOADING_STATE']),

        __toggle() {
            this.isOnce = !this.isOnce
        },
        async __updateCloudStorage() {
            // currency	string
            // 币种 默认=GIT
            // ipfsServer	string
            // ipfs服务器地址 tcp/ipip:port
            // netSpeed	integer($int64)
            // 网络速度 Mbps
            // price	number
            // 价格: ? mb/日
            // size	integer($int64)
            // 空间大小
            // sizeType	string
            // 空间大小类型 mb,gb,tb
            // type	integer($int32)
            // 服务类型 1=1个月，2=2个月，3=3个月，4=半年，5=1年

            //设置是否再次弹窗
            localStorage.setItem('ISONCE', this.isOnce)

            this.__out()
            let verifyKey = ['size', 'price', 'netSpeed', 'ipfsServer']

            let flag = verifyKey.some(key => {
                if (this.form[key].typeOf === 'string') {
                    return this.form[key].trim() == ''
                } else {
                    return this.form[key] == false
                }
            })

            if (flag) {
                this.$Toast(this.$t('cloud.tip7'))
                return
            }
            this.__createOrder()
        },
        async __createOrder() {
            this.paid = false
            this.dialogVisible = false

            const res = await this.api.cloudStorageCreate(this.form)
            console.log(res, 'cloudStorageCreate')
            if (res.code === 0) {
                this.order = res.data

                //TODO: 转账暂不支持小数先ceil处理
                this.amount = Math.ceil(this.order.orderAmount)
                // console.log(this.amount, ' this.amount')
                this.confirmVisible = true

                this.__transferToSeedAddress()
            } else {
                this.$Toast(res.msg)
            }
        },
        async __transferToSeedAddress() {
            let contractAddress = null
            for (var i = 0; i < this.propertyList.length; i++) {
                let val = this.propertyList[i]
                if (val.name == this.form.currency) {
                    contractAddress = val.address
                    break
                }
            }

            this.SET_LOADING_STATE(true)
            let total = await this.__getMuchCurrenty(contractAddress)
            console.log(total, '0')
            if (this.amount > total) {
                this.$Toast(this.$t('cloud.tip8'))
                this.SET_LOADING_STATE(false)
                return
            }
            let callbackArr = []
            let params = {
                seed: this.seed,
                addressList: this.addressList,
                amount: this.amount,
                toAddress: this.order.walletAddress,
                contractAddress: contractAddress
            }
            const res = await this.api.transferToSeedAddress(params)

            if (res.status !== 1) {
                this.$Toast(res.msg)
            } else {
                this.order['hash'] = res.data.hash
            }
            console.log(res, '__transferToSeedAddress')
            await this.__orderCallback()
            this.SET_LOADING_STATE(false)
            this.paid = true
        },
        async __orderCallback() {
            let params = {
                orderNo: this.order.orderNo,
                payHash: this.order.hash,
                success: true
            }
            const res = await this.api.cloudOrderCallback(params)

            if (res.code === 0) {
                this.$bus.emit('cloudRefresh')
                this.$bus.emit('refresh' + 'cloud')
            }
            console.log(res, '__orderCallback')
        },

        //获取多币种余额
        async __getMuchCurrenty(address) {
            let arr = []
            let total = 0
            this.propertyList.forEach(val => {
                arr.push(val.address)
            })
            let params = {
                contractAddressList: arr,
                addressList: this.addressList
            }
            const res = await this.api.getMuchCurrentySum(params)
            if (res.status === 1) {
                res.data.forEach((val, index) => {
                    if (val.address == address) {
                        total = val.totalValue
                    }
                })
            }
            return total
        },
        __setForm(key, value) {
            this.form[key] = value
        },
        async __download() {
            let attachmentList = [
                'http://139.196.98.22/resource/ipfs/go-ipfs_v0.4.20_windows-amd64.zip',
                'http://139.196.98.22/resource/ipfs/go-ipfs_v0.4.19_linux-amd64.tar.gz',
                'http://139.196.98.22/resource/ipfs/操作手册.pdf'
            ]
            // // FileSaver
            // const zip = new JSZip()
            // const promises = []
            // console.log(path, 'path')
            // attachmentList.forEach(async item => {
            //     const promise = await require(item)
            //     console.log(promise)
            // 下载文件, 并存成ArrayBuffer对象
            //   let arrName = item.attachmentHashcode.split('/')
            //  let fileName = arrName[arrName.length - 1] // 获取文件名
            //   zip.file(fileName, data, { binary: true }) // 逐个添加文件
            // promises.push(promise)
            // })
            // Promise.all(promises).then(() => {
            //     zip.generateAsync({ type: 'blob' }).then(content => {
            //         // 生成二进制流
            //         FileSaver.saveAs(content, 'default.zip') // 利用file-saver保存文件
            //     })
            // })
        },

        async __confirm() {
            this.isOnce = JSON.parse(localStorage.getItem('ISONCE'))
            if (this.isOnce) {
                this.__updateCloudStorage()
            } else {
                this.dialogState = true
            }
        },
        __out() {
            this.dialogState = false
        }
    },
    watch: {},
    created() {}
}
</script>

<style lang='scss'  scoped>
.color {
    color: #3f61a6;
    font-style: normal;
    font-weight: bold;
}
.options {
    > p {
        margin: 20px 0 10px;
        font-size: 16px;
    }
    > div {
        border: 1px solid #e4e4e5;
        .list {
            .active {
                border: 1px solid #3f61a6;
                color: #3f61a6;
                font-weight: bold;
            }
            > li {
                height: 30px;
                font-size: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #e4e4e5;
                .title {
                    padding: 0 20px;
                }
                .select {
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                    > * {
                        padding: 0 14px;
                        margin: 0 2px;
                        border-radius: 12px;
                    }
                    > span {
                        height: 24px;
                        line-height: 24px;
                    }
                    > input {
                        height: 24px;
                        max-width: 60px;
                        color: #3f61a6;
                        border: 1px solid #3f61a6;
                        outline: none;
                    }
                    > input::placeholder {
                        color: #3f61a6;
                    }
                    .path {
                        max-width: 100%;
                        width: 100%;
                    }
                }
                .btn {
                    height: 30px;
                    font-size: 14px;
                    line-height: 30px;
                    color: #fff;
                    background: #3f61a6;
                    padding: 0 10px;
                }
                .tip {
                    font-size: 12px;
                    color: #888888;
                    margin-right: 4px;
                    strong {
                        font-weight: normal;
                    }
                    > span {
                        font-size: 11px;
                    }
                }
            }
        }
        > .btn {
            display: flex;
            justify-content: space-between;
            color: #fff;
            height: 28px;
            .tip {
                display: flex;
                font-size: 12px;
                span {
                    padding: 0 10px;
                }
                span:nth-of-type(1) {
                    line-height: 28px;
                    background: #3e3a39;
                }
                span:nth-of-type(2) {
                    color: #888;
                    align-self: center;
                }
            }

            > div:nth-of-type(2) {
                display: flex;
                span {
                    // width: 100px;
                    height: 100%;
                    line-height: 28px;
                    text-align: center;
                }
                > span:nth-of-type(1) {
                    background: #3f61a6;
                }
            }
        }
        .gray {
            background: #3e3a39;
        }
        .button {
            display: inline-block;
            height: 28px;

            width: 70px;
            text-align: center;
            color: #fff;
            line-height: 28px;
        }
    }
}
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
}
.download {
    padding: 10px;
}
.file {
    width: 120px;
    margin: 20px;
    a {
        color: #3f61a6;
        text-decoration: none;
    }
    .icon {
        width: 65px;
        height: 65px;
        margin: 0 auto;
    }
    .tar {
        background: url('./img/tar.png') no-repeat;
        background-size: 80% 80%;
    }
    .zip {
        background: url('./img/zip.png') no-repeat;
        background-size: 80% 80%;
    }
    .pdf {
        background: url('./img/pdf.png') no-repeat;
        background-size: 80% 80%;
    }
    p {
        // padding: 20px;
        word-break: break-all;
        text-align: center;
    }
}
.guide {
    margin-bottom: 30px;
}
.mask {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
    overflow: auto;
    .details {
        position: absolute;
        left: 50%;
        top: 55%;
        width: 260px;
        transform: translate(-50%, -50%);
        text-align: center;
        background: #ffffff;
        .title {
            height: 45px;
            line-height: 45px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        .btn {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);

            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 40px;
            line-height: 40px;
            span {
                flex-grow: 1;
            }
            .isLoading {
                background: url('./img/loading.gif') no-repeat 10px center;
                background-size: 20px 20px;
            }
            > :nth-of-type(1) {
                // background: #000;
                border-right: 1px solid rgba(0, 0, 0, 0.1);
            }
        }
        .tips {
            padding: 10px;
            text-align: left;
            > span {
                margin-left: 6px;
                color: #3e3a39;
            }
        }
    }
}
</style>
