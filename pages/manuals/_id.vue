<template>
    <v-container fluid pa-0>
        <v-row justify="center" align-content="center">
            <v-col col="12" lg="8">

                <v-img
                v-if="post === null" src="http://aqua-wasabi.com/shop/info/img/shop01@2x.jpg"
                height="400px"
                ></v-img>

                <v-img
                v-else :src="post._embedded[`wp:featuredmedia`][0].source_url"
                height="400px"
                ></v-img>
                
                <h1 v-if="post !== null">{{ post.title.rendered }}</h1>
                <p v-if="post !== null">{{ post.date | date }}</p>

                <v-divider></v-divider>

                <div class="content" v-if="post !== null" v-html="post.content.rendered "></div>
            </v-col>
        </v-row>

        <v-row justify="center" align-content="center" id="back">
            <v-col col="12" lg="8">
                <v-btn 
                    color="success"
                    @click="manuals_push()"
                >
                <v-icon
                    dark
                    left
                >
                mdi-arrow-left
                </v-icon>
                戻る
                </v-btn>
            </v-col>
        </v-row>

        <section>
            <v-row justify="center" align-content="center" style="margin: 0;">
                <h2>関連</h2>
                <v-col col="12" lg="10">
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(item, i) in relatedPosts" :key="i" >
                            <v-card
                                class="mx-auto my-12"
                                max-width="344"
                                >
                                <v-img
                                    :src="item._embedded[`wp:featuredmedia`][0].source_url"
                                    height="220px"
                                    @click="manual_push(item.id)"
                                ></v-img>

                                <v-card-title>
                                    <p style="font-weight: bold">{{ item.title.rendered }}</p>
                                </v-card-title>

                                <v-divider></v-divider>

                                <v-card-subtitle>
                                    {{ item.date | date }}
                                </v-card-subtitle>

                                <v-card-text>
                                    {{ item.excerpt.rendered | replace }}
                                </v-card-text>
                            </v-card>
                        </swiper-slide>
                        <div
                        slot="pagination"
                        class="swiper-pagination"/>
                        <div
                        slot="button-prev"
                        class="swiper-button-prev"/>
                        <div
                        slot="button-next"
                        class="swiper-button-next"/>
                    </swiper>
                </v-col>
            </v-row>
        </section>


    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data: function() {
    return {
        post: null,
        content: null,
        relatedPosts: [],
        swiperOption: {
            speed: 1000,//スライドの切り替わりスピード
            spaceBetween: 10,//各スライドの余白
            centeredSlides: true,//スライダーを真ん中に
            loop: true, //無限ループ
            slidesPerView: 3,
            autoplay: { //スライドの自動切り替え
                delay: 5000,//スライドの自動切り替えの秒数
                disableOnInteraction: false//何らかのアクション後の自動切り替えを再開
            }
        },
        pagination: { //ページネーション設定
        el: '.swiper-pagination',
        clickable: true
        },
        navigation: { //ナビゲーション設定
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    }; 
},
 mounted() {
    const id = this.$nuxt.$route.params.id
    axios
      // .get(`http://aqua-wasabi.com/wp-json/wp/v2/posts/${id}?_embed`
      .get(`https://rocketnews24.com/wp-json/wp/v2/posts/${id}?_embed`)
      .then((res) => {
        console.log(res.data.title.rendered)
        this.post = res.data
      }
    ),
    axios
      .get(`https://rocketnews24.com/wp-json/wp/v2/posts?_embed`, { params: {
          per_page: 6
      }
      })
      .then((res) => {
        this.relatedPosts = res.data
      }
    )
 },
 methods: {
    manuals_push() {
        this.$router.push({ path: `/manuals` })
    }
 }
}
</script>
<style>
.v-main {
    background-color: #f8f8f8;
}
.container {
    background-color: #fff;
    margin-top: 3rem;
}
.content {
    margin-top: 3rem;
}
.content img {
    object-fit: cover;
    margin: 10px auto;
    max-height: 400px;
    width: 100%;
}
.content iframe {
    max-width: 100%;
    max-height: 400px;
}
#back .v-btn {
    border-radius: 25px;
    width: 100%;
    margin-bottom: 3rem;
}
</style>

    