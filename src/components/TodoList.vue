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
                                 min-width="180"></el-table-column>
                <el-table-column prop="basic_info_name"
                                 label="项目名称"
                                 min-width="250"></el-table-column>
                <el-table-column prop="type_text"
                                 label="事项类型"
                                 min-width="180"></el-table-column>
                <el-table-column prop="is_back"
                                 min-width="150"
                                 :formatter="formatBoolean"
                                 sortable
                                 label="是否打回">
                    <template v-slot="scope">
                        <el-tag class="finish-tag" effect="plain" v-if="scope.row.is_back===true" type="danger">打回
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="created_time"
                                 label="创建时间"
                                 :formatter="dateFormat"
                                 min-width="180"></el-table-column>
                <el-table-column min-width="250px" label="操作">
                    <template v-slot="scope">
                        <!-- 如果要使用作用域插槽的话，那么使用的元素必须包裹在template中。 -->
                        <el-button size="mini"
                                   type="primary"
                                   @click="jumpToDetail(scope.row)"
                                   icon="el-icon-edit">处理
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
                                 min-width="180"></el-table-column>
                <el-table-column prop="basic_info_name"
                                 label="项目名称"
                                 min-width="250"></el-table-column>
                <el-table-column prop="type_text"
                                 label="事项类型"
                                 min-width="180"></el-table-column>
                <el-table-column prop="created_time"
                                 label="创建时间"
                                 :formatter="dateFormat"
                                 min-width="180"></el-table-column>
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
        // 判断row.type，确定todoType，判断row.is_back来判断是否是打回的todo。
        jumpToDetail(row) {
            switch (row.type) {
                // 跳转到立项只有打回一种情况，不需要做判断。
                case 1:
                    /**
                     * todoType == 1:（立项）
                     *     is_back == true:     初审打回过来的，重做立项，跳转到立项信息的编辑页面。
                     *     is_back == false:    （不存在）立项是第一个环节，没有提交过来的来源。
                     * */

                    this.$router.push({
                        path: "basicinfos",
                        query: {
                            todo_id: row.id,
                            basicInfoId: row.basic_info,
                            // 是否是todo跳转
                            jump: true,
                        }
                    })
                    break
                case 2:
                    /**
                     * todoType == 2:（初审）
                     *     is_back == true:    （不存在）下一个环节是立卷，立卷不审批，不存在打回的。
                     *     is_back == false:    立项提交过来的，跳转到初审的表单。
                     */

                    this.$router.push({
                        path: "review",
                        query: {
                            todo_id: row.id,
                            basicInfoId: row.basic_info,
                            // 是否是todo跳转
                            jump: true,
                        }
                    })
                    break
                case 3:
                    /**
                     * todoType == 3:（立卷）
                     *     is_back == true:     校对打回过来的，重做立卷，跳转到鉴定信息的编辑页面。
                     *     is_back == false:    编写鉴定信息后未提交，只是暂存，给自己创建的todo，跳转到鉴定信息的编辑页面。
                     */

                    this.$router.push({
                        path: "apprinfos",
                        query: {
                            todo_id: row.id,
                            basicInfoId: row.basic_info,
                            // 是否是todo跳转
                            jump: true,
                            is_back: row.is_back,
                        }
                    });
                    break;
                case 4:
                    /**
                     * todoType == 4:（校对）
                     *     is_back == true:        终审打回过来的，重做校对，跳转到校对的的表单。
                     *     is_back == false:    立卷提交过来的，跳转到校对的表单。
                     *     is_back属性在跳转的功能上，没有作用
                     */


                    this.$router.push({
                        path: "proofread",
                        query: {
                            todo_id: row.id,
                            basicInfoId: row.basic_info,
                            // 是否是todo跳转
                            jump: true,
                            is_back: row.is_back,
                        }
                    });

                    break
                case 5:
                    /**
                     * todoType == 5:（终审）
                     *     is_back == true:     不存在。
                     *     is_back == false:     校对提交过来的，跳转到终审的表单。
                     */
                    this.$router.push({
                        path: "finalreview",
                        query: {
                            todo_id: row.id,
                            basicInfoId: row.basic_info,
                            jump: true,
                            is_back: row.is_back,
                        }
                    });
                    break

                case 6:
                    /**
                     * todoType == 6:（归档）
                     *     is_back == true:     不存在，归档是最后一个环节，不存在打回的情况。
                     *     is_back == false:     终审提交过来的，跳转到校对的表单。
                     */
                    this.$router.push({
                        path: "filephases",
                        query: {
                            todo_id: row.id,
                            basicInfoId: row.basic_info,
                            jump: true,
                            is_back: row.is_back,
                        }
                    });
                    break
                default:
                    this.$message.error("待办事项类型匹配错误")
            }
        },

        // 待办事项分页器size变化的监听事件
        handleTodoListSizeChange(size) {
            this.todoListSize = size
        },

        // 待办事项分页器page变化的监听事件
        handleTodoListCurrentChange(page) {
            this.todoListPage = page
        },
        // 已办分页器size变化的监听事件
        handleFinishedListSizeChange(size) {
            this.todoListSize = size
        },

        // 已办分页器page变化的监听事件
        handleFinishedListCurrentChange(page) {
            this.todoListPage = page
        },
        // 用于table中展示是否打回的字段，element的table默认不直接显示布尔值
        formatBoolean: function (row, column, cellValue) {
            let ret = ''  //你想在页面展示的值
            if (cellValue) {
                ret = "是"  //根据自己的需求设定
            } else {
                ret = "否"
            }
            return ret
        },
    }
    ,
    created() {
        this.getLoginUserID()
        this.getTodoList()
        this.getFinishedList()
    }
}
</script>

<style scoped>

</style>