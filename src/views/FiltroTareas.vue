<template>
  <div class="container">
    <br />
    <h1>Filtrar Tareas</h1>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label>Desde:</label>
        <input
          type="date"
          class="form-control"
          v-model="fechaD"
          id="inputDateT"
        />
      </div>
      <div class="form-group col-md-6">
        <label>Hasta:</label>
        <input
          type="date"
          class="form-control"
          v-model="fechaH"
          id="inputDateT"
        />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
          <label for="inputEstado">Estado:</label>
          <select id="inputEstado" class="form-control" v-model="estado">
            <option selected>Choose...</option>
            <option>Asignado</option>
            <option>En Ejecución</option>
            <option>Cancelado</option>
            <option>Finalizado</option>
          </select>
        </div>
    </div>
    <button
      class="button is-primary is-rounded is-normal"
      @click.prevent="filtrar"
    >
      Filtrar
    </button>
    <button
      class="button is-primary is-rounded is-normal"
      @click.prevent="regresarD"
    >
      Regresar
    </button>
    <br /><br />
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
          <tr v-for="item in fjobs" v-bind:key="item.id">
            <th scope="row" class="text-secondary">{{ item.id }}</th>
            <td>{{ item.data.nombre }}</td>
            <td>{{ item.data.descripcion }}</td>
            <td>{{ item.data.fecha }}</td>
            <td>{{ item.data.material }}</td>
            <td>{{ item.data.cantidad }}</td>
            <td>{{ item.data.encargado }}</td>
            <td>{{ item.data.cliente }}</td>
            <td>{{ item.data.estado }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import moment from "moment";
let db = firebase.firestore();
let jobsRef = db.collection("jobs");

export default {
  firebase: {
    jobs: jobsRef,
  },
  mounted() {
    this.jobs = [];
    jobsRef
      .get()
      .then((r) =>
        r.docs.map((item) => this.jobs.push({ id: item.id, data: item.data() }))
      );
  },
  methods: {
    regresarD() {
      this.$router.push({ name: "Dashboard" });
    },
    filtrar() {
      this.fjobs = [];
      this.jobs.forEach((x) => {
        if (
          moment(this.fechaD).isBefore(x.data.fecha) &&
          moment(this.fechaH).isSameOrAfter(x.data.fecha, "day") &&
          this.estado == x.data.estado
        ) {
          this.fjobs.push({ id: x.id, data: x.data });
        }
      });
    },
  },
  data() {
    return {
      fechaD: "",
      fechaH: "",
      estado: "",
      jobs: [],
      fjobs: [],
    };
  },
};
</script>
