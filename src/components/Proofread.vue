<template>
    <div id="proofread">
        <!--        项目ID：{{this.$route.params.id}}-->
        <!--  卡片区-->
        <el-card class="box-card">
            <h1>项目信息校对</h1>
            <el-tabs type="border-card">
                <el-tab-pane label="基础信息">
                    <!-- 编辑项目的表单 -->
                    <el-form :model="basicInfo"
                             label-width="120px">
                        <!-- prop是验证规则 -->
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="项目编号：">
                                    <el-input v-model="basicInfo.sn" :readonly="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="16">
                                <el-form-item label="项目名称：">
                                    <el-input v-model="basicInfo.name" :readonly="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="委托方：">
                            <el-input v-model="basicInfo.principal" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="鉴定对象：">
                            <el-input v-model="basicInfo.target" :readonly="true"></el-input>
                        </el-form-item>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="委托时间：">
                                    <el-date-picker
                                        :readonly="true"
                                        v-model="basicInfo.trust_date"
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="受理时间：">
                                    <el-date-picker
                                        :readonly="true"
                                        v-model="basicInfo.created_date"
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="鉴定机构：" prop="org">
                            <el-input v-model="basicInfo.org_name" :readonly="true"></el-input>
                        </el-form-item>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="鉴定类别：" prop="type">
                                    <el-input v-model="basicInfo.type_name" :readonly="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="鉴定用途：" prop="purpose">
                                    <el-input v-model="basicInfo.purpose_name" :readonly="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="二次鉴定：">
                            <el-switch
                                disabled
                                v-model="basicInfo.is_re_appraisal"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="委托事项：">
                            <el-input type="textarea"
                                      :readonly="true"
                                      :autosize="{ minRows: 4, maxRows: 10}"
                                      v-model="basicInfo.trust_detail"></el-input>
                        </el-form-item>
                        <el-form-item label="立项审批人：">
                            <el-input v-model="basicInfo.reviewer_name" :readonly="true"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
            <el-button @click="detailDialogVisible = false">关 闭</el-button>

          </span>
                </el-tab-pane>
                <el-tab-pane label="鉴定材料">
                    <el-table
                        :data="apprFileList"
                        stripe
                        style="width: 100%">
                        <el-table-column type="index" label="序号" width="100"></el-table-column>
                        <el-table-column
                            prop="name"
                            label="名称"
                            min-width="500">
                        </el-table-column>
                        <el-table-column min-width="180px" label="操作">
                            <template v-slot="scope">
                                <!-- 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 -->
                                <el-button size="mini"
                                           type="primary"
                                           @click="showApprFileDialog(scope.row.id)"
                                           icon="el-icon-edit">查看
                                </el-button>
                                <el-button size="mini"
                                           type="warning"
                                           @click="showApprFileRecordDialog(scope.row.id)"
                                           icon="el-icon-edit">借阅记录
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="现场资料">
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
                            label="接收时间"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="comment"
                            label="备注说明"
                            width="300">
                        </el-table-column>
                        <!-- 操作按钮列 -->
                        <el-table-column label="操作" width="100px">
                            <template v-slot="scope">
                                <!-- 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 -->
                                <el-button size="mini"
                                           type="primary"
                                           @click="showLocFileDetailDialog(scope.row.id)"
                                           icon="el-icon-edit">查看
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="实验检材">
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
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="鉴定信息">
                    <el-form :model="apprInfoForm"
                             ref="detailFormRef"
                             label-width="100px">
                        <el-form-item label="项目：">
                            <el-input v-model="apprInfoForm.basic_info_name" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="鉴定人员：">
                            <!--<el-input v-model="detailForm.appraisal_team" :readonly="true"></el-input>-->
                            <el-transfer filterable
                                         v-model="apprInfoForm.appraisal_team"
                                         :data="transferUserList">
                            </el-transfer>
                        </el-form-item>
                        <el-form-item label="立卷人">
                            <el-input v-model="apprInfoForm.archivist_name" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="校对人">
                            <el-input v-model="apprInfoForm.proofreader_name" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="复核人">
                            <el-input v-model="apprInfoForm.reviewer_name" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="鉴定地址">
                            <el-input v-model="apprInfoForm.appraisal_address" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人" prop="contact">
                            <el-input v-model="apprInfoForm.contact" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="apprInfoForm.phone" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="基本案情">
                            <el-input type="textarea"
                                      :autosize="{ minRows: 4, maxRows: 10}"
                                      v-model="apprInfoForm.project_detail"
                                      :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="主要鉴定意见">
                            <el-input type="textarea"
                                      :autosize="{ minRows: 4, maxRows: 10}"
                                      v-model="apprInfoForm.opinion"
                                      :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="鉴定时间：">
                            <el-date-picker
                                v-model="apprInfoForm.appraisal_date"
                                :readonly="true"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="讨论时间：">
                            <el-date-picker
                                v-model="apprInfoForm.discuss_date"
                                :readonly="true"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <br>
        <!-- 校对表单 -->
        <el-card class="box-card">
            <el-form :model="proofreadForm"
                     :rules="proofreadRules"
                     ref="proofreadFormRef"
                     label-width="120px">
                <el-form-item label="校对意见" prop="opinion" required>
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="proofreadForm.opinion">
                    </el-input>
                </el-form-item>
                <el-form-item label="校对时间：" prop="created_date" required>
                    <el-date-picker
                        v-model="proofreadForm.created_date"
                        type="date"
                        placeholder="校对日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>

            <el-button type="warning" @click="saveProofread(7)" style="font-weight: bold">暂 存</el-button>
            <el-button type="danger" @click="saveProofread(5)" style="font-weight: bold">打 回</el-button>
            <el-button type="primary" @click="saveProofread(8)" style="font-weight: bold">通 过</el-button>
        </el-card>

        <!-- 查看材料详情的对话框  -->
        <el-dialog
            title="查看鉴定材料"
            :close-on-click-modal="false"
            @close="showApprFileClose"
            :visible.sync="showApprFileDialogVisible"
            width="60%">
            <el-form ref="showApprFileFormRef"
                     :model="showApprFileForm"
                     label-width="100px">
                <el-form-item label="所属项目" prop="basic_info">
                    <el-input :readonly="true" v-model="showApprFileForm.basic_info_name"></el-input>
                </el-form-item>
                <el-row :gutter="10">
                    <el-col :span="18">
                        <el-form-item label="材料名称" prop="name">
                            <el-input :readonly="true" v-model="showApprFileForm.name"></el-input>
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
                            <el-input :readonly="true" v-model="showApprFileForm.receiver_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="接收时间" prop="received_date">
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

        <!-- 借阅记录的对话框-->
        <el-dialog title="借阅记录"
                   width="80%"
                   :visible.sync="apprFileRecordDialogVisible">
            <el-table
                stripe
                :data="apprFileRecords"
                :default-sort="{prop: 'is_returned', order: 'ascending'}"
                style="width: 100%">
                <!-- 索引列 -->
                <el-table-column type="index" label="序号"></el-table-column>
                <!-- 数据列 -->
                <el-table-column
                    prop="appr_file_name"
                    sortable
                    label="材料名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="borrower_name"
                    sortable
                    label="借阅人"
                    width="180">
                </el-table-column>
                <!-- FIXME: 时间戳的格式有问题，需要处理 -->
                <el-table-column
                    prop="borrowing_time"
                    label="借阅时间">
                </el-table-column>
                <el-table-column
                    prop="is_returned"
                    :formatter="formatBoolean"
                    sortable
                    label="是否归还">
                    <template v-slot="scope">
                        <el-tag effect="dark" v-if="scope.row.is_returned" type="success">已归还</el-tag>
                        <el-tag effect="dark" v-else type="danger">未归还</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="return_time"
                    label="归还时间">
                </el-table-column>
            </el-table>
        </el-dialog>

        <!-- 现场资料详情的对话框 -->
        <el-dialog
            title="查看文件"
            @close="showFileDialogClosed"
            :visible.sync="showLocFileDialogVisible"
            width="60%">
            <el-form :model="showLocFileForm"
                     ref="showLocFileFormRef"
                     label-width="80px">
                <el-form-item label="所属项目" prop="basic_info">
                    <el-input v-model="showLocFileForm.basic_info_name" readonly></el-input>
                </el-form-item>
                <el-form-item label="文件名称" prop="name">
                    <el-input v-model="showLocFileForm.name" readonly></el-input>
                </el-form-item>
                <el-form-item label="接收日期" prop="created_date">
                    <el-input v-model="showLocFileForm.created_date" readonly></el-input>
                </el-form-item>
                <el-form-item label="备注说明" prop="comment">
                    <el-input type="textarea" v-model="showLocFileForm.comment" readonly></el-input>
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
                <el-button type="primary" @click="showLocFileDialogVisible=false">关 闭</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
