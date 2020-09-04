<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>鉴定材料</el-breadcrumb-item>
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
                    <el-button size="medium" type="primary" @click="showAddApprFileDialog">添加鉴定材料</el-button>
                </el-col>
            </el-row>

            <!-- 鉴定材料列表 -->
            <el-table stripe
                      :default-sort="{prop: 'received_date', order: 'descending'}"
                      :data="apprFileList"
                      style="width: 100%">
                <!-- 索引列 -->
                <el-table-column type="index" label="序号"></el-table-column>
                <!-- 数据列 -->
                <el-table-column
                    sortable
                    prop="name"
                    label="材料名称"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="quantity"
                    label="数量"
                    min-width="70">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="basic_info_sn"
                    label="项目编号"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="basic_info_name"
                    label="项目名称"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="receiver_name"
                    label="接收人">
                </el-table-column>
                <el-table-column
                    sortable
                    min-width="100px"
                    prop="received_date"
                    label="接收日期">
                </el-table-column>
                <!-- 操作按钮列 -->
                <el-table-column label="操作" width="550px">
                    <template v-slot="scope">
                        <!-- 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 -->
                        <el-button size="mini"
                                   type="primary"
                                   @click="showApprInfoDetailDialog(scope.row.id)"
                                   icon="el-icon-edit">查看
                        </el-button>
                        <el-button size="mini"
                                   type="primary"
                                   @click="showUploadDialog(scope.row.id)"
                                   icon="el-icon-edit">管理扫描件
                        </el-button>
                        <el-button size="mini"
                                   type="primary"
                                   @click="showEditApprInfoDialog(scope.row.id)"
                                   icon="el-icon-edit">编辑
                        </el-button>
                        <el-button size="mini"
                                   type="danger"
                                   @click="deleteApprInfoById(scope.row.id)"
                                   icon="el-icon-delete">删除
                        </el-button>
                        <el-button size="mini"
                                   type="warning"
                                   :disabled="!scope.row.is_available"
                                   @click="showBorrowDialog(scope.row.id)"
                                   icon="el-icon-lock">借阅
                        </el-button>
                        <el-button size="mini"
                                   type="success"
                                   :disabled="scope.row.borrower !== userID"
                                   @click="returnFile(scope.row.id)"
                                   icon="el-icon-unlock">归还
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
        <!-- 添加鉴定材料对话框 -->
        <el-dialog
            title="添加鉴定材料"
            :close-on-click-modal="false"
            @close="addApprFileClosed"
            :visible.sync="addApprFileDialogVisible"
            width="50%">
            <!-- 添加鉴定材料的表单 -->
            <el-form ref="addApprFileFormRef"
                     :model="addApprFileForm"
                     :rules="addApprFileFormRules"
                     label-width="100px">
                <el-form-item label="所属项目" prop="basic_info">
                    <el-select v-model="addApprFileForm.basic_info" placeholder="请选择">
                        <el-option
                            v-for="item in basicInfoList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-row :gutter="10">
                    <el-col :span="18">
                        <el-form-item label="材料名称" prop="name">
                            <el-input v-model="addApprFileForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="数量" prop="quantity">
                            <!-- 如果要做数字的表单验证，这里要绑定为v-model.number -->
                            <el-input v-model.number="addApprFileForm.quantity" placeholder="请输入正整数"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="接收人" prop="receiver">
                            <el-select v-model="addApprFileForm.receiver" placeholder="请选择">
                                <el-option
                                    v-for="item in userList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="接收日期" prop="received_date">
                            <el-date-picker v-model="addApprFileForm.received_date"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addApprFileClosed">取 消</el-button>
                <el-button type="primary" @click="saveApprFile">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑鉴定材料对话框 -->
        <el-dialog
            title="编辑鉴定材料"
            :close-on-click-modal="false"
            @close="editApprFileDialogClosed"
            :visible.sync="editApprFileDialogVisible"
            width="60%">
            <!-- 编辑鉴定材料的表单 -->
            <el-form ref="editApprFileFormRef"
                     :model="editApprFileForm"
                     :rules="addApprFileFormRules"
                     label-width="100px">
                <el-form-item label="所属项目" prop="basic_info">
                    <el-select v-model="editApprFileForm.basic_info" placeholder="请选择">
                        <el-option
                            v-for="item in basicInfoList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-row :gutter="10">
                    <el-col :span="18">
                        <el-form-item label="材料名称" prop="name">
                            <el-input v-model="editApprFileForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="数量" prop="quantity">
                            <!-- 如果要做数字的表单验证，这里要绑定为v-model.number -->
                            <el-input v-model.number="editApprFileForm.quantity" placeholder="请输入正整数"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="接收人" prop="receiver">
                            <el-select v-model="editApprFileForm.receiver" placeholder="请选择">
                                <el-option
                                    v-for="item in userList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="接收时间" prop="received_date">
                            <el-date-picker v-model="editApprFileForm.received_date"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!--  图片  -->
            <!--TODO: 缺少删除图片的功能-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>扫描件</span>
                </div>
                <div class="demo-image__lazy">
                    <el-image v-for="url in pics" :key="url" :src="url" lazy></el-image>
                </div>
            </el-card>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editApprFileDialogClosed">取 消</el-button>
                <el-button type="primary" @click="editApprFile">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 查看材料详情的对话框（和编辑的区别是所有的表单控件都是disabled） -->
        <el-dialog
            title="查看鉴定材料"
            :close-on-click-modal="false"
            @close="showApprFileClose"
            :visible.sync="showApprFileDialogVisible"
            width="60%">
            <el-form ref="editApprFileFormRef"
                     :model="showApprFileForm"
                     label-width="100px">
                <el-form-item label="所属项目" prop="basic_info">
                    <el-input :readonly="true" v-model="showApprFileForm.basic_info_name"></el-input>
                    <!--<el-select disabled v-model="showApprFileForm.basic_info" placeholder="请选择">-->
                    <!--    <el-option-->
                    <!--            v-for="item in projectList"-->
                    <!--            :key="item.id"-->
                    <!--            :label="item.name"-->
                    <!--            :value="item.id">-->
                    <!--    </el-option>-->
                    <!--</el-select>-->
                </el-form-item>
                <el-row :gutter="10">
                    <el-col :span="18">
                        <el-form-item label="材料名称" prop="name">
                            <el-input :readonly="true" v-model="showApprFileForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="数量" prop="quantity">
                            <!-- 如果要做数字的表单验证，这里要绑定为v-model.number -->
                            <el-input :readonly="true" v-model.number="showApprFileForm.quantity"
                                      placeholder="请输入正整数"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="接收人" prop="receiver">
                            <!--<el-select disabled v-model="showApprFileForm.receiver" placeholder="请选择">-->
                            <!--    <el-option-->
                            <!--            v-for="item in userList"-->
                            <!--            :key="item.id"-->
                            <!--            :label="item.name"-->
                            <!--            :value="item.id">-->
                            <!--    </el-option>-->
                            <!--</el-select>-->
                            <el-input :readonly="true" v-model="showApprFileForm.receiver_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="接收时间" prop="received_date">
                            <!--<el-date-picker v-model="showApprFileForm.received_date"-->
                            <!--                disabled-->
                            <!--                type="date"-->
                            <!--                placeholder="选择日期"-->
                            <!--                format="yyyy 年 MM 月 dd 日"-->
                            <!--                value-format="yyyy-MM-dd">-->
                            <!--</el-date-picker>-->
                            <el-input :readonly="true" v-model="showApprFileForm.received_date"></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>
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
                <el-button type="primary" @click="showApprFileDialogVisible=false">关 闭</el-button>
            </span>
        </el-dialog>

        <!-- 上传附件的对话框 -->
        <el-dialog
            title="上传文件"
            :visible.sync="uploadDialogVisible"
            @close="UploadDialogClosed"
            width="30%">
            <!--FIXME: 上传的地址硬编码了，不好，要改！！！-->
            <!--:on-change="changeFileList"-->
            <el-upload
                action="http://127.0.0.1:8888/api/v1/apprfileimgs/"
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
                <el-button type="primary" @click="uploadDialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>

        <!-- 材料借阅对话框 -->
        <el-dialog
            title="材料借阅"
            :visible.sync="apprFileBorrowDialogVisible"
            @close=""
            width="30%">
            <el-form ref="apprFileBorrowFormRef"
                     :model="borrowFileForm"
                     :rules="borrowFileFormRules"
                     label-width="80px">
                <el-form-item label="材料名称">
                    <span>{{ borrowFileForm.appraisal_file_name }}</span>
                </el-form-item>
                <el-form-item label="借阅时间" prop="borrowing_time">
                    <!--<el-date-picker v-model="borrowFileForm.borrowing_time"-->
                    <!--                type="date"-->
                    <!--                placeholder="选择日期"-->
                    <!--                format="yyyy 年 MM 月 dd 日"-->
                    <!--                value-format="yyyy-MM-dd">-->
                    <!--</el-date-picker>-->
                    <el-date-picker
                        v-model="borrowFileForm.borrowing_time"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="借阅说明" prop="comment">
                    <el-input type="textarea" v-model="borrowFileForm.comment"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="apprFileBorrowDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="borrowFile">确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>

