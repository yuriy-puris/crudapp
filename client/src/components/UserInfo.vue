<template>
  <div class="user-holder">
      <h1>Hello, {{userInfo.userName}}</h1>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'UserInfo',
  data() {
    return {
      userInfo: {
        userName: ''
      }
    }
  },
  methods: {
    async getUserInfo() {
      const user = await PostsService.fetchPosts()
      this.userInfo.userName = user.data.firstName
      console.log(user)
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style lang="scss">
  .user-list {
    width: 80%;
    table {
      text-align: left;
      overflow: hidden;
      width: 100%;
      margin: 0 auto;
      display: table;
      color: #A7A1AE;
    }
    tr {
      &:nth-child(odd) {
        background-color: #323C50;
      }
      &:nth-child(even) {
        background-color: #2C3446;
      }
    }
    th {
      background-color: #1F2739;
      font-weight: bold;
      font-size: 1em;
      text-align: left;
      color: #185875;
    }
    td,
    th {
      padding-bottom: 2%;
      padding-top: 2%;
      padding-left: 2%;
    }
    td {
      font-weight: normal;
      font-size: 1em;
      -webkit-box-shadow: 0 2px 2px -2px #0E1119;
      -moz-box-shadow: 0 2px 2px -2px #0E1119;
      box-shadow: 0 2px 2px -2px #0E1119;
    }
  }
</style>
