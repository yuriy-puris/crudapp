<template>
  <div class="tasks-holder">
    <div
      class="tasks-box"
    >
      <table>
        <thead>
        <tr>
          <th colspan="1">
            <span
              v-on:click="selectedHead()"
              v-bind:class="{ active: selectHead }"
              ref="texthead"
            >
              {{ userInfoBox.userTasksBox.taskBoxHead }}
            </span>
            <input
              v-model="userInfoBox.userTasksBox.taskBoxHead"
              ref="fieldhead"
              @keyup.enter="hiddenField()"
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
        <transition-group
          name="list-complete"
          tag="tbody"
        >
          <tr
            v-for="(task, index) in userInfoBox.userTasksBox.tasksBoxCell"
            :class="[task.done ? 'donetask' : '', 'list-complete-item']"
            :key="index"
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
                v-model="userInfoBox.userTasksBox.tasksBoxCell[index].info"
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
                reopen
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
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script>
  import PostsService from '@/services/PostsService'

  export default {
    name: 'UserTasksBox',
    props: ['taskbox', 'indexComponent'],
    data() {
      return {
        selectHead: false,
        selected: undefined,
        disable: true,
        userInfoBox: {
          userName: '',
          userTasksBox: {},
        }
      }
    },
    methods: {
      async updateUser() {
        await PostsService.updateInfo({
          tasks: this.userInfoBox.userTasksBox
        })
      },
      addTask() {
        this.userInfoBox.userTasksBox.tasksBoxCell.push({ info: 'task...', done: false })
        console.log(this.userInfoBox.userTasksBox);
      },
      editTask(index) {
        let taskValue = this.$refs['field-task' + index][0].value
        this.$refs['field-task' + index][0].className = ''
        this.$refs['active' + index][0].className = ''
        this.userInfoBox.userTasksBox.tasksBoxCell.splice(index, 1, { info: taskValue, done: false })
        this.$refs['field-task' + index][0].autofocus = false
        this.updateUser()
      },
      deleteTask(index) {
        this.userInfoBox.userTasksBox.tasksBoxCell.splice(index, 1)
        this.updateUser()
      },
      successTask(index) {
        let taskValue = this.$refs['field-task' + index][0].value
        this.userInfoBox.userTasksBox.tasksBoxCell.splice(index, 1, { info: taskValue, done: true })
        this.updateUser()
      },
      reopenTask(index) {
        let taskValue = this.$refs['field-task' + index][0].value
        this.userInfoBox.userTasksBox.tasksBoxCell.splice(index, 1, { info: taskValue, done: false })
        console.log(this.userInfo.userTasksBox)
        this.updateUser()
      },
      hiddenField() {
        let taskHeadValue = this.$refs.fieldhead.value
        this.$refs.texthead.className = ''
        this.userInfoBox.userTasksBox.taskBoxHead = taskHeadValue
        this.selectHead = !this.selectHead
        this.updateUser()
      },
      selectedHead() {
        this.selectHead = !this.selectHead
      },
      openEdit(index) {
        this.$refs['field-task' + index][0].autofocus = true
        console.log(this.$refs['field-task' + index])
        this.$refs['btn-edit' + index][0].disabled = !this.disable
      },
      getInfoBox() {
        this.userInfoBox.userTasksBox = this.taskbox
        console.log(this.userInfoBox.userTasksBox)
      }
    },
    mounted() {
//      this.getUserInfo()
      this.getInfoBox()
    }
  }

</script>

<style lang="scss">

</style>
