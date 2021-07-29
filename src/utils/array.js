import type { TwoDArray } from './types';

export const copyArray = (array: TwoDArray): TwoDArray => {
    return array.map(function(arr) {
        return arr.slice();
    });
}
