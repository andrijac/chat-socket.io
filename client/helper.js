var h = (function(){
	"use strict";
	
	var keys = {
		Backspace: 8,
		Tab: 9,
		Enter: 13,
		Shift: 16,
		Ctrl: 17,
		Alt: 18,
		Pause: 19,
		Capslock: 20,
		Esc: 27,
		PageUp: 33,
		PageDown: 34,
		End: 35,
		Home: 36,
		LeftArrow: 37,
		UpArrow: 38,
		RightArrow: 39,
		DownArrow: 40,
		Insert: 45,
		Delete: 46,
		Zero: 48,
		One: 49,
		Two: 50,
		Three: 51,
		Four: 52,
		Five: 53,
		Six: 54,
		Seven: 55,
		Eight: 56,
		Nine: 57,
		a: 65,
		b: 66,
		c: 67,
		d: 68,
		e: 69,
		f: 70,
		g: 71,
		h: 72,
		i: 73,
		j: 74,
		k: 75,
		l: 76,
		m: 77,
		n: 78,
		o: 79,
		p: 80,
		q: 81,
		r: 82,
		s: 83,
		t: 84,
		u: 85,
		v: 86,
		w: 87,
		x: 88,
		y: 89,
		z: 90,
		Zero_numpad: 96,
		One_numpad: 97,
		Two_numpad: 98,
		Three_numpad: 99,
		Four_numpad: 100,
		Five_numpad: 101,
		Six_numpad: 102,
		Seven_numpad: 103,
		Eight_numpad: 104,
		Nine_numpad: 105,
		Star: 106,
		Plus: 107,
		Minus: 109,
		Dot: 110,
		Divide: 111,
		F1: 112,
		F2: 113,
		F3: 114,
		F4: 115,
		F5: 116,
		F6: 117,
		F7: 118,
		F8: 119,
		F9: 120,
		F10: 121,
		F11: 122,
		F12: 123,
		Equals: 187,
		Coma: 188,
		Slash: 191,
		Backslash: 220
	};

	// "A cross-browser implementation of addEventListener/AttachEvent without external dependencies"
	// https://gist.github.com/eduardocereto/955642
	function addEventListener(obj, evt, fnc) {
		// W3C model
		if (obj.addEventListener) {
			obj.addEventListener(evt, fnc, false);
			return true;
		} else if (obj.attachEvent) { // Microsoft model
			return obj.attachEvent('on' + evt, fnc);
		} else { // Browser don't support W3C or MSFT model, go on with traditional
			evt = 'on' + evt;
			if (typeof obj[evt] === 'function') {
				// Object already has a function on traditional
				// Let's wrap it with our own function inside another function
				fnc = (function (f1, f2) {
					return function () {
						f1.apply(this, arguments);
						f2.apply(this, arguments);
					}
				})(obj[evt], fnc);
			}
			obj[evt] = fnc;
			return true;
		}
		return false;
	};
	
	function getEl(id) {
		return document.getElementById(id);
	}
	
	return {
		addEventListener: addEventListener,
		getEl: getEl,
		keys: keys
	};
	
})();	

/*
	POLYFILLS
*/

/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Compatibility
*/
if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, '');
	};
}

/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill
*/
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function (fun /*, thisArg */) {
		"use strict";

		if (this === void 0 || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function")
			throw new TypeError();

		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t)
				fun.call(thisArg, t[i], i, t);
		}
	};
}