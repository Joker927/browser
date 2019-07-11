<template>
    <div @click.stop="__judge">
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
                <div v-if="!item.isInputName" @click="__selectUpdateName(item)" style="text-align:center;width:100%;font-size:13px;">{{item.fileName}}</div>
                <input type="text" v-model="item.fileName" @blur="__updateName(item)" v-else />

                <div class="delete" v-if="opaIdx==index">
                    <div @click="__open(item)">打开</div>
                    <div class="border"></div>
                    <div @click="__downloadFile(item)">下载</div>
                    <div @click="__delete(item)">删除</div>
                    <div class="border"></div>
                    <div @click="__selectUpdateName(item)">重命名</div>
                    <div @click="__showProperty(item,index)">属性</div>
                </div>
                <div class="property" v-if="propertyIdx==index">
                    <div class="title">
                        属性
                        <span class="exit" @click="propertyIdx=99"></span>
                    </div>
                    <div class="content">
                        <div class="content-img clearfix">
                            <div v-if="item.fileType==0" class="file"></div>
                            <div v-if="item.fileType==3" class="img"></div>
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
                            <div>{{item.fileName}}</div>
                        </div>
                        <div class="content-info">
                            <div>
                                <span>类型：</span>{{item.mime}}
                            </div>
                            <div>
                                <span>位置：</span>{{item.location}}
                            </div>
                            <div>
                                <span>大小：</span>{{item.size}}
                            </div>
                            <div>
                                <span>上传日期：</span>{{item.updateDate}}
                            </div>
                        </div>
                    </div>
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
            opaIdx: 99,
            propertyIdx: 99
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
        getTime(timestamp) {
            var time = new Date(timestamp);
            var ye = time.getFullYear();
            var mn = time.getMonth() + 1;
            var da = time.getDate();
            var h = time.getHours();
            var m = time.getMinutes();
            var s = time.getSeconds();
            mn = mn < 10 ? "0" + mn : mn;
            da = da < 10 ? "0" + da : da;
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            s = s < 10 ? "0" + s : s;
            return ye + "-" + mn + "-" + da + " " + h + ":" + m + ":" + s;
        },
        __judge() {
            this.opaIdx = 99;
        },
        //点击打开操作
        __open(item) {
            if (item.fileType == 3) {
                //图片
                this.__previewImg(item);
            } else if (item.fileType == 0) {
                //文件夹
                this.__getAllFill(item.id, item.fileName, true);
            }
        },
        __selectUpdateName(item) {
            item.isInputName = true;
            this.fileName = item.fileName;
        },
        __showProperty(item, index) {
            this.propertyIdx = index;
            console.log(item);
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
    flex-wrap: wrap;
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
        width: 120px;
        height: 120px;
        border-radius: 5px;
        border: 1px solid transparent;
        background: #e9e9e9;
        display: flex;
        align-content: center;
        flex-wrap: wrap;
        margin: 10px;
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
.exit {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 12px;
    height: 12px;
    background: #fff url("./img/popup_cancel@3x.png");
    background-size: 100% 100%;
}
.delete {
    position: absolute;
    background: #ffffff;
    width: 196px;
    top: 35px;
    left: 59px;
    z-index: 1;
    box-shadow: 1px 1px #ededed;
    > div:not(.border) {
        height: 32px;
        line-height: 32px;
        text-indent: 2em;
        margin: 10px 0;
    }
    > div:hover {
        background: #ecf0f7;
    }
    .border {
        border-bottom: 1px solid #e8eaed;
    }
}
.property {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 522px;
    height: 300px;
    color: #333;
    border: 1px solid #e2e2e3;
    .title {
        height: 32px;
        line-height: 32px;
        background: #f3f3f3;
        text-indent: 2em;
        font-size: 14px;
        border-bottom: 1px solid #e2e2e3;
    }
    .content {
        width: 496px;
        margin: 12px auto;
        border: 1px solid #e2e2e3;
        height: 240px;
        padding: 18px;
        &-img {
            border-bottom: 1px solid #e2e2e3;
            padding-bottom: 14px;
            > div:nth-of-type(1) {
                float: left;
                width: 34px;
                height: 34px;
            }
            > div:nth-of-type(2) {
                line-height: 34px;
                margin-left: 44px;
                font-weight: 600;
            }
        }
        &-info {
            > div {
                margin-top: 20px;
                margin-left: 10px;
                > span {
                    color: #666;
                }
            }
        }
    }
}
</style>
