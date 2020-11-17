<template>
    <v-container fluid class="bg">
        <v-row>
            <v-card elevation="5" rounded class="mx-auto my-7" width="60%">
                <v-row>
                    <v-img max-height="10%" max-width="10%" class="mx-auto my-4" src="@/assets/user.png"></v-img>
                </v-row>
                <v-card-title class="d-flex justify-center">
                    Registro
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="firstName"
                                              label="Nombres"
                                              :rules="generalRules"
                                              error-count="1"
                                              required></v-text-field>
                                <v-text-field v-model="lastName"
                                              label="Apellidos"
                                              :rules="generalRules"
                                              error-count="1"
                                              required></v-text-field>
                                <v-text-field v-model="dni"
                                              label="DNI"
                                              :rules="generalRules"
                                              error-count="1"
                                              required></v-text-field>
                                <v-text-field v-model="phone"
                                              label="Celular"
                                              :rules="generalRules"
                                              error-count="1"
                                              required></v-text-field>
                                <v-text-field v-model="organization"
                                              label="Nombre de la tienda"
                                              :rules="generalRules"
                                              error-count="1"
                                              required></v-text-field>
                                <v-text-field v-model="ruc"
                                              label="RUC"
                                              :rules="generalRules"
                                              error-count="1"
                                              required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="email"
                                              label="Email"
                                              :rules="emailRules"
                                              error-count="1"
                                              required></v-text-field>
                                <v-text-field v-model="password"
                                              label="Contraseña"
                                              :rules="passwordRules"
                                              type="password"
                                              error-count="4"
                                              required></v-text-field>
                                <v-row>
                                    <v-col>
                                        <v-select
                                                label="Region"
                                                v-model="region"
                                                :items="regions"
                                                item-text="name"
                                                item-value="id"
                                                :rules="generalRules"
                                                @change="getProvincesItems"
                                                return-object
                                        >
                                        </v-select>
                                    </v-col>
                                    <v-col>
                                        <v-combobox
                                                label="Provincia"
                                                v-model="province"
                                                :items="provinces"
                                                :rules="generalRules"
                                                item-text="name"
                                                item-value="id"
                                                @change="getDistrictItems"
                                                return-object
                                        >
                                        </v-combobox>
                                    </v-col>
                                    <v-col>
                                        <v-combobox
                                                label="Distrito"
                                                v-model="district"
                                                :items="districts"
                                                :rules="generalRules"
                                                item-text="name"
                                                return-object
                                        >
                                        </v-combobox>
                                    </v-col>
                                </v-row>
                                <v-text-field v-model="address" label="Dirección"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-btn class="mx-auto" elevation="2" color="green accent-2" @click="handleRegister">Crear cuenta</v-btn>
                        </v-row>
                        <v-row class="d-flex justify-center mt-3">
                            ¿Ya tienes una cuenta?<a class="ml-1" @click="login()">Inicia sesión</a>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    import LocationDataService from "@/services/LocationDataService";

    export default {
        name: "Register",
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        data: () => ({
            firstName: '',
            lastName: '',
            dni: '',
            phone: '',
            email: '',
            password: '',
            organization: '',
            region: null,
            province: null,
            district: null,
            address: '',
            ruc: '',
            generalRules: [v => !!v || 'This space is required'],
            emailRules: [v => !!v || 'Email is required',
                v => /.+@.+/.test(v) || 'Email must valid'],
            passwordRules: [v => !!v || 'Password is required',
                v => (v && v.length >= 5) || 'Password must have at least 5 characters',
                v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
                v => /([!@#$%])/.test(v) || 'Must have one special character [!@#$%]'],
            regions: [],
            provinces: [],
            districts: [],
        }),
        watch: {},
        methods: {
            handleRegister() {
                const data = {
                    email: this.email,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    dni: this.dni,
                    phone: this.phone,
                    ruc: this.ruc,
                    address: this.address,
                    organization: this.organization,
                    districtId: this.district.id,
                };
                if (data.email && data.password) {
                    this.$store.dispatch('auth/register', data)
                        .then(() => {
                            this.registerSuccess();
                        })
                        .catch(e => {
                            console.log(e);
                        })
                }
            },
            registerSuccess() {
                this.$router.push('/login');
            },
            getProvincesItems() {
                console.log(this.region)
                LocationDataService.getProvinces(this.region.id)
                    .then(response => {
                        this.provinces = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e)
                    })

            },
            getDistrictItems() {
                console.log(this.province)
                LocationDataService.getDistricts(this.province.id)
                    .then(response => {
                        this.districts = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e)
                    })

            },
            getRegionItems() {
                LocationDataService.getRegions()
                    .then(response => {
                        this.regions = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
        },
        mounted() {
            this.getRegionItems();
            if (this.loggedIn) {
                this.$router.push('/home');
            }
        }
    }
</script>

<style scoped>
    .bg {
        height: 100%;
        width: 100%;
        background-color: #85FFBD;
        background-image: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%);
    }
</style>
