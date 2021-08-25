<template>
  <div class="container">
    <br /><br />
    <button v-if="$store.state.validacion==1" class="button is-success is-small is-rounded" @click.prevent="catchData">Cargar datos anteriores</button>
    <br /><br />
    <form @submit.prevent="addJob">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputNameT">Nombre</label>
          <input
            type="nombre"
            class="form-control"
            v-model="nombre"
            id="inputNombreT"
            placeholder="Nombre del Trabajo"
          />
        </div>
        <div class="form-group col-md-6">
          <label>Fecha Límite de Entrega</label>
          <input
            type="datetime-local"
            class="form-control"
            v-model="fecha"
            id="inputDateT"
            placeholder="2021-04-06T14:24"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="inputDescription">Descripción</label>
        <input
          type="text"
          class="form-control"
          v-model="descripcion"
          id="inputDescription"
          placeholder="Explicación corta del trabajo"
        />
      </div>
      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="inputMaterial">Material</label>
          <select id="inputMaterial" class="form-control" v-model="material">
            <option selected>Choose...</option>
            <option v-for="item in materiales" v-bind:key="item.id">
              {{ item.data.nombre }}
            </option>
          </select>
        </div>
        <div class="form-group col-md-4">
          <label for="inputEncargado">Encargado del Trabajo</label>
          <select
            id="inputEncargado"
            class="form-control"
            v-model="encargado"
            @change="updtDataG"
          >
            <option selected>Choose...</option>
            <option v-for="item in empleados" v-bind:key="item.id">
              {{ item.data.nombre }}
            </option>
          </select>
        </div>
        <div class="form-group col-md-4">
          <label for="inputCliente">Cliente</label>
          <select id="inputCliente" class="form-control" v-model="cliente">
            <option selected>Choose...</option>
            <option v-for="item in clientes" v-bind:key="item.id">
              {{ item.data.nombre }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputCant">Cantidad de Material</label>
          <input
            type="float"
            class="form-control"
            v-model="cantidad"
            id="inputCant"
            placeholder="Cantidad en metros cuadrados"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputEstado">Estado</label>
          <select id="inputEstado" class="form-control" v-model="estado">
            <option selected>Choose...</option>
            <option>Asignado</option>
            <option>En Ejecución</option>
            <option>Cancelado</option>
            <option>Finalizado</option>
          </select>
        </div>
      </div>
      <br />
      <button type="submit" class="button is-success mr-4" v-if="$store.state.validacion==0">Crear</button>
      <button @click.prevent="actualizarData" class="button is-success mr-4" v-if="$store.state.validacion==1">Actualizar</button>
      <button class="button is-success" @click.prevent="RegresarP" v-if="$store.state.validacion==0">Cancelar</button>
      <button class="button is-success" @click.prevent="regresoEdit" v-if="$store.state.validacion==1">Cancelar</button>
    </form>
    <div class="box col-md-6" v-if="v_empleado">
      <ul>
        <li>Estado del Empleado</li>
        <li v-if="this.i=='0'">{{ $store.getters.getDisponibilidad }}</li>
        <li v-if="this.i=='1'">{{ $store.getters.getDisponibilidad }}</li>
        <li v-if="this.i=='2'">{{ $store.getters.getDisponibilidad }} hasta {{this.fechaR}}</li>
        <li>
          <button type="button" class="is-rounded is-success" @click.prevent="v_empleado = false">
            Entendido
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
let db = firebase.firestore();
let jobsRef = db.collection("jobs");
let empleadosRef = db.collection("empleados");
let clientesRef = db.collection("clientes");
let materialesRef = db.collection("materiales");
import moment from "moment";

export default {
  /*components:{dashboard},*/
  name: "FormTrabajo",

  mounted() {
    this.jobs = [];
    this.clientes = [];
    this.materiales = [];
    this.empleados = [];
    jobsRef
      .get()
      .then((r) =>
        r.docs.map((item) => this.jobs.push({ id: item.id, data: item.data() }))
      );
    empleadosRef
      .get()
      .then((r) =>
        r.docs.map((item) =>
          this.empleados.push({ id: item.id, data: item.data() })
        )
      );
    clientesRef
      .get()
      .then((r) =>
        r.docs.map((item) =>
          this.clientes.push({ id: item.id, data: item.data() })
        )
      );
    materialesRef
      .get()
      .then((r) =>
        r.docs.map((item) =>
          this.materiales.push({ id: item.id, data: item.data() })
        )
      );
    
  },
    /*props: {
    verify: {type:Function},
  },*/
  methods: {
    RegresarP() {
      this.$router.push({ name: "Dashboard" });
    },
    addJob() {
      jobsRef
        .add({
          nombre: this.nombre,
          descripcion: this.descripcion,
          fecha: this.fecha,
          material: this.material,
          cantidad: this.cantidad,
          encargado: this.encargado,
          cliente: this.cliente,
          estado: this.estado,
        })
        .then(() => this.$mount());
      this.nombre = "";
      this.descripcion = "";
      this.fecha = "";
      this.material = "";
      this.cantidad = "";
      this.encargado = "";
      this.cliente = "";
      this.estado = "";
      this.$router.push({ name: "Dashboard" });
    },
    updtDataG() {
      this.v_empleado = true;
      let fechaA = moment(); //.format('YYYY-MM-DDTh:mm');
      let fechaT;
      let a = 0;
      this.jobs.forEach((x) => {
        if (x.data.encargado == this.encargado) {
          if(x.data.estado == "Cancelado" || x.data.estado == "Finalizado"){
            this.$store.state.disponibilidad = "Disponible";
            this.i = 1;
          }else{
            fechaT = x.data.fecha;
            let fechaI = moment(fechaT); //.format('YYYY-MM-DDTh:mm');
            this.dif = fechaA.diff(fechaI, "days");
            if (this.dif > 0) {
              this.$store.state.disponibilidad = "Disponible";
              this.i = 1;
            } else {
              this.$store.state.disponibilidad = "Ocupado";
              this.i = 2;
            }
            console.log(this.dif);
            console.log(this.encargado);
            a = 1;
            this.fechaR = x.data.fecha;
          }
        }
      });
      if(a == 0){
            console.log("empleado libre");
            this.$store.state.disponibilidad = "Disponible";
            this.i = 0;
      }
    },
    catchData(){
        console.log("catchdata")
        if(this.$store.state.validacion == 1){
          this.jobs.forEach( (x) =>{
            if(x.id == this.$store.state.idTr){
              this.nombre = x.data.nombre
              this.descripcion = x.data.descripcion
              this.fecha = x.data.fecha
              this.material = x.data.material
              this.cantidad = x.data.cantidad
              this.encargado = x.data.encargado
              this.cliente = x.data.cliente
              this.estado = x.data.estado
            }
          });
        }
    },
    actualizarData(){
      let id = this.$store.state.idTr
      jobsRef.doc(id).update({
        nombre: this.nombre,
        descripcion: this.descripcion,
        fecha: this.fecha,
        material: this.material,
        cantidad: this.cantidad,
        encargado: this.encargado,
        cliente: this.cliente,
        estado: this.estado,
      })
      this.nombre = ""
      this.descripcion = ""
      this.fecha = ""
      this.material = ""
      this.cantidad = ""
      this.encargado = ""
      this.cliente = ""
      this.estado = ""
      this.$store.state.validacion = 0;
      this.$router.push({ name: "Dashboard" });
      
    },
    regresoEdit(){
      this.$store.state.validacion = 0;
      this.$router.push({ name: "Dashboard" });
    }
    /*enviarDatos(){
      this.$emit('escucharForm',this.fecha)
    }*/
  },
  firebase: {
    jobs: jobsRef,
    empleados: empleadosRef,
    materiales: materialesRef,
    clientes: clientesRef,
  },
  data() {
    return {
      nombre: "",
      descripcion: "",
      fecha: "",
      material: "",
      cantidad: "",
      encargado: "",
      cliente: "",
      estado: "",
      clientes: [],
      materiales: [],
      empleados: [],
      v_empleado: false,
      aux: false,
      fechaR: "",
      i: 0,
    };
  },
};
</script>

<style scoped>
.box {
  margin: 30px 0 0 16rem;
}
</style>