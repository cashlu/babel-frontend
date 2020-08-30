<!--<template>-->
<!--    <div>-->
<!--        &lt;!&ndash;面包屑&ndash;&gt;-->
<!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>项目管理</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>试验检材管理</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
<!--        &lt;!&ndash;  卡片区&ndash;&gt;-->
<!--        <el-card class="box-card">-->
<!--            &lt;!&ndash; 筛选、搜索及按钮区 &ndash;&gt;-->
<!--            &lt;!&ndash;TODO: 完成table后完成下面的搜索筛选功能&ndash;&gt;-->
<!--            <el-row>-->
<!--                <el-col :span="21">-->
<!--                    <el-form :inline="true" :model="searchForm" size="mini">-->
<!--                        <el-form-item label="材料名称">-->
<!--                            <el-input v-model="searchForm.user"></el-input>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="接收人">-->
<!--                            <el-select v-model="searchForm.region">-->
<!--                                <el-option label="区域一" value="shanghai"></el-option>-->
<!--                                <el-option label="区域二" value="beijing"></el-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item>-->
<!--                            <el-button type="primary" @click="">查询</el-button>-->
<!--                        </el-form-item>-->
<!--                    </el-form>-->
<!--                </el-col>-->
<!--                <el-col :span="3">-->
<!--                    <el-button size="medium" type="primary" @click="showAddSampleDialog">添加试验检材</el-button>-->
<!--                </el-col>-->
<!--            </el-row>-->

<!--            <el-table stripe-->
<!--                      :data="apprSampleList"-->
<!--                      style="width: 100%">-->
<!--                &lt;!&ndash; 索引列 &ndash;&gt;-->
<!--                <el-table-column type="index" label="序号"></el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="name"-->
<!--                        label="检材名称"-->
<!--                        width="180">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="quantity"-->
<!--                        label="数量"-->
<!--                        min-width="180">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="basic_info_name"-->
<!--                        label="项目名称"-->
<!--                        min-width="180">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="receiver_name"-->
<!--                        label="接收人"-->
<!--                        min-width="180">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="received_date"-->
<!--                        label="接收日期"-->
<!--                        min-width="180">-->
<!--                </el-table-column>-->
<!--                &lt;!&ndash; 操作按钮列 &ndash;&gt;-->
<!--                <el-table-column label="操作" min-width="180px">-->
<!--                    <template v-slot="scope">-->
<!--                        &lt;!&ndash; 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 &ndash;&gt;-->
<!--                        <el-button size="mini"-->
<!--                                   type="primary"-->
<!--                                   @click="showEditSampleDialog(scope.row.id)"-->
<!--                                   icon="el-icon-edit">编辑-->
<!--                        </el-button>-->
<!--                        <el-button size="mini"-->
<!--                                   type="danger"-->
<!--                                   @click="deleteSample(scope.row.id)"-->
<!--                                   icon="el-icon-delete">删除-->
<!--                        </el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--            </el-table>-->
<!--        </el-card>-->
<!--        &lt;!&ndash;分页&ndash;&gt;-->
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

<!--        &lt;!&ndash; 添加检材的对话框 &ndash;&gt;-->
<!--        <el-dialog title="添加检材"-->
<!--                   :close-on-click-modal="false"-->
<!--                   :visible.sync="addSampleVisible"-->
<!--                   @close="closeAddSampleDialog"-->
<!--                   width="30%">-->
<!--            <el-form ref="addSampleFormRef"-->
<!--                     v-if="flag"-->
<!--                     :rules="apprSampleFormRules"-->
<!--                     :model="apprSampleForm"-->
<!--                     label-width="80px">-->
<!--                <el-form-item label="所属项目" prop="basic_info">-->
<!--                    <el-select v-model="apprSampleForm.basic_info">-->
<!--                        <el-option-->
<!--                                v-for="item in projectList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="检材名称" prop="name">-->
<!--                    <el-input v-model="apprSampleForm.name"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="数量" prop="quantity">-->
<!--                    <el-input v-model.number="apprSampleForm.quantity"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="接收日期" prop="received_date">-->
<!--                    <el-date-picker-->
<!--                            v-model="apprSampleForm.received_date"-->
<!--                            align="right"-->
<!--                            type="date"-->
<!--                            placeholder="选择日期"-->
<!--                            :picker-options="pickerOptions"-->
<!--                            format="yyyy 年 MM 月 dd 日"-->
<!--                            value-format="yyyy-MM-dd">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
<!--            </el-form>-->

<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="addSampleVisible = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="addSample">确 定</el-button>-->
<!--            </span>-->
<!--        </el-dialog>-->

