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
        <loading v-show="loading"></loading>
        <div v-show="!loading" class="info" v-height-adaptive>
            <el-scrollbar
                    :native="false"
                    :noresize="false">
                <ul>
                    <li v-for="(item,index) in foucesEssay" :key="item.uuid"
                        @click="showEssay(item)">
                        <el-tooltip v-if="item.name.length >9" class="title" effect="dark"
                                    :content="item.name"
                                    placement="left">
                            <span class="title" :style="{'background-color': ColorF(index)}">{{item.name}}</span>
                        </el-tooltip>
                        <span v-else class="title" :style="{'background-color': ColorF(index)}">{{item.name}}</span>
                        <span>{{item.details}}</span>
                    </li>
                </ul>
            </el-scrollbar>
        </div>
        <!--        文章显示-->
        <el-dialog
                title="点击空白处关闭"
                :visible.sync="dialogVisible"
                width="60%">
            <div class="members">
                <span>组织成员：</span>
                <el-tag v-for="item in membersData" :key="item" class="members-tags" size="mini" effect="plain">
                    {{item.name + '：'+ item.dutyName}}
                </el-tag>
            </div>
            <span>{{dialogText}}</span>
        </el-dialog>
    </div>

</template>

<script>
    import {getCountryList} from 'api/common.js'
    import {getReactionaryProfile, getReactionaryMembers} from 'api/politics.js'
    import loading from 'components/loading'

    export default {
        name: "Forces",
        components: {
            loading
        },
        data() {
            return {
                loading: false,
                countryList: [],
                searchForm: {
                    country: '',
                },
                dialogVisible: false,
                dialogText: '',
                foucesEssay: [],
                membersData: []
            }
        },
        created() {
            getCountryList().then(res => {
                this.countryList = res.data;
            });
            this.loading = true;
            this.getReactionaryProfileData();
        },
        methods: {
            //排行颜色格式化
            ColorF(val) {
                let color = '#1989fa';
                switch (val) {
                    case 0 :
                        color = '#f56c6c';
                        break;
                    case 1 :
                        color = '#ffb980';
                        break;
                }
                return color;
            },
            //展示文章
            showEssay(val) {
                this.dialogVisible = true;
                this.dialogText = val.details;
                this.getReactionaryMembersData(val.uuid);
            },
            search() {
                this.loading = true;
                this.getReactionaryProfileData();
            },
            //获取反动势力
            getReactionaryProfileData() {
                getReactionaryProfile(this.searchForm).then(res => {
                    if (this.$check.isNullData(res)) {
                        this.foucesEssay = [{
                            name: '无',
                            details: '暂无数据'
                        }]
                        return
                    }
                    this.foucesEssay = res.data;
                }).catch(() => {
                    this.foucesEssay = [{
                        name: '无',
                        details: '暂无数据'
                    }]
                }).finally(() => {
                    this.loading = false;
                })
            },
            //获取组织成员
            getReactionaryMembersData(id) {
                getReactionaryMembers({reactionaryUuid: id}).then(res => {
                    if (this.$check.isNullData(res)) {
                        this.membersData = [{
                            name: '无人名',
                            dutyName: '无职位'
                        }]
                        return
                    }
                    this.membersData = res.data;
                }).catch(() => {
                    this.membersData = [{
                        name: '无人名',
                        dutyName: '无职位'
                    }]
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    ul {
        margin: 0;
        padding: 0;
    }

    /deep/ .el-dialog {
        height: 75%;
        /*overflow: auto;*/
        .el-dialog__body {
            height: 75%;
            overflow: auto;
        }
    }

    .members {
        span {
            font-size: 14px;
        }

        .members-tags {
            margin: 4px;
        }
    }


    .info {
        /*height: 100%;*/
        height: 500px;
        width: 100%;
        overflow: auto;

        .el-scrollbar {
            height: calc(100%);
        }

        li {
            margin-top: 8px;

            span:nth-child(2) {
                &:hover {
                    color: #ff7824;
                }
            }

        }

        span {
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            vertical-align: middle;

            overflow: hidden;
        }

        .title {
            display: inline-block;
            width: 120px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border-radius: 4px;
            margin-left: 6px;
            margin-right: 12px;
            background-color: #5cb87a;
            cursor: pointer;

            & ~ span {
                color: #303133;
                font-size: 14px;
                cursor: pointer;
                width: calc(100% - 138px);
            }
        }
    }

</style>
