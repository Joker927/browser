<template>
    <div class="mask" @click="SET_MAP_STATE">
        <div class="container" id="container" @click.stop="stop"></div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    computed: {
        ...mapState({
            mapItem: state => state.WebImQueue.mapItem
        })
    },
    data() {
        return {};
    },
    mounted() {
        console.log(this.mapItem);
        const _this = this;
        //加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
        AMapUI.loadUI(["misc/PositionPicker"], function(PositionPicker) {
            var map = new AMap.Map("container", {
                center: [_this.mapItem.longitude, _this.mapItem.latitude],
                zoom: 16
            });

            var positionPicker = new PositionPicker({
                mode: "dragMap", //设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
                map: map //依赖地图对象
            });

            //TODO:事件绑定、结果处理等
            positionPicker.on("success", function(positionResult) {
                console.log(positionResult);
            });

            positionPicker.on("fail", function(positionResult) {});
            positionPicker.start();
        });

        // //设置DomLibrary，jQuery或者Zepto
        // AMapUI.setDomLibrary($);

        // //加载SimpleInfoWindow，loadUI的路径参数为模块名中 'ui/' 之后的部分
        // AMapUI.loadUI(["overlay/SimpleInfoWindow"], function(SimpleInfoWindow) {
        //     var infoWindow = new SimpleInfoWindow({
        //         infoTitle: "<strong>这里是标题</strong>",
        //         infoBody: "<p>这里是内容。</p>"
        //     });

        //     //显示在map上
        //     infoWindow.open(map, map.getCenter());
        // });
    },
    methods: {
        ...mapMutations(["SET_MAP_STATE"]),
        stop() {}
    }
};
</script>
<style lang="scss" scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}
#container {
    width: 600px;
    height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
}
</style>

