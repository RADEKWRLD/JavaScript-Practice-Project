let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
]


const weapons = [
    {
        name: "stick",
        power: 5
    }, {
        name: "dagger",
        power: 30
    }, {
        name: "claw hammer",
        power: 50
    }, {
        name: "sword",
        power: 100
    }
]


const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        "text": "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        "text": "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        "text": "You enter the cave. You see some monsters."
    }, {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        "text": "You are fighting a monster."
    }, {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        "text": "The monster screams \"Arg!\" as it dies. You gain experience points and find gold."
    }, {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        "text": "You die. &#x2620;"
    }, {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        "text": "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
    }, {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        "text": "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];
/*设置update函数，连接到locations函数上的数组元素*/
function update(location) {
    monsterStats.style.display = "none"
    button1.innerHTML = location["button text"][0];
    button1.onclick = location["button functions"][0];
    button2.innerHTML = location["button text"][1];
    button2.onclick = location["button functions"][1];
    button3.innerHTML = location["button text"][2];
    button3.onclick = location["button functions"][2];
    text.innerHTML = location.text
}


function fightSlime() {
    fighting = 0
    goFight()
}

function fightBeast() {
    fighting = 1
    goFight()
}

function fightDragon() {
    fighting = 2
    goFight()
}

function attack() {
    text.innerHTML = "The " + monsters[fighting].name + " attacks."
    text.innerHTML += " You attack it with your " + weapons[currentWeaponIndex].name + "."
    health -= getMonsterAttackValue(monsters[fighting].level);
    monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp + 1)
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
    } else {
        text.innerHTML += " You miss."
    }
    healthText.innerHTML = health
    monsterHealthText.innerHTML = monsterHealth
    if (health <= 0) {
        lose()
    } else if (monsterHealth <= 0) {
        if (fighting === 2) {
            winGame()
        } else {
            defeatMonster()
        }
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerHTML += " Your " + inventory.pop() + " breaks."
        currentWeaponIndex--
    }
}/*减上一个1到xp的随机数*/


function dodge() {
    text.innerHTML = "You dodge the attack from the " + monsters[fighting].name
}

function goTown() {
    update(locations[0])
}

function goCave() {
    update(locations[2])

}

function goStore() {
    update(locations[1])
}


function goFight() {
    update(locations[3])
    monsterHealth = monsters[fighting].health
    monsterStats.style.display = 'block'
    monsterName.innerHTML = monsters[fighting].name;
    monsterHealthText.innerHTML = monsterHealth;

}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7)
    xp += monsters[fighting].level
    goldText.innerHTML = gold
    xpText.innerHTML = xp
    update(locations[4])
}/*向下取整 */


function lose() {
    update(locations[5])
}

function winGame() {
    update(locations[6])
}

function easterEgg() {
    update(locations[7])
}

function pick(guess) {
const numbers=[]
while(numbers.length<10){
    numbers.push(Math.floor(Math.random() * 11))
}
text.innerHTML="You picked "+guess+". Here are the random numbers:\n"
for(let i=0;i<10;i++){
    text.innerHTML+=numbers[i]+"\n"
}if(numbers.includes(guess)){
    text.innerHTML+="Right! You win 20 gold!"
    gold+=20
    goldText.innerHTML=gold
}else{
    text.innerHTML+="Wrong! You lose 10 health!"
    health-=10
    healthText.innerHTML=health
    if(health<=0){
        lose()
    }
}
}
function pickTwo() {
    pick(2)
}
function pickEight() {
    pick(8)
}


function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        goldText.innerHTML = gold;
        health += 10;
        healthText.innerHTML = health;
    } else {
        text.innerHTML = "You do not have enough gold to buy health."
    }
}
function buyWeapon() {
    if (currentWeaponIndex < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeaponIndex++;
            goldText.innerHTML = gold;
            let newWeapon = weapons[currentWeaponIndex].name;
            inventory.push(newWeapon);
            text.innerHTML = "You now have a " + newWeapon + ".";
            text.innerHTML += " In your inventory you have: " + inventory.join(", ");
        } else {
            text.innerHTML = "You do not have enough gold to buy a weapon.";
        }
    } else {
        text.innerHTML = "You already have the most powerful weapon!";
        button2.innerHTML = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon; // 绑定函数，而不是立即调用
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let soldWeapon = inventory.shift(); // 使用 shift() 从最初的武器开始卖
        text.innerText = "You sold a " + soldWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory.join(", ");
    } else {
        text.innerText = "Don't sell your only weapon!";
    }
}

function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ? hit : 0;
}

function isMonsterHit() {
    return Math.random() > 0.2 || health < 20;
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeaponIndex = 0
    inventory = ["stick"]
    xpText.innerHTML = xp
    healthText.innerHTML = health
    goldText.innerHTML = gold
    goTown()
}

//初始化按钮
button1.onclick = goStore
button2.onclick = goCave
button3.onclick = fightDragon