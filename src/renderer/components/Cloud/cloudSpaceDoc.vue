<template>
    <div>
        <div class="fileList">
            <div v-for="(item,index) in fileList" :key="index" class="fileList-item" @contextmenu="__showOperation(index)">
                <!-- <div @click="__getAllFill(item.id)"></div> -->
                <div v-if="item.fileType==4&&item.mime=='pdf'" class="pdf"></div>
                <div v-if="item.fileType==4&&item.mime=='txt'" class="txt"></div>
                <div v-if="item.fileType==5&&item.mime=='zip'" class="zip"></div>
                <div v-if="item.fileType==4&&item.mime=='war'" class="war"></div>
                <div v-if="item.fileType==4&&item.mime=='tar'" class="tar"></div>
                <div v-if="item.fileType==4&&item.mime=='exe'" class="exe"></div>
                <div v-if="item.fileType==4&&item.mime=='rar'" class="rar"></div>
                <div v-if="item.fileType==4&&(item.mime=='doc'||item.mime=='docx')" class="doc"></div>
                <div v-if="item.fileType==4&&item.mime=='pptx'" class="ppt"></div>
                <div v-if="item.fileType==4&&(item.mime=='xls'||item.mime=='xlsx')" class="excel"></div>
                <div v-if="!item.isInputName" @click="__selectUpdateName(item)">{{item.fileName}}</div>
                <input type="text" v-model="item.fileName" @blur="__updateName(item)" v-else />

                <div class="delete" v-if="opaIdx==index">
                    <div @click='__out'>
                        <span class="exit"></span>
                    </div>
                    <div @click="__delete(item)">删除</div>
                    <div @click="__downloadFile(item)">下载</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FileSaver from "file-saver";
export default {
    data() {
        return {
            id: 0,
            fileList: [],
            fileName: "",
            opaIdx: 99
        };
    },
    components: {},
    computed: {},
    mounted() {
        this.__getAllFill(0);
    },
    methods: {
        async __getAllFill(id) {
            this.id = id;
            const res = await this.api.cloudGetAllFile({
                // dirFlag: 1,
                fileType: 4
            });
            res.data.forEach(val => {
                this.$set(val, "isInputName", false);
            });
            this.fileList = res.data;
        },
        __out() {
            this.opaIdx = 99;
        },
        __showOperation(index) {
            this.opaIdx = index;
        },
        __delete(item) {
            this.api.cloudDelete({ id: item.id }).then(res => {
                this.__getAllFill(this.id);
            });
        },
        __updateName(item) {
            item.fileName = event.currentTarget.value;
            item.isInputName = false;
            this.api
                .cloudRename({
                    id: item.id,
                    name: item.fileName
                })
                .then(res => {
                    if (res.code != 0) item.fileName = this.fileName;
                    this.$Toast(res.msg);
                });
        },
        // 下载文件
        async __downloadFile(item) {
            function transformArrayBufferToBase64(buffer) {
                var binary = "";
                var bytes = new Uint8Array(buffer);
                for (var len = bytes.byteLength, i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return window.btoa(binary);
            }
            const res = await this.api.cloudDownload(item.id);
            FileSaver.saveAs(
                "data:image/png;base64," + transformArrayBufferToBase64(res),
                item.fileName
            );
        }
    },
    watch: {},
    created() {}
};
</script>

<style lang='scss'  scoped>
.title {
    font-size: 18px;
    display: flex;
    height: 50px;
    background: #f8f8f8;
    > div {
        line-height: 50px;
        display: flex;
        align-items: center;
        margin-left: 20px;
        position: relative;
        > input {
            position: absolute;
            opacity: 0;
            width: 60px;
        }
        .icon {
            width: 20px;
            height: 20px;
            background-size: 100% 100%;
            background-image: url("./img/head_mai@3x.png");
            display: block;
        }
        .icon1 {
            width: 16px;
            height: 14px;
            background-image: url("./img/createfolder.png");
            margin-left: 20px;
        }
        > p {
            padding-left: 14px;
            font-size: 14px;
        }
    }
}
.fileList {
    display: flex;
    &-item {
        width: 118px;
        margin-top: 20px;
        margin-left: 12px;
        position: relative;
        > div:nth-child(2) {
            margin-top: 10px;
            text-align: center;
            overflow: hidden;
        }
        > input {
            margin-top: 10px;
            width: 118px;
        }
    }
}
.delete {
    position: absolute;
    line-height: 20px;
    background: #eaeaea;
    width: 70px;
    text-align: center;
    bottom: 35px;
    right: -20px;
}
.pdf {
    width: 61px;
    height: 61px;
    background: url(./img/WechatIMG1144.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.doc {
    width: 61px;
    height: 61px;
    background: url(./img/word.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.ppt {
    width: 61px;
    height: 61px;
    background: url(./img/ppt.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.txt {
    width: 61px;
    height: 61px;
    background: url(./img/TXT.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.zip {
    width: 61px;
    height: 61px;
    background: url(./img/zip.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.war {
    width: 61px;
    height: 61px;
    background: url(./img/war.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.tar {
    width: 61px;
    height: 61px;
    background: url(./img/tar.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.exe {
    width: 61px;
    height: 61px;
    background: url(./img/exe.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.rar {
    width: 61px;
    height: 61px;
    background: url(./img/rar.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.excel {
    width: 61px;
    height: 61px;
    background: url(./img/excel.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.exit {
    position: absolute;
    top: 0;
    right: 0;
    width: 16px;
    height: 16px;
    background: #fff url("./img/popup_cancel@3x.png");
    background-size: 100% 100%;
}
</style>
