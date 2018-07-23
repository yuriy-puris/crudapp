<template>
  <div class="account-holder">

  </div>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: "UserAccount",
  data() {
    return {
      accountInfo: ''
    }
  },
  methods: {
    async getAccount() {
      const account = await PostsService.fetchAccount()
      this.accountInfo = account
      console.log(account)
    }
  },
  mounted() {
    this.getAccount()
  }
}
</script>

<style lang="scss">

</style>
