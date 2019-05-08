<template>
    <div>
        <!-- <div class="title">
            <div>
                <input type="file" id="file" @change="__uploadFile" />
                <span class="icon"></span>
                <p>上传</p>
            </div>
            <div @click="__createFolder">
                <span class="icon icon1"></span>
                <p>新建文件夹</p>
            </div>
        </div> -->

        <div class="fileList">
            <div v-for="(item,index) in fileList" :key="index" class="fileList-item">
                <div></div>
                <div v-if="!item.isInputName" @click="__selectUpdateName(item)">{{item.fileName}}</div>
                <input type="text" :value="item.fileName" @blur="__updateName(item)" v-else/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fileList: []
        };
    },
    components: {},
    computed: {},
    mounted() {
        this.__getAllFill();
    },
    methods: {
        async __getAllFill() {
            const res = await this.api.cloudGetAllFile({
                // dirFlag: 1,
                // pid: 0
            });
            res.data.forEach(val => {
                this.$set(val,'isInputName',false);
            })
            this.fileList = res.data;
        },
        // 创建目录
        async __createFolder() {
            const res = await this.api.cloudCreateFolder({
                folderName: "新建文件夹",
                pid: 0
            });
            this.__getAllFill();
        },
        __selectUpdateName(item) {
            item.isInputName = true;
        },
        __updateName(item) {
            item.fileName = event.currentTarget.value;
            item.isInputName = false;
            this.api.cloudRename({
                id: item.id,
                name: item.fileName
            });
        },
        // 上传文件
        async __uploadFile() {
            let file = document.querySelector('#file');
            let formData = new FormData();
            formData.append("file", file.files[0]);
            formData.append("id", 24);
            const res = await this.api.cloudUploadFile(formData);
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
        >input{
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
        overflow: hidden;
        margin-top: 20px;
        margin-left: 12px;
        > div:first-child {
            width: 65px;
            height: 61px;
            background: url(./img/folder.png);
            background-size: 100% 100%;
            margin: 0 auto;
        }
        > div:nth-child(2) {
            margin-top: 10px;
            text-align: center;
        }
        >input{
            margin-top: 10px;
            width: 118px;
        }
    }
}
</style>
