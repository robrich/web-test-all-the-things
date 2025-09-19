import { mount } from '@vue/test-utils';
import BoardTile from '@/components/BoardTile.vue';
import { Player } from '@/types/player';

describe('/components/BoardTile.vue', () => {

  it('should emit click when not done', async () => {

    // arrange
    const expected = 1;
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
    expect((wrapper.emitted().click || []).length).toEqual(expected);

  });

  it('should not emit click when game over', async () => {

    // arrange
    const gameOver = true;
    const expected = undefined;

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
    expect(wrapper.emitted().click).toEqual(expected);

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
    expect(wrapper.emitted().click).toBeUndefined(); // not called

  });

});
