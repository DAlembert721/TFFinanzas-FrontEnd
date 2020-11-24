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
                <v-row no-gutters class="mx-auto d-flex justify-center">
                    <h3 class="pr-1">Tipo de cuenta:</h3>
                    <h3>{{ client.currency }}</h3>
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
                                    <v-text-field v-model="client.address" label="Dirección"></v-text-field>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field v-model="client.compensatory_value"
                                                      label="Tasa de interés compensatorio"
                                                      :rules="numberRule"
                                                      error-count="2"
                                                      type="number"></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field v-model="client.moratorium_value"
                                                      :rules="numberRule"
                                                      error-count="2"
                                                      type="number"
                                                      label="Tasa de interés moratorio"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-text-field v-model="client.credit_total"
                                                  type="number"
                                                  :rules="numberRule"
                                                  error-count="2"
                                                  label="Línea de crédito"></v-text-field>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green accent-2" @click="editClientDialog = false">Cancelar</v-btn>
                                <v-btn color="green accent-2" @click="editClientById">Guardar</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-col>
            <v-col class="col-sm-9">
                <v-row class="d-flex justify-center py-5">
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
                        <v-card-title>
                            Operaciones
                            <v-spacer></v-spacer>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                                          hide-details>
                                <v-dialog slot="append" v-model="addOperationDialog" max-width="40%">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn class="md12 hidden-sm-and-down" color="green accent-2" v-bind="attrs"
                                               v-on="on">+ Agregar operación
                                        </v-btn>
                                        <v-btn class="sm12 hidden-md-and-up" color="green accent-2" v-bind="attrs"
                                               v-on="on" small>+
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>Agregar operación</v-card-title>
                                        <v-card-text>
                                            <v-row>
                                                <v-text-field label="Plazo de pago" v-model="operation.time"
                                                              suffix="días"
                                                              :rules="numberRule"
                                                              error-count="2"
                                                              type="number"
                                                              class="align-center mx-3"></v-text-field>
                                            </v-row>
                                            <v-spacer></v-spacer>
                                            <v-row>
                                                <v-col class="col-sm-10 d-flex align-center">
                                                    <v-text-field label="Delivery"
                                                                  :rules="numberRule"
                                                                  error-count="2"
                                                                  type="number"
                                                                  v-model="operation.delivery"></v-text-field>

                                                </v-col>
                                                <v-col class="col-sm-2 d-flex align-center">
                                                    <h3>{{client.currency}}</h3>
                                                </v-col>
                                            </v-row>
                                            <v-spacer></v-spacer>
                                            <v-row>
                                                <v-select :items="products"
                                                          item-text="name"
                                                          multiple
                                                          v-model="productsSelected"
                                                          class="align-center mx-3"
                                                          placeholder="Seleccione productos"
                                                          return-object></v-select>
                                            </v-row>
                                            <v-row class="align-content-center" v-bind:key="product.id"
                                                   v-for="product in productsSelected">
                                                <v-spacer></v-spacer>
                                                <v-col class="col-sm-5 d-flex align-center">
                                                    <h3>{{ product.name }}</h3>
                                                </v-col>
                                                <v-col class="col-sm-5 d-flex align-center">
                                                    <v-text-field v-model="product.quantity"
                                                                  class="m-0 p-0"
                                                                  :rules="numberRule"
                                                                  error-count="2"
                                                                  type="number"
                                                                  label="Cantidad" suffix=""></v-text-field>
                                                </v-col>
                                                <v-col class="col-sm-2 d-flex align-center">
                                                    <h3>{{product.measurement}}</h3>
                                                </v-col>
                                            </v-row>
                                            <v-spacer></v-spacer>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="green accent-2" @click="addOperation()">Agregar</v-btn>
                                            <v-btn color="green accent-2" @click="addOperationDialog = false">Cancelar
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-text-field>
                        </v-card-title>
                        <v-data-table :headers="headers" :items="items" :items-per-page="10" :footer-props="{
                'items-per-page-text': 'Operaciones por página:'
              }" class="elevation-2">
                            <template v-slot:item.actions="{ item }">
                                <v-icon small class="mr-2" @click="editItem(item)">mdi-menu</v-icon>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-row>
                <v-row class="justify-center mt-5">
                    <v-btn color="green accent-2" class="justify-center d-flex" @click="addPaymentDialog = true">Pagar
                    </v-btn>
                </v-row>
                <v-row v-if="flag" class="justify-center mt-5">
                    <h3>Se pagaron: {{ pays }} operaciones</h3>
                </v-row>
                <v-row v-if="change" class="justify-center mt-5">
                    <h3>Su cambio es de {{ payment + ' ' + client.currency }}</h3>
                </v-row>
                <v-row class="d-flex justify-end pr-10 py-8">
                    <v-dialog slot="append" v-model="addPaymentDialog" max-width="20%">
                        <!--template v-slot:activator="{ on, attrs }">
                          <v-btn color="green accent-2" class="justify-center d-flex" v-bind="attrs" v-on="on">Pagar</v-btn>
                        </template-->
                        <v-card>
                            <v-card-title>Agregar pago</v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-text-field v-model="payment" placeholder="Ingresa monto"
                                                  prefix="S/"></v-text-field>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green accent-2" @click="addPayment()">Aceptar</v-btn>
                                <v-btn color="green accent-2" @click="addPaymentDialog = false">Cancelar</v-btn>
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
    import ClientDataService from "@/services/ClientDataService";
    import OperationDataService from "@/services/OperationDataService";
    import ProductDataService from "@/services/ProductDataService";

    export default {
        name: "Client",
        components: {Slidebar},
        data: () => ({
            id: 0,
            headers: [
                {text: 'ID Operación', align: 'start', sortable: true, value: 'operationId'},
                {text: 'Fecha', value: 'operationDate', sortable: false},
                {text: 'Plazo de pago (dias)', value: 'time', sortable: false},
                {text: 'Monto Total de Compra', value: 'total', sortable: false},
                {text: 'Monto por saldar(sin intereses)', value: 'balance', sortable: false},
                {text: 'Monto Total a Pagar', value: 'future', sortable: false},
                {text: 'Monto Pagado', value: 'payed', sortable: false},
                {text: 'Fecha de pago o anticipado', value: 'payDate', sortable: false},
                {text: 'Detalles', value: 'actions', sortable: false}
            ],
            clientId: null,
            client: {
                first_name: '',
                last_name: '',
                email: '',
                address: '',
                phone: '',
                dni: '',
                currency: '',
                credit_total: 0,
                compensatory_value: 0,
                moratorium_value: 0,
                rate_id: '',
                rate_name: '',
                quotation: 1,
                open_date: '',
                maintenance: 0
            },
            operation: {
                time: 0,
            },
            editClientDialog: false,
            addOperationDialog: false,
            addPaymentDialog: false,
            items: [],
            operations: [],
            products: [],
            productsSelected: [],
            payment: 0,
            search: null,
            change: false,
            pays: 0,
            flag: false,
            numberRule: [v => !isNaN(parseFloat(v)) && parseFloat(v) >= 0 || 'El numero debe de ser positivo'],

        }),
        mounted() {
            this.id = localStorage.getItem('id');
            this.clientId = this.$route.params.id;
            this.getClientById();
            this.getOperations();
            this.getProducts();
        },
        created() {
            if (!localStorage.getItem('token')) {
                this.$router.push('/login')
            }
        },
        methods: {
            editItem(item) {
                const id = item.operationId;
                this.$router.push(`/client/${this.clientId}/operation/${id}`)
            },
            getClientById() {
                ClientDataService.getClientByAccountIdAndId(this.clientId).then(response => {
                    const clientResponse = response.data;
                    console.log(response.data)
                    this.client.first_name = clientResponse.first_name;
                    this.client.last_name = clientResponse.last_name;
                    this.client.email = clientResponse.email;
                    this.client.address = clientResponse.address;
                    this.client.currency = clientResponse.currency;
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
                                balance: this.setBalance(value),
                                payed: value.payed,
                                future: value.future,
                                time: value.time,
                                total: value.total,
                                maintenance: value.maintenance,
                                payDate: (value.pay_date) ? value.pay_date : 'Sin pago anticipado',
                            }
                            this.items.push(operation);
                        })
                    }).catch(e => console.log(e))
            },
            getProducts() {
                this.products = [];
                ProductDataService.getProductsByAccountId(this.id).then(response => {
                    const values = response.data;
                    values.forEach(value => {
                        const product = {
                            id: value.id,
                            name: value.name,
                            measurement: value.measurement,
                            unitCost: value.unit_cost,
                            quantity: null,
                        }
                        this.products.push(product);
                    });
                }).catch(e => console.log(e));
            },
            addOperation() {
                OperationDataService.saveOperation(this.operation, this.clientId).then(response => {
                    const operationId = response.data.id;
                    this.productsSelected.forEach(product => {
                        const data = {quantity: product.quantity};
                        OperationDataService.saveProductOnOperation(operationId, product.id, data).then(() => {
                            this.getOperations();
                        }).catch(e => console.log(e));
                    });
                    this.productsSelected = [];
                    this.addOperationDialog = false;
                }).catch(e => console.log(e));
            },
            addPayment() {
                this.pays = 0
                let toPayOperations = [];
                this.items.forEach(operation => {
                    if (!operation.state) {
                        toPayOperations.push(operation);
                    }
                })
                toPayOperations.sort((a, b) => (a.operationDate > b.operationDate) ? 1 : -1);
                console.log(toPayOperations);
                toPayOperations.forEach(operation => {
                    // console.log(operation)
                    const pay = this.setSinglePay(operation)
                    console.log(pay)
                    const data = {
                        payed: pay
                    }
                    OperationDataService.payOperation(this.clientId, operation.operationId, data)
                        .then(() => {
                            this.pays++
                            this.getOperations()
                            this.addPaymentDialog = false

                        });
                })

                if (this.payment > 0) {
                    this.addPaymentDialog = false
                    this.payment = Number.parseFloat(this.payment).toFixed(2)
                    this.change = true
                }
                if (this.pays > 0) {
                    this.flag = true
                }

            },
            editClientById() {
                const data = {
                    compensatory_value: this.client.compensatory_value,
                    moratorium_value: this.client.moratorium_value,
                    address: this.client.address,
                    credit_total: this.client.credit_total,
                }
                ClientDataService.updateClient(this.clientId, data)
                    .then(() => {
                        location.reload()
                    })
            },
            setBalance(value) {
                if (value.balance <= 0){
                    if(value.state){
                        return 0
                    }
                    return value.total
                }
                return value.balance
            },
            setSinglePay(operation) {
                const pay = this.payment
                if (operation.future <= this.payment){
                    this.payment -= operation.future
                    this.payment = Number.parseFloat(this.payment).toFixed(2)
                    return operation.future
                }
                this.payment = 0
                return pay
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
