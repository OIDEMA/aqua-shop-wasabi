<template>
    <v-container>
        <v-container>
            <v-row justify="center" align="center">
                <youtube v-if="videoId" :video-id="videoId" ref="youtube"></youtube>
            </v-row>
            <v-row justify="center" align="center">
                <v-btn v-if="playing"
                @click="pauseVideo()"
                >一時停止</v-btn>
                <v-btn
                 v-else
                @click="playVideo()"
                >再生</v-btn>
            </v-row>
        </v-container>
        <v-container>
            <v-btn
             @click="root_push()"
            >戻る</v-btn>
        </v-container>
    </v-container>
</template>

<script>
export default {
    data: function() {
        return {
            playing: false,
            videoId: this.$nuxt.$route.params.id
        };
    },
    methods: {
        playVideo() {
            this.player.playVideo()
            this.playing = true
        },
        pauseVideo() {
            this.player.pauseVideo()
            this.playing = false
        },
        root_push() {
            this.$router.push({ path: `/` })
        }
    },
    mounted(){
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('type', 'text/javascript')
        recaptchaScript.setAttribute('src', 'https://www.youtube.com/iframe_api')
        document.head.appendChild(recaptchaScript)
    },

    computed: {
        player() {
            return this.$refs.youtube.player
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
</style>