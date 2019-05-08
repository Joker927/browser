<template>
    <div>
        <div class="title">
            <div>
                <input type="file" ref="file" @change="__uploadFile('file')" />
                <span class="icon"></span>
                <p>上传</p>
            </div>
            <div @click="__createFolder">
                <span class="icon icon1"></span>
                <p>新建文件夹</p>
            </div>
        </div>
        <div class="fileArr">
            <div v-for="(item,index) in fileArr" :key="index" @click="__fileArrGoFile(item,index)">
                <span v-if="index!=0">></span>&nbsp;{{item.fileName}}
            </div>
        </div>

        <div class="fileList">
            <div class="upload">
                <input type="file" ref="file1" @change="__uploadFile('file1')" />
                <div>上传文件</div>
            </div>
            <div v-for="(item,index) in fileList" :key="index" class="fileList-item" @contextmenu="__showOperation(index)">
                <div v-if="item.fileType==0" class="file" @click="__getAllFill(item.id,item.fileName,true)"></div>
                <div v-if="item.fileType==3" class="img" @click="__previewImg(item)"></div>
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
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            id: 0,
            fileArr: [{ id: 0, fileName: "我的云盘" }],
            fileList: [],
            fileName: "",
            opaIdx: 99,
            imgData: ""
        };
    },
    components: {},
    computed: {},
    mounted() {
        this.__getAllFill(0);
    },
    methods: {
        ...mapMutations(["SET_PREVIEWIMG_STATE", "SET_LOADING_STATE"]),
        __out() {
            this.opaIdx = 99;
        },
        async __getAllFill(id, fileName, isPush) {
            if (isPush) {
                this.fileArr.push({
                    id: id,
                    fileName: fileName
                });
            }

            this.id = id;
            const res = await this.api.cloudGetAllFile({
                pid: id
            });
            res.data.forEach(val => {
                this.$set(val, "isInputName", false);
            });
            this.fileList = res.data;
        },
        __fileArrGoFile(item, index) {
            this.__getAllFill(item.id, item.fileName, false);
            this.fileArr = this.fileArr.slice(0, index + 1);
        },
        __showOperation(index) {
            this.opaIdx = index;
        },
        __delete(item) {
            this.api.cloudDelete({ id: item.id }).then(res => {
                this.__getAllFill(this.id);
                this.opaIdx = 99;
            });
        },
        // 创建目录
        async __createFolder() {
            const res = await this.api.cloudCreateFolder({
                folderName: "新建文件夹",
                pid: this.id
            });
            this.__getAllFill(this.id);
        },
        __selectUpdateName(item) {
            item.isInputName = true;
            this.fileName = item.fileName;
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
        // 上传文件
        __uploadFile(ref) {
            let file = this.$refs[ref];
            let formData = new FormData();
            formData.append("file", file.files[0]);
            formData.append("id", this.id);
            this.api.cloudUploadFile(formData).then(res => {
                this.$Toast(res.msg);
                this.__getAllFill(this.id);
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
        // 下载文件
        async __downloadFile(item) {
            const res = await this.api.cloudDownload(item.id);
            FileSaver.saveAs(
                "data:image/png;base64," +
                    this.transformArrayBufferToBase64(res),
                item.fileName
            );
        },
        async __previewImg(item) {
            this.SET_LOADING_STATE(true);
            const res = await this.api.cloudDownload(item.id);
            this.SET_LOADING_STATE(false);
            this.SET_PREVIEWIMG_STATE({
                src:
                    "data:image/png;base64," +
                    this.transformArrayBufferToBase64(res)
            });
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
    border-bottom: 1px solid #eaeaea;
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
    .upload {
        width: 118px;
        height: 104px;
        margin-top: 20px;
        margin-left: 12px;
        position: relative;
        background: url("./img/group_addPic@3x.png") no-repeat center 0px;
        background-size: 61px 61px;
        input[type="file"] {
            position: absolute;
            width: 118px;
            height: 94px;
            opacity: 0;
        }
        div {
            position: absolute;
            bottom: 16px;
            text-align: center;
            width: 100%;
        }
    }
    &-item {
        width: 118px;
        margin-top: 20px;
        margin-left: 12px;
        position: relative;
        .file {
            width: 65px;
            height: 61px;
            background: url(./img/folder.png);
            background-size: 100% 100%;
            margin: 0 auto;
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
        .img {
            width: 51px;
            height: 42px;
            background: url(./img/home_edit_film@3x.png);
            background-size: 100% 100%;
            margin: 14px auto;
        }
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

    > div {
        height: 20px;
        border-bottom: 1px solid #ffffff;
    }
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

.fileArr {
    height: 30px;
    line-height: 30px;
    background: #f8f8f8;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    > div {
        margin-left: 5px;
    }
}
</style>
