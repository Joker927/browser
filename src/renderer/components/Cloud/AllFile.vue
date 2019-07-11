<template>
    <div class="box"
         @click.stop="__judge">
        <div class="title">
            <div>
                <input type="file"
                       ref="file"
                       @change="__uploadFile('file')" />
                <span class="icon"></span>
                <p>上传</p>
            </div>
            <div @click="__createFolder">
                <span class="icon icon1"></span>
                <p>新建文件夹</p>
            </div>
            <div class="arrangement">
                <span class="column"
                      @click="__changeSortMenu"
                      v-if="!isStorageList"></span>
                <span class="row"
                      @click="__changeDirection"></span>
            </div>
        </div>
        <div class="sort"
             v-show="sortMenu">
            <ul>
                <li :class="{'active':sort==='fileName'}"
                    @click="__sortList('fileName')">文件名排序</li>
                <li :class="{'active':sort==='size'}"
                    @click="__sortList('size')">大小排序</li>
                <li :class="{'active':sort==='createDate'}"
                    @click="__sortList('createDate')">上传时间排序</li>
            </ul>
            <ul>
                <li :class="{'active':sortType==='2'}"
                    @click="__sortType('2')">升序</li>
                <li :class="{'active':sortType==='1'}"
                    @click="__sortType('1')">降序</li>
            </ul>
        </div>
        <div class="fileArr">
            <div v-for="(item,index) in fileArr"
                 :key="index"
                 @click="__fileArrGoFile(item,index)">
                <span v-if="index!=0">></span>&nbsp;{{item.fileName}}
            </div>
        </div>

        <div class="fileList">
            <router-link tag="div"
                         :to="{name:'cloud', params: { type:0 }}"
                         v-if="isStorageList&&!isLandscape">
                <div class="upload">
                    <div>新增空间</div>
                </div>
            </router-link>
            <div class="upload"
                 v-if="!isStorageList&&!isLandscape">
                <input type="file"
                       ref="file1"
                       @change="__uploadFile('file1')" />
                <div>上传文件</div>
            </div>
            <div v-for="(item,index) in renderArr"
                 :key="index"
                 class="fileList-item"
                 @contextmenu="__showOperation(index)">
                <div class="item"
                     :class="{'row':isLandscape}">
                    <div v-if="isStorageList"
                         class="storage-item"
                         @click="__openStorage(item)"></div>
                    <div v-if="isStorageList"
                         class="name">空间{{item.id}}</div>

                    <div v-if="item.fileType==0"
                         class="file"
                         @click="__getAllFill(item.id,item.fileName,true)"></div>
                    <div v-if="item.fileType==3"
                         class="img"
                         @click="__previewImg(item)"></div>
                    <div v-if="item.fileType==4&&item.mime=='pdf'"
                         class="pdf"></div>
                    <div v-if="item.fileType==4&&item.mime=='txt'"
                         class="txt"></div>
                    <div v-if="item.fileType==5&&item.mime=='zip'"
                         class="zip"></div>
                    <div v-if="item.fileType==4&&item.mime=='war'"
                         class="war"></div>
                    <div v-if="item.fileType==4&&item.mime=='tar'"
                         class="tar"></div>
                    <div v-if="item.fileType==4&&item.mime=='exe'"
                         class="exe"></div>
                    <div v-if="item.fileType==4&&item.mime=='rar'"
                         class="rar"></div>
                    <div v-if="item.fileType==4&&(item.mime=='doc'||item.mime=='docx')"
                         class="doc"></div>
                    <div v-if="item.fileType==4&&item.mime=='pptx'"
                         class="ppt"></div>
                    <div v-if="item.fileType==4&&(item.mime=='xls'||item.mime=='xlsx')"
                         class="excel"></div>
                    <div v-if="!item.isInputName"
                         class="name"
                         @click="__selectUpdateName(item)">{{item.fileName}}</div>
                    <input type="text"
                           v-model="item.fileName"
                           @blur="__updateName(item)"
                           v-else />
                    <!-- <div>{{item.mime}}</div> -->
                    <div class="info"
                         v-if="isLandscape&&!isStorageList">
                        <div>{{item.updateDate|getTime}}</div>
                        <div style="text-align:right;margin-top:10px;">{{item.size|byteConvert}}</div>
                    </div>
                    <div class="info"
                         v-if="isLandscape&&isStorageList">
                        <div>{{item.serviceStartDate|getTime}}---{{item.serviceStopDate|getTime}}</div>
                        <div style="text-align:right;margin-top:10px;">{{item.size|byteConvert}}</div>
                    </div>
                </div>
                <div class="delete"
                     v-if="opaIdx==index">
                    <div @click="__open(item)">打开</div>
                    <div class="border"></div>
                    <div @click="__downloadFile(item)"
                         v-if="!isStorageList">下载</div>
                    <div @click="__delete(item)"
                         v-if="!isStorageList">删除</div>
                    <div class="border"></div>
                    <div @click="__selectUpdateName(item)"
                         v-if="!isStorageList">重命名</div>
                    <div @click="__showProperty(item,index)">属性</div>
                </div>
                <div class="property"
                     v-if="propertyIdx==index">
                    <div class="title">
                        属性
                        <span class="exit"
                              @click="propertyIdx=99"></span>
                    </div>
                    <div class="content">
                        <div class="content-img clearfix">
                            <div v-if="item.fileType==0"
                                 class="file"></div>
                            <div v-if="item.fileType==3"
                                 class="img" style="margin:0"></div>
                            <div v-if="item.fileType==4&&item.mime=='pdf'"
                                 class="pdf"></div>
                            <div v-if="item.fileType==4&&item.mime=='txt'"
                                 class="txt"></div>
                            <div v-if="item.fileType==5&&item.mime=='zip'"
                                 class="zip"></div>
                            <div v-if="item.fileType==4&&item.mime=='war'"
                                 class="war"></div>
                            <div v-if="item.fileType==4&&item.mime=='tar'"
                                 class="tar"></div>
                            <div v-if="item.fileType==4&&item.mime=='exe'"
                                 class="exe"></div>
                            <div v-if="item.fileType==4&&item.mime=='rar'"
                                 class="rar"></div>
                            <div v-if="item.fileType==4&&(item.mime=='doc'||item.mime=='docx')"
                                 class="doc"></div>
                            <div v-if="item.fileType==4&&item.mime=='pptx'"
                                 class="ppt"></div>
                            <div v-if="item.fileType==4&&(item.mime=='xls'||item.mime=='xlsx')"
                                 class="excel"></div>
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
                                <span>上传日期：</span>{{item.updateDate|getTime}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="property"
                     v-if="storagePropertyIdx==index"
                     style="height:402px;">
                    <div class="title">
                        属性
                        <span class="exit"
                              @click="storagePropertyIdx=99"></span>
                    </div>
                    <div class="content"
                         style="height:345px;">
                        <div class="content-info">
                            <div>
                                <span>购买时间：</span>{{item.serviceStartDate|getTime}}
                            </div>
                            <div>
                                <span>到期时间：</span>{{item.serviceStopDate|getTime}}
                            </div>
                            <div>
                                <span>空间大小：</span>{{item.sizeDisplay}}
                            </div>
                            <div>
                                <span>已使用大小：</span>{{item.useSizeDisplay}}
                            </div>
                            <div class="icon">
                                <span>图示颜色：</span>
                                <div class="clearfix">
                                    <div class="fl icon1"
                                         @click="__changeIcon(1,index)"></div>
                                    <div class="fl icon2"
                                         @click="__changeIcon(2,index)"></div>
                                    <div class="fl icon3"
                                         @click="__changeIcon(3,index)"></div>
                                    <div class="fl icon4"
                                         @click="__changeIcon(4,index)"></div>
                                    <div class="fl icon5"
                                         @click="__changeIcon(5,index)"></div>
                                    <div class="fl icon6"
                                         @click="__changeIcon(6,index)"></div>
                                </div>
                                <div class="clearfix">
                                    <div class="fl icon7"
                                         @click="__changeIcon(7,index)"></div>
                                    <div class="fl icon8"
                                         @click="__changeIcon(8,index)"></div>
                                    <div class="fl icon9"
                                         @click="__changeIcon(9,index)"></div>
                                    <div class="fl icon10"
                                         @click="__changeIcon(10,index)"></div>
                                    <div class="fl icon11"
                                         @click="__changeIcon(11,index)"></div>
                                    <div class="fl icon12"
                                         @click="__changeIcon(12,index)"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FileSaver from 'file-saver'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            storageList: [], //空间列表
            isStorageList: true, //显示的是否为空间列表
            storageId: '', //当前空间id
            renderArr: [], //渲染列表数据
            id: 0, //文件夹id
            // fileArr: [{ id: 0, fileName: "我的云盘" }],
            fileArr: [{ id: false, fileName: '我的网盘' }],
            fileList: [],
            fileName: '',
            opaIdx: 99,
            imgData: '',
            propertyIdx: 99,
            storagePropertyIdx: 99,
            isLandscape: false,
            sort: 'fileName',
            sortType: '1',
            sortMenu: false
        }
    },
    components: {},
    computed: {},
    filters: {
        byteConvert(bytes) {
            if (isNaN(bytes) || bytes < 0) {
                return ''
            }
            var symbols = [
                'B', //bytes
                'KB',
                'MB',
                'GB',
                'TB',
                'PB',
                'EB',
                'ZB',
                'YB'
            ]
            var exp = Math.floor(Math.log(bytes) / Math.log(2))
            if (exp < 1) {
                exp = 0
            }
            var i = Math.floor(exp / 10)
            bytes = bytes / Math.pow(2, 10 * i)

            if (bytes.toString().length > bytes.toFixed(2).toString().length) {
                bytes = bytes.toFixed(2)
            }
            return bytes + '' + symbols[i]
        },
        getTime(timestamp) {
            console.log(timestamp, 'timestamp')
            var time = new Date(timestamp)
            var ye = time.getFullYear()
            var mn = time.getMonth() + 1
            var da = time.getDate()
            var h = time.getHours()
            var m = time.getMinutes()
            var s = time.getSeconds()
            mn = mn < 10 ? '0' + mn : mn
            da = da < 10 ? '0' + da : da
            h = h < 10 ? '0' + h : h
            m = m < 10 ? '0' + m : m
            s = s < 10 ? '0' + s : s
            return ye + '-' + mn + '-' + da + ' ' + h + ':' + m + ':' + s
        }
    },
    mounted() {
        this.__getAllStorage()
    },
    methods: {
        ...mapMutations(['SET_PREVIEWIMG_STATE', 'SET_LOADING_STATE']),
        __changeSortMenu() {
            this.sortMenu = true
        },
        __sortList(name) {
            if (name) this.sort = name
            let mode = this.sort
            if (this.sortType === '1') {
                if (mode === 'size' || mode === 'createDate') {
                    this.fileList.sort((a, b) => {
                        return a[mode] - b[mode]
                    })
                } else {
                    this.fileList.sort((a, b) => {
                        return a[mode].charCodeAt() - b[mode].charCodeAt()
                    })
                }
            } else {
                if (mode === 'size' || mode === 'createDate') {
                    this.fileList.sort((a, b) => {
                        return b[mode] - a[mode]
                    })
                } else {
                    this.fileList.sort((a, b) => {
                        return b[mode].charCodeAt() - a[mode].charCodeAt()
                    })
                }
            }
            this.sortMenu = false
        },
        __sortType(type) {
            this.sortType = type
            this.__sortList()
        },
        __out() {
            this.opaIdx = 99
        },

        __judge() {
            this.opaIdx = 99
        },
        //获取我的空间列表
        async __getAllStorage() {
            const res = await this.api.cloudStorageList({
                optType: 2
            })
            // res.data.forEach(val => {
            //     val.activeDate = this.getTime(val.activeDate)
            //     val.createDate = this.getTime(val.createDate)
            //     val.serviceStartDate = this.getTime(val.serviceStartDate)
            //     val.serviceStopDate = this.getTime(val.serviceStopDate)
            // })
            this.storageList = res.data
            this.renderArr = res.data
            this.$nextTick(function() {
                var arr = []
                if (localStorage.STORAGEICONLIST) {
                    arr = JSON.parse(localStorage.STORAGEICONLIST)
                    document
                        .querySelectorAll('.fileList-item')
                        .forEach((val, index) => {
                            if (arr[index])
                                val.childNodes[0].childNodes[0].className =
                                    arr[index]
                        })
                } else {
                    document
                        .querySelectorAll('.fileList-item')
                        .forEach((val, index) => {
                            val.childNodes[0].childNodes[0].className =
                                'bgImg' + (index + 1)
                        })
                }
            })
        },
        __openStorage(item) {
            this.fileArr.push({
                storageId: item.id,
                fileName: '空间' + item.id
            })
            this.storageId = item.id
            this.__getAllFill(0)
        },
        //点击打开操作
        __open(item) {
            //打开空间
            if (this.isStorageList) {
                this.storageId = item.id
                this.__getAllFill(0, item.fileName, false)
                this.fileArr.push({
                    storageId: item.id,
                    fileName: '空间' + item.id
                })
            } else if (item.fileType == 3) {
                //图片
                this.__previewImg(item)
            } else if (item.fileType == 0) {
                //文件夹
                this.__getAllFill(item.id, item.fileName, true)
            }
        },
        //获取所有文件
        async __getAllFill(id, fileName, isPush) {
            if (isPush) {
                this.fileArr.push({
                    id: id,
                    fileName: fileName
                })
            }

            this.id = id
            const res = await this.api.cloudGetAllFile({
                pid: id,
                storageId: this.storageId
            })
            res.data.forEach(val => {
                this.$set(val, 'isInputName', false)
                // val.updateDate = this.getTime(val.updateDate)
            })
            this.fileList = res.data
            this.renderArr = res.data
            this.isStorageList = false
            console.log(this.renderArr, 'this.storageList ')
        },
        __fileArrGoFile(item, index) {
            //id存在，文件夹进入后退操作
            if (item.id || item.storageId) {
                this.__getAllFill(item.id, item.fileName, false)
            } else {
                //id不存在,为空间选择
                this.isStorageList = true
                this.__getAllStorage()
            }
            this.fileArr = this.fileArr.slice(0, index + 1)
        },
        __showOperation(index) {
            this.opaIdx = index
        },
        __delete(item) {
            this.api.cloudDelete({ id: item.id }).then(res => {
                this.__getAllFill(this.id)
                this.opaIdx = 99
            })
        },
        // 创建目录
        async __createFolder() {
            const res = await this.api.cloudCreateFolder({
                folderName: '新建文件夹',
                pid: this.id,
                storageId: this.storageId
            })
            this.__getAllFill(this.id)
        },
        __selectUpdateName(item) {
            item.isInputName = true
            this.fileName = item.fileName
        },
        __updateName(item) {
            item.fileName = event.currentTarget.value
            item.isInputName = false
            this.api
                .cloudRename({
                    id: item.id,
                    name: item.fileName
                })
                .then(res => {
                    if (res.code != 0) item.fileName = this.fileName
                    this.$Toast(res.msg)
                })
        },
        // 上传文件
        __uploadFile(ref) {
            let file = this.$refs[ref]
            let formData = new FormData()
            formData.append('file', file.files[0])
            formData.append('id', this.id)
            formData.append('storageId', this.storageId)
            this.api.cloudUploadFile(formData).then(res => {
                this.$Toast(res.msg)
                this.__getAllFill(this.id)
            })
        },
        transformArrayBufferToBase64(buffer) {
            var binary = ''
            var bytes = new Uint8Array(buffer)
            for (var len = bytes.byteLength, i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i])
            }
            return window.btoa(binary)
        },
        // 下载文件
        async __downloadFile(item) {
            const res = await this.api.cloudDownload(item.id)
            FileSaver.saveAs(
                'data:image/png;base64,' +
                    this.transformArrayBufferToBase64(res),
                item.fileName
            )
        },
        async __previewImg(item) {
            this.SET_LOADING_STATE(true)
            const res = await this.api.cloudDownload(item.id)
            this.SET_LOADING_STATE(false)
            this.SET_PREVIEWIMG_STATE({
                src:
                    'data:image/png;base64,' +
                    this.transformArrayBufferToBase64(res)
            })
        },
        __showProperty(item, index) {
            if (this.isStorageList) {
                this.storagePropertyIdx = index
            } else {
                this.propertyIdx = index
            }
            console.log(item)
        },
        __changeIcon(type, index) {
            document.querySelectorAll('.fileList-item')[
                index
            ].childNodes[0].childNodes[0].className = 'bgImg' + type
            var arr = []
            if (localStorage.STORAGEICONLIST) {
                arr = JSON.parse(localStorage.STORAGEICONLIST)
            }
            arr[index] = 'bgImg' + type
            localStorage.STORAGEICONLIST = JSON.stringify(arr)
        },
        __changeDirection() {
            this.isLandscape = !this.isLandscape
        }
    },
    watch: {},
    created() {}
}
</script>

