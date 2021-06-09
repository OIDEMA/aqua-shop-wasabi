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

        <v-row justify="center" align="center">
          <v-col col="6">
            <v-dialog
              v-model="dialog"
              width="500"
            >

            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                block
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                初めてご利用される方はこちら     
              </v-btn>
            </template>

            <v-card>
                    <v-card-title class="text-h5 success lighten-2">
                      利用規約への同意
                    </v-card-title>

                    <v-card-text style="margin: 3rem auto; padding: 0 1rem;">
                      こちらに利用規約チックなものを入れる
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        text
                        @click="root_push()"
                      >
                        同意する
                      </v-btn>
                    </v-card-actions>
                  </v-card>
            </v-dialog>
          </v-col>

          <v-col
            col="6">
            <v-btn
              block
              color="success"
              @click="category_push()"
            >
            過去に利用した頃がある方はこちら
            </v-btn>
          </v-col>
        </v-row>

    </v-container>
</template>

<script>
export default {
    data: function() {
        return {
            dialog: false,
            videos: [
              {
                id: "OaSZFci-ryE",
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
            this.$router.push({ path: `/explanations/${id}` })
        },
        category_push() {
            this.$router.push({ path: `/categories` })
        },
        root_push() {
            this.dialog = false
            this.$router.push({ path: `/` })
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
#home .v-btn {
  margin: 1rem auto;
  height: 100px;
}
</style>