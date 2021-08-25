<template>
  <div class="container">
      <br><br><br><br>
    <form @submit.prevent="addMaterial">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputName4">Nombre</label>
          <input
            type="text"
            class="form-control"
            v-model="nombre"
            id="inputNombreM"
            placeholder="Nombre del Material"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Tipo</label>
          <input
            type="text"
            class="form-control"
            v-model="tipo"
            id="inputTipo"
            placeholder="Tipo del Material"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Cantidad Disponible</label>
          <input
            type="number"
            class="form-control"
            v-model="cantidad"
            id="inputCantM"
            placeholder="Cantidad Disponible en metros cuadrados"
          />
        </div>
      </div>
      <br>
      <button type="submit" class="button is-success mr-4">Crear</button>
      <button class="button is-success" @click.prevent="RegresarP">Cancelar</button>
    </form>
  </div>
</template>

<script>
import Firebase from "firebase";
let db = Firebase.firestore();
let materialesRef = db.collection("materiales");


export default {
  mounted() {
      this.materiales = []
      materialesRef.get()
      .then((r) => r.docs.map((item) => this.materiales.push({ id: item.id, data: item.data() })))
  },
  methods: {
    RegresarP() {
      this.$router.push({ name: "Materiales" });
    },
    addMaterial(){
        materialesRef.add({
        nombre:this.nombre,
        tipo:this.tipo,
        cantidad:this.cantidad
        }).then(()=>this.$mount())
        this.nombre = '';
        this.tipo = '';
        this.cantidad = '';
        this.$router.push({ name: "Materiales" });
   },
  },
  data() {
    return {
        nombre: "",
        tipo: "",
        cantidad: ""
    };
  }
};
</script>