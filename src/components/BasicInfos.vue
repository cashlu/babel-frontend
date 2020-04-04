<!--<template>-->
<!--    <div>-->
<!--        &lt;!&ndash;面包屑&ndash;&gt;-->
<!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>项目管理</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>项目列表</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
<!--        &lt;!&ndash;  卡片区&ndash;&gt;-->
<!--        <el-card class="box-card">-->
<!--            &lt;!&ndash; 添加项目的按钮区 &ndash;&gt;-->
<!--            <el-row>-->
<!--                <el-col>-->
<!--                    <el-button type="primary" @click="showAddProjDialog">添加项目</el-button>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--            &lt;!&ndash; 项目列表 &ndash;&gt;-->
<!--            <el-table-->
<!--                    :data="projectList"-->
<!--                    style="width: 100%">-->
<!--                <el-table-column type="expand">-->
<!--                    <template slot-scope="props">-->
<!--                        <el-form label-position="left" inline class="demo-table-expand">-->
<!--                            <el-form-item label="项目编号">-->
<!--                                <span>{{ props.row.sn }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="项目名称">-->
<!--                                <span>{{ props.row.name }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="委托方">-->
<!--                                <span>{{ props.row.principal }}</span>-->
<!--                            </el-form-item>-->

<!--                            <el-form-item label="鉴定对象">-->
<!--                                <span>{{ props.row.target }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="委托时间">-->
<!--                                <span>{{ props.row.trust_date }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="受理时间">-->
<!--                                <span>{{ props.row.created_date }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="鉴定机构">-->
<!--                                <span>{{ props.row.org_name }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="鉴定类别">-->
<!--                                <span>{{ props.row.type_name }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="案由">-->
<!--                                <span>{{ props.row.purpose_name }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="是否二次鉴定">-->
<!--                                <span>{{ props.row.is_re_appraisal }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="委托事项">-->
<!--                                <span>{{ props.row.trust_detail }}</span>-->
<!--                            </el-form-item>-->
<!--                        </el-form>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                &lt;!&ndash; 索引列 &ndash;&gt;-->
<!--                <el-table-column type="index" label="序号"></el-table-column>-->
<!--                &lt;!&ndash; 数据列 &ndash;&gt;-->
<!--                <el-table-column-->
<!--                        prop="sn"-->
<!--                        label="项目编号"-->
<!--                        width="180">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="name"-->
<!--                        label="项目名称"-->
<!--                        width="180">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="trust_date"-->
<!--                        label="委托日期">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="is_finished"-->
<!--                        :formatter="formatBoolean"-->
<!--                        sortable-->
<!--                        label="是否完结">-->
<!--                    <template v-slot="scope">-->
<!--                        <el-tag effect="plain" v-if="scope.row.stage===3" type="success">已完结</el-tag>-->
<!--                        <el-tag effect="plain" v-else type="danger">未完结</el-tag>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column min-width="180px" label="操作">-->
<!--                    <template v-slot="scope">-->
<!--                        &lt;!&ndash; 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 &ndash;&gt;-->
<!--                        <el-button size="mini"-->
<!--                                   type="primary"-->
<!--                                   @click="showEditProjDialog(scope.row.id)"-->
<!--                                   icon="el-icon-edit">编辑-->
<!--                        </el-button>-->
<!--                        <el-button size="mini"-->
<!--                                   type="danger"-->
<!--                                   @click="deleteProjById(scope.row.id)"-->
<!--                                   icon="el-icon-delete">删除-->
<!--                        </el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--            </el-table>-->
<!--        </el-card>-->
<!--        &lt;!&ndash;  分页  &ndash;&gt;-->
<!--        <el-pagination-->
<!--                background-->
<!--                @size-change="handleSizeChange"-->
<!--                @current-change="handleCurrentChange"-->
<!--                :current-page="queryInfo.page"-->
<!--                :page-sizes="[10, 20, 50]"-->
<!--                :page-size="queryInfo.size"-->
<!--                layout="total, sizes, prev, pager, next, jumper"-->
<!--                :total="this.total">-->
<!--        </el-pagination>-->

<!--        &lt;!&ndash; 添加项目的对话框 &ndash;&gt;-->
<!--        <el-dialog-->
<!--                title="添加项目基础信息"-->
<!--                :close-on-click-modal="false"-->
<!--                :visible.sync="addProjDialogVisible"-->
<!--                @close="addProjDialogClosed"-->
<!--                width="80%">-->
<!--            &lt;!&ndash; 添加项目的表单 &ndash;&gt;-->
<!--            <el-form :model="addProjForm"-->
<!--                     :rules="addProjFormRules"-->
<!--                     ref="addProjFormRef"-->
<!--                     label-width="100px">-->
<!--                &lt;!&ndash; prop是验证规则 &ndash;&gt;-->
<!--                <el-row :gutter="20">-->
<!--                    <el-col :span="8">-->
<!--                        <el-form-item label="项目编号：" prop="sn">-->
<!--                            <el-input v-model="addProjForm.sn"></el-input>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="16">-->
<!--                        <el-form-item label="项目名称：" prop="name">-->
<!--                            <el-input v-model="addProjForm.name"></el-input>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                </el-row>-->
<!--                <el-form-item label="委托方：" prop="principal">-->
<!--                    <el-input v-model="addProjForm.principal"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="鉴定对象：" prop="target">-->
<!--                    <el-input v-model="addProjForm.target"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-row :gutter="20">-->
<!--                    <el-col :span="12">-->
<!--                        <el-form-item label="委托时间：" prop="trust_date">-->
<!--                            <el-date-picker-->
<!--                                    v-model="addProjForm.trust_date"-->
<!--                                    type="date"-->
<!--                                    placeholder="选择日期"-->
<!--                                    format="yyyy 年 MM 月 dd 日"-->
<!--                                    value-format="yyyy-MM-dd">-->
<!--                            </el-date-picker>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="12">-->
<!--                        <el-form-item label="受理时间：" prop="created_date">-->
<!--                            <el-date-picker-->
<!--                                    v-model="addProjForm.created_date"-->
<!--                                    type="date"-->
<!--                                    placeholder="选择日期"-->
<!--                                    format="yyyy 年 MM 月 dd 日"-->
<!--                                    value-format="yyyy-MM-dd">-->
<!--                            </el-date-picker>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                </el-row>-->

<!--                <el-form-item label="鉴定机构：" prop="org">-->
<!--                    <el-select v-model="addProjForm.org" placeholder="请选择">-->
<!--                        <el-option-->
<!--                                v-for="item in orgList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->

<!--                <el-row :gutter="20">-->
<!--                    <el-col :span="12">-->
<!--                        <el-form-item label="鉴定类型：" prop="type">-->
<!--                            <el-select v-model="addProjForm.type" placeholder="请选择">-->
<!--                                <el-option-->
<!--                                        v-for="item in apprType"-->
<!--                                        :key="item.id"-->
<!--                                        :label="item.name"-->
<!--                                        :value="item.id">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="12">-->

<!--                        <el-form-item label="案由：" prop="purpose">-->
<!--                            <el-select v-model="addProjForm.purpose" placeholder="请选择">-->
<!--                                <el-option-->
<!--                                        v-for="item in apprPurps"-->
<!--                                        :key="item.id"-->
<!--                                        :label="item.name"-->
<!--                                        :value="item.id">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                </el-row>-->
<!--                <el-form-item label="二次鉴定：">-->
<!--                    <el-switch-->
<!--                            v-model="addProjForm.is_re_appraisal"-->
<!--                            active-color="#13ce66"-->
<!--                            inactive-color="#ff4949">-->
<!--                    </el-switch>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="委托事项：" prop="trust_detail">-->
<!--                    <el-input type="textarea"-->
<!--                              :autosize="{ minRows: 4, maxRows: 10}"-->
<!--                              v-model="addProjForm.trust_detail"></el-input>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="addProjDialogVisible = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="addProj">确 定</el-button>-->
<!--            </span>-->
<!--        </el-dialog>-->


<!--        &lt;!&ndash; 编辑项目的对话框 &ndash;&gt;-->
<!--        <el-dialog-->
<!--                title="修改项目基础信息"-->
<!--                :close-on-click-modal="false"-->
<!--                :visible.sync="editProjDialogVisible"-->
<!--                @close="editProjDialogClosed"-->
<!--                width="80%">-->
<!--            &lt;!&ndash; 编辑项目的表单 &ndash;&gt;-->
<!--            <el-form :model="editProjForm"-->
<!--                     :rules="addProjFormRules"-->
<!--                     ref="editProjFormRef"-->
<!--                     label-width="100px">-->
<!--                &lt;!&ndash; prop是验证规则 &ndash;&gt;-->
<!--                <el-row :gutter="20">-->
<!--                    <el-col :span="8">-->
<!--                        <el-form-item label="项目编号：" prop="sn">-->
<!--                            <el-input v-model="editProjForm.sn"></el-input>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="16">-->
<!--                        <el-form-item label="项目名称：" prop="name">-->
<!--                            <el-input v-model="editProjForm.name"></el-input>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                </el-row>-->
<!--                <el-form-item label="委托方：" prop="principal">-->
<!--                    <el-input v-model="editProjForm.principal"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="鉴定对象：" prop="target">-->
<!--                    <el-input v-model="editProjForm.target"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-row :gutter="20">-->
<!--                    <el-col :span="12">-->
<!--                        <el-form-item label="委托时间：" prop="trust_date">-->
<!--                            <el-date-picker-->
<!--                                    v-model="editProjForm.trust_date"-->
<!--                                    type="date"-->
<!--                                    placeholder="选择日期"-->
<!--                                    format="yyyy 年 MM 月 dd 日"-->
<!--                                    value-format="yyyy-MM-dd">-->
<!--                            </el-date-picker>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="12">-->
<!--                        <el-form-item label="受理时间：" prop="created_date">-->
<!--                            <el-date-picker-->
<!--                                    v-model="editProjForm.created_date"-->
<!--                                    type="date"-->
<!--                                    placeholder="选择日期"-->
<!--                                    format="yyyy 年 MM 月 dd 日"-->
<!--                                    value-format="yyyy-MM-dd">-->
<!--                            </el-date-picker>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                </el-row>-->

<!--                <el-form-item label="鉴定机构：" prop="org">-->
<!--                    <el-select v-model="editProjForm.org" placeholder="请选择">-->
<!--                        <el-option-->
<!--                                v-for="item in orgList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-row :gutter="20">-->
<!--                    <el-col :span="12">-->
<!--                        <el-form-item label="鉴定类型：" prop="type">-->
<!--                            <el-select v-model="editProjForm.type" placeholder="请选择">-->
<!--                                <el-option-->
<!--                                        v-for="item in apprType"-->
<!--                                        :key="item.id"-->
<!--                                        :label="item.name"-->
<!--                                        :value="item.id">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="12">-->
<!--                        <el-form-item label="案由：" prop="purpose">-->
<!--                            <el-select v-model="editProjForm.purpose" placeholder="请选择">-->
<!--                                <el-option-->
<!--                                        v-for="item in apprPurps"-->
<!--                                        :key="item.id"-->
<!--                                        :label="item.name"-->
<!--                                        :value="item.id">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                </el-row>-->
<!--                <el-form-item label="二次鉴定：">-->
<!--                    <el-switch-->
<!--                            v-model="editProjForm.is_re_appraisal"-->
<!--                            active-color="#13ce66"-->
<!--                            inactive-color="#ff4949">-->
<!--                    </el-switch>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="委托事项：" prop="trust_detail">-->
<!--                    <el-input type="textarea"-->
<!--                              :autosize="{ minRows: 4, maxRows: 10}"-->
<!--                              v-model="editProjForm.trust_detail"></el-input>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--            <el-button @click="editProjDialogVisible = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="editProj">确 定</el-button>-->
<!--          </span>-->
<!--        </el-dialog>-->
<!--    </div>-->

<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "BasicInfos",-->
<!--        data() {-->
<!--            return {-->
<!--                // get查询的分页参数，-->
<!--                queryInfo: {-->
<!--                    query: "",-->
<!--                    page: 1,-->
<!--                    size: 10,-->
<!--                    paginator: true,-->
<!--                    stage: "",-->
<!--                },-->
<!--                // 项目列表-->
<!--                projectList: [],-->
<!--                total: 0,-->
<!--                addProjDialogVisible: false,-->
<!--                editProjDialogVisible: false,-->
<!--                addProjForm: {-->
<!--                    sn: "",-->
<!--                    name: "",-->
<!--                    principal: "",-->
<!--                    target: "",-->
<!--                    trust_date: "",-->
<!--                    created_date: "",-->
<!--                    org: "",-->
<!--                    type: "",-->
<!--                    purpose: "",-->
<!--                    is_re_appraisal: "false",-->
<!--                    trust_detail: ""-->
<!--                },-->
<!--                editProjForm: {-->
<!--                    sn: "",-->
<!--                    name: "",-->
<!--                    principal: "",-->
<!--                    target: "",-->
<!--                    trust_date: "",-->
<!--                    created_date: "",-->
<!--                    org: "",-->
<!--                    type: "",-->
<!--                    purpose: "",-->
<!--                    is_re_appraisal: "",-->
<!--                    trust_detail: ""-->
<!--                },-->
<!--                orgList: [],-->
<!--                apprType: [],-->
<!--                apprPurps: [],-->
<!--                addProjFormRules: {-->
<!--                    sn: [-->
<!--                        {required: true, message: "请输入项目编号", trigger: "blur"},-->
<!--                    ],-->
<!--                    name: [-->
<!--                        {required: true, message: "请输入项目名称", trigger: "blur"},-->
<!--                    ],-->
<!--                    principal: [-->
<!--                        {required: true, message: "请输入委托方名称", trigger: "blur"},-->
<!--                    ],-->
<!--                    target: [-->
<!--                        {required: true, message: "请输入鉴定对象名称", trigger: "blur"},-->
<!--                    ],-->
<!--                    trust_date: [-->
<!--                        {required: true, message: "请选择委托日期", trigger: "blur"},-->
<!--                    ],-->
<!--                    created_date: [-->
<!--                        {required: true, message: "请选择受理日期", trigger: "blur"},-->
<!--                    ],-->
<!--                    org: [-->
<!--                        {required: true, message: "请选择鉴定机构", trigger: "blur"},-->
<!--                    ],-->
<!--                    type: [-->
<!--                        {required: true, message: "请选择鉴定类型", trigger: "blur"},-->
<!--                    ],-->
<!--                    purpose: [-->
<!--                        {required: true, message: "请选择案由", trigger: "blur"},-->
<!--                    ],-->
<!--                    trust_detail: [-->
<!--                        {required: true, message: "请输入委托事项", trigger: "blur"},-->
<!--                    ],-->

<!--                }-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            async getProjectList() {-->
<!--                const res = await this.$axios.get("basicinfos/", {-->
<!--                    params: this.queryInfo-->
<!--                })-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取项目列表失败, 刷新重试")-->
<!--                }-->
<!--                this.projectList = res.data.results-->
<!--                this.total = res.data.count-->
<!--            },-->
<!--            async getOrgList() {-->
<!--                const res = await this.$axios.get("orgs")-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取机构列表失败")-->
<!--                }-->
<!--                this.orgList = res.data-->
<!--            },-->
<!--            async getApprTypeList() {-->
<!--                const res = await this.$axios.get("apprtypes")-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取鉴定类型失败")-->
<!--                }-->
<!--                this.apprType = res.data-->
<!--            },-->
<!--            async getApprPurpList() {-->
<!--                const res = await this.$axios.get("apprpurps")-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取案由列表失败")-->
<!--                }-->
<!--                this.apprPurps = res.data-->
<!--            },-->
<!--            showAddProjDialog() {-->
<!--                this.addProjDialogVisible = true-->
<!--                this.getOrgList()-->
<!--                this.getApprTypeList()-->
<!--                this.getApprPurpList()-->
<!--            },-->
<!--            async addProj() {-->
<!--                this.$refs.addProjFormRef.validate(async (valid) => {-->
<!--                    if (!valid) {-->
<!--                        return-->
<!--                    }-->
<!--                    const {data: res} = await this.$axios.post("basicinfos/", this.addProjForm)-->
<!--                    if (res.status !== 201) {-->
<!--                        return this.$message.error("创建项目失败，请联系管理员")-->
<!--                    }-->
<!--                    this.$message.success("创建项目成功")-->
<!--                    this.addProjDialogVisible = false-->
<!--                    this.getProjectList()-->
<!--                })-->
<!--            },-->
<!--            addProjDialogClosed() {-->
<!--                // this.addProjDialogVisible = false;-->
<!--                this.$refs.addProjFormRef.resetFields()-->
<!--            },-->
<!--            // 修改对话框的关闭事件-->
<!--            editProjDialogClosed() {-->
<!--                this.$refs.editProjFormRef.resetFields()-->
<!--            },-->
<!--            // 编辑按钮的点击事件-->
<!--            async showEditProjDialog(id) {-->
<!--                this.getOrgList()-->
<!--                this.getApprTypeList()-->
<!--                this.getApprPurpList()-->
<!--                const res = await this.$axios.get("basicinfos/" + id)-->
<!--                if (res.status !== 200) {-->
<!--                    this.$message.error("获取项目信息失败")-->
<!--                }-->
<!--                this.editProjForm = res.data-->
<!--                this.editProjDialogVisible = true-->
<!--            },-->
<!--            // 修改对话框表单的提交事件-->

<!--            editProj() {-->
<!--                this.$refs.editProjFormRef.validate(async (valid) => {-->
<!--                        if (!valid) {-->
<!--                            return false-->
<!--                        } else {-->
<!--                            const res = await this.$axios.put(-->
<!--                                "basicinfos/" + this.editProjForm.id + "/", this.editProjForm)-->
<!--                            if (res.status !== 200) {-->
<!--                                this.$message.error(res.data.msg)-->
<!--                            }-->
<!--                            this.editProjDialogVisible = false-->
<!--                            this.getProjectList()-->
<!--                            this.$message.success("编辑成功")-->
<!--                        }-->
<!--                    }-->
<!--                )-->
<!--            },-->
<!--            // 通过id删除项目-->
<!--            async deleteProjById(id) {-->
<!--                const confirmResult = await this.$confirm('此操作将永久删除该项目, 是否继续?',-->
<!--                    '提示', {-->
<!--                        confirmButtonText: '确定',-->
<!--                        cancelButtonText: '取消',-->
<!--                        type: 'warning',-->
<!--                        closeOnClickModal: false,-->
<!--                    }).catch(err => {-->
<!--                    return err-->
<!--                })-->
<!--                if (confirmResult !== "confirm") {-->
<!--                    return this.$message.info("已取消删除")-->
<!--                }-->
<!--                const res = await this.$axios.delete("basicinfos/" + id)-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("删除失败，请稍后再试，或者联系管理员")-->
<!--                }-->
<!--                this.$message.success("删除项目成功")-->
<!--                this.getProjectList()-->
<!--            },-->
<!--            // 分页器size变化的监听事件-->
<!--            handleSizeChange(size) {-->
<!--                this.queryInfo.size = size-->
<!--                this.getProjectList()-->
<!--            },-->
<!--            // 分页器page变化的监听事件-->
<!--            handleCurrentChange(page) {-->
<!--                this.queryInfo.page = page-->
<!--                this.getProjectList()-->
<!--            },-->
<!--            // 用于table中展示是否归还的字段，element的table默认不直接显示布尔值-->
<!--            formatBoolean: function (row, column, cellValue) {-->
<!--                let ret = ''  //你想在页面展示的值-->
<!--                if (cellValue) {-->
<!--                    ret = "是"  //根据自己的需求设定-->
<!--                } else {-->
<!--                    ret = "否"-->
<!--                }-->
<!--                return ret-->
<!--            },-->
<!--        },-->
<!--        created() {-->
<!--            this.getProjectList()-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--    .demo-table-expand {-->
<!--        font-size: 0;-->
<!--    }-->

<!--    .demo-table-expand label {-->
<!--        width: 90px;-->
<!--        color: #99a9bf;-->
<!--    }-->

<!--    .demo-table-expand .el-form-item {-->
<!--        margin-right: 0;-->
<!--        margin-bottom: 0;-->
<!--        width: 50%;-->
<!--    }-->
<!--</style>-->


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
                    <el-button type="primary" @click="showBasicInfoDialog()">添加项目</el-button>
                </el-col>
            </el-row>
            <!-- 项目列表 -->
            <el-table
                    :data="projectList"
                    style="width: 100%">
                <!-- 索引列 -->
                <el-table-column type="index" label="序号"></el-table-column>
                <!-- 数据列 -->
                <el-table-column
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
                        prop="trust_date"
                        label="委托日期">
                </el-table-column>
                <el-table-column
                        prop="is_finished"
                        :formatter="formatBoolean"
                        sortable
                        label="是否完结">
                    <template v-slot="scope">
                        <el-tag effect="plain" v-if="scope.row.stage===3" type="success">已完结</el-tag>
                        <el-tag effect="plain" v-else type="danger">未完结</el-tag>
                    </template>
                </el-table-column>
                <el-table-column min-width="180px" label="操作">
                    <template v-slot="scope">
                        <!-- 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 -->
                        <el-button size="mini"
                                   type="primary"
                                   @click="showBasicInfoDialog(scope.row.id)"
                                   icon="el-icon-edit">编辑
                        </el-button>
                        <el-button size="mini"
                                   type="danger"
                                   @click="deleteBasicInfo(scope.row.id)"
                                   icon="el-icon-delete">删除
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

        <!-- 添加、编辑项目的对话框 -->
        <el-dialog
                title="项目基础信息"
                :close-on-click-modal="false"
                :visible.sync="basicInfoDialogVisible"
                @close="closeDialog"
                width="80%">
            <!-- 添加项目的表单 -->
            <el-form :model="basicInfoForm"
                     :rules="basicInfoFormRules"
                     ref="basicInfoFormRef"
                     label-width="100px">
                <!-- prop是验证规则 -->
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="项目编号：" prop="sn">
                            <el-input v-model="basicInfoForm.sn" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="项目名称：" prop="name">
                            <el-input v-model="basicInfoForm.name" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="委托方：" prop="principal">
                    <el-input v-model="basicInfoForm.principal" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="鉴定对象：" prop="target">
                    <el-input v-model="basicInfoForm.target" :readonly="readonly"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="委托时间：" prop="trust_date">
                            <el-date-picker
                                    :readonly="readonly"
                                    v-model="basicInfoForm.trust_date"
                                    align="right"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="受理时间：" prop="created_date">
                            <el-date-picker
                                    :readonly="readonly"
                                    v-model="basicInfoForm.created_date"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="鉴定机构：" prop="org">
                    <el-select v-model="basicInfoForm.org" :disabled="readonly">
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
                        <el-form-item label="鉴定类型：" prop="type">
                            <el-select v-model="basicInfoForm.type" :disabled="readonly">
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
                        <el-form-item label="案由：" prop="purpose">
                            <el-select v-model="basicInfoForm.purpose" :disabled="readonly">
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
                            v-model="basicInfoForm.is_re_appraisal"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="委托事项：" prop="trust_detail">
                    <el-input type="textarea"
                              :readonly="readonly"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="basicInfoForm.trust_detail"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="basicInfoDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveBasicInfo">确 定</el-button>
            </span>
        </el-dialog>

    </div>

</template>

<script>
    export default {
        name: "BasicInfos",
        data() {
            return {
                // get查询的分页参数，
                queryInfo: {
                    query: "",
                    page: 1,
                    size: 10,
                    paginator: true,
                    stage: "",
                },
                // 项目列表
                projectList: [],
                total: 0,
                basicInfoDialogVisible: false,
                basicInfoForm: {
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
                    trust_detail: ""
                },
                orgList: [],
                apprType: [],
                apprPurps: [],
                basicInfoFormRules: {
                    sn: [
                        {required: true, message: "请输入项目编号", trigger: "blur"},
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
                        {required: true, message: "请选择鉴定类型", trigger: "blur"},
                    ],
                    purpose: [
                        {required: true, message: "请选择案由", trigger: "blur"},
                    ],
                    trust_detail: [
                        {required: true, message: "请输入委托事项", trigger: "blur"},
                    ],

                },
                readonly: false,
                requestType: "",
                pickerOptions: {
                    // 不能选择未来的日期
                    // disabledDate(time) {
                    //     return time.getTime() > Date.now()
                    // },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date())
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24)
                            picker.$emit('pick', date)
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', date)
                        }
                    }]
                },
            }
        },
        methods: {
            async getBasicInfoList() {
                const res = await this.$axios.get("basicinfos/", {
                    params: this.queryInfo
                })
                if (res.status !== 200) {
                    return this.$message.error("获取项目列表失败, 刷新重试")
                }
                this.projectList = res.data.results
                this.total = res.data.count
            },
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
                    return this.$message.error("获取鉴定类型失败")
                }
                this.apprType = res.data
            },
            async getApprPurpList() {
                const res = await this.$axios.get("apprpurps")
                if (res.status !== 200) {
                    return this.$message.error("获取案由列表失败")
                }
                this.apprPurps = res.data
            },
            // 打开对话框
            async showBasicInfoDialog(id) {
                if (id) {
                    // 修改资料
                    this.requestType = "put"
                    const res = await this.$axios.get("basicinfos/" + id)
                    if (res.status !== 200) {
                        return this.$message.error("获取基础信息失败")
                    }
                    this.basicInfoForm = res.data
                } else {
                    // 添加资料
                    this.requestType = "post"
                }
                this.basicInfoDialogVisible = true
            },
            // 关闭对话框
            closeDialog() {
                this.$refs.basicInfoFormRef.resetFields()
                this.basicInfoDialogVisible = false
                this.readonly = false
                this.getBasicInfoList()
            },
            // 提交保存信息
            saveBasicInfo() {
                this.$refs.basicInfoFormRef.validate(async (valid) => {
                    if (!valid) {
                        this.$message.error("表单验证失败")
                        return
                    }
                    if (this.requestType === "post") {      // 新增
                        const res = await this.$axios.post("basicinfos/", this.basicInfoForm)
                        if (res.status !== 201) {
                            return this.$message.error("创建失败")
                        }
                        this.$message.success("创建成功")
                    } else {        // 编辑
                        // console.log(this.requestType)
                        const res = await this.$axios.put("basicinfos/" + this.basicInfoForm.id + "/",
                            this.basicInfoForm)
                        if (res.status !== 200) {
                            return this.$message.error("编辑失败")
                        }
                        this.$message.success("编辑成功")
                    }
                    this.closeDialog()
                })
            },

            // 通过id删除项目
            async deleteBasicInfo(id) {
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
                const res = await this.$axios.delete("basicinfos/" + id)
                if (res.status !== 204) {
                    return this.$message.error("删除失败，请稍后再试，或者联系管理员")
                }
                this.$message.success("删除项目成功")
                this.getBasicInfoList()
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
        },
        created() {
            this.getBasicInfoList()
            this.getOrgList()
            this.getApprTypeList()
            this.getApprPurpList()
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
</style>