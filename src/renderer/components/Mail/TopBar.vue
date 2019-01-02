<template>
    <div class="mailTopBar">
        <div class="l">

            <span class="icon check"
                  @click="__selectAll"
                  :class="{'checked':selectedArr.length==data.totalPage}"></span>
            <span class="icon refresh"
                  @click="__refresh"
                  v-if="!selectedArr.length"></span>
            <div class="selected"
                 v-if="selectedArr.length&&name!=='trash'">
                <span class="icon cloud"
                      v-if="isCloud||isClouded"
                      @click="__cloudSave"></span>
                <span class="icon local"
                      @click="__localSave"
                      v-if="name!=='local'&&name!=='draft'"></span>
                <span @click="__operate(3)"
                      class="icon trash"></span>
            </div>
            <div class="selected"
                 v-if="selectedArr.length&&name==='trash'">
                <span class="icon recover"
                      @click="__operate(1)"></span>
                <span class="icon delete"
                      @click="__operate(4)"></span>
            </div>
        </div>
        <div class="r">
            <p>{{data.currPage*50-49}}-{{data.currPage*50}}列 (共{{data.totalCount}}列)</p>
            <div>
                <span class="icon p"
                      @click="__option('prev')"></span>
                <span class="icon n"
                      @click="__option('next')"></span>
                <span @click="__setting"
                      class="icon s"></span>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    props: {
        data: {
            type: Object
        },
        selectedArr: {
            type: Array,
            default: () => {
                return []
            }
        },
        name: {
            type: String
        }
    },
    data() {
        return {}
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        }),
        isClouded() {
            return this.selectedArr.every(item => item.isClouds == 1)
        },
        isCloud() {
            return this.selectedArr.every(item => item.isClouds != 1)
        }
    },
    methods: {
        ...mapMutations(['SET_MAIL_LIST_STATE']),
        __setting() {
            if (this.name == 'white' || this.name == 'black') {
                this.SET_MAIL_LIST_STATE()
            }
        },
        __selectAll() {
            let state = this.selectedArr.length !== this.data.totalPage
            console.log(state, 'state')
            this.$emit('selectAll', state)
        },
        async __cloudSave() {
            let ids = this.selectedArr.map(item => {
                return item.id
            })
            let isClouds = this.isCloud ? 1 : 2
            let req = {
                isClouds: isClouds,
                ids: ids,
                userId: this.userInfo.userId
            }

            const res = await this.api.emailOperate(req)
            if (res.code !== 0) return
            this.__refresh()
            this.$Toast('操作成功')
        },
        __localSave() {
            let userMail = localStorage.getItem('USERMAIL') || {}
            if (typeof userMail === 'string') {
                userMail = JSON.parse(userMail)
            }

            let userId = this.userInfo.userId

            if (userId in userMail) {
            } else {
                userMail[userId] = []
            }
            let isSucess = false
            for (var j = 0; j < this.selectedArr.length; j++) {
                let mailId = this.selectedArr[j].id

                let flag = true
                for (var i = 0; i < userMail[userId].length; i++) {
                    if (userMail[userId][i].id === mailId) {
                        flag = false
                        break
                    }
                }
                if (flag) {
                    isSucess = true
                    this.selectedArr[j].isLocal = true
                    this.selectedArr[j].check = false
                    userMail[userId].push(this.selectedArr[j])
                    localStorage.setItem('USERMAIL', JSON.stringify(userMail))
                }
            }
            if (isSucess) {
                this.$Toast('操作成功')
            }
        },
        __option(state) {
            this.$emit('turnPage', state)
        },
        __refresh() {
            this.$emit('refresh')
        },

        async __operate(status) {
            let ids = this.selectedArr.map(item => {
                return item.id
            })
            if (this.name === 'draft') {
                status = 4
            }
            let req = {
                emailStatus: status,
                ids: ids,
                userId: this.userInfo.userId
            }

            const res = await this.api.emailOperate(req)
            if (res.code !== 0) return
            if (this.name === 'local') {
                let userMail = localStorage.getItem('USERMAIL')
                // console.log(typeof userMail, typeof {})
                if (typeof userMail === 'string') {
                    userMail = JSON.parse(userMail)
                }
                let userId = this.userInfo.userId
                let indexArr = []

                for (let i = userMail[userId].length - 1; i >= 0; i--) {
                    let item = userMail[userId][i]
                    for (var j = 0; j < ids.length; j++) {
                        if (item.id === ids[j]) {
                            userMail[userId].splice(i, 1)
                        }
                    }
                }
                localStorage.setItem('USERMAIL', JSON.stringify(userMail))
            }
            this.__refresh()
            this.$Toast('操作成功')
        }
    },
    watch: {},
    created() {}
}
</script>

<style  lang='scss' scoped>
.mailTopBar {
    display: flex;
    width: 100%;
    height: 56px;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border-bottom: 1px solid #e8e8e9;
    .icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
        box-sizing: content-box;
        background-size: 100% 100%;
    }
    .l {
        display: flex;
        margin-left: 20px;
        align-items: center;
        > div {
            display: flex;
            align-items: center;
        }
        .icon {
            margin-right: 12px;
        }
        .check {
            background-image: url('./img/icon_check@2x.png');
        }
        .checked {
            background-image: url('./img/icon_checked@2x.png');
        }
        .refresh {
            background-image: url('./img/icon_refresh@2x.png');
        }
        .cloud {
            width: 18px;
            height: 18px;
            background-image: url('./img/icon_10@2x.png');
        }

        .local {
            background-image: url('./img/icon_11@2x.png');
        }
        .recover {
            width: 13px;
            height: 13px;
            background-image: url('./img/recover.png');
        }
        .delete {
            width: 13px;
            height: 13px;
            background-image: url('./img/delete.png');
        }
        .trash {
            width: 18px;
            height: 18px;
            background-image: url('./img/icon_12@2x.png');
        }
        .arrow {
        }
    }
    .r {
        display: flex;
        align-items: center;
        > div {
            padding: 0 60px 0 20px;
            display: flex;
            align-items: center;
        }
        .p {
            background-image: url('./img/icon_p@2x.png');
        }
        .ap {
            background-image: url('./img/icon_ap@2x.png');
        }
        .n {
            background-image: url('./img/icon_n@2x.png');
        }
        .an {
            background-image: url('./img/icon_an@2x.png');
        }
        .s {
            width: 30px;
            height: 30px;
            background-image: url('./img/icon_s@2x.png');
        }
    }
}
</style>
