import basketImgSrc from '../scripts/assets/images/basket128.png';
import Mobile from "./Mobile";
import Rocket from './Rocket';

/*constante de deplacement de basket*/
const Movements = { NONE: 0, UP: 1, DOWN: 2, LEFT: 3, RIGHT: 4 };
const DELTA_X = 10;
const DELTA_Y = 10;

export class Basket extends Mobile {

    /* dimenssion du panier*/
    static BASKET_HEIGHT = 48;
    static BASKET_WIDTH = 48;

    /* constructeur du panier*/
    constructor(x, y, deltaX = DELTA_X, deltaY = DELTA_Y) {
        super(x, y, deltaX, deltaY, basketImgSrc);
        this.moving = Movements.NONE;



    }

    /*getter mouvement vers le haut du panier*/
    getUp() {
        return this.moving == Movements.UP;
    }

    /*getter mouvement vers le bas du panier*/
    getDown() {
        return this.moving == Movements.DOWN;
    }

    /*getter mouvement vers la gauche du panier*/
    getLeft() {
        return this.moving == Movements.LEFT;
    }

    /*getter mouvement vers la droite du panier*/
    getRight() {
        return this.moving == Movements.RIGHT;
    }

    /* deplacement vers le haut du panier*/
    moveUp() {
        this.deltaY = -DELTA_Y;
        this.moving = Movements.UP;
    }

    /* deplacement vers le bas du panier*/
    moveDown() {
        this.deltaY = DELTA_Y;
        this.moving = Movements.DOWN;

    }

    /* deplacement vers la gauche du panier*/
    moveLeft() {
        this.deltaX = -DELTA_X;
        this.moving = Movements.LEFT;
    }

    /* deplacement vers la droite du panier*/
    moveRight() {
        this.deltaX = DELTA_X;
        this.moving = Movements.RIGHT;
    }

    /* permet au panier de se deplacer vers le haut, le bas, la gauche et vers la droite sans depasser les bord du canvas*/
    move(canvas) {
        if (this.getUp()) {
            this.y = Math.max(0, this.y + this.deltaY);
        }
        if (this.getDown()) {
            this.y = Math.min(canvas.height - Basket.BASKET_HEIGHT, this.y + this.deltaY);
        }
        if (this.getRight()) {
            this.x = Math.min(canvas.width - Basket.BASKET_WIDTH, this.x + this.deltaX);
        }
        if (this.getLeft()) {
            this.x = Math.max(0, this.x + this.deltaX);
        }
    }

    /* arret du deplacement du panier*/
    stopMoving() {
        this.moving = Movements.NONE;
    }

    // detection de collision avec 1 rocket
    collisionWith(mobile) {
        const colx = (this.x - Basket.BASKET_WIDTH <= mobile.x + Rocket.ROCKET_WIDTH) && (this.x + Basket.BASKET_WIDTH >= mobile.x);
        const coly = (mobile.y <= this.y + Basket.BASKET_HEIGHT) && (mobile.y >= this.y - Basket.BASKET_HEIGHT);
        return colx && coly;
    }

    /* detection de collision avec tout les rockets, si il y a collision,
    ajout du score et disparition de rocket*/
    collisionBasketRocket(game) {
        const m = game.rockets.filter(mobile => this.collisionWith(mobile) && !mobile.getHit());
        m.forEach(mobile => {
            mobile.isHit();
            game.addCompteur();
            game.removeRocket(mobile);
            game.addScore(-500);
        });
    }





}