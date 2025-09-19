<template>
  <div class="square">
    <div class="content">
      <div class="inner">
        <div>Leader Board</div>
        <div class="table">
          <div v-for="item in scorelist" :key="item.player" :data-cy="'score'+item.player">
            <span v-if="item.player === 'tie'">tie</span>
            <i v-else :class="fontAwesomeIcon(item.player)"></i>:
            <span :data-cy="item.player+'-score'">{{item.score}}</span>
          </div>
        </div>
        <button @click.stop="clearScores">Clear Scores</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import fontAwesomeIconFn from '../services/font-awesome-icon';
import { ScoreListItem } from '../types/score';
import { Player, Winner } from '../types/player';

export default defineComponent({

  inheritAttrs: false, // don't emit click events natively, let me do it

  props: {
    scorelist: Array as PropType<ScoreListItem[]>
  },

  emits: ['clear-scores'],

  methods: {

    fontAwesomeIcon(player: Winner): string {
      return fontAwesomeIconFn(player as Player, false, false);
    },

    clearScores() {
      this.$emit('clear-scores');
    }

  }

});
</script>

<style scoped>
.square {
  height: 96px;
  padding: 2px;
}
.content {
  height: 100%;
  width: 100%;
  border: 2px solid black;
  font-size: 20pt;
  text-align: center;
}
.inner {
  margin-top: 7px;
}
.table {
  font-size: 15pt;
  display: flex;
  flex-direction: row;
  flex-flow: row nowrap;
}
.table > * {
  width: 33%;
  text-align: center;
}
.score {
  padding-left: 1em;
}
button {
  border: 0;
  background-color: white;
  box-sizing: border-box;
  font-size: 15pt;
  width: 100%;
}
</style>
