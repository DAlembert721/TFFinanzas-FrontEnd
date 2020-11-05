<template>
  <v-container fluid class="py-0 px-0">
    <Slidebar></Slidebar>
    <v-row>
      <v-col class="col-sm-3">
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
      <v-col class="col-sm-9">
        <v-card>
          <v-card-title>
            Clientes
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                          hide-details>
              <v-btn class="md12 hidden-sm-and-down" slot="append" color="green accent-2">+ Agregar cliente</v-btn>
              <v-btn class="sm12 hidden-md-and-up" slot="append" color="green accent-2" small>+</v-btn>
            </v-text-field>
          </v-card-title>
          <v-data-table
              :headers="headers"
              :items="desserts"
              :search="search"
              :footer-props="{
                nextIcon: 'mdi-plus', 'items-per-page-text': 'Clientes por página:'
               }"
          ></v-data-table>
        </v-card>
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
      headers: [
        { text: 'Nombre', align: 'start', sortable: true, value: 'firstName' },
        { text: 'Línea de crédito', value: 'creditLine', sortable: false },
        { text: 'DNI', value: 'dni', sortable: false },
        { text: 'Número telefónico', value: 'phone', sortable: false },
        { text: 'Fecha de pago', value: 'payday', sortable: false }
      ],
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