<template>
    <div id="reviewchian">
        <div class="block">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="审批链" name="1">
                    <el-timeline :reverse="true">
                        <el-timeline-item v-for="record in checkRecords" :timestamp="record.created_date"
                                          placement="top">
                            <el-card>
                                <h4>审批人：{{ record.reviewer_name }}</h4>
                                <p>审批意见：{{ record.opinion }}</p>
                                <p>审批结果： {{ record.status_text }}</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReviewChain",
    props: {
        basicInfoId: "",
    },
    data() {
        return {
            // 控制展开的标签
            activeNames: [],
            checkRecords: [],
        }
    },
    methods: {
        handleChange(val) {
            //console.log(val);
        },

        // 获取审批记录
        async getCheckRecords(basicInfoId) {
            const res = await this.$axios.get("checkrecords/",
                {
                    params: {
                        basic_info_id: basicInfoId,
                    }
                })
            if (res.status !== 200) {
                return this.$message.error("获取审批链失败")
            }
            console.log(res.data)
            this.checkRecords = res.data.results
        }
    },
    created() {
        console.log(this.basicInfoId);
        this.getCheckRecords(this.basicInfoId);
    }
}
</script>

<style scoped>

</style>