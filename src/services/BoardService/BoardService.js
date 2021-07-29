// @flow

import { copyArray } from '../../utils/array';

import {
    minAliveNeighboursCount,
    maxAliveNeighboursCount,
    reproductionNeighboursCount,
    boardDefaultSize,
} from './constants';
import type { BoardArray, BoardServiceParams } from './types';

export class BoardService {
    size: number;
    board: BoardArray;
    prevBoard: BoardArray;

    constructor({ size, data = [] }: BoardServiceParams = {}) {
        if (data.length) {
            this.size = data.length;
            this.board = copyArray(data);
        } else {
            this.size = size || boardDefaultSize;
            this.initBoard();
        }
    }

    initBoard(): void {
        this.board = [...Array(this.size)].map(() => Array(this.size).fill(0));
    }

    setRandomCells(): void {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.board[i][j] = +(Math.random() < 0.5);
            }
        }
    }

    calculateNextTick(): void {
        this.prevBoard = copyArray(this.board);

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const neighboursCount: number = this.countCellNeighbors(this.prevBoard, i, j);
                const cell: number = this.board[i][j];
                this.board[i][j] = this.getCellState(neighboursCount, cell);
            }
        }
    }

    getCellState(aliveNeighbours: number, cell: number): number {
        if (cell) {
            return (cell && (aliveNeighbours < minAliveNeighboursCount || aliveNeighbours > maxAliveNeighboursCount))
                ? 0
                : cell;
        } else {
            return aliveNeighbours === reproductionNeighboursCount
                ? 1
                : cell;
        }
    }

    countCellNeighbors(board: BoardArray, x: number, y: number): number {
        const prevRow: Array<number>  = board[x - 1] || [];
        const nextRow: Array<number> = board[x + 1] || [];

        return [
            prevRow[y - 1], prevRow[y], prevRow[y + 1],
            board[x][y - 1], board[x][y + 1],
            nextRow[y - 1], nextRow[y], nextRow[y + 1]
        ].reduce((result, currentVal) => {
            result += currentVal || 0;
            return result;
        }, 0);
    }
}