export default {
    name: "Proofread",
    data() {
        return {
            basicInfo: {},
            apprFileList: [],
            apprInfoForm: {},
            transferUserList: [],
            total: "",
            proofreadForm: {},
            showApprFileForm: {},
            pics: [],
            showApprFileDialogVisible: false,
            apprFileRecords: [],
            apprFileRecordDialogVisible: false,
            localeFileList: [],
            showLocFileDialogVisible: false,
            showLocFileForm: {},
            apprSampleList: [],


            proofreadRules: {
                opinion: [
                    {required: false, message: "请输入校对意见", trigger: "blur"},
                ],
                name: [
                    {required: true, message: "请选择校对日期", trigger: "blur"},
                ],
            }
        }
    },
    methods: {
        async getBasicInfo(id) {
            const res = await this.$axios.get("basicinfos/" + id)
            if (res.status !== 200) {
                return this.$message.error("获取项目列表失败")
            }
            this.basicInfo = res.data
        },

        async getApprFileList(id) {
            const res = await this.$axios.get("apprfiles?basic_info=" + id)
            if (res.status !== 200) {
                return this.$message.error("获取鉴定材料列表失败")
            }
            this.apprFileList = res.data.results
        },

        async showApprFileDialog(id) {
            const res = await this.$axios.get("apprfiles/" + id)
            if (res.status !== 200) {
                return this.$message.error("获取鉴定材料失败")
            }
            this.showApprFileForm = res.data
            // 这里添加了await，不知道有没有影响
            await this.getApprFilePics(id)
            this.showApprFileDialogVisible = true
        },
        async showApprFileRecordDialog(id) {
            const res = await this.$axios.get("apprfilerecs")
            this.apprFileRecords = res.data.results
            this.apprFileRecordDialogVisible = true

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

        async getApprFilePics(apprFileId) {
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
        showApprFileClose() {
            this.$refs.showApprFileFormRef.resetFields()
            this.showApprFileDialogVisible = false
            this.pics = []
        },
        async getLocaleFileList(id) {
            const res = await this.$axios.get("localfiles/?id=" + id)
            if (res.status !== 200) {
                return this.$message.error("获取文件列表失败")
            }
            this.localeFileList = res.data.results
        },

        // 获取一个locale_file对应的所有图片链接，用于在编辑或者查看详情页面展示图片附件。
        async getLocFilePics(locFileID) {
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
        async getApprSampleList(id) {
            const res = await this.$axios.get("apprsamps/?id=" + id)
            if (res.status !== 200) {
                return this.$message.error("获取检材列表失败")
            }
            this.apprSampleList = res.data.results
        },
        async getApprInfo(id) {
            const res = await this.$axios.get("apprinfos/?id=" + id)
            if (res.status !== 200) {
                return this.$message.error("获取鉴定信息失败")
            }

            this.apprInfoForm = res.data[0]
        },

        async showLocFileDetailDialog(id) {
            const res = await this.$axios.get("localfiles/" + id)
            if (res.status !== 200) {
                return this.$message.error("获取文件详情失败")
            }
            this.showLocFileForm = res.data
            await this.getLocFilePics(id)
            this.showLocFileDialogVisible = true
        },
        showFileDialogClosed() {
            this.showLocFileDialogVisible = false
            this.$refs.showLocFileFormRef.resetFields()
            this.pics = []
        },
        async getUserList() {
            const {data: res} = await this.$axios.get("users")
            this.userList = res
            for (let i = 0; i < res.length; i++) {
                let user = {}
                user["key"] = res[i].id
                user["label"] = res[i].name
                this.transferUserList.push(user)
            }
        },

        // 校对
        async saveProofread(stage) {
            this.$refs.proofreadFormRef.validate(async (valid) => {
                if (!valid) {
                    this.$message.error("表单验证失败")
                    return
                } else {
                    // 变更basicInfo的stage状态
                    const projRes = await this.$axios.patch("basicinfos/" + this.$route.params.id + "/",
                        {
                            "stage": stage
                        })
                    if (projRes.status !== 200) {
                        this.$message.error(projRes.data.msg)
                    } else {    // 成功
                        if (stage === 7) {
                            this.proofreadForm.status = 0
                        } else if (stage === 5) {
                            this.proofreadForm.status = 2
                        } else {
                            this.proofreadForm.status = 1
                        }
                        this.proofreadForm.basicInfo = this.$route.params.id
                        this.proofreadForm.reviewer = window.localStorage.getItem("id")
                        this.proofreadForm.type = "p"
                        // 向checkRecord表中写入数据
                        const res = await this.$axios.post("checkrecords/", this.proofreadForm)
                        if (res.status !== 201) {
                            this.$message.error(res.data.msg)
                        } else {
                            this.$message.success("添加审批记录成功")
                        }

                        await this.$router.push("/basicinfos")
                    }
                }
            })
        },

        // 获取暂存的信息
        async getCheckRecord(basicInfoID) {
            const res = await this.$axios.get("checkrecords/?id=" + basicInfoID)
            console.log(res.data.results[0]);
            if (res.data.results.length !== 0) {
                if (res.data.results[0].status === 0) {
                    this.proofreadForm = res.data.results[0]
                }
            } else {
                console.log("没有数据")
            }
        }
    },
    created() {
        this.getBasicInfo(this.$route.params.id)
        this.getApprFileList(this.$route.params.id)
        this.getLocaleFileList(this.$route.params.id)
        this.getApprSampleList(this.$route.params.id)
        this.getApprInfo(this.$route.params.id)
        this.getUserList()
        this.getCheckRecord(this.$route.params.id)
    }
}
</script>

<style scoped>

</style>