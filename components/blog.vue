<template>

<v-container fluid pa-0 ma-0>
  
  <v-container fluid pa-0 ma-0>
    <v-row>
      <v-col 
        lg="4"
        v-for="(post, i) in posts"
        :key="i"
      >
        <v-card
        class="mx-auto"
        max-width="344"
      >
        <v-img
          v-if="post._embedded[`wp:featuredmedia`] === undefined" src="http://aqua-wasabi.com/shop/info/img/shop01@2x.jpg"
          height="200px"
          @click="manual_push(post.id)"
        ></v-img>

        <v-img
          v-else :src="post._embedded[`wp:featuredmedia`][0].source_url"
          height="200px"
          @click="manual_push(post.id)"
        ></v-img>


        <v-card-title>
          <p>{{ post.title.rendered }}</p>
        </v-card-title>

        <v-divider></v-divider>


        <v-card-subtitle>
          {{ post.date | date }}
        </v-card-subtitle>

        <v-card-text>
          {{ post.excerpt.rendered | replace }}
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="green"
            style="color: #fff;"
            @click="manual_push(post.id)"
          >
            もっと見る
          </v-btn>

          <v-spacer></v-spacer>

        </v-card-actions>

      </v-card>
    </v-col>
  </v-row>
  </v-container>
</v-container>

  
</template>

<script>
import axios from 'axios';

export default {
  data: function() {
    return {
      posts: null,
    };
  },
  created() {
    axios
      // .get("http://aqua-wasabi.com/wp-json/wp/v2/posts?_embed", { params: { per_page: 3 }
      .get("https://sanuki-udon-love.net/wp-json/wp/v2/posts?_embed", { params: { per_page: 3 } 
      })
      .then((res) => {
        console.log(res.data)
        this.posts = res.data
      })
  },
  methods: {
    manual_push(id) {
      this.$router.push({ path: `/manuals/${id}` })
    },
  }
}
</script>

<style>
.v-card__title p {
  margin-bottom: 0;
}
.v-image__image {
  cursor: pointer;
}
</style>