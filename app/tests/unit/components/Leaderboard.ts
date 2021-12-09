import { mount } from '@vue/test-utils';
import Leaderboard from '@/components/Leaderboard.vue';
import { ScoreListItem } from '@/types/score';

describe('/components/Leaderboard.vue', () => {

  it('should render the Leaderboard when passed an empty array', () => {

    // arrange
    const scorelist: ScoreListItem[] = [];

    // act
    const wrapper = mount(Leaderboard, {
      props: { scorelist }
    });

    // assert
    const text = wrapper.text();
    expect(text).toEqual('LeaderboardClear Scores'); // e.g. no scores

  });

  it('should render the Leaderboard when passed an empty array', () => {

    // arrange
    const scorelist: ScoreListItem[] = [
      { player: 'x', score: 3 },
      { player: 'o', score: 2 },
      { player: 'tie', score: 1 }
    ];

    // act
    const wrapper = mount(Leaderboard, {
      props: { scorelist }
    });

    // assert
    const text = wrapper.text();
    expect(text).toContain('tie: 1');

  });

});
