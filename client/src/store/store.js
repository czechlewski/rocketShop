import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
        state: {
            user: null,
            products: null,
            basket: [],
            order: []
        },
        getters: {
            isAuthenticated: state => !!state.user,
            StateProducts: state => state.products,
            StateUser: state => state.user,
            StateBasket: state => state.basket
        },
        actions: {
            async LogIn({ commit }, user) {
                try {
                    let response = await axios.post('login', user);
                    if (response.data) {
                        commit('setUser', response.data);
                    }
                    return response.data;
                }
                catch (err) {
                    console.log(err);
                }
            },
            async Register({ commit }, user) {
                try {
                    let response = await axios.post('register', user);
                    commit('setUser', user);
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
            async updateBasket({ commit, state }, product) {
                let isInBasket = !!state.basket.find(item => item._id == product._id);
                if (isInBasket) commit('addAmountToBasket', product);
                else commit('addProductToBasket', product);
            },
            async updateAmountInBasket({ commit }, product) {
                commit('modifyAmountInBasket', product);
            },
            async removeProductFromBasket({ commit }, product) {
                commit('deleteProductFromBasket', product);
            },
            async sendOrder({ commit }, basket) {
                commit('updateOrder', basket);
            },
            async modifyUser({ commit }, order) {
                commit('addOrderToUser', order)
            },
            async clearBasket({ commit }) {
                commit('clearBasket')
            },
            async updateUserInDatabase({ commit }, user) {
                try {
                    let response = await axios.post('login', user);
                    if (response.data) {
                        commit('setUser', response.data);
                    }
                    return response.data;
                }
                catch (err) {
                    console.log(err);
                }
            },
            async removeOrderFormUser({ commit }, order) {
                commit('deleteOrderFromUser', order)
            },
            async LogOut({ commit }) {
                let user = null;
                commit('logOut', user)
            }
        },
        mutations: {
            setUser(state, user) {
                state.user = user
            },
            setProducts(state, products) {
                state.products = products
            },
            addAmountToBasket(state, product) {
                let productId = state.basket.findIndex(obj => obj._id == product._id);
                state.basket[productId].amount += product.amount;
            },
            modifyAmountInBasket(state, product) {
                let productId = state.basket.findIndex(obj => obj._id == product._id);
                state.basket[productId].amount = product.amount;
            },
            addProductToBasket(state, product) {
                state.basket.push(product);
            },
            clearBasket(state) {
                state.basket = []
            },
            deleteProductFromBasket(state, product) {
                let productId = state.basket.findIndex(obj => obj._id == product._id);
                state.basket.splice(productId, 1);
            },
            updateOrder(state, basket) {
                state.order.push(basket);
            },
            addOrderToUser(state, order) {
                if (state.user.orders == null) {
                    state.user.orders = [];
                    state.user.orders.push(order)
                }
                else state.user.orders.push(order)
            },
            deleteOrderFromUser(state, order) {
                let orderInd = state.user.orders.findIndex(obj => obj.id == order.id);
                state.user.orders.splice(orderInd, 1);
            },
            logOut(state) {
                state.user = null,
                    state.basket = [],
                    state.order = []
            }
        },
        plugins: [createPersistedState({ overwrite: true })]
    });