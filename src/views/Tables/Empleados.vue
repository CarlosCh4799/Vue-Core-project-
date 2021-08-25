<template>
  <div>
    <br /><br /><br />
    <h5 class="container">Lista de Empleados</h5>
    <br /><br />
    <div class="container">
      <table class="table table-hover table-secondary">
        <thead class="has-background-primary-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Area de Trabajo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in empleados" v-bind:key='item.id'>
            <th scope="row" class="text-secondary">{{item.id}}</th>
            <td>{{item.data.nombre}}</td>
            <td>{{item.data.area}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br /><br />
    <div class="container">
      <button
        class="button is-primary is-rounded is-normal mr-4"
        @click.prevent="RegresarP"
      >
        Regresar
      </button>
      <button
        class="button is-primary is-rounded is-normal"
        @click.prevent="frmEmpleado"
      >
        Agregar Empleado
      </button>
    </div>
  </div>
</template>

<script>

import Firebase from "firebase";
let db = Firebase.firestore();
let empleadosRef = db.collection("empleados");



export default {
  data() {
    return {
      empleados:[],
      
    }
  },
  firebase: {
    empleados: empleadosRef
  },
  methods: {
    frmEmpleado() {
      this.$router.push({ name: "FormEmpleado" });
    },
    RegresarP() {
      this.$router.push({ name: "Dashboard" });
    },
  },
  mounted() {
    this.empleados=[]
    empleadosRef.get()
    .then( (r) => r.docs.map((item) => this.empleados.push({id:item.id ,data:item.data()})))
  },
};
</script>