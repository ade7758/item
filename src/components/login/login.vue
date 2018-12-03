<template>
	<div class="login_wrap">
		<el-form class="login_form" label-position="top" label-width="80px" :model="formdata">
			<h2>用户登陆</h2>
			<el-form-item label="用户名">
				<el-input v-model="formdata.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="formdata.password"></el-input>
			</el-form-item>
			<el-button @click.prevent="getUser()" style="width: 100%;" center type="primary">登陆</el-button>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formdata: {
					username: '',
					password: '',
				}
			}
		},
		methods:{
			async getUser(){
//				ES7的新写法
			const res =	await this.$https.post('login',this.formdata)
				
					const {meta,data} = res.data
					if(meta.status==200){
						const token = localStorage.setItem('token',data.token)
						this.$message({
				          message: meta.msg,
				          type: 'success'
				        });
						this.$router.push({name:'home'})
					}
				
//				this.$https.post('login',this.formdata)
//				.then((res)=>{
//					
//					const {meta,data} = res.data
//					if(meta.status==200){
//						this.$message({
//				          message: meta.msg,
//				          type: 'success'
//				        });
//						this.$router.push({name:'home'})
//					}
//				})
				
				
				
			}
		}
	}
</script>

<style>
.login_wrap{
	height: 100%;
	background-color: #42b297;
	display: flex;
	justify-content: center;
	align-items: center;
}
.login_wrap .login_form{
	width: 400px;
	background-color: #fff;
	border-radius: 5px;
	padding: 20px;
}
</style>