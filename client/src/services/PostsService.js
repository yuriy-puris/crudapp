import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('userinfo')
  },
  addNewPosts (params) {
    return Api().post('userinfo', params)
  }
}
