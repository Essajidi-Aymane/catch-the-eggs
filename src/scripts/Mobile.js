
import { Basket } from "./Basket";

export default class mobile {

    /* constructeur du mobile*/
    constructor(x, y, deltaX = 0, deltaY = 0, img) {
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = img;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.touch = false;

    }

    /*dessin du mobile sur le canvas*/
    draw(context) {
        context.drawImage(this.img, this.x, this.y);
    }

    /*deplacement du mobile*/
    move() {
        this.x += this.deltaX;
        this.y += this.deltaY;
    }

    /* permet de disparaitre l'oeuf quand il est toucher*/
    isTouched() {
        this.touch = true;
    }

    /* getter pour savoir si le panier est toucher*/
    getTouched() {
        return this.touch;
    }

    // detection de collision avec 1 oeuf
    collisionWith(mobile) {
        const colx = (this.x - Basket.BASKET_WIDTH <= mobile.x) && (this.x + Basket.BASKET_WIDTH >= mobile.x);
        const coly = (mobile.y >= this.y) && (mobile.y <= this.y + Basket.BASKET_HEIGHT);
        return colx && coly;
    }
    /* detection de collision avec tout les oeufs; si il y a collision,
    ajout du score et disparition de l'oeuf*/
    collision(game) {
        const m = game.eggs.filter(mobile => this.collisionWith(mobile) && !mobile.getTouched());
        m.forEach(mobile => {
            mobile.isTouched();
            game.removeEgg(mobile);
            game.addScore(100);
        });
    }





}