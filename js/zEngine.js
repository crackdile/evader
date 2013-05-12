
ze = {};
(function (ze) {
  // Objects
  window.animId = null;
  ze.init = function (func) {
    var app = new ze.App();
    func(app);
    app.draw();
  }

  ze.getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

})(ze);

// Vector
(function () {
  function Vec() {
    this.Vec.apply(this, arguments);
  };
  ze.Vec = Vec;

  Vec.prototype.Vec = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
})();

// Shape
(function () {
  function Shape() { this.Shape.apply(this, arguments); }; ze.Shape = Shape;

  Shape.prototype.Shape = function () {
    this.style = {
      stroke: '',
      fill: ''
    }
  }

  Shape.prototype.draw = function () {}

  Shape.prototype.setStrokeStyle = function (style) {
    this.style.stroke = style;
    return this;
  }

  Shape.prototype.setFillStyle = function (style) {
    this.style.fill = style;
    return this;
  }
})();

// Line
(function () {
  function Line() { this.Line.apply(this,arguments) }; 
  ze.Line = Line;
  Line.prototype = new ze.Shape();

  Line.prototype.Line = function (x1, y1, x2, y2) {
    this.pos1 = new ze.Vec(x1, y1);
    this.pos2 = new ze.Vec(x2, y2);
  }

  Line.prototype.draw = function (ctx) {
    ctx.strokeStyle = this.style.stroke;
    ctx.beginPath();
    ctx.moveTo(this.pos1.x, this.pos1.y);
    ctx.lineTo(this.pos2.x, this.pos2.y);
    ctx.stroke();
  }
})();

// Rect
(function () {
  function Rect(x, y, w, h) {
    this.Rect.apply(this, arguments);
  }
  ze.Rect = Rect;
  Rect.prototype = new ze.Shape;

  Rect.prototype.Rect = function (x, y, w, h) {
    this.pos = new ze.Vec(x,y);
    this.width = w;
    this.height = h;
  }

  Rect.prototype.draw = function(ctx) {
    //console.log('rect draw');
    ctx.fillStyle = this.style.fill;
    //console.log(this.pos.x, this.pos.y, this.width, this.height);
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
})();


(function () {
  function App() {
    this.App.apply(this, arguments);
  }
  ze.App = App;

  App.prototype.App = function () {
    this.canvas = document.getElementById('c');
    this.ctx = this.canvas.getContext('2d');
    this.objs = [];
    this.userLoop = null;
  }

  App.prototype.addObj = function (obj) {
    this.objs.push(obj);
    //console.log('add', this.objs);
  }

  App.prototype.draw = function() {
    if (this.userLoop) {
      window.animId = requestAnimationFrame(App.prototype.draw.bind(this));
      this.userLoop();
      //console.log('enter loop');
    }
    //console.log('draw');

    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    for (var i = 0; i < this.objs.length; i++) {
      this.objs[i].draw(this.ctx);
    }
  }

  App.prototype.setLoop = function (func) {
    this.userLoop = func;
    this.draw();
  }

  App.prototype.stop = function () {
    this.userLoop = null;
  }
})();
