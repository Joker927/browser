<template>

    <div ref="wrapper"
         class="scroll-content">
        <slot>
        </slot>
    </div>

</template>

<script >
import BScroll from 'better-scroll'

export default {
    name: 'scroll',
    props: {
        data: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    data() {
        return {
            freeScroll: true,
            scrollbar: {
                fade: true,
                interactive: true
            },
            bounce: {
                bottom: false,
                left: false,
                right: false,
                top: false
            },
            mouseWheel: true,
            listenScrollEnd: true,
            listenBeforeScroll: true,
            probeType: 0
        }
    },
    methods: {
        initScroll() {
            if (!this.$refs.wrapper) {
                return
            }
            let options = {
                probeType: this.probeType,
                click: this.click,
                scrollY: this.freeScroll,
                scrollX: this.freeScroll,
                scrollbar: this.scrollbar,
                freeScroll: this.freeScroll,
                mouseWheel: true, // this.mouseWheel,
                bounce: this.bounce
            }
            this.scroll = new BScroll(this.$refs.wrapper, options)
            if (this.listenScroll) {
                this.scroll.on('scroll', pos => {
                    this.$emit('scroll', pos)
                })
            }
            if (this.listenScrollEnd) {
                this.scroll.on('scrollEnd', pos => {
                    console.log('scroll-end')
                    this.$emit('scroll-end', pos)
                })
            }
            if (this.listenBeforeScroll) {
                this.scroll.on('beforeScrollStart', () => {
                    this.$emit('beforeScrollStart')
                })
                this.scroll.on('scrollStart', () => {
                    console.log('scroll-start')
                    this.$emit('scrollStart')
                })
            }
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            this.scroll &&
                this.scroll.scrollToElement.apply(this.scroll, arguments)
        },
        destroy() {
            this.scroll.destroy()
        }
    },
    components: {},
    mounted() {
        setTimeout(() => {
            this.initScroll()
        }, 20)
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh()
            }, 20)
        }
    }
}
</script>

<style lang='scss' >
.scroll-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
}
</style>