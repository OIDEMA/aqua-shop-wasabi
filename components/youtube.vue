<template>
  <v-container>
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
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col>
          <v-btn
          v-for="(word, i) in words"
          :key="i"
          @click="searchVideoByTag(word)"
          >{{ '# ' + word }}</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid pa-0 ma-0>
      <v-row>
        <v-col 
          lg="4" 
          v-for="(video, i) in results" v-bind:key="i"
        >
          <v-card
            class="mx-auto my-12"
            max-width="400"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

              <v-dialog
                  transition="dialog-top-transition"
                  max-width="1000"
              >

              <template v-slot:activator="{ on, attrs }">
                <v-img
                  :src="video.snippet.thumbnails.high.url"
                  v-bind="attrs"
                  v-on="on"
                  style="cursor: pointer"
                ></v-img>
              </template>

              <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar
                        color="success"
                        style="color: #fff; font-weight: bold;"
                      >
                        {{ video.snippet.title }}
                    </v-toolbar>

                    <v-container fluid style="background: #000;">
                      <v-row justify="center" align="center">
                        <youtube :video-id="video.id.videoId" style="margin: 3rem auto;"></youtube>
                      </v-row>
                    </v-container>
                    
                    <v-card-actions class="justify-end">
                        <v-btn
                            text
                            @click="dialog.value = false"
                        >Close</v-btn>
                    </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          
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
        key: "AIzaSyBs8lTRdT_XUSbZX_8HMIsTssbKpjSQY2s"
      },
      // AIzaSyCAgz9qZTtugReIE9UN86J65IdSGb8OrqY
      // AIzaSyBs8lTRdT_XUSbZX_8HMIsTssbKpjSQY2s
      words: [
        "流木", "水槽サイズ", "水草水槽の作り方", "初心者", "熱帯魚"
      ]
    };
  },
  created() {
    axios.get("https://www.googleapis.com/youtube/v3/search", { params: this.params })
      .then((res) => {
        this.results = res.data.items;
      }
    )
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
    }
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
.v-card iframe {
  margin: 0 auto;
}
</style>
