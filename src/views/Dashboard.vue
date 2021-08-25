<template>
  <!--<div class="container buttons mt-50">
        <button class="button is-primary is-rounded is-medium">Trabajos</button>
        <button class="button is-primary is-rounded is-medium">Empleados</button>
        <button class="button is-primary is-rounded is-medium">Materiales</button>
        <button class="button is-primary is-rounded is-medium">Clientes</button>
    </div> -->

  <div>
    <br>
    <div class="container buttons mt-5">
        <button class="mr-4 button is-success is-outlined is-rounded is-normal" @click.prevent="empleados">Empleados</button>
        <button class="mr-4 button is-success is-outlined is-rounded is-normal" @click.prevent="materiales">Materiales</button>
        <button class="button is-success is-outlined is-rounded is-normal" @click.prevent="clientes">Clientes</button>
    </div>
    <br>
    <div class="btnFiltrar">
      <button class="button is-primary is-rounded is-normal" @click.prevent="worksFilter">Filtrar Tareas</button>
    </div> 
    <h5 class="container">Lista de Trabajos</h5>
    <br>
    <div class="container">
      <table class="table table-hover table-secondary">
        <thead class="has-background-primary-dark">
          <tr> 
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Fecha Limite</th>
            <th scope="col">Material</th>
            <th scope="col">Cantidad Material</th>
            <th scope="col">Encargado</th>
            <th scope="col">Cliente</th>
            <th scope="col">Estado</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in jobs" v-bind:key='item.id'>
            <th scope="row" class="text-secondary">{{item.id}}</th>
            <td>{{item.data.nombre}}</td>
            <td>{{item.data.descripcion}}</td>
            <td>{{item.data.fecha}}</td>
            <td>{{item.data.material}}</td>
            <td>{{item.data.cantidad}}</td>
            <td>{{item.data.encargado}}</td>
            <td>{{item.data.cliente}}</td>
            <td>{{item.data.estado}}</td>
            <td><button class="button is-primary is-rounded is-small is-light is-fullwidth" @click.prevent="editData(item.id)">Editar</button>
            <button class="button is-danger is-rounded is-small is-light is-fullwidth" @click="elimData(item.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br><br>
    <div class="container">
        <button class="button is-primary is-rounded is-normal" @click.prevent="frmTrabajo">Agregar Trabajo</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
let db = firebase.firestore();
let jobsRef = db.collection('jobs');
//import { provide } from 'vue'

export default {
  emits: ["fill-data"],
  methods: {
      clientes(){
          this.$router.push({name: 'Clientes'})
      },
      empleados(){
          this.$router.push({name: 'Empleados'})
      },
      materiales(){
          this.$router.push({name: 'Materiales'})
      },
      frmTrabajo(){
        this.$store.state.validacion = 0;
          this.$router.push({name: 'FormTrabajo'})
      },
      elimData(id){
        jobsRef.doc(id).delete();
      },
      editData(id){
        this.$store.state.validacion = 1;
        this.$store.state.idTr = id;
        //this.$emit("fill-data","mensaje");
        this.$router.push({name: 'FormTrabajo'});
      },
      worksFilter(){
        this.$router.push({name: 'FiltroTareas'});
      }
  },
  firebase: {
    jobs:jobsRef
  },
  mounted() {
    this.jobs=[]
    jobsRef.get()
    .then( (r) => r.docs.map((item) => this.jobs.push({id:item.id ,data:item.data()})))
  },
  data(){
    return{
      jobs:[],
      fechaAsignada: '',
      nombreAsig: '',
      dif: 0,
      calculo: false,
      valorAEnviar: null,
    }
  }
};
</script>

<style scoped>
.btnFiltrar{
  padding: 0 0 29px 8rem;
}
</style>
