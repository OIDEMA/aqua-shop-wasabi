<template>
<v-container fluid pa-0 ma-4 class="category">
    <v-row align="center" justify="center">
        <v-col 
            sm="4" 
            v-for="(category, i) in categories"
            v-bind:key="i"
        >
            <v-card
                class="mx-auto"
                width="340"
                height="180"
                elevation="8"
                @click="category_push(category.id)"
            >
                <v-avatar
                  color="success"
                  size="52"
                >
                <span class="white--text text-h5">{{ i + 1 }}</span>
                </v-avatar>

                <v-card-text>
                    <p class="text-h6">
                        {{ category.name }}
                    </p>
                </v-card-text>
            </v-card>   
        </v-col> 
    </v-row>
</v-container>
</template>

<script>
// import firebase from '@/plugins/firebase'
// import 'firebase/firestore';
import axios from 'axios';
export default {
  data: function() {
    return {
        categories: []
    };
  },
// 　computed: {
//     sortCategories() {
//         return this.categories.sort((a, b) => {
//             console.log(this.categories)
//             return a.id - b.id;
//         });
//     }
// 　},
  mounted() {
    this.getCategories()  
  },
  methods: {
    /* WordPressからカテゴリを取得する */
    getCategories() {
      axios
        .get(`https://tablet.aqua-wasabi.com/wp-json/wp/v2/categories`, { params: {
            parent: 0
        }
        })
        .then((res) => {
          console.log(res.data)
          this.categories = res.data
        }
      )
    },
  /* FireStoreに設定を行った場合 */
  //   getCategories() {
  //   const firestore = firebase.firestore()
  //   const categories = firestore.collection('categories')
  //   categories
  //   .get()
  //     .then((doc) => {
  //       doc.docs.forEach(category => {
  //         firestore.collection('categories').doc(category.id)
  //           .get()
  //             .then(async(doc) => {
  //               await this.getCategoryId(doc.data())
  //             }
  //           )
  //           .catch((err) => {
  //             throw err
  //           })
  //       })
  //     })
  //  },
  //  async getCategoryId(category) {
  //    firebase.firestore().collection('categories')
  //     .where('title', '==', category.title)
  //     .get()
  //       .then( async (snapshots) => {
  //         const categoryId = await snapshots.docs[0].id
  //         const item = Object.assign( { uid: categoryId }, category )
  //         console.log({item:    item})
  //         this.categories.push(item)
  //       })
  //       .catch((err) => {
  //         throw err
  //       })
  //  },
    category_push(id) {
        this.$router.push({ path: `/categories/${id}` })
    },
  }
}
</script>
<style scoped>
.v-main {
    background-color: #f8f8f8;
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