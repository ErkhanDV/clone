export interface ISetShip {
  decks: number | null;
  isHorizontal: boolean;
}

export interface IShipDnD {
  shipDnD: ISetShip;
  wasDropped: boolean;
}