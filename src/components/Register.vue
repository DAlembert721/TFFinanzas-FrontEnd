<template>
  <v-container fluid class="bg">
    <v-row>
      <v-card elevation="5" rounded class="mx-auto my-7" width="60%">
        <v-row>
          <v-img max-height="10%" max-width="10%" class="mx-auto my-4" src="@/assets/user.png"></v-img>
        </v-row>
        <v-card-title class="d-flex justify-center">
          Registro
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col>
                <v-text-field v-model="firstName" label="Nombres"></v-text-field>
                <v-text-field v-model="lastName" label="Apellidos"></v-text-field>
                <v-text-field v-model="dni" label="DNI"></v-text-field>
                <v-text-field v-model="phone" label="Celular"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="email" label="Email"></v-text-field>
                <v-text-field v-model="password" label="Contraseña"></v-text-field>
                <v-row>
                  <v-col>
                    <v-text-field v-model="region" label="Región"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field v-model="city" label="Provincia"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field v-model="district" label="Distrito"></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field v-model="address" label="Dirección"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-btn class="mx-auto" elevation="2" color="green accent-2">Crear cuenta</v-btn>
            </v-row>
            <v-row class="d-flex justify-center mt-3">
              ¿Ya tienes una cuenta?<a class="ml-1" @click="login()">Inicia sesión</a>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    password: '',
    region: null,
    city: null,
    district: null,
    address: ''
  }),
  methods: {
    login() {
      this.$router.push('login')
    },
    register() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        dni: this.dni,
        phone: this.phone,
        email: this.email,
        password: this.password,
        district: this.district,
        address: this.address,
        ruc: '',
        organization: ''
      }
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