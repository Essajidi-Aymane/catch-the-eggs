import { Basket } from "./Basket";
import Egg from "./Egg";
import Rocket from "./Rocket";

/*fonction nombre aleatoire entre a et b*/
const aleatoire = (a, b) => {
    const min = Math.ceil(a);
    const max = Math.floor(b);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export default class Game {

    /* constructeur de game*/
    constructor(width, height, canvas) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.basket = new Basket(width / 2 - 175, height / 2 - 10);
        this.eggs = new Array();
        this.rockets = new Array();
        this.score = 0;
        this.timer = null;
        this.compteur = 4;
    }
    /* permet le deplacement et l'affichage de Basket, des oeufs et des rockets sur le canvas*/
    moveAndDraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //condition pour que le jeux termine
        if (this.compteur == 1) {
            alert("You Lose");
            return;
        }
        //deplacement et affichage de basket
        this.basket.draw(this.ctx);
        this.basket.move(this.canvas);
        // deplacement et collision des rockets
        this.rockets.forEach(rocket => {
            rocket.collisionRocketEgg(this);
            rocket.move(this.canvas);
        });
        // deplacement des oeufs
        this.eggs.forEach(egg => {
            egg.move(this);
        });
        // collision entre basket et oeufs
        this.basket.collision(this);
        // collision entre basket et rockets
        this.basket.collisionBasketRocket(this);
        //suppression des oeufs en dehors du canvas
        this.eggs = this.eggs.filter(egg => egg.y != -Egg.EGG_HEIGHT);
        //suppression des rockets en dehors du canvas
        this.rockets = this.rockets.filter(rocket => rocket.x != this.canvas.width);
        // affichage des oeufs
        this.eggs.forEach(egg => {
            egg.draw(this.ctx);
        });
        // affichage des rockets
        this.rockets.forEach(rocket => {
            rocket.draw(this.ctx);
        });
        this.raf = window.requestAnimationFrame(this.moveAndDraw.bind(this));
    }
    //permet de gerer l'utilastion des touches haut, bas , gauche et droite
    keyDownAction(event) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
                this.basket.moveUp();
                break;
            case "ArrowDown":
            case "Down":
                this.basket.moveDown();
                break;
            case "ArrowLeft":
            case "Left":
                this.basket.moveLeft();
                break;
            case "ArrowRight":
            case "Right":
                this.basket.moveRight();
                break;
            default: return;
        }
        event.preventDefault();
    }


    // permet de gerer l'arret des touches haut ,bas ,droite et gauche
    keyUpAction(event) {
        switch (event.key) {
            case "ArrowLeft":
            case "Left":
            case "ArrowRight":
            case "Right":
            case "ArrowDown":
            case "Down":
            case "ArrowUp":
            case "Up":
                this.basket.stopMoving();
                break;
            default: return;

        }
        event.preventDefault();
    }
    // ajoute un oeuf
    addEgg() {
        const y = 0;
        const x = aleatoire(0, this.canvas.width - Egg.EGG_HEIGHT);
        this.eggs.push(new Egg(x, y));
    }
    // ajoute un rocket
    addRocket() {
        const x = 0
        const y = aleatoire(0, this.canvas.height - Rocket.ROCKET_WIDTH);
        this.rockets.push(new Rocket(x, y));
    }
    // suppression d'un oeuf
    removeEgg(remove) {
        this.eggs = this.eggs.filter(egg => egg != remove);
    }
    // suppression d'un rocket
    removeRocket(remove) {
        this.rockets = this.rockets.filter(rocket => rocket != remove);
    }
    // permet d'augmenter ou diminuer le score
    addScore(pts) {
        this.score = this.score + pts;
        this.reloadScore();
    }
    // permet d'augmenter le compteur 
    addCompteur() {
        this.compteur = this.compteur - 1;
        this.reloadLife();
    }
    // permet d'enlever les images des rockets (vie) sur la page
    reloadLife() {
        document.getElementById("".concat("life-", this.compteur)).style.display = "none";
    }
    // permet de recharger le score sur la page
    reloadScore() {
        document.getElementById("score").textContent = this.score;
    }
    /* permet de gerer l'arret ou le lancement des oeufs et des rockets automatiques*/
    Start() {
        if (this.timer == null) {
            this.timer = window.setInterval(() => {
                if (Math.floor(Math.random() * 4) == 0) {
                    this.addEgg();
                }
                if (Math.floor(Math.random() * 2) == 0) {
                    this.addRocket();
                }
            }, 1000);
        }
        else {
            window.clearInterval(this.timer);
            this.timer = null;
        }

    }


}



