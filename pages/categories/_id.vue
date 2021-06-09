<template>
<v-container fluid pa-0 ma-4 class="category">
    <v-row align="center" justify="center">
        <v-btn
            @click="categories_push()">
            戻る
        </v-btn>
    </v-row>
</v-container>
</template>

<script>
export default {
  data: function() {
      return {
          data: []
      }
  },
    methods: {
        categories_push() {
            this.$router.push({ path: `/categories` })
        },
    }
}
</script>
