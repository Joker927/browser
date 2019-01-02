<template>
	<div class="mask">
		<div class="box" v-if="groupAdd">
			<div class="title" v-if="!groupId">创建群组
				<span class="exit" @click='__out'></span>
			</div>
            <div class="title" v-if="groupId">添加群成员
				<span class="exit" @click='__out'></span>
			</div>

			<div class="name" v-if="!groupId">
				<div class="fl">
					<img :src="imgSrc" v-if="imgSrc" />
					<input type="file" @change="chooseImg" id="fileId" />
				</div>
				<input type="text" placeholder="群组名称" v-model="groupName" />
			</div>

			<div>
				<FList :group-name="groupName" :group-id="groupId" :file="file" v-on:imgUrl="getImgUrl"></FList>
			</div>
		</div>

		<div class="box" v-if="!groupAdd" style="width:422px;">
			<div class="title">群组详情
				<span class="exit" @click='__out'></span>
			</div>

			<div>
				<FDetail :group-id="groupId"></FDetail>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import FList from "./FList";
import FDetail from "./FDetail";
export default {
    data() {
        return {
            groupName: "",
            file: "",
            imgSrc: ""
        };
    },
    components: {
        FList,
        FDetail
    },
    computed: {
        ...mapState({
            groupId: state => state.Visible.groupId,
            groupAdd: state => state.Visible.groupAdd
        })
    },
    mounted() {
        console.log(this.groupId);
        console.log(this.groupAdd);
    },
    watch: {
        groupId: {
            handler(newVal) {
                console.log(this.groupId);
            },
            deep: true
        },
    },
    methods: {
		...mapMutations(["SET_GROUP_STATE"]),
        __out() {
            this.SET_GROUP_STATE();
        },
        chooseImg() {
            this.file = document.getElementById("fileId").files[0];
        },
        getImgUrl(val) {
            this.imgSrc = val;
        }
    }
};
</script>

<style lang="scss" scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.box {
    width: 600px;
    height: 541px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
}

.title {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    border-bottom: 1px solid #dfdfe0;
	font-size: 16px;
}

.exit{
	width: 21px;
	height: 21px;
	display: block;
	background: url('./img/popup_cancel@3x.png');
	background-size: 100% 100%;
	float: right;
	margin: 15px 20px;
}

.name {
    height: 90px;
    line-height: 90px;
    padding-left: 20px;
    border-bottom: 1px solid #dfdfe0;
    input[type="text"] {
        font-size: 14px;
        border: none;
        outline: none;
        margin-left: 20px;
    }
    input::-webkit-input-placeholder {
        color: #999;
    }
    div {
        width: 50px;
        height: 50px;
        position: relative;
        background: url("./img/group_addPic@3x.png");
        background-size: 100% 100%;
        top: 20px;
    }
    input[type="file"] {
        position: absolute;
        width: 50px;
        height: 50px;
        opacity: 0;
    }
    img {
        position: absolute;
        width: 50px;
        height: 50px;
    }
}
</style>