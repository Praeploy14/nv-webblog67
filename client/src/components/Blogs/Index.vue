<template>
    <div>
        <h2>All Product</h2>
        <p><button v-on:click="logout">Logout</button></p>
        <h4>Has {{blogs.length}} Product</h4>
        <p><button v-on:click="navigateTo('/blog/create')">create</button></p>
        <div v-for="blog in blogs" v-bind:key="blog.id">
            <p>id: {{ blog.id }}</p>
            <p>Name: {{ blog.name }}</p>
            <p>Sip: {{ blog.sip }}</p>
            <p>Sensor: {{ blog.sensor }}</p>
            <p>Price: {{ blog.price }}</p>
            
           
            <p>
            <button v-on:click="navigateTo('/blog/'+ blog.id)">SeeMore</button>
            <button v-on:click="navigateTo('/blog/edit/'+ blog.id)">Edit</button>
            <button v-on:click="deleteBlog(blog)">Delete</button>
            </p>
            <hr>
        </div>
    </div>
</template>
<script>
    import BlogsService from '@/services/BlogsService'
    export default {
        data () {
            return {
                blogs: []
            }
        },
        async created () {
            this.blogs = (await BlogsService.index()).data
        },
        methods: {
            logout () {
                this.$store.dispatch('setToken', null)
                this.$store.dispatch('setBlog', null)
                this.$router.push({
                    name: 'login'
                })
            },
            navigateTo (route) {
                this.$router.push(route)
            },
            async deleteBlog (blog) {
                let result = confirm("Want to delete?")
                if (result) {
                    try {
                        await BlogsService.delete(blog)
                        this.refreshData()
                    } catch (err) {
                        console.log(err)
                    }
                }
            },
            async refreshData() {
                this.blogs = (await BlogsService.index()).data
            }
        }
    }
</script>
<style scoped>  
</style>