"use strict";
/* Project 3
 * Author: Jake Johnson
 * Description: call the huegrids and buttons in order to create the array of changing  * huegrids
 */

let cnv;
let mySlide;
let mySlidelab;
let hueGrid;
let resetBut;
let hueGd;
let gen;
let mutBut;
let xBut;
let selBut;
let breedBut;
let newgenBut;

function setup() {
    //canvas
    cnv = createCanvas(960, 720);
    cnv.position(20, 80);
    background(0);
    colorMode(HSB);

    gen = new Genetics(8, 8);

    hueGd = [];
    
    //reset button 
    resetBut = createButton("Reset");
    resetBut.position(400, 30);
    resetBut.mousePressed(Reset);
    //select button
    selBut = createButton("Select");
    selBut.position(300, 30);
    selBut.mousePressed(selectCall);
    //breed1 button
    breedBut = createButton("breed1");
    breedBut.position(200, 30);
    breedBut.mousePressed(breedSingle);
    //breedGen button
    newgenBut = createButton("breedGen");
    newgenBut.position(700, 30);
    newgenBut.mousePressed(breedCall);
    //mutation button 
    mutBut = createButton("Mutate");
    mutBut.position(500, 30);
    mutBut.mousePressed(doMutate);
    //Crossover button 
    xBut = createButton("Crossover");
    xBut.position(600, 30);
    xBut.mousePressed(doXover);
    //deviation slider
    mySlide = createSlider(0, 80, 5, 0);
    mySlide.position(20, 20);
    mySlidelab = createDiv("Max Hue Deviation");
    mySlidelab.position(mySlide.x, mySlide.y + 25);
    //create the hueGrids
    for (let i = 0; i < 9; i++) {
        let thisChrom = gen.newChrom();
        hueGd[i] = new HueGrid(thisChrom, ((i % 3) * 320), ((Math.floor(i / 3) * 220)), 300, 200); // Pass in random chromosome
        gen.insertNew(i, thisChrom, 0);
    }

}

function draw() {
    background(100);
    for (let i = 0; i < 9; i++) {
        hueGd[i].alterHue();
        hueGd[i].display();
    }
    mySlidelab.html("Max Hue Deviation: " + Math.round(mySlide.value()));
}

function Reset() {
    //resets the chromosomes
    for (let i = 0; i < 9; i++) {
        let thisChrom = gen.newChrom();
        hueGd[i].reset(thisChrom); // Pass in random chromosome
        gen.insertNew(i, thisChrom, 0);
    }

}

function selectCall() {
    //calls the select function from genetics
        let thisChrom = gen.select();
        hueGd[0].reset(thisChrom); // Pass in new chromosome
        gen.insertNew(0, thisChrom, 0);
    
}

function breedSingle() {
    //calls the breed function from genetics
    let thisChrom = gen.breed();
    hueGd[0].reset(thisChrom); // Pass in new chromosome
    gen.insertNew(0, thisChrom, 0);

}


function breedCall() {
    // calls a find best method to find the  huegrid with the greatest fitness
    gen.arrayMethod();
    let nextGen = [];
    nextGen[0] = gen.findBest();

    //calls the breed function from genetics
    for (let i = 1; i < 9; i++) {
        nextGen[i] = gen.breed();
        hueGd[i].reset(nextGen[i]); // Pass in new chromosome
    }
    for (let i = 0; i < 9; i++) {
        gen.insertNew(i, nextGen[i], 0);
        hueGd[i].reset(nextGen[i]); // Pass in new chromosome
    }
}

function doMutate() {
    // Mutate and reset the HueGrid in the upper left corner of the canvas.
    let mutChrom = gen.mutation(hueGd[0].chrom);
    hueGd[0].reset(mutChrom);
    gen.insertNew(i, mutChrom, 0);
}

function doXover() {
    // Crossover and reset the HueGrid in the upper left corner of the canvas.
    let par2Off = Math.floor(random(1, 9)); // Get random second parent
    let xOverChrom = gen.crossOver(hueGd[0].chrom, hueGd[par2Off].chrom);
    hueGd[0].reset(xOverChrom);
    gen.insertNew(i, xOverChrom, 0);
}

function keyTyped() {
    //use keys to modify the fitness value of a huegrid
    let where = -1;
    print(key);
    for (let i = 0; i < 9; i++) {
        //print(i);
        if (hueGd[i].mouseOver()) {
            where = i;

        }
    }
    print(where);
    if (where >= 0) {
        if (key == "-") {
            print("minus");
            gen.fitBump(where, -1);

        } else if (key == "+") {
            print("plus");
            gen.fitBump(where, 1);
        }
    }

}
