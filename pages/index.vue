<template>
    <v-container fluid>
        <!-- <v-row justify="center" align="center">
            <youtube 
                v-if="videoId"
                :video-id="videoId"
                ref="youtube"
                style="margin: 3rem auto;" 
            />
        </v-row>
        <v-row justify="center" align="center" id="controle">
            <v-btn  
                @click="playVideo()"
            >
            <v-icon
                dark
                left
            >
            mdi-play-box
            </v-icon>
                再生する
            </v-btn>
            <v-btn 
                @click="pauseVideo()"
            >
            <v-icon
                dark
                left
            >
            mdi-square
            </v-icon>
            停止する
            </v-btn>

            <v-btn 
                @click="root_push()"
                color="success"
            >
                <v-icon
                    dark
                    left
                >
                mdi-arrow-left
                </v-icon>
                戻る
            </v-btn>
        </v-row> -->
        <v-row justify="center" align="center">
          <div
            v-for="(video, i) in videos"
            v-bind:key="i"
            >

            <v-dialog
              transition="dialog-bottom-transition"
              max-width="1000"
            >
            <template v-slot:activator="{ on, attrs }">
              <v-card
                elevation="12"
                height="180"
                width="320"
                v-bind="attrs"
                v-on="on"
              >
              <v-card-text>
                {{ video.name }}
              </v-card-text>
              </v-card>
            </template>

            <template v-slot:default="dialog">
                <v-card id="dialog">

                  <v-toolbar
                    color="success"
                    dark
                  >{{video.name}}
                  </v-toolbar>
                  
                  <v-card-text>
                    <v-container fluid pa-0>
                      <v-row align="center" justify="center">
                      <youtube 
                        v-if="video.id"
                        :video-id="video.id"
                        ref="youtube" 
                      />
                      </v-row>

                      <!-- <v-row justify="center" align="center" id="controle">
                          <v-btn  
                              @click="playVideo()"
                          >
                          <v-icon
                              dark
                              left
                          >
                          mdi-play-box
                          </v-icon>
                              再生する
                          </v-btn>
                          <v-btn 
                              @click="pauseVideo()"
                          >
                          <v-icon
                              dark
                              left
                          >
                          mdi-square
                          </v-icon>
                          停止する
                          </v-btn>
                      </v-row> -->
                    </v-container>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn
                      text
                      @click="dialog.value = false"
                    >閉じる</v-btn>
                  </v-card-actions>
                </v-card>
            </template>
          </v-dialog>

          </div>
        </v-row>
        <v-row>
          <v-btn>
            初めての            
          </v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: function() {
        return {
            plyaing: false,
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
        root_push() {
            this.$router.push({ path: `/` })
        }
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
.container {
    background-color: #fff;
    margin-top: 2rem;
}
#controle {
    margin: 2rem auto;
}
#controle .v-btn {
    margin: 0  5px;
    border-radius: 25px;
    padding: 0 30px;
}
</style>