<template>
    <div>
        <h4 class="style1">
            {{title}}
        </h4>
        <div class="leftBtn">
            <router-link to="customer">
                <button type="button" class="btn btn-default" onclick="history.go(-1)">返回</button>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default{
        props:{
            'title':{
                default:''
            }
        }
    }
</script>

<style scoped>
    .style1{ float: left; line-height: 45px; margin-top: 0;}
    .leftBtn{line-height: 45px; float: right}
    .emptyBtn{
        height:45px;
    }
    .btn{
        padding: 6px 30px;
    }
</style>
