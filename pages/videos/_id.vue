<template>
    <v-container>
        <v-container>
            <v-row justify="center" align="center">
                <youtube :video-id="videoId" ref="youtube" @playing="playingVideo"></youtube>
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
            videoId: this.$nuxt.$route.params.id,
        };
    },
    methods:{
        playVideo(){  // 再生処理
            this.player.playVideo()
            this.playing = true
        },
        pauseVideo(){ // 停止処理
            this.player.pauseVideo()
            this.playing = false
        },
        playingVideo(){
            console.log('play start!')
        },
        root_push(id) {
            this.$router.push({ path: `/` })
        },
    },
    computed:{
        player(){
            return this.$refs.youtube.player
        }
    }
}
</script>