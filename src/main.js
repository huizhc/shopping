import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import routes from './routes'
import product_data from './data'
import './style.css';


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)

function getFilterArray (arr) {
  let res = [];
  const json = {};
  for (let i = 0; i < arr.length; i ++) {
    let _self = arr[i];
    if (!json[_self]) {
      res.push(_self);
      json[_self] = 1;
    }
  }
  return res;
}

const store = new Vuex.Store({
  state: {
    productList: [],
    cartList: []
  },
  mutations: {
    setProductList (state, data) {
      state.productList = data
    },
    addCart (state, id) {
      const isAdded = state.cartList.find(item => item.id === id);
      if (isAdded) {
        isAdded.count ++;
      } else {
        state.cartList.push({
          id: id,
          count: 1
        })
      }
    },
    editCartCount (state, payload) {
      state.cartList.find(item => item.id === payload.id).count += payload.count;
    },
    deleteCart (state, id) {
      let i = state.cartList.findIndex(item => item.id === id);
      state.cartList.splice(i, 1);
    },
    emptyCart (state) {
      state.cartList = [];
    }
  },
  actions: {
    getProductList (context) {
      setTimeout(() => {
        context.commit('setProductList', product_data);
      }, 500);
    },
    buy (context) {
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('emptyCart');
          resolve();
        }, 500);
      })
    }
  },
  getters: {
    brands: state => {
      const a = state.productList.map(item => item.brand);
      return getFilterArray(a);
    },
    colors: state => {
      const a = state.productList.map(item => item.color);
      return getFilterArray(a);
    }
  }
})
const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
})
router.afterEach(() => {
  window.scrollTo(0, 0);
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
