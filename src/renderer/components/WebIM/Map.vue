<template>
    <div class="mask" @click="SET_MAP_STATE">
        <div class="box" @click.stop="stop">
            <div class="explain">{{address}}</div>
            <div class="container" id="container"></div>
            <div class="btn" @click="sendAddress()" v-if="!mapItem">发送</div>
        </div>

        <!-- <el-amap vid="amapDemo" :center="center" :map-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo">
        </el-amap> -->
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            address: "",
            addressInfo: ""
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            mapItem: state => state.WebImQueue.mapItem,
            mapMsgToInfo: state => state.WebImQueue.mapMsgToInfo
        })
    },
    created() {},
    mounted() {
        const _this = this;
        // window.test = function() {
        //点状标记插件
        // initAMapUI();

        console.log(this.mapItem);
        if (this.mapItem) {
            this.address = this.mapItem.address;
            var map = new AMap.Map("container", {
                center: [_this.mapItem.longitude, _this.mapItem.latitude],
                zoom: 16
            });
        } else {
            var map = new AMap.Map("container", {
                zoom: 16
            });
            //定位
            AMap.plugin("AMap.Geolocation", function() {
                var geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true, //是否使用高精度定位，默认:true
                    timeout: 10000, //超过10秒后停止定位，默认：5s
                    buttonPosition: "RB", //定位按钮的停靠位置
                    buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
                });
                map.addControl(geolocation);
                geolocation.getCurrentPosition(function(status, result) {
                    //获取到的定位信息
                    // console.log(result);
                    // _this.address = result.formattedAddress;
                });
            });
            AMapUI.loadUI(["misc/PositionPicker"], function(PositionPicker) {
                var positionPicker = new PositionPicker({
                    mode: "dragMap", //设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
                    map: map //依赖地图对象
                });
                //TODO:事件绑定、结果处理等
                positionPicker.on("success", function(positionResult) {
                    console.log(positionResult);
                    _this.address = positionResult.address;
                    _this.addressInfo = positionResult;
                });
                positionPicker.on("fail", function(positionResult) {});
                positionPicker.start();
            });
        }

        // };
        // var url =
        //     "https://webapi.amap.com/maps?v=1.4.14&key=ee3a8beaed04769b9826fcb0da76f552&callback=test";
        // var jsapi = document.createElement("script");
        // jsapi.charset = "utf-8";
        // jsapi.src = url;
        // document.head.appendChild(jsapi);

        // var url = "//webapi.amap.com/ui/1.0/main-async.js";
        // var jsapi = document.createElement("script");
        // jsapi.charset = "utf-8";
        // jsapi.src = url;
        // document.head.appendChild(jsapi);
    },
    methods: {
        ...mapMutations(["SET_MAP_STATE", "SET_MSG_List"]),
        test() {
            console.log(1);
        },
        sendAddress() {
            //push到消息队列中
            let msgObj = {
                type: 0,
                messageType: 4,
                msg: {
                    mapScreenShot:
                        "http://139.196.98.22/resource/1557671793026_198.jpg",
                    address: this.addressInfo.address,
                    latitude: this.addressInfo.position.lat,
                    longitude: this.addressInfo.position.lng
                }
            };

            this.SET_MSG_List({
                index: this.mapMsgToInfo.userIdx,
                msg: msgObj
            });

            var message = {
                mapScreenShot:
                    "http://139.196.98.22/resource/1557671793026_198.jpg",
                address: this.addressInfo.address,
                latitude: this.addressInfo.position.lat,
                longitude: this.addressInfo.position.lng
            };
            let params = {
                body: JSON.stringify(message),
                fromUserId: this.userInfo.userId,
                messageType: 4,
                time: 0,
                toUserId: this.mapMsgToInfo.userId,
                type: "chat"
            };
            if (this.mapMsgToInfo.type == "personal") {
                const res = this.api.sendMessage(params);
            } else {
                params.type = "groupchat";
                params.toUserId = this.mapMsgToInfo.groupId;
                const res = this.api.sendGroupMessage(params);
            }
            this.SET_MAP_STATE({
                mapItem: "",
                mapMsgToInfo: ""
            });
        },
        stop() {}
    }
};
</script>
<style lang="scss" scoped>
.amap-demo {
    height: 300px;
}
.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}
.box {
    height: 600px;
    width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.explain {
    line-height: 26px;
    width: 260px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
    text-align: center;
    border: silver solid 1px;
    box-shadow: 0 0 0.5px rgba(0, 0, 100, 0.6);
    background: 0 0 #fff;
}
#container {
    width: 600px;
    height: 600px;
}
.btn {
    height: 30px;
    line-height: 30px;
    background: #3f61a6;
    color: #fff;
    width: 90px;
    text-align: center;
    border-radius: 8px;
    position: absolute;
    top: 86px;
    right: 6px;
    cursor: pointer;
}
</style>

