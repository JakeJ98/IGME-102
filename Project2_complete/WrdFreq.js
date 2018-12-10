"use strict"
/**
 * Project 2
 */


class WrdFreq {

    constructor() {
        this.ctrs = createNumberDict(".", 0); //uses the numberdict function of Javascript
        this.wordThings = []; //creates the empty array
    }

    reInit() {  //resets the wdfreq to display again
        this.ctrs.clear();  
        this.wordThings = [];
    }

    countLine(line) {

        let lcline = line.toLowerCase(); //sets all uppercase letters to lowercase
        let noPunc = lcline.replace(/[.,!?;:"\[\]\(\)\*2]/g, ''); // Get rid of punctuation that can be simply deleted
        let noDash = noPunc.replace(/-/g, ' '); // Replace dash with space to separate hyphenated words
        let oneSpace = noDash.replace(/ +/g, ' '); // Collapse multiple-space sequences to a single space
        let wordAra = noDash.split(' '); // splits every word into individual strings

        for (let i = 0; i < wordAra.length; i++) { //loops through the array of strings
            let word = wordAra[i]; //assigns a varaible to individula words
            if (this.ctrs.hasKey(word)) { //if the numberdict already has a word:
                this.ctrs.add(word, 1); //add 1 to its count
            } else {
                this.ctrs.create(word, 1); //add the word to the number dict
                this.wordThings.push(new WrdThing(word)); //add the word to the wordthings array
            }
        }
    }

    //calls the display function depending on the current state value
    display(state) {
        this.wordCloudDisplay(); //calls dsplay for the histogram
    }
    dump() {
        this.ctrs.print(); // prints the numberdict
    }


    wordCloudDisplay() { //creates the word cloud display
        for (let i = 0; i < this.wordThings.length; i++) { //cycles thorugh all the wrods in the array
            let wrdSize = this.ctrs.get(this.wordThings[i].word); //tells the wordSize the amount of times a word is used
            this.wordThings[i].display(wrdSize); //displays the words
        }
    }

}
