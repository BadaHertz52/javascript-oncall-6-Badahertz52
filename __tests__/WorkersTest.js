import { ERROR_MESSAGE } from '../src/constants';
import { Workers } from '../src/models';

describe('Workers 클래스 테스트', () => {
  test('잘못된 값을 입력하면 오류 발생', () => {
    const WRONG_INPUTS = [
      //닉네임에 영문,한글 이외의 문자를 사용
      'A_bcd',
      //닉네임 글자 수 오류
      '가나다라마바사',
      //닉네임을 ","로 구분하지 않음
      '가나다 라마 비사',
      //근무자 수가 5인 미만 이거나 35인 초과인 경우
      '가,나,다',
      '가,나,다,라,마,바,사,아,자,차,카,타,파,하,가가,나나,다다,라라,마마,바바,사사,아아,자자,차차,카카,타타,파파,하하,가나,나다,다라,라마,마바,바사,사아,아자,자차,차카,카타,타파,파히,하가',
      //중복 근무자 있음
      '가,나,다,가,라',
    ];
    WRONG_INPUTS.forEach((v) => {
      expect(() => new Workers(v)).toThrow(ERROR_MESSAGE);
    });
  });
  test('유효한 값일 경우, 닉네임 배열을 반환', () => {
    const INPUT = ['가', '나', '다', '라', '마'];
    const names = new Workers(INPUT.join(',')).getState();

    expect(names).toEqual(INPUT);
  });
});
