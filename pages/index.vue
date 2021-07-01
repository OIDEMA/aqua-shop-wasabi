<template>
    <v-container fluid id="home">
        <v-row justify="center" align="center" style="margin-top: 3rem;">
          <v-col
            sm="4"
            >
              <v-card
                @click="explanation_push(videos[0].id)"
                id="top_1"
                elevation="12"
                height="180"
              >
                <v-icon
                large
                >mdi-play-circle
                </v-icon>
              </v-card>
              <v-container>
                <v-row align="center" justify="center" style="height: 1.5rem; margin-top: 1rem;">

                </v-row>
              </v-container>
          </v-col>

          <v-col
            sm="4"
            >
              <v-card
                @click="explanation_push(videos[1].id)"
                id="top_2"
                elevation="12"
                height="180"
              >
                <v-icon
                  large
                >mdi-play-circle</v-icon>
              </v-card>
              <v-container>
                <v-row align="center" justify="center" style="font-weight: bold; cursor: pointer; height: 1.5rem; margin-top: 1rem;"
                @click="contact_push()"
                >
                「お問い合わせはこちら」
                </v-row>
              </v-container>
          </v-col>

          <v-col
            sm="4"
            >
              <v-card
                @click="explanation_push(videos[2].id)"
                elevation="12"
                height="180"
                id="top_3"
              >
                <v-icon
                  large
                >mdi-play-circle</v-icon>
              </v-card>
              <v-container>
                <v-row 
                align="center" 
                justify="center"
                style="font-weight: bold; cursor: pointer; height: 1.5rem; margin-top: 1rem;"
                @click="contact_push()"
                >
                  「お問い合わせはこちら」
                </v-row>
              </v-container>
          </v-col>
        </v-row>


        <v-row justify="center" align="center" id="category">
          <v-col
            sm="4"
            >
              <v-card
                id="top_4"
                elevation="12"
                height="180"
                @click="beginner_push('xrAhVuxjEupO3f4mjS5H')"
              >
              </v-card>
          </v-col>
            <v-col
            sm="4"
            >
              <v-card
                id="top_5"
                elevation="12"
                height="180"
                @click="beginner_push('16F7n5uUUaJGff6VT10I')"
              >
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
import firebase from '@/plugins/firebase'
import 'firebase/firestore';
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
    mounted() {
      this.getCategories()  
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
        beginner_push(id) {
            this.$router.push({ path: `/beginner/${id}` })
        },
        root_push() {
            this.$router.push({ path: `/` })
        },
        contact_push() {
            this.$router.push({ path: `/contact` })
        },
        getCategories() {
        const firestore = firebase.firestore()
        const categories = firestore.collection('top_categories')
        categories
        .get()
          .then((doc) => {
            doc.docs.forEach(category => {
              firestore.collection('top_categories').doc(category.id)
                .get()
                  .then(async(doc) => {
                    await this.getCategoryId(doc.data())
                  }
                )
                .catch((err) => {
                  throw err
                })
            })
          })
      },
      async getCategoryId(category) {
        firebase.firestore().collection('top_categories')
          .where('title', '==', category.title)
          .get()
            .then( async (snapshots) => {
              const categoryId = await snapshots.docs[0].id
              const item = Object.assign( { uid: categoryId }, category )
              console.log({item:    item})
              this.categories.push(item)
            })
            .catch((err) => {
              throw err
            })
      },
    }
  }
</script>
<style scoped>
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
#top_4 {
  background-image: url("../assets/image/top_4.png");
  background-position: center;
  background-size: cover;
}
#top_5 {
  background-image: url("../assets/image/top_5.jpeg");
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

#category .container {
    margin: 1rem auto;
    height: 100vh;
    background-color: #fff;
}
.v-card__text {
    height: 100%;
}
</style>