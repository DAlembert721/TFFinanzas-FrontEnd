<template>
  <v-container fluid class="py-0">
    <v-row>
      <v-card width="70%">
        <v-row>
          <v-img max-height="10%" max-width="10%" class="mx-auto my-4" src="@/assets/user.png"></v-img>
        </v-row>
        <v-card-title class="d-flex justify-center">
          Iniciar sesión
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-text-field v-model="email" label="Email"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="password" label="Contraseña"></v-text-field>
            </v-row>
            <v-row>
              <v-btn class="mx-auto" elevation="2" color="green accent-2">Crear cuenta</v-btn>
            </v-row>
            <v-row class="text-center">
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
    register(){
      this.$router.push('register')
    }
  }
}
</script>

<style scoped>

</style>