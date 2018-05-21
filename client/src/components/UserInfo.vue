<template>
  <div class="user-holder">
    <h1>{{userInformation.firstName}}</h1>
    <button
      class="btn add-box"
      @click="addTasksBox()"
    >
      Add Box
    </button>

    <UserTasksBox
      v-for="(tasks_box, index) in userInformation.userTasks"
      v-bind:taskbox="tasks_box"
      v-bind:indexComponent="index"
      :key="index"
    />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import PostsService from '@/services/PostsService'
import UserTasksBox from '@/components/UserTasksBox'

export default {
  name: 'UserInfo',
  components: {
    UserTasksBox
  },
  data() {
    return {
      userInformation: {
        firstName: '',
        userTasks: []
      }
    }
  },
  watch: {
    'userInfo': function() {
      this.userInformation.firstName = this.userInfo.data.firstName
      this.userInformation.userTasks = this.userInfo.data.tasks
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  created() {
    this.getUserInfo()
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch('LOAD_USER_INFO')
    },
    addTasksBox() {
      this.userInformation.userTasks.push(
        {
          taskBoxHead: 'New tasks',
          tasksBoxCell: []
        }
      )
    }
  },
}
</script>

<style lang="scss">
  .btn {
    padding: 10px 25px;
    outline: none;
    border-color: transparent;
    border-radius: 5px;
    &.add-box {
      background: #0094af;
      color: #fff;
      font-size: 16px;
      box-shadow: 5px 6px 12px -1px rgba(0, 0, 0, 0.1);
      float: right;
    }
  }
  .list-complete-item {
    transition: all 1s;
    width: 100%;
    margin: 0;
  }
  .list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  .task-description,
  .tasks-box {
    color: #fff;
    width: 90%;
    thead {
      span {
        cursor: pointer;
      }
    }
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
    p {
      cursor: pointer;
      margin: 0;
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
      margin: 0;
    }
  }
  h1 {
    text-align: left;
    span {
      font-size: 33px;
    }
  }
  .tasks-box {
    box-shadow: 0 10px 30px 0 rgba(0,0,0, 0.2);
    background: #4e5a76;
    color: #333;
    font-size: 20px;
    max-width: 520px;
    border-radius: 15px;
    padding: 15px 20px;
    text-align: left;
    margin: 0 0 50px;
    thead {
      font-size: 25px;
    }
    th {
      color: #a3f1ff;
      border-bottom: 1px solid #d4d4d4;
      padding: 0 0 15px;
      width: 100%;
      &:first-child {
        width: 70%;
        min-width: 350px;
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
      padding: 0;
      outline: none;
    }
    td {
      padding: 15px 0 5px;
      vertical-align: middle;
    }
    input {
      height: 30px;
      border-radius: 5px;
      border: none;
      outline: none;
      padding: 0;
      background: transparent;
      font: inherit;
      color: inherit;
    }
  }
  .btn {
    &.btn-add {
      color: #fff;
      width: 100%;
      text-indent: 0;
      text-align: center;
      background: #3da3bb;
      box-shadow: 5px 6px 12px -1px rgba(0,0,0, .1);
      margin: 0;
    }
    &.btn-edit {
      text-indent: 0;
      width: auto;
      color: #6f5757;
      padding: 0 8px;
    }
    &.btn-reopen {
      opacity: 0;
      visibility: hidden;
      transition: opacity 1s;
      position: absolute;
      &::before {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border-width: 2px;
        border-style: solid;
        border-color: #31c5e0 #31c5e0 #31c5e0 #fff;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotateZ(6deg);
      }
      &::after {
        content: '';
        position: absolute;
        height: 0;
        width: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 7px solid #31c5e0;
        left: 3px;
        top: 14px;
        transform: rotateZ(-26deg);
      }
    }
    &.btn-success {
      opacity: 1;
      visibility: visible;
      transition: opacity 1s;
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
  .task-description {
    p {
      position: relative;
      margin: 0 20px 0 0;
      display: inline-block;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        height: 1px;
        width: 0;
        background: #fff;
        transition: width 1s;
      }
    }
  }
  .donetask {
    p {
      cursor: auto;
      pointer-events: none;
      &::after {
        width: 100%;
      }
    }
    .btn-success {
      opacity: 0;
      visibility: hidden;
      position: absolute;
    }
    .btn-reopen {
      opacity: 1;
      visibility: visible;
      position: relative;
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
