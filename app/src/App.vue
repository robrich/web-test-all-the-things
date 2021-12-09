<template>
  <div id="app">
    <h1>Tic Tac Toe</h1>
    <div class="flex-spread board">
      <PlayerTitle value="x" :myTurn="turn === 'x' && !gameOver" :win="winner === 'x'" />
      <PlayerTitle value="o" :myTurn="turn === 'o' && !gameOver" :win="winner === 'o'" />
    </div>
    <div class="flex board">
      <div v-for="s in squares" :key="s.id">
        <Tile :id="s.id" :value="s.value" :gameOver="gameOver" :win="s.win" @click="tileClick(s)" />
      </div>
    </div>
    <div class="flex footer">
      <NewGame :gameOver="gameOver" @click="newGame" />
      <Leaderboard :scorelist="scorelist" @clear-scores="clearScores" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PlayerTitle from './components/PlayerTitle.vue';
import Tile from './components/Tile.vue';
import NewGame from './components/NewGame.vue';
import Leaderboard from './components/Leaderboard.vue';
import { getScores, updateScore, clearScores } from './data/scores';
import checkWin from './services/check-win';
import checkStalemate from './services/check-stalemate';
import { getSquareById } from './services/get-square-by-id';
import scoreToList from './services/score-to-list';
import { Player, Winner } from './types/player';
import { ScoreListItem } from './types/score';
import { Square } from './types/square';

interface AppData {
  turn: Player;
  gameOver: boolean;
  winner: Player;
  squares: Square[],
  scorelist: ScoreListItem[]
}

export default defineComponent({
  name: 'App',
  components: {
    PlayerTitle,
    Tile,
    NewGame,
    Leaderboard
  },

  data() {
    const data: AppData = {
      turn: 'x',
      gameOver: false,
      winner: undefined,
      squares: [
        { id: 0, value: undefined, win: false },
        { id: 1, value: undefined, win: false },
        { id: 2, value: undefined, win: false },
        { id: 3, value: undefined, win: false },
        { id: 4, value: undefined, win: false },
        { id: 5, value: undefined, win: false },
        { id: 6, value: undefined, win: false },
        { id: 7, value: undefined, win: false },
        { id: 8, value: undefined, win: false }
      ],
      scorelist: []
    };
    return data;
  },

  mounted() {
    this.newGame();
    this.getScores();
  },

  methods: {

    tileClick(s: Square): void {
      s.value = this.turn;
      this.gameLoop();
      if (!this.gameOver) {
        this.nextTurn();
      }
    },

    gameLoop() {
      const won: number[] = checkWin(this.squares);
      if (won.length > 0) {
        this.winner = this.turn; // ASSUME: the current turn made it win
        this.gameOver = true;
        won.forEach(w => {
          const square = getSquareById(this.squares, w);
          if (square) {
            square.win = true;
          }
        });
        this.updateScore(this.turn as Winner);
      }
      const stalemate: boolean = checkStalemate(this.squares);
      if (stalemate) {
        this.gameOver = true;
        this.updateScore('tie');
      }
    },

    nextTurn() {
      this.turn = (this.turn === 'x') ? 'o' : 'x';
    },

    newGame() {
      this.turn = 'x';
      this.gameOver = false;
      this.winner = undefined;
      this.squares.forEach(s => {
        s.value = undefined;
        s.win = false;
      });
    },

    async getScores() {
      const score = await getScores();
      this.scorelist = scoreToList(score);
    },

    async updateScore(player: Winner) {
      const score = await updateScore(player);
      this.scorelist = scoreToList(score);
    },

    async clearScores() {
      await clearScores();
      this.scorelist = [];
    }

  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.board {
  width: 613px;
  margin: auto;
}
.flex-spread {
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  justify-content: space-between;
}
.footer {
  width: 613px;
  margin: auto;
}
.footer > * {
  width: 49%;
}
</style>
