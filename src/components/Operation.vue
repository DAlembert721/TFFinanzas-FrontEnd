<template>
  <v-container fluid class="py-0 px-0">
    <Slidebar></Slidebar>
    <v-row class="full">
      <v-spacer></v-spacer>
      <v-col class="col-sm-8">
        <v-row class="d-flex justify-center">
          <v-card>
            <v-card-title>Detalles de la operación</v-card-title>
            <v-card-text class="mx-5">
              <v-row>
                <h3 class="pr-2">ID Operación:</h3>
                <h3 class="pr-2">{{ operation.id }}</h3>
              </v-row>
              <v-row>
                <h3 class="pr-2">Fecha:</h3>
                <h3 class="pr-2">{{ operation.operation_date }}</h3>
              </v-row>
              <v-row>
                <h3 class="pr-2">Total:</h3>
                <h3 class="pr-2">{{ operation.balance }}</h3>
              </v-row>
              <v-row>
                <h3 class="pr-2">Saldo final: </h3>
                <h3 class="pr-2">{{ operation.future }}</h3>
              </v-row>
              <v-row>
                <h2>Productos:</h2>
              </v-row>
              <v-row class="mt-5">
                <v-data-table :headers="headers" :items="items" :items-per-page="10" :footer-props="{
                'items-per-page-text': 'Productos por página:'}" class="elevation-2">
                  <!--<template v-slot:item.actions>
                    <v-dialog v-model="operationDetails" max-width="30%">
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon class="mr-2" v-bind="attrs" v-on="on">mdi-dots-horizontal</v-icon>
                      </template>
                      <v-card>
                        <v-card-title>Detalles completos</v-card-title>
                        <v-card-text>
                          <v-row>
                            <strong>ID Operación:</strong> {{ operationId }}
                          </v-row>
                          <v-row>
                            <strong>Fecha:</strong> {{ date }}
                          </v-row>
                          <v-row>
                            <strong>Capital:</strong> {{ capital }}
                          </v-row>
                          <v-row>
                            <strong>Saldo final:</strong> {{ finalBalance }}
                          </v-row>
                          <v-row class="mt-5">
                            <v-data-table :headers="operationDetailHeaders" :items="operationItems" :items-per-page="10" :footer-props="{
                            'items-per-page-text': 'Productos por página:'
                          }" class="elevation-2">
                            </v-data-table>
                          </v-row>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="green accent-2" @click="operationDetails = false">Cerrar</v-btn>
                          <v-btn color="green accent-2" @click="operationDetails = false">Imprimir</v-btn>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>-->
                </v-data-table>
              </v-row>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import Slidebar from "@/components/Slidebar";
import OperationDataService from "@/services/OperationDataService";

export default {
  name: "Operation",
  components: {Slidebar},
  data: () => ({
    headers: [
      {text: 'Nombre de producto', align: 'start', sortable: true, value: 'product_name'},
      {text: 'Costo por unidad', value: 'unit_cost', sortable: false},
      {text: 'Unidad', value: 'measurement', sortable: false},
      {text: 'Cantidad', value: 'quantity', sortable: false},
      {text: 'Total', value: 'total', sortable: false}
    ],
    operation: null,
    addOperation: false,
    operationDetails: false,
    items: [],
  }),
  mounted() {
    this.clientId = this.$route.params.clientId;
    this.operationId = this.$route.params.operationId;
    this.getProductsByOperationId();
    this.getOperationByClientId();
  },
  created() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login')
    }
  },
  methods: {
    getProductsByOperationId(){
      OperationDataService.getProductsByOperationId(this.operationId).then(response => {
        this.items = response.data;
      }).catch((e) => console.log(e));
    },
    getOperationByClientId(){
      OperationDataService.getOperationByClientId(this.clientId, this.operationId).then(response => {
        this.operation = response.data;
      })
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