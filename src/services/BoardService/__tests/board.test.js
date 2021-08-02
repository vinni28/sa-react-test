import { BoardService } from '../BoardService';
import { boardDefaultSize } from '../constants'
import type { BoardArray } from '../types';


describe('Board controller tests', () => {
    it('Checks board initialization', () => {
        // Arrange
        const boardInstance: BoardService = new BoardService();

        // Act
        const result: BoardArray= boardInstance.board;

        // Assert
        expect(result.length).toEqual(boardDefaultSize);
    });

    it('Checks filling board with random values', () => {
        // Arrange
        const boardInstance: BoardService = new BoardService();

        // Act
        boardInstance.setRandomCells();
        const result = boardInstance.board;

        // Assert
        expect(result.length).toEqual(boardDefaultSize);
        expect(result.some(row => row.some(cell => cell === 1))).toBeTruthy();
    });

    it('Checks first tick result', () => {
        // Arrange
        const initialData: BoardArray = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];

        // Act
        const boardInstance: BoardService = new BoardService({
            data: initialData
        });
        boardInstance.calculateNextTick();
        const result: BoardArray = boardInstance.board;

        // Assert
        expect(JSON.stringify(result)).toEqual(JSON.stringify([
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0]
        ]));
    });

    it('Checks 3 ticks result', () => {
        // Arrange
        const initialData: BoardArray = [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];

        // Act
        const boardInstance: BoardService = new BoardService({
            data: initialData
        });
        boardInstance.calculateNextTick();
        boardInstance.calculateNextTick();
        boardInstance.calculateNextTick();
        const result: BoardArray = boardInstance.board;

        // Assert
        expect(JSON.stringify(result)).toEqual(JSON.stringify([
            [0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]));
    });

    it('Checks 4 ticks result', () => {
        // Arrange
        const initialData: BoardArray = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0]
        ];

        // Act
        const boardInstance: BoardService = new BoardService({
            data: initialData
        });
        boardInstance.calculateNextTick();
        boardInstance.calculateNextTick();
        boardInstance.calculateNextTick();
        boardInstance.calculateNextTick();
        const result: BoardArray = boardInstance.board;

        // Assert
        expect(JSON.stringify(result)).toEqual(JSON.stringify([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1],
            [0, 0, 1, 1, 1]
        ]));
    });
});
