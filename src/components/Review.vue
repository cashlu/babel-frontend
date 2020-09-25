<template>
    <div id="review">
        <el-card>
            <!-- 项目详情的表单 -->
            <el-form :model="detailForm"
                     ref="detailFormRef"
                     label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="项目编号：">
                            <el-input v-model="detailForm.sn" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="项目名称：">
                            <el-input v-model="detailForm.name" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="委托方：">
                    <el-input v-model="detailForm.principal" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="鉴定对象：">
                    <el-input v-model="detailForm.target" :readonly="true"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="委托时间：">
                            <el-date-picker
                                :readonly="true"
                                v-model="detailForm.trust_date"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="受理时间：">
                            <el-date-picker
                                :readonly="true"
                                v-model="detailForm.created_date"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="鉴定机构：">
                    <el-input v-model="detailForm.org_name" :readonly="true"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="鉴定类别：">
                            <el-input v-model="detailForm.type_name" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="鉴定用途：">
                            <el-input v-model="detailForm.purpose_name" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="二次鉴定：">
                    <el-switch
                        disabled
                        v-model="detailForm.is_re_appraisal"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="委托事项：">
                    <el-input type="textarea"
                              :readonly="true"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="detailForm.trust_detail"></el-input>
                </el-form-item>
                <el-form-item label="立项审批人：">
                    <el-input v-model="detailForm.reviewer_name" :readonly="true"></el-input>
                </el-form-item>
            </el-form>
            <el-divider></el-divider>

            <!-- 审批链 -->
            <el-card class="box-card">
                <el-collapse>
                    <el-collapse-item title="审批链" name="1">
                        <el-timeline :reverse="true">
                            <el-timeline-item v-for="record in checkRecords" :timestamp="record.created_date"
                                              placement="top">
                                <el-card>
                                    <h4>审批人：{{ record.reviewer_name }}</h4>
                                    <p>审批意见：{{ record.opinion }}</p>
                                    <p>审批结果： {{ record.status_text }}</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </el-collapse-item>
                </el-collapse>
            </el-card>

            <el-divider></el-divider>

            <!--审批表单-->
            <el-card>
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
                <br>
                <span>
                    <el-button type="info" @click="redirectToBasicInfo()" style="font-weight: bold">关 闭</el-button>
                    <el-button type="warning" @click="reviewTransient()" style="font-weight: bold">暂 存</el-button>
                    <el-button type="danger" @click="reviewBack()" style="font-weight: bold">打 回</el-button>
                    <el-button type="primary" @click="reviewSubmit()" style="font-weight: bold">通 过</el-button>
                </span>
            </el-card>
        </el-card>
    </div>
</template>

<script>


export default {
    name: "Review",
    props: {
        id: "",
    },
    data() {
        return {
            detailForm: {},
            reviewForm: {},
            reviewRules: {
                opinion: [
                    {required: false, message: "请输入审批意见", trigger: "blur"},
                ],
                created_date: [
                    {required: false, message: "请选择审批日期", trigger: "blur"},
                ]
            },
            reviewType: "r",
            lastStage: "1",
            nextStage: "4",
            lastTodoType: "1",
            nextTodoType: "2",
            lastUser: "",
            checkRecords: [],
            basicInfoId: "",
        }
    },
    methods: {
        async getBasicInfoDetail() {
            const res = await this.$axios.get("basicinfos/" + this.basicInfoId)
            if (res.status !== 200) {
                this.$message.error("获取项目信息失败")
            }
            this.detailForm = res.data
            this.lastUser = res.data.creator
            console.log(this.detailForm)
        },

        // 获取审批记录
        async getCheckRecords(basicInfoId) {
            const res = await this.$axios.get("checkrecords/",
                {
                    params: {
                        basic_info_id: basicInfoId,
                    }
                })
            if (res.status !== 200) {
                return this.$message.error("获取审批链失败")
            }
            this.checkRecords = res.data.results
        },

        // 返回项目列表
        redirectToBasicInfo() {
            this.$router.push("/basicinfos")
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
            this.reviewForm.type = "r"
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
            if (res.data.results[0]) {
                let todoId = res.data.results[0].id
                const updateRes = await this.$axios.patch("/todo/" + todoId + "/", {
                    finished: true
                })
                if (updateRes.status !== 200) {
                    return this.$message.error("更新待办事项不状态失败")
                }
            }

        },

        // 暂存
        reviewTransient() {
            // 暂存：创建审批记录，不更新项目stage，不添加todo，不更新todo
            this.$refs.reviewFormRef.validate(async (valid) => {
                if (!valid) {
                    return this.$message.error("表单验证失败")
                }
                // 创建审批记录
                await this.saveCheckRecord("t")     // t代表暂存

                // 刷新项目列表
                this.redirectToBasicInfo()

            })
        },

        // 打回
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

                this.redirectToBasicInfo()

            })
        },

        // 通过
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

                this.redirectToBasicInfo()

            })
        },
    },
    created() {
        this.basicInfoId = this.$route.query.id
        this.getBasicInfoDetail()
        this.getCheckRecords(this.basicInfoId);
    }
}
</script>

<style scoped>

</style>