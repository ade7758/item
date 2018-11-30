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
		<el-button type="success" @click="showAddUsers()" plain>添加用户</el-button>
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
				<el-switch @change='onOff(scope.row)' v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
				</el-switch>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template slot-scope='scope'>
				<el-button size="mini" @click="openEdit(scope.row)" :plain="true" type="primary" icon="el-icon-edit" circle></el-button>
				<el-button size="mini" @click="openRole(scope.row)" :plain="true" type="success" icon="el-icon-check" circle></el-button>
				<el-button size="mini" @click="openDel(scope.row.id)" :plain="true" type="danger"  icon="el-icon-delete" circle></el-button>
			</template>
		</el-table-column>

	</el-table>
	<!--分页-->
	<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page='pagenum' :page-sizes="[2, 3, 4, 5]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	</el-pagination>
	<!--添加用户弹出框-->
	<el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
		<el-form :model="form">
			<el-form-item label="用户名" label-width="100px">
				<el-input v-model="form.username" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" label-width="100px">
				<el-input v-model="form.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" label-width="100px">
				<el-input v-model="form.email" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="手机" label-width="100px">
				<el-input v-model="form.mobile" autocomplete="off"></el-input>
			</el-form-item>

		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
			<el-button type="primary" @click="addUser()">确 定</el-button>
		</div>
	</el-dialog>
	<!--修改用户信息弹出框-->
	<el-dialog title="修改信息" :visible.sync="dialogFormVisibleEdit">
		<el-form :model="form">
			<el-form-item label="用户名" label-width="100px">
				<el-input v-model="form.username" disabled autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" label-width="100px">
				<el-input v-model="form.email" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="手机" label-width="100px">
				<el-input v-model="form.mobile" autocomplete="off"></el-input>
			</el-form-item>

		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
			<el-button type="primary" @click="editUser()">确 定</el-button>
		</div>
	</el-dialog>
	<!--修改用户状态弹出框-->
	<el-dialog title="修改身份信息" :visible.sync="dialogFormVisibleRole">
		<el-form :model="form">
			<el-form-item label="用户名" label-width="100px">
				{{rolename}}
			</el-form-item>
			<el-form-item label="活动区域" label-width="100px">
			    <el-select v-model="roleId">
				    <el-option label="区域一" value="-1"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisibleRole = false">取 消</el-button>
			<el-button type="primary" @click="editRole()">确 定</el-button>
		</div>
	</el-dialog>
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
				}],
				dialogFormVisibleAdd: false,
				dialogFormVisibleEdit: false,
				dialogFormVisibleRole: false,

				form: {
					username: '',
					mobile: '',
					email: '',
					password: '',
				},
				//当前用户的用户名
				rolename:'',
				//当前用户的id
				roleId:-1
			}
		},
		created() {
			this.getUsers();
		},
		methods: {
			// 修改用户身份
			editRole(){

				dialogFormVisibleRole=false
				
			},
			//打开角色身份窗口
			async openRole(user){
				this.dialogFormVisibleRole = true
				const row = await this.$https.put(`users/${user.id}/role`)
//				this.rolename =  user.name
				console.log(row)
			},
			//状态开关按钮
			async onOff(user) {
				//请求路径：users/:uId/state/:type
				const row = await this.$https.put(`users/${user.id}/state/${user.mg_state}`)
				console.log(row)
			},
			// 提交编辑用户
			async editUser(id) {
				//关闭弹出框
				this.dialogFormVisibleEdit = false

				//更新用户列表
				const res = await this.$https.put(`users/${this.form.id}`, this.form)
				//提示信息
				const {
					meta: {
						msg,
						status
					}
				} = res.data
				if(status == 200) {
					this.$message.success(msg)
				}
			},
			//打开编辑窗口
			openEdit(user) {
				this.dialogFormVisibleEdit = true
				this.form = user
			},
			// 打开删除用户窗口
			openDel(id) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async() => {
					

					const res = await this.$https.delete(`users/${id}`)
					//this.pagenum = 1
					
					this.$message({
						type: 'success',
						message: res.data.meta.msg
					});
					
					this.getUsers();

				}).catch(() => {
					this.$message({
						type: 'info',
						message: res.data.meta.msg
					});
				});
			},
			//搜索用户
			searchUsers() {
				this.pagenum = 1
				this.getUsers();

			},
			// 清除搜索信息后 重新获取原用户列表
			resetUsers() {
				this.pagenum = 1
				this.getUsers();
			},
			// 显示添加用户
			showAddUsers() {
				this.dialogFormVisibleAdd = true;
			},
			// 添加用户
			async addUser() {
				//发送请求
				const res = await this.$https.post('users', this.form)
				//获取返回数据
				const {
					meta: {
						msg,
						status
					},
					data
				} = res.data
				console.log(res)
				//判断
				if(status == 201) {
					// 提示信息
					this.$message.success(msg)
					// 关闭弹出框
					this.dialogFormVisibleAdd = false;
					// 更新列表
					this.getUsers();
					// 清空form内容
					this.form = {}
				} else {
					this.$message.warning(msg)
				}
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