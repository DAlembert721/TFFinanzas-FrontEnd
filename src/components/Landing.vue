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
      <v-footer absolute color="green accent-2">
        <v-col class="col-1 d-flex justify-center">
          <h3>Otorongo</h3>
        </v-col>
        <v-col class="d-flex justify-center">
          <h3>
            Copyright &copy; Otorongo 2020. Todos los derechos reservados
          </h3>
        </v-col>
        <v-col class="col-4 d-flex justify-center">
          <v-row>
            <v-btn fab small color="blue">
              <v-icon color="white">mdi-facebook</v-icon>
            </v-btn>
            <v-btn fab small color="red">
              <v-icon color="white">mdi-youtube</v-icon>
            </v-btn>
            <v-btn fab small color="blue lighten-2">
              <v-icon color="white">mdi-twitter</v-icon>
            </v-btn>
          </v-row>
          <v-row>
            <v-btn rounded>Libro de reclamaciones</v-btn>
          </v-row>
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
      this.$router.push('login')
    }
  }
  }
</script>

<style scoped>

</style>