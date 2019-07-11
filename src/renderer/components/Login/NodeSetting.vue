<template>
    <div>
        <button @click="__show">{{$t('login.host.title')}}</button>
        <div class="mask"
             v-if="show"
             @click.self="__out">
            <div class="box">
                <span class="x"
                      @click.self="__out"></span>
                <h3>Node Settings</h3>
                <p>{{$t('login.host.host')}}:</p>

                <div class="tabPane">
                    <p class="input"
                       @click="__selectVisible">{{selected.remark}}</p>
                    <div class="selectWrap"
                         v-show="selectShow">
                        <ul class="select">
                            <li class="opt cp"
                                :key="index"
                                @click="__select(item)"
                                v-for="(item ,index) in nodes">
                                {{item.remark}}</li>
                        </ul>

                    </div>

                </div>
                <div class="btn"
                     @click="__confirm">
                    <span class="forget cp">{{$t('confirm')}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            show: false,
            selectShow: false,
            nodes: [],
            selected: {
                remark: ''
            }
        }
    },
    components: {},
    computed: {},
    methods: {
        ...mapMutations(['SET_NODES']),
        __out() {
            this.show = false
        },
        __show() {
            this.show = true
            this.__setSelected()
        },
        __setSelected() {
            this.selected = JSON.parse(
                localStorage.getItem('SELECTED_NODE')
            ) || {
                remark: this.$t('login.host.selectHost')
            }
        },
        async __getNodes() {
            const res = await this.api.getNodes()
            let len = res.data.length
            this.nodes = res.data.slice(0, len - 1)
            this.wallHost = res.data[len - 1]
            this.SET_NODES({
                key: 'walletHost',
                value: this.wallHost.keyValue
            })
        },
        __selectVisible() {
            this.selectShow = true
        },
        __select(item) {
            this.selected = item
            this.selectShow = false
        },
        __confirm() {
            localStorage.setItem('SELECTED_NODE', JSON.stringify(this.selected))

            this.SET_NODES({
                key: 'host',
                value: this.selected.keyValue
            })
            this.__out()
        }
    },
    watch: {},
    created() {
        this.__getNodes()
    }
}
</script>

<style scoped lang='scss'>
button {
    width: 100px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    border-radius: 15px;
    outline: none;
    border: none;
    text-align: center;
    color: #fff;
    background: #3e63a5;
    margin-top: 20px;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.box {
    width: 670px;
    height: 362px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
    overflow: hidden;
    padding: 40px;
    h3 {
        font-size: 20px;
        margin: 10px 0;
    }
    .btn {
        position: absolute;
        bottom: 40px;
        left: 40px;
        right: 40px;
        padding: 0 20px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        background: #3e63a5;
        text-align: center;
    }
    .x {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 20px;
        height: 20px;
        background: url('./img/popup_cancel@3x.png');
        background-size: 100% 100%;

        &:hover {
            background-image: url('./img/popup_cancel_slide@3x.png');
        }
    }
}
.tabPane {
    position: relative;
    .input {
        display: flex;
        align-items: center;
        margin: 10px 0;
        white-space: nowrap;
        background: #ffffff;
        color: #999999;
        border: 1px solid #e6e6e6;
        height: 30px;
        width: 592px;
        padding: 0 15px;
    }
    .selectWrap {
        position: absolute;
        top: 30px;
        left: 0;
        width: 100%;
        background: #efefef;
        .select {
            max-height: 100px;
            overflow: auto;
        }
        .opt {
            height: 30px;
            line-height: 30px;
            padding: 0 15px;
            &:hover {
                color: #fff;
                background: #3e63a5;
            }
        }
    }
}
</style>

