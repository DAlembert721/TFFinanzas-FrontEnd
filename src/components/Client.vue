<template>
  <v-container fluid class="py-0 px-0">
    <Slidebar></Slidebar>
    <v-row class="full">
      <v-col class="col-sm-3">
        <v-row no-gutters class="d-flex justify-center pt-10">
          <h3>{{ client.first_name + ' ' + client.last_name }}</h3>
        </v-row>
        <v-row no-gutters class="d-flex justify-center">
          <h4 class="pr-1">Línea de crédito:</h4>
          <h4>{{ client.credit_total }}</h4>
        </v-row>
        <v-row no-gutters class="mx-auto d-flex justify-center py-6">
          <v-img max-width="60%" src="@/assets/user.png"></v-img>
        </v-row>
        <v-row no-gutters class="mx-auto d-flex justify-center">
          <h3 class="pr-1">Celular:</h3>
          <h3>{{ client.phone }}</h3>
        </v-row>
        <v-row no-gutters class="mx-auto d-flex justify-center">
          <h3 class="pr-1">DNI:</h3>
          <h3>{{ client.dni }}</h3>
        </v-row>
        <v-row no-gutters class="mx-auto d-flex justify-center">
          <h3 class="pr-1">Email:</h3>
          <h3>{{ client.email }}</h3>
        </v-row>
        <v-row class="mx-auto d-flex justify-center py-5">
          <v-dialog v-model="editClientDialog" max-width="40%">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="green accent-2" v-bind="attrs" v-on="on">Editar cliente</v-btn>
            </template>
            <v-card>
              <v-card-title>Editar cliente</v-card-title>
              <v-card-text>
                <v-row>
                  <v-text-field v-model="client.first_name" label="Nombres"></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field v-model="client.last_name" label="Apellidos"></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field v-model="client.phone" label="Celular"></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field v-model="client.dni" label="DNI"></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field v-model="client.email" label="Email"></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field v-model="client.address" label="Dirección"></v-text-field>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field v-model="client.compensatory_value" label="Tasa de interés"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-select  label="Tipo tasa"></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-text-field v-model="client.payday" label="Día de pago"></v-text-field>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field v-model="client.credit_total" label="Línea de crédito"></v-text-field>
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
        <v-row class="d-flex justify-center pt-5">
          <h2 class="pr-2">Tasa de interés compensatorio: </h2>
          <h2 class="pr-2">{{ client.compensatory_value + '%' }}</h2>
          <h2>{{ client.rate_name }}</h2>
        </v-row>
        <v-row class="d-flex justify-center pb-5">
          <h2 class="pr-2">Tasa de interés moratorio: </h2>
          <h2 class="pr-2">{{ client.moratorium_value + '%' }}</h2>
          <h2>{{ client.rate_name }}</h2>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-card>
            <v-card-title>Operaciones</v-card-title>
            <v-data-table :headers="headers" :items="items" :items-per-page="10" :footer-props="{
                'items-per-page-text': 'Operaciones por página:'
              }" class="elevation-2">
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-menu</v-icon>
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
  import ClientDataService from "@/services/ClientDataService";
  import OperationDataService from "@/services/OperationDataService";
  export default {
  name: "Client",
    components: {Slidebar},
    data: () => ({
      headers: [
        { text: 'ID Operation', align: 'start', sortable: true, value: 'operationId' },
        { text: 'Fecha', value: 'operationDate', sortable: false },
        { text: 'Total Compra', value: 'total', sortable: false },
        { text: 'Total A Pagar', value: 'future', sortable: false },
        { text: 'Pagado', value: 'balance', sortable: false },
        { text: 'Detalles', value: 'actions', sortable: false }
      ],
      clientId: null,
      client: {
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        phone: '',
        dni: '',
        credit_total: 0,
        compensatory_value: 0,
        moratorium_value: 0,
        rate_id: '',
        rate_name: '',
        quotation: 1,
        open_date: '',
        maintenance: 0
      },
      bill: {
        date: '',
        operationsQuantity: 0,
        total: 0,
      },
      editClientDialog: false,
      items: [],
      operations: []
    }),
    mounted() {
      this.clientId = this.$route.params.id;
      this.getClientById();
      this.getOperations();
    },
    created() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login')
      }
    },
    methods: {
      editItem(item) {
        const id = item.operationId;
        this.$router.push(`/operations/${id}`)
      },
      getClientById() {
        ClientDataService.getClientByAccountIdAndId(this.clientId).then(response => {
          const clientResponse = response.data;
          this.client.first_name = clientResponse.first_name;
          this.client.last_name = clientResponse.last_name;
          this.client.email = clientResponse.email;
          this.client.address = clientResponse.address;
          this.client.dni = clientResponse.dni;
          this.client.compensatory_value = clientResponse.compensatory_value;
          this.client.moratorium_value = clientResponse.moratorium_value;
          this.client.rate_name = clientResponse.rate_name;
          this.client.open_date = clientResponse.open_date;
          this.client.phone = clientResponse.phone;
          this.client.credit_total = clientResponse.credit_total;
          this.client.rate_id = clientResponse.rate_id;
          this.client.maintenance = clientResponse.maintenance;
        })
        .catch(e => console.log(e));
      },
      getOperations() {
        OperationDataService.getOperationsByClientId(this.clientId)
        .then(response => {
          this.items = [];
          const values = response.data;
          values.forEach(value => {
            const operation = {
              operationId: value.id,
              operationDate: value.operation_date,
              state: value.state,
              delivery: value.delivery,
              balance: value.balance,
              future: value.future - value.maintenance,
              time: value.time,
              total: value.total,
              maintenance: value.maintenance,
              payDate: value.pay_date,
            }
            this.items.push(operation);
          })
        }).catch(e => console.log(e))
      },
    },

  }
</script>

<style scoped>
  .full {
    height: 93vh;
    display: flex;
  }
</style>
