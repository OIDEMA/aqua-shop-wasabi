<template>
  <v-container>
      <v-row>
          <v-col 
            lg="4"
            v-for="(post, i) in posts"
            :key="i"
          >
            <p class="article_title">{{ post.title.rendered }}</p>
          </v-col>
      </v-row>
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
  mounted() {
    axios
      .get("http://aqua-wasabi.com/wp-json/wp/v2/posts", { params: { per_page: 3 } 
      })
      .then((res) => {
        this.posts = res.data
      })
  },
}
</script>