<template>
  <v-container fluid pa-0 ma-0>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-text-field
            v-model="keyword"
            outlined
            label="検索キーワードを入力"
            prepend-inner-icon="mdi-text-search"
            @keyup="searchManuals()"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center" align="center">
        <v-col id="tag">
          <v-btn
            v-for="(tag, i) in tags"
            :key="i"
            @click="searchTag(tag.id)"
          >{{"#" + tag.name}}</v-btn>
          <v-btn
          @click="refreshData()"
          >リフレッシュデータ</v-btn>
        </v-col>
      </v-row>
    
    </v-container>
    
    <v-container fluid pa-0 ma-0>
      <v-row justify="center" align="center">
        <v-col
          lg="4"
          v-for="(post, i) in posts"
          :key="i"
        >
          <v-card
          class="mx-auto my-12" 
          max-width="344"
        >
          <v-img
            :src="post['image']"
            height="220px"
            @click="manual_push(post.id)"
          ></v-img>

          <v-card-title>
            <p style="font-weight: bold">{{ post.title.rendered }}</p>
          </v-card-title>

          <v-divider></v-divider>


          <v-card-subtitle>
            {{ post.date | date }}
          </v-card-subtitle>

          <v-card-text>
            {{ post.excerpt.rendered | replace }}
          </v-card-text>

          <!-- <v-card-actions>
            <v-btn
              color="green"
              style="color: #fff;"
              @click="manual_push(post.id)"
            >
              もっと見る
            </v-btn>

            <v-spacer></v-spacer>

          </v-card-actions> -->

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
      videoId: "xTAtJHTe7xc",
      posts: [],
      tags: [],
      keyword: "",
      };
  },
  created() {
    axios.get(`https://sanuki-udon-love.net/wp-json/wp/v2/posts/?search=`)
      .then((res) => {
        res.data.forEach((item) => {
          axios.get(`https://sanuki-udon-love.net/wp-json/wp/v2/media/${item[`featured_media`]}`)
          .then(async (a) => {
            item['image'] = await a.data.guid.rendered
            this.posts.push(item)
          })
        });
      }
    ),
    axios.get(`https://sanuki-udon-love.net/wp-json/wp/v2/tags`)
      .then((res) => {
        this.tags = res.data
      }
    )
  },
  methods: {
    manual_push(id) {
      this.$router.push({ path: `/manuals/${id}` })
    },
    searchManuals() {
      if (this.keyword) {
        this.posts = []
        const content = this.keyword
        axios.get(`https://sanuki-udon-love.net/wp-json/wp/v2/posts/?search=${content}`)
        .then((res) => {
          res.data.forEach((item) => {
            axios.get(`https://sanuki-udon-love.net/wp-json/wp/v2/media/${item[`featured_media`]}`)
            .then(async (a) => {
              item['image'] = await a.data.guid.rendered
              this.posts.push(item)
            })
          });
        })
      }
    },
    searchTag(tagId) {
      this.posts = []
      axios.get(`https://sanuki-udon-love.net/wp-json/wp/v2/posts/?tags=${tagId}`)
      .then((res) => {
        res.data.forEach((item) => {
          axios.get(`https://sanuki-udon-love.net/wp-json/wp/v2/media/${item[`featured_media`]}`)
          .then(async (a) => {
            item['image'] = await a.data.guid.rendered
            this.posts.push(item)
          })
        });
      })
    },
    refreshData() {
      this.posts = []
      axios.get(`https://sanuki-udon-love.net/wp-json/wp/v2/posts/?search=`)
        .then((res) => {
          res.data.forEach((item) => {
            axios.get(`https://sanuki-udon-love.net/wp-json/wp/v2/media/${item[`featured_media`]}`)
            .then(async (a) => {
              item['image'] = await a.data.guid.rendered
              this.posts.push(item)
            })
          });
        }
      )
    }
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
#tag .v-btn {
  border-radius: 20px;
  margin: 0 5px;
  background-color: #fff !important;
  border: 1px solid #000;
  font-weight: bold;
}
</style>