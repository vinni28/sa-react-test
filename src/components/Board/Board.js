import React from 'react';
import { v4 as uuid } from 'uuid';

import { useBoard } from './useBoard';
import './board.css';

const Board = () => {
    const { board } = useBoard();

    return (
        <table>
            <tbody>
            { board.map((row) => {
                return (
                    <tr key={uuid()}>
                        { row.map((cell) => {
                           return (
                               <td key={uuid()} style={{ backgroundColor: cell && 'black' }} />
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
