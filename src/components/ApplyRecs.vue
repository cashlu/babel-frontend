<template>
    <div id="applyrecs">
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>设备仪器管理</el-breadcrumb-item>
            <el-breadcrumb-item>设备申领记录</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  卡片区-->
        <el-card class="box-card">
            <!-- 项目列表 -->
            <el-table
                :data="records"
                style="width: 100%">
                <!-- 索引列 -->
                <el-table-column type="index" label="序号"></el-table-column>
                <!-- 数据列 -->
                <el-table-column
                    prop="device_id"
                    label="设备编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="proposer_name"
                    label="借出人"
                    width="180">
                </el-table-column>
                <!--                TODO: 归还时间格式有问题-->
                <!--                TODO: 归还时间的数据库不能auto_add，需要前端传过去-->
                <el-table-column
                    prop="return_time"
                    label="归还时间"
                    width="300">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "ApplyRecs",
    data() {
        return {
            records: [],
        }
    },
    methods: {
        async getRecords() {
            const res = await this.$axios.get("applyrecdetail")
            if (res.status !== 200) {
                return this.$message.error("获取申领记录失败")
            }
            this.records = res.data
            console.log(this.records)
        }
    },
    created() {
        console.log("he")
        this.getRecords()
    }

}
</script>

<style scoped>

</style>