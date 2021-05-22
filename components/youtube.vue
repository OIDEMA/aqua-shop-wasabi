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
            @keyup="searchVideo"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col 
          lg="4" 
          v-for="movie in results" v-bind:key="movie.id.videoId"
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

            <a v-bind:href="'https://www.youtube.com/watch?v=' + movie.id.videoId">
              <v-img
                height="250"
                v-bind:src="movie.snippet.thumbnails.high.url"
              ></v-img>
            </a>

            <v-card-title>{{ movie.snippet.title }}</v-card-title>
                
            <v-divider class="mx-4"></v-divider>

            <v-card-text>
              <div>{{ movie.snippet.description}}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>関連タグ</v-card-title>

            <v-card-text>
              <v-chip-group
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip>5</v-chip>

                <v-chip>7:30PM</v-chip>

                <v-chip>8:00PM</v-chip>

                <v-chip>9:00PM</v-chip>
              </v-chip-group>
            </v-card-text>
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
        maxResults: "20", // 最大検索数
        channelId: "UCDs7irJuIRA4G6jFxsgrFFw",
        key: "AIzaSyCAgz9qZTtugReIE9UN86J65IdSGb8OrqY"
      }
    };
  },
  mounted() {
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: this.params
      })
      .then((res) => {
        this.results = res.data.items;
      })
  },
  methods: {
    searchVideo: function() {
      this.params.q = this.keyword;
      var self = this;
      axios
        .get("https://www.googleapis.com/youtube/v3/search", {
          params: this.params
        })
        .then(function(res) {
          self.results = res.data.items;
          console.log(res.data.items)
        })
    }
  },
}
</script>
