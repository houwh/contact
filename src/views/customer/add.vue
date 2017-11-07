<template>
    <div>
        <Card>
            <h3>客户开户</h3>
            <form-add type='customer'></form-add>
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
