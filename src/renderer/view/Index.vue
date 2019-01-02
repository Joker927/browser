<template>

    <div class="content">
        <div class="mainWrapper">
            <div class="main">
                <Scroll>
                    <div>
                        <MenuList></MenuList>
                        <router-view />
                    </div>
                </Scroll>
            </div>
            <Mail></Mail>
            <Group v-if="groupState"></Group>
        </div>

        <Side></Side>
        <SideButtom class="fixed" v-if="sideButtomState"></SideButtom>
        <WebIM :webIMList="webIMList"></WebIM>
    </div>

</template>

<script>
import { mapState, mapMutations } from "vuex";
import Scroll from "@/commom/Scroll";
import Home from "./Home";
import MenuList from "@/components/MenuList";
import Side from "@/components/Side";
import Mail from "@/components/Mail";
import SideButtom from "@/components/SideButtom";
import WebIM from "@/components/WebIM";
import Group from "@/components/Group";

export default {
    data() {
        return {};
    },
    components: { Scroll, MenuList, Side, Mail, SideButtom, WebIM, Group },
    computed: {
        ...mapState({
            sideButtomState: state => state.Mail.sideButtomState,
            mailState: state => state.Mail.mailState,
            groupState: state => state.Visible.groupState,
            webIMList: state => state.WebImQueue.webIMList
        }),
        mainStyle() {
            if (this.mailState || this.groupState)
                return `height: calc(100vh - 80px);overflow:hidden`;
            return "";
        }
    },
    methods: {},
    watch: {},
    created() {}
};
</script>

<style lang='scss' scoped>
.content {
    position: relative;
    background: #eeeeef;
    width: 100%;
    height: 100%;
}
.mainWrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1156px;
    margin: 0 auto;
}
.main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;

    > div > div {
        display: flex;
    }
}
</style>
