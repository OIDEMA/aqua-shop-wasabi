<template>
  <v-container id="player">

    <v-container fluid>
      <v-row>
        <v-col>
          <v-text-field
            v-model="keyword"
            outlined
            label="検索キーワードを入力"
            prepend-inner-icon="mdi-text-search"
            @keyup="searchVideo()"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col id="tag">
          <v-btn
          v-for="(tag, i) in tags"
          :key="i"
          @click="searchVideoByTag(tag.name)"
          >{{ '# ' + tag.name }}</v-btn>
        </v-col>
      </v-row>

    </v-container>

    <v-container fluid pa-0 ma-0>
      <v-row>
        <v-col 
          sm="4" 
          v-for="(video, i) in results" v-bind:key="i"
        >
          <v-card
            class="mx-auto my-12"
            max-width="400"
          >

            <v-img
              :src="video.snippet.thumbnails.high.url"
              @click="video_push(video.id.videoId)"
              style="cursor: pointer"
            ></v-img>

          
            <v-card-title>{{ video.snippet.title }}</v-card-title>
                
            <v-divider class="mx-4"></v-divider>

            <v-card-text>
              <div>{{ video.snippet.description }}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>

import axios from 'axios';
import firebase from '@/plugins/firebase'
import 'firebase/firestore';

export default {
  data: function() {
    return {
      results: null,
      keyword: "",
      params: {
        q: "", // 検索クエリを指定します。
        part: "snippet",
        type: "video",
        maxResults: "21", // 最大検索数
        channelId: "UCDs7irJuIRA4G6jFxsgrFFw",
        key: "AIzaSyAfKQMkRZfPs53k2YaFzy8Md4O9hOTEWu0"
      },
      // AIzaSyCAgz9qZTtugReIE9UN86J65IdSGb8OrqY
      // AIzaSyBs8lTRdT_XUSbZX_8HMIsTssbKpjSQY2s
      // AIzaSyAfKQMkRZfPs53k2YaFzy8Md4O9hOTEWu0 /* wasabiアカウントのもの　*/ 
      // UCDs7irJuIRA4G6jFxsgrFFw
      // UCztmY1xMiY8rAfgCK767vTg
      // https://www.googleapis.com/youtube/v3/videos?id=OaSZFci-ryE&type=video&key=AIzaSyAfKQMkRZfPs53k2YaFzy8Md4O9hOTEWu0
      tags: []
    };
  },
  created() {
    axios.get("https://www.googleapis.com/youtube/v3/search", { params: this.params })
      .then((res) => {
        this.results = res.data.items;
      }
    ),
    this.getTags()
  },
  methods: {
    searchVideo() {
      this.params.q = this.keyword;
      var self = this;
      axios.get("https://www.googleapis.com/youtube/v3/search", { params: this.params })
        .then((res) => {
          self.results = res.data.items;
        }
      )
    },
    searchVideoByTag(word) {
      this.params.q = word;
      this.keyword = word;
      var self = this;
      axios.get("https://www.googleapis.com/youtube/v3/search", { params: this.params })
        .then((res) => {
          self.results = res.data.items;
        }
      )
    },
    video_push(id) {
      this.$router.push({ path: `/videos/${id}` })
    },
    getTags() {
    const firestore = firebase.firestore()
    const tags = firestore.collection('tags')
    tags
    .get()
      .then((doc) => {
        doc.docs.forEach(tag => {
          firestore.collection('tags').doc(tag.id)
            .get()
              .then(async(item) => {
                this.tags.push(item.data())
              }
            )
          })
      })
    }
  }
}
</script>
<style scoped>
.v-main {
    background-color: #f8f8f8;
}
#player .container {
    background-color: #fff;
}
#tag .v-btn {
  border-radius: 20px;
  margin: 0 5px;
  background-color: #fff !important;
  border: 1px solid #E0E0E0;
  font-weight: bold;
}
</style>
