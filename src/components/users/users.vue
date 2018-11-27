<template>
	<div id="">

		<!--面包屑-->
		<el-breadcrumb separator="/">
			<!--<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>

		<!--search-->
		<el-row>
			<el-input v-model="query" placeholder="请输入用户信息" class="input-with-select">
				<el-button slot="append" icon="el-icon-search"></el-button>

			</el-input>
			<el-button type="success" plain>添加用户</el-button>
		</el-row>

		<!--用户表单-->
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="" type="index" label="#" width="80"></el-table-column>
			<el-table-column prop="username" label="姓名" width="180"></el-table-column>
			<el-table-column prop="email" label="邮箱"></el-table-column>
			<el-table-column prop="mobile" label="电话"></el-table-column>
			<el-table-column label="创建日期">
				<template slot-scope='tableData'>
					{{tableData.row.create_time | fmtdate}}
				</template>
			</el-table-column>
			<el-table-column prop="mg_state" label="用户状态"></el-table-column>
			<el-table-column label="操作"></el-table-column>

			
			<el-switch v-model="tableData.mg_state" active-color="#13ce66" inactive-color="#ff4949">
			</el-switch>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				query: '',
				pagenum: 1,
				pagesize: 2,
				total: -1,
				/*
				create_time: 1486720211
				email: "adsfad@qq.com"
				id: 500
				mg_state: true
				mobile: "12345678"
				role_name: "主管"
				username: "admin"*/
				tableData: [{
					create_time: '',
					email: "",
					id: '',
					mg_state: '',
					mobile: "",
					role_name: "",
					username: ""
				}]
			}
		},
		created() {
			this.getUsers();
		},
		methods: {
			async getUsers() {
				const AUTH_TOKEN = localStorage.getItem('token')
				this.$https.defaults.headers.common['Authorization'] = AUTH_TOKEN
				const res = await this.$https.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)

				const {
					data: {
						total,
						users
					},
					meta: {
						status,
						msg
					}
				} = res.data
				if(status == 200) {
					this.tableData = users
					this.total = total
				} else {
					this.$message.warning(msg)
				}
			}
		}
	}
</script>

<style>
	.input-with-select {
		width: 600px;
		margin-top: 10px;
	}
</style>