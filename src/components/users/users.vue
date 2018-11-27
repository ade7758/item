<template>
	<el-table :data="formdata" style="width: 100%">
		<el-table-column label="日期" width="180">
			<template slot-scope="scope">
				<i class="el-icon-time"></i>
				<span style="margin-left: 10px">{{ formdata.data }}</span>
			</template>
		</el-table-column>
		<el-table-column label="姓名" width="180">
			<template slot-scope="scope">
				<el-popover trigger="hover" placement="top">
					<p>姓名: {{ formdata.name }}</p>
					<p>住址: {{ formdata.data }}</p>
					<div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.name }}</el-tag>
					</div>
				</el-popover>
			</template>
		</el-table-column>
		<!--<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>-->
	</el-table>
</template>

<script>
	export default {
		data() {
			return {
				formdata: [{
					data: 100,
					name: 1,
				}]

			}
		}
	}
</script>

<style>

</style>