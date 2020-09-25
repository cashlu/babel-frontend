<template>
    <div id="reviewform">
        <el-form :model="reviewForm"
                 :rules="reviewRules"
                 ref="reviewFormRef"
                 label-width="120px">
            <el-form-item label="审批意见：" prop="opinion" required>
                <el-input type="textarea"
                          :autosize="{ minRows: 4, maxRows: 10}"
                          v-model="reviewForm.opinion">
                </el-input>
            </el-form-item>
            <el-form-item label="审批时间：" prop="created_date" required>
                <el-date-picker
                    v-model="reviewForm.created_date"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="info" @click="redirectToBasicInfo()" style="font-weight: bold">返 回</el-button>
            <el-button type="info" @click="closeDialog()" style="font-weight: bold">关 闭</el-button>
            <el-button type="warning" @click="reviewTransient()" style="font-weight: bold">暂 存</el-button>
            <el-button type="danger" @click="reviewBack()" style="font-weight: bold">打 回</el-button>
            <el-button type="primary" @click="reviewSubmit()" style="font-weight: bold">通 过</el-button>
        </span>
    </div>
</template>

<script>
export default {
    name: "ReviewForm",
    props: {
        // 父组件传递过来的参数
        basicInfoId: "",
        // 目前的审批目的(r:初审  p:校对  f:终审)
        state: "",
        // 待审批的表单责任人
        lastUser: "",
        // 下一环节责任人
        nextUser: "",
        // 审批类型（立项审批、校对、终审）
        reviewType: "",
        // 上一环节的stage
        lastStage: "",
        // 下一环节的stage
        nextStage: "",
        // 上一环节的todoType
        lastTodoType: "",
        // 下一环节的todoType
        nextTodoType: "",

    },
    data() {
        return {
            reviewForm: {},
            reviewRules: {
                opinion: [
                    {required: false, message: "请输入审批意见", trigger: "blur"},
                ],
                created_date: [
                    {required: false, message: "请选择审批日期", trigger: "blur"},
                ]
            },
            todoItem: {
                basic_info: this.basicInfoId,

            },
        }
    },
    methods: {
        // 暂存
        // 如果state == r :
        // 如果state == p :
        // 如果state == f :

        reviewTransient() {
            // 暂存：创建审批记录，不更新项目stage，不添加todo，不更新todo
            this.$refs.reviewFormRef.validate(async (valid) => {
                if (!valid) {
                    return this.$message.error("表单验证失败")
                }
                // 创建审批记录
                await this.saveCheckRecord("t")

                // 关闭对话框
                this.closeDialog()

                // 刷新项目列表
                this.$emit("getBasicInfoList")

            })
        },
        reviewBack() {
            // 打回：创建审批记录，更新项目stage，给lastUser创建todo，将当前用户todo更新为已办
            this.$refs.reviewFormRef.validate(async (valid) => {
                if (!valid) {
                    return this.$message.error("表单验证失败")
                }

                // 创建审批记录
                await this.saveCheckRecord("b")

                // 更新项目stage
                await this.updateBasicInfoStage(this.lastStage)

                // 更新当前用户todo为完成
                await this.updateTodo()

                // 给lastUser添加todo
                await this.saveTodo(true, this.lastUser, this.lastTodoType)

                // 关闭对话框
                this.closeDialog()

                // 刷新项目列表
                this.$emit("getBasicInfoList")

            })
        },

        reviewSubmit() {
            // 审批通过：创建审批记录，更新项目stage，给nextUser创建todo，将当前用户的todo更新为已办

            this.$refs.reviewFormRef.validate(async (valid) => {
                if (!valid) {
                    return this.$message.error("表单验证失败")
                }

                // 创建审批记录
                await this.saveCheckRecord("s")

                // 更新项目stage
                await this.updateBasicInfoStage(this.nextStage)

                // 更新当前用户todo为完成
                await this.updateTodo()

                // 给nextUser添加todo
                // 如果下一个环节的todoType是2,代表下一个环节是立卷，不创建todo
                console.log(this.nextTodoType)
                if (this.nextTodoType !== "2") {
                    await this.saveTodo(true, this.nextUser, this.nextTodoType);
                }
                // 关闭对话框
                this.closeDialog()

                // 刷新项目列表
                this.$emit("getBasicInfoList")

            })
        },

        // 更新basicInfo的stage字段
        async updateBasicInfoStage(stage) {
            const res = await this.$axios.patch("basicinfos/" + this.basicInfoId + "/",
                {
                    stage: stage
                })
            if (res.status !== 200) {
                return this.$message.error("重置项目stage失败")
            } else {
                return this.$message.success("重置项目stage成功")
            }
        },

        // 创建审批记录
        async saveCheckRecord(status) {
            this.reviewForm.type = this.reviewType
            this.reviewForm.status = status
            this.reviewForm.basicInfo = this.basicInfoId
            // 审批人为当前的登录用户
            this.reviewForm.reviewer = window.localStorage.getItem("id")
            const res = await this.$axios.post("checkrecords/", this.reviewForm)
            if (res.status !== 201) {
                this.$message.error("创建审批记录失败");
            } else {
                this.$message.success("创建审批记录成功")
            }
        },

        // 创建待办
        // user根据情况，选择lastUser或nextUser
        // type: (1, "初审")
        //       (2, "立卷")  # 预留，立卷人目前为抢占机制
        //       (3, "校对")
        //       (4, "终审")
        //       (5, "归档")
        async saveTodo(isBack, user, type) {
            const res = await this.$axios.post("todo/", {
                basic_info: this.basicInfoId,
                finished: false,
                type: type,
                user: user,
                is_back: isBack,
            })
            if (res.status !== 201) {
                return this.$message.error("添加待办事项失败")
            }
        },

        // 更新待办为已办
        // 针对一个basicInfo，获取最后一个todo，如果其finished为false，则置为true。
        // FIXME: 这个处理逻辑不好，因为后端接口的问题，无法获取最后一个记录，在后端重构的时候解决这个问题
        async updateTodo() {
            const res = await this.$axios.get("/todo", {
                params: {
                    basic_info: this.basicInfoId
                }
            })
            if (res.status !== 200) {
                return this.$message.error("获取待办事项失败")
            }
            let todoId = res.data.results[0].id
            const updateRes = await this.$axios.patch("/todo/" + todoId + "/", {
                finished: true
            })
            if (updateRes.status !== 200) {
                return this.$message.error("更新待办事项不状态失败")
            }
        },

        // 关闭父组件的审批对话框
        closeDialog() {
            this.$emit("closeDialog")
        },

        redirectToBasicInfo() {
            this.$router.push("/basicinfos")
        }
    },
    created() {
    }
}
</script>

<style scoped>

</style>