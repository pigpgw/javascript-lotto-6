import { Random, Console } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import ERROR from './error.js';

class App {

  constructor() {
    this.winningLotto;
    this.userMoneyInput;
    this.userByLottoList = [];
    
  }

  async play() {
    // 사용자의 입력 받기 , 및 오류처리
    await this.userInput();
    console.log(this.userMoneyInput);

    // 유저에게 로또 번호 제공
    this.totalLottoListUser();

    // 유저가 당첨번호 입력
    await this.settingLottoNumber();
    await this.settingLottoBonusNumber();

    
  }

  async userInput() {
    let userInput;
    let isValidInput = false;

    while (!isValidInput) {
      userInput = await this.getUserMoney();

      try {
        this.checkUserMoney(userInput);
        isValidInput = true;
      } catch (error) {
        // 에러 메시지 출력 및 다시 입력 받기
        console.error(error.message);
      }
    }
    this.userMoneyInput = Number(userInput);
  }

  async getUserMoney() {
    return await Console.readLineAsync("구입금액을 입력해 주세요");
  }

  checkUserMoney(userInput) {
    if ((userInput % 1000 !== 0) || (userInput === 0)) {
      throw new Error(ERROR.INVALID_INPUT);
    }
  }

  userByLotto() {
    const count = this.userMoneyInput / 1000;
    Console.print(`${count}개를 구매했습니다.`);
    return count;
  }

  totalLottoListUser() {
    const num = this.userByLotto();
    let lottoList = [];
    for (let i = 0; i < num; i++) {
      lottoList.push(this.sortNumbers(this.generateRandomNumber()));
      Console.print(this.sortNumbers(this.generateRandomNumber()));
    }
    this.userByLottoList = lottoList;
  }

  generateRandomNumber() {
    return Random.pickUniqueNumbersInRange(1, 45, 6);
  }

  sortNumbers(inputList) {
    const sortedList = inputList.sort(function (a, b) {
      return a - b;
    });
    return sortedList;
  }

  async settingLottoNumber(){
    const result = await Console.readLineAsync("당첨 번호를 입력해 주세요");
    this.winningLotto = result.split(',').map(Number);
    Console.print(result);
  }

  async settingLottoBonusNumber() {
    const result = await Console.readLineAsync("보너스 번호를 입력해 주세요");
    this.winningLotto.push(Number(result));
    Console.print(result);
  }


  
}



export default App;