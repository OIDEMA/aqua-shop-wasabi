<template>
    <v-container>
        
        <v-container fluid pa-0 ma-4 class="category">
            <v-row align="center" justify="center">
                <h2>{{category.title}}</h2>
            </v-row>
        </v-container>

        <v-container fluid pa-0 ma-4 id="back">
            <v-row align="center" justify="center">
              <v-btn 
                  @click="back()"
                  color="blue"
                  block
                  >質問項目一覧へ
                </v-btn>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
import firebase from '@/plugins/firebase'
import 'firebase/firestore';

export default {
    data: function() {
        return {
            categoryId: this.$route.params.id,
            category: {}
        };
    },
    mounted() {
        console.log(this.categoryId)
        this.getCategoryId(this.categoryId)  
    },
    methods: {
        async getCategoryId(id) {
            firebase.firestore().collection('categories').doc(id)
            .get()
              .then(async(doc) => {
                this.category = await doc.data()
              }
            )
            .catch((err) => {
              throw err
            })
        },
        back() {
            this.$router.push({ path: `/categories` })
        },
    }
}
</script>
<style>

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
