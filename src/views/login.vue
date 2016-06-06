<template>
  <h3>Login</h3>
  <form>
    <input type="text" name="username" v-model="credentials.username"/>
    <input type="password" name="password" v-model="credentials.password"/>
  </form>
</template>

<script>
  import store from '../store';
  import auth from '../auth';

export default {
    data() {
      return {
        // We need to initialize the component with any
        // properties that will be used in it
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
        // We need to pass the component's this context
        // to properly make use of http in the auth service
        auth.login(this, credentials)
      }
    }

  }
</script>
