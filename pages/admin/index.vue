<template>
<v-container fluid pa-0 ma-4 class="category">
    <v-row align="center" justify="center">
        <v-col 
            sm="4" 
            v-for="(menu, i) in menus"
            v-bind:key="i"
        >
            <v-card
                class="mx-auto"
                width="330"
                height="110"
                elevation="8"
                @click="menu_push(menu.param)"
            >

                <v-card-text>
                    <p class="text-h6">
                        {{ menu.name }}
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
        menus: [
            { 
                param: "tags",
                name: "動画検索キーワードタグの作成"
            },
            { 
                param: "categories",
                name: "カテゴリの作成"
            },
        ]
    };
  },
    methods: {
        menu_push(param) {
            this.$router.push({ path: `/admin/${param}` })
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