import React from 'react';
import { v4 as uuid } from 'uuid';

import { useBoard } from './useBoard';
import './board.css';

const Board = () => {
    const { board } = useBoard();

    return (
        <table>
            <tbody>
            { board.map((row, i) => {
                return (
                    <tr key={uuid()}>
                        { row.map((cell, j) => {
                           return (
                               <td key={`${i}.${j}`} style={{ backgroundColor: cell && 'black' }} />
                           )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
}

export default Board;
