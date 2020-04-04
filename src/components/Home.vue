<template>
    <el-container class="home-container">
        <!--  头部  -->
        <el-header>
            <div>
                <img class="logo" src="../assets/homelogo.png" alt="">
                <span>司法鉴定管理系统</span>
            </div>
            <div>
                <el-avatar shape="square" size="medium"
                           src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <el-button type="primary" @click="logout">退出</el-button>
            </div>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapsed ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏菜单区 -->
                <!--TODO: 详细了解:router:"true"这个配置的细节-->
                <!--TODO: 了解一下default-active的配置-->
                <el-menu
                        :router="true"
                        :collapse="this.isCollapsed"
                        :collapse-transition="false"
                        unique-opened
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#409bff"
                        :default-active="$route.path">

                    <!-- 一级菜单 -->
                    <!-- index中拼接字符串，是因为这个属性的期望值是个字符串-->
                    <el-submenu :index="item.menu_id + ''" v-for="item in menuList"
                                v-bind:key="item.id">
                        <!-- 一级菜单模板区 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-box"></i>
                            <!-- 文本 -->
                            <span>{{item.title}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/' + subItem.url"
                                      v-for="subItem in item.subMenu"
                                      v-bind:key="subItem.menu_id">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{subItem.title}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 主体 -->
            <el-main>
                <!-- 路由占位符 -->
                <!--<transition name="el-zoom-in-bottom">-->
                <router-view></router-view>
                <!--</transition>-->
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                menuList: [],
                login_state: false,
                token: localStorage.token || sessionStorage.token,
                isCollapsed: false,
            }
        },
        methods: {
            // 判断用户是否登录
            is_login() {
                this.login_state = !!this.token
            },
            // 退出登录
            logout() {
                window.localStorage.clear()
                window.sessionStorage.clear()
                this.login_state = false
                this.$message.info("退出登录")
                this.$router.push("/login")
            },
            async getMenuList() {
                const {data: res} = await this.$axios.get("menus")
                if (res.status !== 200) {
                    return this.$message.error("获取菜单失败")
                }
                // this.$message.success("menu success")
                this.menuList = res.data
            },

            // 点击按钮切换菜单的折叠
            toggleCollapse() {
                this.isCollapsed = !this.isCollapsed
            }
        },
        created() {
            this.getMenuList()
            this.is_login()
        }
    }
</script>

<style scoped>

    .logo {
        height: 50px;
        margin-left: 30px;
        margin-right: 15px;
    }

    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: #373d41;
        /*  左右的这种布局，用flex做最轻松  */
        display: flex;
        justify-content: space-between;
        /* 让logo紧挨左侧边缘 */
        padding-left: 0;
        /* 让右侧按钮垂直居中(不设置居中的话，会在垂直方向沾满空间) */
        align-items: center;
        color: #ffffff;
        font-size: 20px;
    }

    .el-header div {
        display: flex;
        align-items: center;
    }

    .el-header div span {
        margin-left: 15px;
    }

    .el-aside {
        background-color: #333744;
    }

    .el-main {
        background-color: #eaedf1;
    }

    .el-menu {
        /* TODO: 貌似el-menu比上层容器宽了一个像素？ */
        /*width: 200px;*/
        border-right: 0;
    }

    .iconfont {
        margin-right: 10px;
    }

    .toggle-button {
        background-color: #4a5064;
        font-size: 10px;
        line-height: 20px;
        text-align: center;
        color: #ffffff;
        /* 让3条竖线之间有点儿间距 */
        letter-spacing: 0.2em;
        cursor: pointer;
    }

    .el-avatar {
        margin-right: 20px;
    }
</style>