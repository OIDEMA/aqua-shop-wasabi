<template>
    <v-container fluid>
        <v-row justify="center" align="center">
            <youtube 
                v-if="videoId"
                :video-id="videoId"
                ref="youtube"
                style="margin: 3rem auto;" 
            />
        </v-row>
        <v-row justify="center" align="center" id="controle">
            <v-btn  
                @click="playVideo()"
            >
            <v-icon
                dark
                left
            >
            mdi-play-box
            </v-icon>
                再生する
            </v-btn>
            <v-btn 
                @click="pauseVideo()"
            >
            <v-icon
                dark
                left
            >
            mdi-square
            </v-icon>
            停止する
            </v-btn>

            <v-btn 
                @click="root_push()"
                color="success"
            >
                <v-icon
                    dark
                    left
                >
                mdi-arrow-left
                </v-icon>
                戻る
            </v-btn>

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
<style scoped>
.v-main {
    background-color: #f8f8f8;
}
.container {
    margin: 1rem auto;
    background-color: #fff;
    margin-top: 2rem;
}
iframe {
    width: 80%;
    height: 500px;
}
#controle {
    margin: 2rem auto;
}
#controle .v-btn {
    margin: 0  5px;
    border-radius: 25px;
    padding: 0 30px;
}
</style>