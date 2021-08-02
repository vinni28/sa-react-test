// @flow

import { useState, useEffect } from 'react';
import cloneDeep from 'lodash.clonedeep';

import { BoardService } from '../../services/BoardService/BoardService';
import { tickInterval } from './constants';
import type { BoardArray } from '../../services/BoardService/types';

export const useBoard: () => { board: BoardArray } = () => {
    const [ board, setBoard ] = useState<BoardArray>([]);

    useEffect((): void => {
        const boardInstance: BoardService = new BoardService();
        boardInstance.setRandomCells();

        setBoard(cloneDeep(boardInstance.board));

        const timer: IntervalID = setInterval(() => {
            setBoard(boardInstance.calculateNextTick())
        }, tickInterval);

        return () => clearInterval(timer);
    }, []);

    return {
        board
    }
}
