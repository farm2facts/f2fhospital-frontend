import Vuex from 'vuex'
import Vue from 'vue'
// import HospitalProfiles from './modules/hospital_profiles.js'

Vue.use(Vuex)

export default new Vuex.Store ({
    // modules: {
    //     HospitalProfiles
    // }
    state: {
        summaries: [],
        managements: [],
        vendors: [],
        communities: []
    },
    getters: {
        getProfile: state => state.summaries
    },
    actions: {
        newSummary({commit}, http, summary){
        http.secured.post('/api/hospital_summaries', summary)
            .then(response => console.log(response))
            .catch(error => console.log(error))
            commit('createSummary', summary)
        },
        newManagement({commit}, http, management){
            http.secured.post('/api/hopital_managements', management)
                .then(response=> console.log(response))
                .catch(error=> console.log(error))
            commit('createManagement',management)
        },
        newVendor({commit}, http, vendors){
            http.secured.post('/api/hospital_vendors', vendors)
                .then(response=> console.log(response))
                .catch(error=> console.log(error))
            commit('createVendor', vendors)
        },
        newCommunity({commit}, http, community){
            http.secured.post('/api/hospital_communities', community)
                .then(response => console.log(response))
                .catch(error => console.log(error))
            commit('createCommunity', community)
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
        createManagement(state, management){
            state.managements.unshift(management)
        },
        createVendor(state, vendor){
            state.vendors.unshift(vendor)
        },
        createCommunity(state, community){
            state.communities.unshift(community)
        },
        setProfile(state, profile){
            state.summaries = profile
        }
    }
})