<template>
    <div>
        <Card>
            <h3>代理商编辑</h3>
            <form-edit type='agent' :formValidate2='ageById'></form-edit>
        </Card>
    </div>
</template>
<script>
import util from '../../libs/util.js';
import formEdit from '../../components/formEdit.vue';
import {
    mapState,
    mapActions,
    mapGetters
} from 'vuex'

export default {
    components: {
        formEdit,
    },
    computed: mapGetters(['ageById']),
    data() {
        return {
            id: '',
            // cusById:{}
        }
    },
    watch: {
        '$route': function(val) {
            console.log(val, '1111')
            this.id = val.query.id
            this.$store.dispatch('getAgentByID', this.id)
        }
    },
    created() {
        this.id = this.$route.query.id;
        this.$store.dispatch('getAgentByID', this.id)
    },
}
</script>
