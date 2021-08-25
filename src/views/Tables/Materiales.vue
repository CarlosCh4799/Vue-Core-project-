<template>
    <div>
        <br><br><br> 
    <h5 class="container">Lista de Materiales</h5>
      <br><br>
    <div class="container">
      <table class="table table-hover table-secondary">
        <thead class="has-background-primary-dark">
          <tr> 
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Tipo</th>
            <th scope="col">Cantidad Disponible</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in materiales" v-bind:key='item.id'>
            <th scope="row" class="text-secondary">{{item.id}}</th>
            <td>{{item.data.nombre}}</td>
            <td>{{item.data.tipo}}</td>
            <td>{{item.data.cantidad}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br><br>
    <div class="container">
        <button class="button is-primary is-rounded is-normal mr-4" @click.prevent="RegresarP">Regresar</button>
        <button class="button is-primary is-rounded is-normal" @click.prevent="frmMaterial">Agregar Material</button>
    </div>
    </div>
</template>

<script>

import Firebase from "firebase";
let db = Firebase.firestore();
let materialesRef = db.collection("materiales");



export default {
  data() {
    return {
      materiales:[],
      
    }
  },
  firebase: {
    materiales: materialesRef
  },
  methods: {
    frmMaterial() {
      this.$router.push({ name: "FormMaterial" });
    },
    RegresarP() {
      this.$router.push({ name: "Dashboard" });
    },
  },
  mounted() {
    this.materiales=[]
    materialesRef.get()
    .then( (r) => r.docs.map((item) => this.materiales.push({id:item.id ,data:item.data()})))
  },
};
</script>