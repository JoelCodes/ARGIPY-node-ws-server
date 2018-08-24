const WebSocket = require('ws');
const ARGIPYGameLogic = require('./GameLogic');
const wss = new WebSocket.Server({ port: 8080 });
const consonants = 'qwrtypsdfghjklzxcvbnm\''
const vowels = 'eyuioa';

function makeName(numPairs = 3, agg = ''){
  if(numPairs <= 0) return agg;
  return makeName(numPairs - 1, agg + consonants[Math.floor(Math.random() * consonants.length)] + vowels[Math.floor(Math.random() * vowels.length)]);
}

function broadcastGame(){
  for(const client of wss.clients){
    if(client.readyState === WebSocket.OPEN){
      client.send(game.forPlayer(client.name));
    }
  }
}


const game = new ARGIPYGameLogic(50, 50);

setInterval(() => {
  game.update()
  broadcastGame();
}, 500);

wss.on('connection', function connection(ws) {
  const name = makeName();
  ws.name = name;
  game.addPlayer(name);
  broadcastGame();
  ws.on('message', function incoming(message) {
    const {type, data} = JSON.parse(message);
    console.log('received:', JSON.parse(message));
    if(type === 'simple-movement'){
      game.movePlayer(name, data);
      broadcastGame();
    }
  });
  ws.on('close', () => {
    game.removePlayer(name);
    broadcastGame();
  })
});