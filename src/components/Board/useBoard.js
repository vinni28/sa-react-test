// @flow

import { useState, useEffect } from 'react';

import { BoardService } from '../../services/BoardService/BoardService';
import { copyArray } from "../../utils/array";
import { tickInterval } from './constants';
import type { BoardArray } from '../../services/BoardService/types';

export const useBoard: () => { board: BoardArray } = () => {
    const boardInstance: BoardService = new BoardService();
    const [ board, setBoard ] = useState<BoardArray>([]);

    useEffect((): void => {
        boardInstance.setRandomCells();
        setBoard(copyArray(boardInstance.board))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect((): () => void => {
        const timer: IntervalID = setInterval(() => {
            boardInstance.calculateNextTick();
            setBoard(copyArray(boardInstance.board))
        }, tickInterval);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        board
    }
}
