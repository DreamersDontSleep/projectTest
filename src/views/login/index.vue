<template>
    <div class="login-container">
        <div class="formDiv">
            <div class="titleDiv">
                <div class="logoDiv">
                    <!-- <img src="../../assets/logo.png" alt="" class="logo">
                    <img src="../../assets/images/logo-shadow.png" alt="" class="logo-shadow"> -->
                </div>
                <div class="title">智能情报分析系统</div>
            </div>
            <el-form
                    :model="loginForm"
                    :rules="loginRules"
                    ref="loginForm"
                    label-width="82px"
                    label-position="left"
                    class="login_form"
                    auto-complete="on"
            >
                <el-form-item label="用户名" id="lab" prop="username">
                    <el-input v-model="loginForm.username"
                              placeholder="请输入用户名"
                              prefix-icon="iconfont icon-user"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="passwordLabel" prop="password">
                    <el-input v-model="loginForm.password"
                              placeholder="请输入密码"
                              prefix-icon="iconfont icon-3702mima"
                              type="password"
                              show-password
                              autocomplete="off"
                              @keyup.enter.native="handleLogin"
                    ></el-input>
                </el-form-item>
                <span class="err" v-show="errIf">{{err}}</span>
                <el-form-item class="password">
                    <el-button :loading="loading" type="primary" size="mini" @click.native.prevent="handleLogin"
                               style="margin-left:0">登 &nbsp;&nbsp; 录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Md5 from 'js-md5'
    import {
        login,//登录
    } from "@/api/user";

    export default {
        name: 'Login',
        data() {
            const validateUsername = (rule, value, callback) => {
                const reg = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/
                if (value.length > 0) {
                    if (!validUsername(value) && reg.test(value)) {
                        callback(new Error('请输入正确的用户名格式'))
                    } else {
                        callback()
                    }
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 1) {
                    callback(new Error('密码不能少于1位'))
                } else {
                    callback()
                }
            }
            return {
                errIf: false,
                err: '',
                passwordLabel: `密\xa0\xa0\xa0\xa0码`,
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 1, max: 15, message: '长度在2到15个字符', trigger: 'blur'}],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}]
                },
                loading: false,
                passwordType: 'password',
                redirect: undefined,
                tipsIsShow: false,
                tips: ''
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            },
            loginForm: {
                handler: function (val) {
                    if (val.username == '' || val.password == '') {
                        this.errIf = false
                    }
                },
                deep: true
            }
        },
        methods: {
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },
            handleLogin() {
                 this.$refs.loginForm.validate(valid => {
                  if (valid) {
                    
                    this.loading = true
                    // let formData = new FormData()
                    // formData.append("user", this.loginForm.username)
                    // formData.append("password", this.loginForm.password)
                    // console.log(formData);
                    let params={
                        "user_name": this.loginForm.username,
                        "password": this.loginForm.password
                    }
                    console.log(this.loginForm.username) //ok
                    console.log(this.loginForm.password) //ok
                    login(params).then(res=>{
                          console.log(res);
                          if(res.status==0){
                                this.$router.push('/IIAS/economic')
                                this.loading = false
                               this.errIf=false
                          }else{
                               this.loading = false
                               this.errIf=true
                               this.err='用户名密码错误'
                          }
                    
                      
                    }).catch((error) => {
                        return error
                    })
                    //-------------------------------------------------------
                    // this.$store.dispatch('login', formData).then((res) => {
                    //     // console.log("登录")
                    //   this.$router.push('/IIAS/economic')
                    //   this.loading = false
                    // //   console.log("login")
                    //   this.errIf=false
                    // }).catch((error) => {
                    //   this.loading = false
                    //   this.errIf=true
                    //   this.err='用户名密码错误'
                    // })
                    //-------------------------------------------------------

                  } else {
                    return false
                  }
                }) 
                // this.$router.push('/IIAS/economic')
            }
        }
    }
</script>

<style lang="scss">
    @import "config/base.scss";
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

    $bg: #fff;
    $light_gray: #fff;
    $cursor: #606266;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container .el-input input {
            color: $cursor;
        }
    }

    /* reset element-ui css */
    .login-container {
        height: 100%;
        overflow-y: auto;
        background: bg-img();
        background-size: cover;

        .el-input {
            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 0;
                color: $light_gray;
                height: 30px;
                caret-color: $cursor;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }


            .login_form .el-input__inner {
                height: 30px;
                line-height: 30px;
            }

            .el-input--prefix .el-input__inner {
                padding-left: 30px;
            }

            .el-input__inner {
                -webkit-appearance: none;
                background-color: #fff;
                background-image: none;
                border-radius: 4px;
                border: 1px solid #dcdfe6;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                color: #606266;
                display: inline-block;
                font-size: inherit;
                height: 40px;
                line-height: 40px;
                outline: 0;
                padding: 0 15px;
                -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
                transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
                width: 100%;
            }
        }
    }
</style>

<style lang="scss" scoped>
    @import "config/base.scss";

    .formDiv {
        text-align: center;
        width: 645px;
        margin: 100px auto 0 auto;
        height: 392px;
        background: form-bg-img();
        background-size: 100% 100%;
        position: relative;
        border-radius: 5px;

        .titleDiv {
            position: absolute;
            height: 120px;
            width: 100%;
            top: 46px;

            .logoDiv {
                width: 100px;
                float: left;
                margin-left: 92px;

                .logo {
                    width: 90px;
                }

                .logo-shadow {
                    margin-top: 7px;
                }
            }

            .title {
                // float: left;
                margin-top: 24px;
                margin-left: 86px;
                font-size: 30px;
                font-weight: 400;
                color: #fff;
                text-align: center;
                text-shadow: 0 1px 5px rgba(0, 0, 0, .5);
                letter-spacing: 9px;
            }
        }

        .login_form {
            position: absolute;
            top: 185px;
            width: 100%;
            padding-left: 130px;

            /deep/ .el-form-item {
                margin-bottom: 15px;
            }

            /deep/ .el-input__inner {
                height: 30px;
                line-height: 30px;
            }

            /deep/ .el-form-item {
                margin-bottom: 15px;
            }

            /deep/ .el-form-item__label {
                color: login-label-color();
                font-weight: 700 !important;

                &::before {
                    display: none;
                }
            }

            /deep/ .el-form-item__error {
                color: rgb(228, 46, 10) !important;
            }

            .password {
                margin-top: 36px;

                .el-button {
                    width: 100%;
                    border-color: login-button-border();
                    border-radius: 5px;
                }
            }

            .err {
                color: rgb(228, 46, 10);
                position: absolute;
                bottom: 64px;
                left: 215px;
                font-size: 12px;
            }

            /deep/ .el-form-item__content {
                width: 303px;
            }

            /deep/ .el-button--primary {
                background: login-button-border();
            }
        }

        .btns {
            .el-button {
                // width: 130px;
                width: 100%;
            }

        }

    }

</style>
