import { getRandomNum } from './getRandomNum';

export const getShipOrientation = () => !(getRandomNum(0, 1) === 1);
