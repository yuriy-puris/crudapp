<template>
  <div class="guest-holder">
    <div class="form">

      <ul class="tab-group">
        <li class="tab">
          <span
            @click="switchSignForm()"
            v-bind:class="{active : (isVisible === true) }"
          >
            Sign Up
          </span>
        </li>
        <li class="tab">
          <span
            @click="switchLoginForm()"
            v-bind:class="{active : (isVisible === false) }"
          >
            Log In
          </span>
        </li>
      </ul>

      <div class="tab-content">
        <div class="signup" v-if="isVisible">
          <h1>Sign Up for Free</h1>
          <form action="/" method="post">
            <div class="form-row">
              <input type="text" v-model="signForm.signFirstName" class="form-control" placeholder="User name" required />
            </div>
            <div class="form-row">
              <input type="text" v-model="signForm.signUserEmail" class="form-control" placeholder="User email" required />
            </div>
            <div class="form-row">
              <input type="password" v-model="signForm.signPassword" class="form-control" placeholder="Password" />
            </div>
            <div class="form-row">
              <button
                type="button"
                class="button button-block"
                @click="addNewUser()"
                >
                Get Started
              </button>
            </div>
          </form>
        </div>

        <div class="login" v-else>
          <h1>Welcome Back!</h1>
          <form action="/" method="post">
            <div class="form-row">
              <input type="text" v-model="loginForm.loginUserName" class="form-control" placeholder="First name" required />
            </div>
            <div class="form-row">
              <input type="password" v-model="loginForm.loginPassword" class="form-control" placeholder="Password" required />
            </div>
            <div class="form-row">
              <button
                type="button"
                @click="loginUser()"
                class="button button-block"
              >
                Log in
              </button>
            </div>
          </form>
        </div>

      </div><!-- tab-content -->
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'FirstView',
  data() {
    return {
      isVisible: true,
      signForm: {
        signFirstName: '',
        signUserEmail: '',
        signPassword: ''
      },
      loginForm: {
        loginUserName: '',
        loginPassword: ''
      }
    }
  },
  methods: {
    switchSignForm() {
      this.isVisible = true
    },
    switchLoginForm() {
      this.isVisible = false
    },
    async addNewUser() {
      if( this.signForm.signFirstName !== '' && this.signForm.signUserEmail !== '' ) {
        await PostsService.addNewPosts({
          firstName: this.signForm.signFirstName,
          userEmail: this.signForm.signUserEmail,
          password: this.signForm.signPassword,
        })
        let user_id = this.signForm.signFirstName
        this.$router.push({ name: 'UserInfo', params: { id: user_id }})
      } else {
        console.log('Empty fields')
      }
    },
    async loginUser() {
      if( this.loginForm.loginUserName !== '' && this.loginForm.loginPassword !== '' ) {
        await PostsService.loginUser({
          firstName: this.loginForm.loginUserName,
          password: this.loginForm.loginPassword
        })
        let user_id = this.loginForm.loginUserName
        this.$router.push({ name: 'UserInfo', params: { id: user_id }})
      } else {
        console.log('Empty fields')
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  h1 {
    text-align:center;
    color: #ffffff;
    font-weight: 300;
    margin:0 0 40px;
  }
  .form {
    background:rgba(#13232f,.9);
    padding: 40px;
    max-width:600px;
    margin:40px auto;
    border-radius:4px;
    box-shadow:0 4px 10px 4px rgba(#13232f,.3);
  }
  .form-row {
    position: relative;
    margin: 0 0 40px;
  }
  .tab-group {
    list-style:none;
    padding:0;
    margin:0 0 40px 0;
    font-size: 0;
    &:after {
      content: "";
      display: table;
      clear: both;
    }
    li {
      display: inline-block;
      width: 50%;
      font-size: 12px;
      span {
        display:block;
        text-decoration:none;
        padding:15px;
        background:rgba(#a0b3b0,.25);
        color: #a0b3b0;
        font-size:20px;
        float:left;
        width:100%;
        text-align:center;
        cursor:pointer;
        transition:.5s ease;
        &.active {
          background:#a0b3b0;
          color: #fff;
        }
      }
    }
    .tab-content > div:last-child {
      display:none;
    }
  }
  input, textarea {
    font-size:22px;
    display:block;
    width:100%;
    height:100%;
    padding:5px 10px;
    border:1px solid #a0b3b0;
    border-radius:0;
    transition:border-color .25s ease, box-shadow .25s ease;
    &:focus {
      outline:0;
      border-color: #1ab188;
    }
  }
  .button {
    border:0;
    outline:none;
    border-radius:0;
    padding:15px 0;
    font-size:2rem;
    font-weight: 600;
    text-transform:uppercase;
    letter-spacing:.1em;
    background:#1ab188;
    color: #fff;
    transition:all.5s ease;
    -webkit-appearance: none;
  }
  .button {
    border: 0;
    outline: none;
    border-radius: 0;
    padding: 15px 0;
    font-size: 2rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .1em;
    background: #1ab188;
    color: #ffffff;
    transition: all 0.5s ease;
    -webkit-appearance: none;
  }
  .button-block {
    display: block;
    width: 100%;
  }
  .button:hover, .button:focus {
    background: #179b77;
  }
</style>
