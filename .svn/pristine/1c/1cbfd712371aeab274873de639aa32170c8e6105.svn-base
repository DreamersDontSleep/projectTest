<template>
    <div>
        <div class="feature-header">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item label="国家：">
                    <el-select v-model="searchForm.country" placeholder="请选择国家">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in countryList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="feature-content">
            <loading v-show="loading"></loading>
            <div v-show="!loading" :style="{'text-align':isNull? 'center':'' }" class="structure"
                 v-for="items in positionData" :key="items.country">
                <span class="title">{{items.country}}</span>
                <!--                <span class="title">{{'历史政党总数：' + items.totalStructure}}</span>-->
                <el-scrollbar
                        :native="false"
                        :noresize="false">
                    <el-steps v-for="positionItem in items.positions"
                              :key="positionItem.positionTitle"
                              :active="items.positions.length + 999"
                              align-center>
                        <span>{{positionItem.positionTitle}}</span>
                        <el-step
                                v-for="item in positionItem.personVOList"
                                :key="item.person"
                                :title="item.person"
                                @click.native="showEssay(item.content)"
                                :description="item.content">
                        </el-step>
                    </el-steps>
                </el-scrollbar>
            </div>
        </div>
        <!--        文章显示-->
        <el-dialog
                title="点击空白处关闭"
                :visible.sync="dialogVisible"
                width="60%">
            <span>{{dialogText}}</span>
        </el-dialog>
    </div>
</template>

<script>
    import {getCountryList} from 'api/common.js'
    import {getPositionDetails} from 'api/politics.js'
    import loading from 'components/loading'

    export default {
        name: 'Job',
        components: {
            loading
        },
        data() {
            return {
                loading: false,
                isNull: true,
                countryList: [],
                dialogVisible: false,
                dialogText: '',
                searchForm: {
                    country: '',
                },
                positionData: []
            }
        },
        created() {
            getCountryList().then(res => {
                this.countryList = res.data;
            });
            this.loading = true;
            this.getPositionDetailsData();
        },
        methods: {
            //展示文章
            showEssay(val) {
                this.dialogVisible = true;
                this.dialogText = val;
            },
            search() {
                this.loading = true;
                this.getPositionDetailsData();
            },
            getPositionDetailsData() {
                getPositionDetails(this.searchForm).then(res => {
                    if (this.$check.isNullData(res)) {
                        this.positionData = [{
                            country: '暂无数据'
                        }]
                        this.isNull = true;
                        return
                    }
                    this.isNull = false;
                    this.positionData = res.data;
                }).catch(() => {
                    this.positionData = [{
                        country: '暂无数据'
                    }]
                    this.isNull = true;
                }).finally(() => {
                    this.loading = false;
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    /deep/ .el-dialog {
        height: 75%;
        /*overflow: auto;*/
        .el-dialog__body {
            height: 75%;
            overflow: auto;

            .time {
                color: #f8690d;
            }
        }
    }

    .feature-header {
        border-left: 4px solid #f8690d;
        padding-left: 14px;
        background-color: #f8690d0a;
    }

    .el-form-item {
        margin-top: 8px;
        margin-bottom: 8px;
    }

    .feature-content {
        font-size: 16px;
        color: #f8690d;
    }

    .party-tag {
        margin: 4px;
        cursor: pointer;
    }


    .structure {
        margin-top: 6px;
        border: 1px solid #f8690d;
        padding: 8px;
        height: 172px;
        border-radius: 4px;
        /*overflow: auto;*/

        .el-scrollbar {
            height: calc(100% - 24px);
        }

        .title {
            color: #f8690d;;
        }

        span {
            margin-right: 48px;
        }

        .el-steps {
            cursor: pointer;
            margin-top: 12px;
        }

        /deep/ .el-step__description {
            /*width: 72px;*/
            /*overflow: hidden;*/
            /*text-overflow: ellipsis;*/
            /*white-space: nowrap;*/
            /*word-wrap:break-word*/
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            word-wrap: break-word;
            word-break: break-all;
        }
    }

</style>
