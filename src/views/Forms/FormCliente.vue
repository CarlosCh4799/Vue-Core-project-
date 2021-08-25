<template>
  <div class="container">
      <br><br><br><br>
    <form @submit.prevent="addClient">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputName4">Nombre</label>
          <input
            type="text"
            class="form-control"
            v-model="nombre"
            id="inputNombreC"
            placeholder="Nombre del Cliente"
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
let clientesRef = db.collection("clientes");


export default {
  mounted() {
      this.clientes = []
      clientesRef.get()
      .then((r) => r.docs.map((item) => this.clientes.push({ id: item.id, data: item.data() })))
  },
  methods: {
    RegresarP() {
      this.$router.push({ name: "Clientes" });
    },
    addClient(){
        clientesRef.add({
        nombre:this.nombre
        }).then(()=>this.$mount())
        this.nombre = '';
        this.$router.push({ name: "Clientes" });
   },
  },
  data() {
    return {
        nombre: ""
    };
  }
};
</script>