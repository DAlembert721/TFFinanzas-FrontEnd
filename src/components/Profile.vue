<template>
  <v-container fluid class="py-0 px-0">
    <Slidebar></Slidebar>
    <v-row>
      <v-col class="col-sm-5 d-flex justify-end align-center full">
        <v-img max-width="300px" src="@/assets/user.png"></v-img>
      </v-col>
      <v-col class="col-sm-7 d-flex justify-start align-center full">
        <div class="details">
          <div>
            <strong>Nombre:</strong> {{ firstName }}
          </div>
          <div>
            <strong>Apellido:</strong> {{ lastName }}
          </div>
          <div>
            <strong>Celular:</strong> {{ phone }}
          </div>
          <div>
            <strong>DNI:</strong> {{ dni }}
          </div>
          <div>
            <strong>Email:</strong> {{ email }}
          </div>
          <div class="pb-3">
            <strong>Dirección:</strong> {{ address + ' - ' + district + ', ' + city + ', ' + region }}
          </div>
          <v-dialog v-model="editDialog" max-width="40%">
            <template v-slot:activator="{ on, attribs }">
              <v-btn small color="green accent-2" v-bind="attribs" v-on="on">Editar perfil</v-btn>
            </template>
            <v-card>
              <v-card-title>Editar perfil</v-card-title>
              <v-card-text>
                <v-container>
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
                  <v-row>
                    <v-text-field label="Email"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field label="Dirección"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
                                  :type="hidePassword ? 'password' : 'text'"
                                  @click:append="() => (hidePassword = !hidePassword)"
                                  label="Contraseña">
                    </v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small color="green accent-2" @click="editDialog = false">Cancelar</v-btn>
                <v-btn small color="green accent-2" @click="editDialog = false">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Slidebar from "@/components/Slidebar";

  export default {
    name: "Profile",
    components: {Slidebar},
    data: () => ({
      id: 0,
      firstName: 'William',
      lastName: 'Gonzales',
      phone: '987654321',
      dni: '9875432',
      email: 'willy_40@gmail.com',
      address: 'Av. Arequipa N°1420',
      region: 'Lima',
      city: 'Lima',
      district: 'San Isidro',
      editDialog: false,
      hidePassword: true
    })
  }
</script>

<style scoped>
  .full {
    height: 93vh;
    display: flex;
  }
  .details {
    font-size: 24px;
  }
</style>