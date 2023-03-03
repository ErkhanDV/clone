// export const CLONE_SERVER = 'http://localhost:5000/api';

// export const SOCKET = 'ws://localhost:5000/game';

export const CLONE_SERVER = 'https://battle-ship.up.railway.app/api';

export const SOCKET = 'wss://battle-ship.up.railway.app/game';

export enum SOCKETMETHOD {
  connect = 'connection',
  disconnect = 'disconnect',
  shoot = 'shoot',
  gameover = 'gameover',
  ready = 'ready',
  exit = 'exit',
  chat = 'chat',
  mailing = 'mailing',
  setName = 'setsocketname',
  invite = 'invite',
  online = 'online',
}

export enum STATUS {
  ok = 200,
  created = 201,
  notFound = 404,
  serverError = 500,
  unAuthorized = 401,
  forbidden = 403,
}
