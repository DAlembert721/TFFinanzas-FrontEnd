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
          <h3>{{ companyName }}</h3>
        </v-row>
        <v-row class="mx-auto d-flex justify-center">
          <h3>RUC: {{ ruc }}</h3>
        </v-row>
      </v-col>
      <v-col class="col-sm-9">
        <v-card>
          <v-card-title>
            Clientes
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                          hide-details>
              <v-dialog slot="append" v-model="addClient" max-width="60%">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="md12 hidden-sm-and-down" color="green accent-2" v-bind="attrs"
                         v-on="on">+ Agregar cliente</v-btn>
                  <v-btn class="sm12 hidden-md-and-up" color="green accent-2" v-bind="attrs"
                         v-on="on" small>+</v-btn>
                </template>
                <v-card>
                  <v-card-title>Agregar cliente</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col class="col-sm-5">
                        <v-row>
                          <v-text-field label="Nombre"></v-text-field>
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
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="col-sm-5">
                        <v-row>
                          <v-text-field label="Email"></v-text-field>
                        </v-row>
                        <v-row>
                          <v-text-field label="Dirección"></v-text-field>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field label="Línea de crédito"></v-text-field>
                          </v-col>
                          <v-col>
                            <v-select label="Soles"></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field label="Tasa de interés"></v-text-field>
                          </v-col>
                          <v-col>
                            <v-select label="Tipo tasa"></v-select>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-spacer></v-spacer>
                      <v-text-field type="date" label="Día de pago"></v-text-field>
                      <v-spacer></v-spacer>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green accent-2" @click="addClient = false">Agregar</v-btn>
                    <v-btn color="green accent-2" @click="addClient = false">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-text-field>
          </v-card-title>
          <v-data-table
              :headers="headers"
              :items="desserts"
              :search="search"
              :footer-props="{
                'items-per-page-text': 'Clientes por página:'
              }"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Slidebar from "@/components/Slidebar";
  import ClientDataService from "@/services/ClientDataService";

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
      companyName: 'Mi empresa',
      ruc: '098765432111',
      addClient: false,
      clients: [],
    }),
    mounted() {
      this.id = localStorage.getItem('id')
      this.getClientsByAccount();
    },
    created() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login')
      }

    },
    methods: {
      getClientsByAccount() {
        ClientDataService.getClients()
                .then(response => {
                  this.clients = response.data;
                  console.log(this.clients);
                })
                .catch(e => {
                  console.log(e);
                })
      }
    }

  }
</script>

<style scoped>

</style>
