<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>项目建档</el-breadcrumb-item>
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
                    <el-button size="medium" type="primary" @click="showAddDialog">添加归档资料</el-button>
                </el-col>
            </el-row>
            <el-table stripe
                      :data="filePhasesList"
                      style="width: 100%">
                <!-- 索引列 -->
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column
                        prop="basic_info_name"
                        label="项目名称"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="finished_date"
                        label="完结时间"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="file_date"
                        label="归档时间"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="amount"
                        label="份数"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="delivery_text"
                        label="送达情况"
                        min-width="180">
                </el-table-column>

                <!-- 操作按钮列 -->
                <el-table-column label="操作" min-width="180px">
                    <template v-slot="scope">
                        <el-button size="mini"
                                   type="primary"
                                   @click="showEditDialog(scope.row.id)"
                                   icon="el-icon-edit">编辑
                        </el-button>
                        <el-button size="mini"
                                   type="danger"
                                   @click="deleteFilePhase(scope.row)"
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

        <!-- 新建归档的对话框 -->
        <el-dialog title="新建归档"
                   :visible.sync="addDialogVisible"
                   :close-on-click-modal="false"
                   width="30%">
            <el-form ref="addFileFormRef"
                     :rules="filePhaseFormRules"
                     :model="filePhaseForm"
                     label-width="100px">
                <el-form-item label="项目" prop="basic_info">
                    <el-select v-model="filePhaseForm.basic_info">
                        <el-option
                                v-for="item in basicInfoList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目结束日期" prop="finished_date">
                    <el-date-picker
                            v-model="filePhaseForm.finished_date"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="归档日期" prop="file_date">
                    <el-date-picker
                            v-model="filePhaseForm.file_date"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="案卷数量" prop="amount">
                    <el-input v-model.number="filePhaseForm.amount" placeholder="请输入正整数"></el-input>
                </el-form-item>
                <el-form-item label="送达状态" prop="delivery">
                    <el-select v-model="filePhaseForm.delivery">
                        <el-option
                                v-for="item in deliveryStateList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="addFilePhase">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改归档的对话框 -->
        <el-dialog title="编辑归档"
                   :visible.sync="editDialogVisible"
                   :close-on-click-modal="false"
                   width="30%">
            <el-form ref="editFileFormRef"
                     :rules="filePhaseFormRules"
                     :model="filePhaseForm"
                     label-width="100px">
                <el-form-item label="项目" prop="basic_info">
                    <el-select v-model="filePhaseForm.basic_info">
                        <el-option
                                v-for="item in basicInfoList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目结束日期" prop="finished_date">
                    <el-date-picker
                            v-model="filePhaseForm.finished_date"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="归档日期" prop="file_date">
                    <el-date-picker
                            v-model="filePhaseForm.file_date"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="案卷数量" prop="amount">
                    <el-input v-model.number="filePhaseForm.amount"></el-input>
                </el-form-item>
                <el-form-item label="送达状态" prop="delivery">
                    <el-select v-model="filePhaseForm.delivery">
                        <el-option
                                v-for="item in deliveryStateList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="saveEditFile">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "FilePhases",
        data() {
            return {
                // get查询的分页参数
                queryInfo: {
                    page: 1,
                    size: 10,
                    stage: 2,
                    paginator: false,
                },
                searchForm: {
                    user: "",
                    region: "",
                },
                // 归档列表
                filePhasesList: [],
                total: 0,
                basicInfoList: [],
                deliveryStateList: [],
                addDialogVisible: false,
                editDialogVisible: false,
                filePhaseForm: {
                    basic_info: "",
                    finished_date: "",
                    file_date: "",
                    archivist: window.localStorage.getItem("id"),
                    amount: "",
                    delivery: ""
                },
                filePhaseFormRules: {
                    basic_info: [
                        {required: true, message: "请选择对应的项目", trigger: "change"},
                    ],
                    finished_date: [
                        {required: true, message: "请选择项目结束日期", trigger: "change"},
                    ],
                    file_date: [
                        {required: true, message: "请选择归档日期", trigger: "change"},
                    ],
                    amount: [
                        {type: "number", required: true, message: "请输入正确的数量", trigger: "blur"},
                    ],
                    delivery: [
                        {required: true, message: "请选择送达情况", trigger: "change"},
                    ]
                },
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
            async getFileList() {
                const res = await this.$axios.get("filephases/")
                if (res.status !== 200) {
                    return this.$message.error("获取归档列表失败")
                }
                this.total = res.count
                this.filePhasesList = res.data.results
            },
            async getBasicInfoList() {
                const res = await this.$axios.get("basicinfos/", {
                    params: {
                        stage: 10
                    }
                })
                if (res.status !== 200) {
                    return this.$message.error("获取项目列表失败")
                }
                this.basicInfoList = res.data
            },
            async getDeliverStateList() {
                const res = await this.$axios.get("deliverystates/")
                if (res.status !== 200) {
                    return this.$message.error("获取送达字典失败")
                }
                this.deliveryStateList = res.data
            },
            handleSizeChange(size) {
                this.queryInfo.size = size
                this.getFileList()
            },
            handleCurrentChange(page) {
                this.queryInfo.page = page
                this.getFileList()
            },
            // TODO: 这个方法貌似可以去掉，把语句写在行间
            showAddDialog() {
                this.addDialogVisible = true
                this.$nextTick(() => {
                    // 清空fileData
                    this.filePhaseForm = {}
                    // 给fileData一些必要的初始化值，例如这里赋值了登录用户的ID
                    this.filePhaseForm.archivist = window.localStorage.getItem("id")
                    // 这个操作主要的目的是清除表单验证的提示
                    this.$refs.addFileFormRef.resetFields()
                })
            },

            addFilePhase() {
                this.$refs.addFileFormRef.validate(async (valid) => {
                    if (!valid) {
                        this.$message.error("表单验证失败")
                        return
                    }
                    const res = await this.$axios.post("filephases/", this.filePhaseForm)
                    if (res.status !== 201) {
                        return this.$message.error("归档失败")
                    }
                    // FIXME：这两个操作应该做成事务
                    // 更新stage状态
                    const projRes = await this.$axios.patch("basicinfos/" +
                        this.filePhaseForm.basic_info + "/",
                        {
                            "stage": 11
                        }
                    )
                    if (projRes.status !== 200) {
                        return this.$message.error("状态更新失败")
                    }
                    this.addDialogVisible = false
                    this.getFileList()
                    this.getBasicInfoList()
                })
            },
            async showEditDialog(id) {
                const res = await this.$axios.get("filephases/" + id)
                if (res.status !== 200) {
                    return this.$message.error("获取归档信息失败")
                }
                this.filePhaseForm = res.data
                this.editDialogVisible = true
            },
            // 修改信息的保存事件
            async saveEditFile() {
                const res = await this.$axios.put("filephases/" + this.filePhaseForm.id + "/",
                    this.filePhaseForm)
                // console.log(res)
                if (res.status !== 200) {
                    return this.$message.error("信息修改失败")
                }
                this.editDialogVisible = false
                this.getFileList()
                return this.$message.success("修改成功")
            },
            async deleteFilePhase(row) {

                const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?',
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
                // 删除FilePhase数据
                const res = await this.$axios.delete("filephases/" + row.id + "/")
                if (res.status !== 204) {
                    return this.$message.error("删除归档信息失败")
                }
                // 重置BasicInfo的stage
                const basicRes = await this.$axios.patch("basicinfos/" + row.basic_info + "/",
                    {
                        "stage": "2"
                    }
                )
                if (basicRes.status !== 200) {
                    return this.$message.error("重置状态失败")
                }
                this.getFileList()
                this.getBasicInfoList()
                return this.$message.success("删除归档成功")

            },

        },
        created() {
            this.getFileList()
            this.getBasicInfoList()
            this.getDeliverStateList()
        }
    }
</script>

<style scoped>

</style>