<template>
	<el-container class="container">
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
			<el-aside class="aside" width="200px">
				<el-menu 
					:unique-opened="true"
					default-active="2" class="el-menu-vertical-demo" >
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>导航一</span>
						</template>
						<el-menu-item index="1-1">选项1</el-menu-item>
						<el-menu-item index="1-1">选项1</el-menu-item>
						<el-menu-item index="1-1">选项1</el-menu-item>
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
			<el-main class="main">
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
		data(){
			return {
				formdata :
					[{data:100,
					name:1,
					}
					]
				
			}
		}
	}
</script>

<style>
	.container {
		height: 100%;
	}
	
	.header {
		background-color: #777;
	}
	
	.aside {
		background-color: #888;
	}
	
	.main {
		background-color: #999;
	}
	
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