<template>
	<div>
		<el-button type="success" style="width: 100%" plain disabled>添加商品</el-button>
		<el-steps class='active' :space="200" :active="active*1" finish-status="success">
			<el-step title="基本信息"></el-step>
			<el-step title="商品参数"></el-step>
			<el-step title="商品属性"></el-step>
			<el-step title="商品图片"></el-step>
			<el-step title="商品内容"></el-step>
		</el-steps>
		<el-form label-position="top" :model="form" label-width="80px" style="height: 400px;overflow: auto;">
			<el-tabs v-model="active" tab-position="left" style="height: 500px;">
				<el-tab-pane label="基本信息" name="1">
					<el-form-item label="商品名称">
						<el-input v-model="form.goods_name"></el-input>
					</el-form-item>
					<el-form-item label="商品价格">
						<el-input v-model="form.goods_price"></el-input>
					</el-form-item>
					<el-form-item label="商品重量">
						<el-input v-model="form.goods_weight"></el-input>
					</el-form-item>
					<el-form-item label="商品数量">
						<el-input v-model="form.goods_number"></el-input>
					</el-form-item>
					
					<el-cascader :options="options" v-model="selectedOptions" @change="handleChange">
					</el-cascader>
				</el-tab-pane>

				<el-tab-pane label="商品参数" name="2">商品参数</el-tab-pane>
				<el-tab-pane label="商品属性" name="3">商品属性</el-tab-pane>
				<el-tab-pane label="商品图片" name="4">商品图片</el-tab-pane>
				<el-tab-pane label="商品内容" name="5">商品内容</el-tab-pane>
			</el-tabs>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active: '1',
				form: {
					goods_name: '',
					goods_cat: '',
					goods_price: '',
					goods_number: '',
					goods_weight: '',
					goods_introduce: '',
					pics: '',
					attrs: ''
				},
				options: [{
						value: 1 - 1,
						label: 1 - 1,
						children: [{
							value: 1 - 2,
							label: 1 - 2,
							children: [{
								value: 1 - 3,
								label: 1 - 3,
							}, {
								value: 1 - 3 - 2,
								label: 1 - 3 - 2,
							}]
						}]
					},
					{
						value: 2 - 1,
						label: 2 - 1,
						children: [{
							value: 2 - 2,
							label: 2 - 2,
							children: [{
								value: 2 - 3 - 1,
								label: 2 - 3 - 1,
							}, {
								value: 2 - 3 - 2,
								label: 2 - 3 - 2,
							}]
						}]
					}
				],
				selectedOptions: []
			}

		},
		created(){
			this.getGoodsCate()
		},
		methods: {
			async getGoodsCate(){
				const res = await this.$https.get(`categories?type=3`)
				console.log(res)
				
				this.selectedOption = res.data.data
			}
		}
	}
</script>

<style>
	.active {
		margin: 20px 0;
	}
</style>