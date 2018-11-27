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
		
		
		<el-container>
			 <!--侧边栏-->
			<el-aside class="aside" width="200px">
				<el-menu 
					:router='true'
					:unique-opened="true"
					default-active="2" class="el-menu-vertical-demo" >
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>用户管理</span>
						</template>
						<el-menu-item index="users">用户列表</el-menu-item>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>导航一</span>
						</template>
						<el-menu-item index="1-1">选项1</el-menu-item>
						<el-menu-item index="1-1">选项1</el-menu-item>
						<el-menu-item index="1-1">选项1</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>导航一</span>
						</template>
						<el-menu-item index="1-1">选项1</el-menu-item>
						<el-menu-item index="1-1">选项1</el-menu-item>
						<el-menu-item index="1-1">选项1</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>导航一</span>
						</template>
						<el-menu-item index="1-1">选项1</el-menu-item>
						<el-menu-item index="1-1">选项1</el-menu-item>
						<el-menu-item index="1-1">选项1</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>导航一</span>
						</template>
						<el-menu-item index="1-1">选项1</el-menu-item>
						<el-menu-item index="1-1">选项1</el-menu-item>
						<el-menu-item index="1-1">选项1</el-menu-item>
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
		beforeCreate(){
			const token = localStorage.getItem('token')
			if(!token){
				this.$router.push({name:'login'})
			}
		},
		methods:{
			logout(){
				localStorage.clear()
				this.$router.push({name:'login'})
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