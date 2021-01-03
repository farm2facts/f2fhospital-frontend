
const state = {
    summaries: []
}

const getters = {}

const actions = {
    newSummary({commit}, http, summary){
        // HOWWWW TO GET THE VUE INSTANCE into vuex
        console.log("hello")
        console.log(http)
        // http.plain.post('/create_summary', summary)
        // .then(response => console.log(response))
        // .catch(error => console.log(error))
        commit('createSummary', summary)
    }
}

const mutations = {
    createSummary(state, summary){
        state.summaries.unshift(summary)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}