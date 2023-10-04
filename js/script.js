let playerCount = 1;
let playerList = [];
let rount = 5;
var playerCountInput = document.getElementById("playerCount");

/**
 * 偵測按鈕事件
 */
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
            // var cell4 = row.insertCell(3);
            var index = i + 1;
            cell1.innerHTML = playerTable.rows.length - 1;
            cell2.innerHTML = `<input type="text" class="form-control" id="nickname-${index}">`;
            cell3.innerHTML = addSelectButton("victory", index);
            // cell4.innerHTML = addSelectButton("defeat", index);
        }
    } else if (playerCount < playerTable.rows.length - 1) {
        for (var i = playerTable.rows.length - 1; i > playerCount; i--) {
            playerTable.deleteRow(i);
        }
    }
}

/**
 * 儲存訓練家列表
 */
function savePlayerTable() {
    playerList = []; //初始化名單
    var playerTable = document.getElementById("playerTable");
    for (var i = 1; i < playerTable.rows.length; i++) {
        var nickname = document.getElementById(`nickname-${i}`).value;
        var victoryCount = document.getElementById(`victory-${i}`).value;
        // var defeatCount = document.getElementById(`defeat-${i}`).value;

        wp = parseInt(victoryCount) / rount
        wp = isNaN(wp) ? 0 : wp;
        playerList.push({
            nickname: nickname,
            victoryCount: victoryCount,
            // defeatCount: defeatCount,
            orderby: i,
            wp: wp
        })
    }

    randomBattleList();
    bootstrap.Modal.getInstance("#ListModal").hide();
}

/**
 * 產生對戰表
 */
function randomBattleList() { 
    // 先隨機一波在進行勝率排序
    playerList.sort( () => Math.random() - 0.5 );
    playerList.sort(function (a, b) {
        var keyA = a.wp,
        keyB = b.wp;
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
    })
    resetBattleList();
    updateBattleList();
}

/**
 * 更新對戰表
 */
function updateBattleList() {
    var battleTable = document.getElementById("battleTable");
    if (playerList.length > 1) {
        var tableNumber = 1
        for (var i = 0; i < playerList.length; i++) {
            if (i %2 === 0) {
                var row = battleTable.insertRow(battleTable.rows.length);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = tableNumber;
                cell2.innerHTML = `<td>${playerList[i].nickname}</td>`;
                cell3.innerHTML = `<td>${playerList[i].victoryCount}</td>`;
                cell4.innerHTML = "<td>vs</td>";

                if ( i + 1 == playerList.length) {
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    cell5.innerHTML = "<td>從缺</td>";
                    cell6.innerHTML = "<td>0</td>";
                }
            } else {
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                cell5.innerHTML = `<td>${playerList[i].nickname}</td>`;
                cell6.innerHTML = `<td>${playerList[i].victoryCount}</td>`;

                tableNumber += 1
            }
        }
        alert("對戰表產生成功");
    } else {
        alert("請先設定訓練家名單")
    }
}

/**
 * 初始化對戰表
 */
function resetBattleList() {
    var playerTable = document.getElementById("playerTable");
    if (playerCount > playerTable.rows.length - 1) {
        for (var i = playerTable.rows.length - 1; i < playerCount; i++) {
            var row = playerTable.insertRow(playerTable.rows.length);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            // var cell4 = row.insertCell(3);
            var index = i + 1;
            cell1.innerHTML = playerTable.rows.length - 1;
            cell2.innerHTML = `<input type="text" class="form-control" id="nickname-${index}">`;
            cell3.innerHTML = addSelectButton("victory", index);
            // cell4.innerHTML = addSelectButton("defeat", index);
        }
    } else if (playerCount < playerTable.rows.length - 1) {
        for (var i = playerTable.rows.length - 1; i > playerCount; i--) {
            playerTable.deleteRow(i);
        }
    }


    var battleTable = document.getElementById("battleTable");
    if (battleTable.rows.length > 0) {
        for (var i = battleTable.rows.length - 1; i > 0; i--) {
            battleTable.deleteRow(i);
        }
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