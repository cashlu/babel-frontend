<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>项目列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  卡片区-->
        <el-card class="box-card">
            <!-- 添加项目的按钮区 -->
            <el-row>
                <el-col>
                    <el-button type="primary" @click="showAddDialog">添加项目</el-button>
                </el-col>
            </el-row>
            <!-- 项目列表 -->
            <el-table
                :data="basicInfoList"
                style="width: 100%">
                <!-- 索引列 -->
                <el-table-column type="index" label="序号"></el-table-column>
                <!-- 数据列 -->
                <el-table-column
                    sortable
                    prop="sn"
                    label="项目编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="项目名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="trust_date"
                    label="委托日期">
                </el-table-column>
                <!-- FIXME: 排序有问题，需要处理-->
                <el-table-column
                    prop="is_finished"
                    :formatter="formatBoolean"
                    sortable
                    label="是否完结">
                    <template v-slot="scope">
                        <el-tag class="finish-tag" effect="plain" v-if="scope.row.stage==='11'" type="success">已完结
                        </el-tag>
                        <el-tag class="finish-tag" effect="plain" v-else type="danger">未完结</el-tag>
                    </template>
                </el-table-column>
                <el-table-column min-width="250px" label="操作">
                    <template v-slot="scope">
                        <!-- 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 -->
                        <el-button size="mini"
                                   type="primary"
                                   @click="showDetailDialog(scope.row)"
                                   icon="el-icon-edit">查 看
                        </el-button>
                        <!-- 判断stage，如果该项目不是立项中阶段（1），则不能修改-->
                        <!-- TODO: 删除、编辑等按钮的显示逻辑，例如归属人才能删除 -->
                        <el-button size="mini"
                                   type="warning"
                                   @click="showEditDialog(scope.row.id)"
                                   v-show="scope.row.stage === '1' && scope.row.creator === parseInt(loginUserID)"
                                   icon="el-icon-edit">编 辑
                        </el-button>

                        <el-button size="mini"
                                   type="danger"
                                   @click="deleteBasicInfo(scope.row.id)"
                                   v-show="scope.row.creator === parseInt(loginUserID)"
                                   icon="el-icon-delete">删 除
                        </el-button>
                        <el-button size="mini"
                                   type="success"
                                   @click="redirectToReview(scope.row.id)"
                                   v-show="scope.row.reviewer === parseInt(loginUserID) && (scope.row.stage === '2' || scope.row.stage === '3')"
                                   icon="el-icon-delete">初 审
                        </el-button>
                        <el-button size="mini"
                                   type="primary"
                                   @click="toProofread(scope.row.id)"
                                   v-show="scope.row.proofreader === parseInt(loginUserID)  && (scope.row.stage === '6' || scope.row.stage === '7')"
                                   icon="el-icon-delete">校 对
                        </el-button>
                        <el-button size="mini"
                                   type="success"
                                   @click="toFinalReview(scope.row.id)"
                                   v-show="scope.row.final_reviewer === parseInt(loginUserID)  && (scope.row.stage === '8' || scope.row.stage === '9')"
                                   icon="el-icon-delete">终 审
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!--  分页  -->
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.page"
            :page-sizes="[10, 20, 50]"
            :page-size="queryInfo.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total">
        </el-pagination>

        <!-- 添加项目的对话框 -->
        <el-dialog
            title="添加项目基础信息"
            :close-on-click-modal="false"
            :visible.sync="addDialogVisible"
            @close="addDialogClosed"
            width="80%">
            <!-- 添加项目的表单 -->
            <el-form :model="addForm"
                     :rules="basicInfoRules"
                     ref="addFormRef"
                     label-width="120px">
                <!-- prop是验证规则 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="项目编号：" prop="sn">
                            <el-input v-model="addForm.sn"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="项目名称：" prop="name">
                            <el-input v-model="addForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="委托方：" prop="principal">
                    <el-input v-model="addForm.principal"></el-input>
                </el-form-item>
                <el-form-item label="鉴定对象：" prop="target">
                    <el-input v-model="addForm.target"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="委托时间：" prop="trust_date">
                            <el-date-picker
                                v-model="addForm.trust_date"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="受理时间：" prop="created_date">
                            <el-date-picker
                                v-model="addForm.created_date"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="鉴定机构：" prop="org">
                    <el-select v-model="addForm.org" placeholder="请选择">
                        <el-option
                            v-for="item in orgList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="鉴定类别：" prop="type">
                            <el-select v-model="addForm.type" placeholder="请选择">
                                <el-option
                                    v-for="item in apprType"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="鉴定用途：" prop="purpose">
                            <el-select v-model="addForm.purpose" placeholder="请选择">
                                <el-option
                                    v-for="item in apprPurps"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="二次鉴定：">
                    <el-switch
                        v-model="addForm.is_re_appraisal"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="委托事项：" prop="trust_detail">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="addForm.trust_detail"></el-input>
                </el-form-item>
                <el-form-item label="立项审批人：" prop="reviewer">
                    <el-select v-model="addForm.reviewer" placeholder="请选择">
                        <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="addDialogVisible = false" style="font-weight: bold">取 消</el-button>
                <el-button type="warning" @click="saveBasicInfo('1')" style="font-weight: bold">暂 存</el-button>
                <el-button type="primary" @click="saveBasicInfo('2')" style="font-weight: bold">提 交</el-button>
            </span>
        </el-dialog>

        <!-- 编辑项目的对话框 -->
        <el-dialog
            title="修改项目基础信息"
            :close-on-click-modal="false"
            :visible.sync="editDialogVisible"
            @close="editDialogClosed"
            width="80%">
            <!-- 编辑项目的表单 -->
            <el-form :model="editForm"
                     :rules="basicInfoRules"
                     ref="editFormRef"
                     label-width="120px">
                <!-- prop是验证规则 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="项目编号：" prop="sn">
                            <el-input v-model="editForm.sn"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="项目名称：" prop="name">
                            <el-input v-model="editForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="委托方：" prop="principal">
                    <el-input v-model="editForm.principal"></el-input>
                </el-form-item>
                <el-form-item label="鉴定对象：" prop="target">
                    <el-input v-model="editForm.target"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="委托时间：" prop="trust_date">
                            <el-date-picker
                                v-model="editForm.trust_date"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="受理时间：" prop="created_date">
                            <el-date-picker
                                v-model="editForm.created_date"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="鉴定机构：" prop="org">
                    <el-select v-model="editForm.org" placeholder="请选择">
                        <el-option
                            v-for="item in orgList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="鉴定类别：" prop="type">
                            <el-select v-model="editForm.type" placeholder="请选择">
                                <el-option
                                    v-for="item in apprType"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="鉴定用途：" prop="purpose">
                            <el-select v-model="editForm.purpose" placeholder="请选择">
                                <el-option
                                    v-for="item in apprPurps"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="二次鉴定：">
                    <el-switch
                        v-model="editForm.is_re_appraisal"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="委托事项：" prop="trust_detail">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="editForm.trust_detail"></el-input>
                </el-form-item>
                <el-form-item label="立项审批人：" prop="reviewer">
                    <el-select v-model="editForm.reviewer" placeholder="请选择">
                        <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="editDialogVisible = false" style="font-weight: bold">取 消</el-button>
                <el-button type="warning" @click="updateBasicInfo('1')" style="font-weight: bold">暂 存</el-button>
                <el-button type="primary" @click="updateBasicInfo('2')" style="font-weight: bold">提 交</el-button>
          </span>
        </el-dialog>

        <!-- 查看项目的对话框 -->
        <el-dialog
            title="查看项目基础信息"
            :close-on-click-modal="false"
            :visible.sync="detailDialogVisible"
            @close="detailDialogClosed"
            width="80%">
            <!-- 编辑项目的表单 -->
            <el-form :model="detailForm"
                     :rules="basicInfoRules"
                     ref="detailFormRef"
                     label-width="120px">
                <!-- prop是验证规则 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="项目编号：" prop="sn">
                            <el-input v-model="detailForm.sn" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="项目名称：" prop="name">
                            <el-input v-model="detailForm.name" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="委托方：" prop="principal">
                    <el-input v-model="detailForm.principal" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="鉴定对象：" prop="target">
                    <el-input v-model="detailForm.target" :readonly="true"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="委托时间：" prop="trust_date">
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
                        <el-form-item label="受理时间：" prop="created_date">
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
                <el-form-item label="鉴定机构：" prop="org">
                    <el-input v-model="detailForm.org_name" :readonly="true"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="鉴定类别：" prop="type">
                            <el-input v-model="detailForm.type_name" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="鉴定用途：" prop="purpose">
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
                <el-form-item label="委托事项：" prop="trust_detail">
                    <el-input type="textarea"
                              :readonly="true"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="detailForm.trust_detail"></el-input>
                </el-form-item>
                <el-form-item label="立项审批人：" prop="reviewer">
                    <el-input v-model="detailForm.reviewer_name" :readonly="true"></el-input>
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
    name: "BasicInfos",
    data() {
        return {
            loginUserID: "",
            // get查询的分页参数，
            queryInfo: {
                query: "",
                page: 1,
                size: 10,
                paginator: true,
                stage: "",
            },
            userList: [],
            // 项目列表
            basicInfoList: [],
            total: 0,
            addDialogVisible: false,
            editDialogVisible: false,
            detailDialogVisible: false,
            addForm: {
                sn: "",
                name: "",
                principal: "",
                target: "",
                trust_date: "",
                created_date: "",
                org: "",
                type: "",
                purpose: "",
                is_re_appraisal: "false",
                trust_detail: "",
                reviewer: "",
                final_reviewer: "",
                stage: "",
            },
            editForm: {
                sn: "",
                name: "",
                principal: "",
                target: "",
                trust_date: "",
                created_date: "",
                org: "",
                type: "",
                purpose: "",
                is_re_appraisal: "",
                trust_detail: "",
                reviewer: "",
                final_reviewer: "",
                stage: ""
            },
            detailForm: {
                sn: "",
                name: "",
                principal: "",
                target: "",
                trust_date: "",
                created_date: "",
                org: "",
                type: "",
                purpose: "",
                is_re_appraisal: "",
                reviewer: "",
                reviewer_name: "",
                final_reviewer: "",
                final_reviewer_name: "",
                trust_detail: ""
            },
            orgList: [],
            apprType: [],
            apprPurps: [],
            basicInfoRules: {
                sn: [
                    {required: false, message: "请输入项目编号", trigger: "blur"},
                ],
                name: [
                    {required: true, message: "请输入项目名称", trigger: "blur"},
                ],
                principal: [
                    {required: true, message: "请输入委托方名称", trigger: "blur"},
                ],
                target: [
                    {required: true, message: "请输入鉴定对象名称", trigger: "blur"},
                ],
                trust_date: [
                    {required: true, message: "请选择委托日期", trigger: "blur"},
                ],
                created_date: [
                    {required: true, message: "请选择受理日期", trigger: "blur"},
                ],
                org: [
                    {required: true, message: "请选择鉴定机构", trigger: "blur"},
                ],
                type: [
                    {required: true, message: "请选择鉴定类别", trigger: "blur"},
                ],
                purpose: [
                    {required: true, message: "请选择鉴定用途", trigger: "blur"},
                ],
                trust_detail: [
                    {required: true, message: "请输入委托事项", trigger: "blur"},
                ],
                reviewer: [
                    {required: true, message: "请选择立项审批人", trigger: "blur"},
                ]
            },

        }
    },
    methods: {
        async getOrgList() {
            const res = await this.$axios.get("orgs")
            if (res.status !== 200) {
                return this.$message.error("获取机构列表失败")
            }
            this.orgList = res.data
        },

        async getApprTypeList() {
            const res = await this.$axios.get("apprtypes")
            if (res.status !== 200) {
                return this.$message.error("获取鉴定类别失败")
            }
            this.apprType = res.data
        },

        async getApprPurpList() {
            const res = await this.$axios.get("apprpurps")
            if (res.status !== 200) {
                return this.$message.error("获取鉴定用途列表失败")
            }
            this.apprPurps = res.data
        },

        async getBasicInfoList(stage) {
            this.queryInfo.stage = stage
            const res = await this.$axios.get("basicinfos/", {
                params: this.queryInfo
            })
            if (res.status !== 200) {
                return this.$message.error("获取项目列表失败, 刷新重试")
            }
            this.basicInfoList = res.data.results
            this.total = res.data.count
        },

        showAddDialog() {
            this.addDialogVisible = true
            this.getOrgList()
            this.getApprTypeList()
            this.getApprPurpList()
        },

        async saveBasicInfo(stage) {
            this.addForm.stage = stage
            this.addForm.creator = this.loginUserID
            this.$refs.addFormRef.validate(async (valid) => {
                if (!valid) {
                    return
                }
                const res = await this.$axios.post("basicinfos/", this.addForm)
                if (res.status !== 201) {
                    return this.$message.error("创建项目失败，请联系管理员")
                }

                if (stage === "2") {
                    const todoRes = await this.$axios.post("todo/", {
                        basic_info: res.data.id,
                        finished: false,
                        type: 2,
                        user: res.data.reviewer,
                        isBack: false
                    })
                    if (todoRes.status !== 201) {
                        return this.$message.error("添加待办事项失败")
                    }
                }
                this.$message.success("创建项目成功")
                this.addDialogVisible = false
                await this.getBasicInfoList()
            })
        },

        // 修改对话框表单的提交事件
        updateBasicInfo(stage) {
            this.editForm.stage = stage
            this.$refs.editFormRef.validate(async (valid) => {
                    if (!valid) {
                        return false
                    } else {
                        const res = await this.$axios.put(
                            "basicinfos/" + this.editForm.id + "/", this.editForm, {
                                params: this.queryInfo
                            })
                        if (res.status !== 200) {
                            this.$message.error(res.data.msg)
                        }

                        // 需要判断是否有打回产生的todo，如果有，提交的时候要设置为完成状态。
                        const todoRes = await this.$axios.get("/todo", {
                            params: {
                                basic_info: this.editForm.id
                            }
                        })
                        if (todoRes.status !== 200) {
                            return this.$message.error("获取待办事项失败")
                        }
                        let lastTodo = todoRes.data.results[0]
                        if (lastTodo.is_back === true && lastTodo.finished === false) {
                            const updateRes = await this.$axios.patch("/todo/" + lastTodo.id + "/", {
                                finished: true
                            })
                            if (updateRes.status !== 200) {
                                return this.$message.error("更新待办事项状态失败")
                            }
                        }


                        // stage==2 代表是提交，需要添加一个todo事项
                        if (stage === "2") {
                            const res = await this.$axios.post("todo/", {
                                basic_info: this.editForm.id,
                                finished: false,
                                type: 2,
                                user: this.editForm.reviewer,
                                isBack: false
                            });
                            if (res.status !== 201) {
                                return this.$message.error("添加待办事项失败")
                            }
                        }

                        this.editDialogVisible = false
                        await this.getBasicInfoList()
                        this.$message.success("编辑成功")
                    }
                }
            )
        },

        addDialogClosed() {
            this.$refs.addFormRef.resetFields()
        },

        // 修改对话框的关闭事件
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },

        //reviewDialogClosed() {
        //    this.$refs.reviewFormRef.resetFields()
        //},

        // 编辑按钮的点击事件
        async showEditDialog(id) {
            await this.getOrgList()
            await this.getApprTypeList()
            await this.getApprPurpList()
            // this.queryInfo.query = "one"
            const res = await this.$axios.get("basicinfos/" + id, {
                params: this.queryInfo
            })
            if (res.status !== 200) {
                this.$message.error("获取项目信息失败")
            }
            this.editForm = res.data
            this.editDialogVisible = true
        },


        // 通过id删除项目
        async deleteBasicInfo(id) {
            // this.queryInfo.query = "one"
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
            const res = await this.$axios.delete("basicinfos/" + id, {
                params: this.queryInfo
            })
            if (res.status !== 204) {
                return this.$message.error("删除项目失败")
            }
            this.$message.success("删除项目成功")
            await this.getBasicInfoList()
        },

        async getUserList() {
            const res = await this.$axios.get("users")
            this.userList = res.data
        },

        showDetailDialog(row) {
            this.detailDialogVisible = true
            this.detailForm = row
        },

        detailDialogClosed() {
            this.detailDialogVisible = false
        },

        // 分页器size变化的监听事件
        handleSizeChange(size) {
            this.queryInfo.size = size
            this.getBasicInfoList()
        },

        // 分页器page变化的监听事件
        handleCurrentChange(page) {
            this.queryInfo.page = page
            this.getBasicInfoList()
        },

        // 用于table中展示是否归还的字段，element的table默认不直接显示布尔值
        formatBoolean: function (row, column, cellValue) {
            let ret = ''  //你想在页面展示的值
            if (cellValue) {
                ret = "是"  //根据自己的需求设定
            } else {
                ret = "否"
            }
            return ret
        },

        getLoginUserID() {
            this.loginUserID = window.localStorage.getItem("id");
        },

        // 进入初审页面
        redirectToReview(basicInfoId) {
            this.$router.push({
                    path: "/review/",
                    query: {basicInfoId: basicInfoId}
                }
            )
        },

        // 进入校对页面
        toProofread(id) {
            this.$router.push({
                path: '/proofread/',
                query: {
                    basicInfoId: id,
                }
            })
        },

        // 进入终审页面
        toFinalReview(id) {
            this.$router.push({
                path: "finalreview/",
                query: {
                    basicInfoId: id,
                }
            })
        },

        // 关闭审批对话框，这个方法是供子组件调用的
        //closeDialog() {
        //    this.reviewDialogVisible = false
        //},


    },

    created() {
        if (this.$route.query.jump) {
            console.log(this.$route.query.basicInfoId);
            this.showEditDialog(this.$route.query.basicInfoId)
        }
        this.getBasicInfoList();
        this.getUserList()
        this.getLoginUserID()
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

.finish-tag {
    font-weight: bold;
}
</style>


