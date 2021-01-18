<template>
    <div>
        Welcome to your profile!
        <div v-for="p in getProfile" :key="p.street">{{ p }}</div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            profile: []
        }
    },
    methods: {
        ...mapActions(["fetchProfile"])
    },
    computed: {
        ...mapGetters(["getProfile"])
    },
    created() {
        if (localStorage.signedIn){
            this.fetchProfile(this.$http)
        }
    }
}
</script>
<style scoped>

</style>