(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

Game = function(canvas, fps) {
	var self = this;
	
	this.canvas = canvas;
	this.fps = fps;
	
	this.load = function(callback) {
		this.canvas.attr("height", $(window).height());
		this.canvas.attr("width", $(window).width());
		this.width = $(window).width();
		this.height = $(window).height();
		this.ctx = this.canvas[0].getContext("2d");
		this.ticks = 0;
		this.bgimg = new Image;
		this.bgimg.src = "res/SplashScreenImage.jpg";
		this.bgimg.onload = function(){ callback(); };
	};
	this.start = function()	{
		requestAnimationFrame(self.tick);
	};
	
	this.tick = function() {
		self.render();
		self.ticks++;
	};
	this.render = function() {
		self.ctx.fillStyle = '#000000';
		self.ctx.fillRect(0, 0, self.width, self.height);
		self.ctx.drawImage(self.bgimg, 0, 0, self.width, self.height);
		var fa = 4;
		for(var i=0; i<self.height/fa; i++)
		{
			self.ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
			self.ctx.fillRect(((Math.sin(self.ticks/(i+1))+1)/2)*(self.width-fa), i*fa, fa, fa);
		}
		for(var i=0; i<self.height/fa; i++)
		{
			self.ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
			self.ctx.fillRect(self.width-(((Math.sin(self.ticks/(i+1))+1)/2)*(self.width-fa)), self.height-(i*fa), fa, fa);
		}
		requestAnimationFrame(self.tick);
	};
	
	function rndColor() {
		return Math.round(Math.random() * (255 - 100) + 255);
	}
	
	this.touch = function(x, y)
	{
		//alert(x+"|"+y);
	};
	
	$("html").alltouch({
		onDown: function(ex, ey){
		}, 
		onMove: function(ex, ey){
		}, 
		onUp: function(ex, ey){
			self.touch(ex, ey);
		}
	});	
	
};