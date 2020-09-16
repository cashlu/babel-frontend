<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>鉴定信息</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  卡片区-->
        <el-card class="box-card">
            <!-- 添加按钮 -->
            <el-row>
                <el-col>
                    <el-button type="primary" @click="showAddDialog">添加鉴定信息</el-button>
                </el-col>
            </el-row>
            <!-- 项目列表 -->
            <el-table stripe
                      :data="apprInfoList"
                      style="width: 100%">
                <!-- 索引列 -->
                <el-table-column type="index" label="序号"></el-table-column>
                <!-- 数据列 -->
                <el-table-column
                    prop="basic_info_sn"
                    label="项目编号"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="basic_info_name"
                    min-width="180"
                    label="项目名称">
                </el-table-column>
                <el-table-column
                    prop="contact"
                    min-width="100"
                    label="联系人">
                </el-table-column>
                <el-table-column
                    min-width="100"
                    prop="phone"
                    label="联系电话">
                </el-table-column>
                <el-table-column
                    min-width="100"
                    prop="appraisal_date"
                    label="鉴定日期">
                </el-table-column>
                <el-table-column label="操作" width="260px">
                    <template v-slot="scope">
                        <!-- 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 -->
                        <el-button size="mini"
                                   type="primary"
                                   @click="showDetailDialog(scope.row)"
                                   icon="el-icon-edit">查看
                        </el-button>
                        <el-button size="mini"
                                   type="primary"
                                   @click="showEditDialog(scope.row.id)"
                                   v-show="scope.row.basic_info_stage === 5"
                                   icon="el-icon-edit">编辑
                        </el-button>
                        <el-button size="mini"
                                   type="danger"
                                   @click="deleteApprInfo(scope.row)"
                                   v-show="scope.row.basic_info_stage === 5"
                                   icon="el-icon-delete">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!--分页-->
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="basicInfoQueryInfo.page"
            :page-sizes="[10, 20, 50]"
            :page-size="basicInfoQueryInfo.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total">
        </el-pagination>

        <!-- 添加项目的对话框 -->
        <el-dialog
            title="添加鉴定信息"
            :close-on-click-modal="false"
            :visible.sync="addDialogVisible"
            width="80%">
            <!-- 添加项目的表单 -->
            <el-form :model="addForm"
                     :rules="apprInfoFormRules"
                     ref="addFormRef"
                     label-width="100px">
                <!-- prop是验证规则 -->
                <el-form-item label="项目：" prop="basic_info">
                    <el-select v-model="addForm.basic_info" placeholder="请选择">
                        <el-option
                            v-for="item in projectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- TODO: el-form-item的样式和transfer有冲突-->
                <el-form-item label="鉴定人员：" prop="appraisal_team">
                    <el-transfer
                        filterable
                        filter-placeholder="请输入姓名"
                        v-model="addForm.appraisal_team"
                        :data="transferUserList">
                    </el-transfer>
                </el-form-item>
                <el-form-item label="立卷人" prop="archivist">
                    <el-select v-model="addForm.archivist" placeholder="请选择">
                        <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="校对人" prop="proofreader">
                    <el-select v-model="addForm.proofreader" placeholder="请选择">
                        <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="复核人" prop="final_reviewer">
                    <el-select v-model="addForm.final_reviewer" placeholder="请选择">
                        <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="鉴定地址" prop="appraisal_address">
                    <el-input v-model="addForm.appraisal_address" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="addForm.contact" placeholder="请输入联系人姓名"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="addForm.phone" placeholder="请输入联系人电话"></el-input>
                </el-form-item>
                <el-form-item label="基本案情" prop="project_detail">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="addForm.project_detail"></el-input>
                </el-form-item>
                <el-form-item label="主要鉴定意见" prop="opinion">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="addForm.opinion"></el-input>
                </el-form-item>
                <el-form-item label="鉴定时间：" prop="appraisal_date">
                    <el-date-picker
                        v-model="addForm.appraisal_date"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="讨论时间：" prop="discuss_date">
                    <el-date-picker
                        v-model="addForm.discuss_date"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button type="info" @click="addDialogVisible = false" style="font-weight: bold">取 消</el-button>
            <el-button type="warning" @click="saveApprInfo(5)" style="font-weight: bold">暂 存</el-button>
            <el-button type="primary" @click="saveApprInfo(6)" style="font-weight: bold">提 交</el-button>
          </span>
        </el-dialog>

        <!-- 编辑信息的对话框 -->
        <el-dialog
            title="编辑鉴定信息"
            :close-on-click-modal="false"
            :visible.sync="editDialogVisible"
            width="80%">
            <el-form :model="editForm"
                     :rules="apprInfoFormRules"
                     ref="editFormRef"
                     label-width="120px">
                <!-- prop是验证规则 -->
                <el-form-item label="项目：" prop="basic_info">
                    <el-input v-model="editForm.basic_info_name" readonly></el-input>
                </el-form-item>
                <!-- TODO: el-form-item的样式和transfer有冲突-->
                <el-form-item label="鉴定人员：" prop="appraisal_team">
                    <el-transfer
                        filterable
                        filter-placeholder="请输入姓名"
                        v-model="editForm.appraisal_team"
                        :data="transferUserList">
                    </el-transfer>
                </el-form-item>
                <el-form-item label="立卷人" prop="archivist">
                    <el-select v-model="editForm.archivist" placeholder="请选择">
                        <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="校对人" prop="proofreader">
                    <el-select v-model="editForm.proofreader" placeholder="请选择">
                        <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="复核人" prop="final_reviewer">
                    <el-select v-model="editForm.final_reviewer" placeholder="请选择">
                        <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="鉴定地址" prop="appraisal_address">
                    <el-input v-model="editForm.appraisal_address" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="editForm.contact" placeholder="请输入联系人姓名"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="editForm.phone" placeholder="请输入联系人电话"></el-input>
                </el-form-item>
                <el-form-item label="基本案情" prop="project_detail">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="editForm.project_detail"></el-input>
                </el-form-item>
                <el-form-item label="主要鉴定意见" prop="opinion">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="editForm.opinion"></el-input>
                </el-form-item>
                <el-form-item label="鉴定时间：" prop="appraisal_date">
                    <el-date-picker
                        v-model="editForm.appraisal_date"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="讨论时间：" prop="discuss_date">
                    <el-date-picker
                        v-model="editForm.discuss_date"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="editDialogVisible = false" style="font-weight: bold">取 消</el-button>
                <el-button type="warning" @click="updateApprInfo(5)" style="font-weight: bold">暂 存</el-button>
                <el-button type="primary" @click="updateApprInfo(6)" style="font-weight: bold">提 交</el-button>
          </span>
        </el-dialog>


        <!-- 查看信息的对话框 -->
        <el-dialog
            title="查看鉴定信息"
            :close-on-click-modal="false"
            :visible.sync="detailDialogVisible"
            width="80%">
            <el-form :model="detailForm"
                     :rules="apprInfoFormRules"
                     ref="detailFormRef"
                     label-width="100px">
                <!-- prop是验证规则 -->
                <el-form-item label="项目：" prop="basic_info">
                    <el-input v-model="detailForm.basic_info_name" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="鉴定人员：" prop="appraisal_team">
                    <!--<el-input v-model="detailForm.appraisal_team" :readonly="true"></el-input>-->
                    <el-transfer filterable
                                 filter-placeholder="请输入姓名"
                                 v-model="detailForm.appraisal_team"
                                 :data="transferUserList">
                    </el-transfer>
                </el-form-item>
                <el-form-item label="立卷人" prop="archivist">
                    <el-input v-model="detailForm.archivist_name" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="校对人" prop="proofreader">
                    <el-input v-model="detailForm.proofreader_name" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="复核人" prop="final_reviewer">
                    <el-input v-model="detailForm.final_reviewer_name" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="鉴定地址" prop="appraisal_address">
                    <el-input v-model="detailForm.appraisal_address" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="detailForm.contact" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="detailForm.phone" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="基本案情" prop="project_detail">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="detailForm.project_detail"
                              :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="主要鉴定意见" prop="opinion">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="detailForm.opinion"
                              :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="鉴定时间：" prop="appraisal_date">
                    <el-date-picker
                        v-model="detailForm.appraisal_date"
                        :readonly="true"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="讨论时间：" prop="discuss_date">
                    <el-date-picker
                        v-model="detailForm.discuss_date"
                        :readonly="true"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="detailDialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "ApprInfos",
    data() {
        // 校验手机号
        let checkMobile = (rule, value, callback) => {
            // 匹配手机号的正则表达式
            const regMobile = /^(0086|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if (regMobile.test(value)) {
                return callback()
            }
            return callback(new Error("请输入正确的手机号码"))
        }
        return {
            loginUserID: "",
            // get查询的分页参数
            basicInfoQueryInfo: {
                query: "",
                page: 1,
                size: 10,
                stage: "",
                paginator: false,
            },
            apprInfoQueryInfo: {
                page: 1,
                size: 10,
                stage: 1,
                paginator: true,
            },
            total: 0,
            apprInfoList: [],
            addDialogVisible: false,
            editDialogVisible: false,
            detailDialogVisible: false,
            apprTeamList: [],
            basicInfoIds: [],
            addForm: {
                basic_info: "",
                appraisal_team: [],
                final_reviewer: "",
                final_reviewer_name: "",
                archivist: "",
                proofreader: "",
                appraisal_address: "",
                contact: "",
                phone: "",
                appraisal_date: "",
                discuss_date: "",
                project_detail: "",
                opinion: "",
            },
            editForm: {
                basic_info: "",
                basic_info_name: "",
                appraisal_team: [],
                final_reviewer: "",
                final_reviewer_name: "",
                archivist: "",
                proofreader: "",
                appraisal_address: "",
                contact: "",
                phone: "",
                appraisal_date: "",
                discuss_date: "",
                project_detail: "",
                opinion: "",
            },
            detailForm: {
                basic_info: "",
                appraisal_team: [],
                final_reviewer: "",
                final_reviewer_name: "",
                archivist: "",
                proofreader: "",
                appraisal_address: "",
                contact: "",
                phone: "",
                appraisal_date: "",
                discuss_date: "",
                project_detail: "",
                opinion: "",
            },
            apprInfoFormRules: {
                basic_info: [
                    {required: true, message: "请选择对应的项目", trigger: "change"},
                ],
                // FIXME: 这个验证规则对transfer无效，稍后解决
                appraisal_team: [
                    {required: true, message: "请选择鉴定人员", trigger: "change"},
                ],
                appraisal_address: [
                    {required: true, message: "请输入地址", trigger: "blur"},
                ],
                contact: [
                    {required: true, message: "请输入联系人姓名", trigger: "blur"},
                ],
                phone: [
                    {required: true, message: "请输入手机号码", trigger: "blur"},
                    // {min: 11, max: 18, message: "手机号码的长度在11-18位之间", trigger: "blur"},
                    {validator: checkMobile, trigger: "blur"},
                ],
                project_detail: [
                    {required: true, message: "请输入基本案情", trigger: "blur"},
                ],
                opinion: [
                    {required: true, message: "请输入鉴定意见", trigger: "blur"},
                ],
                final_reviewer: [
                    {required: true, message: "请选择复核人", trigger: "blur"},
                ],
                archivist: [
                    {required: true, message: "请选择立卷人", trigger: "blur"},
                ],
                proofreader: [
                    {required: true, message: "请选择校对人", trigger: "blur"},
                ],
                appraisal_date: [
                    {required: true, message: "请选择日期", trigger: "blur"},
                ],
                discuss_date: [
                    {required: true, message: "请选择日期", trigger: "blur"},

                ]
            },
            projectList: [],
            transferUserList: [],
            userList: [],
        }
    },
    methods: {
        async getApprInfoList() {
            const res = await this.$axios.get("apprinfos/",
                {
                    params: this.apprInfoQueryInfo
                }
            )
            if (res.status !== 200) {
                return this.$message.error("获取鉴定信息列表失败，请刷新页面重试")
            }
            this.apprInfoList = res.data.results
            this.total = res.data.count
        },
        showAddDialog() {
            this.getBasicInfoList("4")
            this.addDialogVisible = true
            this.$nextTick(() => {
                this.addForm = {}
                this.$refs.addFormRef.resetFields()
            })

        },
        // 编辑按钮的点击事件，打开修改鉴定信息的对话框，并带入数据。
        async showEditDialog(id) {
            const res = await this.$axios.get("apprinfos/" + id)
            if (res.status !== 200) {
                return this.$message.error("获取鉴定信息详情失败")
            }
            this.editForm = res.data
            this.editDialogVisible = true
        },
        showDetailDialog(row) {
            this.detailDialogVisible = true
            this.detailForm = row
        },

        // 分页器size变化的监听事件
        handleSizeChange(size) {
            this.apprInfoQueryInfo.size = size
            this.getApprInfoList()
        },
        // 分页器page变化的监听事件
        handleCurrentChange(page) {
            this.apprInfoQueryInfo.page = page
            this.getApprInfoList()
        },
        async getBasicInfoList(stage) {
            this.basicInfoQueryInfo.paginator = false
            this.basicInfoQueryInfo.stage = stage
            const res = await this.$axios.get("basicinfos/", {
                params: this.basicInfoQueryInfo
            })
            if (res.status !== 200) {
                return this.$message.error("获取项目列表失败")
            }
            this.projectList = res.data
        },
        async getUserList() {
            const {data: res} = await this.$axios.get("users")
            this.userList = res
            for (let i = 0; i < res.length; i++) {
                let user = {}
                user["key"] = res[i].id
                user["label"] = res[i].name
                this.transferUserList.push(user)
            }
        },
        saveApprInfo(stage) {   //stage=5暂存   6提交
            this.$refs.addFormRef.validate(async (valid) => {
                if (!valid) {
                    this.$message.error("表单验证失败")
                    return
                }
                const res = await this.$axios.post("apprinfos/", this.addForm)
                if (res.status !== 201) {
                    return this.$message.error("创建鉴定信息失败")
                }
                // 重置状态
                const projRes = await this.$axios.patch("basicinfos/"
                    + this.addForm.basic_info + "/",
                    {
                        "stage": stage
                    })
                if (projRes.status !== 200) {
                    this.$message.error("重置状态失败")
                }
                this.addDialogVisible = false
                await this.getApprInfoList()
                // this.getBasicInfoList("1")
                this.$message.success("添加鉴定信息成功")
            })
        },
        updateApprInfo(stage) {
            this.$refs.editFormRef.validate(async (valid) => {
                if (!valid) {
                    this.$message.error("表单验证失败")
                    return
                }
                const res = await this.$axios.put("apprinfos/" + this.editForm.id + "/",
                    this.editForm)
                if (res.status !== 200) {
                    return this.$message.error("创建鉴定信息失败")
                }
                // 重置状态
                const projRes = await this.$axios.patch("basicinfos/" +
                    this.editForm.basic_info + "/",
                    {
                        "stage": stage
                    })
                if (projRes.status !== 200) {
                    this.$message.error("重置状态失败")
                }
                this.editDialogVisible = false
                await this.getApprInfoList()
                // this.getBasicInfoList("0")
                this.$message.success("添加鉴定信息成功")
            })
        },

        async deleteApprInfo(row) {
            const confirmResult = await this.$confirm('此操作将永久删除该项目, 是否继续?',
                '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false,
                }).catch(err => {
                return err
            })
            if (confirmResult !== "confirm") {
                return this.$message.info("已取消删除")
            }
            const res = await this.$axios.delete("apprinfos/" + row.id)
            if (res.status !== 204) {
                this.$message.error("删除失败")
            }
            // 重置basic_info的stage
            const projRes = await this.$axios.patch("basicinfos/" + row.basic_info + "/",
                {
                    "stage": 4
                },
                {
                    params: {
                        stage: 0
                    }
                }
            )
            if (projRes.status !== 200) {
                this.$message.error("重置状态失败")
            }
            this.getApprInfoList()
        },
        async getUserName(ids) {
            for (let i = 0; i < ids.length; i++) {
                const res = await this.$axios.get("users/" + ids[i])
                this.apprTeamList.push(res.data.name)
            }
        },
        // 获取当前登录用户的ID
        getLoginUserID() {
            this.loginUserID = window.localStorage.getItem("id");
        },


    },
    created() {
        this.getApprInfoList()
        // this.getBasicInfoList("0")
        this.getUserList()
        this.getLoginUserID();
    }
}
</script>

<style scoped>
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.demo-table-expand .full-width {
    width: 100%;
}
</style>