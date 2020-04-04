<!--<template>-->
<!--    <div>-->
<!--        &lt;!&ndash;面包屑&ndash;&gt;-->
<!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>项目管理</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>附加资料管理</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
<!--        &lt;!&ndash;  卡片区&ndash;&gt;-->
<!--        <el-card class="box-card">-->
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
<!--                    <el-button size="medium" type="primary" @click="showAddDialog">添加附加文件</el-button>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--            &lt;!&ndash; 附加文件列表 &ndash;&gt;-->
<!--            <el-table stripe-->
<!--                      :data="addiFileList"-->
<!--                      style="width: 100%">-->
<!--                &lt;!&ndash; 索引列 &ndash;&gt;-->
<!--                <el-table-column type="index" label="序号"></el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="basic_info_name"-->
<!--                        label="项目"-->
<!--                        min-width="200px">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="name"-->
<!--                        label="名称"-->
<!--                        min-width="200px">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="created_date"-->
<!--                        label="接收日期"-->
<!--                        min-width="100px">-->
<!--                </el-table-column>-->
<!--                &lt;!&ndash;<el-table-column&ndash;&gt;-->
<!--                &lt;!&ndash;        prop="comment"&ndash;&gt;-->
<!--                &lt;!&ndash;        label="备注说明">&ndash;&gt;-->
<!--                &lt;!&ndash;</el-table-column>&ndash;&gt;-->

<!--                &lt;!&ndash; 操作按钮列 &ndash;&gt;-->
<!--                <el-table-column label="操作" min-width="380px">-->
<!--                    <template v-slot="scope">-->
<!--                        &lt;!&ndash; 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 &ndash;&gt;-->
<!--                        <el-button size="mini"-->
<!--                                   type="primary"-->
<!--                                   @click="showDetailDialog(scope.row.id)"-->
<!--                                   icon="el-icon-edit">查看-->
<!--                        </el-button>-->
<!--                        <el-button size="mini"-->
<!--                                   type="primary"-->
<!--                                   @click="showUploadDialog(scope.row.id)"-->
<!--                                   icon="el-icon-edit">上传扫描件-->
<!--                        </el-button>-->
<!--                        <el-button size="mini"-->
<!--                                   type="primary"-->
<!--                                   @click="showEditDialog(scope.row.id)"-->
<!--                                   icon="el-icon-edit">编辑-->
<!--                        </el-button>-->
<!--                        <el-button size="mini"-->
<!--                                   type="danger"-->
<!--                                   @click="deleteAddiFile(scope.row.id)"-->
<!--                                   icon="el-icon-delete">删除-->
<!--                        </el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--            </el-table>-->
<!--        </el-card>-->
<!--        &lt;!&ndash; 添加资料的对话框 &ndash;&gt;-->
<!--        <el-dialog-->
<!--                title="添加附加资料"-->
<!--                :visible.sync="addDialogVisible"-->
<!--                @close="closeAddDialog"-->
<!--                width="30%">-->
<!--            <el-form ref="addFormRef"-->
<!--                     :rules="addiFileFormRules"-->
<!--                     :model="addiFileForm"-->
<!--                     label-width="80px">-->
<!--                <el-form-item label="所属项目" prop="basic_info">-->
<!--                    <el-select v-model="addiFileForm.basic_info">-->
<!--                        <el-option-->
<!--                                v-for="item in basicInfoList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="名称" prop="name">-->
<!--                    <el-input v-model="addiFileForm.name"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="接收日期" prop="created_date">-->
<!--                    <el-date-picker-->
<!--                            v-model="addiFileForm.created_date"-->
<!--                            align="right"-->
<!--                            type="date"-->
<!--                            placeholder="选择日期"-->
<!--                            :picker-options="pickerOptions">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
<!--            </el-form>-->


<!--            <span slot="footer" class="dialog-footer">-->
<!--            <el-button @click="addDialogVisible = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="addAddiFile">确 定</el-button>-->
<!--          </span>-->
<!--        </el-dialog>-->

