<template>
	<div id="">
		<my-bread level1='角色管理' level2="角色列表"></my-bread>
		<el-button>添加角色</el-button>
	<!--用户表单-->
	<el-table :data="tableData" style="width: 100%">
		<el-table-column type="expand" width="80">
			<template slot-scope="scope">
				<el-row v-for="(item1,index) in scope.row.children" :key="index">
					<el-col :span="4">
						<el-tag @close="delRight(scope.row,item1.id)" closable type="success">{{item1.authName}}</el-tag>
					</el-col>
					
					<el-col :span="20">
						<el-row v-for="(item2,index) in item1.children" :key="index">
							<el-col :span="4">
								<el-tag @close="delRight(scope.row,item2.id)" closable type="danger">{{item2.authName}}</el-tag>
							</el-col>
							
							<el-col :span="20" >
								<el-tag @close="delRight(scope.row,item3.id)" closable type="warning" v-for="(item3,index) in item2.children" :key="index">
									{{item3.authName}}
								</el-tag>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</template>
		</el-table-column>
		<el-table-column prop="" type="index" label="#" width="80"></el-table-column>
		<el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
		<el-table-column prop="roleDesc" label="角色描述"></el-table-column>
		<el-table-column label="操作">
			<template slot-scope='scope'>
				<el-button size="mini" @click="openEdit(scope.row)" :plain="true" type="primary" icon="el-icon-edit" circle></el-button>
				<el-button size="mini" @click="openRight(scope.row)" :plain="true" type="success" icon="el-icon-check" circle></el-button>
				<el-button size="mini" @click="openDel(scope.row.id)" :plain="true" type="danger"  icon="el-icon-delete" circle></el-button>
			</template>
		</el-table-column>
		</el-table>
	
	<!--权限管理弹出框-->
	<el-dialog
	  
	  title="权限管理"
	  :visible.sync="dialogVisibleRight"
	  width="30%">
	  <!--tree-->
		<el-tree
			ref="tree"
			default-expand-all
			:data="treeData"
			show-checkbox
			node-key="id"
			:default-checked-keys='checked'
			:props="defaultProps">
		</el-tree>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisibleRight = false">取 消</el-button>
	    <el-button type="primary" @click="setRight()">确 定</el-button>
	  </span>
	</el-dialog>
	</div>
	
</template>

<script>
	export default{
		data(){
			return {
				tableData:[],
				dialogVisibleRight : false,
				treeData:[],
				defaultProps:{
					children: "children",
					label: 'authName'
				},
				checked:[],
				roleId:-1
			}
		},
		methods:{
			//修改设置权限
			async setRight(){
				let arr1 = this.$refs.tree.getCheckedKeys()
				let arr2 = this.$refs.tree.getHalfCheckedKeys()
//				console.log(arr1,arr2)
				let arr = [...arr1,...arr2]
				

				//roles/:roleId/rights
				const res = await this.$https.post(`roles/${this.roleId}/rights`,{rids:arr.join(',')})
				
				this.dialogVisibleRight = false
				console.log(res)
				this.getRoleList()
			},
			
			//打开权限管理窗口
			async openRight(role){
				this.roleId = role.id

				this.dialogVisibleRight = true
				//获取treeData
				const res = await this.$https.get('rights/tree')
				this.treeData = res.data.data 
				// 获取选中节点
//				console.log(role)
				let arr= []
				role.children.forEach(item1=>{
					arr.push(item1.id)
					item1.children.forEach(item2=>{
						arr.push(item2.id)
						item2.children.forEach(item3=>{
							arr.push(item3.id)
						})
					})
				})
				this.checked = arr
			},
			async getRoleList(){
				const row = await this.$https.get('roles')
//				console.log(row)
				this.tableData = row.data.data
			},
			async delRight(role,rightId){
				const row = await this.$https.delete(`roles/${role.id}/rights/${rightId}`)
//				console.log(row)
				role.children = row.data.data
			}
		},
		created(){
			this.getRoleList()
		},
		
	}
</script>

<style>
</style>