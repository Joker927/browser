<template>
    <input type="file"
           style="display:none"
           ref="Upload"
           :multiple='multiple'
           @change="__upload">
</template>

<script>
export default {
    props: {
        list: {
            type: Array
        },
        multiple: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            tempArr: [], //存放当前次上传结果
            count: null
        }
    },
    components: {},
    computed: {},
    methods: {
        async __upload() {
            let files = this.$refs.Upload.files
            let reqs = []
            let types = []
            for (let i = 0; i < files.length; i++) {
                let type = files[i].type.split('/')[0]
                let data = {
                    flag: true,
                    type,
                    src: '',
                    url: ''
                }
                types.push(type)
                let formData = new FormData()
                formData.append('filename', files[i])

                let cb = res => {
                    let loaded = (res.loaded / res.total) * 100

                    this.$set(data, 'loaded', loaded)
                }
                this.$emit('progress', data)
                let res = {}
                if (type === 'video' || type === 'audio') {
                    let video = document.createElement('video')
                    video.src = URL.createObjectURL(files[i])
                    let preivew = new Promise((resolve, reject) => {
                        video.addEventListener('loadeddata', async () => {
                            const blob = await this.__getPreivew(
                                files[i],
                                video
                            )
                            resolve(blob)
                        })
                    })
                    const blob = await preivew
                    formData.append('filename', blob, 'preview.jpg')
                }
                reqs.push(this.api.snsUpload(formData, cb))
            }

            let arr = []
            const res = await Promise.all(reqs)

            for (let i = 0; i < res.length; i++) {
                if (res[i].code == 0) {
                    if (types[i] === 'image') {
                        arr.push({
                            src: res[i].data[0]
                        })
                    } else {
                        arr.push({
                            src: res[i].data[1],
                            url: res[i].data[0]
                        })
                    }
                }
            }
            if (this.multiple) {
                this.tempArr = this.tempArr.concat(arr)
                this.list.forEach((item, index) => {
                    item = Object.assign(item, this.tempArr[index])
                })
            } else {
                this.list[this.count] = Object.assign(
                    this.list[this.count],
                    arr[0]
                )
                console.log(arr, ';', this.list[this.count])
            }

            console.log(this.list, 'this.list')

            this.$refs.Upload.value = ''
        },
        __getPreivew(blob, video) {
            return new Promise((resolve, reject) => {
                let canvas = document.createElement('canvas')
                let ctx = canvas.getContext('2d')
                canvas.width = 600
                canvas.height = 600
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

                canvas.toBlob(imgBlob => {
                    resolve(imgBlob)
                }, 'image/jpeg')
                URL.revokeObjectURL(blob)
            })
        },
        clear() {
            this.tempArr = [] //发布动态后清除
        },
        show(num) {
            this.count = num
            this.$refs.Upload.click()
        }
    },

    created() {}
}
</script>

<style  lang='scss' scoped>
</style>
