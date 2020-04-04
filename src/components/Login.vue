<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/homelogo.png" alt="">
            </div>
            <!-- 登录表单 -->
            <el-form ref="loginFormRef"
                     :model="loginForm"
                     label-width="0px"
                     class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username"
                              prefix-icon="el-icon-user"
                              placeholder="请输入用户名"
                              @keyup.enter.native="login"
                              clearable>
                    </el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password"
                              prefix-icon="el-icon-lock"
                              placeholder="请输入密码"
                              show-password
                              @keyup.enter.native="login"
                              clearable>
                    </el-input>
                </el-form-item>
                <!--  按钮  -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: "cash",
                    password: "cash2298simon",
                }
            }
        },
        methods: {
            async login() {
                // TODO: 这里缺少请求失败的处理逻辑
                const {data: res} = await this.$axios.post("login/", {
                    username: this.loginForm.username,
                    password: this.loginForm.password,
                })


                if (res.status !== 200 || !res.status) {
                    console.log(res)
                    return this.$message.error("登录失败")
                }

                if (res.token) {

                    // 将后端传来的token保存在localStorage中。
                    window.localStorage.setItem("token", res.token)
                    window.localStorage.setItem("id", res.id)
                    window.localStorage.setItem("username", res.username)
                }
                await this.$router.push("/home")

            },

            resetLoginForm() {
                this.$refs.loginFormRef.resetFields()
            }
        }
    }
</script>

<style scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 400px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .avatar_box {
        width: 130px;
        height: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        /* 给边框加上阴影 */
        box-shadow: 0 0 10px #dddddd;
        /* 以下三行，让容器绝对定位。向右移一半的距离，
        然后在向左移自身的一半，实现居中。 */
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;
    }

    .avatar_box img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eeeeee;
    }

    .btns {
        /* 使用弹性盒模型，让两个按钮居右显示。 */
        display: flex;
        justify-content: flex-end;
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        /* 让form不要超出容器 (盒子溢出)*/
        box-sizing: border-box;
    }

</style>