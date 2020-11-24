<template>
  <v-container fluid class="py-0 px-0">
    <Slidebar></Slidebar>
    <v-row>
      <v-spacer></v-spacer>
      <v-col class="col-sm-7 pt-8">
        <v-card>
          <v-card-title>
            Productos
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                          hide-details>
              <v-dialog slot="append" v-model="addProductDialog" max-width="30%">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="md12 hidden-sm-and-down" color="green accent-2" v-bind="attrs"
                         v-on="on">+ Agregar producto</v-btn>
                  <v-btn class="sm12 hidden-md-and-up" color="green accent-2" v-bind="attrs"
                         v-on="on" small>+</v-btn>
                </template>
                <v-card>
                  <v-card-title>Agregar producto</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-text-field v-model="product.name" label="Nombre de producto"></v-text-field>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field v-model="product.unit_cost" label="Costo por unidad"></v-text-field>
                      </v-col>
                      <v-col>
                        <v-select
                            v-model="UOMChose"
                            :items="unitOfMeasurements"
                            :hint="`${UOMChose.name}`"
                            item-text="abbr"
                            item-value="name"
                            label="Unidad"
                            placeholder="Escoge unidad de medida"
                            return-object></v-select>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green accent-2" @click="saveProduct()">Agregar</v-btn>
                    <v-btn color="green accent-2" @click="addProductDialog = false">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="items" :search="search"
                        :footer-props="{'items-per-page-text': 'Clientes por página:'}">
            <template v-slot:item.actions="{ item }">
              <v-dialog slot="append" v-model="editProductDialog" max-width="40%">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon small class="mr-2" v-bind="attrs" v-on="on"
                          @click="openEdit(item)">mdi-pencil</v-icon>
                </template>
                <v-card>
                  <v-card-title>Editar producto</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-text-field v-model="item.name" label="Nombre de producto"></v-text-field>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field v-model="item.unit_cost" label="Costo por unidad"></v-text-field>
                      </v-col>
                      <v-col>
                        <v-select v-model="UOMChose"
                                  :items="unitOfMeasurements"
                                  :hint="`${UOMChose.name}`"
                                  item-text="abbr"
                                  item-value="name"
                                  label="Unidad"
                                  return-object></v-select>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green accent-2" @click="editProduct(item)">Guardar</v-btn>
                    <v-btn color="green accent-2" @click="editProductDialog = false">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-icon small @click="deleteProduct(item.id)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
  import Slidebar from "@/components/Slidebar";
  import ProductDataService from "@/services/ProductDataService";

  export default {
    name: "Product",
    components: {Slidebar},
    data: () => ({
      headers: [
        { text: 'Nombre de producto', align: 'start', sortable: true, value: 'name' },
        { text: 'Costo por unidad', value: 'unit_cost', sortable: false },
        { text: 'Unidad de medida', value: 'measurement', sortable: false },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      unitOfMeasurements: [
        { abbr: 'kg', name: 'kilogramos' },
        { abbr: 'g', name: 'gramos' },
        { abbr: 'L', name: 'litros' },
        { abbr: 'm', name: 'metros' },
        { abbr: 'oz', name: 'onzas' },
        { abbr: 'lb', name: 'libras' },
        { abbr: 'unidades', name: '' },
      ],
      id: 0,
      addProductDialog: false,
      editProductDialog: false,
      UOMChose: { abbr: 'unidades', name: '' },
      product: {
        name: '',
        unit_cost: 0,
        measurement: ''
      },
      items: [],
      search: null,
    }),
    mounted() {
      this.id = localStorage.getItem('id')
      this.getProducts()
      //this.getProducts();
    },
    created() {

    },
    methods: {
      getProducts() {
        ProductDataService.getProductsByAccountId(this.id).then(response => {
          this.items = response.data
        }).catch(e => {
          console.log(e);
        })
        this.UOMChose = this.unitOfMeasurements;
      },
      saveProduct() {
        this.product.measurement = this.UOMChose.abbr;
        console.log(this.product)
        ProductDataService.saveProduct(this.id, this.product).then(response => {
          console.log(response);
          this.UOMChose = '';
          this.product = { name: '', unit_cost: 0, measurement: '' };
          this.addProductDialog = false;
          window.location.reload()
        }).catch(e => {
          console.log(e);
        });
      },
      openEdit(item) {
        this.UOMChose.abbr = item.measurement;
      },
      editProduct(data) {
        data.measurement = this.UOMChose.abbr;
        ProductDataService.editProduct(this.id, data).then(response => {
          console.log(response);
          this.UOMChose = '';
          this.getProducts();
          this.editProductDialog = false;
        }).catch(e => {
          console.log(e);
        });
      },
      deleteProduct(productId) {
        ProductDataService.deleteProduct(this.id, productId).then(response => {
          console.log(response);
          this.getProducts();
        });
      },
    }
  }
</script>

<style scoped>

</style>
