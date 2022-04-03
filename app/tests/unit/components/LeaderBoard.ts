import { mount } from '@vue/test-utils';
import LeaderBoard from '@/components/LeaderBoard.vue';
import { ScoreListItem } from '@/types/score';

describe('/components/LeaderBoard.vue', () => {

  it('should render the leader board when passed an empty array', () => {

    // arrange
    const scorelist: ScoreListItem[] = [];

    // act
    const wrapper = mount(LeaderBoard, {
      props: { scorelist }
    });

    // assert
    const text = wrapper.text();
    expect(text).toEqual('Leader BoardClear Scores'); // e.g. no scores

  });

  it('should render the LeaderBoard when passed a leader list', () => {

    // arrange
    const scorelist: ScoreListItem[] = [
      { player: 'x', score: 3 },
      { player: 'o', score: 2 },
      { player: 'tie', score: 1 }
    ];

    // act
    const wrapper = mount(LeaderBoard, {
      props: { scorelist }
    });

    // assert
    const text = wrapper.text();
    expect(text).toContain('tie: 1');

  });

});
