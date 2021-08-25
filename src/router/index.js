import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Clientes from '../views/Tables/Clientes.vue'
import Empleados from '../views/Tables/Empleados.vue'
import Materiales from '../views/Tables/Materiales.vue'
import FormTrabajo from '../views/FormTrabajo.vue'
import FormEmpleado from '../views/Forms/FormEmpleado.vue'
import FormMaterial from '../views/Forms/FormMaterial.vue'
import FormCliente from '../views/Forms/FormCliente.vue'
import FiltroTareas from '../views/FiltroTareas.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: Clientes
  },
  {
    path: '/empleados',
    name: 'Empleados',
    component: Empleados
  },
  {
    path: '/materiales',
    name: 'Materiales',
    component: Materiales
  },
  {
    path: '/formtrabajo',
    name: 'FormTrabajo',
    component: FormTrabajo
  },
  {
    path: '/formempleado',
    name: 'FormEmpleado',
    component: FormEmpleado
  },
  {
    path: '/formmaterial',
    name: 'FormMaterial',
    component: FormMaterial
  },
  {
    path: '/formcliente',
    name: 'FormCliente',
    component: FormCliente
  },
  {
    path: '/filtrotareas',
    name: 'FiltroTareas',
    component: FiltroTareas
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(ruta => ruta.meta.requiresAuth)){
    const user= firebase.auth().currentUser;
    if(user){
      next();
    }else{
      next({
        name: 'Login'
      })
    }
  }else{
    next();
  }
})



export default router;
