<template>
    <div class="shade">
        <div class="contain">
            <div class="title">
                {{$t('webim.title')}}
            </div>
            <div class="headImg">
                <img src="./img/share-friend.png" />
                <input type="text" />
            </div>
            <div class="btns">
                <div>{{$t('confirm')}}</div>
                <div @click="__cancle">{{$t('cancel')}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        __cancle() {
            this.$emit('changeStatus', false)
        }
    }
}
</script>
<style lang="scss" scoped>
.shade {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
}
.contain {
    width: 600px;
    height: 270px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.title {
    height: 50px;
    background: #ccc;
    font-size: 21px;
    color: #595757;
    line-height: 50px;
    font-weight: 500;
    padding-left: 30px;
}
.headImg {
    height: 148px;
    img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin-top: 14px;
        margin-left: 30px;
        float: left;
    }
    input {
        width: 300px;
        height: 40px;
        margin-top: 54px;
        margin-left: 26px;
        outline: none;
        font-size: 21px;
        padding-left: 20px;
        font-weight: 600;
        color: #595757;
    }
}
.btns {
    margin-top: 10px;
    cursor: pointer;
    > div {
        width: 72px;
        height: 37px;
        line-height: 37px;
        float: right;
        text-align: center;
        margin-right: 20px;
    }
    > div:first-child {
        color: #3f61a6;
        border: 1px solid #3f61a6;
    }
    > div:last-child {
        background: #3f61a6;
        color: #fff;
    }
}
</style>


