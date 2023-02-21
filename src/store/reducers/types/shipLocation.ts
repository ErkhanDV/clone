export interface IPlayerState {
  ships: IShip[];
  misses: number[];
}

export interface IGameShips {
  user: IPlayerState;
  rival: IPlayerState;
}

interface IPerson {
  person: keyof IGameShips;
}

export interface IAddShip extends IPerson {
  ship: IShip;
}

export interface IPersonState extends IPerson {
  state: IPlayerState;
}

export interface IShoot extends IPerson {
  cell: number;
}

export interface IRandomState extends IPerson {
  ships?: number[];
}

export interface IShip {
  shipLocation: number[];
  decks: number;
  occupiedCells: number[];
  woundedCells: number[];
}
