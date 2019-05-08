<template>
    <div>
        <div class="fileList">
            <div v-for="(item,index) in fileList" :key="index" class="fileList-item" @contextmenu="__showOperation(index)">
                <div @click="__previewImg(item)"></div>
                <div v-if="!item.isInputName" @click="__selectUpdateName(item)">{{item.fileName}}</div>
                <input type="text" v-model="item.fileName" @blur="__updateName(item)" v-else />
                <div class="delete" v-if="opaIdx==index">
                    <div @click="__delete(item)">删除</div>
                    <div @click="__downloadFile(item)">下载</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
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
        ...mapMutations(["SET_PREVIEWIMG_STATE","SET_LOADING_STATE"]),
        async __getAllFill(id) {
            this.id = id;
            const res = await this.api.cloudGetAllFile({
                // dirFlag: 1,
                fileType:3
            });
            res.data.forEach(val => {
                this.$set(val, "isInputName", false);
            });
            this.fileList = res.data;
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
                "data:image/png;base64," + this.transformArrayBufferToBase64(res),
                item.fileName
            );
        },
        async __previewImg(item) {
            this.SET_LOADING_STATE(true);
            const res = await this.api.cloudDownload(item.id);
            this.SET_LOADING_STATE(false);
            this.SET_PREVIEWIMG_STATE({
                src: "data:image/png;base64," + this.transformArrayBufferToBase64(res)
            })
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
        > div:first-child {
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
}
</style>
