<template>
  <div :class="[colorScheme,'trainer-sets']">
    <transition-group
      name="sets-items-bounce"
      enter-active-class="bounce-enter-active"
      leave-active-class="bounce-leave-active"
      tag="div"
    >
      <div v-for="set in sets" :key="set.key || set.num" class="trainer-sets-item">
        <strong v-if="set.weight>0">{{ set.weight}}</strong> x {{ set.reps}}
        <div class="trainer-sets-delete" v-if="allowDelete" @click="$emit('deleteSet', set.num)">x</div>
      </div>
    </transition-group>
    <div class="clear"></div>
  </div>
</template>

<script>
  // predefined color schemes (className):
  // * black-on-gray
  // * white-on-transparent
  // * blue-and-green-on-white

  export default {
    name: 'TrainerSets',
    props: ['sets', 'colorScheme', 'allowDelete'],
    data() {
      return {}
    }
  }
</script>

<style>
  .trainer-sets {
    margin-bottom: 12px;
  }

  .trainer-sets-item {
    float: left;
    display: inline-block;
    padding: 3px 5px;
    margin: 0 9px 9px 0;
    font-size: 12px;
  }

  .trainer-sets-delete {
    float: right;
    background: #f5f7fa;
    border-left: 1px solid #dcdfe6;
    color: #777;
    font-size: 15px;
    margin-top: -5px;
    margin-bottom: -5px;
    margin-left: 8px;
    margin-right: -6px;
    padding: 3px 9px 5px;
  }

  .black-on-gray .trainer-sets-item {
    color: black;
    background: #ccc;
  }

  .white-on-transparent .trainer-sets-item {
    border: 1px solid rgba(255, 255, 255, 0.7);
    color: white;
    background: transparent;
  }

  .blue-and-green-on-white {
    margin-bottom: 0;
  }

  .blue-and-green-on-white .trainer-sets-item {
    border: 1px solid #dcdfe6;
    background: white;
    padding: 5px 6px;
    margin: 0 9px 9px 0;
    font-size: 13px;
    color: #319d31;
  }

  .blue-and-green-on-white .trainer-sets-item strong {
    color: #3787e2;
  }


</style>
