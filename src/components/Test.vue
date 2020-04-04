<template>
    <div>Test</div>
</template>

<script>
    export default {
        name: "Test",
        data() {
            return {
                token: window.localStorage.getItem("token"),

            }
        },
        methods: {
            async test() {
                const {data: res} = await this.$axios.get("devices")
                if (res.status !== 200) {
                    this.$message.error("获取失败")
                }
                console.log(res.data)
                this.$message.success("获取成功")
            }


        }, created() {
            this.test()
        }
    }
</script>

<style scoped>

</style>