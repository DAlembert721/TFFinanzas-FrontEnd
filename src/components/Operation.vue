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
              <v-btn color="green accent-2" v-bind="attrs" v-on="on">Editar cliente</v-btn>
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
              <template v-slot:item.actions>
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
              </template>
            </v-data-table>
          </v-card>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-dialog v-model="addOperation" max-width="40%">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ma-5" small v-bind="attrs" v-on="on" color="green accent-2">+ Añadir operación</v-btn>
            </template>
            <v-card>
              <v-card-title>Añadir operación</v-card-title>
              <v-card-text>
                <v-row class="d-flex align-center">
                  <v-col class="col-sm-7">
                    <v-select label="Buscar producto" :items="products"></v-select>
                  </v-col>
                  <v-col class="col-sm-3">
                    <v-text-field label="Cantidad"></v-text-field>
                  </v-col>
                  <v-col class="col-sm-2">
                    <v-btn small color="green accent-2">+</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-data-table :headers="operationDetailHeaders" :items="productsSelected" :items-per-page="10" :footer-props="{
                      'items-per-page-text': 'Productos por página:'
                    }" class="elevation-2">
                  </v-data-table>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green accent-2" @click="addOperation = false">Añadir</v-btn>
                <v-btn color="green accent-2" @click="addOperation = false">Cancelar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Slidebar from "@/components/Slidebar";

export default {
  name: "Operation",
  components: {Slidebar},
  data: () => ({
    headers: [
      {text: 'ID Operación', align: 'start', sortable: true, value: 'operationId'},
      {text: 'Fecha', value: 'date', sortable: false},
      {text: 'Capital', value: 'capital', sortable: false},
      {text: 'Saldo final', value: 'finalBalance', sortable: false},
      {text: 'Detalles', value: 'actions', sortable: false}
    ],
    operationDetailHeaders: [
      {text: 'Nombre de producto', align: 'start', sortable: true, value: 'productName'},
      {text: 'Costo por unidad', value: 'unitCost', sortable: false},
      {text: 'Unidad', value: 'unitOfMeasure', sortable: false},
      {text: 'Cantidad', value: 'quantity', sortable: false},
    ],
    firstName: 'Matías',
    lastName: 'Prado Rosales',
    creditLine: 0,
    phone: '987654321',
    dni: '9876543',
    email: 'faraonloveshady@email.com',
    rateValue: 8,
    rateName: 'TEA',
    addOperation: false,
    operationDetails: false,
    items: [{operationId: 1, date: '05/11/2020', capital: 2, finalBalance: 13}],
    operationItems: [],
    products: [],
    productsSelected: []
  }),
  methods: {}
}
</script>

<style scoped>
.full {
  height: 93vh;
  display: flex;
}
</style>