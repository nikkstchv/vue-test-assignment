<template>
  <v-app>
    <v-content>
      <div v-if="errorFromServer">
        <v-alert
          :value="true"
          color="error"
          icon="warning"
          outline>
          Data loading failed. You can try one more time:
          <v-btn small
                 outline
                 color="info"
                 @click="getProducts()">
            Try
          </v-btn>
        </v-alert>
      </div>
      <div v-else>
        <ProductTable v-if="loaded" :products="products"/>
        <div class="text-xs-center" v-else>
          <v-progress-circular
            :size="100"
            color="primary"
            indeterminate
          ></v-progress-circular>
          <h2 color="primary">loading data...</h2>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import ProductTable from './components/ProductTable'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    ProductTable
  },
  data: () => ({}),
  computed: {
    ...mapState(["loaded", "errorFromServer", "products"])
  },
  methods: {
    ...mapActions(["getProducts"])
  },
  mounted: function() {
    this.getProducts();
  }
}
</script>

<style>
  .v-progress-circular {
    margin-top: 20%;
  }
</style>
