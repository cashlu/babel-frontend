<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>附加资料管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  卡片区-->
        <el-card class="box-card">
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
                    <!-- 即使不想传参数，空的括号也必须要写 -->
                    <el-button size="medium" type="primary" @click="showAddDialog()">添加附加文件</el-button>
                </el-col>
            </el-row>
            <!-- 附加文件列表 -->
            <el-table stripe
                      :data="addiFileList"
                      style="width: 100%">
                <!-- 索引列 -->
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column
                        prop="basic_info_name"
                        label="项目"
                        min-width="200px">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称"
                        min-width="200px">
                </el-table-column>
                <el-table-column
                        prop="created_date"
                        label="接收日期"
                        min-width="100px">
                </el-table-column>
                <!-- 操作按钮列 -->
                <el-table-column label="操作" min-width="380px">
                    <template v-slot="scope">
                        <!-- 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 -->
                        <el-button size="mini"
                                   type="primary"
                                   @click="showDetailDialog(scope.row)"
                                   icon="el-icon-edit">查看
                        </el-button>
                        <el-button size="mini"
                                   type="primary"
                                   @click="showUploadDialog(scope.row.id)"
                                   icon="el-icon-edit">管理扫描件
                        </el-button>
                        <el-button size="mini"
                                   type="primary"
                                   @click="showEditDialog(scope.row)"
                                   icon="el-icon-edit">编辑
                        </el-button>
                        <el-button size="mini"
                                   type="danger"
                                   @click="deleteAddiFile(scope.row.id)"
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
        <!-- 添加资料的对话框 -->
        <el-dialog
            title="添加附加资料"
            :visible.sync="addDialogVisible"
            @close="closeAddDialog"
            width="50%">
            <el-form ref="addFormRef"
                     :rules="addiFileFormRules"
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
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="接收日期" prop="created_date">
                    <el-date-picker
                        v-model="addForm.created_date"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注说明" prop="comment">
                    <el-input type="textarea" v-model="addForm.comment"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAddForm">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑资料的对话框 -->
        <el-dialog
            title="编辑附加资料"
            :visible.sync="editDialogVisible"
            @close="closeEditDialog"
            width="50%">
            <el-form ref="editFormRef"
                     :rules="addiFileFormRules"
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
                <el-form-item label="名称" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="接收日期" prop="created_date">
                    <el-date-picker
                        v-model="editForm.created_date"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注说明" prop="comment">
                    <el-input type="textarea" v-model="editForm.comment"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEditForm">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 查看资料的对话框 -->
        <el-dialog
            title="附加资料"
            :visible.sync="showDialogVisible"
            @close="closeDetailDialog"
            width="50%">
            <el-form ref="addiFormRef"
                     :rules="addiFileFormRules"
                     :model="showForm"
                     label-width="80px">
                <el-form-item label="所属项目" prop="basic_info">
                    <el-input v-model="showForm.basic_info_name" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="showForm.name" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="接收日期" prop="created_date">
                    <el-date-picker
                        :readonly="true"
                        v-model="showForm.created_date"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注说明" prop="comment">
                    <el-input type="textarea" v-model="showForm.comment" :readonly="true"></el-input>
                </el-form-item>
            </el-form>
            <!--  图片  -->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>扫描件</span>
                </div>
                <div class="demo-image__lazy">
                    <el-image v-for="url in pics" :key="url" :src="url" lazy></el-image>
                </div>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
        <!-- 上传附件的对话框 -->
        <el-dialog
                title="上传文件"
                :visible.sync="uploadDialogVisible"
                @close="UploadDialogClosed"
                width="30%">
            <!--FIXME: 上传的地址硬编码了，不好，要改！！！-->
            <el-upload
                    action="http://127.0.0.1:8888/api/v1/addifileimages/"
                    :headers="myHeaders"
                    ref="upload"
                    :data="uploadData"
                    :auto-upload="true"
                    :file-list="fileList"
                    list-type="picture-card"
                    :on-remove="handleRemove"
                    :on-preview="handlePictureCardPreview">
                <i class="el-icon-plus"></i>
            </el-upload>
            <!-- 预览大图的对话框 -->
            <el-dialog :visible.sync="previewDialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <span slot="footer" class="dialog-footer">
                <!--<el-button @click="UploadDialogClosed">取 消</el-button>-->
                <el-button type="primary" @click="uploadDialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AddiFiles",
        data() {
            return {
                queryInfo: {
                    page: 1,
                    size: 10,
                    stage: 3,
                    paginator: false,
                },
                total: 0,
                searchForm: {
                    user: "",
                    region: ""
                },
                addiFileList: [],
                basicInfoList: [],
                addDialogVisible: false,
                editDialogVisible: false,
                showDialogVisible: false,
                previewDialogVisible: false,
                addForm: {
                    basic_info: "",
                    name: "",
                    created_date: "",
                    comment: ""
                },
                editForm: {
                    basic_info: "",
                    name: "",
                    created_date: "",
                    comment: ""
                },
                showForm: {
                    basic_info: "",
                    name: "",
                    created_date: "",
                    comment: ""
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
                addiFileFormRules: {
                    basic_info: [
                        {required: true, message: "请选择对应的项目", trigger: "change"},
                    ],
                    name: [
                        {required: true, message: "请输入材料名称", trigger: "blur"},
                    ],
                    created_date: [
                        {required: true, message: "请选择接收日期", trigger: "change"},
                    ],
                },
                requestType: "",
                uploadDialogVisible: false,
                fileList: [],
                myHeaders: {},
                dialogImageUrl: "",
                // 上传文件时，携带的其他数据，这里的需求是同时传递图片对应的appraisal_file的id
                uploadData: {
                    addifile: "",
                },
                // 对话框的表单是否用于显示详情
                readonly: false,
                pics: [],
            }
        },
        methods: {
            async getAddiFileList() {
                const res = await this.$axios.get("addifiles/", {
                    params: this.queryInfo
                })
                if (res.status !== 200) {
                    return this.$message.error("获取附加文件列表失败")
                }
                this.addiFileList = res.data.results
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
            showAddDialog() {
                // TODO: 这个方法貌似可以去掉
                this.addDialogVisible = true
            },
            closeAddDialog() {
                this.getAddiFileList()
                this.$refs.addFormRef.resetFields()
            },
            async saveAddForm() {
                this.$refs.addFormRef.validate(async (valid) => {
                    if (!valid) {
                        this.$message.error("表单验证失败")
                        return
                    }
                    const res = await this.$axios.post("addifiles/", this.addForm)
                    if (res.status !== 201) {
                        return this.$message.error("添加附加文件信息失败")
                    }
                    this.$message.success("添加附加文件信息成功")
                    this.addDialogVisible = false
                })
            },
            showEditDialog(row) {
                // TODO：先试试看直接取行内的值，如果有问题，再修改为通过id从后端取值
                this.editDialogVisible = true
                this.editForm = row

                // 下面的方法也可以
                // this.$nextTick(() => {
                //     this.$refs.editFormRef.resetFields()
                //     this.editForm = row
                // })
            },
            closeEditDialog() {
                this.editDialogVisible = false
                // 如果没有nextTick()，那么重置会重置到第一次打卡编辑对话框后，给formData的赋值。
                // 这里其实可以不用重置表单，因为每次打开编辑表单，都会重新赋值，但是如果要使用重置
                // 表单，就一定要在nextTick中。
                // this.$nextTick(() => {
                //     this.$refs.editFormRef.resetFields()
                // })
                this.getAddiFileList()
            },
            async saveEditForm() {
                console.log(this.editForm)
                this.$refs.editFormRef.validate(async (valid) => {
                    if (!valid) {
                        this.$message.error("表单验证失败")
                        return
                    }
                    const res = await this.$axios.put("addifiles/" + this.editForm.id + "/", this.editForm)
                    if (res.status !== 200) {
                        return this.$message.error("修改附加文件信息失败")
                    }
                    this.$message.success("修改附加文件信息成功")
                    this.editDialogVisible = false
                })
            },
            showDetailDialog(row) {
                this.showForm = row
                this.getAllPics(row.id)
                this.showDialogVisible = true
            },
            closeDetailDialog() {
                this.showDialogVisible = false
                this.pics = []
            },
            async getAllPics(addiFileId) {
                let ids = []
                for (let i = 0; i < this.addiFileList.length; i++) {
                    if (this.addiFileList[i].id === addiFileId) {
                        ids = this.addiFileList[i].images
                    }
                }
                for (let id of ids) {
                    const {data: res} = await this.$axios.get("addifileimages/" + id)
                    this.pics.push(res.file)
                }
            },
            async showUploadDialog(id) {
                // FIXME: 上传图片之后，新上传的图片没有写入id，或者说没有获取到ID，所以删除有问题，直接删除不能获取到Id
                // 获取该行数据对应的已上传图片，然后写入fileList，实现展示功能
                const res = await this.$axios.get("addifileimages/", {
                    params: {
                        id: id,
                    }
                })
                if (res.status !== 200) {
                    return this.$message.error("获取已上传图片失败")
                }
                for (let img of res.data) {
                    this.fileList.push({name: "", id: img.id, url: img.file})
                }
                this.uploadData['addiFile'] = id
                this.uploadDialogVisible = true
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url
                this.previewDialogVisible = true
            },
            async handleRemove(file, fileList) {
                const res = await this.$axios.delete("addifileimages/" + file.id + "/")
                if (res.status !== 204) {
                    return this.$message.error("删除失败，请联系管理员")
                }
                this.$message.success("删除图片成功")
            },
            UploadDialogClosed() {
                this.uploadDialogVisible = false
                this.fileList = []
                this.getAddiFileList()
            },
            async deleteAddiFile(id) {
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
                const res = await this.$axios.delete("addifiles/" + id + "/")
                if (res.status !== 204) {
                    return this.$message.error("删除失败")
                }
                this.$message.success("删除成功")
                this.getAddiFileList()
            },
            handleSizeChange(size) {
                this.queryInfo.size = size
                this.getAddiFileList()
            },
            handleCurrentChange(page) {
                this.queryInfo.page = page
                this.getAddiFileList()
            },
            setHeaders() {
                this.myHeaders["authorization"] = "JWT " + window.localStorage.getItem("token")
            },
        },
        created() {
            this.getAddiFileList()
            this.getBasicInfoList()
            this.setHeaders()
        }
    }
</script>

<style scoped>

</style>