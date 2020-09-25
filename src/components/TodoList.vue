<template>
    <div id="todolist">
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>我的</el-breadcrumb-item>
            <el-breadcrumb-item>待办事项</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 待办事项 -->
        <!-- TODO: 这里少了style width 100% -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>待办事件</span>
            </div>
            <el-table :data="todolist">
                <!-- 索引列-->
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="basic_info_sn"
                                 label="项目编号"
                                 width="180"></el-table-column>
                <el-table-column prop="basic_info_name"
                                 label="项目名称"
                                 width="180"></el-table-column>
                <el-table-column prop="user_name"
                                 label="责任人"
                                 width="180"></el-table-column>
                <el-table-column prop="type_text"
                                 label="事项类型"
                                 width="180"></el-table-column>
                <el-table-column prop="created_time"
                                 label="创建时间"
                                 :formatter="dateFormat"
                                 width="180"></el-table-column>
                <el-table-column min-width="250px" label="操作">
                    <template v-slot="scope">
                        <!-- 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 -->
                        <el-button size="mini"
                                   type="primary"
                                   @click="jumpToDetail(scope.row)"
                                   icon="el-icon-edit">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!--  待办事项分页  -->
        <el-pagination
            background
            @size-change="handleTodoListSizeChange"
            @current-change="handleTodoListCurrentChange"
            :current-page="todoListPage"
            :page-sizes="[10, 20, 50]"
            :page-size="todoListSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="todoListTotal">
        </el-pagination>


        <!-- 已办事项 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>已办事件</span>
            </div>
            <el-table :data="finishedList">
                <!-- 索引列-->
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="basic_info_sn"
                                 label="项目编号"
                                 width="180"></el-table-column>
                <el-table-column prop="basic_info_name"
                                 label="项目名称"
                                 width="180"></el-table-column>
                <el-table-column prop="user_name"
                                 label="责任人"
                                 width="180"></el-table-column>
                <el-table-column prop="type"
                                 label="事项类型"
                                 width="180"></el-table-column>
                <el-table-column prop="created_time"
                                 label="创建时间"
                                 :formatter="dateFormat"
                                 width="180"></el-table-column>
            </el-table>
        </el-card>
        <!--  已办事项分页  -->
        <el-pagination
            background
            @size-change="handleFinishedListSizeChange"
            @current-change="handleFinishedListCurrentChange"
            :current-page="finishedListPage"
            :page-sizes="[10, 20, 50]"
            :page-size="finishedListSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="finishedListTotal">
        </el-pagination>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: "TodoList",
    data() {
        return {
            todoListPage: 0,
            todoListSize: 0,
            todoListTotal: 0,
            finishedListPage: 0,
            finishedListSize: 0,
            finishedListTotal: 0,
            loginUserID: "",
            todolist: [],
            finishedList: [],

        }
    },
    methods: {
        getLoginUserID() {
            this.loginUserID = window.localStorage.getItem("id");
        },

        // 获取待办事项列表
        async getTodoList() {
            const res = await this.$axios.get("todo", {
                params: {
                    user: this.loginUserID,
                    is_finished: false,
                }
            })
            if (res.status !== 200) {
                return this.$message.error("获取待办事项列表失败")
            }
            this.todolist = res.data.results
            this.todoListTotal = res.data.count
        },

        // 获取已办事项列表
        async getFinishedList() {
            const res = await this.$axios.get("todo", {
                params: {
                    user: this.loginUserID,
                    is_finished: true,
                }
            })
            if (res.status !== 200) {
                return this.$message.error("获取已办事项列表失败")
            }
            this.finishedList = res.data.results
            this.finishedListTotal = res.data.count
        },

        // 日期格式化
        dateFormat(row, column, cellValue, index) {
            const daterc = row[column.property]
            if (daterc != null) {
                return moment(daterc).format("YYYY年MM月DD日 hh:mm")
            }
        },

        // 跳转到事项的处理页
        jumpToDetail(row) {
            switch (row.type) {
                case 1:
                    this.$router.push({
                        path: "basicinfos",
                        query: {
                            todo_id: row.id,
                            basic_info_id: row.basic_info,
                            // 是否是跳转
                            jump: true,
                            // 是否为打回后重做，是的话打开编辑对话框，否则打开审批对话框
                            redo: true
                        }
                    })
                    break
                case 2:
                    console.log("立卷(预留)");
                    break
                case 3:
                    console.log("校对")
                    // TODO: 实现跳转到校对页面的逻辑，具体思路详见设计笔记中的“思考”
                    break
                case 4:
                    console.log("终审");
                    // TODO: 实现跳转到终审页面的逻辑，具体思路详见设计笔记中的“思考”
                    break
                case 5:
                    console.log("归档");
                    // TODO: 实现跳转到归档页面的逻辑，具体思路详见设计笔记中的“思考”
                    break
                default:
                    this.$message.error("待办事项类型匹配错误")
                    console.log("待办事项类型匹配错误")
            }
        },

        // 待办事项分页器size变化的监听事件
        handleTodoListSizeChange(size) {
            this.todoListSize = size
            this.getBasicInfoList()
        },

        // 待办事项分页器page变化的监听事件
        handleTodoListCurrentChange(page) {
            this.todoListPage = page
            this.getBasicInfoList()
        },
        // 已办分页器size变化的监听事件
        handleFinishedListSizeChange(size) {
            this.todoListSize = size
            this.getBasicInfoList()
        },

        // 已办分页器page变化的监听事件
        handleFinishedListCurrentChange(page) {
            this.todoListPage = page
            this.getBasicInfoList()
        },
    },
    created() {
        this.getLoginUserID()
        this.getTodoList()
        this.getFinishedList()
    }
}
</script>

<style scoped>

</style>