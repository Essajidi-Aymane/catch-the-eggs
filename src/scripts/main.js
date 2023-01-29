
// importation de la classe Game.js
import Game from './game.js';



// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le panier
const init = () => {
  const canvas = document.getElementById("playfield");
  const game = new Game(1200, 600, canvas);

  document.getElementById("stopAndStartGame").addEventListener("click", () => game.moveAndDraw(canvas.getContext('2d')));
  /*evenement de deplacement de basket */
  window.addEventListener('keydown', game.keyDownAction.bind(game));
  window.addEventListener('keyup', game.keyUpAction.bind(game));
  // evenement ajout automatique des oeufs et des rockets
  game.addEgg();
  game.addRocket();
  game.Start();

  document.activeElement.blur();



}


window.addEventListener("load", init);

//
console.log('le bundle a été généré');
