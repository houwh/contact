<script>
import util from '../libs/util.js'
export default {
    name: 'deleteModal',
    props: {
        deleteType:String, // customer是客户,agent是代理商
        deleteId:String, 
    },
    data(){
        return{
            message:'',
        }
    },
    methods: {
        deleteTip(){
        this.$Modal.confirm({
            title: '系统提示',
            content: '<p style="font-size:15px;">您确定要删除该'+this.message+'吗？</p>',
            onOk: ()=>{
                if(this.deleteType=='department'){
                    this.$store.dispatch('deleteDepartment',this.deleteId)
                    .then(data=>{
                        this.$Message.success('成功删除');
                    }).catch(err=>{
                        console.log(err);
                    })
                    this.$store.dispatch('getDepartment')
                }
            },
            onCancel: () => {
                this.$Message.info('取消删除');
            }
        });
        }
    },
    created(){
        if(this.deleteType=='department'){
            this.message = '部门';
        }
    }
}
</script>
