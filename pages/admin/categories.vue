<template>
  <v-container fluid>

    <v-container fluid id="new">   
      <v-row justify="center" align="center">
        <label>
          <span>
            新しいカテゴリを作る
          </span>
          <input
            type="text"
            v-model="category.title"
            placeholder="新しいカテゴリを作る"
          >
        </label>

        <v-btn
          type="button"
          @click="createCategory()"
          color="success"
        >
        カテゴリを登録する
        </v-btn>
      </v-row>  
    </v-container>

    <v-container>
      <v-row justify="center" align="center">
        <h2>すでに登録されているカテゴリ</h2>
      </v-row>
    </v-container>

    <section id="tags">
    <v-container v-if="categories.length">
      <v-row align="center" justify="center">
        <div
          v-for="(category, i) in categories" 
          :key="i"
          style="margin: 0;"
        >

        <v-dialog
          transition="dialog-bottom-transition"
          max-width="600"
        >

          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              v-bind="attrs"
              v-on="on"
              @click="updateCategory(category.title)"
            >
            {{ category.title }}
            </v-btn>
          </template>

          <template v-slot:default="dialog">
              <v-card id="dialog">

                <v-toolbar
                  color="primary"
                  dark
                >{{ category.title }}
                </v-toolbar>
                
                <v-card-text>
                  <v-container fluid pa-0>

                    <v-row align="center" justify="center">
                      <input
                        type="text"
                        v-model="updatedCategory"
                        style="border:1px solid #E0E0E0; margin-top: 3rem; border-radius: 4px; padding: 5px; width: 100%;"
                      >
                    </v-row>

                    <v-row align="center" justify="center">

                      <v-btn
                        type="button"
                        @click="updateCategory(category.id)"
                        outlined
                        color="success"
                        style="margin-top: 1rem;"
                      >
                      カテゴリを更新する
                      </v-btn>

                      <v-btn
                        type="button"
                        @click="deteleCategory(category.id)"
                        outlined
                        color="warning"
                        style="margin-top: 1rem;"
                      >
                      カテゴリを削除する
                      </v-btn>

                    </v-row>

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
    </v-container>
    </section>

    <section id="back">
      <v-container>
          <v-row justify="center" align="center">
              <v-btn 
                  @click="back()"
                  color="blue"
                  block
                  >管理画面TOPへ</v-btn>
          </v-row>
      </v-container>
    </section>

 </v-container>

</template>

<script>
import firebase from '@/plugins/firebase'
import 'firebase/firestore';

export default {
 data :function() {
   return {
     categories: [],
     category: {
       title: "",
       createdDate: "",
      },
    updatedCategory: ""
   }
 },
 mounted() {
   this.getCategories()
 },
 methods: {
    getCategories() {
    const firestore = firebase.firestore()
    const categories = firestore.collection('categories')
    categories
    .get()
      .then((doc) => {
        doc.docs.forEach(category => {
          firestore.collection('categories').doc(category.id)
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
     firebase.firestore().collection('categories')
      .where('title', '==', category.title)
      .get()
        .then( async (snapshots) => {
          const categoryId = await snapshots.docs[0].id
          const item = Object.assign( { id: categoryId }, category )
          console.log(item)
          this.categories.push(item)
        })
        .catch((err) => {
          throw err
        })
   },
   createCategory() {
     const firestore = firebase.firestore()
     const category = firestore.collection('categories')

     if (this.category.title.length) {
       category
       .add({
         title: this.category.title,
         createdDate: firebase.firestore.FieldValue.serverTimestamp(),
       })
       .then(ref => {
          firestore.collection('categories').doc(ref.id)
            .get()
              .then(async (doc) => {
                await this.getCategoryId(doc.data())
                this.category.title = ""
              }
            )
       })
     } else {
       window.alert('カテゴリの名前が入力されていません')
     }
   },
   deteleCategory(id) {
      firebase.firestore().collection('categories').doc(id).delete()
        .then(
          this.categories.filter((category, i) => {
            if (category.id == id) {
              this.categories.splice(i, 1)
            }
          })
        )
    },
  updateCategory(id) {
    　firebase.firestore().collection('categories').doc(id)
      .set({
        title: this.updatedTag,
        updatedDate: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(
        this.categories.filter((category, i) => {
          if (category.id == id) {
            this.category[i]['name'] = this.updatedCategory
          }
        })
      )
    },
    setUpdateTag(title) {
      this.updatedCategory = title
    },
    back() {
        this.$router.push({ path: `/admin` })
    },
 }
 
}
</script>
<style>
#new label span {
  background-color: #f0f0f0;
  padding: 1rem 10px;
  margin: 0.5rem;
}

#new input {
  border:1px solid #E0E0E0; border-radius: 4px;
  padding: 0.8rem 10px;
  margin: 0.5rem;
}

#new .v-btn {
  margin: 0.5rem;
  padding: 1rem 10px !important;
}

h2 {
  margin: 3rem auto;
}
#tags .v-btn {
  margin: 10px;
  background-color: #fff !important;
  border:1px solid #E0E0E0;
  border-radius: 25px;
}
#dialog .v-btn {
  margin: 10px;
}

#back {
    margin: 2rem auto;
}

#back .row{
    width: 50%;
    margin: 0 auto;
}

#back .v-btn{
    border-radius: 25px;
    color: #fff;
    font-weight: bold;
}
</style>