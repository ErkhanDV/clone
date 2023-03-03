export function sendInvite(ws, msg) {
  msg.server = ws.socketName;

  this.connectBroadcast(ws, msg);
}
