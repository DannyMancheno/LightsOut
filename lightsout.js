
var lights = [
    true, true, true, 
    true, true, true, 
    true, true, true
]
let start_button = document.getElementById('restart_game');
let game_table = document.getElementById('game_table');
let victory_div = document.getElementById('victory');
var tiles = document.getElementsByClassName('press_tile');

window.addEventListener('load', establishGameTable)
start_button.addEventListener('click', establishGameTable);

function establishGameTable(){
    for(let j = 0; j < lights.length; j++){
        if(Math.random() * 100 < 50) lights[j] = false
        else {lights[j] = true}
    }

    let tableHTML = `<div>\n`
    for(let i = 0; i < lights.length; i++){
        if(i % 3 == 0 && i != 0){
            tableHTML += `</div>\n<div>\n`
        }
        tableHTML += `\t<div class='${lights[i] ? 'press_tile tile_on': 'press_tile tile_off'}' value='${i}'>${i + 1}</div>\n`
    }

    tableHTML += `</tr>`
    game_table.innerHTML = tableHTML;

    for(i = 0; i< tiles.length; i++){
        tiles[i].addEventListener('click', switchTiles)
    }
    victory_div.innerHTML = '&nbsp;';
}

function switchTiles(){
    let currentTile = parseInt(this.getAttribute('value'));
    let currentColumn = currentTile % 3;
    let currentRow = Math.floor(currentTile / 3);

    let leftTile = (currentTile - 1 >= 0 && currentColumn > 0) ? (currentTile - 1) : null;
    let rightTile = (currentTile + 1 <= 8 && currentColumn < 2) ? (currentTile + 1) : null;
    let aboveTile = (currentTile - 3 >= 0 && currentRow > 0) ? (currentTile - 3) : null;
    let belowTile = (currentTile + 3 <= 8 && currentRow < 2) ? (currentTile + 3) : null;

    toggleTile(currentTile)
    if(leftTile != null) toggleTile(leftTile);
    if(rightTile != null) toggleTile(rightTile);
    if(aboveTile != null) toggleTile(aboveTile);
    if(belowTile != null) toggleTile(belowTile);

    function toggleTile(tile){
        if(lights[tile]){
            lights[tile] = false;
        }
        else{
            lights[tile] = true;
        }
        tiles[tile].classList.toggle('tile_off');
        tiles[tile].classList.toggle('tile_on');
    }

    if(isGameFinished()){
        victory_div.innerHTML = 'Lights Out!';
        for(let i = 0; i < tiles.length; i++){
            tiles[i].style.color = 'orange';
        }
    }
    else{
        victory_div.innerHTML = '&nbsp;';
        for(let i = 0; i < tiles.length; i++){
            tiles[i].style.color = 'white';
        }
    }
}

function isGameFinished(){
    anyLightOn = 0;
    for(let i = 0; i < lights.length; i++){
    if(lights[i] == true){
    anyLightOn++;
    }
    }
    if(anyLightOn) return false;
    return true;
}