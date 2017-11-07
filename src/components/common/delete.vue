<template>
    <div class="modal fade bs-example-modal-delete" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">系统提示</h4>
                </div>
                <div class="modal-body">
                    <p class="modal-body-p">{{name}}</p>
                </div>
                <div class="modal-footer footer-pard">
                    <div class="col-md-12">
                        <button type="submit" class="btn btn-effect-ripple btn-primary">确定</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props: {
            name:{
                default:"dawdawdawd"
            }
        }
    }
</script>

<style scoped>
    .modal-title{
        text-align: center;
        color: #fff;
    }
    .modal-header{
        background-color:#286090;
        padding: 10px;
    }
    .modal-content{overflow: hidden}
    .modal-body-p{ text-align: center; line-height: 20px;}
    .footer-pard{ padding-top: 0;}
    .modal-footer{
        border: none;
        text-align: center;
    }
    .btn{
        padding: 6px 35px;
    }
</style>
