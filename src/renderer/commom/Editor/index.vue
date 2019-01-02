<template>
    <div class="editor">

        <div ref="editor"
             class="content"></div>
        <div ref="toolbar"
             class="toolbar">
        </div>
    </div>
</template>

<script>
import E from 'wangeditor'
export default {
    name: 'editor',
    data() {
        return {
            editorContent: ''
        }
    },
    methods: {
        getContent(html) {
            this.$emit('get', html)
        },
        init() {
            let editor = new E(this.$refs.toolbar, this.$refs.editor)
            editor.customConfig.onchange = html => {
                // this.editorContent = html
            }
            editor.customConfig.onblur = html => {
                // html 即编辑器中的内容
                this.getContent(html)
            }
            editor.customConfig.zIndex = 0
            editor.customConfig.menus = [
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                //'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote' // 引用
                //'emoticon', // 表情
                //'image', // 插入图片
                //'table', // 表格
                //'video' // 插入视频
                //'code', // 插入代码
                //'undo', // 撤销
                //'redo' // 重复
            ]
            editor.create()
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style scoped lang='scss'>
.editor {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f7f7f7;
    .content {
        text-align: left;
    }
    .toolbar {
        position: absolute;
        bottom: 110px;
        left: 0;
        border: 1px solid #e8e8e9;
    }
}
</style>