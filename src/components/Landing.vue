<template>
  <v-container fluid class="py-0">
    <v-row>
      <v-app-bar color="grey">
        <v-img max-width="60px" aspect-ratio="1.0954" src="@/assets/logo.png"></v-img>
        <v-spacer></v-spacer>
        <v-btn @click="register()" class="mr-3">Registrarse</v-btn>
        <v-btn @click="login()">Iniciar sesión</v-btn>
      </v-app-bar>
    </v-row>
    <v-row class="align-stretch" style="background-color: yellow">
      <v-col class="container col-sm-6 d-flex flex-column align-center justify-center">
        <v-container class="d-flex flex-column align-center">
          <h1>OTORONGO</h1>
        </v-container>
        <v-container class="d-flex flex-column align-center">
          <h2>DEVORA TUS FINANZAS</h2>
        </v-container>
      </v-col>
      <v-col class="col-sm-6">
        <v-img max-width="100%" aspect-ratio="1.52363" src="@/assets/oto.jpg"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-footer class="col-sm" absolute color="green accent-2">
        <v-col class="col-sm-1 d-flex justify-center">
          <h3>Otorongo</h3>
        </v-col>
        <v-col class="d-flex justify-center">
          <h3>
            Copyright &copy; Otorongo 2020. Todos los derechos reservados
          </h3>
        </v-col>
        <v-col class="col-sm-4 d-flex justify-center">
          <v-col class="d-flex align-center">
            <v-btn fab small color="blue">
              <v-icon color="white">mdi-facebook</v-icon>
            </v-btn>
            <v-btn fab small color="red">
              <v-icon color="white">mdi-youtube</v-icon>
            </v-btn>
            <v-btn fab small color="blue lighten-2">
              <v-icon color="white">mdi-twitter</v-icon>
            </v-btn>
          </v-col>
          <v-col class="d-flex align-center">
            <v-btn rounded>Libro de reclamaciones</v-btn>
          </v-col>
        </v-col>
      </v-footer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Landing",
  methods: {
    register(){
      this.$router.push('register')
    },
    login(){
      this.$router.push({name: 'login'})
    }
  }
  }
</script>

<style scoped>

</style>
