<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>机构资料管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  卡片区-->
        <el-card class="box-card">
            <!--<el-button size="medium" type="primary" @click="">添加机构</el-button>-->
            <el-table stripe
                      :data="orgList"
                      style="width: 100%">
                <!-- 索引列 -->
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column
                        prop="name"
                        label="机构名称"
                        min-width="100px">
                </el-table-column>
                <el-table-column
                        prop="legal_personality"
                        label="法人">
                </el-table-column>
                <el-table-column
                        prop="org_id"
                        label="统一社会信用代码">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
                <!-- 操作按钮列 -->
                <el-table-column label="操作" min-width="50px">
                    <template v-slot="scope">
                        <!-- 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 -->
                        <el-button size="mini"
                                   type="primary"
                                   @click="showOrgDetailDialog(scope.row.id)"
                                   icon="el-icon-edit">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
                title="机构信息"
                :visible.sync="orgDialogVisible"
                width="60%">
            <el-form ref="orgFormRef" :model="orgForm" label-width="140px">
                <el-form-item label="机构名称" prop="name">
                    <el-input v-model="orgForm.name" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="orgForm.address" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="法人" prop="legal_personality">
                    <el-input v-model="orgForm.legal_personality" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="经营范围" prop="range_approved">
                    <el-input type="textarea" v-model="orgForm.range_approved" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="监管机构" prop="supervision_1">
                    <el-input v-model="orgForm.supervision_1" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="监管机构" prop="supervision_2">
                    <el-input v-model="orgForm.supervision_2" :readonly="true"></el-input>
                </el-form-item>

                <el-form-item label="执业许可证号" prop="license_num">
                    <el-input v-model="orgForm.license_num" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="开户银行" prop="bank">
                    <el-input v-model="orgForm.bank" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="开户银行账号" prop="account">
                    <el-input v-model="orgForm.account" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码" prop="org_id">
                    <el-input v-model="orgForm.org_id" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="orgForm.contact" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone_1">
                    <el-input v-model="orgForm.phone_1" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone_2">
                    <el-input v-model="orgForm.phone_2" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="传真" prop="fax">
                    <el-input v-model="orgForm.fax" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="监督热线" prop="complaints_hotline">
                    <el-input v-model="orgForm.complaints_hotline" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="orgForm.email" :readonly="true"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="orgDialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Orgs",
        data() {
            return {
                orgList: [],
                orgDialogVisible: false,
                orgForm: {
                    name: "",
                    address: "",
                    legal_personality: "",
                    range_approved: "",
                    supervision_1: "",
                    supervision_2: "",
                    license_num: "",
                    bank: "",
                    account: "",
                    org_id: "",
                    contact: "",
                    phone_1: "",
                    phone_2: "",
                    fax: "",
                    complaints_hotline: "",
                    email: ""
                }
            }
        },
        methods: {
            async getOrgList() {
                const res = await this.$axios.get("orgs/")
                if (res.status !== 200) {
                    return this.$message.error("获取机构列表失败")
                }
                this.orgList = res.data
            },
            async showOrgDetailDialog(id) {
                const res = await this.$axios.get("orgs/" + id + "/")
                if (res.status !== 200) {
                    return this.$message.error("获取机构详情失败")
                }
                this.orgForm = res.data
                this.orgDialogVisible = true
            },
        },
        created() {
            this.getOrgList()
        }
    }
</script>

<style scoped>

</style>