import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store ({
    state: {
        profile: []
    },
    getters: {
        getProfile: state => state.profile
    },
    actions: {
        // newSummary({commit}, http, summary){
        // http.secured.post('/api/hospital_summaries', summary)
        //     .then(response => console.log(response))
        //     .catch(error => console.log(error))
        //     commit('createSummary', summary)
        // },
        // newManagement({commit}, http, management){
        //     http.secured.post('/api/hopital_managements', management)
        //         .then(response=> console.log(response))
        //         .catch(error=> console.log(error))
        //     commit('createManagement',management)
        // },
        // newVendor({commit}, http, vendors){
        //     http.secured.post('/api/hospital_vendors', vendors)
        //         .then(response=> console.log(response))
        //         .catch(error=> console.log(error))
        //     commit('createVendor', vendors)
        // },
        // newCommunity({commit}, http, community){
        //     http.secured.post('/api/hospital_communities', community)
        //         .then(response => console.log(response))
        //         .catch(error => console.log(error))
        //     commit('createCommunity', community)
        // },
        async fetchProfile({ commit }, http){
            var profile = {
                summary: null,
                vendors: null,
                management: null,
                community: null
            }
            const summary_response = await http.secured.get('/api/hospital_summaries')
            profile.summary = summary_response.data

            const vendors_response = await http.secured.get('/api/hospital_vendors')
            profile.vendors = vendors_response.data

            const management_response = await http.secured.get('/api/hospital_managements')
            profile.management = management_response.data

            const community_response = await http.secured.get('/api/hospital_communities')
            profile.community = community_response.data
            commit('setProfile', profile)

        }
    },
    mutations: {
        // createSummary(state, summary){
        //     state.summaries.unshift(summary)
        // },
        // createManagement(state, management){
        //     state.managements.unshift(management)
        // },
        // createVendor(state, vendor){
        //     state.vendors.unshift(vendor)
        // },
        // createCommunity(state, community){
        //     state.communities.unshift(community)
        // },
        setProfile(state, profile){
            state.profile = profile
        }
    }
})