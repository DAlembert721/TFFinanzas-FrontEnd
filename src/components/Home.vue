<template>
  <v-container fluid class="py-0">
    <v-row>
      <v-app-bar color="grey">
        Logo
        <v-spacer></v-spacer>
        <v-btn @click="register()" class="mr-3">Registrarse</v-btn>
        <v-btn @click="login()">Iniciar sesión</v-btn>
      </v-app-bar>
    </v-row>
    <v-row>
      f
    </v-row>
    <v-row>
      <v-footer absolute color="cyan">
        Otorongo
      </v-footer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  methods: {
    register(){
      this.$router.push('register')
    },
    login(){
      this.$router.push('login')
    }
  }
}
</script>

<style scoped>

</style>