<script>
import {getFormatDate} from '../utils'

export default {
    name: "ApprFile",
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
            apprFileList: [],
            total: 0,
            addApprFileForm: {
                basic_info: "",
                name: "",
                quantity: 0,
                receiver: "",
                received_date: "",
            },
            editApprFileForm: {
                basic_info: "",
                name: "",
                quantity: 0,
                receiver: "",
                received_date: "",
            },
            showApprFileForm: {
                basic_info: "",
                name: "",
                quantity: "",
                receiver: "",
                received_date: "",
            },
            addApprFileFormRules: {
                basic_info: [
                    {required: true, message: "请选择对应的项目", trigger: "change"},
                ],
                name: [
                    {required: true, message: "请输入材料名称", trigger: "blur"},
                ],
                quantity: [
                    {type: "number", required: true, message: "请输入材料数量", trigger: "blur"},
                ],
                receiver: [
                    {required: true, message: "请选择接收人", trigger: "blur"},
                ],
                received_date: [
                    {required: true, message: "请选择接收日期", trigger: "change"},
                ],
            },
            addApprFileDialogVisible: false,
            editApprFileDialogVisible: false,
            showApprFileDialogVisible: false,
            uploadDialogVisible: false,
            basicInfoList: [],
            userList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
            myHeaders: {},
            // 上传文件时，携带的其他数据，这里的需求是同时传递图片对应的appraisal_file的id
            uploadData: {
                appraisal_file: "",
            },
            pics: [],
            userID: null,
            borrowFileForm: {
                borrower: "",
                appraisal_file_name: "",
                appraisal_file_id: "",
                borrowing_time: "",
                comment: "",
                is_returned: false,
            },
            apprFileBorrowDialogVisible: false,
            borrowFileFormRules: {
                borrowing_time: [
                    {required: true, message: "请选择借阅日期", trigger: "blur"},
                ],
                comment: [
                    {required: true, message: "请输入借阅说明", trigger: "blur"},
                ]
            },
        }
    },
    methods: {
        async getApprFileList() {
            const res = await this.$axios.get("apprfiles/", {
                params: this.queryInfo
            })
            if (res.status !== 200) {
                return this.$message.error("获取鉴定材料失败")
            }
            this.apprFileList = res.data.results
            this.total = res.data.count
        },
        async getBaseInfoList() {
            const res = await this.$axios.get("basicinfos/", {
                params: this.queryInfo
            })
            if (res.status !== 200) {
                return this.$message.error("获取项目列表失败")
            }
            this.basicInfoList = res.data
            console.log(this.basicInfoList);

        },
        showAddApprFileDialog() {
            this.getBaseInfoList()
            this.addApprFileDialogVisible = true
        },
        async showEditApprInfoDialog(id) {
            const res = await this.$axios.get("apprfiles/" + id)
            if (res.status !== 200) {
                return this.$message.error("获取鉴定材料失败")
            }
            this.editApprFileForm = res.data
            this.getAllPics(id)
            this.editApprFileDialogVisible = true
        },
        editApprFileDialogClosed() {
            this.editApprFileDialogVisible = false
            this.pics = []
        },
        async deleteApprInfoById(id) {
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
            const res = await this.$axios.delete("apprfiles/" + id + "/")
            if (res.status !== 204) {
                return this.$message.error("删除失败")
            }
            this.$message.success("删除成功")
            this.getApprFileList()
        },
        async saveApprFile() {
            this.$refs.addApprFileFormRef.validate(async (valid) => {
                if (!valid) {
                    this.$message.error("表单验证失败")
                    return
                }
                const res = await this.$axios.post("apprfiles/", this.addApprFileForm)
                if (res.status !== 201) {
                    return this.$message.error("创建鉴定材料失败")
                }
                this.$message.success("创建鉴定材料成功")
                this.addApprFileDialogVisible = false
                this.getApprFileList()
            })
        },
        async editApprFile() {
            this.$refs.editApprFileFormRef.validate(async (valid) => {
                if (!valid) {
                    this.$message.error("表单验证失败")
                    return
                }
                const res = await this.$axios.put("apprfiles/" + this.editApprFileForm.id + "/", this.editApprFileForm)
                if (res.status !== 200) {
                    return this.$message.error("编辑鉴定材料失败")
                }
                this.$message.success("编辑鉴定材料成功")
                this.editApprFileDialogVisible = false
                this.getApprFileList()
                this.pics = []
            })
        },
        // 展示鉴定材料详情的对话框
        async showApprInfoDetailDialog(id) {
            const res = await this.$axios.get("apprfiles/" + id)
            if (res.status !== 200) {
                return this.$message.error("获取鉴定材料失败")
            }
            this.showApprFileForm = res.data
            this.getAllPics(id)
            this.showApprFileDialogVisible = true
        },
        // 展示上传图片附件的对话框
        async showUploadDialog(id) {
            // 获取该行数据对应的已上传图片，然后写入fileList，实现展示功能
            const res = await this.$axios.get("apprfileimgs/", {
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
            this.uploadData['appraisal_file'] = id
            this.uploadDialogVisible = true
        },
        async handleRemove(file, fileList) {
            const res = await this.$axios.delete("apprfileimgs/" + file.id + "/")
            if (res.status !== 204) {
                return this.$message.error("删除失败，请联系管理员")
            }
            this.$message.success("删除图片成功")
        },
        addApprFileClosed() {
            this.$refs.addApprFileFormRef.resetFields()
            this.addApprFileDialogVisible = false
            this.pics = []
        },
        showApprFileClose() {
            this.$refs.editApprFileFormRef.resetFields()
            this.showApprFileDialogVisible = false
            this.pics = []
        },
        handleSizeChange(size) {
            this.queryInfo.size = size
            this.getApprFileList()
        },
        handleCurrentChange(page) {
            this.queryInfo.page = page
            this.getApprFileList()
        },
        async getUserList() {
            const {data: res} = await this.$axios.get("users")
            this.userList = res
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        setHeaders() {
            this.myHeaders["authorization"] = "JWT " + window.localStorage.getItem("token")
        },

        UploadDialogClosed() {
            this.uploadDialogVisible = false
            this.fileList = []
            this.getApprFileList()
            this.pics = []
        },

        // 获取一个appraisal_file对应的所有图片链接，用于在编辑或者查看详情页面展示图片附件。
        async getAllPics(apprFileId) {
            // 单个appraisal_file对应的所有图片
            let ids = []
            for (let i = 0; i < this.apprFileList.length; i++) {
                if (this.apprFileList[i].id === apprFileId) {
                    ids = this.apprFileList[i].images
                }
            }
            for (let id of ids) {
                const {data: res} = await this.$axios.get("apprfileimgs/" + id)
                this.pics.push(res.file)
            }
        },
        // FIXME: 考虑使用computed或者其他更好的办法获取UserID
        getCurUserID() {
            this.userID = parseInt(window.localStorage.getItem("id"))
        },
        // 借阅按钮的监听事件
        async showBorrowDialog(id) {
            const res = await this.$axios.get("apprfiles/" + id)
            if (res.status !== 200) {
                return this.$message.error("获取材料信息失败")
            }
            this.apprFileBorrowDialogVisible = true
            console.log(this.borrowFileForm.appraisal_file_name)
            this.$nextTick(() => {
                this.$refs.apprFileBorrowFormRef.resetFields()
                this.borrowFileForm = {}
                this.borrowFileForm.appraisal_file = id
                this.borrowFileForm.appraisal_file_name = res.data.name
                console.log(this.borrowFileForm.appraisal_file_name)
            })
        },
        // 借阅材料对话框的关闭事件
        borrowFileFormClosed() {
            this.apprFileBorrowDialogVisible = false
        },
        // 借阅材料
        async borrowFile() {
            // 借阅人的ID为登录用户的ID
            this.borrowFileForm.borrower = this.userID
            // console.log(this.borrowFileForm)

            const res = await this.$axios.post("apprfilerecs/", this.borrowFileForm)
            if (res.status !== 201) {
                return this.$message.error("创建借阅记录失败")
            }
            this.$message.success("创建借阅记录成功")
            this.apprFileBorrowDialogVisible = false
            this.getApprFileList()
        },

        // 归还材料
        async returnFile(id) {
            const res = await this.$axios.get("apprfiles/" + id)
            if (res.status !== 200) {
                return this.$message.error("获取材料信息失败")
            }
            let record = res.data.last_record
            // 2020-03-31T16:29:18.000Z
            let now = getFormatDate()
            let data = {
                "return_time": now,
                "is_returned": true
            }
            const putRes = await this.$axios.patch("apprfilerecs/" + record + "/", data)
            if (putRes.status !== 200) {
                return this.$message.error("归还失败，请联系管理员")
            }
            this.$message.success("归还成功")
            this.getApprFileList()
        },
    },

    created() {
        this.getBaseInfoList()
        this.getUserList()
        this.getApprFileList()
        this.setHeaders()
        this.getCurUserID()
    }
}
</script>

<style scoped>

</style>


<!--<template>-->
<!--    <div>-->
<!--        &lt;!&ndash;面包屑&ndash;&gt;-->
<!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>项目管理</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>鉴定材料</el-breadcrumb-item>-->
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
<!--                    <el-button size="medium" type="primary"-->
<!--                               @click="showApprFileDialog(false)">-->
<!--                        添加鉴定材料-->
<!--                    </el-button>-->
<!--                </el-col>-->
<!--            </el-row>-->

<!--            &lt;!&ndash; 鉴定材料列表 &ndash;&gt;-->
<!--            <el-table stripe-->
<!--                      :default-sort="{prop: 'received_date', order: 'descending'}"-->
<!--                      :data="apprFileList"-->
<!--                      style="width: 100%">-->
<!--                &lt;!&ndash; 索引列 &ndash;&gt;-->
<!--                <el-table-column type="index" label="序号"></el-table-column>-->
<!--                &lt;!&ndash; 数据列 &ndash;&gt;-->
<!--                <el-table-column-->
<!--                        sortable-->
<!--                        prop="name"-->
<!--                        label="材料名称"-->
<!--                        min-width="180">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        sortable-->
<!--                        prop="quantity"-->
<!--                        label="数量"-->
<!--                        min-width="70">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        sortable-->
<!--                        prop="basic_info_sn"-->
<!--                        label="项目编号"-->
<!--                        min-width="180">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        sortable-->
<!--                        prop="basic_info_name"-->
<!--                        label="项目名称"-->
<!--                        min-width="180">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        sortable-->
<!--                        prop="receiver_name"-->
<!--                        label="接收人">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        sortable-->
<!--                        min-width="100px"-->
<!--                        prop="received_date"-->
<!--                        label="接收日期">-->
<!--                </el-table-column>-->
<!--                &lt;!&ndash; 操作按钮列 &ndash;&gt;-->
<!--                <el-table-column label="操作" width="550px">-->
<!--                    <template v-slot="scope">-->
<!--                        &lt;!&ndash; 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 &ndash;&gt;-->
<!--                        <el-button size="mini"-->
<!--                                   type="primary"-->
<!--                                   @click="showApprFileDialog('show',scope.row)"-->
<!--                                   icon="el-icon-edit">查看-->
<!--                        </el-button>-->
<!--                        <el-button size="mini"-->
<!--                                   type="primary"-->
<!--                                   @click="showUploadDialog(scope.row.id)"-->
<!--                                   icon="el-icon-edit">上传扫描件-->
<!--                        </el-button>-->
<!--                        <el-button size="mini"-->
<!--                                   type="primary"-->
<!--                                   @click="showApprFileDialog('edit',scope.row)"-->
<!--                                   icon="el-icon-edit">编辑-->
<!--                        </el-button>-->
<!--                        <el-button size="mini"-->
<!--                                   type="danger"-->
<!--                                   @click="deleteApprInfoById(scope.row.id)"-->
<!--                                   icon="el-icon-delete">删除-->
<!--                        </el-button>-->
<!--                        <el-button size="mini"-->
<!--                                   type="warning"-->
<!--                                   :disabled="!scope.row.is_available"-->
<!--                                   @click="showBorrowDialog(scope.row.id)"-->
<!--                                   icon="el-icon-lock">借阅-->
<!--                        </el-button>-->
<!--                        <el-button size="mini"-->
<!--                                   type="success"-->
<!--                                   :disabled="scope.row.borrower !== userID"-->
<!--                                   @click="returnFile(scope.row.id)"-->
<!--                                   icon="el-icon-unlock">归还-->
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
<!--        &lt;!&ndash; 鉴定材料对话框 &ndash;&gt;-->
<!--        <el-dialog-->
<!--                title="添加鉴定材料"-->
<!--                :close-on-click-modal="false"-->
<!--                @close="apprFileDialogClosed"-->
<!--                :visible.sync="apprFileDialogVisible"-->
<!--                width="50%">-->
<!--            &lt;!&ndash; 添加、编辑、查看鉴定材料的表单 &ndash;&gt;-->
<!--            <el-form ref="apprFileFormRef"-->
<!--                     :model="apprFileForm"-->
<!--                     :rules="apprFileFormRules"-->
<!--                     @close="apprFileDialogClosed"-->
<!--                     label-width="100px">-->
<!--                <el-form-item label="所属项目" prop="basic_info">-->
<!--                    <el-select v-if="!readonly" v-model="apprFileForm.basic_info">-->
<!--                        <el-option-->
<!--                                v-for="item in basicInfoList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                    <el-input v-else :readonly="readonly" v-model="apprFileForm.basic_info_name"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-row :gutter="10">-->
<!--                    <el-col :span="18">-->
<!--                        <el-form-item label="材料名称" prop="name">-->
<!--                            <el-input v-model="apprFileForm.name" :readonly="readonly"></el-input>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="6">-->
<!--                        <el-form-item label="数量" prop="quantity">-->
<!--                            &lt;!&ndash; 如果要做数字的表单验证，这里要绑定为v-model.number &ndash;&gt;-->
<!--                            <el-input v-model.number="apprFileForm.quantity" :readonly="readonly"></el-input>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                </el-row>-->
<!--                <el-row :gutter="10">-->
<!--                    <el-col :span="12">-->
<!--                        <el-form-item label="接收人" prop="receiver">-->
<!--                            <el-select v-if="!readonly" v-model="apprFileForm.receiver">-->
<!--                                <el-option-->
<!--                                        v-for="item in userList"-->
<!--                                        :key="item.id"-->
<!--                                        :label="item.name"-->
<!--                                        :value="item.id">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
<!--                            <el-input v-else-->
<!--                                      :readonly="readonly"-->
<!--                                      v-model="apprFileForm.receiver_name"></el-input>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="12">-->
<!--                        <el-form-item label="接收日期" prop="received_date">-->
<!--                            <el-date-picker v-model="apprFileForm.received_date"-->
<!--                                            :readonly="readonly"-->
<!--                                            type="date"-->
<!--                                            placeholder="选择日期"-->
<!--                                            format="yyyy 年 MM 月 dd 日"-->
<!--                                            value-format="yyyy-MM-dd">-->
<!--                            </el-date-picker>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
<!--                </el-row>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="apprFileDialogVisible=false">取 消</el-button>-->
<!--                <el-button type="primary" @click="saveApprFile()">确 定</el-button>-->
<!--            </span>-->
<!--        </el-dialog>-->
<!--        &lt;!&ndash; 上传附件的对话框 &ndash;&gt;-->
<!--        <el-dialog-->
<!--                title="上传文件"-->
<!--                :visible.sync="uploadDialogVisible"-->
<!--                @close="UploadDialogClosed"-->
<!--                width="30%">-->
<!--            &lt;!&ndash;FIXME: 上传的地址硬编码了，不好，要改！！！&ndash;&gt;-->
<!--            &lt;!&ndash;:on-change="changeFileList"&ndash;&gt;-->
<!--            <el-upload-->
<!--                    action="http://127.0.0.1:8888/api/v1/apprfileimgs/"-->
<!--                    :headers="myHeaders"-->
<!--                    ref="upload"-->
<!--                    :data="uploadData"-->
<!--                    :auto-upload="true"-->
<!--                    :file-list="fileList"-->
<!--                    list-type="picture-card"-->
<!--                    :on-remove="handleRemove"-->
<!--                    :on-preview="handlePictureCardPreview">-->
<!--                <i class="el-icon-plus"></i>-->
<!--            </el-upload>-->
<!--            &lt;!&ndash; 预览大图的对话框 &ndash;&gt;-->
<!--            <el-dialog :visible.sync="dialogVisible">-->
<!--                <img width="100%" :src="dialogImageUrl" alt="">-->
<!--            </el-dialog>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--                &lt;!&ndash;<el-button @click="UploadDialogClosed">取 消</el-button>&ndash;&gt;-->
<!--                <el-button type="primary" @click="UploadDialogClosed">关 闭</el-button>-->
<!--            </span>-->
<!--        </el-dialog>-->
<!--        &lt;!&ndash; 材料借阅对话框 &ndash;&gt;-->
<!--        <el-dialog-->
<!--                title="材料借阅"-->
<!--                :visible.sync="apprFileBorrowDialogVisible"-->
<!--                @close=""-->
<!--                width="30%">-->
<!--            <el-form ref="apprFileBorrowFormRef"-->
<!--                     :model="borrowFileForm"-->
<!--                     :rules="borrowFileFormRules"-->
<!--                     label-width="80px">-->
<!--                <el-form-item label="材料名称" prop="appraisal_file_name">-->
<!--                    <el-input v-model="borrowFileForm.appraisal_file_name" :readonly="true"></el-input>-->
<!--                </el-form-item>-->

<!--                <el-form-item label="借阅时间" prop="borrowing_time">-->
<!--                    <el-date-picker-->
<!--                            v-model="borrowFileForm.borrowing_time"-->
<!--                            type="datetime"-->
<!--                            placeholder="选择日期时间">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="借阅说明" prop="comment">-->
<!--                    <el-input type="textarea" v-model="borrowFileForm.comment"></el-input>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="borrowFileFormClosed">取 消</el-button>-->
<!--                <el-button type="primary" @click="borrowFile">确 定</el-button>-->
<!--          </span>-->
<!--        </el-dialog>-->

<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import {getFormatDate} from '../utils'-->

<!--    export default {-->
<!--        name: "ApprFile",-->
<!--        data() {-->
<!--            return {-->
<!--                // get查询的分页参数-->
<!--                queryInfo: {-->
<!--                    page: 1,-->
<!--                    size: 10,-->
<!--                    stage: 1,-->
<!--                    paginator: false,-->
<!--                },-->
<!--                searchForm: {-->
<!--                    user: "",-->
<!--                    region: ""-->
<!--                },-->
<!--                apprFileList: [],-->
<!--                total: 0,-->
<!--                apprFileForm: {-->
<!--                    // id: null,-->
<!--                    basic_info: null,-->
<!--                    // basic_info_sn: null,-->
<!--                    // basic_info_name: null,-->
<!--                    name: null,-->
<!--                    quantity: null,-->
<!--                    receiver: null,-->
<!--                    // receiver_name: null,-->
<!--                    received_date: null,-->
<!--                },-->
<!--                apprFileFormRules: {-->
<!--                    basic_info: [-->
<!--                        {required: true, message: "请选择对应的项目", trigger: "change"},-->
<!--                    ],-->
<!--                    name: [-->
<!--                        {required: true, message: "请输入材料名称", trigger: "blur"},-->
<!--                    ],-->
<!--                    quantity: [-->
<!--                        {type: "number", required: true, message: "请输入材料数量", trigger: "blur"},-->
<!--                    ],-->
<!--                    receiver: [-->
<!--                        {required: true, message: "请选择接收人", trigger: "blur"},-->
<!--                    ],-->
<!--                    received_date: [-->
<!--                        {required: true, message: "请选择接收日期", trigger: "change"},-->
<!--                    ],-->
<!--                },-->
<!--                apprFileDialogVisible: false,-->
<!--                readonly: false,-->
<!--                uploadDialogVisible: false,-->
<!--                basicInfoList: [],-->
<!--                userList: [],-->
<!--                dialogImageUrl: '',-->
<!--                dialogVisible: false,-->
<!--                requestType: "",-->
<!--                fileList: [],-->
<!--                myHeaders: {},-->
<!--                // 上传文件时，携带的其他数据，这里的需求是同时传递图片对应的appraisal_file的id-->
<!--                uploadData: {-->
<!--                    appraisal_file: "",-->
<!--                },-->
<!--                pics: [],-->
<!--                userID: null,-->
<!--                borrowFileForm: {-->
<!--                    borrower: "",-->
<!--                    appraisal_file_name: "",-->
<!--                    appraisal_file_id: "",-->
<!--                    borrowing_time: "",-->
<!--                    comment: "",-->
<!--                    is_returned: false,-->
<!--                },-->
<!--                apprFileBorrowDialogVisible: false,-->
<!--                borrowFileFormRules: {-->
<!--                    borrowing_time: [-->
<!--                        {required: true, message: "请选择借阅日期", trigger: "blur"},-->
<!--                    ],-->
<!--                    comment: [-->
<!--                        {required: true, message: "请输入借阅说明", trigger: "blur"},-->
<!--                    ]-->
<!--                },-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            async getApprFileList() {-->
<!--                const res = await this.$axios.get("apprfiles/", {-->
<!--                    params: this.queryInfo-->
<!--                })-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取鉴定材料失败")-->
<!--                }-->
<!--                this.apprFileList = res.data.results-->
<!--                this.total = res.data.count-->
<!--            },-->
<!--            async getBaseInfoList() {-->
<!--                const res = await this.$axios.get("basicinfos/", {-->
<!--                    params: this.queryInfo-->
<!--                })-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取项目列表失败")-->
<!--                }-->
<!--                this.basicInfoList = res.data-->
<!--            },-->
<!--            // async showApprFileDialog(show = true, id) {-->
<!--            //     // 区分开添加、修改还是查看-->
<!--            //     // 如果show==true，则为查看-->
<!--            //     // 如果show==false，但是有id，则为编辑-->
<!--            //     // 以上都不满足，则为新增-->
<!--            //     this.apprFileDialogVisible = true-->
<!--            //     if (show) {-->
<!--            //         // 查看-->
<!--            //         // 通过ID获取数据，readonly=true-->
<!--            //         const res = await this.$axios.get("apprfiles/" + id)-->
<!--            //         if (res.status !== 200) {-->
<!--            //             return this.$message.error("获取鉴定资料数据失败")-->
<!--            //         }-->
<!--            //         this.apprFileForm = res.data-->
<!--            //         this.readonly = true-->
<!--            //     } else {-->
<!--            //         if (id) {-->
<!--            //             // 编辑-->
<!--            //             // 通过ID获取数据，readonly=false-->
<!--            //             const res = await this.$axios.get("apprfiles/" + id)-->
<!--            //             if (res.status !== 200) {-->
<!--            //                 return this.$message.error("获取鉴定资料数据失败")-->
<!--            //             }-->
<!--            //             this.apprFileForm = res.data-->
<!--            //             this.readonly = false-->
<!--            //         }-->
<!--            //         // else {-->
<!--            //         //      await this.$nextTick(() => {-->
<!--            //         //         this.$refs.apprFileFormRef.resetFields()-->
<!--            //         //         console.log(this.apprFileForm)-->
<!--            //         //     })-->
<!--            //         // }-->
<!--            //-->
<!--            //     }-->
<!--            //-->
<!--            // },-->
<!--            async showApprFileDialog(operationType, row) {-->
<!--                if (operationType === "show") {-->
<!--                    // 查看-->
<!--                    this.readonly = true-->


<!--                    this.apprFileForm = row-->

<!--                    this.apprFileDialogVisible = true-->
<!--                } else if (operationType === "edit") {-->
<!--                    // 编辑-->

<!--                    this.readonly = false-->
<!--                    this.apprFileForm = row-->
<!--                    this.apprFileDialogVisible = true-->
<!--                } else {-->
<!--                    // 添加-->
<!--                    this.readonly = false-->
<!--                    this.apprFileDialogVisible = true-->
<!--                    this.$nextTick(() => {-->
<!--                        this.$refs.apprFileFormRef.resetFields()-->
<!--                        // this.apprFileForm = {-->
<!--                        //     id: null,-->
<!--                        //     basic_info: null,-->
<!--                        //     basic_info_sn: null,-->
<!--                        //     basic_info_name: null,-->
<!--                        //     name: null,-->
<!--                        //     quantity: null,-->
<!--                        //     receiver: null,-->
<!--                        //     receiver_name: null,-->
<!--                        //     received_date: null,-->
<!--                        // }-->
<!--                        // this.apprFileForm.id = null-->
<!--                        this.apprFileForm.basic_info = null-->
<!--                        // this.apprFileForm.basic_info_sn = null-->
<!--                        // this.apprFileForm.basic_info_name = null-->
<!--                        this.apprFileForm.name = null-->
<!--                        this.apprFileForm.quantity = null-->
<!--                        this.apprFileForm.receiver = null-->
<!--                        // this.apprFileForm.receiver_name = null-->
<!--                        this.apprFileForm.received_date = null-->
<!--                    })-->

<!--                }-->
<!--            },-->
<!--            apprFileDialogClosed() {-->
<!--                this.readonly = false-->
<!--                // this.$refs.apprFileFormRef.resetFields()-->
<!--                // Object.assign(this.apprFileForm, this.$options.data().form)-->

<!--            },-->


<!--            async deleteApprInfoById(id) {-->
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
<!--                const res = await this.$axios.delete("apprfiles/" + id + "/")-->
<!--                if (res.status !== 204) {-->
<!--                    return this.$message.error("删除失败")-->
<!--                }-->
<!--                this.$message.success("删除成功")-->
<!--                this.getApprFileList()-->
<!--            },-->
<!--            saveApprFile() {-->
<!--                this.$refs.apprFileFormRef.validate(async (valid) => {-->
<!--                    if (!valid) {-->
<!--                        this.$message.error("表单验证失败")-->
<!--                        return-->
<!--                    }-->

<!--                })-->
<!--            },-->
<!--            async editApprFile() {-->
<!--                this.$refs.editApprFileFormRef.validate(async (valid) => {-->
<!--                    if (!valid) {-->
<!--                        this.$message.error("表单验证失败")-->
<!--                        return-->
<!--                    }-->
<!--                    const res = await this.$axios.put("apprfiles/" + this.editApprFileForm.id + "/", this.editApprFileForm)-->
<!--                    if (res.status !== 200) {-->
<!--                        return this.$message.error("编辑鉴定材料失败")-->
<!--                    }-->
<!--                    this.$message.success("编辑鉴定材料成功")-->
<!--                    this.editApprFileDialogVisible = false-->
<!--                    this.getApprFileList()-->
<!--                    this.pics = []-->

<!--                })-->
<!--            },-->
<!--            // 展示鉴定材料详情的对话框-->
<!--            async showApprInfoDetailDialog(id) {-->
<!--                const res = await this.$axios.get("apprfiles/" + id)-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取鉴定材料失败")-->
<!--                }-->
<!--                this.showApprFileForm = res.data-->
<!--                this.getAllPics(id)-->
<!--                this.showApprFileDialogVisible = true-->
<!--            },-->
<!--            // 展示上传图片附件的对话框-->
<!--            async showUploadDialog(id) {-->
<!--                // 获取该行数据对应的已上传图片，然后写入fileList，实现展示功能-->
<!--                const res = await this.$axios.get("apprfileimgs/", {-->
<!--                    params: {-->
<!--                        id: id,-->
<!--                    }-->
<!--                })-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取已上传图片失败")-->
<!--                }-->
<!--                for (let img of res.data) {-->
<!--                    this.fileList.push({name: "", id: img.id, url: img.file})-->

<!--                }-->
<!--                this.uploadData['appraisal_file'] = id-->
<!--                this.uploadDialogVisible = true-->
<!--            },-->
<!--            async handleRemove(file, fileList) {-->
<!--                const res = await this.$axios.delete("apprfileimgs/" + file.id + "/")-->
<!--                if (res.status !== 204) {-->
<!--                    return this.$message.error("删除失败，请联系管理员")-->
<!--                }-->
<!--                this.$message.success("删除图片成功")-->
<!--            },-->
<!--            addApprFileClosed() {-->
<!--                this.$refs.addApprFileFormRef.resetFields()-->
<!--                this.addApprFileDialogVisible = false-->
<!--            },-->
<!--            handleSizeChange(size) {-->
<!--                this.queryInfo.size = size-->
<!--                this.getApprFileList()-->
<!--            },-->
<!--            handleCurrentChange(page) {-->
<!--                this.queryInfo.page = page-->
<!--                this.getApprFileList()-->
<!--            },-->
<!--            async getUserList() {-->
<!--                const {data: res} = await this.$axios.get("users")-->
<!--                this.userList = res-->
<!--            },-->
<!--            handlePictureCardPreview(file) {-->
<!--                this.dialogImageUrl = file.url-->
<!--                this.dialogVisible = true-->
<!--            },-->
<!--            setHeaders() {-->
<!--                this.myHeaders["authorization"] = "JWT " + window.localStorage.getItem("token")-->
<!--            },-->

<!--            UploadDialogClosed() {-->
<!--                this.uploadDialogVisible = false-->
<!--                this.fileList = []-->
<!--                this.getApprFileList()-->
<!--            },-->

<!--            // 获取一个appraisal_file对应的所有图片链接，用于在编辑或者查看详情页面展示图片附件。-->
<!--            async getAllPics(apprFileId) {-->
<!--                // 单个appraisal_file对应的所有图片-->
<!--                let ids = []-->
<!--                for (let i = 0; i < this.apprFileList.length; i++) {-->
<!--                    if (this.apprFileList[i].id === apprFileId) {-->
<!--                        ids = this.apprFileList[i].images-->
<!--                    }-->
<!--                }-->
<!--                for (let id of ids) {-->
<!--                    const {data: res} = await this.$axios.get("apprfileimgs/" + id)-->
<!--                    this.pics.push(res.file)-->
<!--                }-->
<!--            },-->
<!--            // FIXME: 考虑使用computed或者其他更好的办法获取UserID-->
<!--            getCurUserID() {-->
<!--                this.userID = parseInt(window.localStorage.getItem("id"))-->
<!--            },-->
<!--            // 借阅按钮的监听事件-->
<!--            async showBorrowDialog(id) {-->
<!--                const res = await this.$axios.get("apprfiles/" + id)-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取材料信息失败")-->
<!--                }-->
<!--                this.apprFileBorrowDialogVisible = true-->
<!--                await this.$nextTick(() => {-->
<!--                    this.$refs.apprFileBorrowFormRef.resetFields()-->
<!--                    console.log(this.borrowFileForm)-->
<!--                })-->
<!--                this.borrowFileForm.appraisal_file = id-->
<!--                this.borrowFileForm.appraisal_file_name = res.data.name-->
<!--            },-->
<!--            // 借阅材料对话框的关闭事件-->
<!--            borrowFileFormClosed() {-->
<!--                this.apprFileBorrowDialogVisible = false-->
<!--                // this.$refs.apprFileBorrowFormRef.resetFields()-->
<!--            },-->
<!--            // 借阅材料-->
<!--            async borrowFile() {-->
<!--                // 借阅人的ID为登录用户的ID-->
<!--                this.borrowFileForm.borrower = this.userID-->
<!--                const res = await this.$axios.post("apprfilerecs/", this.borrowFileForm)-->
<!--                if (res.status !== 201) {-->
<!--                    return this.$message.error("创建借阅记录失败")-->
<!--                }-->
<!--                this.$message.success("创建借阅记录成功")-->
<!--                this.apprFileBorrowDialogVisible = false-->
<!--                this.getApprFileList()-->
<!--            },-->
<!--            // 归还材料-->
<!--            async returnFile(id) {-->
<!--                const res = await this.$axios.get("apprfiles/" + id)-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取材料信息失败")-->
<!--                }-->
<!--                let record = res.data.last_record-->
<!--                // 2020-03-31T16:29:18.000Z-->
<!--                let now = getFormatDate()-->
<!--                let data = {-->
<!--                    "return_time": now,-->
<!--                    "is_returned": true-->
<!--                }-->
<!--                const putRes = await this.$axios.patch("apprfilerecs/" + record + "/", data)-->
<!--                if (putRes.status !== 200) {-->
<!--                    return this.$message.error("归还失败，请联系管理员")-->
<!--                }-->
<!--                this.$message.success("归还成功")-->
<!--                this.getApprFileList()-->
<!--            },-->
<!--            // resetFormDate() {-->
<!--            //     this.apprFileForm.basic_info = ""-->
<!--            //     this.apprFileForm.name = ""-->
<!--            //     this.apprFileForm.quantity = 0-->
<!--            //     this.apprFileForm.receiver = ""-->
<!--            //     this.apprFileForm.received_date = ""-->
<!--            // },-->
<!--        },-->

<!--        created() {-->
<!--            // TODO: 方法的调用时机，是否应该在使用的时候再调用-->
<!--            this.getBaseInfoList()-->
<!--            this.getUserList()-->
<!--            this.getApprFileList()-->
<!--            this.setHeaders()-->
<!--            this.getCurUserID()-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->