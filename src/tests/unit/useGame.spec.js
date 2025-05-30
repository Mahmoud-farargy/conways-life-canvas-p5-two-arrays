import { describe, beforeEach, expect, it } from "vitest";
import { useGame } from "@/composables";

describe("Test useGame.ts" , ()=> {
    let game;
    beforeEach(() => {
        const customUseGame = () => {
            const game = useGame();
            game.rows.value = 3;
            game.cols.value = 3;
            game.grid.value = [
                [false, false, false],
                [true, true, true],
                [false, false, false],
            ];
            return game;
        };

        game = customUseGame();
    })
    it("test the calcNextGeneration method", () => {
        //- - -      - + - 
        //+ + +  =>  - + -
        //- - -      - + -
        game.calcNextGeneration();
        const newPattern = [
            [false, true, false],
            [false, true, false],
            [false, true, false]
        ]
      
        expect(game.grid.value).toEqual(newPattern);
    });
    it("test the countNeighbours method", () => {
        //- x - 
        //+ + +
        //- - -
        const count = game.countNeighbours(0,1);

        expect(count).toBe(3);
    });

    it("test the handleCellClicking method", () => {
        //- - -      - - -      - - - 
        //+ + +  =>  + - +  =>  + + +
        //- - -      - - -      - - -
        expect(game.grid.value[1][1]).toBe(true);

        game.handleCellClicking(1, 1);
        expect(game.grid.value[1][1]).toBe(false);

        game.handleCellClicking(1, 1);
        expect(game.grid.value[1][1]).toBe(true);
    });
});