<!--        &lt;!&ndash; 编辑资料的对话框 &ndash;&gt;-->
<!--        <el-dialog-->
<!--                title="添加附加资料"-->
<!--                :visible.sync="editDialogVisible"-->
<!--                @close="closeEditDialog"-->
<!--                width="30%">-->
<!--            <el-form ref="addFormRef"-->
<!--                     :rules="addiFileFormRules"-->
<!--                     :model="addiFileForm"-->
<!--                     label-width="80px">-->
<!--                <el-form-item label="所属项目" prop="basic_info">-->
<!--                    <el-select v-model="addiFileForm.basic_info">-->
<!--                        <el-option-->
<!--                                v-for="item in basicInfoList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="名称" prop="name">-->
<!--                    <el-input v-model="addiFileForm.name"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="接收日期" prop="created_date">-->
<!--                    <el-date-picker-->
<!--                            v-model="addiFileForm.created_date"-->
<!--                            align="right"-->
<!--                            type="date"-->
<!--                            placeholder="选择日期"-->
<!--                            :picker-options="pickerOptions">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
<!--            </el-form>-->


<!--            <span slot="footer" class="dialog-footer">-->
<!--            <el-button @click="editDialogVisible = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="">确 定</el-button>-->
<!--          </span>-->
<!--        </el-dialog>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "AddiFiles",-->
<!--        data() {-->
<!--            return {-->
<!--                queryInfo: {-->
<!--                    page: 1,-->
<!--                    size: 10,-->
<!--                    stage: 3,-->
<!--                    paginator: false,-->
<!--                },-->
<!--                searchForm: {-->
<!--                    user: "",-->
<!--                    region: ""-->
<!--                },-->
<!--                addiFileList: [],-->
<!--                basicInfoList: [],-->
<!--                addDialogVisible: false,-->
<!--                addiFileForm: {-->
<!--                    basic_info: "",-->
<!--                    name: "",-->
<!--                    created_date: "",-->
<!--                    comment: ""-->
<!--                },-->
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
<!--                addiFileFormRules: {-->
<!--                    basic_info: [-->
<!--                        {required: true, message: "请选择对应的项目", trigger: "change"},-->
<!--                    ],-->
<!--                    name: [-->
<!--                        {required: true, message: "请输入材料名称", trigger: "blur"},-->
<!--                    ],-->
<!--                    created_date: [-->
<!--                        {required: true, message: "请选择接收日期", trigger: "change"},-->
<!--                    ],-->
<!--                },-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            async getAddiFileList() {-->
<!--                const res = await this.$axios.get("addifiles/")-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取附加文件列表失败")-->
<!--                }-->
<!--                console.log(res)-->
<!--                this.addiFileList = res.data.results-->
<!--            },-->
<!--            async getBasicInfoList() {-->
<!--                const res = await this.$axios.get("basicinfos/", {-->
<!--                    params: this.queryInfo-->
<!--                })-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取项目列表失败")-->
<!--                }-->
<!--                this.basicInfoList = res.data-->
<!--            },-->

<!--            showAddDialog() {-->
<!--                this.addDialogVisible = true-->
<!--            },-->
<!--            closeAddDialog() {-->
<!--                this.$refs.addFormRef.resetFields()-->
<!--                this.addDialogVisible = false-->
<!--                this.getAddiFileList()-->
<!--            },-->
<!--            addAddiFile() {-->
<!--                this.$refs.addFormRef.validate(async (valid) => {-->
<!--                    if (!valid) {-->
<!--                        this.$message.error("表单验证失败")-->
<!--                        return-->
<!--                    }-->
<!--                    const res = await this.$axios.post("addifiles/", this.addiFileForm)-->
<!--                    if (res.status !== 201) {-->
<!--                        return this.$message.error("创建失败")-->
<!--                    }-->
<!--                    this.$message.success("创建成功")-->
<!--                    this.closeAddDialog()-->
<!--                })-->
<!--            },-->
<!--            async showEditDialog(id) {-->
<!--                const res = await this.$axios.get("addifiles/" + id + "/")-->
<!--                if (res.status !== 200){-->
<!--                    return this.$message.error("获取附加材料信息失败")-->
<!--                }-->
<!--                this.addiFileForm = res.data-->
<!--                this.editDialogVisible = true-->
<!--                console.log(this.addiFileForm)-->
<!--            },-->
<!--            closeEditDialog(){-->
<!--                this.editDialogVisible = false-->
<!--            },-->
<!--            showDetailDialog(id) {-->

<!--            },-->
<!--            showUploadDialog(id) {-->

<!--            },-->

