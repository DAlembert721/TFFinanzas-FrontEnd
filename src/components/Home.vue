<template>
  <v-container fluid class="py-0 px-0">
    <Slidebar></Slidebar>
    <v-row>
      <v-col class="col-3">
        <v-row no-gutters class="d-flex justify-center pt-10">
          <h3>Bienvenido, {{ firstName }}</h3>
        </v-row>
        <v-row class="mx-auto d-flex justify-center py-6">
          <v-img max-width="50%" max-height="50%" src="@/assets/bodega.png"></v-img>
        </v-row>
        <v-row class="mx-auto d-flex justify-center">
          <h3>Saldo actual: {{ currentBalance }}</h3>
        </v-row>
        <v-row class="mx-auto d-flex justify-center">
          <h3>Saldo futuro: {{ futureBalance }}</h3>
        </v-row>
      </v-col>
      <v-col>
        <v-text-field label="Buscar">
          <v-icon slot="prepend" color="black">mdi-magnify</v-icon>
          <v-btn slot="append" color="green accent-2">+ Agregar cliente</v-btn>
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import Slidebar from "@/components/Slidebar";
export default {
  name: "Home",
  components: {Slidebar},
  data: () => ({
    id: 0,
    firstName: 'Prueba',
    lastName: '',
    currentBalance: 100,
    futureBalance: 150
  }),
  mounted() {
    this.id = localStorage.getItem('id')
  },
  /*created() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login')
    }
  }*/
}
</script>

<style scoped>

</style>