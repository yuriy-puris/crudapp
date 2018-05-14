<template>
  <div class="user-holder">
    <h1><span>Hello</span>, {{userInfo.userName}}</h1>
    <div class="tasks-box">
      <table>
        <thead>
          <tr>
            <th colspan="1">Tasks head</th>
            <th
              colspan="3"
            >
              <a
                href="#"
                class="btn btn-add"
                @click="addTask()"
              >
                Add task
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in userInfo.userTasks">
            <td class="task-description">
              <p
                @click="selected = index"
                :class="{active:selected == index}"
                v-bind:ref="task + index"
              >
                {{ task }}
              </p>
              <input
                placeholder="enter"
                v-model="userInfo.userTasks[index]"
              >
            </td>
            <td>
              <a
                href="#"
                class="btn btn-edit"
                @click="editTask(task, index)">
                Edit
              </a>
            </td>
            <td>
              <a href="#" class="btn btn-success">success</a>
            </td>
            <td>
              <a href="#" class="btn btn-remove">done</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'UserInfo',
  data() {
    return {
      selected: undefined,
      userInfo: {
        userName: '',
        userTasks: []
      }
    }
  },
  methods: {
    async getUserInfo() {
      const user = await PostsService.fetchPosts()
      this.userInfo.userName = user.data.firstName
//      this.userInfo.userTasks = user.data.tasks
      console.log(user)
    },
    addTask() {
      this.userInfo.userTasks.push('task')
    },
    editTask(task, index) {
      this.$refs[task + index][0]
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style lang="scss">
  .task-description {
    width: 90%;
    input {
      display: none;
    }
    p {
      &.active {
        display: none;
        & + input {
          display: block;
        }
      }
    }
  }
  .user-holder {
    width: 100%;
    max-width: 1000px;
    padding: 0 15px;
    margin: 100px 0;
    align-self: flex-start;
    table {
      width: 100%;
    }
  }
  h1 {
    span {
      font-size: 33px;
    }
  }
  .tasks-box {
    color: #333;
    font-size: 20px;
    max-width: 400px;
    background: #4e5a76;
    border-radius: 15px;
    padding: 15px;
    text-align: left;
    thead {
      font-size: 25px;
      padding: 0 0 15px;
    }
    th {
      color: #d4d4d4;
      border-bottom: 1px solid #d4d4d4;
      padding: 0 0 10px;
      width: 100%;
      &:first-child {
        width: 70%;
      }
    }
    .btn {
      width: 30px;
      height: 30px;
      display: inline-block;
      text-indent: -9999px;
      overflow: hidden;
      background: #fff;
      border-radius: 5px;
      font-size: 15px;
      line-height: 28px;
      position: relative;
    }
    td {
      padding: 5px 0;
      vertical-align: top;
    }
    input {
      height: 30px;
      border-radius: 5px;
      border: none;
      outline: none;
      padding: 5px;
    }
  }
  .btn {
    &.btn-add {
      color: #333;
      width: 100%;
      text-indent: 0;
      text-align: center;
    }
    &.btn-edit {
      text-indent: 0;
      width: auto;
      color: #6f5757;
      padding: 0 8px;
    }
    &.btn-success {
      &::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 15px;
        left: 50%;
        top: 40%;
        border: 2px solid;
        border-color: transparent #1ab700 #1ab700 transparent;
        transform: translate(-50%, -50%) rotateZ(45deg);
      }
    }
    &.btn-remove {
      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 2px;
        height: 20px;
        background: #f00000;
        top: 50%;
        left: 50%;
      }
      &::before {
        transform: translate(-50%, -50%) rotateZ(45deg);
      }
      &::after {
        transform: translate(-50%, -50%) rotateZ(-45deg);
      }
    }
  }
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
    th {
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