<!--        &lt;!&ndash; 编辑检材的对话框 &ndash;&gt;-->
<!--        <el-dialog title="编辑检材"-->
<!--                   :close-on-click-modal="false"-->
<!--                   :visible.sync="editSampleVisible"-->
<!--                   @close="closeEditSampleDialog"-->
<!--                   width="30%">-->
<!--            <el-form ref="editSampleFormRef"-->
<!--                     :rules="apprSampleFormRules"-->
<!--                     :model="apprSampleForm"-->
<!--                     label-width="80px">-->
<!--                <el-form-item label="所属项目" prop="basic_info">-->
<!--                    <el-select v-model="apprSampleForm.basic_info">-->
<!--                        <el-option-->
<!--                                v-for="item in projectList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="检材名称" prop="name">-->
<!--                    <el-input v-model="apprSampleForm.name"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="数量" prop="quantity">-->
<!--                    <el-input v-model.number="apprSampleForm.quantity"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="接收日期" prop="received_date">-->
<!--                    <el-date-picker-->
<!--                            v-model="apprSampleForm.received_date"-->
<!--                            align="right"-->
<!--                            type="date"-->
<!--                            placeholder="选择日期"-->
<!--                            :picker-options="pickerOptions"-->
<!--                            format="yyyy 年 MM 月 dd 日"-->
<!--                            value-format="yyyy-MM-dd">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
<!--            </el-form>-->

