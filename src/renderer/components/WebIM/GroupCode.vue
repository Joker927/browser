<template>
    <div class="mask">
        <div class="box">
            <div class="title">
                {{GroupCodeId.groupName}}
                <span class="exit" @click="SET_GROUPCODE_STATE"></span>
            </div>
            <div class="code" id="qrcode"></div>
            <div class="setMoney" @click="__download">{{$t('webim.downloadQRCode')}}</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import QRCode from "qrcodejs2";
import FileSaver from "file-saver";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapState({
            GroupCodeId: state => state.WebImQueue.GroupCodeId
        })
    },
    mounted() {
        this.__code();
    },
    methods: {
        ...mapMutations(["SET_GROUPCODE_STATE"]),
        __code() {
            var obj = {
                typeQr: 3,
                groupId: this.GroupCodeId.groupId
            };
            this.qrcode = new QRCode(document.getElementById("qrcode"), {
                text: JSON.stringify(obj),
                width: 300,
                height: 300,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        },
        transformArrayBufferToBase64(buffer) {
            var binary = "";
            var bytes = new Uint8Array(buffer);
            for (var len = bytes.byteLength, i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        },
        __download() {
            FileSaver.saveAs(document.querySelector("#qrcode img").src, this.GroupCodeId.groupName);
        }
    }
};
</script>

<style lang="scss" scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
}
.title{
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    line-height: 50px;
}
.box {
    width: 580px;
    height: 456px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
}
.exit {
    width: 21px;
    height: 21px;
    display: block;
    background: url("./img/popup_cancel@3x.png") no-repeat;
    background-size: 80% 80%;
    float: right;
    margin: 8px 8px;
}
.amount {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translate(-50%, 0);
    font-weight: 600;
    font-size: 20px;
}
.code {
    margin: 16px 140px 0;
}
.setMoney {
    margin-top: 18px;
    text-align: center;
    font-weight: 600;
}
.inputAmount {
    margin-top: 66px;
    line-height: 38px;
    margin-left: 52px;
    > div:first-child {
        font-weight: 600;
    }
}
.inputs {
    margin-left: 12px;
    > div:first-child {
        input {
            height: 38px;
            outline: none;
            background: #efefef;
            border: 1px solid #d6d6d6;
            border-right: none;
            width: 196px;
            padding-left: 20px;
        }
    }
    > div:nth-child(2) {
        margin-top: 1px;
        height: 38px;
        line-height: 38px;
        background: #efefef;
        border: 1px solid #d6d6d6;
        border-left: none;
        width: 100px;
        position: relative;
        text-align: center;
        > div {
            position: absolute;
            top: 38px;
            z-index: 1;
            div {
                height: 38px;
                line-height: 38px;
                width: 100px;
                background: #efefef;
                border: 1px solid #d6d6d6;
                border-bottom: none;
            }
            div:first-child {
                border-top: none;
            }
            div:last-child {
                border: 1px solid #d6d6d6;
            }
        }
    }
}
.btns {
    position: absolute;
    bottom: 90px;
    left: 52px;
    div {
        width: 66px;
        height: 32px;
        line-height: 32px;
        text-align: center;
    }
    > div:first-child {
        background: #3f61a6;
        color: #fff;
    }
    > div:nth-child(2) {
        background: #dbdcdc;
        color: #333;
        margin-left: 12px;
    }
}
</style>