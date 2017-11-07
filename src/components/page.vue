<style lang="less">
@import './page.less';
</style>
<template>
    <div>
        <Row type="flex" justify="end">
            <Col>
            <Page ref="Page" :total="total" show-total show-elevator show-sizer placement="top" @on-change="pageChangeFunc" @on-page-size-change="sizeChangeFunc"></Page>
            </Col>
        </Row>
    </div>
</template>
<script>
import util from '../libs/util.js';

export default {
    name: 'PageCom',
    props: {
        totalCount: Number,
        commit: String,
        cusId: String,
        ageId: String
    },

    data() {
        return {
            total: 0,
        };
    },
    created() {
        let id = this.cusId || this.ageId;
        this.$store.dispatch(this.commit, {
            page: 1,
            size: 10,
            id: id
        });
    },
    watch:{
        totalCount(val){
            this.total = val;
        }
    },
    methods: {
        pageChangeFunc(index) {
            let id = this.cusId || this.ageId;

            let size = this.$refs.Page.pageSize;
            this.$store.dispatch(this.commit, {
                page: index,
                size: size,
                id:id,
            });
        },
        sizeChangeFunc(index) {
            this.$refs.Page.pageSize = index;
            this.$store.dispatch(this.commit, {
                page: 1,
                size: index,
            });
        }
    }
}
</script>
