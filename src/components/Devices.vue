<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>设备仪器管理</el-breadcrumb-item>
            <el-breadcrumb-item>设备管理列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  卡片区-->
        <!-- TODO: 搜索功能还未实现-->
        <el-card class="box-card">
            <el-row>
                <el-col :span="18">
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
                <el-col :span="3">
                    <el-button size="medium" type="success" @click="showApplyDialog">设备申领</el-button>
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
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="detection_department"
                    label="鉴定单位"
                    min-width="200">
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
                                   type="success"
                                   v-show="scope.row.status !== 1"
                                   @click="returnDevice(scope.row.id)"
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
            @close="addDialogClosed"
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
        <!-- 设备申领对话框 -->
        <el-dialog title="设备申领"
                   :visible.sync="applyDialogVisible"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false"
                   @close="applyDialogClosed"
                   width="80%">
            <el-card header="请勾选要申领的设备">
                <el-table
                    ref="applyTableRef"
                    :data="availableDevices"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        fixed
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        fixed
                        prop="device_id"
                        label="设备编号"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        fixed
                        prop="name"
                        label="名称"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        prop="model"
                        label="型号"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        prop="detection_department"
                        label="检定机构"
                        min-width="300">
                    </el-table-column>
                    <el-table-column
                        prop="detection_period"
                        label="检定周期(月)"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        prop="last_detection"
                        label="上次检定日期"
                        min-width="120">
                    </el-table-column>
                </el-table>
            </el-card>
            <br>
            <el-card>
                <el-form :model="applyDeviceForm"
                         :rules="applyDeviceFormRules"
                         ref="applyDeviceFormRef"
                         label-width="120px">
                    <el-form-item label="关联项目" prop="basicInfo">
                        <el-select v-model="applyDeviceForm.basicInfo">
                            <el-option
                                v-for="item in availableBasicInfos"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：" prop="comment">
                        <el-input type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 10}"
                                  v-model="applyDeviceForm.comment"></el-input>
                    </el-form-item>

                </el-form>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="applyDialogClosed" style="font-weight: bold">取 消</el-button>
                <el-button type="primary" @click="applyDevices" style="font-weight: bold">提 交</el-button>
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
            addForm: {
                device_id: "",
                name: "",
                model: "",
                detection_period: "",
                detection_department: "",
                last_detection: "",
                status: "",
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
            },
            applyDialogVisible: false,
            deviceGroups: [],
            activeNames: [],
            selectedDevice: [],
            availableDevices: [],
            applyDeviceForm: {},
            applyDeviceFormRules: {
                basicInfo: [
                    {required: false, message: "请选择关联项目", trigger: "blur"},
                ],
                comment: [
                    {required: false, message: "请输入备注", trigger: "blur"},
                ],
            },
            availableBasicInfos: [],
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.selectedDevice = val
        },
        applyDialogClosed() {
            this.$refs.applyTableRef.clearSelection()
            this.$refs.applyDeviceFormRef.resetFields()
            this.applyDialogVisible = false
        },
        handleChange(val) {
        },
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
        async getAvailableDevices() {
            const res = await this.$axios.get("devices/", {
                params: {
                    status: 1
                }
            })
            if (res.status !== 200) {
                return this.$message.error("获取可用设备列表失败")
            }
            this.availableDevices = res.data
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
                await this.getDeviceList()
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
                await this.getDeviceList()
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
            await this.getDeviceList()
            return this.$message.success("删除设备成功")
        },
        addDialogClosed() {
            this.$refs.addFormRef.resetFields()
        },

        async getDeviceGroups() {
            const res = await this.$axios.get("devicegroup")
            if (res.status !== 200) {
                return this.$message.error("获取设备分组失败")
            }
            this.deviceGroups = res.data
        },

        showApplyDialog() {
            this.getAvailableDevices()
            this.getAvailableBasicInfo()
            this.applyDialogVisible = true

        },

        // 获取stage为4,5,6的项目列表
        async getAvailableBasicInfo() {
            const res = await this.$axios.get("basicinfos", {
                params: {
                    canApplyDevice: true
                }
            })
            if (res.status !== 200) {
                return this.$message.error("获取项目列表失败")
            }
            this.availableBasicInfos = res.data
        },

        // 申领提交
        async applyDevices() {
            // 申领记录
            const res = await this.$axios.post("applyrecs/", {
                basic_info: this.applyDeviceForm.basicInfo,
                proposer: window.localStorage.getItem("id"),
                comment: this.applyDeviceForm.comment
            })
            if (res.status !== 201) {
                return this.$message.error("创建设备申领记录失败")
            }
            // 申领明细
            let recordId = res.data.id
            for (let item of this.selectedDevice) {
                const res = await this.$axios.post("applyrecdetail/", {
                    apply_record: recordId,
                    device: item.id,
                    is_returned: false,
                    return_time: null
                })
                if (res.status !== 201) {
                    this.$message.error("添加申领明细失败")
                } else {
                    const res = await this.$axios.patch("devices/" + item.id + "/", {
                        status: 2
                    })
                    if (res.status !== 200) {
                        this.$message.error("更新设备库存状态失败")
                    }
                }
            }
            this.applyDialogClosed()
        },

        // 归还设置
        // 更新recordDetail的信息，更新devices的信息
        async returnDevice(deviceId) {
            await this.updateDeviceStatus(deviceId)
            await this.updateRecordDetail(deviceId)
            await this.getDeviceList()
        },

        // 更新设备的库存为在库
        async updateDeviceStatus(deviceId) {
            const res = await this.$axios.patch("devices/" + deviceId + "/", {
                status: 1
            })
            if (res.status !== 200) {
                this.$message.error("更新设备库存状态失败")
            }
        },

        // 更新recordDetail，补充归还日期和归还状态
        async updateRecordDetail(deviceId) {
            // 获取最后一条记录
            const res = await this.$axios.get("applyrecdetail", {
                params: {
                    deviceId: deviceId
                }
            })
            if (res.status !== 200) {
                return this.$message.error("获取设备出库明细失败")
            }
            let rec = res.data[0]
            if (rec) {
                // 更新状态
                const res = await this.$axios.patch("applyrecdetail/" + rec.id + "/", {
                    is_returned: true,
                })
                if (res.status !== 200) {
                    this.$message.error("更新出库明细状态失败")
                }
            }
        }


    },
    created() {
        this.getDeviceList()
        this.getUserList()
        this.getDeviceGroups()
    },
}
</script>

<style scoped>

</style>