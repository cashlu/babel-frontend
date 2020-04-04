<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>鉴定材料借阅记录</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  卡片区 -->
        <el-card class="box-card">
            <!-- 借阅记录表 -->
            <el-table
                    stripe
                    :data="recList"
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
    </div>
</template>

<script>
    export default {
        name: "ApprfileRec",
        data() {
            return {
                // get查询的分页参数
                queryInfo: {
                    page: 1,
                    size: 10,
                },
                total: 0,
                recList: [],
            }
        },
        methods: {
            handleSizeChange(size) {
                this.queryInfo.size = size
                this.getRecList()
            },
            handleCurrentChange(page) {
                this.queryInfo.page = page
                this.getRecList()
            },
            async getRecList() {
                const res = await this.$axios.get("apprfilerecs",
                    {
                        params: this.queryInfo
                    }
                )
                if (res.status !== 200) {
                    return this.$message.error("获取记录列表失败")
                }
                this.recList = res.data.results
                this.total = res.data.count
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
        },
        created() {
            this.getRecList()
        }
    }
</script>

<style scoped>
    .el-table .warning-row {
        background: oldlace;
    }
</style>