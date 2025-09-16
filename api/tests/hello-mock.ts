import { describe, it, expect, afterEach, vi } from 'vitest';

describe('hello-mock', () => {

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should stub a function', () => {

    // arrange
    const expected = 'mocked';

    const sut = {
      hello: () => 'world',
    };
    vi.spyOn(sut, 'hello').mockReturnValue(expected);

    // act
    const actual = sut.hello();

    // assert
    expect(actual).toBe(expected);
  });

  it('should mock a timer', () => {

    // arrange
    const expected = true;
    vi.useFakeTimers();
    let actual = false;

    // act
    setTimeout(() => { actual = true; }, 1000);
    expect(actual).toBe(false);
    vi.advanceTimersByTime(1000);

    // assert
    expect(actual).toBe(expected);
  });

});
