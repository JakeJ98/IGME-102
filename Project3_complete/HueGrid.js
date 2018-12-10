"use strict";
/* Author: Jake Johnson
 *Description: Using a chromosome passed into the huegrid class, create a colorful animation based on the genes that set the alterations and initialazations
 */

class HueGrid {
    constructor(chrom, x, y, w, h) {
        this.chrom = chrom;
        //        print(this.chrom);
        //position of hue grid
        this.xOr = x;
        this.yOr = y;
        this.myHeight = h;
        this.myWidth = w;
        // More stuff
        this.cellSize;
        this.nRows;
        this.nCols;
        this.initmaxDev = 5;
        this.maxDev = this.initmaxDev;
        this.alters;
        this.selects;
        this.hue = [];
        this.reset(chrom); // Pass it on to the reset() method
    }




    reset(chrom) {
        this.hue = [];
        this.chrom = chrom; // Make an attribute for it
        this.cellSize = (this.chrom & 15) + 3; // Decode cell size
        this.initMeth = (this.chrom >>> 4) & 3; // Decode initialization method 
        this.alters = (this.chrom >>> 6) & 3; // Decode alteration method
        this.strokes = (this.chrom >>> 7) & 1; // Decode stroke
        //shows the current values held by each gene
        //        print(this.alters);
        //        print(this.initMeth);
        //        print(this.strokes);
        this.nRows = Math.floor(this.myHeight / this.cellSize);
        this.nCols = Math.floor(this.myWidth / this.cellSize);
        //figures out the number of row and columbs needed
        for (let i = 0; i < this.nRows; i++) {
            this.hue[i] = [];
            for (let j = 0; j < this.nCols; j++) {
                // More stuff

                // switch(initRad.value()) // unplug the UI control (comment out)
                switch (this.initMeth) { // Use the decoded gene instead
                    case 0: // cases are number values, not strings
                        this.hue[i].push(random(360)); //random pulsing
                        // One of the init methods
                        break;
                    case 1:
                        // Another one of the init methods
                        this.hue[i].push(((i + j) * 50) % 360); //makes it a stripe pattern
                        break;
                        // and so on
                    case 2:
                        this.hue[i].push((i * j) % 1000); //makes it a hyperbolic curve shape
                        break;
                    case 3:
                        this.hue[i].push((i & j) % 360); //makes it a smooth wave shape
                        break;
                }

            }

        }
    }
    alterHue() {
        this.slideVal = mySlide.value();
        this.maxDev = this.slideVal;
        for (let i = 0; i < this.nRows; i++) {
            for (let j = 0; j < this.nCols; j++) {

                if (this.alters == 0) {
                    //rainbow effect
                    this.hue[i][j] = (this.hue[i][j] + this.maxDev) % 360;
                } else if (this.alters == 1) {
                    //random deviation
                    this.hue[i][j] = this.hue[i][j] + random(-this.maxDev, this.maxDev);
                    if (this.hue[i][j] >= 360) {
                        this.hue[i][j] = this.hue[i][j] - 360;
                    } else if (this.hue[i][j] <= 0) {
                        this.hue[i][j] = this.hue[i][j] + 360;
                    }
                } else if (this.alters == 2) {
                    //reverse rainbow color constrained
                    this.hue[i][j] = (this.hue[i][j] - this.maxDev) % 160;
                    if (this.hue[i][j] >= 160) {
                        this.hue[i][j] = this.hue[i][j] - 160;
                    } else if (this.hue[i][j] <= 0) {
                        this.hue[i][j] = this.hue[i][j] + 160;
                    }
                } else if (this.alters == 3) {
                    //red and yellow colors
                    this.hue[i][j] = ((this.hue[i][j] + 50) + (this.maxDev / 5)) % 50;
                }
            }
        }
    }
    display() {
        //display the huegrids
        push();
        translate(this.xOr, this.yOr);

        //use decoded stroke gene to determine stroke on/off
        if (this.strokes == 0) {
            stroke('black');
            strokeWeight(1);
        } else {
            noStroke();
        }
        for (let i = 0; i < this.nRows; i++) {
            for (let j = 0; j < this.nCols; j++) {
                fill(this.hue[i][j] + this.slideVal, 100, 100);
                rect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
            }
        }
        pop();
    }
    
    mouseOver() {
        // if the mouse is over any of the huegrids, return the true
        return (mouseX >= this.xOr && mouseX <= (this.xOr + this.myWidth) &&
            mouseY >= this.yOr && mouseY <= this.yOr + this.myHeight)
    }
}
