class Color {
  static randomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  static parseHexColor(c) {
    var j = {};

    j.red = parseInt(c.slice(1,3), 16);
    j.green = parseInt(c.slice(3,5), 16);
    j.blue = parseInt(c.slice(5,7), 16);

    return j;
  }

  static colorDifference(user, bubble) {

    let userColor = this.parseHexColor(user.color);
    let bubColor = this.parseHexColor(bubble.color);

    if(typeof(userColor) != 'undefined' && typeof(bubColor) != 'undefined') {
      return ("#" + Math.abs(userColor.red - bubColor.red).toString(16) +
        Math.abs(userColor.green - bubColor.green).toString(16) +
        Math.abs(userColor.blue - bubColor.blue).toString(16));
    }
  }

  static weighColors(m1, m2, c1, c2) {

  }
}

module.exports = Color;
