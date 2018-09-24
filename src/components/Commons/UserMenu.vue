<template>
  <div class="user-menu">
    <el-dropdown
      placement="bottom"
      width="auto"
      trigger="click"
      @command="onCommand"
    >
      <div class="user-menu-button">
        <div class="user-menu-image"></div>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :disabled="true">{{username}}</el-dropdown-item>
        <el-dropdown-item command="settings" :divided="true">
          Настройки
        </el-dropdown-item>
        <el-dropdown-item command="logout" :divided="true">
          Выйти
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>


<script>
  import {mapState} from 'vuex'

  export default {
    name: 'UserMenu',
    methods: {
      onCommand: function (command) {
        if(command==='settings') {
          window.location = '/settings'
        }
        if(command==='logout') {
          this.$router.push({name:'logout'})
          window.location = '/logout'
        }
      }
    },
    computed: mapState({
      username: state => state.authData.userEmail
    }),
    data() {
      return {}
    }
  }
</script>


<style>
  .user-menu {
    float: right;
    width: 28px;
    height: 44px;
  }
  .user-menu-button {
    cursor: pointer;
    width: 24px;
    height: 24px;
    padding: 2px;
    margin-bottom: -4px;
  }
  .user-menu-image {
    position: relative;
    width: 24px;
    height: 24px;
  }
  .user-menu,
  .user-menu-button
  {
    border: none !important;
    outline: none !important;
  }
  .user-menu-image {
    background: url('./../../assets/img/user.png') 100% 100% no-repeat;
    background-size: cover;
  }
</style>
