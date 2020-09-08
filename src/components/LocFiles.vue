<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>现场文件管理</el-breadcrumb-item>
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
                    <el-button size="medium" type="primary" @click="showAddFileDialog">添加现场文件</el-button>
                </el-col>
            </el-row>

            <!-- 现场文件列表 -->
            <el-table stripe
                      :data="localeFileList"
                      style="width: 100%">
                <!-- 索引列 -->
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column
                    prop="basic_info_name"
                    label="项目名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="文件名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="created_date"
                    label="接收时间">
                </el-table-column>
                <el-table-column
                    prop="comment"
                    label="备注说明">
                </el-table-column>
                <!-- 操作按钮列 -->
                <el-table-column label="操作" width="550px">
                    <template v-slot="scope">
                        <!-- 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 -->
                        <el-button size="mini"
                                   type="primary"
                                   @click="showLocFileDetailDialog(scope.row.id)"
                                   icon="el-icon-edit">查看
                        </el-button>
                        <el-button size="mini"
                                   type="primary"
                                   @click="showUploadDialog(scope.row.id)"
                                   v-show="scope.row.basic_info_stage === 4"
                                   icon="el-icon-edit">管理扫描件
                        </el-button>
                        <el-button size="mini"
                                   type="primary"
                                   @click="showEditFileDialog(scope.row.id)"
                                   v-show="scope.row.basic_info_stage === 4"
                                   icon="el-icon-edit">编辑
                        </el-button>
                        <el-button size="mini"
                                   type="danger"
                                   @click="deleteFile(scope.row.id)"
                                   v-show="scope.row.basic_info_stage === 4"
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

        <!-- 添加现场文件的对话框 -->
        <el-dialog
            title="添加文件"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            @close="addFileDialogClosed"
            :visible.sync="addDialogVisible"
            width="30%">
            <el-form :model="addLocFileForm"
                     :rules="locFileFormRules"
                     ref="addLocFileFormRef"
                     label-width="80px">
                <el-form-item label="所属项目" prop="basic_info">
                    <el-select v-model="addLocFileForm.basic_info">
                        <el-option
                            v-for="item in basicInfoList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文件名称" prop="name">
                    <el-input v-model="addLocFileForm.name"></el-input>
                </el-form-item>
                <el-form-item label="接收日期" prop="created_date">
                    <el-date-picker
                        v-model="addLocFileForm.created_date"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注说明" prop="comment">
                    <el-input type="textarea" v-model="addLocFileForm.comment"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addFileDialogClosed">取 消</el-button>
                <el-button type="primary" @click="addFile">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 编辑现场文件的对话框 -->
        <el-dialog
            title="编辑文件"
            @close="editFileDialogClosed"
            :visible.sync="editDialogVisible"
            width="30%">
            <el-form :model="editLocFileForm"
                     :rules="locFileFormRules"
                     ref="editLocFileFormRef"
                     label-width="80px">
                <el-form-item label="所属项目" prop="basic_info">
                    <el-select v-model="editLocFileForm.basic_info">
                        <el-option
                            v-for="item in basicInfoList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文件名称" prop="name">
                    <el-input v-model="editLocFileForm.name"></el-input>
                </el-form-item>
                <el-form-item label="接收日期" prop="created_date">
                    <el-date-picker
                        v-model="editLocFileForm.created_date"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注说明" prop="comment">
                    <el-input type="textarea" v-model="editLocFileForm.comment"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editFileDialogClosed">取 消</el-button>
                <el-button type="primary" @click="editFile">确 定</el-button>
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
                action="http://127.0.0.1:8888/api/v1/localefileimages/"
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
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <span slot="footer" class="dialog-footer">
                <!--<el-button @click="UploadDialogClosed">取 消</el-button>-->
                <el-button type="primary" @click="uploadDialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>


        <!-- 查看详情的对话框（和编辑的区别是所有的表单控件都是disabled） -->
        <el-dialog
            title="查看文件"
            @close="showFileDialogClosed"
            :visible.sync="showFileDialogVisible"
            width="60%">
            <el-form :model="showLocFileForm"
                     ref="showLocFileFormRef"
                     label-width="80px">
                <el-form-item label="所属项目" prop="basic_info">
                    <el-select disabled v-model="showLocFileForm.basic_info">
                        <el-option
                            v-for="item in basicInfoList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文件名称" prop="name">
                    <el-input disabled v-model="showLocFileForm.name"></el-input>
                </el-form-item>
                <el-form-item label="接收日期" prop="created_date">
                    <el-date-picker
                        disabled
                        v-model="showLocFileForm.created_date"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注说明" prop="comment">
                    <el-input disabled type="textarea" v-model="showLocFileForm.comment"></el-input>
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
                <el-button type="primary" @click="showFileDialogVisible=false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
