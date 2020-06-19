<template>
    <div>
        <el-container>
            <el-aside class="content" :width="asideWidth">
                <sidebar :foldStaus="status"></sidebar>
            </el-aside>
            <el-container>
                <el-header height="50px">
                    <navbar @burgerStatus="burgerStatus"></navbar>
                </el-header>
                <el-main height="calc(100% - 50px)">
                    <app-main>
                        <router-view/>
                    </app-main>
                </el-main>

            </el-container>
        </el-container>
    </div>
</template>

<script>
    import {Navbar, Sidebar, AppMain} from './components/index.js'

    export default {
        name: "Layout",
        components: {
            Navbar,
            Sidebar,
            AppMain
        },
        data() {
            return {
                status: false,
                asideWidth: '220px'
            }
        },
        methods: {
            burgerStatus(val) {
                this.status = val;
                if (val) {
                    this.asideWidth = '64px';
                } else {
                    this.asideWidth = '220px';
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import 'config/base.scss';

    .content {
        background: aside-color();
    }

    .el-header {
        height: 50px !important;
    }

    .el-main {
        height: calc(100% - 50px)
    }

    .el-main {
        & > div {
            height: 100%;

            /deep/ & > div {
                height: 100%;
            }
        }
    }
</style>
