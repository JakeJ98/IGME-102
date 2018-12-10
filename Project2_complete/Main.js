"use strict"
/**
 * Project 2 Phase 2: Frequency Visualization - by Jake Johnson
 * Uses the p5.js NumberDict class to count the frequency of words
 * in a text file.  The counts are visualized in an animation that
 * counts one line per frame and displays the running totals using
 * a visualization technique.
 *
 * Uses a state variable to control the visualization method, which
 * Illustrates another use for the Object gizmo in JavaScript.
 */




let wdfreq; //character frequency object
let corpAra; //array of strings to hold text file
let lineNum = 0;

let pastQuote = "OutOfThePastQuotes.txt"; //loads the text file


// Set up an enumerated data type (enum) for the program's state
const StVal = {
    IDLE: 0, // No visualization is currently rendering
    WCLD: 1, // The Word Cloud vizualization is currently rendering
}
// Start in idle state
let state = StVal.IDLE;

function preload() {
    corpAra = loadStrings(pastQuote);
}

function setup() {
    createCanvas(600, 900);
    background(0);
    colorMode(HSB); // Use Hue/Saturation/Brightness
    frameRate(10); //slow it down
    textFont("monospace"); //All characters are same width
    wdfreq = new WrdFreq(); //creates the character frequency object


}



function draw() {
    // Only draw anything if we're not IDLE
    if (state != StVal.IDLE) {
        // Haven't finished to file yet
        if (lineNum < corpAra.length) {
            background(0);
            // Count characters in this line
            wdfreq.countLine(corpAra[lineNum]);

            // Visualize counters so far using method indicated by state
            wdfreq.display(state);
            // Next line for next time
            lineNum++;
        } else
            // Finished the file, so now we're IDLE
            state = StVal.IDLE;
    }
}

function keyTyped() {
    if (state == StVal.IDLE && key >= '0' && key <= '9') {
        state = StVal.WCLD; //changes the state
        wdfreq.reInit(); // Reinitialize the counters
        lineNum = 0; // Start at beginning of file
        background(0); // Clear the canvas

    }
}
