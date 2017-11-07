<style lang="less">
@import './editable-table.less';
</style>
<template>
    <div>
        <Table stripe :ref="refs" :loading="loading" :columns="columnsList" :data="thisTableData" border></Table>
    </div>
</template>
<script>
import * as tableButton from './tableButton';

export default {
    name: 'EditableTable',
    props: {
        refs: String,
        columnsList: Array,
        tableData: Array,
        url: String,
        modalState:Boolean,
        viewProp: {
            type: Function,
            default () {
                return () => {}
            }
        },
        visitorProp: {
            type: Function,
            default () {
                return () => {}
            }
        },
        expandProp: {
            type: Function,
            default () {
                return () => {}
            }
        },
        checkProp: {
            type: Function,
            default () {
                return () => {}
            }
        },
        editProp: {
            type: Function,
            default () {
                return () => {}
            }
        },
        deleteProp: {
            type: Function,
            default () {
                return () => {}
            }
        },
        permissionProp: {
            type: Function,
            default () {
                return () => {}
            }
        },
        roleProp: {
            type: Function,
            default () {
                return () => {}
            }
        },
        licenseProp: {
            type: Function,
            default () {
                return () => {}
            }
        }
    },
    data() {
        return {
            columns: [],
            loading: true,
            thisTableData: this.tableData,
            edittingStore: []
        };
    },
    watch: {
        tableData(data) {
            if (data) {
                this.loading = false;
            }
            this.thisTableData = data;
            this.init();
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            let vm = this;
            let len = this.columnsList.length;

            for (var i = len; i--;) {
                let item = this.columnsList[i]
                if (item.handle) {
                    item.render = (h, param) => {
                        let currentRowData = this.thisTableData[param.index];

                        let renderArr = [];

                        item.handle.forEach(item => {
                            renderArr.push(tableButton[item + 'Button'](this, h, currentRowData, param.index,this.modalState));
                        });

                        return h('div', renderArr);
                    };
                }
            }
        }
    }
};
</script>
