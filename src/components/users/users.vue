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
			<el-input v-model="query" @clear="resetUsers()" clearable placeholder="请输入用户信息" class="input-with-select">
				<el-button slot="append" @click='searchUsers()' icon="el-icon-search"></el-button>

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
				<template slot-scope='scope'>
					{{ scope.row.create_time | fmtdate}}
				</template>
			</el-table-column>
			<el-table-column label="用户状态">
				<template slot-scope='scope'>
					<el-switch v-model="scope.row.mg_status" active-color="#13ce66" inactive-color="#ff4949">
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope='scope'>
					<el-button size="mini" :plain="true" type="primary" icon="el-icon-edit" circle></el-button>
					<el-button size="mini" :plain="true" type="success" icon="el-icon-check" circle></el-button>
					<el-button size="mini" :plain="true" type="danger" icon="el-icon-delete" circle></el-button>
				</template>
			</el-table-column>

		</el-table>
		<!--分页-->
		<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page='pagenum'
	      :page-sizes="[2, 3, 4, 5]"
	      :page-size="pagesize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="total">
	    </el-pagination>
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
			//搜索用户
			searchUsers(){
				this.pagenum=1
				this.getUsers();
				
			},
			// 清除搜索信息后 重新获取原用户列表
			resetUsers(){
				this.pagenum=1
				this.getUsers();
			},
			//分页方法
			  //每页条数
			 handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		        this.pagesize = val
		        this.getUsers()
		        
		      },
		      //当前页 
		      handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		        this.pagenum = val
		        this.getUsers()
		      },
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