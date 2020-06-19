<template>
    <div class="header-bg">
        <div class="header-left">
            <el-tooltip effect="dark" :content="burgerObj.text" placement="top">
                <i :class="burgerObj.icon" @click="foldSidebar"></i>
            </el-tooltip>
        </div>
        <!--        <div class="header-middle">中</div>-->
        <div class="header-right">
            <!--  <el-tooltip effect="dark" :content="fullObj.text" placement="top">
                 <i :class="['fa',fullObj.icon]" @click="isFullScreen"></i>
             </el-tooltip>
             <el-dropdown>
                 <el-avatar :size="44" src="https://empty" @error="errorHandler">
                     <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                 </el-avatar>
                 <i class="el-icon-arrow-down el-icon--right"></i>
                 <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item>{{ userName }}</el-dropdown-item>
                     <el-dropdown-item divided @click="changePassword">修改密码</el-dropdown-item>
                     <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
                 </el-dropdown-menu>
             </el-dropdown> -->
            <!-- <el-tooltip effect="dark" :content="fullObj.text" placement="top">
                <i :class="['fa',fullObj.icon]" @click="isFullScreen"></i>
            </el-tooltip> -->
            <span><img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                       class="user-icon"></span>
            <span>{{ userName }}</span>
            <span @click="changePassword">修改密码</span>
            <span @click="loginOut">退出登录</span>
        </div>

    </div>
</template>

<script>
    import {enterFullscreen, exitFullscreen} from 'utils/common.js'

    export default {
        name: "Navbar",
        data() {
            return {
                burgerObj: {
                    status: false,
                    icon: 'el-icon-s-fold',
                    text: '折叠',
                },
                fullObj: {
                    status: false,
                    icon: 'fa-arrows-alt',
                    text: '全屏',
                },
                userName: '管理员',
            }
        },
        mounted() {
            document.addEventListener("fullscreenchange", () => {
                if (document.fullscreenElement) {
                    this.fullObj.status = true;
                    this.fullObj.icon = 'fa-compress';
                    this.fullObj.text = '退出';
                } else {
                    this.fullObj.status = false;
                    this.fullObj.icon = 'fa-arrows-alt';
                    this.fullObj.text = '全屏';
                }
            }, false);
        },
        methods: {
            errorHandler() {
                return true
            },
            isFullScreen() {
                this.fullObj.status ? exitFullscreen() : enterFullscreen();
            },
            foldSidebar() {
                var myEvent = new Event('resize');
                window.dispatchEvent(myEvent);
                if (this.burgerObj.status) {
                    this.burgerObj.status = false;
                    this.burgerObj.text = '折叠';
                    this.burgerObj.icon = 'el-icon-s-fold';
                } else {
                    this.burgerObj.status = true;
                    this.burgerObj.text = '展开';
                    this.burgerObj.icon = 'el-icon-s-unfold';
                }
                this.$emit('burgerStatus', this.burgerObj.status)
            },
            changePassword() {
                console.log('修改密码');
            },
            async loginOut() {
                await this.$router.push('/login')
                // window.sessionStorage.clear()
            }
        }
    }
</script>

<style scoped lang="scss">
    @import 'config/base.scss';

    .header-bg {
        height: 50px;
        background: navbar-color();
        display: flex;
        justify-content: space-between;
        align-items: center;

        i {
            cursor: pointer;
            color: white;
        }

        .header-left {
            & > i {
                font-size: 32px;
                margin-left: 4px;
            }
        }

        .header-right {
            padding-right: 12px;

            & > i {
                font-size: 24px;
                margin-right: 16px;
                vertical-align: middle;
            }

            .el-dropdown {
                vertical-align: middle;
                cursor: pointer;
            }

            span {
                padding: 0 10px;
                border-right: 1px solid #ffffff50;
                cursor: pointer;
                vertical-align: middle;

                .user-icon {
                    vertical-align: middle;
                    height: 35px;
                    border-radius: 20px;
                }
            }

            span:nth-child(1) {
                border-right: none;
                cursor:default;
            }
            span:nth-child(2){
                cursor:default;
            }
            span:last-child {
                border-right: none;
            }
        }
    }
</style>
