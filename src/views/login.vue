<template>
  <h3>Login</h3>
  <form v-on:submit.prevent="submit">
    <div>
      User: <input type="text" name="username" v-model="credentials.username"/>
    </div>
    <div>
      Password: <input type="password" name="password" v-model="credentials.password"/>
    </div>
    <button type="submit">Login</button>
    <button type="button" v-on:click="newUser">New User</button>
  </form>
</template>

<script>
  import store from '../store';

  export default {
    data() {
      return {
        auth: this.$select('auth'),
        credentials: {
          username: '',
          password: ''
        },
        error: ''
      }
    },
    methods: {
      submit() {
        var credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }
        store.dispatch(store.actions.authLoad(credentials));
      },
      newUser(e) {
        var credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }
        store.dispatch(store.actions.newUser(credentials));
      }
    }

  }
</script>
