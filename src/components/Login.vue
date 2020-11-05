<template>
  <v-container fluid class="bg">
    <v-row>
      <v-card elevation="5" rounded class="mx-auto my-7" width="60%">
        <v-row>
          <v-img max-height="10%" max-width="10%" class="mx-auto my-4" src="@/assets/user.png"></v-img>
        </v-row>
        <v-card-title class="d-flex justify-center">
          Iniciar sesión
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col>
                <v-text-field v-model="email" label="Email"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="password" label="Contraseña"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-btn class="mx-auto" elevation="2" color="green accent-2">Crear cuenta</v-btn>
            </v-row>
            <v-row class="d-flex justify-center mt-3">
              ¿Aún no tienes una cuenta?<a class="ml-1" @click="register()">Regístrate</a>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    register() {
      this.$router.push('register')
    }
  }
}
</script>

<style scoped>
  .bg {
    height: 100%;
    width: 100%;
    background-color: #85FFBD;
    background-image: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%);
  }
</style>