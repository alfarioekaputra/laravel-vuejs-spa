<template>
  <div>
    <CHeader/>

      <CSidebar
          fixed
          :minimize="minimize"
          :show="show"
          @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
        >
          <CSidebarBrand class="d-md-down-none" to="/">
            <CIcon
              class="d-block"
              name="logo"
              size="custom-size"
              :height="35"
              :viewBox="`0 0 ${minimize ? 110 : 556} 134`"
            />
          </CSidebarBrand>
          <!-- <CRenderFunction flat :content-to-render="nav"/> -->
          <CSidebarNav>
            <CSidebarNavItem name="Dashboard" to="dashboard" icon="cil-speedometer"/>
            <CSidebarNavItem name="Blog" to="blog" icon="cil-file"/>
              <!-- <CSidebarNavDropdown name="Master">
                <CSidebarNavItem name="Master" icon="cil-settings"/>
              </CSidebarNavDropdown> -->
          </CSidebarNav>
          <CSidebarMinimizer
            class="d-md-down-none"
            @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
          />
        </CSidebar>
        <CWrapper>
          <slot/>
        </CWrapper>

    </div>
</template>

<script>
  export default {
    data() {
      return {
          isLoggedIn: false
      }
    },
    computed: {
      show () {
        return this.$store.state.sidebarShow
      },
      minimize () {
        return this.$store.state.sidebarMinimize
      }
    },
    created() {
      if(localStorage.getItem('isLoggedIn') == "true") {
        this.isLoggedIn == true;
      }
    }
  }
</script>
