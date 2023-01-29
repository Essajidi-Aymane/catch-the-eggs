import Mobile from "./Mobile"
import rocket from "../scripts/assets/images/rocket128.png"
import Egg from "./Egg";

// constante de deplacement de la rocket
const DELTA_X = 6;
const DELTA_Y = 0;

export default class Rocket extends Mobile {

    //dimension de la rocket
    static ROCKET_HEIGHT = 25;
    static ROCKET_WIDTH = 25;

    //constructeur de rocket
    constructor(x, y, deltaX = DELTA_X, deltaY = DELTA_Y) {
        super(x, y, deltaX, deltaY, rocket);
        this.hit = false;
    }

    //deplacement de la rocket
    move(game) {
        if (this.x + this.deltaX > -Rocket.ROCKET_WIDTH) {
            super.move();
        }
        else {
            this.x = -Rocket.ROCKET_WIDTH;
        }
    }
    //boolean indique que la rocket a touché un mobile
    isHit() {
        this.hit = true;


    }

    getHit() {
        return this.hit;
    }

    //detection de collision avec 1 oeuf
    collisionWith(mobile) {
        const colx = (this.x + Rocket.ROCKET_WIDTH >= mobile.x - Egg.EGG_WIDTH) && (this.x <= mobile.x + Egg.EGG_HEIGHT);
        const coly = (mobile.y + Egg.EGG_HEIGHT >= this.y) && (mobile.y - Egg.EGG_HEIGHT <= this.y);
        return colx && coly;
    }
    /* detection de collision avec tout les oeufs, si il y a collision,
       disparition de l'oeuf
       */
    collisionRocketEgg(game) {
        const m = game.eggs.filter(mobile => this.collisionWith(mobile) && !mobile.getTouched());
        m.forEach(mobile => {
            mobile.isTouched();
            game.removeEgg(mobile);
        });
    }









}