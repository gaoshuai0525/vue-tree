<template>
    <transition name='fade'>
    <ul class="tree" v-show="visible">
        <li class="treenode" v-for="(item,i) in options">
            <img src="./up_two.png" @click="iconClick($event)" :class="nodes[i].extend ? 'expand' :''"/>
            <slot name="renderContent" :item="item" :options="options" >
            </slot>
            <template v-if="item.child">
                <vueTree :options="item.child">
                    <img src="./up_two.png" @click="iconClick($event)"/>
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
        components:{
        },
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
            iconClick(event){
                var children = this.$children;
                for(var i = 0;i < children.length; i++){
                    if(children[i].$el.parentElement.contains(event.target)){
                        children[i].visible = children[i].visible ? false: true;
                        this.nodes[i].extend = children[i].visible;
                    }
                }
            },
            extendNodeValue(options){
                for(var i = 0; i < options.length; i++){
                    this.nodes.push({data: options[i],extend: true})
                }
            }
        }
    }
</script>
<style scoped>
    ul,li{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .tree{
        overflow: hidden;
    }
    .treenode{
        padding-left: 30px;
        line-height: 36px;
    }
    .node-content{
        display: inline-block;
    }
    img{
        float: left;
        padding: 8px;
        margin-right: 8px;
    }
    .fade-enter-active,.fade-leave-active{
        transition:height 5s ease;
    }
    .fade-enter,.fade-leave-active{
        height: 0;
        padding-bottom: 0;
    }
    .expand{
        transform: rotate(90deg);
    }
</style>
