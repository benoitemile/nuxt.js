<template>
  <section class="container">
    <header-nav />
    <div>
      <h1 class="title">
        perfs-benchmark : list
      </h1>
      <h2 class="subtitle">
        Rendering 100 items, SSR
      </h2>
      <div class="sample">
        <ul>
          <li
            v-for="(item, n) in items"
            :key="n">
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import HeaderNav from '~/components/HeaderNav.vue'

export default {
  components: {
    HeaderNav
  },
  async asyncData() {
    let { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
    return { items: data }
  }
}
</script>
