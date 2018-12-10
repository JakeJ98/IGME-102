"use strict";
/* Project 3
 * Author: Jake Johnson
 * Description: Using two chromosomes, modify the 'genes' of the chromosomes to create changes and evolve the huegrid
 */

class Genetics {
    constructor(chromLeng, populSize) {
        this.bits = chromLeng;
        this.maxNum = 2 ** this.bits;
        this.popSize = populSize;
        this.chromsAra = [];
        this.fitAra = [];
        //        this.chromsAra.length = populSize;
        //        this.fitAra.length = populSize;
    }

    fitBump(indexNum, bumpVal) {
        // modify the fitness value of a chromosome
        this.fitAra[indexNum] += bumpVal;
        print(this.fitAra[indexNum]);

    }

    insertNew(indexNum, chromosome, fitVal) {
        //places a new chromosome into the position
        this.chromsAra[indexNum] = chromosome;
        this.fitAra[indexNum] = fitVal;
    }
    newChrom() {
        // creates a new chromosome
        let randchrom = Math.floor(random(this.maxNum));
        return randchrom;
    }

    mutation(chrom) {
        // flips one bit of a chromsome
        let randBit = Math.floor(random(0, this.bits));
        let mask = (1 << randBit);
        let mute = (chrom ^ mask);
        //  print(hex(chrom), randBit, hex(mask), hex(mute));
        return mute;
    }

    crossOver(oldC, newC) {
        //takes the left hand part of one chromosome and right hand part of another chromosome and combine them into a new chromsome
        let xPoint = Math.floor(random(1, this.bits - 1));
        let leftPar = (oldC >>> xPoint) << xPoint;
        let rightPar = (newC & ((2 ** xPoint) - 1));
        let crossed = (leftPar | rightPar);

        //   print(hex(oldC), hex(newC), xPoint, hex(leftPar), hex(rightPar), hex(crossed));
        return crossed;

    }

    select() {
        // compare the fitness of 2 randomly chosen chromsomes and return the one with the larger fitness value
        let randpopNum1 = Math.floor(random(this.popSize));
        let randpopNum2 = Math.floor(random(this.popSize));

        if (this.fitAra[randpopNum1] < this.fitAra[randpopNum2]) {
            return this.chromsAra[randpopNum2];
        } else {
            return this.chromsAra[randpopNum1];
        }
    }
    breed() {
        // takes two random parents based on their fitness and create a child that will be the first in a new breed of chromosome
        let parentOne = gen.select();
        // print(parentOne);
        let parentTwo = gen.select();
        //print(parentTwo);
        let child = gen.crossOver(parentOne, parentTwo);
        //print(child);
        let mutChild = gen.mutation(child);
        // print(mutChild);
        return mutChild;

    }
    findBest() {
        //finds the huegrid with the highest fitness
        let whereMax = 0;
        for (let i = 1; i < this.fitAra.length; i++) {
            if (this.fitAra[whereMax] <= this.fitAra[i]) {
                whereMax = i;
            }
        }
        //print(whereMax, this.fitAra[whereMax]);
        return this.chromsAra[whereMax];

    }

}
