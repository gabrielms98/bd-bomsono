<template lang="html">
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs30 justify-center>
      <v-card>
        <v-toolbar dark color="amber">
          <v-toolbar-title> Apartamentos</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-spacer></v-spacer>
        <v-card-text>
          <v-container grid-list-md>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer><v-spacer></v-spacer>
          <!--EXEMPLO DE COMO VAI SER O CARD DE CADA AP-->
            <v-flex xs12 sm2>
             <v-card color="blue-grey darken-2" class="white--text">
               <v-card-title primary-title>
                 <div class="headline">&nbspAP&nbsp</div>
                 <div><h1>101</h1></div>
               </v-card-title>
               <v-card-actions>
                 <v-btn flat dark>SELECIONAR</v-btn>
               </v-card-actions>
             </v-card>
           </v-flex>
           &nbsp
           <v-flex xs12 sm2>
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline">&nbspAP&nbsp</div>
                <div><h1>102</h1></div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>SELECIONAR</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
