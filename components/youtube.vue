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

            <!-- <a v-bind:href="'https://www.youtube.com/watch?v=' + movie.id.videoId"> -->
              <v-img
                :src="movie.snippet.thumbnails.high.url"
                @click="video_push(movie.id.videoId)"
                style="cursor: pointer"
              ></v-img>
            <!-- </a> -->

            <v-card-title>{{ movie.snippet.title }}</v-card-title>
                
            <v-divider class="mx-4"></v-divider>

            <v-card-text>
              <div>{{ movie.snippet.description}}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <!-- <v-card-title>関連タグ</v-card-title>

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
            </v-card-text> -->
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
        key: "AIzaSyCAgz9qZTtugReIE9UN86J65IdSGb8OrqY"
      },
      words: [
        "流木", "水槽サイズ", "水草水槽の作り方", "初心者", "熱帯魚"
      ]
    };
  },
  created() {
    axios.get("https://www.googleapis.com/youtube/v3/search", { params: this.params })
      .then((res) => {
        console.log(res.data.items)
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
          console.log(res.data.items)
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
          console.log(res.data.items)
        }
      )
    },
    video_push(id) {
      console.log(id)
      this.$router.push({ path: `/videos/${id}` })
    }
  }
}
</script>
