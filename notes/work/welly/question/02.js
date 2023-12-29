function filterNumbersGreaterThanFive(numbers) {
  // 實作你的解答
  return numbers.filter((number) => number > 5);
}

const numbers = [2, 8, 4, 10, 1, 7];
console.log(filterNumbersGreaterThanFive(numbers)); // 預期輸出: [8, 10, 7]
