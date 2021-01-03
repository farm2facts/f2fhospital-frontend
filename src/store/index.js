import Vuex from 'vuex'
import Vue from 'vue'
// import HospitalProfiles from './modules/hospital_profiles.js'

Vue.use(Vuex)

export default new Vuex.Store ({
    // modules: {
    //     HospitalProfiles
    // }
    state: {
        summaries: []
    },
    getters: {

    },
    actions: {
        newSummary({commit}, http, summary){
            // HOWWWW TO GET THE VUE INSTANCE into vuex
        http.secured.post('/api/v1/hospital_summaries', summary)
            .then(response => console.log(response))
            .catch(error => console.log(error))
            commit('createSummary', summary)
        }
    },
    mutations: {
        createSummary(state, summary){
            state.summaries.unshift(summary)
        }
    }
})