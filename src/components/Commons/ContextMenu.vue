<template>
  <div :class="['three-dots','three-dots-'+colorScheme]">
    <el-dropdown
      placement="bottom"
      width="auto"
      trigger="click"
      @command="onCommand"
    >
      <div class="three-dots-button">
        <div class="three-dots-image"></div>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in items"
          :key="item.event"
          :command="item.event"
        >
          {{ item.title }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>


<script>
  // возможные значения параметра colorScheme: [black, white]

  export default {
    name: 'ContextMenu',
    props: ['items', 'colorScheme'],
    methods: {
      onCommand: function (command) {
        this.$emit(command)
      }
    },
    data() {
      return {}
    }
  }
</script>


<style>
  .three-dots {
    float: right;
    margin-right: -4px;
    margin-top:-4px;
    width: 36px;
    height: 28px;
  }
  .three-dots-button {
    cursor: pointer;
    width: 24px;
    height: 14px;
    padding: 7px 6px;
    margin-bottom:-8px;
  }
  .three-dots-image {
    position: relative;
    width: 24px;
    height: 14px;
  }
  .three-dots,
  .three-dots-button
  {
    border: none !important;
    outline: none !important;
  }
  .three-dots-white .three-dots-image {
    background: url('./../../assets/img/threedots-white.png') 100% 100% no-repeat;
    background-size: cover;
  }
  .three-dots-black .three-dots-image {
    background: url('./../../assets/img/threedots-black.png') 100% 100% no-repeat;
    background-size: cover;
  }
</style>
