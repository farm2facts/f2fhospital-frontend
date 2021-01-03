<template>
  <div class="max-w-sm m-auto my-8">
      <v-form class="form" @submit.prevent="signin">
          <div class="text-red" v-if="error">{{ error }}</div>
          <v-text-field label="Email Address" dense v-model="email" placeholder="andy@web-crunch.com"></v-text-field>
          <v-text-field label="Password" dense v-model="password" placeholder="password"></v-text-field>
          <v-btn @click="signin">Sign In</v-btn>
          <v-btn :to="{name: 'Signup'}">Sign Up</v-btn>
      </v-form>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signin () {
      this.$http.plain.post('/signin', { email: this.email, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/welcome')
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/welcome')
      }
    }
  }
}
</script>
<style scoped>
.form{
    margin: 16%
}
</style>