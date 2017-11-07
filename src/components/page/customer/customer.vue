<template>
    <div class="row">
    <div class="col-lg-12">
        <h4 class="style1">
            客户账号管理
        </h4>
        <div class="form-group">
            <div class="row customer-form">
                <div class="col-md-2">
                    <select v-model="search" class="form-control">
                        <option value="登录名" >登录名</option>
                        <option value="联系人">联系人</option>
                        <option value="开户人">开户人</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="仅支持精确匹配查找">
                </div>
                <div class="col-md-1">
                    <button type="button" class="btn btn-primary">查询</button>
                </div>
                <router-link to="customerAdd">
                    <button type="button" class="btn btn-primary secondBtn">开户</button>
                </router-link>
            </div>
        </div>
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
                        <tr v-for="item in data2">
                            <td>{{ item.index }}</td>
                            <td>{{ item.username }}</td>
                            <td>{{ item.connection.item.contact }}</td>
                            <td>{{ item.connection.item.contactPhone }}</td>
                            <td>{{ item.connection.item.industyClass }}</td>
                            <td>{{ item.createAt }}</td>
                            <td>{{ item.creater }}</td>
                            <td >{{ item.connection.item.status }}</td>
                            <td prop="userLockedValue">
                                <router-link to="customerEdit">
                                    <span class="label label-sm label-danger" @click="customerEdit()">编辑</span>
                                </router-link>
                                &nbsp;&nbsp;
                                <router-link to="customerLicense">
                                    <span class="label label-sm label-success" @click="customerLicense()">License管理</span>
                                </router-link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
        <v-footer></v-footer>
    </div>
</template>



<script>
    import vFooter from 'src/components/common/footer.vue';

export default{
    components:{ vFooter },
    data(){
        return{
            search:'',
            data2:[{
                index:'1',
                username:'luz',
                createAt:'2017年8月7日',
                creater:'测试账号',
                connection:{
                    item:{
                        contact:'lin',
                        contactPhone:'13521665779',
                        industyClass:'互联网',
                        status:'1'
                    }
                },
            }]
        }
    },
    mounted(){

    },
    methods:{
        customerEdit(){

        },
        customerLicense(){

        }
    }
}

</script>


<style scoped>
    .table>thead>tr>th,.table>tbody>tr>td{
        text-align: center;
    }
    .btn{
        display: inline-block;
        height: 34px;
        width:100px;
        margin-left: 25px;
        outline: none;
    }
    .secondBtn{
        margin-left: 60px;
    }
    .form-control{
        margin-left: 15px;
    }
    .panel{
        border:1px solid #E5E5E5;
        box-shadow: 0 2px 18px #E5E5E5;
        margin: 0 15px;
    }

    .style1{ border-bottom: 1px solid #E5E5E5; padding: 20px; margin-top: 0;}

    .col-lg-12{ padding-right:0;}
    .customer-form{ margin: 25px 15px; border-bottom: 1px solid #E5E5E5; padding: 15px 0;
        box-shadow: 0 2px 18px #E5E5E5;
    }
</style>


