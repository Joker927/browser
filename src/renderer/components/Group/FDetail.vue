<template>
	<div>
		<div class="info">
			<div>
				群头像<img :src="groupInfo.image" />
			</div>
			<div>
				群名称
				<span>{{groupInfo.groupName}}</span>
			</div>
		</div>

		<div class="detail-fList">
			<div class="search-f">
                <input type="text" @focus="foucus" placeholder="搜索群成员" />
                <span class="search-icon" :class="{'focusIcon':focusIcon}"></span>
            </div>

			<div class="f-list">
                <div v-for="(item,index) in groupInfo.memberList" :key="index" class="clearfix">
                    <div>
                        <img src="./img/share-friend.png" />
                    </div>
                    <div>
                        {{item.memberName}}
                    </div>
                    <span @click="__deteleF(item.groupMemberId)">移除</span>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: ["groupId"],
    data() {
        return {
			focusIcon: false,
			groupInfo: ''
		};                                      
    },
    mounted() {
        this.__groupDetail();
    },
    watch: {
        groupId: {
            handler(newVal) {
                this.__groupDetail();
            },
            deep: true
        }
    },
    methods: {
        ...mapMutations(["SET_GROUP_STATE"]),
        __out() {
            this.SET_GROUP_STATE();
		},
		foucus() {
            this.focusIcon = true;
        },
        async __groupDetail() {
			const res = await this.api.groupInfo(this.groupId);
			this.groupInfo = res.data;
		},
		async __deteleF(id) {
			var arr = [id];
			const res = await this.api.groupDelete(arr);
        }
    }
};
</script>

<style lang="scss" scoped>
.info {
    height: 90px;
    line-height: 90px;
    padding-left: 20px;
    border-bottom: 1px solid #dfdfe0;
    > div:first-child {
		line-height: 50px;
		margin-top: 10px;
		color: #888;
        img {
            width: 50px;
            height: 50px;
			border-radius: 50%;
			vertical-align: top;
			margin-left: 16px;
			margin-top: -3px;
        }
    }
    > div:nth-child(2) {
		height: 30px;
		line-height: 30px;
		color: #888;
		span{
			color: #231815;
			margin-left: 16px;
			font-weight: 600;
		}
    }
}

.search-f {
    width: 340px;
    margin: 10px auto;
    position: relative;
    input {
        width: 100%;
        border-radius: 4px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #efefe0;
        background: #f5f6f7;
        padding-left: 10px;
		outline: none;
    }
    input::-webkit-input-placeholder {
        padding-left: 20px;
    }
}

.search-icon {
    display: block;
    width: 14px;
    height: 14px;
    background: url("./img/search-icon.png");
    background-size: 100% 100%;
    position: absolute;
    top: 5px;
	right: 315px;
}

.focusIcon {
    right: 10px !important;
}

.f-list {
    width: 340px;
    margin: 20px auto 0;
    > div {
        width: 100%;
        height: 30px;
        margin-bottom: 8px;
        line-height: 30px;
        > div {
            float: left;
        }
        > div:first-child {
            width: 30px;
            height: 30px;
            img {
                width: 100%;
                border-radius: 50%;
            }
        }
        > div:nth-child(2) {
            margin-left: 10px;
            font-size: 14px;
            font-weight: 500;
        }
        input {
            float: right;
            margin-right: 6px;
        }
        span {
            float: right;
			color: #3F61A6;
			cursor:pointer;
        }
    }
}
</style>