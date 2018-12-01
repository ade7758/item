<template>
	<div id="">
		<!--面包屑-->
		<my-bread level1="角色管理" level2="权限列表"></my-bread>
		<el-table :data="tableData" style="width: 100%" height="460px">
			<el-table-column label="#" type="index" width="180">
			</el-table-column>
			<el-table-column prop="authName" label="权限名称" width="180">
			</el-table-column>
			<el-table-column prop="path" label="路径">
			</el-table-column>
			<el-table-column prop="level" label="层级">
				<template slot-scope="scope">
					<span v-if="scope.row.level=='0'">一级</span>
					<span v-if="scope.row.level=='1'">二级</span>
					<span v-if="scope.row.level=='2'">三级</span>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				tableData:[]
			}
		},
		methods:{
			async getRightList(){
				const row = await this.$https.get('rights/list')
				console.log(row)
				this.tableData = row.data.data
			}
		},
		created(){
			this.getRightList()
		},
		
		
		

	}
</script>

<style>

</style>