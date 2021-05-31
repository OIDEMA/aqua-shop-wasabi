<template>
    <v-container>
        <v-row justify="center" align="center">
            <youtube 
                v-if="videoId"
                :video-id="videoId"
                ref="youtube"
                style="margin: 3rem auto;" 
            />
        </v-row>
        <v-row justify="center" align="center">
            <v-btn  @click="playVideo()">再生する</v-btn>
            <v-btn @click="pauseVideo()">停止する</v-btn>
            <v-btn @click="root_push()">戻る</v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: function() {
        return {
            plyaing: false,
            videoId: this.$route.params.id
        };
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
        root_push() {
            this.$router.push({ path: `/` })
        }
    },
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
iframe {
    width: 80%;
    height: 500px;
}
</style>