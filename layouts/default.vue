<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-img 
      v-bind:src="imageLogo"
      id="logo"
      @click="root_push()"
    >
    </v-img>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list style="margin: 3rem auto;">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container  >
        <nuxt />
      </v-container>
    </v-main>

    <!-- <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      imageLogo: require('@/assets/image/logo.svg'),
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-message-text',
          title: '質問カテゴリ',
          to: '/categories'
        },
        {
          icon: 'mdi-email',
          title: 'お問い合わせ',
          to: '/contact'
        },
        {
          icon: 'mdi-wrench',
          title: 'マニュアル検索',
          to: '/manuals'
        },
        {
          icon: 'mdi-apps',
          title: '動画検索',
          to: '/search'
        }
      ],
      miniVariant: false,
      right: true,
    }
  },
  methods: {
    root_push() {
      this.$router.push({ path: `/` })
    }
  }
}
</script>

<style scoped>
#logo {
  max-height: 50px;
  max-width: 130px;
  cursor: pointer;
}
</style>