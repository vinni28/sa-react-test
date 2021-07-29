import { copyArray } from '../array';
import type { TwoDArray } from '../types';

describe('Array tests', () => {
    it('Copy 2 dimensional array', () => {
        // Arrange
        const array: TwoDArray = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];

        // Act
        const result: TwoDArray = copyArray(array);

        // Assert
        expect(JSON.stringify(array)).toEqual(JSON.stringify(result));
        expect(array === result).toBeFalsy();
    });
});
