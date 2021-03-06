import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Rights from '@/components/rights/rights.vue'
import Role from '@/components/role/role.vue'
import Goods from '@/components/goods/goods.vue'
import Add from '@/components/goods/add.vue'

Vue.use(Router)

const route = new Router({
	routes: [{
			name: 'login',
			path: '/login',
			component: Login
		},
		{
			name: "home",
			path: '/',
			component: Home,
			children: [{
				name: 'users',
				path: '/users',
				component: Users
			}, {
				name: 'rights',
				path: '/rights',
				component: Rights
			}, {
				name: 'roles',
				path: '/roles',
				component: Role
			},{
				name: 'goods',
				path: '/goods',
				component: Goods
			},
			{
				name: 'add',
				path: '/add',
				component: Add
			},]
		}
	]
})

route.beforeEach((to,form,next)=>{
	if(to.path === '/login'){
		next()	
	}else{
		const token = localStorage.getItem('token')
		if(!token){
			route.push({name:'login'})
			return
		}
		next()
	}
})

export default route