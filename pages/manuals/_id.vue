<template>
    <v-container fluid pa-0>
        <v-row justify="center" align-content="center">
            <v-col col="12" lg="8">

                <v-img
                v-if="post === null" src="http://aqua-wasabi.com/shop/info/img/shop01@2x.jpg"
                height="400px"
                ></v-img>

                <v-img
                v-else :src="post._embedded[`wp:featuredmedia`][0].source_url"
                height="400px"
                ></v-img>
                
                <h1 v-if="post !== null">{{ post.title.rendered }}</h1>
                <p v-if="post !== null">{{ post.date | date }}</p>

                <v-divider></v-divider>

                <div class="content" v-if="post !== null" v-html="post.content.rendered "></div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data: function() {
    return {
        post: null,
    };
},
 created() {
    const id = this.$nuxt.$route.params.id
    axios
      // .get(`http://aqua-wasabi.com/wp-json/wp/v2/posts/${id}?_embed`
      .get(`https://sanuki-udon-love.net/wp-json/wp/v2/posts/${id}?_embed`)
      .then((res) => {
        console.log(res.data.title.rendered)
        this.post = res.data
      })
 }
}
</script>
<style>
.v-main {
    background-color: #f8f8f8;
}
.container {
    background-color: #fff;
    margin-top: 3rem;
}
.content {
    margin-top: 3rem;
}
.content img {
    object-fit: cover;
    margin: 10px auto;
    max-height: 400px;
    max-width: 100%;
}
.content iframe {
    max-width: 100%;
    max-height: 400px;
}
</style>

    