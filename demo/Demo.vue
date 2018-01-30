<template>
    <div id="app" class="levels">
        <v-tree :options="treeOptions">
            <div slot="renderContent" slot-scope="props" class="s_tr">

                <div class="s_content">
                    <li>
                        {{props.item?props.item.name:null}}
                    </li>
                    <li>{{props.item?props.item.des:null}}</li>
                    <li class="s_t_option">
                        <button class="add" @click="addClick(props.item)">添加</button>
                        <button class="delete" @click="deleteClick(props.item,props.options)">删除</button>
                    </li>
                </div>
            </div>
        </v-tree>
    </div>
</template>

<script>

import vTree from '../src/index'

export default {
  components: {
    'v-tree': vTree
  },
  data () {
    return {
        treeOptions: [
            {name:'1',des:'1',code:'1',
                child:[
                    {name:'1-1',des:'1-1',code:'1-1'}]},
            {name:'2',des:'2',code:'2',child:[
                {name:'2-1',des:'2-1', code:'2-1', child:[
                    {name:'2-1-1',des:'2-1-1',code:'2-1-1'},
                    {name:'2-1-2',des:'2-1-2',code:'2-1-2',child:[
                        {name:'2-1-2-1',des:'2-1-2-1',code:'2-1-2-1'}
                    ]}
                ]}
            ]}
        ],
    }
  },

  methods: {
      deleteClick(item,options){
          var index = options.findIndex(obj => item == obj)
          options.splice(index,1)
      },
      addClick(item){
          if(!item.child){
              this.$set(item,'child',[])
          }
              item.child.push({
                  name:item.name+'-'+(item.child.length+1),
                  des:item.name+'-'+(item.child.length+1),
                  code:item.name+'-'+(item.child.length+1)
              })

      }
  },

}
</script>

<style lang="stylus">
    .delete{
        margin-left: 4rem;
    }
    .add, .delete{
        display: inline-block;
        line-height: .1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #fff;
        color: #607ada;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        border-radius: 4px;
    }
    .levels{
        width:97%;
        background:#e0eef2;
        padding:1rem 0.7rem 1rem 1rem;
        box-sizing: border-box;
        margin:0 auto;
        margin-top:-0.8rem;
    }
    .s_tr{
        border-collapse: collapse;
        background:#e0eef2;
        box-shadow:none;
        margin:0;
        margin-left: 30px;
        overflow: hidden;
    }
    .s_tr li{
        width: 25%;
        display: table-cell;
        text-align: center;
    }
    .s_tr .s_content{
        display: table;
        background:#fff;
        width: 100%;
        margin-bottom: 10px;
        box-shadow:2px 3px 5px rgba(167, 142, 142, 0.1);
    }
</style>