<style lang='scss'  scoped>
.box {
    position: relative;
    min-height: 800px;
    .sort {
        position: absolute;
        top: 30px;
        right: -44px;

        background: #f8f8f8;
        border: 1px solid #e9e9e9;
        z-index: 9;
        > ul {
            padding: 10px 0;
            li {
                padding: 5px 15px 5px 25px;
                &.active {
                    position: relative;
                    &::before {
                        position: absolute;
                        left: 10px;
                        top: 50%;
                        transform: translateY(-50%);
                        content: '';
                        width: 10px;
                        height: 10px;
                        background: #000;
                        border-radius: 50%;
                    }
                }
                &:hover {
                    background: #ecf0f7;
                }
            }
        }
        & > :nth-of-type(1) {
            border-bottom: 1px solid #e9e9e9;
        }
    }
}
.title {
    font-size: 18px;
    display: flex;
    height: 50px;
    background: #f8f8f8;
    border-bottom: 1px solid #eaeaea;
    position: relative;
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
            background-image: url('./img/head_mai@3x.png');
            display: block;
        }
        .icon1 {
            width: 16px;
            height: 14px;
            background-image: url('./img/createfolder.png');
            margin-left: 20px;
        }
        > p {
            padding-left: 14px;
            font-size: 14px;
        }
    }
    .arrangement {
        position: absolute;
        right: 20px;
        top: 15px;

        > span {
            width: 20px;
            height: 20px;
            background-size: 100% 100%;
            margin: 0 8px;
        }
        .column {
            background-image: url('./img/column.png');
        }
        .row {
            background-image: url('./img/row.png');
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
        background: url('./img/group_addPic@3x.png') no-repeat center 0px;
        background-size: 61px 61px;
        input[type='file'] {
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
        // width: 118px;
        margin-top: 20px;
        margin-left: 12px;
        position: relative;
        .item {
            width: 120px;
            height: 120px;
            border-radius: 5px;
            border: 1px solid transparent;
            background: #e9e9e9;
            display: flex;
            align-content: center;
            flex-wrap: wrap;
            &.row {
                padding: 0 10px;
                width: 840px;
                align-items: center;
                justify-content: space-between;

                > :nth-of-type(1) {
                    margin-right: 20px;
                }
                .name {
                    flex: 1;
                    text-align: left;
                    overflow: hidden;
                    width: 370px;
                    max-width: 660px;
                    margin-top: 10px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin: 0;
                }

                > input {
                    flex: 1;
                    width: 370px;
                    margin-top: 10px;
                    height: 20px;
                    border: none;
                    border-radius: 3px;
                    padding-left: 4px;
                }
                .info {
                }
            }
            &:hover {
                border: 1px solid #999999;
            }
            .name {
                text-align: center;
                overflow: hidden;
                width: 92%;
                margin: 10px auto 0;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            > input {
                width: 100px;
                height: 20px;
                border: none;
                border-radius: 3px;
                margin: 10px auto 0;
                padding-left: 4px;
            }
        }

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
    }
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
.exit {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 12px;
    height: 12px;
    background: #fff url('./img/popup_cancel@3x.png');
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
.property {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 522px;
    height: 300px;
    color: #333;
    border: 1px solid #e2e2e3;
    z-index: 9;
    background: #fff;
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
            .icon {
                > div {
                    > div {
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        margin: 10px;
                    }
                    .icon1 {
                        background: #efb336;
                    }
                    .icon2 {
                        background: #3f81c1;
                    }
                    .icon3 {
                        background: #36ab60;
                    }
                    .icon4 {
                        background: #d4237a;
                    }
                    .icon5 {
                        background: #009688;
                    }
                    .icon6 {
                        background: #ff8400;
                    }
                    .icon7 {
                        background: #ff4081;
                    }
                    .icon8 {
                        background: #3f61a6;
                    }
                    .icon9 {
                        background: #f0551f;
                    }
                    .icon10 {
                        background: #0db4be;
                    }
                    .icon11 {
                        background: #99c021;
                    }
                    .icon12 {
                        background: #c01aba;
                    }
                }
            }
        }
    }
}
.storage-item {
    width: 61px;
    height: 61px;
    background: url(./img/disk1.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.bgImg1 {
    width: 61px;
    height: 61px;
    background: url(./img/disk1.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.bgImg2 {
    width: 61px;
    height: 61px;
    background: url(./img/disk2.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.bgImg3 {
    width: 61px;
    height: 61px;
    background: url(./img/disk3.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.bgImg4 {
    width: 61px;
    height: 61px;
    background: url(./img/disk4.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.bgImg5 {
    width: 61px;
    height: 61px;
    background: url(./img/disk5.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.bgImg6 {
    width: 61px;
    height: 61px;
    background: url(./img/disk6.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.bgImg7 {
    width: 61px;
    height: 61px;
    background: url(./img/disk7.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.bgImg8 {
    width: 61px;
    height: 61px;
    background: url(./img/disk8.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.bgImg9 {
    width: 61px;
    height: 61px;
    background: url(./img/disk9.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.bgImg10 {
    width: 61px;
    height: 61px;
    background: url(./img/disk10.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.bgImg11 {
    width: 61px;
    height: 61px;
    background: url(./img/disk11.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
.bgImg12 {
    width: 61px;
    height: 61px;
    background: url(./img/disk12.png);
    background-size: 100% 100%;
    margin: 0 auto;
}
</style>
