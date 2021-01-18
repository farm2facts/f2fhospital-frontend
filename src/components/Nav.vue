<template>
    <div>
        <v-app-bar
        absolute
        color="#ff5b4c"
        dark
        shrink-on-scroll
        prominent
        src="https://farm2facts.org/wp-content/uploads/2019/10/Farmers-Market-Getty-Images-no-credit.jpg"
        fade-img-on-scroll
        height="300"
      >
        <v-toolbar-title>Hospital Profile</v-toolbar-title>

        <v-spacer></v-spacer>
  
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
  
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{on, attrs}">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-if="signedIn" @click="signout"> 
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{name: 'Signin'}" v-if="!signedIn">
              <v-list-item-title>Sign In</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="signedIn" :to="{name: 'UserProfile'}">
              <v-list-item-title>My Profile</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
  
        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab :to="{name: 'Welcome'}">Home</v-tab>
            <v-tab :to="{name: 'About'}">About Us</v-tab>
            <v-tab v-if="signedIn" :to="{name: 'ProfileForm'}">Hospital Profile Form</v-tab>
            <v-spacer></v-spacer>
          </v-tabs>
        </template>
      </v-app-bar>
    </div>
</template>
<script>
export default {
    data(){
        return {
            signedIn: false,
        }
    },
    created(){
        this.checkSignedIn()
    },
    updated(){
        this.checkSignedIn()
    },
    methods:{
    checkSignedIn () {
      if (localStorage.signedIn) {
          this.signedIn = true
        // this.$router.replace('/welcome')
      }
    },
    signout() {
        this.$http.plain.post('/signout')
        .then(response => console.log(response))
        .catch(error => console.log(error))
    },
    }
}
</script>
<style scoped>

</style>