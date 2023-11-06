/* reload web */
function resetFunction() {
    window.location.reload();
}

function getRandomChoice() {
    const choices = ['.com-gunting', '.com-batu', '.com-kertas'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

/* const computerChoice = getRandomChoice();
console.log('Pilihan komputer:', computerChoice); */

function result(com, player) {
    if (player === 'player-batu' && com === '.com-batu') return 'DRAW';
    if (player === 'player-kertas' && com === '.com-kertas') return 'DRAW';
    if (player === 'player-gunting' && com === '.com-gunting') return 'DRAW';
    if (player === 'player-batu') return (com === '.com-gunting') ? 'Player Win' : 'Com Win';
    if (player === 'player-kertas') return (com === '.com-batu') ? 'Player Win' : 'Com Win';
    if (player === 'player-gunting') return (com === '.com-kertas') ? 'Player Win' : 'Com Win';

}

/*const comChoice = '.com-batu';
const playerChoice = 'player-batu';

console.log(result(comChoice, playerChoice));*/

const option = document.querySelectorAll(".player-btn button")
option.forEach(function (pil) {
    pil.addEventListener('click', function () {
        const comPilihan = getRandomChoice();
        const playerPilihan = pil.className;
        const hasil = result(comPilihan, playerPilihan);
        pil.setAttribute("class", "player-com-button");
        let com = document.querySelector(comPilihan);
        com.setAttribute("class", "player-com-button");

        const end = document.querySelector('.box-versus')
        if (hasil === 'Player Win' || hasil === 'Com Win') {
            end.setAttribute("class", "game-result")
            end.innerHTML = `<h1 class="win">${hasil}</h1>`
        } else {
            end.setAttribute("class", "game-draw")
            end.innerHTML = `<h1 class="win">${hasil}</h1>`
        }


        option.forEach(element => {
            element.style.cursor = 'not-allowed';
            element.style.pointerEvents = 'none';
          });
    })
})
