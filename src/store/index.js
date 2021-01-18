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
        getProfile: state => state.summaries
    },
    actions: {
        newSummary({commit}, http, summary){
            // HOWWWW TO GET THE VUE INSTANCE into vuex
        http.secured.post('/api/hospital_summaries', summary)
            .then(response => console.log(response))
            .catch(error => console.log(error))
            commit('createSummary', summary)
        },
        async fetchProfile({ commit }, http){
            const response = await http.secured.get('/api/hospital_summaries')
            console.log(response.data)
            commit('setProfile', response.data)
            // http.secured.get('/api/hospital_summaries')
            //     .then(response => commit('setProfile', response.data))
            //     .catch(error => console.log(error))
        }
    },
    mutations: {
        createSummary(state, summary){
            state.summaries.unshift(summary)
        },
        // setProfile: (state, profile) => (state.summaries = profile)
        setProfile(state, profile){
            state.summaries = profile
            // console.log(state.summaries)
        }
    }
})