
<template>

    <transition name="loading">
        <div class="loading"
             v-if="loading">
            <div class="lds-rolling">
                <div></div>
            </div>
        </div>
    </transition>

</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    data() {
        return {}
    },
    components: {},
    computed: {
        ...mapState({
            loading: state => state.Visible.loading
        })
    },
    methods: {},
    watch: {},
    created() {}
}
</script>

<style type="text/css" scoped>
@keyframes lds-rolling {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.lds-rolling div,
.lds-rolling div:after {
    position: absolute;
    width: 80px;
    height: 80px;
    border: 4px solid #2657a2;
    border-top-color: transparent;
    border-radius: 50%;
}
.lds-rolling div {
    left: 50%;
    top: 50%;
    /* transform: translate(-50%, -50%); */
    margin: -40px -40px 0 0;
    animation: lds-rolling 1s linear infinite;
}
.lds-rolling div:after {
    transform: rotate(90deg);
}
.lds-rolling {
    position: relative;
    width: 100%;
    height: 100%;
}
.loading {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

