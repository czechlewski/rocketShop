<template>
    <div>
        <back-to-shop-btn></back-to-shop-btn>
        <move-to-basket-btn></move-to-basket-btn>
        <label for="uname"><b>Nazwa użytkownika</b></label>
        <input type="text" placeholder="Nazwa użytkownika" name="uname" v-model="registerData.username" required>
        <br>
        <label for="psw"><b>Hasło</b></label>
        <input type="password" placeholder="Hasło" name="psw" v-model="registerData.password" required>
        <br>
        <button type="submit" @click.enter="register()">Zarejestruj się</button>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import BackToShopBtn from './BackToShopBtn.vue';
import MoveToBasketBtn from './MoveToBasketBtn.vue';
    export default {
        name: 'Register',
        components: {
            BackToShopBtn,
            MoveToBasketBtn
        },
        data(){
            return{
                incorrectPsw:false,
                registerData: {
                    username:'',
                    userlastname:'',
                    useremail:'',
                    password:''
                } 
            }
        },
        computed:{
        },
        methods:{
            ...mapActions(['LogIn']),
                async submit() {
                    try {
                        await this.LogIn({username:this.registerData.username,password:this.registerData.password})
                        .then(data=>{
                        if(data) this.$router.push("/"); 
                        else this.incorrectPsw=true})
                        .catch(err=>console.log(err))
                    }
                    catch(err) {console.log(err)}
            }
        }
    }
</script>