<!--            deleteAddiFile(id) {-->

<!--            },-->
<!--        },-->
<!--        created() {-->
<!--            this.getAddiFileList()-->
<!--            this.getBasicInfoList()-->
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
                    <el-button size="medium" type="primary" @click="showAddiDialog()">添加附加文件</el-button>
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
                                   @click="showDetailDialog(scope.row.id)"
                                   icon="el-icon-edit">查看
                        </el-button>
                        <el-button size="mini"
                                   type="primary"
                                   @click="showUploadDialog(scope.row.id)"
                                   icon="el-icon-edit">上传扫描件
                        </el-button>
                        <el-button size="mini"
                                   type="primary"
                                   @click="showAddiDialog(scope.row.id)"
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
        <!-- 添加编辑资料的对话框 -->
        <el-dialog
                title="附加资料"
                :visible.sync="addiFileDialogVisible"
                @close="closeDialog"
                width="50%">
            <el-form ref="addiFormRef"
                     :rules="addiFileFormRules"
                     :model="addiFileForm"
                     label-width="80px">
                <el-form-item label="所属项目" prop="basic_info">
                    <el-select v-model="addiFileForm.basic_info" :disabled="readonly">
                        <el-option
                                v-for="item in basicInfoList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addiFileForm.name" :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="接收日期" prop="created_date">
                    <el-date-picker
                            :readonly="readonly"
                            v-model="addiFileForm.created_date"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注说明" prop="comment">
                    <el-input type="textarea" v-model="addiFileForm.comment" :readonly="readonly"></el-input>
                </el-form-item>
            </el-form>
            <!--  图片  -->
            <el-card v-if="readonly===true" class="box-card">
                <div slot="header" class="clearfix">
                    <span>扫描件</span>
                </div>
                <div class="demo-image__lazy">
                    <el-image v-for="url in pics" :key="url" :src="url" lazy></el-image>
                </div>
            </el-card>
            <span v-if="readonly===false" slot="footer" class="dialog-footer">
                <el-button @click="addiFileDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAddiFile">确 定</el-button>
            </span>
            <span v-else slot="footer" class="dialog-footer">
                <el-button @click="addiFileDialogVisible = false">关 闭</el-button>
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
                addiFileDialogVisible: false,
                previewDialogVisible: false,
                addiFileForm: {
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
                // console.log(res)
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
            async showAddiDialog(id) {
                this.addiFileDialogVisible = true
                if (id) {
                    // 修改请求类型，用于saveAddiFile方法
                    this.requestType = "put"
                    // 修改资料
                    const res = await this.$axios.get("addifiles/" + id + "/")
                    if (res.status !== 200) {
                        return this.$message.error("获取资料信息失败")
                    }
                    this.addiFileForm = res.data
                } else {
                    // 添加资料
                    this.requestType = "post"
                    this.addiFileDialogVisible = true
                }
            },
            closeDialog() {
                this.$refs.addiFormRef.resetFields()
                this.addiFileDialogVisible = false
                this.readonly = false
                this.getAddiFileList()
                // 清空pics，否则每打开一个详情，就会向数组中添加图片
                this.pics = []
            },
            saveAddiFile() {
                this.$refs.addiFormRef.validate(async (valid) => {
                    if (!valid) {
                        this.$message.error("表单验证失败")
                        return
                    }
                    if (this.requestType === "post") {      // 新增
                        // console.log(this.requestType)
                        const res = await this.$axios.post("addifiles/", this.addiFileForm)
                        if (res.status !== 201) {
                            return this.$message.error("创建失败")
                        }
                        this.$message.success("创建成功")
                    } else {        // 编辑
                        // console.log(this.requestType)
                        const res = await this.$axios.put("addifiles/" + this.addiFileForm.id + "/",
                            this.addiFileForm)
                        if (res.status !== 200) {
                            return this.$message.error("编辑失败")
                        }
                        this.$message.success("编辑成功")
                    }
                    this.closeDialog()
                })
            },
            async showDetailDialog(id) {
                const res = await this.$axios.get("addifiles/" + id)
                if (res.status !== 200) {
                    return this.$message.error("获取资料信息失败")
                }
                this.addiFileForm = res.data
                this.getAllPics(id)
                this.readonly = true
                this.addiFileDialogVisible = true
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