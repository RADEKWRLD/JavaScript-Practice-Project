const darkColorsArr = [
    "#2C3E50",
    "#34495E",
    "#2C2C2C",
    "#616A6B",
    "#4A235A",
    "#2F4F4F",
    "#0E4B5A",
    "#36454F",
    "#2C3E50",
    "#800020",
];

/*const darkColorsArr = [
  "#2C3E50",
  "#34495E",
  "#2C2C2C"
  "#616A6B"
  "#4A235A"
  "#2F4F4F",
  "#0E4B5A",
  "#36454F",
  "#2C3E50",
  "#800020",
];没有正确加上引号*/

function getRandomIndex() {
    const randomIndex = Math.floor(darkColorsArr.length * Math.random());
    return randomIndex;
}
/*function getRandomIndex() {
console.log(darkColorsArr.length * math.random())
数学函数引用错误，返回的是带小数的值 */

const body = document.querySelector("body");
/**const body = document.queryselector("body");
 * 使用的DOM错误，未区分大小写
 */

const bgHexCodeSpanElement = document.querySelector("#bg-hex-code");
/**const body = document.querySelector("body");
const bgHexCodeSpanElement = document.querySelector("bg-hex-code");

console.log(bgHexCodeSpanElement);
调用id时没加#号 */

function changeBackgroundColor() {
    const color = darkColorsArr[getRandomIndex()];

    bgHexCodeSpanElement.innerText = color;
    body.style.backgroundColor = color;
}

/**function changeBackgroundColor() {
  const color = darkColorsArr[getRandomIndex];

  bgHexCodeSpanElement.innerText = color;
  body.style.backgroundColor = color;
}
changeBackgroundColor();
未正确调用getRandomIndex函数 */
const btn = document.querySelector("#btn");
/**const btn = document.querySelector("#click-btn");
console.log(btn);
连接HTML元素错误 */
btn.onclick = changeBackgroundColor;
/**btn.onclick = changeBackgroundColor();
 * onclick使用时不应该立刻调用函数
 */