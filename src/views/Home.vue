<template>
  <div class="home">
    <!-- <Signin /> -->
    {{profile}}
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import Signin from '@/components/Signin.vue'
export default {
  name: 'Home',
  components: {
    // HelloWorld,
    // Signin
  },
  data() {
    return {
      profile: []
    }
  },
  methods: {
      created() {
        if (localStorage.signedIn){
          this.$http.secured.get('api/hospital_summaries')
            .then(response => {this.profile = response.data})
            .catch(error => console.log(error))
        }
      }
  }
}
</script>
