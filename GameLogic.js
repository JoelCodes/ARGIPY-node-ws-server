function betterRandom(x){
  return Math.floor(Math.random() * x);
}

class ARGIPYGameLogic {
  constructor(width, height){
    this.gridsize = {width, height};
    this.players = {};
    this.treasures = [{x: 10, y: 10}];
  }
  addPlayer(name){
    this.players[name] = {
      name,
      money: 0,
      pos: {x: betterRandom(this.gridsize.width), y: betterRandom(this.gridsize.height)}
    }
  }
  removePlayer(name){
    delete this.players[name];
  }
  movePlayer(name, movement){
    const player = this.players[name];
    if(!player) return;
    console.log('Trying to move', player, movement);

    switch(movement){
      case 'down': {
        player.pos.y = Math.min(this.gridsize.height, player.pos.y + 1);
        break;
      }
      case 'up':{
        player.pos.y = Math.max(0, player.pos.y - 1);
        break;
      } 
      case 'right': {
        player.pos.x = Math.min(this.gridsize.width, player.pos.x + 1);
        break;
      }
      case 'left': {
        player.pos.x = Math.max(0, player.pos.x - 1);
        break;
      }
    }
    for(const treasure of this.treasures){
      console.log(treasure);
      if(treasure.x === player.pos.x && treasure.y === player.pos.y){
        console.log('Found Treasure!', treasure);
        player.money += 1;
        this.treasures = [...this.treasures.filter(t => t !== treasure), {x: betterRandom(this.gridsize.width), y: betterRandom(this.gridsize.height)}];
        return;
      }
    }
  }
  forPlayer(me){
    const {gridsize, players, treasures} = this;
    return JSON.stringify({gridsize, players, treasures, me});
  }
  update(){
    
  }
}

module.exports = ARGIPYGameLogic;