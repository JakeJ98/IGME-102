"use strict"
/**
 * Project 2
 */

class WrdThing { // passes in a word and word size to incrememnt the size of the word dependingn on how many times it is used
    constructor(w) {
        this.x = random(600); //assigns a random x location
        this.y = random(900); //assigns arandom y location
        this.hueVal = random(360); //assigns a random hue value
        this.word = w; //takes in the passed in word
    }



    //calls the display function 
    display(frequency) {
        fill(this.hueVal,100,100); //randomizes the hue
        textSize(10+frequency); //increments the size
        text(this.word,this.x,this.y); //displays the word in a random location
    }
}
