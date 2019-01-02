<template>
    <div class="shade">
        <div class="contain">
            <div class="exit" @click="__exit"></div>
            <div class="headImg">
                <img src="./img/share-friend.png" />
            </div>
            <div class="name">
                {{userName}}
            </div>
            <div class="info clearfix">
                <div>转账金额</div>
                <div>
                    <select>
                        <option>￥</option>
                        <option>$</option>
                    </select>
                    <input type="number" placeholder="输入数量..." />
                </div>
            </div>
            <div class="explain">
                <textarea placeholder="新增转账说明"></textarea>
            </div>
            <div class="btn">转账</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["userId", "userName"],
    data() {
        return {};
    },
    mounted() {},
    methods: {
        __exit() {
            this.$emit("changeStatus", false);
        }
    }
};
</script>
<style lang="scss" scoped>
.shade {
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.4);
}
.contain {
    width: 90%;
    height: 74%;
    background: #fff;
    margin: 0 auto;
    padding-top: 1px;
    margin-top: 10px;
    position: relative;
}
.exit {
    width: 14px;
    height: 14px;
    position: absolute;
    background: url(./img/link_cancel.png);
    background-size: 100%;
    top: 2px;
    right: 2px;
}
.headImg {
    margin-top: 4px;
    img {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        margin: 0 auto;
        display: block;
    }
}
.name {
    color: #231815;
    font-size: 14px;
    text-align: center;
    font-weight: 600;
}
.info {
    > div:first-child {
        color: #231815;
        font-size: 14px;
        font-weight: 600;
        padding-left: 14px;
    }
    > div:nth-child(2) {
        margin-top: 10px;
        select {
            float: left;
            margin-left: 14px;
        }
        input {
            width: 60%;
            border: none;
            outline: none;
            margin-left: 6px;
        }
        input::-webkit-input-placeholder {
            color: #888;
            font-weight: 600;
        }
    }
}
.explain {
    margin-top: 6px;
    textarea {
        resize: none;
        width: 100%;
        height: 30px;
        border: none;
        outline: none;
        padding: 0 14px;
    }
    textarea::-webkit-input-placeholder {
        color: #888;
        font-weight: 600;
    }
}
.btn {
    background: #0dac67;
    color: #fff;
    width: 90%;
    margin: 0 auto;
    height: 22px;
    line-height: 22px;
    text-align: center;
    margin-top: 8px;
    border-radius: 4px;
}
</style>


