<template>
  <div class="container">
    <br /><br /><br /><br />
    <form @submit.prevent="addEmployee">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputNameE">Nombre</label>
          <input
            type="text"
            class="form-control"
            v-model="nombre"
            id="inputNombreT"
            placeholder="Nombre del Empleado"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputATrabajo">Área de Trabajo</label>
          <input
            type="text"
            class="form-control"
            v-model="area"
            id="inputATrabajo"
            placeholder="Especialización del Empleado"
          />
        </div>
      </div>
      <br />
      <button type="submit" class="button is-success mr-4">Crear</button>
      <button class="button is-success" @click.prevent="RegresarP">
        Cancelar
      </button>
    </form>
  </div>
</template>

<script>
import Firebase from "firebase";
let db = Firebase.firestore();
let empleadosRef = db.collection("empleados");


export default {
  mounted() {
      this.empleados = []
      empleadosRef.get()
      .then((r) => r.docs.map((item) => this.empleados.push({ id: item.id, data: item.data() })))
  },
  methods: {
    RegresarP() {
      this.$router.push({ name: "Empleados" });
    },
    addEmployee(){
        empleadosRef.add({
        nombre:this.nombre,
        area:this.area
        }).then(()=>this.$mount())
        this.nombre = '';
        this.area = '';
        this.$router.push({ name: "Empleados" });
   },
  },
  data() {
    return {
        nombre: "",
        area: ""
    };
  }
};
</script>