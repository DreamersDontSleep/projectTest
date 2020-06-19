<template>
    <div class="main">
        <el-dialog
            title="新增用户"
            :visible.sync="dialog_user"
            @close="close_user"
            width="660px"
            :close-on-click-modal="false"
        >
            <el-form
                ref="ruleform_addUser"
                :rules="rule_add_user"
                :model="ruleform_addUser"
                :inline="true"
                label-width="80px"
            >
                <el-form-item prop="user_name" label="账号">
                    <el-input
                        style="width:100%"
                        v-model="ruleform_addUser.user_name"
                        placeholder="请输入账号"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="name" label="姓名">
                    <el-input
                        style="width:100%"
                        v-model="ruleform_addUser.name"
                        placeholder="请输入姓名"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input
                        style="width:100%"
                        v-model="ruleform_addUser.password"
                        placeholder="默认密码123456"
                        :disabled="true"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="电话">
                    <el-input
                        style="width:100%"
                        v-model="ruleform_addUser.phone"
                        placeholder="请输入电话"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input
                        style="width:100%"
                        v-model="ruleform_addUser.email"
                        placeholder="请输入邮箱"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" style="padding:0px 3px 0px;display: inline-block;">
                <el-button @click="close_user">取消</el-button>
                <el-button @click="submit_addUser('ruleform_addUser')">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="编辑用户"
            :visible.sync="dialog_editUser"
            @close="close_editUser"
            :close-on-click-modal="false"
            width="660px"
        >
            <el-form
                ref="ruleform_editUser"
                :model="ruleform_editUser"
                :rules="rule_edit_user"
                :inline="true"
                label-width="80px"
            >
                <el-form-item prop="user_name" label="账号">
                    <el-input
                        style="width:100%"
                        v-model="ruleform_editUser.user_name"
                        placeholder="请输入账号称"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="name" label="姓名">
                    <el-input
                        style="width:100%"
                        v-model="ruleform_editUser.name"
                        placeholder="请输入姓名"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="电话">
                    <el-input
                        style="width:100%"
                        v-model="ruleform_editUser.phone"
                        placeholder="请输入电话"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input
                        style="width:100%"
                        v-model="ruleform_editUser.email"
                        placeholder="请输入邮箱"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" style="padding:0px 3px 0px;display: inline-block;">
                <el-button @click="close_editUser">取消</el-button>
                <el-button @click="submit_editUser('ruleform_editUser')">确定</el-button>
            </span>
        </el-dialog>

        <div class="addnew">
            <el-button @click="dialog_addUser()">新增用户</el-button>
            <el-button @click="deletUser()">删除用户</el-button>
            
        </div>
        <el-table
            ref="table_user"
            :data="table_user"
            border
            height="0"
            style="width:100%"
            v-loading="user_loading"
            v-height-adaptive
            @selection-change="selection_userChange"
            :header-cell-style="{
                color: '#606266',
                padding: 0
            }"
            :default-sort="{ prop: 'edittime', order: 'descending' }"
        >
            <el-table-column align="center" header-align="center" type="selection" width="50"></el-table-column>
            <el-table-column align="center" header-align="center" prop="user_name" label="账号"></el-table-column>
            <el-table-column align="center" header-align="center" prop="name" label="姓名"></el-table-column>
            <el-table-column align="center" header-align="center" prop="phone" label="电话"></el-table-column>
            <el-table-column align="center" header-align="center" prop="email" label="邮箱"></el-table-column>
            <el-table-column align="center" label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        class="user_edit"
                        @click="dialog_openEditUser(scope.$index, scope.row)"
                    >编辑
                    </el-button>
                    <el-button
                        size="mini"
                        @click="initialpassword(scope.row)"
                    >初始化密码
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- </div> -->
        <div class="footer" style="margin:10px 0 0 0">
            <el-pagination
                :pager-count="5"
                style="text-align: right;margin-top: 12px;"
                background
                :page-size="user_pageSize"
                @size-change="user_SizeChange"
                @current-change="user_CurrentChange"
                :current-page="user_currentPage"
                :page-sizes="[10, 20, 50]"
                layout="sizes, prev, pager, next"
                :total="user_total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {
        all, //获取
        add, //添加
        deleteUser, //删除
        update, //编辑
    } from "@/api/user";

    export default {
        name: 'User',
        data() {
            return {
                usertype:'',
                table_user: [],
                isClick: false,
                userSearch: {
                    batchId: "",
                    index: 1,
                    limit: 10
                },
                loading: true,
                user_loading: false,
                dialog_user: false,
                dialog_editUser: false,
                dialog_setRole: false,
                selection_user: [],
                option_batchId: [],
                option_role: [],
                delUser: [],
                user_currentPage: 1,
                user_pageSize: 10,
                user_total: 0,
                user_searchInput: "",
                ruleform_addUser: {
                    user_name:'',
                    name:'',
                    password:'123456',
                    phone:'',
                    email:''
                },
                rule_add_user: {
                    user_name: [{required: true, message: "请输入账号", trigger: "blur"}],
                    name: [{required: true, message: "请输入姓名", trigger: "blur"}],
                },
                ruleform_editUser: {
                    id: "",
                    user_name:'',
                    name:'',
                    password:'123456',
                    phone:'',
                    email:''
                },
                rule_edit_user: {
                    user_name: [{required: true, message: "请输入账号称", trigger: "blur"}],
                    name: [{required: true, message: "请输入姓名", trigger: "blur"}],
                },
                userinfo:{}
            };
        },
        created() {
            this.getUserTable()
        },
        methods: {
            getUserTable(){
                let params = {
                    index: this.user_currentPage,
                    limit: this.user_pageSize
                }
                all(params).then(res=>{
                    console.log(res)
                    if(res.status==0){
                        this.user_total = res.data.total
                        this.table_user = res.data.list
                    }
                })
            },
            //用户分页-修改每页条数
            user_SizeChange(size) {
                this.user_currentPage = 1
                this.user_pageSize = size
                this.getUserTable()
            },
            //用户分页-修改当前页
            user_CurrentChange(cur) {
                this.user_currentPage = cur
                this.getUserTable()
            },
            //多选用户
            selection_userChange(val) {
                this.selection_user = val;
            },
            //新增用户
            dialog_addUser() {
                this.dialog_user = true;
            },
            //编辑用户
            dialog_openEditUser(index, row) {
                this.dialog_editUser = true;
                this.ruleform_editUser.id = row.uuid;
                this.ruleform_editUser.name = row.name;
                this.ruleform_editUser.phone = row.phone;
                this.ruleform_editUser.user_name = row.user_name;
                this.ruleform_editUser.email = row.email;
            },
            //提交新增用户表单
            submit_addUser(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let params = {
                            user_name: this.ruleform_addUser.user_name,
                            name: this.ruleform_addUser.name,
                            admin: false,
                            password: this.ruleform_addUser.password,
                            phone: this.ruleform_addUser.phone,
                            email: this.ruleform_addUser.email
                        };
                        add(params)
                            .then(res => {
                                console.log(res)
                                if (res.status == 0) {
                                    this.close_user()
                                    this.user_currentPage = 1
                                    this.getUserTable()
                                    this.$message.success("添加用户成功")
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                            .catch(() => {
                            });
                    } else {
                    }
                });
            },
            //提交编辑用户表单
            submit_editUser(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let params = {
                            uuid: this.ruleform_editUser.id,
                            user_name: this.ruleform_editUser.user_name,
                            name: this.ruleform_editUser.name,
                            phone:this.ruleform_editUser.phone,
                            email:this.ruleform_editUser.email
                        };
                        update(params).then(res => {
                            if (res.status == 0) {
                                this.dialog_editUser = false;
                                this.user_currentPage = 1
                                this.getUserTable()
                                this.$message.success("修改成功");
                            } else {
                                this.$message.error(res.msg);
                            }
                        });
                    }
                });
            },
            //初始化密码
            initialpassword(row) {
                let password = Md5("[" + row.user_name + ":" + 123456 + "]");
                let params = {
                    id: row.id,
                    initializationpassword: password
                };
                initial(params).then(res => {
                    if (res.data.status == 0) {
                        this.$message.success("初始化密码成功");
                    } else {
                        this.$message.error(res.data.data);
                    }
                });
            },
            //删除用户
            deletUser() {
                if (this.selection_user.length>0) {
                    let length = this.selection_user.length;
                    this.delUser = [];
                    for (let i = 0; i < length; i++) {
                        this.delUser.push(this.selection_user[i].uuid);
                    }
                    this.$confirm("确定删除该用户?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                        deleteUser(this.delUser).then(res => {
                            if (res.status == 0) {
                                this.$message.success("删除用户成功")
                                this.user_currentPage = 1
                                this.getUserTable()
                            } else {
                                this.$message.error(res.data.data);
                            }
                        });
                    })
                    .catch(() => {
                    })
                } else {
                    this.$message.warning("请至少选择一条数据");
                }
            },
            //关闭新增用户弹框
            close_user() {
                this.$refs["ruleform_addUser"].resetFields();
                this.dialog_user = false;
            },
            //关闭编辑用户弹框
            close_editUser() {
                // this.$refs['ruleform_editUser'].resetFields()
                this.dialog_editUser = false;
            },
        }
    };
</script>

<style lang="scss" scoped>
    .el-button--danger {
        color: #FFF;
        background-color: #fe6c25;
        border-color: #fe6c25;
    }
    /deep/ .el-dialog__body {
        padding-bottom: 0;
    }

    /deep/ .el-dialog__footer {
        margin-right: 24px; 
    }

    .main {
        padding:10px;
        box-sizing: border-box;
        // .card{
        .addnew {
            padding-bottom: 8px;
            margin-bottom: 10px;
            border-bottom: 1px solid #da4e0385;

            .searchForm {
                display: block;
                margin-bottom: 6px;

                /deep/ .el-form-item {
                    margin-bottom: 0;
                }

                float: right;
            }
        }

        .body2 {
            height: calc(100% - 156px);
            overflow: auto;

            .user_edit {
                background-color: #425066;
                border-color: #425066;
                color: #fff;
            }
        }
    }
</style>
