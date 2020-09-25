<template>
    <div id="CheckRecord">
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>日志</el-breadcrumb-item>
            <el-breadcrumb-item>立项审批记录</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  卡片区-->
        <el-card class="box-card">
            <!-- 项目列表 -->
            <el-table
                :data="checkRecords"
                style="width: 100%">
                <!-- 索引列 -->
                <el-table-column type="index" label="序号"></el-table-column>
                <!-- 数据列 -->
                <el-table-column
                    prop="basicInfo_sn"
                    label="项目编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="basicInfo_name"
                    label="项目名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="reviewer_name"
                    label="审批人">
                </el-table-column>
                <el-table-column
                    prop="created_date"
                    label="审批日期">
                </el-table-column>
                <el-table-column
                    prop="status"
                    :formatter="formatBoolean"
                    sortable
                    label="审批状态">
                    <template v-slot="scope">
                        <el-tag class="status-tag" effect="plain" v-if="scope.row.status==='t'" type="primary">暂存
                        </el-tag>
                        <el-tag class="status-tag" effect="plain" v-else-if="scope.row.status==='b'" type="danger">打回
                        </el-tag>
                        <el-tag class="status-tag" effect="plain" v-else type="success">通过</el-tag>
                    </template>
                </el-table-column>
                <el-table-column min-width="180px" label="操作">
                    <template v-slot="scope">
                        <!-- 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 -->
                        <el-button size="mini"
                                   type="primary"
                                   @click="showDetailDialog(scope.row)"
                                   icon="el-icon-edit">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!--  分页  -->
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

        <!-- 查看项目的对话框 -->
        <el-dialog
            title="查看审批信息"
            :close-on-click-modal="false"
            :visible.sync="reviewDetailDialogVisible"
            @close="reviewDetailDialogClosed"
            width="80%">
            <!-- 编辑项目的表单 -->
            <el-form :model="detailForm"
                     ref="detailFormRef"
                     label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="项目编号：">
                            <el-input v-model="detailForm.basicInfo_sn" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="项目名称：">
                            <el-input v-model="detailForm.basicInfo_name" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="审批时间：">
                    <el-input v-model="detailForm.created_date" :readonly="true"></el-input>
                </el-form-item>

                <el-form-item label="审批意见：">
                    <el-input type="textarea"
                              :readonly="true"
                              :autosize="{ minRows: 4, maxRows: 10}"
                              v-model="detailForm.opinion"></el-input>
                </el-form-item>
                <el-form-item label="审批人：">
                    <el-input v-model="detailForm.reviewer_name" :readonly="true"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button type="info" @click="reviewDetailDialogVisible = false">关 闭</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "CheckRecord",
    data() {
        return {
            queryInfo: {
                query: "",
                page: 1,
                size: 10,
                stage: "",
                paginator: false,
            },
            checkRecords: [],
            total: 0,
            reviewDetailDialogVisible: false,
            detailForm: {}
        }
    },
    methods: {
        async getBasicInfoReviews() {
            const res = await this.$axios.get("checkrecords/", {
                params: this.queryInfo
            });
            if (res.status !== 200) {
                return this.$message.error("获取审批记录失败")
            }
            this.checkRecords = res.data.results
            this.total = res.data.count
        },
        // 分页器size变化的监听事件
        handleSizeChange(size) {
            this.queryInfo.size = size
            this.getBasicInfoReviews()
        },
        // 分页器page变化的监听事件
        handleCurrentChange(page) {
            this.queryInfo.page = page
            this.getBasicInfoReviews()
        },
        formatBoolean(row, column, cellValue) {
            let ret = ""
            if (cellValue === 2) {
                ret = "打回"
            } else if (cellValue === 3) {
                ret = "审批暂存"
            } else {
                ret = "通过"
            }
        },
        reviewDetailDialogClosed() {
            this.reviewDetailDialogVisible = false
        },
        showDetailDialog(row) {
            this.detailForm = row
            this.reviewDetailDialogVisible = true
        }
    },
    created() {
        this.getBasicInfoReviews()
    }
}
</script>

<style scoped>
.status-tag {
    font-weight: bold;
}
</style>