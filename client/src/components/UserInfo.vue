<template>
  <div class="user-holder">
    <h1><span>Hello</span>, {{userInfo.userName}}</h1>
    <div
      class="tasks-box"
      v-for="(task_head, index) in userInfo.userTasksHead"
    >
      <table>
        <thead>
          <tr>
            <th colspan="1">
              <span
                v-on:click="selectedHead()"
                v-bind:class="{ active: selectHead }"
                v-bind:ref="'text-head' + index"
              >
                {{ task_head }}
              </span>
              <input
                v-model="userInfo.userTasksHead[index]"
                v-bind:ref="'field-head' + index"
                @keyup.enter="hiddenField(index)"
              >
            </th>
            <th colspan="3">
              <button
                class="btn btn-add"
                @click="addTask()"
              >
                Add task
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(task, index) in userInfo.userTasks"
            :class="{donetask:task.done == true}"
          >
            <td class="task-description">
              <p
                @click="[selected = index, openEdit(index)]"
                :class="{active:selected == index}"
                v-bind:ref="'active' + index"
              >
                {{ task.info }}
              </p>
              <input
                placeholder="enter"
                v-model="userInfo.userTasks[index].info"
                v-bind:ref="'field-task' + index"
              >
            </td>
            <td>
              <button
                class="btn btn-edit"
                @click="editTask(index)"
                v-bind:ref="['btn-edit' + index]"
                :disabled="disable"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                :class="['btn', 'btn-success']"
                @click="successTask(index)"
              >
                success
              </button>
              <button
                :class="['btn', 'btn-reopen' ]"
                @click="reopenTask(index)"
              >
                success
              </button>
            </td>
            <td>
              <button
                class="btn btn-remove"
                @click="deleteTask(index)"
              >
                remove
              </button>
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
      selectHead: false,
      selected: undefined,
      disable: true,
      userInfo: {
        userName: '',
        userTasks: [],
        userTasksHead: []
      }
    }
  },
  methods: {
    async getUserInfo() {
      const user = await PostsService.fetchPosts()
      this.userInfo.userName = user.data.firstName
      this.userInfo.userTasksHead = user.data.tasks_head
      if( user.data.tasks ) {
        this.userInfo.userTasks = user.data.tasks
      }
      console.log(this.userInfo.userTasks)
    },
    async updateUser() {
      await PostsService.updateInfo({
        tasksHead: this.userInfo.userTasksHead,
        tasks: this.userInfo.userTasks
      })
    },
    addTask() {
      this.userInfo.userTasks.push({ info: 'task...', done: false })
    },
    editTask(index) {
      let taskValue = this.$refs['field-task' + index][0].value
      this.$refs['field-task' + index][0].className = ''
      this.$refs['active' + index][0].className = ''
      this.userInfo.userTasks.splice(index, 1, { info: taskValue, done: false })
      console.log(this.userInfo.userTasks)
      this.updateUser()
    },
    deleteTask(index) {
      this.userInfo.userTasks.splice(index, 1)
      this.updateUser()
    },
    successTask(index) {
      let taskValue = this.$refs['field-task' + index][0].value
      this.userInfo.userTasks.splice(index, 1, { info: taskValue, done: true })
      console.log(this.userInfo.userTasks)
      this.updateUser()
    },
    hiddenField(index) {
      let taskHeadValue = this.$refs['field-head' + index][0].value
      this.$refs['field-head' + index][0].className = ''
      this.$refs['text-head' + index][0].className = ''
      this.userInfo.userTasksHead.splice(index, 1, taskHeadValue)
      this.selectHead = !this.selectHead
      this.updateUser()
    },
    selectedHead() {
      this.selectHead = !this.selectHead
    },
    openEdit(index) {
      this.$refs['btn-edit' + index][0].disabled = !this.disable
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style lang="scss">
  .donetask {
    p {
      text-decoration: line-through;
    }
  }
  .task-description,
  .tasks-box {
    width: 90%;
    input {
      display: none;
    }
    p,
    span {
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
    text-align: left;
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
      border-color: transparent;
      font-size: 15px;
      line-height: 28px;
      position: relative;
      margin: 0 3px;
      outline: none;
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
