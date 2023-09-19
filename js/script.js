let playerCount = 1;
let playerList = [];
let rount = 3;
var playerCountInput = document.getElementById("playerCount");

playerCountInput.addEventListener("change", function () {
    var count = parseInt(this.value);
    if (count > 0 && count <= 50) {
        playerCount = count;
    } else {
        playerCount = 1;
        this.vale = 1;
    }
    updatePlayerTable();
});

/*
 * 控制使用者數量
 * @param {*} num 
 */
function addPlayer(num) {
    if (playerCount + num >= 1) {
        playerCount += num;
        playerCountInput.value = playerCount;
        updatePlayerTable();
    }
}

/*
 * 更新訓練家列表
 */
function updatePlayerTable() {
    var playerTable = document.getElementById("playerTable");
    if (playerCount > playerTable.rows.length - 1) {
        for (var i = playerTable.rows.length - 1; i < playerCount; i++) {
            var row = playerTable.insertRow(playerTable.rows.length);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var index = i + 1;
            cell1.innerHTML = playerTable.rows.length - 1;
            cell2.innerHTML = `<input type="email" class="form-control" id="nickname-${index}">`;
            cell3.innerHTML = addSelectButton("victory", index);
            cell4.innerHTML = addSelectButton("defeat", index);
        }
    } else if (playerCount < playerTable.rows.length - 1) {
        for (var i = playerTable.rows.length - 1; i > playerCount; i--) {
            playerTable.deleteRow(i);
        }
    }
}

function savePlayerTable() {
    var playerTable = document.getElementById("playerTable");
    for (var i = 1; i < playerTable.rows.length; i++) {
        var nickname = document.getElementById(`nickname-${i}`).value;
        var victoryCount = document.getElementById(`victory-${i}`).value;
        var defeatCount = document.getElementById(`defeat-${i}`).value;

        playerList.push({
            nickname: nickname,
            victoryCount: victoryCount,
            defeatCount: defeatCount,
            orderby: i
        })
    }
}

/*
 * 新增下拉選單場次數
 */
function addSelectButton(name, num) {
    var html = `<select id="${name}-${num}" class="form-select"><option selected value="0">0</option>`;
    for (var i = 0; i < rount; i++) {
        html += `<option value="${i + 1}">${i + 1}</option>`;
    }
    html += '</select>';
    return html
}