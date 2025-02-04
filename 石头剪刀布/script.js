/**获取随机电脑结果 */
function getRandomComputerResult() {
    const options = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

/**判断是否赢得游戏 */
function hasPlayerWonTheRound(player, computer) {
    return (player == "Rock" && computer == "Scissors") ||
        (player == "Scissors" && computer == "Paper") ||
        (player == "Paper" && computer == "Rock");
}

/**初始化得分 */
let playerScore = 0;
let computerScore = 0;

/**返回结果 */
function getRoundResults(userOption) {
    const computerResult = getRandomComputerResult();
    if (hasPlayerWonTheRound(userOption, computerResult)) {
        playerScore++;
        return `Player wins! ${userOption} beats ${computerResult}`;
    } else if (userOption === computerResult) {
        return `It's a tie! Both chose ${userOption}`;
    } else {
        computerScore++;
        return `Computer wins! ${computerResult} beats ${userOption}`;
    }
}

/**绑定元素 */
const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

/**显示结果 */
function showResults(userOption) {
    const resultMessage = getRoundResults(userOption);
    playerScoreSpanElement.innerHTML = `${playerScore}`;
    computerScoreSpanElement.innerHTML = `${computerScore}`;
    roundResultsMsg.innerHTML = `${resultMessage}`;
    if (playerScore == 3) {
        winnerMsgElement.innerHTML = `Player has won the game!`
        optionsContainer.style.display = "none"
        resetGameBtn.style.display = "block"
    } else if (computerScore == 3) {
        winnerMsgElement.innerHTML = `Computer has won the game!`
        optionsContainer.style.display = "none"
        resetGameBtn.style.display = "block"
    }

}

/**添加事件监听器 */
document.getElementById("rock-btn").addEventListener("click", () => showResults("Rock"));
document.getElementById("paper-btn").addEventListener("click", () => showResults("Paper"));
document.getElementById("scissors-btn").addEventListener("click", () => showResults("Scissors"));

function resetGame() {
    playerScore = 0
    playerScoreSpanElement.innerHTML = `${playerScore}`
    computerScore = 0
    computerScoreSpanElement.innerHTML = `${computerScore}`
    winnerMsgElement.innerHTML = ``
    roundResultsMsg.innerHTML = ``
    resetGameBtn.style.display = "none"
    optionsContainer.style.display = "block"
}
resetGameBtn.addEventListener("click", resetGame);