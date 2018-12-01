<template>
	<div id="">
		<my-bread level1='角色管理' level2="角色列表"></my-bread>
		<el-button>添加角色</el-button>
	<!--用户表单-->
	<el-table :data="tableData" style="width: 100%">
		<el-table-column type="expand" width="80">
			<template slot-scope="scope">
				<el-row v-for="(item1,index) in scope.row.children" :key="index">
					<el-col>
						<el-tag>{{item1.authName}}</el-tag>
					</el-col>
					<el-col>
						<el-row v-for="(item2,index) in scope.row.children.children" :key="index">
							<el-col>
								<el-tag>{{item2.authName}}</el-tag>
							</el-col>
							<el-col>
								<el-tag></el-tag>
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
				<el-button size="mini" @click="openRole(scope.row)" :plain="true" type="success" icon="el-icon-check" circle></el-button>
				<el-button size="mini" @click="openDel(scope.row.id)" :plain="true" type="danger"  icon="el-icon-delete" circle></el-button>
			</template>
		</el-table-column>
		</el-table>
	</div>
	
</template>

<script>
	export default{
		data(){
			return {
				tableData:[]
			}
		},
		methods:{
			async getRoleList(){
				const row = await this.$https.get('roles')
				console.log(row)
				this.tableData = row.data.data
			}
		},
		created(){
			this.getRoleList()
		},
		
	}
</script>

<style>
</style>