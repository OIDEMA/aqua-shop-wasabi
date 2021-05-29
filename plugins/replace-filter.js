import Vue from 'vue'

Vue.filter('replace', function (value) {
  const string = value
  return string.replace('<p>', '').replace( '</p>', '').replace('[&hellip;]', '')
})