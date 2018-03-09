<template>
    <transition name='fade'
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @leave="leave"
                @after-leave="afterLeave"
    >
        <ul class="tree" v-show="visible">
            <li class="treenode" v-for="(item,i) in options">
                <i class="icon" v-if="item.child" @click="iconClick($event,i)" :class="nodes[i].extend ? 'expand' :'shink'"></i>
                <!--<img v-if="item.child" src="./up_two.png" @click="iconClick($event,i)" :class="nodes[i].extend ? 'expand' :'shink'"/>-->
                <slot name="renderContent" :item="item" :options="options">
                </slot>
                <template v-if="item.child">
                    <vueTree :options="item.child">
                        <i class="icon" v-if="item.child" @click="iconClick($event,i)" :class="nodes[i].extend ? 'expand' :'shink'"></i>
                        <!--<img src="./up_two.png" @click="iconClick($event,i)"/>-->
                        <template class="node-content" slot="renderContent" slot-scope="props">
                            <slot name="renderContent" :item="props.item" :options="props.options"></slot>
                        </template>
                    </vueTree>
                </template>
            </li>
        </ul>
    </transition>
</template>

<script>
    export default {
        name: 'vueTree',
        props: {
            options: Array
        },
        components: {},
        data () {
            return {
                visible: true,
                nodes: []
            }
        },
        created () {
            this.extendNodeValue(this.options)
        },
        mounted () {
        },
        watch: {
            options (value) {
                this.extendNodeValue(value)
            }
        },
        methods: {
            iconClick(event,i){
                var children = this.$children;
                for (let i = 0; i < children.length; i++) {
                    if (children[i].$el.parentElement.contains(event.target)) {
                        children[i].visible = children[i].visible ? false : true;
                       // this.nodes[i].extend = children[i].visible;
                    }
                }
                this.nodes[i].extend = !this.nodes[i].extend;
            },
            extendNodeValue(options){
                for (var i = 0; i < options.length; i++) {
                    this.$set(this.nodes, i,{data: options[i], extend: true})
                }
            },
            beforeEnter(el) {
                if (!el.dataset) el.dataset = {};
                el.dataset.oldPaddingTop = el.style.paddingTop;
                el.dataset.oldPaddingBottom = el.style.paddingBottom;
                el.style.height = '0';
                el.style.paddingTop = 0;
                el.style.paddingBottom = 0;
            },

            enter(el) {
                el.dataset.oldOverflow = el.style.overflow;
                if (el.scrollHeight !== 0) {
                    el.style.height = el.scrollHeight + 'px';
                    el.style.paddingTop = el.dataset.oldPaddingTop;
                    el.style.paddingBottom = el.dataset.oldPaddingBottom;
                } else {
                    el.style.height = '';
                    el.style.paddingTop = el.dataset.oldPaddingTop;
                    el.style.paddingBottom = el.dataset.oldPaddingBottom;
                }
                el.style.overflow = 'hidden';
            },

            afterEnter(el) {
                el.style.height = '';
                el.style.overflow = el.dataset.oldOverflow;
            },

            beforeLeave(el) {
                if (!el.dataset) el.dataset = {};
                el.dataset.oldPaddingTop = el.style.paddingTop;
                el.dataset.oldPaddingBottom = el.style.paddingBottom;
                el.dataset.oldOverflow = el.style.overflow;

                el.style.height = el.scrollHeight + 'px';
                el.style.overflow = 'hidden';
            },

            leave(el) {
                if (el.scrollHeight !== 0) {
                    el.style.height = 0;
                    el.style.paddingTop = 0;
                    el.style.paddingBottom = 0;
                }
            },

            afterLeave(el) {
                el.style.height = '';
                el.style.overflow = el.dataset.oldOverflow;
                el.style.paddingTop = el.dataset.oldPaddingTop;
                el.style.paddingBottom = el.dataset.oldPaddingBottom;
            }
        }
    }
</script>
<style scoped>
    ul, li {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .tree {
        overflow: hidden;
    }

    .treenode {
        padding-left: 30px;
        line-height: 36px;
    }

    .node-content {
        display: inline-block;
    }

    .icon{
        margin-top: 10px;
        float: left;
        transform-origin: center 25%;
        border-top: 10px solid #C7C7C7;
        border-right:10px solid transparent;
        border-bottom:10px solid transparent;
        border-left:10px solid transparent;
    }
    /*img {*/
        /*float: left;*/
        /*padding: 8px;*/
        /*margin-right: 8px;*/
    /*}*/

    .fade-enter-active, .fade-leave-active {
        transition: height .5s ease;
    }
    .expand {
        transition: all .5s;
        transform: rotate(0deg);
    }
    .shink {
        transition: all .5s;
        transform: rotate(-90deg);
    }
</style>
