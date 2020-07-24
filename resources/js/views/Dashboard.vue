<template>
    <div>
        <p>Dashboards!</p>

        {{email}}

        <button @click="logout">Logout</button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Dashboards',
        data() {
            return {
                email: null
            }
        },
        mounted() {
            axios.get('/api/blog')
            .then((res) => {
              console.log(res)
            })
            .catch((error) => {
              console.error(error)
            })

        },
        methods: {
          logout() {
            axios.post('/api/logout').then(response => {
              localStorage.removeItem('isLoggedIn')
              this.$router.push({name: 'Login'})
            })
          }
        }
    }
</script>
