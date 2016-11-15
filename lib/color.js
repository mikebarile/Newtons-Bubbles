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
      return ("#" + this.weighColors(user, bubble, userColor.red, bubColor.red) +
        this.weighColors(user, bubble, userColor.green, bubColor.green) +
        this.weighColors(user, bubble, userColor.blue, bubColor.blue));
    }
  }

  static weighColors(b1, b2, c1, c2) {
    let m1 = Math.PI * Math.pow(b1.radius,2);
    let m2 = Math.PI * Math.pow(b2.radius,2);

    return Math.abs(Math.floor((c1*m1 + c2*m2) / (m1 + m2))).toString(16);
  }
}

module.exports = Color;
