<template>
	<el-container class="container">
		<!--顶部-->
		<el-header class="header">
			<el-row>
				<el-col :span="4">
					<img src="../../assets/logo.png" />
				</el-col>
				<el-col :span="18" class="title">
					<h2>用户列表</h2>
				</el-col>
				<el-col :span="2" class="btn">
					<el-button @click='logout()' type="info">退出登录</el-button>
				</el-col>
			</el-row>
		</el-header>
		<!--侧边导航栏-->
		<el-container>
			<!--侧边栏-->
			<el-aside class="aside" width="200px">
				<el-menu :router='true' :unique-opened="true" default-active="2" class="el-menu-vertical-demo">
					<el-submenu v-for="(item1,i) in menus" :key="i" :index="''+item1.order">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>{{item1.authName}}</span>
						</template>
						<el-menu-item v-for="(item2,index) in item1.children" :key="index" :index="''+item2.path ">
							<span>{{item2.authName}}</span>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>

			<!--内容-->
			<el-main class="main">
				<router-view/>
			</el-main>
		</el-container>
	
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				menus: []
			}
		},
		beforeCreate() {
//			const token = localStorage.getItem('token')
//			if(!token) {
//				this.$router.push({name: 'login'})
//			}
		},
		created() {
			this.getMenus()
		},
		methods: {
			async getMenus() {
				const res = await this.$https.get(`menus`)
//				console.log(res)
				this.menus = res.data.data
			},
			logout() {
				localStorage.clear()
				this.$router.push({
					name: 'login'
				})
			}
		},

	}
</script>

<style>
	.container {
		height: 100%;
	}
	
	.header {
		background-color: floralwhite;
	}
	/*
	.aside {
		background-color: #888;
	}
	
	.main {
		background-color: #999;
	}*/
	
	.title {
		line-height: 60px;
		text-align: center;
	}
	
	.btn {
		height: 60px;
		display: flex;
		align-items: center;
	}
</style>