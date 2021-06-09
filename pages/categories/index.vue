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
                width="330"
                height="110"
                elevation="8"
                @click="category_push(category.id)"
            >

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
export default {
  data: function() {
    return {
        categories: [
            {
                id: 1,
                name: "①初めて水草水槽を始める方から多い質問"
            },
            {
                id: 2,
                name: "②水草に関するご質問"
            },
            {
                id: 3,
                name: "③器材に関するご質問"
            },
            {
                id: 4,
                name: "④レイアウトデザインに関するご質問"
            },
            {
                id: 5,
                name: "⑤レイアウト素材（石・流木）に関するご質問"
            },
            {
                id: 6,
                name: "⑥水質に関するご質問（トラブル・コケ問題など）"
            },
            {
                id: 7,
                name: "⑦生き物に関するご質問"
            },
            {
                id: 8,
                name: "⑧水草水槽の作り方に関するご質問"
            },
            {
                id: 9,
                name: "⑨サポートに関するご質問（初期不良・修理受付・お取り寄せなど）"
            },
            {
                id: 10,
                name: "⑩その他のご質問"
            }
        ]
    };
  },
    methods: {
        category_push(id) {
            this.$router.push({ path: `/categories/${id}` })
        },
    }
}
</script>
<style>
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