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
                    <v-text-field v-model="client.rate_value" label="Tasa de interés"></v-text-field>
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
        <v-row class="d-flex justify-center py-5">
          <h2 class="pr-2">Tasa de interés: </h2>
          <h2 class="pr-2">{{ client.rate_value + '%' }}</h2>
          <h2>{{ client.rate_name }}</h2>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-card>
            <v-card-title>Facturas</v-card-title>
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
  import ClientDataService from "@/services/ClientDataService";
  import BillDataService from "@/services/BillDataService";
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
      clientId: null,
      client: {
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        phone: '',
        dni: '',
        credit_total: 0,
        rate_value: 0,
        rate_id: '',
        rate_name: '',
        payday: null,
        quotation: 1,
        billing_closing: '',
        maintenance: 0
      },
      bill: {
        date: '',
        operationsQuantity: 0,
        total: 0,
      },
      editClientDialog: false,
      items: [],
      bills: []
    }),
    mounted() {
      this.clientId = this.$route.params.id;
      this.getClientById();
      this.getBills();
    },
    created() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login')
      }
    },
    methods: {
      editItem(item) {
        const id = item.billId;
        this.$router.push(`/bill/${id}`)
      },
      getClientById() {
        ClientDataService.getClientByAccountIdAndId(this.clientId).then(response => {
          const clientResponse = response.data;
          this.client.first_name = clientResponse.first_name;
          this.client.last_name = clientResponse.last_name;
          this.client.email = clientResponse.email;
          this.client.address = clientResponse.address;
          this.client.dni = clientResponse.dni;
          this.client.rate_value = clientResponse.rate_value;
          this.client.rate_name = clientResponse.rate_name;
          this.client.phone = clientResponse.phone;
          this.client.credit_total = clientResponse.credit_total;
          this.client.payday = clientResponse.payday;
        })
        .catch(e => console.log(e));
      },
      getBills() {
        BillDataService.getBillByClientId(this.clientId)
        .then(response => {
          this.items = [];
          const values = response.data;
          values.forEach(value => {
            const bill = {
              billId: value.id,
              date: value.date,
              operationsQuantity: value.total,
              totalPay: value.balance
            }
            this.items.push(bill);
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
