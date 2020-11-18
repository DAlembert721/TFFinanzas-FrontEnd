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
            <strong>Nombre:</strong> {{ account.first_name }}
          </div>
          <div>
            <strong>Apellido:</strong> {{ account.last_name }}
          </div>
          <div>
            <strong>Celular:</strong> {{ account.phone }}
          </div>
          <div>
            <strong>DNI:</strong> {{ account.dni }}
          </div>
          <div>
            <strong>Email:</strong> {{ account.email }}
          </div>
          <div class="pb-3">
            <strong>Dirección:</strong> {{ account.address }}
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
                    <v-text-field v-model="account.first_name" label="Nombre"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field v-model="account.last_name" label="Apellidos"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field v-model="account.phone" label="Celular"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field v-model="account.dni" label="DNI"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field v-model="account.email" label="Email"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field v-model="account.address" label="Dirección"></v-text-field>
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
                <v-btn small color="green accent-2" @click="updateUserById()">Guardar</v-btn>
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
  import AccountDataService from "@/services/AccountDataService";

  export default {
    name: "Profile",
    components: {Slidebar},
    data: () => ({
      id: 0,
      account: {
        email: "",
        first_name: "",
        last_name: "",
        dni: "",
        phone: "",
        address: "",
        organization: "",
        ruc: "",
        location: ""
      },
      editDialog: false,
      hidePassword: true
    }),
    mounted() {
      this.id = localStorage.getItem('id')
      this.getUserById(this.id);
    },
    methods: {
      getUserById(id) {
        AccountDataService.getAccountById(id).then(response => {
          this.account = response.data;
          console.log(this.account);
        }).catch(e => {
          console.log(e);
        });
      },
      updateUserById() {
        AccountDataService.updateAccountById(this.id, this.account).then(response => {
          console.log(response);
        }).catch(e => {
          console.log(e);
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
  .details {
    font-size: 24px;
  }
</style>