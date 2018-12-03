<template>
	<div>
		<my-bread level1="商品管理" level2="商品列表"></my-bread>
		<el-row>
			<el-input style="width: 600px;" @clear="resetUsers()" clearable placeholder="请输入商品信息" class="input-with-select">
				<el-button slot="append" @click='searchUsers()' icon="el-icon-search"></el-button>
			</el-input>
			<el-button type="success" @click="addGoods()" plain>添加商品</el-button>
		</el-row>
		<el-table :data="goodList" style="width: 100%">
			<el-table-column type="index" label="#" width="80"></el-table-column>
			<el-table-column prop="goods_name" label="商品名称" width="180"></el-table-column>
			<el-table-column prop="goods_price" label="商品价格"></el-table-column>
			<el-table-column prop="goods_weight" label="商品重量"></el-table-column>
			<el-table-column label="创建日期">
				<template slot-scope='scope'>
					{{ scope.row.add_time | fmtdate}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope='scope'>
					<el-button size="mini" @click="openEdit(scope.row)" :plain="true" type="primary" icon="el-icon-edit" circle></el-button>
					<el-button size="mini" @click="openDel(scope.row.id)" :plain="true" type="danger" icon="el-icon-delete" circle></el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!--分页-->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page='pagenum' :page-sizes="[2, 3, 4, 5]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
		
	</div>
</template>

<script>
	export default {
		data(){
			return {
//			total	总共商品条数	
//			pagenum	当前商品页数	
//			goods_id	商品 ID	
//			goods_name	商品名称	
//			goods_price	价格	
//			goods_number	数量	
//			goods_weight	重量	不能为空
//			goods_state	商品状态	商品状态 0: 未通过 1: 审核中 2: 已审核
//			add_time	添加时间	
//			upd_time	更新时间	
//			hot_mumber	热销品数量	
//			is_promote	是否是热销品
				query:'',
				pagenum: 1,
				pagesize: 2,
				total:-1,
				goodList:[{
					goods_name:'',
					goods_price:'',
					goods_number:'',
					goods_weight:'',
					add_time:''
				}]
				
			}
		},
		created(){
			this.getGoods()
		},
		methods:{
			async getGoods(){
				//query		查询参数	可以为空
				//pagenum	当前页码	不能为空
				//pagesize	每页显示条数	不能为空
				

				const res = await this.$https.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
				console.log(res)
				const {data:{goods,total},meta:{status,msg}} = res.data
				this.goodList = goods
				this.total= total
			},
			//每页条数
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.pagesize = val
				this.getGoods()

			},
			//当前页 
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.pagenum = val
				this.getGoods()
			},
			
			addGoods(){
				this.$router.push({name:'add'})
			}
		}
	}
</script>

<style>

</style>