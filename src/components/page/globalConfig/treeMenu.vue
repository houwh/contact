<template>
    <li>
        <div :class="" @click="toggle">
            <input type="checkbox" v-model="check">
            {{model.descresption}}
        </div>
        <ul>
            <item v-for = "childModel in model.children" :model.sync="childModel" :parentModel.sync="model" :on.sync="parentModel"></item>
        </ul>
    </li>
</template>

<script>

    export default{
        name:'item',

        props:['model','parentModel','on'],

        data(){
            return{
                check:true
            }
        },
        watch: {
            model:{
                handler:function(val,oldVal){
//                    var o = 0;
//                    if(val.children.length==11 || val.children.length==3){
//                        for(var i=0; i<val.children.length; i++){
//                            if(val.children.check){
//                                ++o
//                            }
//                        }
//                        if(o>0){
//                            val.check = true
//                        }else{
//                            val.check = false
//                        }
//                    }else{
//                        val.check = !val.check
//                    }
                },
                deep:true
            }
        },
        computed: {

        },
        methods: {
            toggle() {

            },
            fun(NUM){
//                var a = 0;
//                if (this.parentModel.children.length == NUM) {
//                    for (var i = 0; i < this.parentModel.children.length; i++) {
//                        if (this.parentModel.children[i].check) {
//                            ++a
//                        }
//                    }
//                    if (a == NUM) {
//                        this.parentModel.check = true
//                    } else {
//                        this.parentModel.check = false;
//                    }
//                }
            },
            changeType: function () {

            },
            toggle:function(){
//                遍历数据结构，父级影响子级
                var v = 0;
                if(this.model.children){
                    console.log(222);
                    if(this.model.children.length==3){
                        console.log(this.parentModel);
                        for(var i=0;i<this.parentModel.children.length; i++){
                            if(this.parentModel.children[i].check){
                               ++v
                            }
                        }
                        if(v>0){
                            this.parentModel.check = true
                        }else{
                            this.parentModel.check = false
                        }
                    }
                    for(let i=0;i<this.model.children.length;i++){
//                        console.log(333);
                        this.model.children[i].check = this.model.check;
                        if(this.model.children[i].children){
//
                            let doubledata = this.model.children[i].children;
                            for(let m=0;m<doubledata.length;m++){
                                doubledata[m].check = this.model.check;
                                if(doubledata[m].children){
                                    for(let n=0;n<doubledata[m].children.length;n++){
                                        doubledata[m].children[n].check = this.model.check;

                                    }
                                }
                            }
                        }
                    }
                }
//                客户编辑授权的  子影响父
                  else{
                    var b = 0;
                    for(let i=0;i<this.parentModel.children.length;i++){
                        if(this.parentModel.children[i].check == true){
                            ++b;
                        }else if(this.parentModel.children[i].check == false){
                            this.parentModel.check = false;
                        }
                        if(b>=1){
                            this.parentModel.check = true;
                        }else{
                            this.parentModel.check = false;
                        }
                    }
                };
//                var v = 0;
//                if(this.parentModel.children){
//                    for(var i=0; i<this.parentModel.children.length; i++){
//                        if(this.parentModel.children[i].check){
//                            ++v
//                        }
//                    }
////                    console.log(v)
//                   if(v==11 || v==3){
//                       this.parentModel.check = true
//                   }else{
//                       this.parentModel.check = false
//                   }
//                }
            },
        },
        mounted(){
            return this.model.children &&
                this.model.children.length
        },
        updated(){

        }
    }
</script>



<style scoped>
    body {
        font-family: Menlo, Consolas, monospace;
        color: #444;
    }
    .item {
        cursor: pointer;
    }
    .bold {
        font-weight: bold;
    }
    ul {
        padding-left: 35px;
        line-height: 23px;
        list-style-type: dot;
    }
    ul li{
        list-style: none;
    }
</style>