export default {
    name: "LocFile",
    data() {
        return {
            // get查询的分页参数
            queryInfo: {
                page: 1,
                size: 10,
                stage: 1,
                paginator: false,
            },
            searchForm: {
                user: "",
                region: ""
            },
            // 现场文件列表
            localeFileList: [],
            basicInfoList: [],
            total: 0,
            // TODO: 合并添加和编辑的表单和数据绑定
            addDialogVisible: false,
            editDialogVisible: false,
            uploadDialogVisible: false,
            addLocFileForm: {
                basic_info: "",
                name: "",
                created_date: "",
                comment: "",
            },
            editLocFileForm: {
                basic_info: "",
                name: "",
                created_date: "",
                comment: "",
            },
            showLocFileForm: {
                basic_info_name: "",
                name: "",
                created_date: "",
                comment: "",
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
            locFileFormRules: {
                basic_info: [
                    {required: true, message: "请选择对应的项目", trigger: "change"},
                ],
                name: [
                    {required: true, message: "请输入文件名称", trigger: "blur"},
                ],
                created_date: [
                    {required: true, message: "请选择接收日期", trigger: "change"},
                ],
                comment: [
                    {required: true, message: "请输入备注说明", trigger: "blur"},
                ]
            },
            myHeaders: {},
            fileList: [],
            // 上传文件时，携带的其他数据，这里的需求是同时传递图片对应的locale_file的id
            uploadData: {
                locale_file: "",
            },
            dialogImageUrl: '',
            dialogVisible: false,

            showFileDialogVisible: false,
            pics: [],
        }
    },
    methods: {
        async getBasicInfoList() {
            const res = await this.$axios.get("basicinfos/", {
                params: {
                    stage: 4
                }
            })
            if (res.status !== 200) {
                return this.$message.error("获取项目列表失败")
            }
            this.basicInfoList = res.data
        },
        async getLocaleFileList() {
            const res = await this.$axios.get("localfiles/", {
                params: this.queryInfo
            })
            if (res.status !== 200) {
                return this.$message.error("获取文件列表失败")
            }
            this.localeFileList = res.data.results
            this.total = res.data.count
        },
        handleSizeChange(size) {
            this.queryInfo.size = size
            this.getApprFileList()
        },
        handleCurrentChange(page) {
            this.queryInfo.page = page
            this.getApprFileList()
        },
        showAddFileDialog() {
            this.addDialogVisible = true
        },
        addFileDialogClosed() {
            this.addDialogVisible = false
            this.$refs.addLocFileFormRef.resetFields()
        },

        async addFile() {
            this.$refs.addLocFileFormRef.validate(async (valid) => {
                if (!valid) {
                    this.$message.error("表单验证失败")
                    return
                }
                const res = await this.$axios.post("localfiles/", this.addLocFileForm)
                if (res.status !== 201) {
                    return this.$message.error("添加文件错误，请联系管理员")
                }
                this.$message.success("添加文件成功")
                this.addDialogVisible = false
                this.getLocaleFileList()
            })
        },
        async showEditFileDialog(id) {
            const res = await this.$axios.get("localfiles/" + id + "/")
            if (res.status !== 200) {
                return this.$message.error("获取文件信息失败，请联系管理员")
            }
            this.editLocFileForm = res.data
            this.editDialogVisible = true
        },
        editFileDialogClosed() {
            this.editDialogVisible = false
            this.$refs.editLocFileFormRef.resetFields()
        },
        showFileDialogClosed() {
            this.showFileDialogVisible = false
            this.$refs.showLocFileFormRef.resetFields()
            this.pics = []
        },

        async editFile() {
            this.$refs.editLocFileFormRef.validate(async (valid) => {
                if (!valid) {
                    this.$message.error("表单验证失败")
                    return
                }
                const res = await this.$axios.put("localfiles/" + this.editLocFileForm.id + "/",
                    this.editLocFileForm)
                if (res.status !== 200) {
                    return this.$message.error("编辑现场文件失败")
                }
                this.$message.success("编辑线程文件成功")
                this.editDialogVisible = false
                this.getLocaleFileList()
            })
        },
        async showUploadDialog(id) {
            const res = await this.$axios.get("localefileimages/", {
                params: {
                    id: id
                }
            })
            if (res.status !== 200) {
                return this.$message.error("获取已上传图片失败")
            }
            for (let img of res.data) {
                this.fileList.push({name: "", id: img.id, url: img.file})
            }
            this.uploadData["locale_file"] = id
            this.uploadDialogVisible = true
        },
        async deleteFile(id) {
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
            const res = await this.$axios.delete("localfiles/" + id + "/")
            if (res.status !== 204) {
                return this.$message.error("删除失败")
            }
            this.$message.success("删除成功")
            this.getLocaleFileList()
        },
        async handleRemove(file, fileList) {
            const res = await this.$axios.delete("localefileimages/" + file.id + "/")
            if (res.status !== 204) {
                return this.$message.error("删除失败，请联系管理员")
            }
            this.$message.success("删除图片成功")
        },
        UploadDialogClosed() {
            this.uploadDialogVisible = false
            this.fileList = []
            this.getLocaleFileList()
            this.pics = []

        },
        // 获取一个locale_file对应的所有图片链接，用于在编辑或者查看详情页面展示图片附件。
        async getAllPics(locFileID) {
            // 单个locale_file对应的所有图片
            let ids = []
            for (let i = 0; i < this.localeFileList.length; i++) {
                if (this.localeFileList[i].id === locFileID) {
                    ids = this.localeFileList[i].images
                }
            }
            for (let id of ids) {
                const {data: res} = await this.$axios.get("localefileimages/" + id)
                this.pics.push(res.file)
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        setHeaders() {
            this.myHeaders["authorization"] = "JWT " + window.localStorage.getItem("token")
        },
        async showLocFileDetailDialog(id) {
            const res = await this.$axios.get("localfiles/" + id)
            if (res.status !== 200) {
                return this.$message.error("获取文件详情失败")
            }
            this.showLocFileForm = res.data
            this.getAllPics(id)
            this.showFileDialogVisible = true
        },

    },
    created() {
        this.getBasicInfoList()
        this.getLocaleFileList()
        this.setHeaders()
    }
}
</script>

<style scoped>

</style>