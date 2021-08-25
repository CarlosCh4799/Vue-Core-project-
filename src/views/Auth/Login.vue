<template>
  <div class="container mt-50">
    <div class="colums">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Iniciar sesion</h3>
        <hr />
        <form action="#" @submit.prevent="login">

          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
                v-model="email"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Contraseña</label>
            <div class="control">
              <input class="input" type="password" v-model="password" />
            </div>
          </div>

          <button type="submit" class="button is-primary">Iniciar sesion</button>
        </form>
        
        <div class="notification is-danger mt-20" v-if="error">
          {{error}}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import '@/firebase/init.js'
import firebase from 'firebase'
export default {
  data() {
      return {
          email: '',
          password: '',
          error: ''
      }
  },
  name: 'Login',
  methods: {
      login(){
          this.error= ''
          if (this.email && this.password){
              firebase.auth().signInWithEmailAndPassword(this.email, this.password)
              .then(() => {
                  this.$router.push({name: 'Dashboard'})
              }).catch(err => {
                  this.error = err.message
              })
          }else{
              this.error = 'Todos los campos son obligatorios'
          }
      }
  }
};
</script>