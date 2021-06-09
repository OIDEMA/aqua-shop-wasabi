<template>
    <v-container fluid id="home">
        <v-row justify="center" align="center" style="margin-top: 3rem;">
          <v-col
            sm="4"
            @click="explanation_push(videos[0].id)"
            >
              <v-card
                id="top_1"
                elevation="12"
                height="180"
              >
                <v-icon
                large
                >mdi-play-circle
                </v-icon>
              </v-card>
              <v-container style="background-color: #f8f8f8;">
                <v-row align="center" justify="center">
                </v-row>
              </v-container>
          </v-col>

          <v-col
            sm="4"
            @click="explanation_push(videos[1].id)"
            >

              <v-card
                id="top_2"
                elevation="12"
                height="180"
              >
                <v-icon
                  large
                >mdi-play-circle</v-icon>
              </v-card>
              <v-container style="background-color: #f8f8f8;">
                <v-row align="center" justify="center" style="font-weight: bold;"
                @click="contact_push()"
                >
                「お問い合わせはこちら」
                </v-row>
              </v-container>
          </v-col>

          <v-col
            sm="4"
            @click="explanation_push(videos[2].id)"
            >

              <v-card
                elevation="12"
                height="180"
                id="top_3"
              >
                <v-icon
                  large
                >mdi-play-circle</v-icon>
              </v-card>
              <v-container style="background-color: #f8f8f8;">
                <v-row align="center" justify="center" style="font-weight: bold; cursor: pointer;"
                @click="contact_push()"
                >
                  「お問い合わせはこちら」
                </v-row>
              </v-container>
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
              過去に利用した頃がある方
              </v-btn>
            </template>

            <v-card>
                    <v-card-title class="text-h5 success lighten-2">
                      利用されたことがある方
                    </v-card-title>

                    <v-card-text style="margin: 3rem auto; padding: 0 1rem; color: #000;">
                      規約を守ってご利用ください。
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        text
                        @click="category_push()"
                      >
                        規約を守って利用する
                      </v-btn>
                    </v-card-actions>
                  </v-card>
            </v-dialog>
          </v-col>

          <!-- <v-col
            col="6">
            <v-btn
              block
              color="success"
              @click="category_push()"
            >
            過去に利用した頃がある方はこちら
            </v-btn>
          </v-col> -->
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
            this.$router.push({ path: `/` })
        },
        contact_push() {
            this.$router.push({ path: `/contact` })
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

#top_1 {
  background-image: url("../assets/image/top_1.png");
  background-position: center;
  background-size: cover;
}

#top_2 {
  background-image: url("../assets/image/top_2.png");
  background-position: center;
  background-size: cover;
}

#top_3 {
  background-image: url("../assets/image/top_3.png");
  background-position: center;
  background-size: cover;
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
  height: 80px;
}

#home .v-card {
  position: relative;
}

#home .v-card .v-icon {
  position: absolute;
  right: 15px;
  bottom: 15px;
  color: #146929;
  transition: transform 0.3s ease-out;
}

#home .v-card .v-icon:hover {
  transform: rotate(30deg);
  color:#74EC92;
}


</style>