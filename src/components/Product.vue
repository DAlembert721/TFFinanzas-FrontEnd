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
              <v-dialog slot="append" v-model="addProduct" max-width="30%">
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
                      <v-text-field label="Nombre de producto"></v-text-field>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field label="Costo por unidad"></v-text-field>
                      </v-col>
                      <v-col>
                        <v-select label="Unidad"></v-select>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green accent-2" @click="addProduct = false">Agregar</v-btn>
                    <v-btn color="green accent-2" @click="addProduct = false">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="items" :search="search"
                        :footer-props="{'items-per-page-text': 'Clientes por página:'}">
            <template v-slot:item.actions="{ item }">
              <v-dialog slot="append" v-model="editProduct" max-width="30%">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon small class="mr-2" v-bind="attrs" v-on="on"
                          @click="editItem(item)">mdi-pencil</v-icon>
                </template>
                <v-card>
                  <v-card-title>Editar producto</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-text-field label="Nombre de producto"></v-text-field>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field label="Costo por unidad"></v-text-field>
                      </v-col>
                      <v-col>
                        <v-select label="Unidad"></v-select>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green accent-2" @click="editProduct = false">Guardar</v-btn>
                    <v-btn color="green accent-2" @click="editProduct = false">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
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

  export default {
    name: "Product",
    components: {Slidebar},
    data: () => ({
      headers: [
        { text: 'Nombre de producto', align: 'start', sortable: true, value: 'name' },
        { text: 'Costo por unidad', value: 'unitCost', sortable: false },
        { text: 'Unidad de medida', value: 'unitOfMeasure', sortable: false },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      addProduct: false,
      editProduct: false,
      items: [ { name: 'Arroz', unitCost: 5.20, unitOfMeasure: 'kg' } ]
    }),
    methods: {
      editItem(item) {
        console.log(item)
      },
      deleteItem(item) {
        console.log(item)
      }
    }
  }
</script>

<style scoped>

</style>