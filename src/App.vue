<template>
  <v-app id="app">
    <!-- <div id="nav">
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

        <v-menu offset-y>
          <template v-slot:activator="{on, attrs}">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="signOut"> 
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Sign In</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
  
        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab :to="{name: 'Welcome'}">Home</v-tab>
            <v-tab :to="{name: 'About'}">About Us</v-tab>
            <v-tab :to="{name: 'ProfileForm'}">Hospital Profile Form</v-tab>
            <v-spacer></v-spacer>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques-3"
        class="overflow-y-auto"
        max-height="400"
      >
        <v-container style="height: 1000px;"></v-container>
      </v-sheet>
    </div> -->
    <NavBar />
    <v-sheet
        id="scrolling-techniques-3"
        class="overflow-y-auto"
        max-height="400"
      >
        <v-container style="height: 1000px;"></v-container>
      </v-sheet>
    <router-view/>
  </v-app>
</template>
<script>
import NavBar from './components/Nav.vue'
export default {
  components:{
    NavBar
  },
  methods:{
    
    signOut() {

    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Rubik, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

#nav {
  // padding: 30px;

}
</style>
