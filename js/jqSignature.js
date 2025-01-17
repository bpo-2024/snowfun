/*! jq-signature.min.js, v2.0.0, minified 2017-02-12 */ !(function(a, b, c) {
	"use strict";
	function d(a, b) {
		(this.element = a),
			(this.$element = c(this.element)),
			(this.canvas = !1),
			(this.$canvas = !1),
			(this.ctx = !1),
			(this.drawing = !1),
			(this.currentPos = { x: 0, y: 0 }),
			(this.lastPos = this.currentPos),
			(this._data = this.$element.data()),
			(this.settings = c.extend({}, f, b, this._data)),
			this.init();
	}
	a.requestAnimFrame = (function(b) {
		return (
			a.requestAnimationFrame ||
			a.webkitRequestAnimationFrame ||
			a.mozRequestAnimationFrame ||
			a.oRequestAnimationFrame ||
			a.msRequestAnimaitonFrame ||
			function(b) {
				a.setTimeout(b, 1e3 / 60);
			}
		);
	})();
	var e = "jqSignature",
		f = {
			lineColor: "#222222",
			lineWidth: 1,
			border: "1px dashed #AAAAAA",
			background: "#FFFFFF",
			width: 300,
			height: 100,
			autoFit: !1,
		},
		g = "<canvas></canvas>",
		h = 0;
	(d.prototype = {
		init: function() {
			(this.id = "jq-signature-canvas-" + ++h),
				(this.$canvas = c(g).appendTo(this.$element)),
				this.$canvas.attr({
					width: this.settings.width,
					height: this.settings.height,
				}),
				this.$canvas.css({
					boxSizing: "border-box",
					width: this.settings.width + "px",
					height: this.settings.height + "px",
					border: this.settings.border,
					background: this.settings.background,
					cursor: "crosshair",
				}),
				this.$canvas.attr("id", this.id),
				this.settings.autoFit === !0 && this._resizeCanvas(),
				(this.canvas = this.$canvas[0]),
				this._resetCanvas(),
				this.$canvas.on(
					"mousedown touchstart",
					c.proxy(this._downHandler, this)
				),
				this.$canvas.on(
					"mousemove touchmove",
					c.proxy(this._moveHandler, this)
				),
				this.$canvas.on("mouseup touchend", c.proxy(this._upHandler, this));
			var b = this;
			!(function c() {
				a.requestAnimFrame(c), b._renderCanvas();
			})();
		},
		clearCanvas: function() {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
				this._resetCanvas();
		},
		getDataURL: function() {
			return this.canvas.toDataURL();
		},
		_downHandler: function(a) {
			(this.drawing = !0),
				(this.lastPos = this.currentPos = this._getPosition(a)),
				c("body").css("overflow", "hidden"),
				a.preventDefault();
		},
		_moveHandler: function(a) {
			(this.currentPos = this._getPosition(a)), a.preventDefault();
		},
		_upHandler: function(a) {
			this.drawing = !1;
			var b = c.Event("jq.signature.changed");
			this.$element.trigger(b),
				c("body").css("overflow", "auto"),
				a.preventDefault();
		},
		_getPosition: function(a) {
			var b, c, d;
			return (
				(d = this.canvas.getBoundingClientRect()),
				a.originalEvent && (a = a.originalEvent),
				a.type.indexOf("touch") !== -1
					? ((b = a.touches[0].clientX - d.left),
					  (c = a.touches[0].clientY - d.top))
					: ((b = a.clientX - d.left), (c = a.clientY - d.top)),
				{ x: b, y: c }
			);
		},
		_renderCanvas: function() {
			this.drawing &&
				(this.ctx.beginPath(),
				this.ctx.moveTo(this.lastPos.x, this.lastPos.y),
				this.ctx.lineTo(this.currentPos.x, this.currentPos.y),
				this.ctx.stroke(),
				(this.lastPos = this.currentPos));
		},
		_resetCanvas: function() {
			(this.ctx = this.canvas.getContext("2d")),
				(this.ctx.strokeStyle = this.settings.lineColor),
				(this.ctx.lineWidth = this.settings.lineWidth);
		},
		_resizeCanvas: function() {
			var a = this.$element.outerWidth();
			this.$canvas.attr("width", a), this.$canvas.css("width", a + "px");
		},
	}),
		(c.fn[e] = function(a) {
			var b = arguments;
			if (void 0 === a || "object" == typeof a)
				return this.each(function() {
					c.data(this, "plugin_" + e) ||
						c.data(this, "plugin_" + e, new d(this, a));
				});
			if ("string" == typeof a && "_" !== a[0] && "init" !== a) {
				var f;
				return (
					this.each(function() {
						var g = c.data(this, "plugin_" + e);
						g instanceof d &&
							"function" == typeof g[a] &&
							(f = g[a].apply(g, Array.prototype.slice.call(b, 1))),
							"destroy" === a && c.data(this, "plugin_" + e, null);
					}),
					void 0 !== f ? f : this
				);
			}
		});
})(window, document, jQuery);
