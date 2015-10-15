var Fighter = (function() {
  var battlefield = document.getElementById('battlefield');

  function _getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function _action(words) {
    var li = document.createElement('li');
    li.textContent = words;

    battlefield.appendChild(li);
    battlefield.scrollTop = battlefield.scrollHeight;
  }

  function Fighter(name, str, hp) {
    this.name = name || 'Bob';
    this.str = str || 5;
    this.hp = hp || 14;
    _action(this.name + ' (STR: ' + this.str + ', HP: ' + this.hp + ') has entered the battlefield.');
  }

  Fighter.prototype.battleCry = function(battleCry) {
    var opening, openings, description, descriptions;

    if (!battleCry) {
      openings = ['Fear me', 'Grab your ankles', 'Brace your shins'];
      opening = openings[_getRandomNum(0, openings.length - 1)];
      descriptions = ['Gassy', 'Incorrigible', 'Infallible', 'Smarty Pants'];
      description = descriptions[_getRandomNum(0, descriptions.length - 1)];
      battleCry = opening + ', for I am ' + this.name + ', the ' + description + '.';
    } 
    
    _action(this.name + ' says, "' + battleCry + '"');
  };

  Fighter.prototype.setHp = function(damageTaken) {
    var noise, noises;

    noises = ['Blargh', 'Crikey', 'Omgad', 'Blegh'];
    noise = noises[_getRandomNum(0, noises.length - 1)];

    this.hp = this.hp - damageTaken;

    if (this.hp <= 0) {
      _action(this.name + ' yells ,"' + noise + '! I am now dead."');
    } else {
      _action(this.name + ' takes a hit and has ' + this.hp + ' hp left.');
    }
  };

  Fighter.prototype.attack = function(fighter) {
    var damage = this.str;
    fighter.setHp(damage);
  };

  return Fighter;
})();

var bob = new Fighter();
bob.battleCry();

var linda = new Fighter('Linda', 4, 16);
linda.battleCry();

var buttonContainer = document.querySelector('.buttons');
buttonContainer.addEventListener('click', function(event) {
  var button, data, receiver;

  button = event.target;
  data = button.dataset;

  if (data.action === 'battlecry') {
    window[data.fighter].battleCry();
  } else if (data.action === 'attack') {
    receiver = (data.fighter === 'bob') ? linda : bob;
    window[data.fighter].attack(receiver);
  }
});