<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>设备仪器管理</el-breadcrumb-item>
            <el-breadcrumb-item>设备管理列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  卡片区-->
        <el-card class="box-card">
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
                    <el-button size="medium" type="primary" @click="showAddDialog">添加仪器</el-button>
                </el-col>
            </el-row>
            <el-table
                stripe
                :data="deviceList"
                style="width: 100%">
                <el-table-column
                    prop="device_id"
                    label=设备编号
                    width="100px">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="设备名称"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="model"
                    label="型号"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="detection_period"
                    label="检定周期（月）"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="detection_department"
                    label="鉴定单位"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="last_detection"
                    label="上次检定日期"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="status_name"
                    label="状态"
                    min-width="100">
                </el-table-column>
                <!-- 操作按钮列 -->
                <el-table-column label="操作" min-width="350px">
                    <template v-slot="scope">
                        <!-- 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 -->
                        <el-button size="mini"
                                   type="primary"
                                   @click="showEditDialog(scope.row)"
                                   icon="el-icon-edit">编辑
                        </el-button>
                        <el-button size="mini"
                                   type="danger"
                                   @click="deleteDevice(scope.row)"
                                   icon="el-icon-delete">删除
                        </el-button>
                        <el-button size="mini"
                                   type="warning"
                                   @click=""
                                   icon="el-icon-delete">申领
                        </el-button>
                        <el-button size="mini"
                                   type="success"
                                   @click=""
                                   icon="el-icon-delete">归还
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
        <!-- 添加设备仪器的对话框 -->
        <el-dialog
            title="添加设备仪器"
            :visible.sync="addDialogVisible"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            width="30%">

            <el-form ref="addFormRef"
                     :model="addForm"
                     :rules="deviceFormRules"
                     label-width="120px">
                <el-form-item label="设备编号" prop="device_id">
                    <el-input v-model="addForm.device_id"></el-input>
                </el-form-item>
                <el-form-item label="设备名称" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="型号" prop="model">
                    <el-input v-model="addForm.model"></el-input>
                </el-form-item>
                <el-form-item label="鉴定单位" prop="detection_department">
                    <el-input v-model="addForm.detection_department"></el-input>
                </el-form-item>
                <el-form-item label="检定周期" prop="detection_period">
                    <el-input v-model.number="addForm.detection_period" placeholder="请输入整数月份"></el-input>
                </el-form-item>
                <el-form-item label="上次检定日期" prop="last_detection">
                    <el-date-picker
                        v-model="addForm.last_detection"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDevice">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑设备仪器的对话框 -->
        <el-dialog
            title="编辑设备仪器"
            :visible.sync="editDialogVisible"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            width="30%">
            <el-form ref="editFormRef"
                     :model="editForm"
                     :rules="deviceFormRules"
                     label-width="120px">
                <el-form-item label="设备编号" prop="device_id">
                    <el-input v-model="editForm.device_id"></el-input>
                </el-form-item>
                <el-form-item label="设备名称" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="型号" prop="model">
                    <el-input v-model="editForm.model"></el-input>
                </el-form-item>
                <el-form-item label="鉴定单位" prop="detection_department">
                    <el-input v-model="editForm.detection_department"></el-input>
                </el-form-item>
                <el-form-item label="检定周期" prop="detection_period">
                    <el-input v-model.number="editForm.detection_period" placeholder="请输入整数月份"></el-input>
                </el-form-item>
                <el-form-item label="上次检定日期" prop="last_detection">
                    <el-date-picker
                        v-model="editForm.last_detection"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDevice">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Devices",
    data() {
        return {
            queryInfo: {
                page: 1,
                size: 10,
                stage: 1,
                paginator: true,
            },
            searchForm: {
                user: "",
                region: ""
            },
            deviceList: [],
            total: 0,
            userList: [],
            addDialogVisible: false,
            editDialogVisible: false,
            // TODO: 这里的初始值在测试后要去掉
            addForm: {
                device_id: "",
                name: "望远镜",
                model: "KJ22",
                detection_period: "6",
                detection_department: "XX光学",
                last_detection: "2019-3-1",
                status: "1",
            },
            editForm: {
                device_id: "",
                name: "",
                model: "",
                detection_period: "",
                detection_department: "",
                last_detection: "",
                status: "1",
            },
            deviceFormRules: {
                device_id: [
                    {required: true, message: "请输入设备编号", trigger: "blur"},
                ],
                name: [
                    {required: true, message: "请输入设备名称", trigger: "blur"},
                ],
                model: [
                    {required: true, message: "请输入设备型号", trigger: "blur"},
                ],
                detection_period: [
                    {required: true, message: "请输入鉴定周期（正整数月份）", trigger: "blur"},
                ],
                detection_department: [
                    {required: true, message: "请输入检定单位", trigger: "blur"},
                ],
                last_detection: [
                    {required: true, message: "请选择上次检定日期", trigger: "blur"},
                ]
            }
        }
    },
    methods: {
        handleSizeChange(size) {
            this.queryInfo.size = size
            this.getDeviceList()
        },
        handleCurrentChange(page) {
            this.queryInfo.page = page
            this.getDeviceList()
        },
        async getDeviceList() {
            const res = await this.$axios.get("devices/", {
                params: this.queryInfo
            })
            if (res.status !== 200) {
                return this.$message.error("获取设备列表失败")
            }
            this.deviceList = res.data.results
            this.total = res.data.count
        },
        async getUserList() {
            const res = await this.$axios.get("users/")
            if (res.status !== 200) {
                return this.$message.error("获取用户列表列表失败")
            }
            this.userList = res.data
        },
        showAddDialog() {
            this.addDialogVisible = true
            this.$nextTick(() => {
                // TODO: 这里的初始值在测试后要去掉
                this.addForm = {
                    device_id: "",
                    name: "望远镜",
                    model: "KJ22",
                    detection_period: "6",
                    detection_department: "XX光学",
                    last_detection: "2019-3-1",
                    status: "1",
                }
                this.$refs.addForm.resetFields()
            })
        },
        async addDevice() {
            this.$refs.addFormRef.validate(async (valid) => {
                if (!valid) {
                    this.$message.error("表单验证失败")
                    return
                }
                const res = await this.$axios.post("devices/", this.addForm)
                if (res.status !== 201) {
                    return this.$message.error("添加设备失败")
                }
                this.$message.success("添加设备成功")
                this.addDialogVisible = false
                this.getDeviceList()
            })
        },
        showEditDialog(row) {
            this.editDialogVisible = true
            this.editForm = row
        },
        editDevice() {
            this.$refs.editFormRef.validate(async (valid) => {
                if (!valid) {
                    this.$message.error("表单验证失败")
                    return
                }
                const res = await this.$axios.put("devices/" + this.editForm.id + "/",
                    this.editForm)
                if (res.status !== 200) {
                    return this.$message.error("修改设备失败")
                }
                this.$message.success("修改设备成功")
                this.editDialogVisible = false
                this.getDeviceList()
            })
        },
        async deleteDevice(row) {
            const confirmResult = await this.$confirm('此操作将永久删除该设备, 是否继续?',
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
            const res = await this.$axios.delete("devices/" + row.id + "/")
            if (res.status !== 204) {

                return this.$message.error("删除设备失败")
            }
            this.getDeviceList()
            return this.$message.success("删除设备成功")
        }
    },
    created() {
        this.getDeviceList()
        this.getUserList()
    },
}
</script>

<style scoped>

</style>