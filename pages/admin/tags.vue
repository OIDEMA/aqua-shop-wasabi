<template>
  <v-container fluid>
    <v-container fluid id="new">   
      <v-row justify="center" align="center">
        <label>
          <span>
            新しいタグを追加する
          </span>
          <input
            type="text"
            v-model="tag.name"
            placeholder="新しいタグ名を入力"
          >
        </label>

        <v-btn
          type="button"
          @click="createTag()"
          color="success"
        >
        タグを登録する
        </v-btn>
      </v-row>  
  </v-container>

  <v-container>
    <v-row justify="center" align="center">
      <h2>すでに登録されているタグ</h2>
    </v-row>
  </v-container>

  <section id="tags">
   <v-container v-if="tags.length">
     <v-row align="center" justify="center">
       <div
        v-for="(tag, i) in tags" 
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
            @click="setUpdateTag(tag.name)"
          >
          {{ tag.name }}
          </v-btn>
        </template>

        <template v-slot:default="dialog">
            <v-card id="dialog">

              <v-toolbar
                color="primary"
                dark
              >{{ tag.name }}
              </v-toolbar>
              
              <v-card-text>
                <v-container fluid pa-0>

                  <v-row align="center" justify="center">
                    <input
                      type="text"
                      v-model="updatedTag"
                      style="border:1px solid #E0E0E0; margin-top: 3rem; border-radius: 4px; padding: 5px; width: 100%;"
                    >
                  </v-row>

                  <v-row align="center" justify="center">

                    <v-btn
                      type="button"
                      @click="updateTag(tag.id)"
                      outlined
                      color="success"
                      style="margin-top: 1rem;"
                    >
                    タグを更新する
                    </v-btn>

                    <v-btn
                      type="button"
                      @click="deteleTag(tag.id)"
                      outlined
                      color="warning"
                      style="margin-top: 1rem;"
                    >
                    タグを削除する
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
    <v-cotainer>
        <v-row justify="center" align="center">
            <v-btn 
                @click="back()"
                color="blue"
                block
                >管理画面TOPへ</v-btn>
        </v-row>
    </v-cotainer>
  </section>

 </v-container>

</template>

<script>
import firebase from '@/plugins/firebase'
import 'firebase/firestore';

export default {
 data :function() {
   return {
     tags: [],
     tag: {
       name: "",
       createdDate: "",
       updatedDate: ""
      },
    updatedTag: ""
   }
 },
 mounted() {
   this.getTags()
 },
 methods: {
    getTags() {
    const firestore = firebase.firestore()
    const tags = firestore.collection('tags')
    tags
    .get()
      .then((doc) => {
        doc.docs.forEach(tag => {
          firestore.collection('tags').doc(tag.id)
            .get()
              .then(async(doc) => {
                await this.getTagId(doc.data())
              }
            )
            .catch((err) => {
              throw err
            })
        })
      })
   },
   async getTagId(tag) {
     firebase.firestore().collection('tags')
      .where('name', '==', tag.name)
      .get()
        .then( async (snapshots) => {
          const tagId = await snapshots.docs[0].id
          const item = Object.assign( { id: tagId }, tag )
          this.tags.push(item)
        })
        .catch((err) => {
          throw err
        })
   },
   createTag () {
     const firestore = firebase.firestore()
     const tag = firestore.collection('tags')
     if (this.tag.name.length) {
       tag
       .add({
         name: this.tag.name,
         createdDate: firebase.firestore.FieldValue.serverTimestamp(),
         updatedDate: firebase.firestore.FieldValue.serverTimestamp()
       })
       .then(ref => {
          firestore.collection('tags').doc(ref.id)
            .get()
              .then(async (doc) => {
                await this.getTagId(doc.data())
                this.tag.name = ""
              }
            )
       })
     } else {
       window.alert('タグの名前が入力されていません')
     }
   },
   deteleTag(id) {
      firebase.firestore().collection('tags').doc(id).delete()
        .then(
          this.tags.filter((tag, i) => {
            if (tag.id == id) {
              this.tags.splice(i, 1)
            }
          })
        )
    },
  　updateTag(id) {
    　firebase.firestore().collection('tags').doc(id)
      .set({
        name: this.updatedTag,
        updatedDate: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(
        this.tags.filter((tag, i) => {
          if (tag.id == id) {
            this.tags[i]['name'] = this.updatedTag
          }
        })
      )
    },
    setUpdateTag(name) {
      this.updatedTag = name
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