<template>
    <v-container fluid id="home">
        <v-row justify="center" align="center">
          <v-col
            sm="4"
            v-for="(video, i) in videos"
            v-bind:key="i"
            @click="explanation_push(video.id)"
            >

              <v-card
                elevation="12"
                height="180"
              >
                <v-card-text>
                  {{ video.name }}
                </v-card-text>
              </v-card>
          </v-col>
        </v-row>

        <v-btn>
          初めての            
        </v-btn>
    </v-container>
</template>

<script>
export default {
    data: function() {
        return {
            playing: false,
            videoId: "WEsMLQLAyC8",
            videos: [
              {
                id: "WEsMLQLAyC8",
                name: "初めての方への動画"
              },
              {
                id: "WEsMLQLAyC8",
                name: "リザーブサービス説明動画"
              },
              {
                id: "WEsMLQLAyC8",
                name: "グリーンネットサービス説明動画"
              },
            ]
        };
    },
    computed: {
        player() {
          return this.$refs.youtube.player
        }
    },
    methods:{
        playVideo(){
            this.player.playVideo()
            this.playing = true
        },
        pauseVideo(){
            this.player.pauseVideo()
            this.playing = false
        },
        explanation_push(id) {
            this.$router.push({ path: `explanations/${id}` })
        },
    },
}
</script>
<style>
.v-main {
    background-color: #f8f8f8;
}
.v-card {
  margin: 0.5rem;
}
#home {
  height: 100vh;
}
#home .container {
    background-color: #fff;
    margin: 1rem auto;
}
</style>