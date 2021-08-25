<template>
    <div>
        <br><br><br> 
    <h5 class="container">Lista de Clientes</h5>
      <br><br>
    <div class="container">
      <table class="table table-hover table-secondary">
        <thead class="has-background-primary-dark">
          <tr> 
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in clientes" v-bind:key='item.id'>
            <th scope="row" class="text-secondary">{{item.id}}</th>
            <td>{{item.data.nombre}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br><br>
    <div class="container">
        <button class="button is-primary is-rounded is-normal mr-4" @click.prevent="RegresarP">Regresar</button>
        <button class="button is-primary is-rounded is-normal" @click.prevent="frmCliente">Agregar Cliente</button>
    </div>
    </div>
</template>

<script>

import Firebase from "firebase";
let db = Firebase.firestore();
let clientesRef = db.collection("clientes");



export default {
  data() {
    return {
      clientes:[],
      
    }
  },
  firebase: {
    clientes: clientesRef
  },
  methods: {
    frmCliente() {
      this.$router.push({ name: "FormCliente" });
    },
    RegresarP() {
      this.$router.push({ name: "Dashboard" });
    },
  },
  mounted() {
    this.clientes=[]
    clientesRef.get()
    .then( (r) => r.docs.map((item) => this.clientes.push({id:item.id ,data:item.data()})))
  },
};
</script>