import Mobile from "./Mobile";
import blueEgg from "../scripts/assets/images/blue-egg64.png"
import greenEgg from "../scripts/assets/images/green-egg64.png"
import yellowEgg from "../scripts/assets/images/yellow-egg64.png"

// constante de deplacement de egg
const DELTA_X = 0;
const DELTA_Y = 4;

// tableau de toutes les images des oeufs
const imageEggs = [
    blueEgg,
    greenEgg,
    yellowEgg
];

// fonction pour l'ajout aleatoire des oeufs 
const aleatoire = (a, b) => {
    const min = Math.ceil(a);
    const max = Math.floor(b);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class Egg extends Mobile {

    // taille d'un oeuf
    static EGG_HEIGHT = 36;
    static EGG_WIDTH = 36;

    // constructeur d'un oeuf
    constructor(x, y, deltaX = DELTA_X, deltaY = DELTA_Y) {
        super(x, y, deltaX, deltaY, imageEggs[aleatoire(0, 2)]);
        this.hit = false;
    }

    // deplacement d'un oeuf 
    move(game) {
        if (this.y + this.deltaY > - Egg.EGG_HEIGHT) {
            super.move();
        }
        else {
            this.y = -Egg.EGG_HEIGHT;
        }
    }

    /* boolean indique quand un mobile est touché*/
    isHit() {
        this.hit = true;
    }

    getHit() {
        return this.hit;
    }


}
