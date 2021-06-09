import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: null,
        products: null,
        basket: []
    },
    getters: {
        isAuthenticated: state => !!state.user,
        StateProducts: state => state.products,
        StateUser: state => state.user,
        StateBasket: state => state.basket
    },
    actions: {
        async LogIn({ commit }, User) {
            try {
                let response = await axios.post('login', User);
                if (response.data) {
                    commit('setUser', User.username);
                }
                return response.data;
            }
            catch (err) {
                console.log(err);
            }
        },
        async GetProducts({ commit }) {
            let response = await axios.get()
            commit('setProducts', response.data)
        },
        async updateBasket({commit, state} , product) {
                let isInBasket = !!state.basket.find(item => item._id == product._id);
                    if(isInBasket)commit('addAmountToBasket', product);
                    else commit('addProductToBasket', product);
            },
        async updateAmountInBasket({commit} , product) {
                commit('modifyAmountInBasket', product);
            },
        async LogOut({ commit }) {
                let user = null;
                commit('logOut', user)
        }
        },
    mutations: {
        setUser(state, username) {
            state.user = username
        },
        setProducts(state, products) {
            state.products = products
        },
        addAmountToBasket(state,product) {
            let productId = state.basket.findIndex(obj => obj._id == product._id);
            state.basket[productId].amount += product.amount;
        },
        modifyAmountInBasket(state,product) {
            let productId = state.basket.findIndex(obj => obj._id == product._id);
            state.basket[productId].amount = product.amount;
        },
        addProductToBasket(state, product) {
            state.basket.push(product);
        },
        logOut(state) {
            state.user = null,
            state.basket = []
                
        }
     },
    plugins: [createPersistedState({overwrite:true})]
});