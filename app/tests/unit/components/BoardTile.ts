import { mount } from '@vue/test-utils';
import BoardTile from '@/components/BoardTile.vue';
import { Player } from '@/types/player';

describe('/components/BoardTile.vue', () => {

  it('should emit click when not done', async () => {

    // arrange
    const value: Player = undefined;
    const id = 5;
    const gameOver = false;
    const win = false;

    // act
    const wrapper = mount(BoardTile, {
      props: { value, id, gameOver, win }
    });
    await wrapper.find('.square').trigger('click');

    // assert
    expect(wrapper.emitted().click.length).toEqual(2); // only called once
    // event count is off-by-1, bug in @vue/test-utils: https://github.com/vuejs/vue-test-utils/issues/146

  });

  it('should not emit click when game over', async () => {

    // arrange
    const gameOver = true;

    // values unimportant, satisfying interface
    const value: Player = undefined;
    const id = 5;
    const win = false;

    // act
    const wrapper = mount(BoardTile, {
      props: { value, id, gameOver, win }
    });
    await wrapper.find('.square').trigger('click');

    // assert
    expect(wrapper.emitted().click.length).toEqual(1); // not called

  });

  it('should not emit click when already set', async () => {

    // arrange
    const value: Player = 'x';

    const id = 5;
    const gameOver = false;
    const win = false;

    // act
    const wrapper = mount(BoardTile, {
      props: { value, id, gameOver, win }
    });
    await wrapper.find('.square').trigger('click');

    // assert
    expect(wrapper.emitted().click.length).toEqual(1); // not called

  });

});
