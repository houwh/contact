<template>
    <div>
        <Card>
            <h3>客户编辑</h3>
            <form-edit type='customer' :formValidate2='cusById'></form-edit>
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
    computed: mapGetters(['cusById']),
    data() {
        return {
            id: '',
            // cusById:{}
        }
    },
    watch: {
        '$route': function(val) {
            console.log(val, '==============')
            this.id = val.query.id
            this.$store.dispatch('getCustomerByID', this.id)
        },
    },
    created() {
        this.id = this.$route.query.id;
        this.$store.dispatch('getCustomerByID', this.id)
    },
}
</script>
