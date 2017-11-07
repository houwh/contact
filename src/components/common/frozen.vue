<template>
    <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">系统提示</h4>
                </div>
                <div class="modal-body">
                    <h5 class="modal-body-p">{{frozenName}}成功！</h5>
                </div>
                <div class="modal-footer footer-pard">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props:{
            frozen:{
                default:""
            },
            frozenName:{
                default:""
            }
        }
    }
</script>

<style scoped>
    .modal-header{
        background-color:#286090;
        padding: 10px;
    }
    .modal-content{overflow: hidden}
    .modal-body-p{ text-align: center; line-height: 20px; margin: 0; font-size: 16px;}
    .modal-title{
        text-align: center;
        color: #fff;
        height: 25px;
        line-height: 25px;
    }
    .modal-footer{
        border: none;
        text-align: center;
    }
    .btn{
        padding: 6px 35px;
    }
</style>
