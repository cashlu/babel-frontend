const saveCheckRecord = (data) => {
    const res = this.$axios.post("checkrecords/", data)
    if (res.status !== 201) {
        this.$message.error(res.data.msg)
    } else {
        this.$message.success("添加审批记录成功")
    }
}

export {saveCheckRecord}