<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="editSampleVisible = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="editSample">确 定</el-button>-->
<!--            </span>-->
<!--        </el-dialog>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "ApprSample",-->
<!--        data() {-->
<!--            return {-->
<!--                // get查询的分页参数-->
<!--                queryInfo: {-->
<!--                    page: 1,-->
<!--                    size: 10,-->
<!--                    stage: 1,-->
<!--                    paginator: false,-->
<!--                },-->
<!--                flag:false,-->
<!--                apprSampleList: [],-->
<!--                total: 0,-->
<!--                projectList: [],-->
<!--                searchForm: {-->
<!--                    user: "",-->
<!--                    region: ""-->
<!--                },-->
<!--                apprSampleForm: {-->
<!--                    basic_info: "",-->
<!--                    name: "",-->
<!--                    quantity: 1,-->
<!--                    receiver: window.localStorage.getItem("id"),-->
<!--                    received_date: "",-->
<!--                },-->
<!--                apprSampleFormRules: {-->
<!--                    basic_info: [-->
<!--                        {required: true, message: "请选择对应的项目", trigger: "change"},-->
<!--                    ],-->
<!--                    name: [-->
<!--                        {required: true, message: "请输入检材名称", trigger: "blur"},-->
<!--                    ],-->
<!--                    quantity: [-->
<!--                        {type: "number", required: true, message: "请输入材料数量", trigger: "blur"},-->
<!--                    ],-->
<!--                    received_date: [-->
<!--                        {required: true, message: "请选择接收日期", trigger: "change"},-->
<!--                    ],-->
<!--                },-->
<!--                addSampleVisible: false,-->
<!--                editSampleVisible: false,-->
<!--                pickerOptions: {-->
<!--                    // 不能选择未来的日期-->
<!--                    // disabledDate(time) {-->
<!--                    //     return time.getTime() > Date.now()-->
<!--                    // },-->
<!--                    shortcuts: [{-->
<!--                        text: '今天',-->
<!--                        onClick(picker) {-->
<!--                            picker.$emit('pick', new Date())-->
<!--                        }-->
<!--                    }, {-->
<!--                        text: '昨天',-->
<!--                        onClick(picker) {-->
<!--                            const date = new Date()-->
<!--                            date.setTime(date.getTime() - 3600 * 1000 * 24)-->
<!--                            picker.$emit('pick', date)-->
<!--                        }-->
<!--                    }, {-->
<!--                        text: '一周前',-->
<!--                        onClick(picker) {-->
<!--                            const date = new Date()-->
<!--                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)-->
<!--                            picker.$emit('pick', date)-->
<!--                        }-->
<!--                    }]-->
<!--                },-->

<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            async getApprSampleList() {-->
<!--                const res = await this.$axios.get("apprsamps/", {-->
<!--                    params: this.queryInfo-->
<!--                })-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取检材列表失败，请联系管理员")-->
<!--                }-->
<!--                this.apprSampleList = res.data.results-->
<!--                this.total = res.data.count-->
<!--            },-->
<!--            async getProjectList() {-->
<!--                const res = await this.$axios.get("basicinfos/", {-->
<!--                    params: this.queryInfo-->
<!--                })-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取项目列表失败")-->
<!--                }-->
<!--                this.projectList = res.data-->
<!--            },-->
<!--            handleSizeChange(size) {-->
<!--                this.queryInfo.size = size-->
<!--                this.getApprSampleList()-->
<!--            },-->
<!--            handleCurrentChange(page) {-->
<!--                this.queryInfo.page = page-->
<!--                this.getApprSampleList()-->
<!--            },-->
<!--            showAddSampleDialog() {-->
<!--                this.addSampleVisible = true-->
<!--                this.flag = true-->
<!--            },-->
<!--            closeAddSampleDialog() {-->
<!--                this.flag = false-->
<!--                this.$refs.addSampleFormRef.resetFields()-->
<!--                this.addSampleVisible = false-->
<!--            },-->
<!--            addSample() {-->
<!--                this.$refs.addSampleFormRef.validate(async (valid) => {-->
<!--                    if (!valid) {-->
<!--                        this.$message.error("表单验证失败")-->
<!--                        return-->
<!--                    }-->
<!--                    const res = await this.$axios.post("apprsamps/", this.apprSampleForm)-->
<!--                    if (res.status !== 201) {-->
<!--                        return this.$message.error("添加检材失败")-->
<!--                    }-->
<!--                    this.$message.success("添加检材成功")-->
<!--                    this.addSampleVisible = false-->
<!--                    this.getApprSampleList()-->
<!--                })-->
<!--            },-->
<!--            async showEditSampleDialog(id) {-->
<!--                const res = await this.$axios.get("apprsamps/" + id + "/")-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取检材信息失败")-->
<!--                }-->
<!--                this.editSampleVisible = true-->
<!--                this.apprSampleForm = res.data-->
<!--            },-->
<!--            editSample() {-->
<!--                this.$refs.editSampleFormRef.validate(async (valid) => {-->
<!--                    if (!valid) {-->
<!--                        this.$message.error("表单验证失败")-->
<!--                        return-->
<!--                    }-->
<!--                    const res = await this.$axios.put("apprsamps/" + this.apprSampleForm.id + "/",-->
<!--                        this.apprSampleForm)-->
<!--                    if (res.status !== 200) {-->
<!--                        return this.$message.error("编辑检材失败")-->
<!--                    }-->
<!--                    this.$message.success("编辑检材成功")-->
<!--                    this.editSampleVisible = false-->
<!--                    this.getApprSampleList()-->
<!--                })-->
<!--            },-->
<!--            closeEditSampleDialog() {-->
<!--                this.editSampleVisible = false-->

<!--            },-->
<!--            async deleteSample(id) {-->
<!--                const confirmResult = await this.$confirm('此操作将永久删除该检材, 是否继续?',-->
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
<!--                const res = await this.$axios.delete("apprsamps/" + id + "/")-->
<!--                if (res.status !== 204) {-->
<!--                    return this.$message.error("删除失败")-->
<!--                }-->
<!--                this.$message.success("删除检材成功")-->
<!--                this.getApprSampleList()-->
<!--            }-->
<!--        },-->
<!--        created() {-->
<!--            this.getApprSampleList()-->
<!--            this.getProjectList()-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->


<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>试验检材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  卡片区-->
        <el-card class="box-card">
            <!-- 筛选、搜索及按钮区 -->
            <!--TODO: 完成table后完成下面的搜索筛选功能-->
            <el-row>
                <el-col :span="21">
                    <el-form :inline="true" :model="searchForm" size="mini">
                        <el-form-item label="材料名称">
                            <el-input v-model="searchForm.user"></el-input>
                        </el-form-item>
                        <el-form-item label="接收人">
                            <el-select v-model="searchForm.region">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="3">
                    <el-button size="medium" type="primary" @click="showAddDialog">添加试验检材</el-button>
                </el-col>
            </el-row>

            <el-table stripe
                      :data="apprSampleList"
                      style="width: 100%">
                <!-- 索引列 -->
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column
                    prop="name"
                    label="检材名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="数量"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="basic_info_name"
                    label="项目名称"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="receiver_name"
                    label="接收人"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="received_date"
                    label="接收日期"
                    min-width="180">
                </el-table-column>
                <!-- 操作按钮列 -->
                <el-table-column label="操作" min-width="180px">
                    <template v-slot="scope">
                        <!-- 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 -->
                        <el-button size="mini"
                                   type="primary"
                                   @click="showEditDialog(scope.row.id)"
                                   icon="el-icon-edit">编辑
                        </el-button>
                        <el-button size="mini"
                                   type="danger"
                                   @click="deleteSample(scope.row.id)"
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
            :current-page="queryInfo.page"
            :page-sizes="[10, 20, 50]"
            :page-size="queryInfo.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total">
        </el-pagination>

        <!-- 添加检材的对话框 -->
        <el-dialog title="添加检材"
                   :close-on-click-modal="false"
                   :visible.sync="addDialogVisible"
                   @close="closeAddDialog"
                   width="30%">
            <el-form ref="addFormRef"
                     :rules="apprSampleFormRules"
                     :model="addForm"
                     label-width="80px">
                <el-form-item label="所属项目" prop="basic_info">
                    <el-select v-model="addForm.basic_info">
                        <el-option
                            v-for="item in basicInfoList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="检材名称" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="quantity">
                    <el-input v-model.number="addForm.quantity"></el-input>
                </el-form-item>
                <el-form-item label="接收日期" prop="received_date">
                    <el-date-picker
                        v-model="addForm.received_date"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSample">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑检材的对话框 -->
        <el-dialog title="编辑检材"
                   :close-on-click-modal="false"
                   :visible.sync="editDialogVisible"
                   @close="closeEditDialog"
                   width="30%">
            <el-form ref="editFormRef"
                     :rules="apprSampleFormRules"
                     :model="editForm"
                     label-width="80px">
                <el-form-item label="所属项目" prop="basic_info">
                    <el-select v-model="editForm.basic_info">
                        <el-option
                            v-for="item in basicInfoList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="检材名称" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="quantity">
                    <el-input v-model.number="editForm.quantity"></el-input>
                </el-form-item>
                <el-form-item label="接收日期" prop="received_date">
                    <el-date-picker
                        v-model="editForm.received_date"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSample">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "ApprSample",
    data() {
        return {
            // get查询的分页参数
            queryInfo: {
                page: 1,
                size: 10,
                stage: 1,
                paginator: false,
            },
            apprSampleList: [],
            total: 0,
            basicInfoList: [],
            searchForm: {
                user: "",
                region: ""
            },
            addForm: {
                basic_info: "",
                name: "",
                quantity: 1,
                receiver: window.localStorage.getItem("id"),
                received_date: "",
            },
            editForm: {
                basic_info: "",
                name: "",
                quantity: 1,
                receiver: window.localStorage.getItem("id"),
                received_date: "",
            },
            apprSampleFormRules: {
                basic_info: [
                    {required: true, message: "请选择对应的项目", trigger: "change"},
                ],
                name: [
                    {required: true, message: "请输入检材名称", trigger: "blur"},
                ],
                quantity: [
                    {type: "number", required: true, message: "请输入材料数量", trigger: "blur"},
                ],
                received_date: [
                    {required: true, message: "请选择接收日期", trigger: "change"},
                ],
            },
            addDialogVisible: false,
            editDialogVisible: false,
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
        async getApprSampleList() {
            const res = await this.$axios.get("apprsamps/", {
                params: this.queryInfo
            })
            if (res.status !== 200) {
                return this.$message.error("获取检材列表失败，请联系管理员")
            }
            this.apprSampleList = res.data.results
            this.total = res.data.count
        },
        async getBasicInfoList() {
            const res = await this.$axios.get("basicinfos/", {
                params: this.queryInfo
            })
            if (res.status !== 200) {
                return this.$message.error("获取项目列表失败")
            }
            this.basicInfoList = res.data
        },
        handleSizeChange(size) {
            this.queryInfo.size = size
            this.getApprSampleList()
        },
        handleCurrentChange(page) {
            this.queryInfo.page = page
            this.getApprSampleList()
        },
        showAddDialog() {
            this.addDialogVisible = true
        },
        closeAddDialog() {
            this.$refs.addFormRef.resetFields()
            this.addDialogVisible = false
        },
        addSample() {
            this.$refs.addFormRef.validate(async (valid) => {
                if (!valid) {
                    this.$message.error("表单验证失败")
                    return
                }
                const res = await this.$axios.post("apprsamps/", this.addForm)
                if (res.status !== 201) {
                    return this.$message.error("添加检材失败")
                }
                this.$message.success("添加检材成功")
                this.addDialogVisible = false
                this.getApprSampleList()
            })
        },
        async showEditDialog(id) {
            const res = await this.$axios.get("apprsamps/" + id + "/")
            if (res.status !== 200) {
                return this.$message.error("获取检材信息失败")
            }
            this.editDialogVisible = true
            this.editForm = res.data
        },
        closeEditDialog() {
            this.editDialogVisible = false
        },
        editSample() {
            this.$refs.editFormRef.validate(async (valid) => {
                if (!valid) {
                    this.$message.error("表单验证失败")
                    return
                }
                const res = await this.$axios.put("apprsamps/" + this.editForm.id + "/",
                    this.editForm)
                if (res.status !== 200) {
                    return this.$message.error("编辑检材失败")
                }
                this.$message.success("编辑检材成功")
                this.editDialogVisible = false
                this.getApprSampleList()
            })
        },
        async deleteSample(id) {
            const confirmResult = await this.$confirm('此操作将永久删除该检材, 是否继续?',
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
            const res = await this.$axios.delete("apprsamps/" + id + "/")
            if (res.status !== 204) {
                return this.$message.error("删除失败")
            }
            this.$message.success("删除检材成功")
            this.getApprSampleList()
        }
    },
    created() {
        this.getApprSampleList()
        this.getBasicInfoList()
    }
}
</script>

<style scoped>

</style>