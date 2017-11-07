<template>
    <div class="wrapper">
        <v-sidebar></v-sidebar>
         <v-head></v-head>
        <div class="content" style=" left: 210px;">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';

    export default {
        components: {
            vHead, vSidebar
        }
    }
</script>
