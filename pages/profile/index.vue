<template>
    <div class="content-profile">
        <div class="row">
            <div class="col-sm-3 container-title">
                <h3>Profile</h3>
                <div class="avatar-wrapper">
                    <img 
                        class="profile-pic"
                        :src="imageData" 
                    >  
                    <div class="upload-button">
                        <label for="myfile">
                            <i 
                                class="fa fa-arrow-circle-up" 
                                aria-hidden="true" 
                            />
                        </label>
                    </div>
                    <input 
                        id="myfile"
                        type="file" 
                        name="myfile" 
                        @change="previewImage" 
                        accept="image/*" 
                    >
                </div>
            </div>
            <div class="col-sm-9 container-profile">
                <form 
                    class="container-form d-flex flex-wrap"
                >
                    <div class="col-sm-4 box-input">
                        <label for="firstName">Firs Name</label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            maxlength="20"
                            v-model="data.firstName"
                            class="form-input"
                            :class="{'error' : errorFirstName}"
                        >
                    </div>
                    <div class="col-sm-4 box-input">
                        <label for="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            maxlength="20"
                            v-model="data.lastName"
                            class="form-input"
                            :class="{'error' : errorLastName}"
                        >
                    </div>
                    <div class="col-sm-4 box-input">
                        <label for="phone">Phone No</label>
                        <input
                            id="phone"
                            type="text"
                            name="phone"
                            maxlength="12"
                            v-model="data.phone"
                            class="form-input"
                            :class="{'error' : errorPhone}"
                        >
                    </div>
                    <div class="col-sm-4 box-input">
                        <label for="phone">Email</label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            maxlength="50"
                            v-model="data.email"
                            class="form-input"
                            :class="{'error' : errorEmail}"
                        >
                    </div>
                    <div class="col-sm-4 box-input">
                        <label for="pass">Date Of Birth</label>
                        <input
                            id="pass"
                            type="date"
                            name="date"
                            maxlength="30"
                            v-model="data.birthday"
                            class="form-input"
                            :class="{'error' : errorBirthday}"
                        >
                    </div>
                    <div class="col-sm-4 box-input">
                        <label for="address">Address</label>
                        <input
                            id="address"
                            type="text"
                            name="address"
                            maxlength="50"
                            v-model="data.address"
                            class="form-input"
                            :class="{'error' : errorAdress}"
                        >
                    </div>
                    <div class="box-error">
                        <p
                            class="text-danger text-error"
                        >
                            {{ messError }}
                        </p>
                    </div>                   
                </form>     
                <div class=" col-sm-4 box-submit">
                    <button
                        class="submit-profile"
                        type="submit"
                        @click="changeProfile"
                    >
                        Change
                    </button>
                </div>       
            </div>              
        </div>     
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import {convertToUrlAvatar} from '~/helpers/dataHelper';
import moment from "moment";
export default {
    data: () => ({
        file: '',
        messError: '',
        imageData: '',
        errorFirstName: '',
        errorLastName: '',
        errorPhone: '',
        user: '',
        errorEmail: '',
        errorBirthday: '',
        errorAdress: '',
        data: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            birthday: '',
            address: ''
        },
    }),
    computed: {
        ...mapGetters('user',['userAuth']),
    },
    async mounted(){
        this.data = await this.getUser(this.userAuth.id);
        this.imageData = convertToUrlAvatar(this.data.avatar);
    },
    methods: {
        ...mapActions("user", ["getUser", "uploadAvatar", "updateProfileUser"]),

        async changeProfile() {
            if (!this.validateFirstName())
                return;
            if (!this.validateLastName())
                return;
            if (!this.validatePhone())
                return;
            if (!this.validateEmail())
                return;   
            if (!this.validateBirthday())
                return;
            if (!this.validateAddress())
                return;   

            if (this.file){
                let upload = await this.uploadAvatar(this.file).catch(err => {
                    if (err)
                        console.log('err', err.message);
                });
            }

            var data = await this.updateProfileUser(this.data);
            this.$notify({
                group: 'success',
                title: 'Success',
                text: 'Successfully updated!',
            });
            this.mounted;                                       
        },

        validateFirstName() {
            if (!this.data.firstName) {
                this.errorFirstName = true;
                this.messError = 'Name is required';
                return false;
            }
            else {
                if (/\d/.test(this.data.firstName)) {
                    this.errorFirstName = true;
                    this.messError = 'Name do not contains number';
                    return false;
                }
                else {
                    this.errorFirstName = false;
                    this.messError = '';
                    return true;
                }
            }
        },
        validateLastName() {
            if (!this.data.lastName) {
                this.errorLastName = true;
                this.messError = 'Last name is required';
                return false;
            }
            else {
                if (/\d/.test(this.data.lastName)) {
                    this.errorLastName = true;
                    this.messError = 'Last name do not contains number';
                    return false;
                }
                else {
                    this.errorLastName = false;
                    this.messError = '';
                    return true;
                }
            }
        },
        validatePhone() {
            if (!this.data.phone) {
                this.errorPhone = true;
                this.messError = 'The phone is required.';
                return false;
            }
            else {
                this.errorPhone = false;
                this.messError = '';
                return true;
            }
        },
        validateEmail() {
            if (!this.data.email) {
                this.errorEmail = true;
                this.messError = 'The email is required.';
                return false;
            }
            else {
                const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regex.test(this.data.email)) {
                    this.errorEmail = true;
                    this.messError = 'Must be a valid email.';
                    return false;
                }
                else {
                    this.errorEmail = false;
                    this.messError = '';
                    return true;
                }
            }
        },
        validateBirthday() {
            if (!this.data.birthday) {
                this.errorBirthday = true;
                this.messError = 'Birthday is required.';
                return false;
            }
            if (moment(this.data.birthday).format("YYYY") > moment(new Date()).format("YYYY")) {
                this.errorBirthday = true;
                this.messError = 'Birthday must be less than the current date.';
                return false;
            }
            else {
                this.errorBirthday = false;
                this.messError = '';
                return true;
            }            
        },
        validateAddress() {
            if (!this.data.address) {
                this.errorAdress = true;
                this.messError = 'The address is required.';
                return false;
            }
            else {
                this.errorAdress = false;
                this.messError = '';
                return true;
            }
        },        
        keyphone() {
            this.data.phone = this.data.phone.replace(/[^0-9\-]/g, '');
            if (this.data.phone.length === 3)
                this.data.phone = this.data.phone + '-';
            if (this.data.phone.length === 7)
                this.data.phone = this.data.phone + '-';
        },        
        previewImage(event) {
            var input = event.target;
            let file = event.target.files[0];
            const formData = new FormData();
            formData.append("avatar", file);
            this.file = formData;

            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageData = e.target.result;
                },
                reader.readAsDataURL(input.files[0]);
            }
        },  
    }
};
</script>