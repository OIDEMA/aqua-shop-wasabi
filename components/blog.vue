<template>
  <v-container id="top" fluid pa-0 ma-0>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-text-field
            v-model="keyword"
            outlined
            label="検索キーワードを入力"
            prepend-inner-icon="mdi-text-search"
            @keyup.enter="searchManuals()"
          ></v-text-field>
        </v-col>
      </v-row>

      <p style="text-align: right; margin-right: 20px;">検索HIT数
        <span style="font-weight: bold;" v-if="this.postCount > 0">
          {{ this.postCount }}
          </span>
        <span style="font-weight: bold;" v-else>
          0
        </span>
      </p>

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
      <v-row>
        <v-col
          sm="4"
          v-for="(post, i) in posts"
          :key="i"
        >
          <v-card
          class="mx-auto my-12"
          max-width="344"
        >
          <v-img
            :src="post._embedded[`wp:featuredmedia`][0].source_url"
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
            >
              確認する
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions> -->
        </v-card>

      </v-col>
    </v-row>
    <infinite-loading
        ref="infiniteLoading"
        spinner="waveDots"
        @infinite="infiniteHandler">
    </infinite-loading>
    </v-container>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data: function() {
    return {
      posts: [],
      tags: [],
      postCount: Number,
      keyword: "",
    };
  },
  mounted() {
    // 最新の投稿を取得
    axios.get(`https://rocketnews24.com/wp-json/wp/v2/posts?_embed`, { params: {
      per_page: 9,
      meta_key: "views",
      order: "desc"
    }})
      .then((res) => {
        // 投稿数の件数を取得
        this.postCount = Number(res.headers['x-wp-total'])
        this.posts = res.data
      }
    ),
    // タグを取得
    axios.get(`https://rocketnews24.com/wp-json/wp/v2/tags`)
      .then((res) => {
          this.tags = res.data
        })
  },
  methods: {
    manual_push(id) {
      this.$router.push({ path: `/manuals/${id}` })
    },
    searchManuals() {
      if (this.keyword) {
        this.posts = []
        const content = this.keyword
        axios.get(`https://rocketnews24.com/wp-json/wp/v2/posts?_embed`, { params: {
          per_page: 9,
          search: content
          }
        }).then((res) => {
        // 投稿数の件数を取得
        this.postCount = Number(res.headers['x-wp-total'])
        this.posts = res.data
        })
      }
    },
    searchTag(tagId) {
      this.posts = []
      axios.get(`https://rocketnews24.com/wp-json/wp/v2/posts?_embed`, { params: {
        per_page: 9,
        tags: tagId
      }}).then((res) => {
        // 投稿数の件数を取得
        this.postCount = Number(res.headers['x-wp-total'])
        this.posts = res.data
      })
    },
    refreshData() {
      this.posts = []
      axios.get(`https://rocketnews24.com/wp-json/wp/v2/posts?_embed`, { params: {
        per_page: 9,
        meta_key: "views",
        order: "desc"
      }})
        .then((res) => {
          // 投稿数の件数を取得
          this.postCount = Number(res.headers['x-wp-total'])
          this.posts = res.data
        }
      )
    },
    infiniteHandler() {
      if (this.keyword) {
      axios.get(`https://rocketnews24.com/wp-json/wp/v2/posts?_embed`, { params: {
        per_page: 9,
        meta_key: "views",
        order: "desc",
        offset: this.posts.length,
        search: this.keyword
      }
      }).then(async (res) => {
        this.posts = await this.posts.concat(res.data)
        this.$refs.infiniteLoading.stateChanger.loaded();
        if (this.posts.length == this.postCount) {
          this.$refs.infiniteLoading.stateChanger.complete();
        }
      })
    } else {
      axios.get(`https://rocketnews24.com/wp-json/wp/v2/posts?_embed`, { params: {
        per_page: 9,
        meta_key: "views",
        order: "desc",
        offset: this.posts.length,
      }
      }).then(async (res) => {
        this.posts = await this.posts.concat(res.data)
        this.$refs.infiniteLoading.stateChanger.loaded();
        if (this.posts.length == this.postCount) {
          this.$refs.infiniteLoading.stateChanger.complete();
        }
      })
    }
    }
  }
}
</script>

<style scoped>
.v-card__title p {
  margin-bottom: 0;
}
.v-image {
  cursor: pointer;
}
#tag .v-btn {
  margin: 0 5px;
  background-color: #fff;
  border-radius: 20px;
  font-weight: bold;
  color: #3CB371;
  border: none;
  box-shadow: none;
}
</style>