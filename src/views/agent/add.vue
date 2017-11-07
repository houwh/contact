<template>
    <div>
        <Card>
            <h3>代理商开户</h3>
            <form-add type='agent'></form-add>
        </Card>
    </div>
</template>
<script>
import util from '../../libs/util.js';
import FormAdd from '../../components/formAdd.vue';
export default {
    name: 'agentAdd',
    components: {
        FormAdd,
    },
    data() {
        return {

        }
    }
}
</script>
