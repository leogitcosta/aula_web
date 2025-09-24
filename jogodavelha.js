(function(){
  const tabuleiroEl = document.getElementById('tabuleiro');
  const statusEl = document.getElementById('status');
  const resetBtn = document.getElementById('reset');

  let tabuleiro = Array(9).fill(null);
  let gameOver = false;
  let selectedIdx = null; // índice da célula clicada


  // criar células
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.idx = i;
    cell.addEventListener('click', () => selectCell(i));
    tabuleiroEl.appendChild(cell);
  }

  function selectCell(idx){
    if (gameOver || tabuleiro[idx] !== null) return;
    clearSelection();
    selectedIdx = idx;
    getCell(idx).classList.add('selected');
    statusEl.textContent = 'Pressione "x" ou "o" para marcar.';
  }

  function clearSelection(){
    tabuleiroEl.querySelectorAll('.cell').forEach(c => c.classList.remove('selected'));
    selectedIdx = null;
  }

  // ouvir teclas
  document.addEventListener('keydown', (e) => {
    if (selectedIdx === null || gameOver) return;
    const key = e.key.toLowerCase();
    if (key === 'x' || key === 'o') {
      markCell(selectedIdx, key.toUpperCase());
      clearSelection();
    }
  });

  function markCell(idx, mark){
    tabuleiro[idx] = mark;
    const cell = getCell(idx);
    cell.textContent = mark;
    cell.classList.add('filled');
    checkGame();
  }

  function getCell(idx){
    return tabuleiroEl.querySelector(`.cell[data-idx="${idx}"]`);
  }

  const WINS =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6] ]

  function checkGame(){
    for (const [a,b,c] of WINS){
      if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]){
        gameOver = true;
        [a,b,c].forEach(i => getCell(i).classList.add('win'));
        statusEl.textContent = `Vitoria de ${tabuleiro[a]}!!!`;
        return;
      }
    }
    if (tabuleiro.every(v=>v !== null)){
      gameOver = true;
      statusEl.textContent = `Deu empate! :( `;
    }
    statusEl.textContent = `Clique em uma celula e pressione "x" ou "o"`;
  }


  function reset(){
    tabuleiro.fill(null);
    gameOver = false;
    selectedIdx = null;
    tabuleiroEl.querySelectorAll('.cell').forEach(c=>{
      c.textContent = '';
      c.classList.remove('filled','win','selected');
    });
    statusEl.textContent = 'Clique em uma célula e pressione "x" ou "o".';
  }

  resetBtn.addEventListener('click', reset);
})();