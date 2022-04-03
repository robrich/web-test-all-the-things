<template>
  <div class="square" :id="id" @click.stop="clicked">
    <div class="piece">
      <i :class="fontAwesomeIcon"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import fontAwesomeIconFn from '../services/font-awesome-icon';
import { Player } from '../types/player';

export default defineComponent({

  inheritAttrs: false, // don't emit click events natively, let me do it

  props: {
    value: String as () => Player,
    id: Number,
    gameOver: Boolean,
    win: Boolean
  },

  computed: {

    fontAwesomeIcon(): string {
      return fontAwesomeIconFn(this.value, this.gameOver, this.win);
    }

  },

  methods: {

    clicked() {
      if (!this.value && !this.gameOver) {
        this.$emit('click');
      }
    }

  }

});
</script>

<style scoped>
.square {
  width: 200px;
  height: 200px;
  padding: 2px;
}
.piece {
  height: 100%;
  width: 100%;
  border: 2px solid black;
  font-size: 56pt;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing:border-box;
}
.dimmed {
  color: #cccccc;
}
.win {
  color: #ff0000;
}
</style>
