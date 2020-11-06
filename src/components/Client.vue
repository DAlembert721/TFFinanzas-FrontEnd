<template>
  <v-container fluid class="py-0 px-0">
    <Slidebar></Slidebar>
    <v-row class="full">
      <v-col class="col-sm-3">
        <v-row no-gutters class="d-flex justify-center pt-10">
          <h3>{{ firstName + ' ' + lastName }}</h3>
        </v-row>
        <v-row no-gutters class="d-flex justify-center">
          <h4 class="pr-1">Línea de crédito:</h4>
          <h4>{{ creditLine }}</h4>
        </v-row>
        <v-row no-gutters class="mx-auto d-flex justify-center py-6">
          <v-img max-width="60%" src="@/assets/user.png"></v-img>
        </v-row>
        <v-row no-gutters class="mx-auto d-flex justify-center">
          <h3 class="pr-1">Celular:</h3>
          <h3>{{ phone }}</h3>
        </v-row>
        <v-row no-gutters class="mx-auto d-flex justify-center">
          <h3 class="pr-1">DNI:</h3>
          <h3>{{ dni }}</h3>
        </v-row>
        <v-row no-gutters class="mx-auto d-flex justify-center">
          <h3 class="pr-1">Email:</h3>
          <h3>{{ email }}</h3>
        </v-row>
        <v-row class="mx-auto d-flex justify-center py-5">
          <v-dialog v-model="editClient" max-width="40%">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="green accent-2" v-bind="attrs" v-on="on">Editar perfil</v-btn>
            </template>
            <v-card>
              <v-card-title>Editar cliente</v-card-title>
              <v-card-text>
                <v-row>
                  <v-text-field label="Nombres"></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field label="Apellidos"></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field label="Celular"></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field label="DNI"></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field label="Email"></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field label="Dirección"></v-text-field>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field label="Tasa de interés"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-select label="Tipo tasa"></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-text-field label="Día de pago"></v-text-field>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field label="Línea de crédito"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-select label="Moneda"></v-select>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green accent-2" @click="editClient = false">Cancelar</v-btn>
                <v-btn color="green accent-2" @click="editClient = false">Eliminar</v-btn>
                <v-btn color="green accent-2" @click="editClient = false">Guardar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
      <v-col class="col-sm-9">
        <v-row class="d-flex justify-center py-5">
          <h2 class="pr-2">Tasa de interés: </h2>
          <h2 class="pr-2">{{ rateValue + '%' }}</h2>
          <h2>{{ rateName }}</h2>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-card>
            <v-card-title></v-card-title>
            <v-data-table :headers="headers" :items="items" :items-per-page="10" :footer-props="{
                'items-per-page-text': 'Facturas por página:'
              }" class="elevation-2">
              <template v-slot:item.actions="{ item }">
                <v-icon class="mr-2" @click="editItem(item)">mdi-dots-horizontal</v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Slidebar from "@/components/Slidebar";
  export default {
  name: "Client",
    components: {Slidebar},
    data: () => ({
      headers: [
        { text: 'ID Factura', align: 'start', sortable: true, value: 'billId' },
        { text: 'Fecha', value: 'date', sortable: false },
        { text: 'Cantidad de operaciones', value: 'operationsQuantity', sortable: false },
        { text: 'Pago total', value: 'totalPay', sortable: false },
        { text: 'Detalles', value: 'actions', sortable: false }
      ],
      firstName: 'Matías',
      lastName: 'Prado Rosales',
      creditLine: 0,
      phone: '987654321',
      dni: '9876543',
      email: 'faraonloveshady@email.com',
      rateValue: 8,
      rateName: 'TEA',
      editClient: false,
      items: [ { billId: 1, date: '05/11/2020', operationsQuantity: 2, totalPay: 13 }]
    }),
    methods: {
      editItem(id) {
        console.log(id)
      }
    }
  }
</script>

<style scoped>
  .full {
    height: 93vh;
    display: flex;
  }
</style>