<template>
    <div>
        <p>This is the homepage</p>
        <form @submit.stop.prevent="handleSubmit">
          <input type="text" name="email" v-model.lazy="email">
          <input type="password" name="password" v-model.lazy="password">
          <input type="submit" name="submit" value="Login">
        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Home',
        data() {
            return {
                email: null,
                password: null
            }
        },
        methods: {
            handleSubmit() {
                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('/api/login', {
                        email: this.email,
                        password: this.password
                    }).then(response2 => {
                        localStorage.setItem('isLoggedIn', 'true');
                        this.$router.push({name: 'dashboard'})
                    })
                })
            }
        }
    }
</script>
