<template>
  <section class="container">
    <header-nav />
    <div>
      <h1 class="title">
        perfs-benchmark : index
      </h1>
      <h2 class="subtitle">
        A comparison of the performance of a nuxt project
      </h2>
      <p>This page represents a static page</p>
      <div class="sample">
        <h3>{{ items.title }}</h3>
        <p>{{ items.body }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import HeaderNav from '~/components/HeaderNav.vue'

export default {
  components: {
    HeaderNav,
  },
  async asyncData() {
    let { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/1`)
    return { items: data }
  },
}
</script>

