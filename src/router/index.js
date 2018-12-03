import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Rights from '@/components/rights/rights.vue'
import Role from '@/components/role/role.vue'

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