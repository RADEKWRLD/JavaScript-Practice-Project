const calorieCounter = document.getElementById("calorie-counter")
const budgetNumberInput = document.getElementById("budget")
const entryDropdown = document.getElementById("entry-dropdown")
const addEntryButton = document.getElementById("add-entry")
const clearButton = document.getElementById("clear")
const output = document.getElementById("output")
let isError = false

/**编写函数使calorieBudget合理化，只能输入数字 */
function cleanInputString(str) {
    const regex = /[+-\s]/g
    return str.replace(regex, '');
}/**匹配+，-和空格替换为空字符，/g为应用到全局 */


/**检查是否包含科学计数法 */
function isInvalidInput(str) {
    const regex = /\d+e\d+/i
    return str.match(regex)
    /*当添加了i时，则为模糊搜索，不匹配大小写,添加+匹配多次
     */
}

/**添加entry模块 */
function addEntry() {
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1
    const HTMLString = `
 <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
 <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name">    
 <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>   
 <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories">
 `
    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString)
    /**使用模板文字，允许直接在字符串中直接插入变量{} */

    /**创建HTML元素，但未保存输入内容，则将innerHTML 分配更改为使用 targetInputContainer 的 insertAdjacentHTML() 方法*/

    /**insertAdjacentHtml 方法接受两个参数。 第一个参数是一个字符串，指定插入元素的位置。 第二个参数是包含要插入的 HTML 的字符串。 */
}
/**事件监听器 */
addEntryButton.addEventListener("click", addEntry)
calorieCounter.addEventListener("submit",calculateCalories)
clearButton.addEventListener("click",clearForm)

/**从用户输入中获取卡路里计数 */
function getCaloriesFromInputs(list) {
    let calories = 0
    /**使用for of函数遍历list */
    for (const item of list) {
        const currVal = cleanInputString(item.value);
        let invalidInputMatch = isInvalidInput(currVal)
        if (invalidInputMatch) {
            alert(`Invalid Input: ${invalidInputMatch[0]}`);
            isError = true
            return null
        }
        calories += Number(currVal)
        return calories
    }
}

function calculateCalories(e) {
    /**防止submit重新刷新事件 */
    e.preventDefault()
    isError = false
    const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']")
    const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']")
    const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']")
    const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']")
    const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']")
    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs)
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs)
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs)
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs)
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs)
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput])
    if (isError) {
        return
    }
    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories
    const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit"
    output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>
    `
    output.classList.remove("hide")
}

/**清除表单 */
function clearForm(){
    const inputContainers = Array.from(document.querySelectorAll('.input-container'))
    for(const container of inputContainers){
        container.innerHTML=""
    }
    budgetNumberInput.value=""
    output.innerText=""
    output.classList.add("hide")
}