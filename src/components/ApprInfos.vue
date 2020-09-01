<!--<template>-->
<!--    <div>-->
<!--        &lt;!&ndash;面包屑&ndash;&gt;-->
<!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>项目管理</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>鉴定信息</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
<!--        &lt;!&ndash;  卡片区&ndash;&gt;-->
<!--        <el-card class="box-card">-->
<!--            &lt;!&ndash; 添加按钮 &ndash;&gt;-->
<!--            <el-row>-->
<!--                <el-col>-->
<!--                    <el-button type="primary" @click="showAddApprInfoDialog">添加鉴定信息</el-button>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--            &lt;!&ndash; 项目列表 &ndash;&gt;-->
<!--            <el-table stripe-->
<!--                      @expand-change="expandHandler"-->
<!--                      :data="apprInfoList"-->
<!--                      style="width: 100%">-->
<!--                <el-table-column type="expand">-->
<!--                    <template slot-scope="props">-->
<!--                        <el-form label-position="left" inline class="demo-table-expand">-->
<!--                            <el-form-item label="项目编号：">-->
<!--                                <span>{{ props.row.basic_info_sn }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="项目名称：">-->
<!--                                <span>{{ props.row.basic_info_name }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="鉴定人员：">-->
<!--                                &lt;!&ndash;<span>&ndash;&gt;-->
<!--                                &lt;!&ndash;    <template v-for="id in props.row.appraisal_team">&ndash;&gt;-->
<!--                                &lt;!&ndash;        {{getUserName(id)}}&ndash;&gt;-->
<!--                                &lt;!&ndash;        &lt;!&ndash;{{person.name}}&ndash;&gt;&ndash;&gt;-->
<!--                                &lt;!&ndash;    </template>&ndash;&gt;-->
<!--                                &lt;!&ndash;</span>&ndash;&gt;-->
<!--                                &lt;!&ndash; FIXME: 这里有BUG，这个数组需要请求后端获得人员的姓名。 &ndash;&gt;-->
<!--                                <span>{{ props.row.appraisal_team }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="复核人：">-->
<!--                                <span>{{ props.row.reviewer_name }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="立卷人：">-->
<!--                                <span>{{ props.row.archivist_name }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="鉴定地址：">-->
<!--                                <span>{{ props.row.appraisal_address }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="联系人：">-->
<!--                                <span>{{ props.row.contact }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="联系电话：">-->
<!--                                <span>{{ props.row.phone }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="鉴定时间：">-->
<!--                                <span>{{ props.row.appraisal_date }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="讨论时间：">-->
<!--                                <span>{{ props.row.discuss_date }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="基本案情：" class="full-width">-->
<!--                                <span>{{ props.row.project_detail }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="主要鉴定意见：" class="full-width">-->
<!--                                <span>{{ props.row.opinion }}</span>-->
<!--                            </el-form-item>-->
<!--                        </el-form>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                &lt;!&ndash; 索引列 &ndash;&gt;-->
<!--                <el-table-column type="index" label="序号"></el-table-column>-->
<!--                &lt;!&ndash; 数据列 &ndash;&gt;-->
<!--                <el-table-column-->
<!--                        prop="basic_info_sn"-->
<!--                        label="项目编号"-->
<!--                        width="180">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="basic_info_name"-->
<!--                        label="项目名称">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="contact"-->
<!--                        label="联系人">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="phone"-->
<!--                        label="联系电话">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="appraisal_date"-->
<!--                        label="鉴定日期">-->
<!--                </el-table-column>-->
<!--                <el-table-column label="操作" width="180px">-->
<!--                    <template v-slot="scope">-->
<!--                        &lt;!&ndash; 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 &ndash;&gt;-->
<!--                        <el-button size="mini"-->
<!--                                   type="primary"-->
<!--                                   @click="showEditApprInfoDialog(scope.row.id)"-->
<!--                                   icon="el-icon-edit">编辑-->
<!--                        </el-button>-->
<!--                        <el-button size="mini"-->
<!--                                   type="danger"-->
<!--                                   @click="deleteApprInfoById(scope.row)"-->
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

<!--        &lt;!&ndash; 添加项目的对话框 &ndash;&gt;-->
<!--        <el-dialog-->
<!--                title="添加鉴定信息"-->
<!--                :close-on-click-modal="false"-->
<!--                :visible.sync="addApprInfoDialogVisible"-->
<!--                @close="addApprInfoDialogClosed"-->
<!--                width="80%">-->
<!--            &lt;!&ndash; 添加项目的表单 &ndash;&gt;-->
<!--            <el-form :model="addApprInfoForm"-->
<!--                     :rules="addApprInfoFormRules"-->
<!--                     ref="addApprInfoFormRef"-->
<!--                     label-width="100px">-->
<!--                &lt;!&ndash; prop是验证规则 &ndash;&gt;-->
<!--                <el-form-item label="项目：" prop="basic_info">-->
<!--                    <el-select v-model="addApprInfoForm.basic_info" placeholder="请选择">-->
<!--                        <el-option-->
<!--                                v-for="item in projectList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                &lt;!&ndash; TODO: el-form-item的样式和transfer有冲突&ndash;&gt;-->
<!--                <el-form-item label="鉴定人员：" prop="appraisal_team">-->
<!--                    <el-transfer-->
<!--                            filterable-->
<!--                            filter-placeholder="请输入姓名"-->
<!--                            v-model="addApprInfoForm.appraisal_team"-->
<!--                            :data="transferUserList">-->
<!--                    </el-transfer>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="复核人" prop="reviewer">-->
<!--                    <el-select v-model="addApprInfoForm.reviewer" placeholder="请选择">-->
<!--                        <el-option-->
<!--                                v-for="item in userList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="立卷人" prop="archivist">-->
<!--                    <el-select v-model="addApprInfoForm.archivist" placeholder="请选择">-->
<!--                        <el-option-->
<!--                                v-for="item in userList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="鉴定地址" prop="appraisal_address">-->
<!--                    <el-input v-model="addApprInfoForm.appraisal_address" placeholder="请输入地址"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="联系人" prop="contact">-->
<!--                    <el-input v-model="addApprInfoForm.contact" placeholder="请输入联系人姓名"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="联系电话" prop="phone">-->
<!--                    <el-input v-model="addApprInfoForm.phone" placeholder="请输入联系人电话"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="基本案情" prop="project_detail">-->
<!--                    <el-input type="textarea"-->
<!--                              :autosize="{ minRows: 4, maxRows: 10}"-->
<!--                              v-model="addApprInfoForm.project_detail"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="主要鉴定意见" prop="opinion">-->
<!--                    <el-input type="textarea"-->
<!--                              :autosize="{ minRows: 4, maxRows: 10}"-->
<!--                              v-model="addApprInfoForm.opinion"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="鉴定时间：" prop="appraisal_date">-->
<!--                    <el-date-picker-->
<!--                            v-model="addApprInfoForm.appraisal_date"-->
<!--                            type="date"-->
<!--                            placeholder="选择日期"-->
<!--                            format="yyyy 年 MM 月 dd 日"-->
<!--                            value-format="yyyy-MM-dd">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="讨论时间：" prop="discuss_date">-->
<!--                    <el-date-picker-->
<!--                            v-model="addApprInfoForm.discuss_date"-->
<!--                            type="date"-->
<!--                            placeholder="选择日期"-->
<!--                            format="yyyy 年 MM 月 dd 日"-->
<!--                            value-format="yyyy-MM-dd">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--            <el-button @click="addApprInfoDialogVisible = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="saveApprInfo">确 定</el-button>-->
<!--          </span>-->
<!--        </el-dialog>-->

<!--        &lt;!&ndash; 编辑项目的对话框 &ndash;&gt;-->
<!--        <el-dialog-->
<!--                title="编辑鉴定信息"-->
<!--                :close-on-click-modal="false"-->
<!--                :visible.sync="editApprInfoDialogVisible"-->
<!--                @close="editApprInfoDialogClosed"-->
<!--                width="80%">-->
<!--            <el-form :model="editApprInfoForm"-->
<!--                     :rules="addApprInfoFormRules"-->
<!--                     ref="editApprInfoFormRef"-->
<!--                     label-width="100px">-->
<!--                &lt;!&ndash; prop是验证规则 &ndash;&gt;-->
<!--                <el-form-item label="项目：" prop="basic_info">-->
<!--                    <el-select v-model="editApprInfoForm.basic_info" placeholder="请选择">-->
<!--                        <el-option-->
<!--                                v-for="item in projectList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                &lt;!&ndash; TODO: el-form-item的样式和transfer有冲突&ndash;&gt;-->
<!--                <el-form-item label="鉴定人员：" prop="appraisal_team">-->
<!--                    <el-transfer-->
<!--                            filterable-->
<!--                            filter-placeholder="请输入姓名"-->
<!--                            v-model="editApprInfoForm.appraisal_team"-->
<!--                            :data="transferUserList">-->
<!--                    </el-transfer>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="复核人" prop="reviewer">-->
<!--                    <el-select v-model="editApprInfoForm.reviewer" placeholder="请选择">-->
<!--                        <el-option-->
<!--                                v-for="item in userList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="立卷人" prop="archivist">-->
<!--                    <el-select v-model="editApprInfoForm.archivist" placeholder="请选择">-->
<!--                        <el-option-->
<!--                                v-for="item in userList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="鉴定地址" prop="appraisal_address">-->
<!--                    <el-input v-model="editApprInfoForm.appraisal_address" placeholder="请输入地址"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="联系人" prop="contact">-->
<!--                    <el-input v-model="editApprInfoForm.contact" placeholder="请输入联系人姓名"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="联系电话" prop="phone">-->
<!--                    <el-input v-model="editApprInfoForm.phone" placeholder="请输入联系人电话"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="基本案情" prop="project_detail">-->
<!--                    <el-input type="textarea"-->
<!--                              :autosize="{ minRows: 4, maxRows: 10}"-->
<!--                              v-model="editApprInfoForm.project_detail"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="主要鉴定意见" prop="opinion">-->
<!--                    <el-input type="textarea"-->
<!--                              :autosize="{ minRows: 4, maxRows: 10}"-->
<!--                              v-model="editApprInfoForm.opinion"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="鉴定时间：" prop="appraisal_date">-->
<!--                    <el-date-picker-->
<!--                            v-model="editApprInfoForm.appraisal_date"-->
<!--                            type="date"-->
<!--                            placeholder="选择日期"-->
<!--                            format="yyyy 年 MM 月 dd 日"-->
<!--                            value-format="yyyy-MM-dd">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="讨论时间：" prop="discuss_date">-->
<!--                    <el-date-picker-->
<!--                            v-model="editApprInfoForm.discuss_date"-->
<!--                            type="date"-->
<!--                            placeholder="选择日期"-->
<!--                            format="yyyy 年 MM 月 dd 日"-->
<!--                            value-format="yyyy-MM-dd">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--            <el-button @click="editApprInfoDialogVisible = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="editApprInfo">确 定</el-button>-->
<!--          </span>-->
<!--        </el-dialog>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "ApprInfos",-->
<!--        data() {-->
<!--            // 校验手机号-->
<!--            let checkMobile = (rule, value, callback) => {-->
<!--                // 匹配手机号的正则表达式-->
<!--                const regMobile = /^(0086|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/-->
<!--                if (regMobile.test(value)) {-->
<!--                    return callback()-->
<!--                }-->
<!--                return callback(new Error("请输入正确的手机号码"))-->
<!--            }-->
<!--            return {-->
<!--                // get查询的分页参数-->
<!--                queryInfo: {-->
<!--                    page: 1,-->
<!--                    size: 10,-->
<!--                    stage: 1,-->
<!--                    paginator: false,-->

<!--                },-->
<!--                total: 0,-->
<!--                apprInfoList: [],-->
<!--                addApprInfoDialogVisible: false,-->
<!--                editApprInfoDialogVisible: false,-->
<!--                apprTeamList: [],-->
<!--                basicInfoIds: [],-->
<!--                addApprInfoForm: {-->
<!--                    basic_info: "",-->
<!--                    appraisal_team: [],-->
<!--                    reviewer: "2",-->
<!--                    archivist: "4",-->
<!--                    appraisal_address: "dsfsfa",-->
<!--                    contact: "fdsfasaf",-->
<!--                    phone: "13333333333",-->
<!--                    appraisal_date: "2011-11-1",-->
<!--                    discuss_date: "2011-11-2",-->
<!--                    project_detail: "fdsfsdfsfsadf",-->
<!--                    opinion: "fdsfsdafsadfs",-->
<!--                },-->
<!--                editApprInfoForm: {-->
<!--                    basic_info: "",-->
<!--                    appraisal_team: [],-->
<!--                    reviewer: "",-->
<!--                    archivist: "",-->
<!--                    appraisal_address: "",-->
<!--                    contact: "",-->
<!--                    phone: "",-->
<!--                    appraisal_date: "",-->
<!--                    discuss_date: "2",-->
<!--                    project_detail: "",-->
<!--                    opinion: "",-->
<!--                },-->
<!--                addApprInfoFormRules: {-->
<!--                    basic_info: [-->
<!--                        {required: true, message: "请选择对应的项目", trigger: "change"},-->
<!--                    ],-->
<!--                    // FIXME: 这个验证规则对transfer无效，稍后解决-->
<!--                    appraisal_team: [-->
<!--                        {required: true, message: "请选择鉴定人员", trigger: "change"},-->
<!--                    ],-->
<!--                    appraisal_address: [-->
<!--                        {required: true, message: "请输入地址", trigger: "blur"},-->
<!--                    ],-->
<!--                    contact: [-->
<!--                        {required: true, message: "请输入联系人姓名", trigger: "blur"},-->
<!--                    ],-->
<!--                    phone: [-->
<!--                        {required: true, message: "请输入手机号码", trigger: "blur"},-->
<!--                        // {min: 11, max: 18, message: "手机号码的长度在11-18位之间", trigger: "blur"},-->
<!--                        {validator: checkMobile, trigger: "blur"},-->
<!--                    ],-->
<!--                    project_detail: [-->
<!--                        {required: true, message: "请输入基本案情", trigger: "blur"},-->
<!--                    ],-->
<!--                    opinion: [-->
<!--                        {required: true, message: "请输入鉴定意见", trigger: "blur"},-->
<!--                    ],-->
<!--                    reviewer: [-->
<!--                        {required: true, message: "请选择复核人", trigger: "blur"},-->
<!--                    ],-->
<!--                    archivist: [-->
<!--                        {required: true, message: "请选择立卷人", trigger: "blur"},-->

<!--                    ],-->
<!--                    appraisal_date: [-->
<!--                        {required: true, message: "请选择日期", trigger: "blur"},-->
<!--                    ],-->
<!--                    discuss_date: [-->
<!--                        {required: true, message: "请选择日期", trigger: "blur"},-->

<!--                    ]-->
<!--                },-->
<!--                projectList: [],-->
<!--                transferUserList: [],-->
<!--                userList: [],-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            async getApprInfoList() {-->
<!--                const {data: res} = await this.$axios.get("apprinfos",-->
<!--                    {-->
<!--                        params: this.queryInfo-->
<!--                    }-->
<!--                )-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取鉴定信息列表失败，请刷新页面重试")-->
<!--                }-->
<!--                this.apprInfoList = res.data-->
<!--                this.total = res.count-->
<!--            },-->
<!--            showAddApprInfoDialog() {-->
<!--                // this.getProjectList();-->
<!--                this.addApprInfoDialogVisible = true-->
<!--            },-->
<!--            // 编辑按钮的点击事件，打开修改鉴定信息的对话框，并带入数据。-->
<!--            async showEditApprInfoDialog(id) {-->
<!--                const {data: res} = await this.$axios.get("apprinfos/" + id)-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取鉴定信息详情失败")-->
<!--                }-->
<!--                // console.log(this.editApprInfoForm)-->
<!--                this.editApprInfoForm = res.data-->
<!--                this.editApprInfoDialogVisible = true-->
<!--            },-->
<!--            async deleteApprInfoById(row) {-->
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
<!--                const res = await this.$axios.delete("apprinfos/" + row.id)-->
<!--                console.log(res.status)-->
<!--                if (res.status !== 200) {-->
<!--                    this.$message.error("删除失败")-->
<!--                }-->
<!--                // 重置basic_info的stage-->
<!--                const projRes = await this.$axios.patch("basicinfos/" + row.basic_info + "/",-->
<!--                    {-->
<!--                        "stage": 1-->
<!--                    }-->
<!--                )-->
<!--                console.log(projRes.status)-->
<!--                if (projRes.status !== 200) {-->
<!--                    this.$message.error("重置状态失败")-->
<!--                }-->

<!--                this.getApprInfoList()-->
<!--            },-->
<!--            // 当row展开时，获取鉴定组成员的名单-->
<!--            // FIXME: 这里有bug，多个expand,共享了一个list，打开两个的话，后面打开的expand会把前面的打开的覆盖掉。-->
<!--            // 这么写也不好，请求有延迟，最好还是在页面加载的时候，一次全部请求过来。-->
<!--            async expandHandler(row) {-->
<!--                // FIXME: 这里缺少展开后获取该行appraisal_team等数据的功能。-->
<!--                // let list = []-->
<!--                // for (let i = 0; i < row.appraisal_team.length; i++) {-->
<!--                //     const res = await this.$axios.get("users/" + row.appraisal_team[i])-->
<!--                //     list.push(res.data.name)-->
<!--                // }-->
<!--                // console.log(list)-->
<!--                // this.apprTeamList = list.join(" | ")-->
<!--            },-->
<!--            // 分页器size变化的监听事件-->
<!--            handleSizeChange(size) {-->
<!--                this.queryInfo.size = size-->
<!--                this.getApprInfoList()-->
<!--            },-->
<!--            // 分页器page变化的监听事件-->
<!--            handleCurrentChange(page) {-->
<!--                this.queryInfo.page = page-->
<!--                this.getApprInfoList()-->
<!--            },-->
<!--            addApprInfoDialogClosed() {-->
<!--                this.$refs.addApprInfoFormRef.resetFields()-->
<!--            },-->
<!--            editApprInfoDialogClosed() {-->
<!--                this.$refs.editApprInfoFormRef.resetFields()-->
<!--            },-->
<!--            async getProjectList() {-->
<!--                this.queryInfo.paginator = false-->
<!--                const res = await this.$axios.get("basicinfos/", {-->
<!--                    params: this.queryInfo-->
<!--                })-->
<!--                console.log(res)-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取项目列表失败")-->
<!--                }-->
<!--                this.projectList = res.data-->
<!--            },-->
<!--            async getUserList() {-->
<!--                const {data: res} = await this.$axios.get("users")-->
<!--                this.userList = res-->
<!--                for (let i = 0; i < res.length; i++) {-->
<!--                    let user = {}-->
<!--                    user["key"] = res[i].id-->
<!--                    user["label"] = res[i].name-->
<!--                    this.transferUserList.push(user)-->
<!--                }-->
<!--            },-->
<!--            saveApprInfo() {-->
<!--                this.$refs.addApprInfoFormRef.validate(async (valid) => {-->
<!--                    if (!valid) {-->
<!--                        this.$message.error("表单验证失败")-->
<!--                        return-->
<!--                    }-->
<!--                    const {data: res} = await this.$axios.post("apprinfos/", this.addApprInfoForm)-->
<!--                    if (res.status !== 201) {-->
<!--                        return this.$message.error("创建鉴定信息失败")-->
<!--                    }-->
<!--                    const projRes = await this.$axios.patch("basicinfos/" + this.addApprInfoForm.basic_info + "/",-->
<!--                        {-->
<!--                            "stage": 2-->
<!--                        }-->
<!--                    )-->
<!--                    if (projRes.status !== 200) {-->
<!--                        this.$message.error("重置状态失败")-->
<!--                    }-->
<!--                    this.addApprInfoDialogVisible = false-->
<!--                    this.getApprInfoList()-->
<!--                    this.getProjectList()-->
<!--                    this.$message.success("添加鉴定信息成功")-->
<!--                })-->
<!--            },-->
<!--            editApprInfo() {-->
<!--                this.$refs.editApprInfoFormRef.validate(async (valid) => {-->
<!--                    if (!valid) {-->
<!--                        this.$message.error("表单验证失败")-->
<!--                        return-->
<!--                    }-->
<!--                    const {data: res} = await this.$axios.put("apprinfos/" + this.editApprInfoForm.id + "/", this.editApprInfoForm)-->
<!--                    if (res.status !== 200) {-->
<!--                        return this.$message.error("创建鉴定信息失败")-->
<!--                    }-->
<!--                    this.editApprInfoDialogVisible = false-->
<!--                    this.getApprInfoList()-->
<!--                    this.getProjectList()-->
<!--                    this.$message.success("添加鉴定信息成功")-->
<!--                })-->
<!--            },-->
<!--            async getUserName(ids) {-->
<!--                for (let i = 0; i < ids.length; i++) {-->
<!--                    const res = await this.$axios.get("users/" + ids[i])-->
<!--                    this.apprTeamList.push(res.data.name)-->
<!--                }-->
<!--            }-->
<!--        },-->
<!--        created() {-->
<!--            this.getApprInfoList()-->
<!--            this.getProjectList()-->
<!--            this.getUserList()-->
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

<!--    .demo-table-expand .full-width {-->
<!--        width: 100%;-->
<!--    }-->
<!--</style>-->


<!--<template>-->
<!--    <div>-->
<!--        &lt;!&ndash;面包屑&ndash;&gt;-->
<!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>项目管理</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>鉴定信息</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
<!--        &lt;!&ndash;  卡片区&ndash;&gt;-->
<!--        <el-card class="box-card">-->
<!--            &lt;!&ndash; 添加按钮 &ndash;&gt;-->
<!--            <el-row>-->
<!--                <el-col>-->
<!--                    <el-button type="primary" @click="showAddApprInfoDialog">添加鉴定信息</el-button>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--            &lt;!&ndash; 项目列表 &ndash;&gt;-->
<!--            <el-table stripe-->
<!--                      @expand-change="expandHandler"-->
<!--                      :data="apprInfoList"-->
<!--                      style="width: 100%">-->
<!--                <el-table-column type="expand">-->
<!--                    <template slot-scope="props">-->
<!--                        <el-form label-position="left" inline class="demo-table-expand">-->
<!--                            <el-form-item label="项目编号：">-->
<!--                                <span>{{ props.row.basic_info_sn }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="项目名称：">-->
<!--                                <span>{{ props.row.basic_info_name }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="鉴定人员：">-->
<!--                                &lt;!&ndash;<span>&ndash;&gt;-->
<!--                                &lt;!&ndash;    <template v-for="id in props.row.appraisal_team">&ndash;&gt;-->
<!--                                &lt;!&ndash;        {{getUserName(id)}}&ndash;&gt;-->
<!--                                &lt;!&ndash;        &lt;!&ndash;{{person.name}}&ndash;&gt;&ndash;&gt;-->
<!--                                &lt;!&ndash;    </template>&ndash;&gt;-->
<!--                                &lt;!&ndash;</span>&ndash;&gt;-->
<!--                                &lt;!&ndash; FIXME: 这里有BUG，这个数组需要请求后端获得人员的姓名。 &ndash;&gt;-->
<!--                                <span>{{ props.row.appraisal_team }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="复核人：">-->
<!--                                <span>{{ props.row.reviewer_name }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="立卷人：">-->
<!--                                <span>{{ props.row.archivist_name }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="鉴定地址：">-->
<!--                                <span>{{ props.row.appraisal_address }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="联系人：">-->
<!--                                <span>{{ props.row.contact }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="联系电话：">-->
<!--                                <span>{{ props.row.phone }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="鉴定时间：">-->
<!--                                <span>{{ props.row.appraisal_date }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="讨论时间：">-->
<!--                                <span>{{ props.row.discuss_date }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="基本案情：" class="full-width">-->
<!--                                <span>{{ props.row.project_detail }}</span>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="主要鉴定意见：" class="full-width">-->
<!--                                <span>{{ props.row.opinion }}</span>-->
<!--                            </el-form-item>-->
<!--                        </el-form>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                &lt;!&ndash; 索引列 &ndash;&gt;-->
<!--                <el-table-column type="index" label="序号"></el-table-column>-->
<!--                &lt;!&ndash; 数据列 &ndash;&gt;-->
<!--                <el-table-column-->
<!--                        prop="basic_info_sn"-->
<!--                        label="项目编号"-->
<!--                        width="180">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="basic_info_name"-->
<!--                        label="项目名称">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="contact"-->
<!--                        label="联系人">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="phone"-->
<!--                        label="联系电话">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                        prop="appraisal_date"-->
<!--                        label="鉴定日期">-->
<!--                </el-table-column>-->
<!--                <el-table-column label="操作" width="180px">-->
<!--                    <template v-slot="scope">-->
<!--                        &lt;!&ndash; 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 &ndash;&gt;-->
<!--                        <el-button size="mini"-->
<!--                                   type="primary"-->
<!--                                   @click="showEditApprInfoDialog(scope.row.id)"-->
<!--                                   icon="el-icon-edit">编辑-->
<!--                        </el-button>-->
<!--                        <el-button size="mini"-->
<!--                                   type="danger"-->
<!--                                   @click="deleteApprInfoById(scope.row)"-->
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

<!--        &lt;!&ndash; 添加项目的对话框 &ndash;&gt;-->
<!--        <el-dialog-->
<!--                title="添加鉴定信息"-->
<!--                :close-on-click-modal="false"-->
<!--                :visible.sync="addDialogVisible"-->
<!--                @close="addApprInfoDialogClosed"-->
<!--                width="80%">-->
<!--            &lt;!&ndash; 添加项目的表单 &ndash;&gt;-->
<!--            <el-form :model="addForm"-->
<!--                     :rules="addApprInfoFormRules"-->
<!--                     ref="addApprInfoFormRef"-->
<!--                     label-width="100px">-->
<!--                &lt;!&ndash; prop是验证规则 &ndash;&gt;-->
<!--                <el-form-item label="项目：" prop="basic_info">-->
<!--                    <el-select v-model="addForm.basic_info" placeholder="请选择">-->
<!--                        <el-option-->
<!--                                v-for="item in projectList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                &lt;!&ndash; TODO: el-form-item的样式和transfer有冲突&ndash;&gt;-->
<!--                <el-form-item label="鉴定人员：" prop="appraisal_team">-->
<!--                    <el-transfer-->
<!--                            filterable-->
<!--                            filter-placeholder="请输入姓名"-->
<!--                            v-model="addForm.appraisal_team"-->
<!--                            :data="transferUserList">-->
<!--                    </el-transfer>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="复核人" prop="reviewer">-->
<!--                    <el-select v-model="addForm.reviewer" placeholder="请选择">-->
<!--                        <el-option-->
<!--                                v-for="item in userList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="立卷人" prop="archivist">-->
<!--                    <el-select v-model="addForm.archivist" placeholder="请选择">-->
<!--                        <el-option-->
<!--                                v-for="item in userList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="鉴定地址" prop="appraisal_address">-->
<!--                    <el-input v-model="addForm.appraisal_address" placeholder="请输入地址"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="联系人" prop="contact">-->
<!--                    <el-input v-model="addForm.contact" placeholder="请输入联系人姓名"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="联系电话" prop="phone">-->
<!--                    <el-input v-model="addForm.phone" placeholder="请输入联系人电话"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="基本案情" prop="project_detail">-->
<!--                    <el-input type="textarea"-->
<!--                              :autosize="{ minRows: 4, maxRows: 10}"-->
<!--                              v-model="addForm.project_detail"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="主要鉴定意见" prop="opinion">-->
<!--                    <el-input type="textarea"-->
<!--                              :autosize="{ minRows: 4, maxRows: 10}"-->
<!--                              v-model="addForm.opinion"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="鉴定时间：" prop="appraisal_date">-->
<!--                    <el-date-picker-->
<!--                            v-model="addForm.appraisal_date"-->
<!--                            type="date"-->
<!--                            placeholder="选择日期"-->
<!--                            format="yyyy 年 MM 月 dd 日"-->
<!--                            value-format="yyyy-MM-dd">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="讨论时间：" prop="discuss_date">-->
<!--                    <el-date-picker-->
<!--                            v-model="addForm.discuss_date"-->
<!--                            type="date"-->
<!--                            placeholder="选择日期"-->
<!--                            format="yyyy 年 MM 月 dd 日"-->
<!--                            value-format="yyyy-MM-dd">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--            <el-button @click="addDialogVisible = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="saveApprInfo">确 定</el-button>-->
<!--          </span>-->
<!--        </el-dialog>-->

<!--        &lt;!&ndash; 编辑项目的对话框 &ndash;&gt;-->
<!--        <el-dialog-->
<!--                title="编辑鉴定信息"-->
<!--                :close-on-click-modal="false"-->
<!--                :visible.sync="editDialogVisible"-->
<!--                @close="editApprInfoDialogClosed"-->
<!--                width="80%">-->
<!--            <el-form :model="editForm"-->
<!--                     :rules="addApprInfoFormRules"-->
<!--                     ref="editApprInfoFormRef"-->
<!--                     label-width="100px">-->
<!--                &lt;!&ndash; prop是验证规则 &ndash;&gt;-->
<!--                <el-form-item label="项目：" prop="basic_info">-->
<!--                    <el-select v-model="editForm.basic_info" placeholder="请选择">-->
<!--                        <el-option-->
<!--                                v-for="item in projectList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                &lt;!&ndash; TODO: el-form-item的样式和transfer有冲突&ndash;&gt;-->
<!--                <el-form-item label="鉴定人员：" prop="appraisal_team">-->
<!--                    <el-transfer-->
<!--                            filterable-->
<!--                            filter-placeholder="请输入姓名"-->
<!--                            v-model="editForm.appraisal_team"-->
<!--                            :data="transferUserList">-->
<!--                    </el-transfer>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="复核人" prop="reviewer">-->
<!--                    <el-select v-model="editForm.reviewer" placeholder="请选择">-->
<!--                        <el-option-->
<!--                                v-for="item in userList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="立卷人" prop="archivist">-->
<!--                    <el-select v-model="editForm.archivist" placeholder="请选择">-->
<!--                        <el-option-->
<!--                                v-for="item in userList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="鉴定地址" prop="appraisal_address">-->
<!--                    <el-input v-model="editForm.appraisal_address" placeholder="请输入地址"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="联系人" prop="contact">-->
<!--                    <el-input v-model="editForm.contact" placeholder="请输入联系人姓名"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="联系电话" prop="phone">-->
<!--                    <el-input v-model="editForm.phone" placeholder="请输入联系人电话"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="基本案情" prop="project_detail">-->
<!--                    <el-input type="textarea"-->
<!--                              :autosize="{ minRows: 4, maxRows: 10}"-->
<!--                              v-model="editForm.project_detail"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="主要鉴定意见" prop="opinion">-->
<!--                    <el-input type="textarea"-->
<!--                              :autosize="{ minRows: 4, maxRows: 10}"-->
<!--                              v-model="editForm.opinion"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="鉴定时间：" prop="appraisal_date">-->
<!--                    <el-date-picker-->
<!--                            v-model="editForm.appraisal_date"-->
<!--                            type="date"-->
<!--                            placeholder="选择日期"-->
<!--                            format="yyyy 年 MM 月 dd 日"-->
<!--                            value-format="yyyy-MM-dd">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="讨论时间：" prop="discuss_date">-->
<!--                    <el-date-picker-->
<!--                            v-model="editForm.discuss_date"-->
<!--                            type="date"-->
<!--                            placeholder="选择日期"-->
<!--                            format="yyyy 年 MM 月 dd 日"-->
<!--                            value-format="yyyy-MM-dd">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--            <el-button @click="editDialogVisible = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="editApprInfo">确 定</el-button>-->
<!--          </span>-->
<!--        </el-dialog>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "ApprInfos",-->
<!--        data() {-->
<!--            // 校验手机号-->
<!--            let checkMobile = (rule, value, callback) => {-->
<!--                // 匹配手机号的正则表达式-->
<!--                const regMobile = /^(0086|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/-->
<!--                if (regMobile.test(value)) {-->
<!--                    return callback()-->
<!--                }-->
<!--                return callback(new Error("请输入正确的手机号码"))-->
<!--            }-->
<!--            return {-->
<!--                // get查询的分页参数-->
<!--                queryInfo: {-->
<!--                    page: 1,-->
<!--                    size: 10,-->
<!--                    stage: 1,-->
<!--                    paginator: false,-->
<!--                },-->
<!--                total: 0,-->
<!--                apprInfoList: [],-->
<!--                addDialogVisible: false,-->
<!--                editDialogVisible: false,-->
<!--                apprTeamList: [],-->
<!--                basicInfoIds: [],-->
<!--                addForm: {-->
<!--                    basic_info: "",-->
<!--                    appraisal_team: [],-->
<!--                    reviewer: "2",-->
<!--                    archivist: "4",-->
<!--                    appraisal_address: "dsfsfa",-->
<!--                    contact: "fdsfasaf",-->
<!--                    phone: "13333333333",-->
<!--                    appraisal_date: "2011-11-1",-->
<!--                    discuss_date: "2011-11-2",-->
<!--                    project_detail: "fdsfsdfsfsadf",-->
<!--                    opinion: "fdsfsdafsadfs",-->
<!--                },-->
<!--                editForm: {-->
<!--                    basic_info: "",-->
<!--                    appraisal_team: [],-->
<!--                    reviewer: "",-->
<!--                    archivist: "",-->
<!--                    appraisal_address: "",-->
<!--                    contact: "",-->
<!--                    phone: "",-->
<!--                    appraisal_date: "",-->
<!--                    discuss_date: "",-->
<!--                    project_detail: "",-->
<!--                    opinion: "",-->
<!--                },-->
<!--                addApprInfoFormRules: {-->
<!--                    basic_info: [-->
<!--                        {required: true, message: "请选择对应的项目", trigger: "change"},-->
<!--                    ],-->
<!--                    // FIXME: 这个验证规则对transfer无效，稍后解决-->
<!--                    appraisal_team: [-->
<!--                        {required: true, message: "请选择鉴定人员", trigger: "change"},-->
<!--                    ],-->
<!--                    appraisal_address: [-->
<!--                        {required: true, message: "请输入地址", trigger: "blur"},-->
<!--                    ],-->
<!--                    contact: [-->
<!--                        {required: true, message: "请输入联系人姓名", trigger: "blur"},-->
<!--                    ],-->
<!--                    phone: [-->
<!--                        {required: true, message: "请输入手机号码", trigger: "blur"},-->
<!--                        // {min: 11, max: 18, message: "手机号码的长度在11-18位之间", trigger: "blur"},-->
<!--                        {validator: checkMobile, trigger: "blur"},-->
<!--                    ],-->
<!--                    project_detail: [-->
<!--                        {required: true, message: "请输入基本案情", trigger: "blur"},-->
<!--                    ],-->
<!--                    opinion: [-->
<!--                        {required: true, message: "请输入鉴定意见", trigger: "blur"},-->
<!--                    ],-->
<!--                    reviewer: [-->
<!--                        {required: true, message: "请选择复核人", trigger: "blur"},-->
<!--                    ],-->
<!--                    archivist: [-->
<!--                        {required: true, message: "请选择立卷人", trigger: "blur"},-->

<!--                    ],-->
<!--                    appraisal_date: [-->
<!--                        {required: true, message: "请选择日期", trigger: "blur"},-->
<!--                    ],-->
<!--                    discuss_date: [-->
<!--                        {required: true, message: "请选择日期", trigger: "blur"},-->

<!--                    ]-->
<!--                },-->
<!--                projectList: [],-->
<!--                transferUserList: [],-->
<!--                userList: [],-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            async getApprInfoList() {-->
<!--                const {data: res} = await this.$axios.get("apprinfos",-->
<!--                    {-->
<!--                        params: this.queryInfo-->
<!--                    }-->
<!--                )-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取鉴定信息列表失败，请刷新页面重试")-->
<!--                }-->
<!--                this.apprInfoList = res.data-->
<!--                this.total = res.count-->
<!--            },-->
<!--            showAddApprInfoDialog() {-->
<!--                // this.getProjectList();-->
<!--                this.addDialogVisible = true-->
<!--            },-->
<!--            // 编辑按钮的点击事件，打开修改鉴定信息的对话框，并带入数据。-->
<!--            async showEditApprInfoDialog(id) {-->
<!--                const {data: res} = await this.$axios.get("apprinfos/" + id)-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取鉴定信息详情失败")-->
<!--                }-->
<!--                // console.log(this.editApprInfoForm)-->
<!--                this.editForm = res.data-->
<!--                this.editDialogVisible = true-->
<!--            },-->
<!--            async deleteApprInfoById(row) {-->
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
<!--                const res = await this.$axios.delete("apprinfos/" + row.id)-->
<!--                console.log(res.status)-->
<!--                if (res.status !== 200) {-->
<!--                    this.$message.error("删除失败")-->
<!--                }-->
<!--                // 重置basic_info的stage-->
<!--                const projRes = await this.$axios.patch("basicinfos/" + row.basic_info + "/",-->
<!--                    {-->
<!--                        "stage": 1-->
<!--                    }-->
<!--                )-->
<!--                console.log(projRes.status)-->
<!--                if (projRes.status !== 200) {-->
<!--                    this.$message.error("重置状态失败")-->
<!--                }-->

<!--                this.getApprInfoList()-->
<!--            },-->
<!--            // 当row展开时，获取鉴定组成员的名单-->
<!--            // FIXME: 这里有bug，多个expand,共享了一个list，打开两个的话，后面打开的expand会把前面的打开的覆盖掉。-->
<!--            // 这么写也不好，请求有延迟，最好还是在页面加载的时候，一次全部请求过来。-->
<!--            async expandHandler(row) {-->
<!--                // FIXME: 这里缺少展开后获取该行appraisal_team等数据的功能。-->
<!--                // let list = []-->
<!--                // for (let i = 0; i < row.appraisal_team.length; i++) {-->
<!--                //     const res = await this.$axios.get("users/" + row.appraisal_team[i])-->
<!--                //     list.push(res.data.name)-->
<!--                // }-->
<!--                // console.log(list)-->
<!--                // this.apprTeamList = list.join(" | ")-->
<!--            },-->
<!--            // 分页器size变化的监听事件-->
<!--            handleSizeChange(size) {-->
<!--                this.queryInfo.size = size-->
<!--                this.getApprInfoList()-->
<!--            },-->
<!--            // 分页器page变化的监听事件-->
<!--            handleCurrentChange(page) {-->
<!--                this.queryInfo.page = page-->
<!--                this.getApprInfoList()-->
<!--            },-->
<!--            addApprInfoDialogClosed() {-->
<!--                this.$refs.addApprInfoFormRef.resetFields()-->
<!--            },-->
<!--            editApprInfoDialogClosed() {-->
<!--                this.$refs.editApprInfoFormRef.resetFields()-->
<!--            },-->
<!--            async getProjectList() {-->
<!--                this.queryInfo.paginator = false-->
<!--                const res = await this.$axios.get("basicinfos/", {-->
<!--                    params: this.queryInfo-->
<!--                })-->
<!--                console.log(res)-->
<!--                if (res.status !== 200) {-->
<!--                    return this.$message.error("获取项目列表失败")-->
<!--                }-->
<!--                this.projectList = res.data-->
<!--            },-->
<!--            async getUserList() {-->
<!--                const {data: res} = await this.$axios.get("users")-->
<!--                this.userList = res-->
<!--                for (let i = 0; i < res.length; i++) {-->
<!--                    let user = {}-->
<!--                    user["key"] = res[i].id-->
<!--                    user["label"] = res[i].name-->
<!--                    this.transferUserList.push(user)-->
<!--                }-->
<!--            },-->
<!--            saveApprInfo() {-->
<!--                this.$refs.addApprInfoFormRef.validate(async (valid) => {-->
<!--                    if (!valid) {-->
<!--                        this.$message.error("表单验证失败")-->
<!--                        return-->
<!--                    }-->
<!--                    const {data: res} = await this.$axios.post("apprinfos/", this.addForm)-->
<!--                    if (res.status !== 201) {-->
<!--                        return this.$message.error("创建鉴定信息失败")-->
<!--                    }-->
<!--                    const projRes = await this.$axios.patch("basicinfos/" + this.addForm.basic_info + "/",-->
<!--                        {-->
<!--                            "stage": 2-->
<!--                        }-->
<!--                    )-->
<!--                    if (projRes.status !== 200) {-->
<!--                        this.$message.error("重置状态失败")-->
<!--                    }-->
<!--                    this.addDialogVisible = false-->
<!--                    this.getApprInfoList()-->
<!--                    this.getProjectList()-->
<!--                    this.$message.success("添加鉴定信息成功")-->
<!--                })-->
<!--            },-->
<!--            editApprInfo() {-->
<!--                this.$refs.editApprInfoFormRef.validate(async (valid) => {-->
<!--                    if (!valid) {-->
<!--                        this.$message.error("表单验证失败")-->
<!--                        return-->
<!--                    }-->
<!--                    const {data: res} = await this.$axios.put("apprinfos/" + this.editForm.id + "/", this.editForm)-->
<!--                    if (res.status !== 200) {-->
<!--                        return this.$message.error("创建鉴定信息失败")-->
<!--                    }-->
<!--                    this.editDialogVisible = false-->
<!--                    this.getApprInfoList()-->
<!--                    this.getProjectList()-->
<!--                    this.$message.success("添加鉴定信息成功")-->
<!--                })-->
<!--            },-->
<!--            async getUserName(ids) {-->
<!--                for (let i = 0; i < ids.length; i++) {-->
<!--                    const res = await this.$axios.get("users/" + ids[i])-->
<!--                    this.apprTeamList.push(res.data.name)-->
<!--                }-->
<!--            }-->
<!--        },-->
<!--        created() {-->
<!--            this.getApprInfoList()-->
<!--            this.getProjectList()-->
<!--            this.getUserList()-->
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

<!--    .demo-table-expand .full-width {-->
<!--        width: 100%;-->
<!--    }-->
<!--</style>-->


<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>鉴定信息</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  卡片区-->
        <el-card class="box-card">
            <!-- 添加按钮 -->
            <el-row>
                <el-col>
                    <el-button type="primary" @click="showAddDialog">添加鉴定信息</el-button>
                </el-col>
            </el-row>
            <!-- 项目列表 -->
            <el-table stripe
                      :data="apprInfoList"
                      style="width: 100%">
                <!--<el-table-column type="expand">-->
                <!--    <template slot-scope="props">-->
                <!--        <el-form label-position="left" inline class="demo-table-expand">-->
                <!--            <el-form-item label="项目编号：">-->
                <!--                <span>{{ props.row.basic_info_sn }}</span>-->
                <!--            </el-form-item>-->
                <!--            <el-form-item label="项目名称：">-->
                <!--                <span>{{ props.row.basic_info_name }}</span>-->
                <!--            </el-form-item>-->
                <!--            <el-form-item label="鉴定人员：">-->
                <!--                &lt;!&ndash;<span>&ndash;&gt;-->
                <!--                &lt;!&ndash;    <template v-for="id in props.row.appraisal_team">&ndash;&gt;-->
                <!--                &lt;!&ndash;        {{getUserName(id)}}&ndash;&gt;-->
                <!--                &lt;!&ndash;        &lt;!&ndash;{{person.name}}&ndash;&gt;&ndash;&gt;-->
                <!--                &lt;!&ndash;    </template>&ndash;&gt;-->
                <!--                &lt;!&ndash;</span>&ndash;&gt;-->
                <!--                &lt;!&ndash; FIXME: 这里有BUG，这个数组需要请求后端获得人员的姓名。 &ndash;&gt;-->
                <!--                <span>{{ props.row.appraisal_team }}</span>-->
                <!--            </el-form-item>-->
                <!--            <el-form-item label="复核人：">-->
                <!--                <span>{{ props.row.reviewer_name }}</span>-->
                <!--            </el-form-item>-->
                <!--            <el-form-item label="立卷人：">-->
                <!--                <span>{{ props.row.archivist_name }}</span>-->
                <!--            </el-form-item>-->
                <!--            <el-form-item label="鉴定地址：">-->
                <!--                <span>{{ props.row.appraisal_address }}</span>-->
                <!--            </el-form-item>-->
                <!--            <el-form-item label="联系人：">-->
                <!--                <span>{{ props.row.contact }}</span>-->
                <!--            </el-form-item>-->
                <!--            <el-form-item label="联系电话：">-->
                <!--                <span>{{ props.row.phone }}</span>-->
                <!--            </el-form-item>-->
                <!--            <el-form-item label="鉴定时间：">-->
                <!--                <span>{{ props.row.appraisal_date }}</span>-->
                <!--            </el-form-item>-->
                <!--            <el-form-item label="讨论时间：">-->
                <!--                <span>{{ props.row.discuss_date }}</span>-->
                <!--            </el-form-item>-->
                <!--            <el-form-item label="基本案情：" class="full-width">-->
                <!--                <span>{{ props.row.project_detail }}</span>-->
                <!--            </el-form-item>-->
                <!--            <el-form-item label="主要鉴定意见：" class="full-width">-->
                <!--                <span>{{ props.row.opinion }}</span>-->
                <!--            </el-form-item>-->
                <!--        </el-form>-->
                <!--    </template>-->
                <!--</el-table-column>-->

                <!-- 索引列 -->
                <el-table-column type="index" label="序号"></el-table-column>
                <!-- 数据列 -->
                <el-table-column
                    prop="basic_info_sn"
                    label="项目编号"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="basic_info_name"
                    min-width="180"
                    label="项目名称">
                </el-table-column>
                <el-table-column
                    prop="contact"
                    min-width="100"
                    label="联系人">
                </el-table-column>
                <el-table-column
                    min-width="100"
                    prop="phone"
                    label="联系电话">
                </el-table-column>
                <el-table-column
                    min-width="100"
                    prop="appraisal_date"
                    label="鉴定日期">
                </el-table-column>
                <el-table-column label="操作" width="260px">
                    <template v-slot="scope">
                        <!-- 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 -->
                        <el-button size="mini"
                                   type="primary"
                                   @click="showDetailDialog(scope.row)"
                                   icon="el-icon-edit">查看
                        </el-button>
                        <el-button size="mini"
                                   type="primary"
                                   @click="showEditDialog(scope.row.id)"
                                   icon="el-icon-edit">编辑
                        </el-button>
                        <el-button size="mini"
                                   type="danger"
                                   @click="deleteApprInfo(scope.row)"
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
            :current-page="baiscInfoQueryInfo.page"
            :page-sizes="[10, 20, 50]"
            :page-size="baiscInfoQueryInfo.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total">
        </el-pagination>

        <!-- 添加项目的对话框 -->
        <el-dialog
            title="添加鉴定信息"
            :close-on-click-modal="false"
            :visible.sync="addDialogVisible"
            width="80%">
            <!-- 添加项目的表单 -->
            <el-form :model="addForm"
                     :rules="apprInfoFormRules"
                     ref="addFormRef"
                     label-width="100px">
                <!-- prop是验证规则 -->
                <el-form-item label="项目：" prop="basic_info">
                    <el-select v-model="addForm.basic_info" placeholder="请选择">
                        <el-option
                            v-for="item in projectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- TODO: el-form-item的样式和transfer有冲突-->
                <el-form-item label="鉴定人员：" prop="appraisal_team">
                    <el-transfer
                        filterable
                        filter-placeholder="请输入姓名"
                        v-model="addForm.appraisal_team"
                        :data="transferUserList">
                    </el-transfer>
                </el-form-item>
                <el-form-item label="立卷人" prop="archivist">
                    <el-select v-model="addForm.archivist" placeholder="请选择">
                        <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="校对人" prop="proofreader">
                    <el-select v-model="addForm.proofreader" placeholder="请选择">
                        <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="复核人" prop="reviewer">
                    <el-select v-model="addForm.reviewer" placeholder="请选择">
                        <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="鉴定地址" prop="appraisal_address">
                    <el-input v-model="addForm.appraisal_address" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="addForm.contact" placeholder="请输入联系人姓名"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="addForm.phone" placeholder="请输入联系人电话"></el-input>
                </el-form-item>
                <el-form-item label="基本案情" prop="project_detail">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="addForm.project_detail"></el-input>
                </el-form-item>
                <el-form-item label="主要鉴定意见" prop="opinion">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="addForm.opinion"></el-input>
                </el-form-item>
                <el-form-item label="鉴定时间：" prop="appraisal_date">
                    <el-date-picker
                        v-model="addForm.appraisal_date"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="讨论时间：" prop="discuss_date">
                    <el-date-picker
                        v-model="addForm.discuss_date"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addApprInfo">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 编辑信息的对话框 -->
        <el-dialog
            title="编辑鉴定信息"
            :close-on-click-modal="false"
            :visible.sync="editDialogVisible"
            width="80%">
            <el-form :model="editForm"
                     :rules="apprInfoFormRules"
                     ref="editFormRef"
                     label-width="100px">
                <!-- prop是验证规则 -->
                <!--FIXME: 编辑页面中，下拉菜单的数据回显有问题-->
                <el-form-item label="项目：" prop="basic_info">
                    <el-select v-model="editForm.basic_info" placeholder="请选择">
                        <el-option
                            v-for="item in projectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- TODO: el-form-item的样式和transfer有冲突-->
                <el-form-item label="鉴定人员：" prop="appraisal_team">
                    <el-transfer
                        filterable
                        filter-placeholder="请输入姓名"
                        v-model="editForm.appraisal_team"
                        :data="transferUserList">
                    </el-transfer>
                </el-form-item>
                <el-form-item label="立卷人" prop="archivist">
                    <el-select v-model="editForm.archivist" placeholder="请选择">
                        <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="校对人" prop="proofreader">
                    <el-select v-model="editForm.proofreader" placeholder="请选择">
                        <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="复核人" prop="reviewer">
                    <el-select v-model="editForm.reviewer" placeholder="请选择">
                        <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="鉴定地址" prop="appraisal_address">
                    <el-input v-model="editForm.appraisal_address" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="editForm.contact" placeholder="请输入联系人姓名"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="editForm.phone" placeholder="请输入联系人电话"></el-input>
                </el-form-item>
                <el-form-item label="基本案情" prop="project_detail">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="editForm.project_detail"></el-input>
                </el-form-item>
                <el-form-item label="主要鉴定意见" prop="opinion">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="editForm.opinion"></el-input>
                </el-form-item>
                <el-form-item label="鉴定时间：" prop="appraisal_date">
                    <el-date-picker
                        v-model="editForm.appraisal_date"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="讨论时间：" prop="discuss_date">
                    <el-date-picker
                        v-model="editForm.discuss_date"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editApprInfo">确 定</el-button>
          </span>
        </el-dialog>


        <!-- 查看信息的对话框 -->
        <el-dialog
            title="查看鉴定信息"
            :close-on-click-modal="false"
            :visible.sync="detailDialogVisible"
            width="80%">
            <el-form :model="detailForm"
                     :rules="apprInfoFormRules"
                     ref="detailFormRef"
                     label-width="100px">
                <!-- prop是验证规则 -->
                <el-form-item label="项目：" prop="basic_info">
                    <el-input v-model="detailForm.basic_info_name" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="鉴定人员：" prop="appraisal_team">
                    <!--<el-input v-model="detailForm.appraisal_team" :readonly="true"></el-input>-->
                    <el-transfer filterable
                                 filter-placeholder="请输入姓名"
                                 v-model="detailForm.appraisal_team"
                                 :data="transferUserList">
                    </el-transfer>
                </el-form-item>
                <el-form-item label="立卷人" prop="archivist">
                    <el-input v-model="detailForm.archivist_name" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="校对人" prop="proofreader">
                    <el-input v-model="detailForm.proofreader_name" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="复核人" prop="reviewer">
                    <el-input v-model="detailForm.reviewer_name" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="鉴定地址" prop="appraisal_address">
                    <el-input v-model="detailForm.appraisal_address" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="detailForm.contact" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="detailForm.phone" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="基本案情" prop="project_detail">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="detailForm.project_detail"
                              :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="主要鉴定意见" prop="opinion">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="detailForm.opinion"
                              :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="鉴定时间：" prop="appraisal_date">
                    <el-date-picker
                        v-model="detailForm.appraisal_date"
                        :readonly="true"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="讨论时间：" prop="discuss_date">
                    <el-date-picker
                        v-model="detailForm.discuss_date"
                        :readonly="true"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="detailDialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "ApprInfos",
    data() {
        // 校验手机号
        let checkMobile = (rule, value, callback) => {
            // 匹配手机号的正则表达式
            const regMobile = /^(0086|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if (regMobile.test(value)) {
                return callback()
            }
            return callback(new Error("请输入正确的手机号码"))
        }
        return {
            // get查询的分页参数
            baiscInfoQueryInfo: {
                page: 1,
                size: 10,
                stage: 1,
                paginator: false,
            },
            apprInfoQueryInfo: {
                page: 1,
                size: 10,
                stage: 1,
                paginator: true,
            },
            total: 0,
            apprInfoList: [],
            addDialogVisible: false,
            editDialogVisible: false,
            detailDialogVisible: false,
            apprTeamList: [],
            basicInfoIds: [],
            addForm: {
                basic_info: "",
                appraisal_team: [],
                reviewer: "",
                archivist: "",
                proofreader: "",
                appraisal_address: "",
                contact: "",
                phone: "",
                appraisal_date: "",
                discuss_date: "",
                project_detail: "",
                opinion: "",
            },
            editForm: {
                basic_info: "",
                appraisal_team: [],
                reviewer: "",
                archivist: "",
                proofreader: "",
                appraisal_address: "",
                contact: "",
                phone: "",
                appraisal_date: "",
                discuss_date: "",
                project_detail: "",
                opinion: "",
            },
            detailForm: {
                basic_info: "",
                appraisal_team: [],
                reviewer: "",
                archivist: "",
                proofreader: "",
                appraisal_address: "",
                contact: "",
                phone: "",
                appraisal_date: "",
                discuss_date: "",
                project_detail: "",
                opinion: "",
            },
            apprInfoFormRules: {
                basic_info: [
                    {required: true, message: "请选择对应的项目", trigger: "change"},
                ],
                // FIXME: 这个验证规则对transfer无效，稍后解决
                appraisal_team: [
                    {required: true, message: "请选择鉴定人员", trigger: "change"},
                ],
                appraisal_address: [
                    {required: true, message: "请输入地址", trigger: "blur"},
                ],
                contact: [
                    {required: true, message: "请输入联系人姓名", trigger: "blur"},
                ],
                phone: [
                    {required: true, message: "请输入手机号码", trigger: "blur"},
                    // {min: 11, max: 18, message: "手机号码的长度在11-18位之间", trigger: "blur"},
                    {validator: checkMobile, trigger: "blur"},
                ],
                project_detail: [
                    {required: true, message: "请输入基本案情", trigger: "blur"},
                ],
                opinion: [
                    {required: true, message: "请输入鉴定意见", trigger: "blur"},
                ],
                reviewer: [
                    {required: true, message: "请选择复核人", trigger: "blur"},
                ],
                archivist: [
                    {required: true, message: "请选择立卷人", trigger: "blur"},
                ],
                proofreader: [
                    {required: true, message: "请选择校对人", trigger: "blur"},
                ],
                appraisal_date: [
                    {required: true, message: "请选择日期", trigger: "blur"},
                ],
                discuss_date: [
                    {required: true, message: "请选择日期", trigger: "blur"},

                ]
            },
            projectList: [],
            transferUserList: [],
            userList: [],
        }
    },
    methods: {
        async getApprInfoList() {
            const res = await this.$axios.get("apprinfos/",
                {
                    params: this.apprInfoQueryInfo
                }
            )
            if (res.status !== 200) {
                return this.$message.error("获取鉴定信息列表失败，请刷新页面重试")
            }
            this.apprInfoList = res.data.results
            this.total = res.data.count
        },
        showAddDialog() {
            // this.getProjectList();
            this.addDialogVisible = true
            this.$nextTick(() => {
                this.addForm = {}
                this.$refs.addFormRef.resetFields()
            })
        },
        // 编辑按钮的点击事件，打开修改鉴定信息的对话框，并带入数据。
        async showEditDialog(id) {
            const res = await this.$axios.get("apprinfos/" + id)
            if (res.status !== 200) {
                return this.$message.error("获取鉴定信息详情失败")
            }
            this.editForm = res.data
            this.editDialogVisible = true
        },
        showDetailDialog(row) {
            this.detailDialogVisible = true
            this.detailForm = row
        },
        async deleteApprInfo(row) {
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
            const res = await this.$axios.delete("apprinfos/" + row.id)
            if (res.status !== 204) {
                this.$message.error("删除失败")
            }
            // 重置basic_info的stage
            const projRes = await this.$axios.patch("basicinfos/" + row.basic_info + "/",
                {
                    "stage": 1
                }
            )
            if (projRes.status !== 200) {
                this.$message.error("重置状态失败")
            }
            this.getApprInfoList()
        },
        // 分页器size变化的监听事件
        handleSizeChange(size) {
            this.apprInfoQueryInfo.size = size
            this.getApprInfoList()
        },
        // 分页器page变化的监听事件
        handleCurrentChange(page) {
            this.apprInfoQueryInfo.page = page
            this.getApprInfoList()
        },
        async getBasicInfoList() {
            this.baiscInfoQueryInfo.paginator = false
            const res = await this.$axios.get("basicinfos/", {
                params: this.baiscInfoQueryInfo
            })
            if (res.status !== 200) {
                return this.$message.error("获取项目列表失败")
            }
            this.projectList = res.data
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
        addApprInfo() {
            this.$refs.addFormRef.validate(async (valid) => {
                if (!valid) {
                    this.$message.error("表单验证失败")
                    return
                }
                const res = await this.$axios.post("apprinfos/", this.addForm)
                if (res.status !== 201) {
                    return this.$message.error("创建鉴定信息失败")
                }
                const projRes = await this.$axios.patch("basicinfos/" +
                    this.addForm.basic_info + "/",
                    {
                        "stage": 2
                    }
                )
                if (projRes.status !== 200) {
                    this.$message.error("重置状态失败")
                }
                this.addDialogVisible = false
                this.getApprInfoList()
                this.getBasicInfoList()
                this.$message.success("添加鉴定信息成功")
            })
        },
        editApprInfo() {
            this.$refs.editFormRef.validate(async (valid) => {
                if (!valid) {
                    this.$message.error("表单验证失败")
                    return
                }
                const res = await this.$axios.put("apprinfos/" + this.editForm.id + "/",
                    this.editForm)
                if (res.status !== 200) {
                    return this.$message.error("创建鉴定信息失败")
                }
                this.editDialogVisible = false
                this.getApprInfoList()
                this.getBasicInfoList()
                this.$message.success("添加鉴定信息成功")
            })
        },
        async getUserName(ids) {
            for (let i = 0; i < ids.length; i++) {
                const res = await this.$axios.get("users/" + ids[i])
                this.apprTeamList.push(res.data.name)
            }
        }
    },
    created() {
        this.getApprInfoList()
        this.getBasicInfoList()
        this.getUserList()
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

.demo-table-expand .full-width {
    width: 100%;
}
</style>