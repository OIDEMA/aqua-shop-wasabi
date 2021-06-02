<template>
<v-container fluid pa-0 ma-4>
    <v-row align="center" justify="center">
        <v-col lg="4" 
            v-for="(category, i) in categories"
            v-bind:key="i"
        >
            <v-card
                class="mx-auto"
                width="330"
                height="110"
            >

                <v-card-text>
                    <p class="text-h6">
                        {{ category }}
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
          '①初めて水草水槽を始める方から多い質問',
          '②水草に関するご質問',
          '③器材に関するご質問',
          '④レイアウトデザインに関するご質問',
          '⑤レイアウト素材（石・流木）に関するご質問',
          '⑥水質に関するご質問（トラブル・コケ問題など）',
          '⑦生き物に関するご質問',
          '⑧水草水槽の作り方に関するご質問',
          '⑨サポートに関するご質問（初期不良・修理受付・お取り寄せなど）',
          '⑩その他のご質問'
        ]
    };
  }
}
</script>
<style>
.v-main {
    background-color: #f8f8f8;
}
.container {
    margin: 4rem auto;
    background-color: #fff;
}
.v-card__text {
    height: 100%;
}
</style>