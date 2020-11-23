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
                <h3 class="pr-2">{{ operation.total }}</h3>
              </v-row>
              <v-row>
                <h3 class="pr-2">A pagar: </h3>
                <h3 class="pr-2">{{ operation.future }}</h3>
              </v-row>
              <v-row>
                <h3 class="pr-2">Plazo de pago: </h3>
                <h3 class="pr-2">{{ operation.time }} días</h3>
              </v-row>
              <v-row>
                <h3 class="pr-2">Delivery: </h3>
                <h3 class="pr-2">{{ operation.delivery }}</h3>
              </v-row>
              <v-row v-if="!(operation.maintenance == 0)">
                <h3 class="pr-2">Mantenimiento: </h3>
                <h3 class="pr-2">{{ operation.maintenance }}</h3>
              </v-row>
              <v-spacer></v-spacer>
              <v-row class="mt-3">
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
        <v-row class="mt-5 justify-center">
          <v-btn @click="exportPdf" color="green accent-2"> Exportar Boleta</v-btn>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import Slidebar from "@/components/Slidebar";
import OperationDataService from "@/services/OperationDataService";
import JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

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
      OperationDataService.getOperationByClientIdAndId(this.clientId, this.operationId).then(response => {
        this.operation = response.data;
      })
    },
    exportPdf() {
      let columns = ['Nombre de Producto', 'Costo por unidad', 'Unidad', 'Cantidad', 'Total'];
      let doc = new JsPDF()
      let y = 0
      let items = []
      this.items.forEach(product => {
        const array = [`${product.product_name}`, `${product.unit_cost}`, `${product.measurement}`, `${product.quantity}`, `${product.total}`]
        items.push(array)
      })
      doc.text(`ID Operacion: ${this.operation.id}`, 10, y+=10)
      doc.text(`Fecha: ${this.operation.operation_date}`, 10, y+=10)
      doc.text(`Plazo de Pago: ${this.operation.time}`, 10, y+=10)
      doc.text(`Total: ${this.operation.total}`, 10, y+=10)
      doc.text(`A pagar: ${this.operation.future}`, 10, y+=10)
      doc.text(`Delivery: ${this.operation.delivery}`, 10, y+=10)
      if (this.operation.maintenance > 0) {
        doc.text(`Maintenance: ${this.operation.maintenance}`, 10, y+=10)
      }
      if (this.payed > 0) {
        doc.text(`Monto Pagado: ${this.operation.payed}`, 10, y+=10)
      }
      autoTable(doc, {head: [columns], body: items, margin: {top: y+10, bottom: 20}})
      doc.save(`boleta-operation-${this.operation.id}-${this.operation.operation_date}.pdf`)
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
