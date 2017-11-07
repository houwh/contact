<template>
    <div class="container">
        <div class="row">
            <!-- form: -->
            <!-- :form -->
            <div class="panel">
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>序号</th>
                                <th>登录名</th>
                                <th>联系人</th>
                                <th>联系人手机</th>
                                <th>行业</th>
                                <th>开户日期</th>
                                <th>开户人</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,i) in tableArr">
                                <td>{{ item.children[0].label }}</td>
                                <td>{{ item.children[0].value }}</td>
                                <!--<td>{{ item.connection.item.contact }}</td>-->
                                <!--<td>{{ item.connection.item.contactPhone }}</td>-->
                                <!--<td>{{ item.connection.item.industyClass }}</td>-->
                                <!--<td>{{ item.createAt }}</td>-->
                                <!--<td>{{ item.creater }}</td>-->
                                <!--<td >{{ item.connection.item.status }}</td>-->
                                <!--<td prop="userLockedValue">-->
                                    <!--<router-link to="customerEdit">-->
                                        <!--<span class="label label-sm label-danger" @click="customerEdit()">编辑</span>-->
                                    <!--</router-link>-->
                                    <!--&nbsp;&nbsp;-->
                                    <!--<router-link to="customerLicense">-->
                                        <!--<span class="label label-sm label-success" @click="customerLicense()">License管理</span>-->
                                    <!--</router-link>-->
                                <!--</td>-->
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li>
                    <a href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li v-for="(item,i) in tableId" :key="i" @click="numclick(i+1)">
                    <a href="javascript:;">{{item}}</a>
                </li>
                <li>
                    <a href="javascript:;" aria-label="Next">
                        <span aria-hidden="true" @click="nextpage">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>

</template>


<script>
    import 'src/bootstrap/pagina/extendPagination'
    import  tabledata from 'src/bootstrap/pagina/region.json'

    export default{
        data(){
            return{
                tabledata:tabledata,
                tableArr:[],
                tableId:'',
                currentpage:''
            }
        },
        methods:{
            numclick(id){
                this.currentpage = id;
                this.tableArr = [];
                for(var i=id*10-10; i<id*10; i++){
                    //this.tableArr.push(this.tabledata[i])
                    if(typeof(this.tabledata[i]) == 'undefined'){
                        console.log(i);
                        return;
                    }else{
                        this.tableArr.push(this.tabledata[i])
                        console.log(i)
                    }
                    console.log(this.tabledata[i])
                }
            },
            nextpage(){
                this.currentpage += 1;
                this.tableArr = [];
                for(var i=this.currentpage*10-10; i<this.currentpage*10; i++){
                    //this.tableArr.push(this.tabledata[i])
                    if(typeof(this.tabledata[i]) == 'undefined'){
                        console.log(i);
                        return;
                    }else{
                        this.tableArr.push(this.tabledata[i])
                        console.log(i)
                    }
                    console.log(this.tabledata[i])
                }
            }

        },
       mounted(){
            console.log(this.tabledata.length)
           this.tableId = Math.ceil(tabledata.length/10);
            //console.log(Math.ceil(this.tableId))
           for(var i = 0; i<10; i++){
               this.tableArr.push(this.tabledata[i])
           }
       }
    }
</script>
