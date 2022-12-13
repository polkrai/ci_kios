/*
Product Name: dhtmlxWindows 
Version: 5.1.0 
Edition: Standard 
License: content of this file is covered by DHTMLX Commercial or enterpri. Usage outside GPL terms is prohibited. To obtain Commercial or Enterprise license contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
 */

if (typeof (window.dhx) == "undefined") {
	window.dhx = window.dhx4 = {
		version : "5.1.0",
		skin : null,
		skinDetect : function(a) {
			var b = Math.floor(dhx4.readFromCss(a + "_skin_detect") / 10) * 10;
			return {
				10 : "dhx_skyblue",
				20 : "dhx_web",
				30 : "dhx_terrace",
				40 : "material"
			}[b] || null
		},
		readFromCss : function(c, e, g) {
			var b = document.createElement("DIV");
			b.className = c;
			if (document.body.firstChild != null) {
				document.body.insertBefore(b, document.body.firstChild)
			} else {
				document.body.appendChild(b)
			}
			if (typeof (g) == "string") {
				b.innerHTML = g
			}
			var a = b[e || "offsetWidth"];
			b.parentNode.removeChild(b);
			b = null;
			return a
		},
		lastId : 1,
		newId : function() {
			return this.lastId++
		},
		zim : {
			data : {},
			step : 5,
			first : function() {
				return 100
			},
			last : function() {
				var c = this.first();
				for ( var b in this.data) {
					c = Math.max(c, this.data[b])
				}
				return c
			},
			reserve : function(a) {
				this.data[a] = this.last() + this.step;
				return this.data[a]
			},
			clear : function(a) {
				if (this.data[a] != null) {
					this.data[a] = null;
					delete this.data[a]
				}
			}
		},
		s2b : function(a) {
			if (typeof (a) == "string") {
				a = a.toLowerCase()
			}
			return (a == true || a == 1 || a == "true" || a == "1"
					|| a == "yes" || a == "y" || a == "on")
		},
		s2j : function(s) {
			var obj = null;
			dhx4.temp = null;
			try {
				eval("dhx4.temp=" + s)
			} catch (e) {
				dhx4.temp = null
			}
			obj = dhx4.temp;
			dhx4.temp = null;
			return obj
		},
		absLeft : function(a) {
			if (typeof (a) == "string") {
				a = document.getElementById(a)
			}
			return this.getOffset(a).left
		},
		absTop : function(a) {
			if (typeof (a) == "string") {
				a = document.getElementById(a)
			}
			return this.getOffset(a).top
		},
		_aOfs : function(a) {
			var c = 0, b = 0;
			while (a) {
				c = c + parseInt(a.offsetTop);
				b = b + parseInt(a.offsetLeft);
				a = a.offsetParent
			}
			return {
				top : c,
				left : b
			}
		},
		_aOfsRect : function(e) {
			var i = e.getBoundingClientRect();
			var j = document.body;
			var b = document.documentElement;
			var a = window.pageYOffset || b.scrollTop || j.scrollTop;
			var g = window.pageXOffset || b.scrollLeft || j.scrollLeft;
			var h = b.clientTop || j.clientTop || 0;
			var k = b.clientLeft || j.clientLeft || 0;
			var l = i.top + a - h;
			var c = i.left + g - k;
			return {
				top : Math.round(l),
				left : Math.round(c)
			}
		},
		getOffset : function(a) {
			if (a.getBoundingClientRect) {
				return this._aOfsRect(a)
			} else {
				return this._aOfs(a)
			}
		},
		_isObj : function(a) {
			return (a != null && typeof (a) == "object" && typeof (a.length) == "undefined")
		},
		_copyObj : function(e) {
			if (this._isObj(e)) {
				var c = {};
				for ( var b in e) {
					if (typeof (e[b]) == "object" && e[b] != null) {
						c[b] = this._copyObj(e[b])
					} else {
						c[b] = e[b]
					}
				}
			} else {
				var c = [];
				for (var b = 0; b < e.length; b++) {
					if (typeof (e[b]) == "object" && e[b] != null) {
						c[b] = this._copyObj(e[b])
					} else {
						c[b] = e[b]
					}
				}
			}
			return c
		},
		screenDim : function() {
			var a = (navigator.userAgent.indexOf("MSIE") >= 0);
			var b = {};
			b.left = document.body.scrollLeft;
			b.right = b.left + (window.innerWidth || document.body.clientWidth);
			b.top = Math.max((a ? document.documentElement : document
					.getElementsByTagName("html")[0]).scrollTop,
					document.body.scrollTop);
			b.bottom = b.top
					+ (a ? Math.max(document.documentElement.clientHeight || 0,
							document.documentElement.offsetHeight || 0)
							: window.innerHeight);
			return b
		},
		selectTextRange : function(g, i, b) {
			g = (typeof (g) == "string" ? document.getElementById(g) : g);
			var a = g.value.length;
			i = Math.max(Math.min(i, a), 0);
			b = Math.min(b, a);
			if (g.setSelectionRange) {
				try {
					g.setSelectionRange(i, b)
				} catch (h) {
				}
			} else {
				if (g.createTextRange) {
					var c = g.createTextRange();
					c.moveStart("character", i);
					c.moveEnd("character", b - a);
					try {
						c.select()
					} catch (h) {
					}
				}
			}
		},
		transData : null,
		transDetect : function() {
			if (this.transData == null) {
				this.transData = {
					transProp : false,
					transEv : null
				};
				var c = {
					MozTransition : "transitionend",
					WebkitTransition : "webkitTransitionEnd",
					OTransition : "oTransitionEnd",
					msTransition : "transitionend",
					transition : "transitionend"
				};
				for ( var b in c) {
					if (this.transData.transProp == false
							&& document.documentElement.style[b] != null) {
						this.transData.transProp = b;
						this.transData.transEv = c[b]
					}
				}
				c = null
			}
			return this.transData
		},
		_xmlNodeValue : function(a) {
			var c = "";
			for (var b = 0; b < a.childNodes.length; b++) {
				c += (a.childNodes[b].nodeValue != null ? a.childNodes[b].nodeValue
						.toString().replace(/^[\n\r\s]{0,}/, "").replace(
								/[\n\r\s]{0,}$/, "")
						: "")
			}
			return c
		}
	};
	window.dhx4.isIE = (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent
			.indexOf("Trident") >= 0);
	window.dhx4.isIE6 = (window.XMLHttpRequest == null && navigator.userAgent
			.indexOf("MSIE") >= 0);
	window.dhx4.isIE7 = (navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent
			.indexOf("Trident") < 0);
	window.dhx4.isIE8 = (navigator.userAgent.indexOf("MSIE 8.0") >= 0 && navigator.userAgent
			.indexOf("Trident") >= 0);
	window.dhx4.isIE9 = (navigator.userAgent.indexOf("MSIE 9.0") >= 0 && navigator.userAgent
			.indexOf("Trident") >= 0);
	window.dhx4.isIE10 = (navigator.userAgent.indexOf("MSIE 10.0") >= 0
			&& navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled != true);
	window.dhx4.isIE11 = (navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled == true);
	window.dhx4.isEdge = (navigator.userAgent.indexOf("Edge") >= 0);
	window.dhx4.isOpera = (navigator.userAgent.indexOf("Opera") >= 0);
	window.dhx4.isChrome = (navigator.userAgent.indexOf("Chrome") >= 0)
			&& !window.dhx4.isEdge;
	window.dhx4.isKHTML = (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent
			.indexOf("Konqueror") >= 0)
			&& !window.dhx4.isEdge;
	window.dhx4.isFF = (navigator.userAgent.indexOf("Firefox") >= 0);
	window.dhx4.isIPad = (navigator.userAgent.search(/iPad/gi) >= 0);
	window.dhx4.dnd = {
		evs : {},
		p_en : ((window.dhx4.isIE || window.dhx4.isEdge) && (window.navigator.pointerEnabled || window.navigator.msPointerEnabled)),
		_mTouch : function(a) {
			return (window.dhx4.isIE10
					&& a.pointerType == a.MSPOINTER_TYPE_MOUSE
					|| window.dhx4.isIE11 && a.pointerType == "mouse" || window.dhx4.isEdge
					&& a.pointerType == "mouse")
		},
		_touchOn : function(a) {
			if (a == null) {
				a = document.body
			}
			a.style.touchAction = a.style.msTouchAction = "";
			a = null
		},
		_touchOff : function(a) {
			if (a == null) {
				a = document.body
			}
			a.style.touchAction = a.style.msTouchAction = "none";
			a = null
		}
	};
	if (window.navigator.pointerEnabled == true) {
		window.dhx4.dnd.evs = {
			start : "pointerdown",
			move : "pointermove",
			end : "pointerup"
		}
	} else {
		if (window.navigator.msPointerEnabled == true) {
			window.dhx4.dnd.evs = {
				start : "MSPointerDown",
				move : "MSPointerMove",
				end : "MSPointerUp"
			}
		} else {
			if (typeof (window.addEventListener) != "undefined") {
				window.dhx4.dnd.evs = {
					start : "touchstart",
					move : "touchmove",
					end : "touchend"
				}
			}
		}
	}
}
if (typeof (window.dhx4.template) == "undefined") {
	window.dhx4.trim = function(a) {
		return String(a).replace(/^\s{1,}/, "").replace(/\s{1,}$/, "")
	};
	window.dhx4.template = function(b, c, a) {
		return b.replace(/#([a-z0-9_-]{1,})(\|([^#]*))?#/gi, function() {
			var i = arguments[1];
			var h = window.dhx4.trim(arguments[3]);
			var j = null;
			var g = [ c[i] ];
			if (h.length > 0) {
				h = h.split(":");
				var e = [];
				for (var l = 0; l < h.length; l++) {
					if (l > 0 && e[e.length - 1].match(/\\$/) != null) {
						e[e.length - 1] = e[e.length - 1].replace(/\\$/, "")
								+ ":" + h[l]
					} else {
						e.push(h[l])
					}
				}
				j = e[0];
				for (var l = 1; l < e.length; l++) {
					g.push(e[l])
				}
			}
			if (typeof (j) == "string"
					&& typeof (window.dhx4.template[j]) == "function") {
				return window.dhx4.template[j].apply(window.dhx4.template, g)
			}
			if (i.length > 0 && typeof (c[i]) != "undefined") {
				if (a == true) {
					return window.dhx4.trim(c[i])
				}
				return String(c[i])
			}
			return ""
		})
	};
	window.dhx4.template.date = function(a, b) {
		if (a != null) {
			if (a instanceof Date) {
				return window.dhx4.date2str(a, b)
			} else {
				a = a.toString();
				if (a.match(/^\d*$/) != null) {
					return window.dhx4.date2str(new Date(parseInt(a)), b)
				}
				return a
			}
		}
		return ""
	};
	window.dhx4.template.maxlength = function(b, a) {
		return String(b).substr(0, a)
	};
	window.dhx4.template.number_format = function(e, g, c, a) {
		var b = window.dhx4.template._parseFmt(g, c, a);
		if (b == false) {
			return e
		}
		return window.dhx4.template._getFmtValue(e, b)
	};
	window.dhx4.template.lowercase = function(a) {
		if (typeof (a) == "undefined" || a == null) {
			a = ""
		}
		return String(a).toLowerCase()
	};
	window.dhx4.template.uppercase = function(a) {
		if (typeof (a) == "undefined" || a == null) {
			a = ""
		}
		return String(a).toUpperCase()
	};
	window.dhx4.template._parseFmt = function(i, c, a) {
		var e = i.match(/^([^\.\,0-9]*)([0\.\,]*)([^\.\,0-9]*)/);
		if (e == null || e.length != 4) {
			return false
		}
		var b = {
			i_len : false,
			i_sep : (typeof (c) == "string" ? c : ","),
			d_len : false,
			d_sep : (typeof (a) == "string" ? a : "."),
			s_bef : (typeof (e[1]) == "string" ? e[1] : ""),
			s_aft : (typeof (e[3]) == "string" ? e[3] : "")
		};
		var h = e[2].split(".");
		if (h[1] != null) {
			b.d_len = h[1].length
		}
		var g = h[0].split(",");
		if (g.length > 1) {
			b.i_len = g[g.length - 1].length
		}
		return b
	};
	window.dhx4.template._getFmtValue = function(value, fmt) {
		var r = String(value).match(/^(-)?([0-9]{1,})(\.([0-9]{1,}))?$/);
		if (r != null && r.length == 5) {
			var v0 = "";
			if (r[1] != null) {
				v0 += r[1]
			}
			v0 += fmt.s_bef;
			if (fmt.i_len !== false) {
				var i = 0;
				var v1 = "";
				for (var q = r[2].length - 1; q >= 0; q--) {
					v1 = "" + r[2].charAt(q) + v1;
					if (++i == fmt.i_len && q > 0) {
						v1 = fmt.i_sep + v1;
						i = 0
					}
				}
				v0 += v1
			} else {
				v0 += r[2]
			}
			if (fmt.d_len !== false) {
				if (r[4] == null) {
					r[4] = ""
				}
				while (r[4].length < fmt.d_len) {
					r[4] += "0"
				}
				eval("dhx4.temp = new RegExp(/\\d{" + fmt.d_len + "}/);");
				var t1 = (r[4]).match(dhx4.temp);
				if (t1 != null) {
					v0 += fmt.d_sep + t1
				}
				dhx4.temp = t1 = null
			}
			v0 += fmt.s_aft;
			return v0
		}
		return value
	}
}
if (typeof (window.dhx4.dateLang) == "undefined") {
	window.dhx4.dateLang = "en";
	window.dhx4.dateStrings = {
		en : {
			monthFullName : [ "January", "February", "March", "April", "May",
					"June", "July", "August", "September", "October",
					"November", "December" ],
			monthShortName : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
					"Aug", "Sep", "Oct", "Nov", "Dec" ],
			dayFullName : [ "Sunday", "Monday", "Tuesday", "Wednesday",
					"Thursday", "Friday", "Saturday" ],
			dayShortName : [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]
		}
	};
	window.dhx4.dateFormat = {
		en : "%Y-%m-%d"
	};
	window.dhx4.date2str = function(h, e, a) {
		if (e == null || typeof (e) == "undefined") {
			e = window.dhx4.dateFormat[window.dhx4.dateLang]
		}
		if (a == null || typeof (a) == "undefined") {
			a = window.dhx4.dateStrings[window.dhx4.dateLang]
		}
		if (h instanceof Date) {
			var g = function(i) {
				return (String(i).length == 1 ? "0" + String(i) : i)
			};
			var b = function(j) {
				switch (j) {
				case "%d":
					return g(h.getDate());
				case "%j":
					return h.getDate();
				case "%D":
					return a.dayShortName[h.getDay()];
				case "%l":
					return a.dayFullName[h.getDay()];
				case "%m":
					return g(h.getMonth() + 1);
				case "%n":
					return h.getMonth() + 1;
				case "%M":
					return a.monthShortName[h.getMonth()];
				case "%F":
					return a.monthFullName[h.getMonth()];
				case "%y":
					return g(h.getYear() % 100);
				case "%Y":
					return h.getFullYear();
				case "%g":
					return (h.getHours() + 11) % 12 + 1;
				case "%h":
					return g((h.getHours() + 11) % 12 + 1);
				case "%G":
					return h.getHours();
				case "%H":
					return g(h.getHours());
				case "%i":
					return g(h.getMinutes());
				case "%s":
					return g(h.getSeconds());
				case "%a":
					return (h.getHours() > 11 ? "pm" : "am");
				case "%A":
					return (h.getHours() > 11 ? "PM" : "AM");
				case "%%":
					return "%";
				case "%u":
					return h.getMilliseconds();
				case "%P":
					if (window.dhx4.temp_calendar != null
							&& window.dhx4.temp_calendar.tz != null) {
						return window.dhx4.temp_calendar.tz
					}
					var l = h.getTimezoneOffset();
					var k = Math.abs(Math.floor(l / 60));
					var i = Math.abs(l) - k * 60;
					return (l > 0 ? "-" : "+") + g(k) + ":" + g(i);
				default:
					return j
				}
			};
			var c = String(e || window.dhx4.dateFormat)
					.replace(/%[a-zA-Z]/g, b)
		}
		return (c || String(h))
	};
	window.dhx4.str2date = function(h, t, y) {
		if (t == null || typeof (t) == "undefined") {
			t = window.dhx4.dateFormat[window.dhx4.dateLang]
		}
		if (y == null || typeof (y) == "undefined") {
			y = window.dhx4.dateStrings[window.dhx4.dateLang]
		}
		t = t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\\:|]/g, "\\$&");
		var x = [];
		var l = [];
		t = t.replace(/%[a-z]/gi, function(e) {
			switch (e) {
			case "%d":
			case "%m":
			case "%y":
			case "%h":
			case "%H":
			case "%i":
			case "%s":
				l.push(e);
				return "(\\d{2})";
			case "%D":
			case "%l":
			case "%M":
			case "%F":
				l.push(e);
				return "([a-zéûä\u0430-\u044F\u0451]{1,})";
			case "%j":
			case "%n":
			case "%g":
			case "%G":
				l.push(e);
				return "(\\d{1,2})";
			case "%Y":
				l.push(e);
				return "(\\d{4})";
			case "%a":
				l.push(e);
				return "([a|p]m)";
			case "%A":
				l.push(e);
				return "([A|P]M)";
			case "%u":
				l.push(e);
				return "(\\d{1,6})";
			case "%P":
				l.push(e);
				return "([+-]\\d{1,2}:\\d{1,2})"
			}
			return e
		});
		var z = new RegExp(t, "i");
		var m = h.match(z);
		if (m == null || m.length - 1 != l.length) {
			return "Invalid Date"
		}
		for (var b = 1; b < m.length; b++) {
			x.push(m[b])
		}
		var c = {
			"%y" : 1,
			"%Y" : 1,
			"%n" : 2,
			"%m" : 2,
			"%M" : 2,
			"%F" : 2,
			"%d" : 3,
			"%j" : 3,
			"%a" : 4,
			"%A" : 4,
			"%H" : 5,
			"%G" : 5,
			"%h" : 5,
			"%g" : 5,
			"%i" : 6,
			"%s" : 7,
			"%u" : 7,
			"%P" : 7
		};
		var n = {};
		var j = {};
		for (var b = 0; b < l.length; b++) {
			if (typeof (c[l[b]]) != "undefined") {
				var g = c[l[b]];
				if (!n[g]) {
					n[g] = [];
					j[g] = []
				}
				n[g].push(x[b]);
				j[g].push(l[b])
			}
		}
		x = [];
		l = [];
		for (var b = 1; b <= 7; b++) {
			if (n[b] != null) {
				for (var s = 0; s < n[b].length; s++) {
					x.push(n[b][s]);
					l.push(j[b][s])
				}
			}
		}
		var a = new Date();
		a.setDate(1);
		a.setHours(0);
		a.setMinutes(0);
		a.setSeconds(0);
		a.setMilliseconds(0);
		var o = function(p, e) {
			for (var k = 0; k < e.length; k++) {
				if (e[k].toLowerCase() == p) {
					return k
				}
			}
			return -1
		};
		for (var b = 0; b < x.length; b++) {
			switch (l[b]) {
			case "%d":
			case "%j":
			case "%n":
			case "%m":
			case "%Y":
			case "%H":
			case "%G":
			case "%i":
			case "%s":
			case "%u":
				if (!isNaN(x[b])) {
					a[{
						"%d" : "setDate",
						"%j" : "setDate",
						"%n" : "setMonth",
						"%m" : "setMonth",
						"%Y" : "setFullYear",
						"%H" : "setHours",
						"%G" : "setHours",
						"%i" : "setMinutes",
						"%s" : "setSeconds",
						"%u" : "setMilliseconds"
					}[l[b]]](Number(x[b])
							+ (l[b] == "%m" || l[b] == "%n" ? -1 : 0))
				}
				break;
			case "%M":
			case "%F":
				var i = o(x[b].toLowerCase(), y[{
					"%M" : "monthShortName",
					"%F" : "monthFullName"
				}[l[b]]]);
				if (i >= 0) {
					a.setMonth(i)
				}
				break;
			case "%y":
				if (!isNaN(x[b])) {
					var u = Number(x[b]);
					a.setFullYear(u + (u > 50 ? 1900 : 2000))
				}
				break;
			case "%g":
			case "%h":
				if (!isNaN(x[b])) {
					var u = Number(x[b]);
					if (u <= 12 && u >= 0) {
						a.setHours(u
								+ (o("pm", x) >= 0 ? (u == 12 ? 0 : 12)
										: (u == 12 ? -12 : 0)))
					}
				}
				break;
			case "%P":
				if (window.dhx4.temp_calendar != null) {
					window.dhx4.temp_calendar.tz = x[b]
				}
				break
			}
		}
		return a
	}
}
if (typeof (window.dhx4.ajax) == "undefined") {
	window.dhx4.ajax = {
		cache : false,
		method : "get",
		parse : function(a) {
			if (typeof a !== "string") {
				return a
			}
			a = a.replace(/^[\s]+/, "");
			if (window.DOMParser && !dhx4.isIE) {
				var b = (new window.DOMParser()).parseFromString(a, "text/xml")
			} else {
				if (window.ActiveXObject !== window.undefined) {
					var b = new window.ActiveXObject("Microsoft.XMLDOM");
					b.async = "false";
					b.loadXML(a)
				}
			}
			return b
		},
		xmltop : function(a, g, c) {
			if (typeof g.status == "undefined" || g.status < 400) {
				xml = (!g.responseXML) ? dhx4.ajax.parse(g.responseText || g)
						: (g.responseXML || g);
				if (xml && xml.documentElement !== null) {
					try {
						if (!xml.getElementsByTagName("parsererror").length) {
							return xml.getElementsByTagName(a)[0]
						}
					} catch (b) {
					}
				}
			}
			if (c !== -1) {
				dhx4.callEvent("onLoadXMLError", [ "Incorrect XML",
						arguments[1], c ])
			}
			return document.createElement("DIV")
		},
		xpath : function(c, a) {
			if (!a.nodeName) {
				a = a.responseXML || a
			}
			if (dhx4.isIE) {
				try {
					return a.selectNodes(c) || []
				} catch (h) {
					return []
				}
			} else {
				var g = [];
				var i;
				var b = (a.ownerDocument || a).evaluate(c, a, null,
						XPathResult.ANY_TYPE, null);
				while (i = b.iterateNext()) {
					g.push(i)
				}
				return g
			}
		},
		query : function(a) {
			return dhx4.ajax._call((a.method || "GET"), a.url, a.data || "",
					(a.async || true), a.callback, null, a.headers)
		},
		get : function(a, b) {
			return this._call("GET", a, null, true, b)
		},
		getSync : function(a) {
			return this._call("GET", a, null, false)
		},
		put : function(b, a, c) {
			return this._call("PUT", b, a, true, c)
		},
		del : function(b, a, c) {
			return this._call("DELETE", b, a, true, c)
		},
		post : function(b, a, c) {
			if (arguments.length == 1) {
				a = ""
			} else {
				if (arguments.length == 2
						&& (typeof (a) == "function" || typeof (window[a]) == "function")) {
					c = a;
					a = ""
				} else {
					a = String(a)
				}
			}
			return this._call("POST", b, a, true, c)
		},
		postSync : function(b, a) {
			a = (a == null ? "" : String(a));
			return this._call("POST", b, a, false)
		},
		getLong : function(a, b) {
			this._call("GET", a, null, true, b, {
				url : a
			})
		},
		postLong : function(b, a, c) {
			if (arguments.length == 2
					&& (typeof (a) == "function" || typeof (window[a]))) {
				c = a;
				a = ""
			}
			this._call("POST", b, a, true, c, {
				url : b,
				postData : a
			})
		},
		_call : function(b, c, e, j, l, p, h) {
			if (typeof e === "object") {
				var i = [];
				for ( var m in e) {
					i.push(m + "=" + encodeURIComponent(e[m]))
				}
				e = i.join("&")
			}
			var g = dhx.promise.defer();
			var o = (window.XMLHttpRequest && !dhx4.isIE ? new XMLHttpRequest()
					: new ActiveXObject("Microsoft.XMLHTTP"));
			var k = (navigator.userAgent.match(/AppleWebKit/) != null
					&& navigator.userAgent.match(/Qt/) != null && navigator.userAgent
					.match(/Safari/) != null);
			if (j == true) {
				o.onreadystatechange = function() {
					if ((o.readyState == 4) || (k == true && o.readyState == 3)) {
						if (o.status != 200 || o.responseText == "") {
							g.reject(o);
							if (!dhx4.callEvent("onAjaxError", [ {
								xmlDoc : o,
								filePath : c,
								async : j
							} ])) {
								return
							}
						}
						window.setTimeout(function() {
							if (typeof (l) == "function") {
								try {
									l.apply(window, [ {
										xmlDoc : o,
										filePath : c,
										async : j
									} ])
								} catch (a) {
									g.reject(a)
								}
								g.resolve(o.responseText)
							}
							if (p != null) {
								if (typeof (p.postData) != "undefined") {
									dhx4.ajax.postLong(p.url, p.postData, l)
								} else {
									dhx4.ajax.getLong(p.url, l)
								}
							}
							l = null;
							o = null
						}, 1)
					}
				}
			}
			if (b == "GET") {
				c += this._dhxr(c)
			}
			o.open(b, c, j);
			if (h != null) {
				for ( var n in h) {
					o.setRequestHeader(n, h[n])
				}
			} else {
				if (b == "POST" || b == "PUT" || b == "DELETE") {
					o.setRequestHeader("Content-Type",
							"application/x-www-form-urlencoded")
				} else {
					if (b == "GET") {
						e = null
					}
				}
			}
			o.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			o.send(e);
			if (j != true) {
				if ((o.readyState == 4) || (k == true && o.readyState == 3)) {
					if (o.status != 200 || o.responseText == "") {
						dhx4.callEvent("onAjaxError", [ {
							xmlDoc : o,
							filePath : c,
							async : j
						} ])
					}
				}
			}
			g.xmlDoc = o;
			g.filePath = c;
			g.async = j;
			return g
		},
		_dhxr : function(a, b) {
			if (this.cache != true) {
				if (a.match(/^[\?\&]$/) == null) {
					a = (a.indexOf("?") >= 0 ? "&" : "?")
				}
				if (typeof (b) == "undefined") {
					b = true
				}
				return a + "dhxr" + new Date().getTime()
						+ (b == true ? "=1" : "")
			}
			return ""
		}
	}
}
if (typeof (window.dhx4._enableDataLoading) == "undefined") {
	window.dhx4._enableDataLoading = function(i, c, h, g, j) {
		if (j == "clear") {
			for ( var b in i._dhxdataload) {
				i._dhxdataload[b] = null;
				delete i._dhxdataload[b]
			}
			i._loadData = null;
			i._dhxdataload = null;
			i.load = null;
			i.loadStruct = null;
			i = null;
			return
		}
		i._dhxdataload = {
			initObj : c,
			xmlToJson : h,
			xmlRootTag : g,
			onBeforeXLS : null
		};
		i._loadData = function(p, q, r) {
			if (arguments.length == 2) {
				r = q;
				q = null
			}
			var o = null;
			if (arguments.length == 3) {
				r = arguments[2]
			}
			this.callEvent("onXLS", []);
			if (typeof (p) == "string") {
				var n = p.replace(/^\s{1,}/, "").replace(/\s{1,}$/, "");
				var v = new RegExp("^<" + this._dhxdataload.xmlRootTag);
				if (v.test(n.replace(/^<\?xml[^\?]*\?>\s*/, ""))) {
					o = dhx4.ajax.parse(p);
					if (o != null) {
						o = this[this._dhxdataload.xmlToJson]
								.apply(this, [ o ])
					}
				}
				if (o == null
						&& (n.match(/^[\s\S]*{[.\s\S]*}[\s\S]*$/) != null || n
								.match(/^[\s\S]*\[[.\s\S]*\][\s\S]*$/) != null)) {
					o = dhx4.s2j(n)
				}
				if (o == null) {
					var m = [];
					if (typeof (this._dhxdataload.onBeforeXLS) == "function") {
						var n = this._dhxdataload.onBeforeXLS
								.apply(this, [ p ]);
						if (n != null && typeof (n) == "object") {
							if (n.url != null) {
								p = n.url
							}
							if (n.params != null) {
								for ( var s in n.params) {
									m.push(s + "="
											+ encodeURIComponent(n.params[s]))
								}
							}
						}
					}
					var u = this;
					var l = function(a) {
						var k = null;
						if ((a.xmlDoc.getResponseHeader("Content-Type") || "")
								.search(/xml/gi) >= 0
								|| (a.xmlDoc.responseText
										.replace(/^\s{1,}/, "")).match(/^</) != null) {
							k = u[u._dhxdataload.xmlToJson].apply(u,
									[ a.xmlDoc.responseXML ])
						} else {
							k = dhx4.s2j(a.xmlDoc.responseText)
						}
						if (k != null) {
							u[u._dhxdataload.initObj].apply(u, [ k, p ])
						}
						u.callEvent("onXLE", []);
						if (r != null) {
							if (typeof (r) == "function") {
								r.apply(u, [])
							} else {
								if (typeof (window[r]) == "function") {
									window[r].apply(u, [])
								}
							}
						}
						l = r = null;
						k = a = u = null
					};
					m = m.join("&") + (typeof (q) == "string" ? "&" + q : "");
					if (dhx4.ajax.method == "post") {
						return dhx4.ajax.post(p, m, l)
					} else {
						if (dhx4.ajax.method == "get") {
							return dhx4.ajax.get(p
									+ (m.length > 0 ? (p.indexOf("?") > 0 ? "&"
											: "?")
											+ m : ""), l)
						}
					}
					return
				}
			} else {
				if (typeof (p.documentElement) == "object"
						|| (typeof (p.tagName) != "undefined"
								&& typeof (p.getElementsByTagName) != "undefined" && p
								.getElementsByTagName(this._dhxdataload.xmlRootTag).length > 0)) {
					o = this[this._dhxdataload.xmlToJson].apply(this, [ p ])
				} else {
					o = window.dhx4._copyObj(p)
				}
			}
			if (o != null) {
				this[this._dhxdataload.initObj].apply(this, [ o ])
			}
			this.callEvent("onXLE", []);
			if (r != null) {
				if (typeof (r) == "function") {
					r.apply(this, [])
				} else {
					if (typeof (window[r]) == "function") {
						window[r].apply(this, [])
					}
				}
				r = null
			}
		};
		if (j != null) {
			var e = {
				struct : "loadStruct",
				data : "load"
			};
			for ( var b in j) {
				if (j[b] == true) {
					i[e[b]] = function() {
						return this._loadData.apply(this, arguments)
					}
				}
			}
		}
		i = null
	}
}
if (typeof (window.dhx4._eventable) == "undefined") {
	window.dhx4._eventable = function(a, b) {
		if (b == "clear") {
			a.detachAllEvents();
			a.dhxevs = null;
			a.attachEvent = null;
			a.detachEvent = null;
			a.checkEvent = null;
			a.callEvent = null;
			a.detachAllEvents = null;
			a = null;
			return
		}
		a.dhxevs = {
			data : {}
		};
		a.attachEvent = function(c, g) {
			c = String(c).toLowerCase();
			if (!this.dhxevs.data[c]) {
				this.dhxevs.data[c] = {}
			}
			var e = window.dhx4.newId();
			this.dhxevs.data[c][e] = g;
			return e
		};
		a.detachEvent = function(h) {
			for ( var e in this.dhxevs.data) {
				var g = 0;
				for ( var c in this.dhxevs.data[e]) {
					if (c == h) {
						this.dhxevs.data[e][c] = null;
						delete this.dhxevs.data[e][c]
					} else {
						g++
					}
				}
				if (g == 0) {
					this.dhxevs.data[e] = null;
					delete this.dhxevs.data[e]
				}
			}
		};
		a.checkEvent = function(c) {
			c = String(c).toLowerCase();
			return (this.dhxevs.data[c] != null)
		};
		a.callEvent = function(e, h) {
			e = String(e).toLowerCase();
			if (this.dhxevs.data[e] == null) {
				return true
			}
			var g = true;
			for ( var c in this.dhxevs.data[e]) {
				g = this.dhxevs.data[e][c].apply(this, h) && g
			}
			return g
		};
		a.detachAllEvents = function() {
			for ( var e in this.dhxevs.data) {
				for ( var c in this.dhxevs.data[e]) {
					this.dhxevs.data[e][c] = null;
					delete this.dhxevs.data[e][c]
				}
				this.dhxevs.data[e] = null;
				delete this.dhxevs.data[e]
			}
		};
		a = null
	};
	dhx4._eventable(dhx4)
}
if (!window.dhtmlxValidation) {
	dhtmlxValidation = function() {
	};
	dhtmlxValidation.prototype = {
		isEmpty : function(a) {
			return a == ""
		},
		isNotEmpty : function(a) {
			return (a instanceof Array ? a.length > 0 : !a == "")
		},
		isValidBoolean : function(a) {
			return !!a.toString().match(/^(0|1|true|false)$/)
		},
		isValidEmail : function(a) {
			return !!a
					.toString()
					.match(
							/(^[a-z0-9]([0-9a-z\-_\.]*)@([0-9a-z_\-\.]*)([.][a-z]{3})$)|(^[a-z]([0-9a-z_\.\-]*)@([0-9a-z_\-\.]*)(\.[a-z]{2,5})$)/i)
		},
		isValidInteger : function(a) {
			return !!a.toString().match(/(^-?\d+$)/)
		},
		isValidNumeric : function(a) {
			return !!a.toString().match(
					/(^-?\d\d*[\.|,]\d*$)|(^-?\d\d*$)|(^-?[\.|,]\d\d*$)/)
		},
		isValidAplhaNumeric : function(a) {
			return !!a.toString().match(/^[_\-a-z0-9]+$/gi)
		},
		isValidDatetime : function(b) {
			var a = b.toString().match(
					/^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/);
			return a
					&& !!(a[1] <= 9999 && a[2] <= 12 && a[3] <= 31
							&& a[4] <= 59 && a[5] <= 59 && a[6] <= 59) || false
		},
		isValidDate : function(a) {
			var b = a.toString().match(/^(\d{4})-(\d{2})-(\d{2})$/);
			return b && !!(b[1] <= 9999 && b[2] <= 12 && b[3] <= 31) || false
		},
		isValidTime : function(b) {
			var a = b.toString().match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
			return a && !!(a[1] <= 24 && a[2] <= 59 && a[3] <= 59) || false
		},
		isValidIPv4 : function(a) {
			var b = a.toString().match(
					/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
			return b
					&& !!(b[1] <= 255 && b[2] <= 255 && b[3] <= 255 && b[4] <= 255)
					|| false
		},
		isValidCurrency : function(a) {
			return a.toString().match(/^\$?\s?\d+?([\.,\,]?\d+)?\s?\$?$/) && true || false
		},
		isValidSSN : function(a) {
			return a.toString().match(/^\d{3}\-?\d{2}\-?\d{4}$/) && true || false
		},
		isValidSIN : function(a) {
			return a.toString().match(/^\d{9}$/) && true || false
		}
	};
	dhtmlxValidation = new dhtmlxValidation()
}
if (typeof (window.dhtmlx) == "undefined") {
	window.dhtmlx = {
		extend : function(e, c) {
			for ( var g in c) {
				if (!e[g]) {
					e[g] = c[g]
				}
			}
			return e
		},
		extend_api : function(a, e, c) {
			var b = window[a];
			if (!b) {
				return
			}
			window[a] = function(i) {
				if (i && typeof i == "object" && !i.tagName) {
					var h = b.apply(this, (e._init ? e._init(i) : arguments));
					for ( var g in dhtmlx) {
						if (e[g]) {
							this[e[g]](dhtmlx[g])
						}
					}
					for ( var g in i) {
						if (e[g]) {
							this[e[g]](i[g])
						} else {
							if (g.indexOf("on") === 0) {
								this.attachEvent(g, i[g])
							}
						}
					}
				} else {
					var h = b.apply(this, arguments)
				}
				if (e._patch) {
					e._patch(this)
				}
				return h || this
			};
			window[a].prototype = b.prototype;
			if (c) {
				dhtmlx.extend(window[a].prototype, c)
			}
		},
		url : function(a) {
			if (a.indexOf("?") != -1) {
				return "&"
			} else {
				return "?"
			}
		}
	}
}
function dhtmlDragAndDropObject() {
	if (window.dhtmlDragAndDrop) {
		return window.dhtmlDragAndDrop
	}
	this.lastLanding = 0;
	this.dragNode = 0;
	this.dragStartNode = 0;
	this.dragStartObject = 0;
	this.tempDOMU = null;
	this.tempDOMM = null;
	this.waitDrag = 0;
	window.dhtmlDragAndDrop = this;
	return this
}
dhtmlDragAndDropObject.prototype.removeDraggableItem = function(a) {
	a.onmousedown = null;
	a.dragStarter = null;
	a.dragLanding = null
};
dhtmlDragAndDropObject.prototype.addDraggableItem = function(a, b) {
	a.onmousedown = this.preCreateDragCopy;
	a.dragStarter = b;
	this.addDragLanding(a, b)
};
dhtmlDragAndDropObject.prototype.addDragLanding = function(a, b) {
	a.dragLanding = b
};
dhtmlDragAndDropObject.prototype.preCreateDragCopy = function(a) {
	if ((a || window.event) && (a || event).button == 2) {
		return
	}
	if (window.dhtmlDragAndDrop.waitDrag) {
		window.dhtmlDragAndDrop.waitDrag = 0;
		document.body.onmouseup = window.dhtmlDragAndDrop.tempDOMU;
		document.body.onmousemove = window.dhtmlDragAndDrop.tempDOMM;
		return false
	}
	if (window.dhtmlDragAndDrop.dragNode) {
		window.dhtmlDragAndDrop.stopDrag(a)
	}
	window.dhtmlDragAndDrop.waitDrag = 1;
	window.dhtmlDragAndDrop.tempDOMU = document.body.onmouseup;
	window.dhtmlDragAndDrop.tempDOMM = document.body.onmousemove;
	window.dhtmlDragAndDrop.dragStartNode = this;
	window.dhtmlDragAndDrop.dragStartObject = this.dragStarter;
	document.body.onmouseup = window.dhtmlDragAndDrop.preCreateDragCopy;
	document.body.onmousemove = window.dhtmlDragAndDrop.callDrag;
	window.dhtmlDragAndDrop.downtime = new Date().valueOf();
	if ((a) && (a.preventDefault)) {
		a.preventDefault();
		return false
	}
	return false
};
dhtmlDragAndDropObject.prototype.callDrag = function(c) {
	if (!c) {
		c = window.event
	}
	dragger = window.dhtmlDragAndDrop;
	if ((new Date()).valueOf() - dragger.downtime < 100) {
		return
	}
	if (!dragger.dragNode) {
		if (dragger.waitDrag) {
			dragger.dragNode = dragger.dragStartObject._createDragNode(
					dragger.dragStartNode, c);
			if (!dragger.dragNode) {
				return dragger.stopDrag()
			}
			dragger.dragNode.onselectstart = function() {
				return false
			};
			dragger.gldragNode = dragger.dragNode;
			document.body.appendChild(dragger.dragNode);
			document.body.onmouseup = dragger.stopDrag;
			dragger.waitDrag = 0;
			dragger.dragNode.pWindow = window;
			dragger.initFrameRoute()
		} else {
			return dragger.stopDrag(c, true)
		}
	}
	if (dragger.dragNode.parentNode != window.document.body
			&& dragger.gldragNode) {
		var a = dragger.gldragNode;
		if (dragger.gldragNode.old) {
			a = dragger.gldragNode.old
		}
		a.parentNode.removeChild(a);
		var b = dragger.dragNode.pWindow;
		if (a.pWindow && a.pWindow.dhtmlDragAndDrop.lastLanding) {
			a.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding
					._dragOut(a.pWindow.dhtmlDragAndDrop.lastLanding)
		}
		if (_isIE) {
			var h = document.createElement("Div");
			h.innerHTML = dragger.dragNode.outerHTML;
			dragger.dragNode = h.childNodes[0]
		} else {
			dragger.dragNode = dragger.dragNode.cloneNode(true)
		}
		dragger.dragNode.pWindow = window;
		dragger.gldragNode.old = dragger.dragNode;
		document.body.appendChild(dragger.dragNode);
		b.dhtmlDragAndDrop.dragNode = dragger.dragNode
	}
	dragger.dragNode.style.left = c.clientX + 15
			+ (dragger.fx ? dragger.fx * (-1) : 0)
			+ (document.body.scrollLeft || document.documentElement.scrollLeft)
			+ "px";
	dragger.dragNode.style.top = c.clientY + 3
			+ (dragger.fy ? dragger.fy * (-1) : 0)
			+ (document.body.scrollTop || document.documentElement.scrollTop)
			+ "px";
	if (!c.srcElement) {
		var g = c.target
	} else {
		g = c.srcElement
	}
	dragger.checkLanding(g, c)
};
dhtmlDragAndDropObject.prototype.calculateFramePosition = function(g) {
	if (window.name) {
		var c = parent.frames[window.name].frameElement.offsetParent;
		var e = 0;
		var b = 0;
		while (c) {
			e += c.offsetLeft;
			b += c.offsetTop;
			c = c.offsetParent
		}
		if ((parent.dhtmlDragAndDrop)) {
			var a = parent.dhtmlDragAndDrop.calculateFramePosition(1);
			e += a.split("_")[0] * 1;
			b += a.split("_")[1] * 1
		}
		if (g) {
			return e + "_" + b
		} else {
			this.fx = e
		}
		this.fy = b
	}
	return "0_0"
};
dhtmlDragAndDropObject.prototype.checkLanding = function(b, a) {
	if ((b) && (b.dragLanding)) {
		if (this.lastLanding) {
			this.lastLanding.dragLanding._dragOut(this.lastLanding)
		}
		this.lastLanding = b;
		this.lastLanding = this.lastLanding.dragLanding._dragIn(
				this.lastLanding, this.dragStartNode, a.clientX, a.clientY, a);
		this.lastLanding_scr = (_isIE ? a.srcElement : a.target)
	} else {
		if ((b) && (b.tagName != "BODY")) {
			this.checkLanding(b.parentNode, a)
		} else {
			if (this.lastLanding) {
				this.lastLanding.dragLanding._dragOut(this.lastLanding,
						a.clientX, a.clientY, a)
			}
			this.lastLanding = 0;
			if (this._onNotFound) {
				this._onNotFound()
			}
		}
	}
};
dhtmlDragAndDropObject.prototype.stopDrag = function(b, c) {
	dragger = window.dhtmlDragAndDrop;
	if (!c) {
		dragger.stopFrameRoute();
		var a = dragger.lastLanding;
		dragger.lastLanding = null;
		if (a) {
			a.dragLanding._drag(dragger.dragStartNode, dragger.dragStartObject,
					a, (_isIE ? event.srcElement : b.target))
		}
	}
	dragger.lastLanding = null;
	if ((dragger.dragNode) && (dragger.dragNode.parentNode == document.body)) {
		dragger.dragNode.parentNode.removeChild(dragger.dragNode)
	}
	dragger.dragNode = 0;
	dragger.gldragNode = 0;
	dragger.fx = 0;
	dragger.fy = 0;
	dragger.dragStartNode = 0;
	dragger.dragStartObject = 0;
	document.body.onmouseup = dragger.tempDOMU;
	document.body.onmousemove = dragger.tempDOMM;
	dragger.tempDOMU = null;
	dragger.tempDOMM = null;
	dragger.waitDrag = 0
};
dhtmlDragAndDropObject.prototype.stopFrameRoute = function(c) {
	if (c) {
		window.dhtmlDragAndDrop.stopDrag(1, 1)
	}
	for (var a = 0; a < window.frames.length; a++) {
		try {
			if ((window.frames[a] != c) && (window.frames[a].dhtmlDragAndDrop)) {
				window.frames[a].dhtmlDragAndDrop.stopFrameRoute(window)
			}
		} catch (b) {
		}
	}
	try {
		if ((parent.dhtmlDragAndDrop) && (parent != window) && (parent != c)) {
			parent.dhtmlDragAndDrop.stopFrameRoute(window)
		}
	} catch (b) {
	}
};
dhtmlDragAndDropObject.prototype.initFrameRoute = function(c, g) {
	if (c) {
		window.dhtmlDragAndDrop.preCreateDragCopy();
		window.dhtmlDragAndDrop.dragStartNode = c.dhtmlDragAndDrop.dragStartNode;
		window.dhtmlDragAndDrop.dragStartObject = c.dhtmlDragAndDrop.dragStartObject;
		window.dhtmlDragAndDrop.dragNode = c.dhtmlDragAndDrop.dragNode;
		window.dhtmlDragAndDrop.gldragNode = c.dhtmlDragAndDrop.dragNode;
		window.document.body.onmouseup = window.dhtmlDragAndDrop.stopDrag;
		window.waitDrag = 0;
		if (((!_isIE) && (g)) && ((!_isFF) || (_FFrv < 1.8))) {
			window.dhtmlDragAndDrop.calculateFramePosition()
		}
	}
	try {
		if ((parent.dhtmlDragAndDrop) && (parent != window) && (parent != c)) {
			parent.dhtmlDragAndDrop.initFrameRoute(window)
		}
	} catch (b) {
	}
	for (var a = 0; a < window.frames.length; a++) {
		try {
			if ((window.frames[a] != c) && (window.frames[a].dhtmlDragAndDrop)) {
				window.frames[a].dhtmlDragAndDrop.initFrameRoute(window,
						((!c || g) ? 1 : 0))
			}
		} catch (b) {
		}
	}
};
_isFF = false;
_isIE = false;
_isOpera = false;
_isKHTML = false;
_isMacOS = false;
_isChrome = false;
_FFrv = false;
_KHTMLrv = false;
_OperaRv = false;
if (navigator.userAgent.indexOf("Macintosh") != -1) {
	_isMacOS = true
}
if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
	_isChrome = true
}
if ((navigator.userAgent.indexOf("Safari") != -1)
		|| (navigator.userAgent.indexOf("Konqueror") != -1)) {
	_KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent
			.indexOf("Safari") + 7, 5));
	if (_KHTMLrv > 525) {
		_isFF = true;
		_FFrv = 1.9
	} else {
		_isKHTML = true
	}
} else {
	if (navigator.userAgent.indexOf("Opera") != -1) {
		_isOpera = true;
		_OperaRv = parseFloat(navigator.userAgent.substr(navigator.userAgent
				.indexOf("Opera") + 6, 3))
	} else {
		if (navigator.appName.indexOf("Microsoft") != -1) {
			_isIE = true;
			if ((navigator.appVersion.indexOf("MSIE 8.0") != -1
					|| navigator.appVersion.indexOf("MSIE 9.0") != -1
					|| navigator.appVersion.indexOf("MSIE 10.0") != -1 || document.documentMode > 7)
					&& document.compatMode != "BackCompat") {
				_isIE = 8
			}
		} else {
			if (navigator.appName == "Netscape"
					&& navigator.userAgent.indexOf("Trident") != -1) {
				_isIE = 8
			} else {
				_isFF = true;
				_FFrv = parseFloat(navigator.userAgent.split("rv:")[1])
			}
		}
	}
}
if (typeof (window.dhtmlxEvent) == "undefined") {
	function dhtmlxEvent(b, c, a) {
		if (b.addEventListener) {
			b.addEventListener(c, a, false)
		} else {
			if (b.attachEvent) {
				b.attachEvent("on" + c, a)
			}
		}
	}
}
if (dhtmlxEvent.touchDelay == null) {
	dhtmlxEvent.touchDelay = 2000
}
if (typeof (dhtmlxEvent.initTouch) == "undefined") {
	dhtmlxEvent.initTouch = function() {
		var e;
		var g;
		var b, a;
		dhtmlxEvent(document.body, "touchstart", function(h) {
			g = h.touches[0].target;
			b = h.touches[0].clientX;
			a = h.touches[0].clientY;
			e = window.setTimeout(c, dhtmlxEvent.touchDelay)
		});
		function c() {
			if (g) {
				var h = document.createEvent("HTMLEvents");
				h.initEvent("dblclick", true, true);
				g.dispatchEvent(h);
				e = g = null
			}
		}
		dhtmlxEvent(document.body, "touchmove", function(h) {
			if (e) {
				if (Math.abs(h.touches[0].clientX - b) > 50
						|| Math.abs(h.touches[0].clientY - a) > 50) {
					window.clearTimeout(e);
					e = g = false
				}
			}
		});
		dhtmlxEvent(document.body, "touchend", function(h) {
			if (e) {
				window.clearTimeout(e);
				e = g = false
			}
		});
		dhtmlxEvent.initTouch = function() {
		}
	}
}
(function(b) {
	var c = typeof setImmediate !== "undefined" ? setImmediate : function(g) {
		setTimeout(g, 0)
	};
	function e(h, i) {
		var g = this;
		g.promise = g;
		g.state = "pending";
		g.val = null;
		g.fn = h || null;
		g.er = i || null;
		g.next = []
	}
	e.prototype.resolve = function(h) {
		var g = this;
		if (g.state === "pending") {
			g.val = h;
			g.state = "resolving";
			c(function() {
				g.fire()
			})
		}
	};
	e.prototype.reject = function(h) {
		var g = this;
		if (g.state === "pending") {
			g.val = h;
			g.state = "rejecting";
			c(function() {
				g.fire()
			})
		}
	};
	e.prototype.then = function(h, j) {
		var g = this;
		var i = new e(h, j);
		g.next.push(i);
		if (g.state === "resolved") {
			i.resolve(g.val)
		}
		if (g.state === "rejected") {
			i.reject(g.val)
		}
		return i
	};
	e.prototype.fail = function(g) {
		return this.then(null, g)
	};
	e.prototype.finish = function(j) {
		var g = this;
		g.state = j;
		if (g.state === "resolved") {
			for (var h = 0; h < g.next.length; h++) {
				g.next[h].resolve(g.val)
			}
		}
		if (g.state === "rejected") {
			for (var h = 0; h < g.next.length; h++) {
				g.next[h].reject(g.val)
			}
			if (!g.next.length) {
				throw (g.val)
			}
		}
	};
	e.prototype.thennable = function(k, g, i, n, m) {
		var h = this;
		m = m || h.val;
		if (typeof m === "object" && typeof k === "function") {
			try {
				var j = 0;
				k.call(m, function(o) {
					if (j++ !== 0) {
						return
					}
					g(o)
				}, function(o) {
					if (j++ !== 0) {
						return
					}
					i(o)
				})
			} catch (l) {
				i(l)
			}
		} else {
			n(m)
		}
	};
	e.prototype.fire = function() {
		var g = this;
		var h;
		try {
			h = g.val && g.val.then
		} catch (i) {
			g.val = i;
			g.state = "rejecting";
			return g.fire()
		}
		g.thennable(h, function(j) {
			g.val = j;
			g.state = "resolving";
			g.fire()
		}, function(j) {
			g.val = j;
			g.state = "rejecting";
			g.fire()
		}, function(j) {
			g.val = j;
			if (g.state === "resolving" && typeof g.fn === "function") {
				try {
					g.val = g.fn.call(undefined, g.val)
				} catch (k) {
					g.val = k;
					return g.finish("rejected")
				}
			}
			if (g.state === "rejecting" && typeof g.er === "function") {
				try {
					g.val = g.er.call(undefined, g.val);
					g.state = "resolving"
				} catch (k) {
					g.val = k;
					return g.finish("rejected")
				}
			}
			if (g.val === g) {
				g.val = TypeError();
				return g.finish("rejected")
			}
			g.thennable(h, function(l) {
				g.val = l;
				g.finish("resolved")
			}, function(l) {
				g.val = l;
				g.finish("rejected")
			}, function(l) {
				g.val = l;
				g.state === "resolving" ? g.finish("resolved") : g
						.finish("rejected")
			})
		})
	};
	e.prototype.done = function() {
		if (this.state = "rejected" && !this.next) {
			throw this.val
		}
		return null
	};
	e.prototype.nodeify = function(g) {
		if (typeof g === "function") {
			return this.then(function(i) {
				try {
					g(null, i)
				} catch (h) {
					setImmediate(function() {
						throw h
					})
				}
				return i
			}, function(i) {
				try {
					g(i)
				} catch (h) {
					setImmediate(function() {
						throw h
					})
				}
				return i
			})
		}
		return this
	};
	e.prototype.spread = function(g, h) {
		return this.all().then(function(i) {
			return typeof g === "function" && g.apply(null, i)
		}, h)
	};
	e.prototype.all = function() {
		var g = this;
		return this.then(function(s) {
			var h = new e();
			if (!(s instanceof Array)) {
				h.reject(TypeError);
				return h
			}
			var k = 0;
			var r = s.length;
			function n() {
				if (++k === r) {
					h.resolve(s)
				}
			}
			for (var o = 0, m = s.length; o < m; o++) {
				var t = s[o];
				var j;
				try {
					j = t && t.then
				} catch (q) {
					h.reject(q);
					break
				}
				(function(l) {
					g.thennable(j, function(i) {
						s[l] = i;
						n()
					}, function(i) {
						h.reject(i)
					}, function() {
						n()
					}, t)
				})(o)
			}
			return h
		})
	};
	var a = {
		all : function(g) {
			var h = new e(null, null);
			h.resolve(g);
			return h.all()
		},
		defer : function() {
			return new e(null, null)
		},
		fcall : function() {
			var i = new e();
			var g = Array.apply([], arguments);
			var h = g.shift();
			try {
				var k = h.apply(null, g);
				i.resolve(k)
			} catch (j) {
				i.reject(j)
			}
			return i
		},
		nfcall : function() {
			var i = new e();
			var g = Array.apply([], arguments);
			var h = g.shift();
			try {
				g.push(function(k, l) {
					if (k) {
						return i.reject(k)
					}
					return i.resolve(l)
				});
				h.apply(null, g)
			} catch (j) {
				i.reject(j)
			}
			return i
		}
	};
	b.promise = a
})(dhx);
function dhtmlXCellObject(c, a) {
	this.cell = document.createElement("DIV");
	this.cell.className = "dhx_cell" + (a || "");
	this._idd = c;
	this._isCell = true;
	this.conf = {
		borders : true,
		idx : {},
		css : a || "",
		idx_data : {
			cont : "dhx_cell_cont",
			pr1 : "dhx_cell_progress_bar",
			pr2 : "dhx_cell_progress_img",
			pr3 : "dhx_cell_progress_svg",
			menu : "dhx_cell_menu",
			toolbar : "dhx_cell_toolbar",
			ribbon : "dhx_cell_ribbon",
			sb : "dhx_cell_statusbar",
			cover : "dhx_cell_cover"
		},
		ofs_nodes : {
			t : {},
			b : {}
		}
	};
	this.dataNodes = {};
	this.views = {};
	var b = document.createElement("DIV");
	b.className = "dhx_cell_cont" + this.conf.css;
	this.cell.appendChild(b);
	b = null;
	this._updateIdx = function() {
		for ( var e in this.conf.idx) {
			this.conf.idx[e] = null;
			delete this.conf.idx[e]
		}
		for (var i = 0; i < this.cell.childNodes.length; i++) {
			var g = this.cell.childNodes[i].className;
			for ( var e in this.conf.idx_data) {
				var h = new RegExp(this.conf.idx_data[e]);
				if (g.match(h) != null) {
					this.conf.idx[e] = i
				}
			}
		}
		this.callEvent("_onIdxUpdated", [])
	};
	this._adjustAttached = function() {
		for ( var e in this.dataNodes) {
			if (this.dataNodes[e] != null
					&& typeof (this.dataNodes[e].setSizes) == "function") {
				this.dataNodes[e].setSizes()
			}
		}
		if (this.dataObj != null
				&& typeof (this.dataObj.setSizes) == "function") {
			if (this.dataType == "layout"
					&& typeof (window.dhtmlXLayoutCell) == "function"
					&& this instanceof window.dhtmlXLayoutCell
					&& this.dataObj._getMainInst() != this.layout
							._getMainInst()) {
				this.dataObj.setSizes();
				return
			}
			this.dataObj.setSizes.apply(this.dataObj, arguments)
		}
	};
	this._setSize = function(o, m, p, j, k, l, g, i) {
		if (this.conf.size == null) {
			this.conf.size = {}
		}
		if (i == null) {
			i = {}
		}
		var q = {
			left : "x",
			top : "y",
			width : "w",
			height : "h"
		};
		this.conf.size.x = o;
		this.conf.size.y = m;
		this.conf.size.w = Math.max(p, 0);
		this.conf.size.h = Math.max(j, 0);
		for ( var n in q) {
			var e = (i[n] || n);
			this.cell.style[e] = this.conf.size[q[n]] + "px"
		}
		this.callEvent("_onSetSize", []);
		if (l !== true) {
			this._adjustCont(k, g)
		} else {
			this._adjustAttached(k)
		}
		this._adjustProgress()
	};
	this._adjustCont = function(l, i) {
		var j = this.cell.childNodes[this.conf.idx.cont];
		if (typeof (window.dhtmlXLayoutCell) == "function"
				&& this instanceof window.dhtmlXLayoutCell
				&& this.conf.collapsed == true) {
			j.style.left = j.style.top = "0px";
			j.style.width = j.style.height = "200px";
			j = null;
			return
		}
		var h = 0;
		for ( var e in this.conf.ofs_nodes.t) {
			var g = this.conf.ofs_nodes.t[e];
			h += (g == "func" ? this[e]()
					: (g == true ? this.cell.childNodes[this.conf.idx[e]].offsetHeight
							: 0))
		}
		var m = 0;
		for ( var e in this.conf.ofs_nodes.b) {
			var g = this.conf.ofs_nodes.b[e];
			m += (g == "func" ? this[e]()
					: (g == true ? this.cell.childNodes[this.conf.idx[e]].offsetHeight
							: 0))
		}
		j.style.left = "0px";
		j.style.top = h + "px";
		if (this.conf.cells_cont == null) {
			this.conf.cells_cont = {};
			j.style.width = this.cell.offsetWidth + "px";
			j.style.height = Math.max(this.cell.offsetHeight - h - m, 0) + "px";
			this.conf.cells_cont.w = parseInt(j.style.width) - j.offsetWidth;
			this.conf.cells_cont.h = parseInt(j.style.height) - j.offsetHeight
		}
		j.style.left = "0px";
		j.style.top = h + "px";
		j.style.width = Math.max(
				this.cell.offsetWidth + this.conf.cells_cont.w, 0)
				+ "px";
		j.style.height = Math.max(this.conf.size.h - h - m
				+ this.conf.cells_cont.h, 0)
				+ "px";
		j = null;
		this._adjustAttached(l);
		if (i == "expand" && this.dataType == "editor" && this.dataObj != null) {
			this.dataObj._prepareContent(true)
		}
	};
	this._mtbUpdBorder = function() {
		var g = [ "menu", "toolbar", "ribbon" ];
		for (var i = 0; i < g.length; i++) {
			if (this.conf.idx[g[i]] != null) {
				var j = this.cell.childNodes[this.conf.idx[g[i]]];
				var h = "dhx_cell_" + g[i] + "_no_borders";
				var e = "dhx_cell_" + g[i] + "_def";
				j.className = j.className.replace(new RegExp(
						this.conf.borders ? h : e), this.conf.borders ? e : h);
				j = null
			}
		}
	};
	this._resetSizeState = function() {
		this.conf.cells_cont = null
	};
	this.conf.view = "def";
	this.conf.views_loaded = {};
	this.conf.views_loaded[this.conf.view] = true;
	this._viewSave = function(h) {
		this.views[h] = {
			borders : this.conf.borders,
			ofs_nodes : {
				t : {},
				b : {}
			},
			url_data : this.conf.url_data,
			dataType : this.dataType,
			dataObj : this.dataObj,
			cellCont : [],
			dataNodes : {},
			dataNodesCont : {}
		};
		var i = this.cell.childNodes[this.conf.idx.cont];
		while (i.childNodes.length > 0) {
			this.views[h].cellCont.push(i.firstChild);
			i.removeChild(i.firstChild)
		}
		i = null;
		this.dataType = null;
		this.dataObj = null;
		this.conf.url_data = null;
		for ( var g in this.dataNodes) {
			for ( var e in this.conf.ofs_nodes) {
				if (typeof (this.conf.ofs_nodes[e][g]) != "undefined") {
					this.views[h].ofs_nodes[e][g] = this.conf.ofs_nodes[e][g];
					this.conf.ofs_nodes[e][g] = null;
					delete this.conf.ofs_nodes[e][g]
				}
			}
			this.views[h].dataNodesCont[g] = this.cell.childNodes[this.conf.idx[g]];
			this.cell.removeChild(this.cell.childNodes[this.conf.idx[g]]);
			this.views[h].dataNodes[g] = this.dataNodes[g];
			this.dataNodes[g] = null;
			delete this.dataNodes[g];
			this._updateIdx()
		}
		this.callEvent("_onViewSave", [ h ])
	};
	this._viewRestore = function(h) {
		if (this.views[h] == null) {
			return
		}
		this.dataObj = this.views[h].dataObj;
		this.dataType = this.views[h].dataType;
		this.conf.url_data = this.views[h].url_data;
		for (var i = 0; i < this.views[h].cellCont.length; i++) {
			this.cell.childNodes[this.conf.idx.cont]
					.appendChild(this.views[h].cellCont[i])
		}
		for ( var g in this.views[h].dataNodes) {
			this.dataNodes[g] = this.views[h].dataNodes[g];
			if (g == "menu") {
				this.cell.insertBefore(this.views[h].dataNodesCont[g],
						this.cell.childNodes[this.conf.idx.toolbar
								|| this.conf.idx.cont])
			}
			if (g == "toolbar") {
				this.cell.insertBefore(this.views[h].dataNodesCont[g],
						this.cell.childNodes[this.conf.idx.cont])
			}
			if (g == "ribbon") {
				this.cell.insertBefore(this.views[h].dataNodesCont[g],
						this.cell.childNodes[this.conf.idx.cont])
			}
			if (g == "sb") {
				this.cell.appendChild(this.views[h].dataNodesCont[g])
			}
			this._updateIdx()
		}
		for ( var g in this.views[h].ofs_nodes) {
			for ( var e in this.views[h].ofs_nodes[g]) {
				this.conf.ofs_nodes[g][e] = this.views[h].ofs_nodes[g][e]
			}
		}
		if (this.conf.borders != this.views[h].borders) {
			this[this.views[h].borders ? "_showBorders" : "_hideBorders"](true)
		}
		if (this.dataType == "url" && this.conf.url_data != null
				&& this.conf.url_data.ajax == false
				&& this.conf.url_data.post_data != null) {
			this.reloadURL()
		}
		this.callEvent("_onViewRestore", [ h ]);
		this._viewDelete(h)
	};
	this._viewDelete = function(h) {
		if (this.views[h] == null) {
			return
		}
		this.views[h].borders = null;
		for ( var g in this.views[h].ofs_nodes) {
			for ( var e in this.views[h].ofs_nodes[g]) {
				this.views[h].ofs_nodes[g][e] = null
			}
			this.views[h].ofs_nodes[g] = null
		}
		this.views[h].dataType = null;
		this.views[h].dataObj = null;
		this.views[h].url_data = null;
		for (var i = 0; i < this.views[h].cellCont.length; i++) {
			this.views[h].cellCont[i] = null
		}
		this.views[h].cellCont = null;
		for ( var g in this.views[h].dataNodes) {
			this.views[h].dataNodes[g] = null;
			this.views[h].dataNodesCont[g] = null
		}
		this.views[h].dataNodes = this.views[h].dataNodesCont = null;
		this.views[h] = null;
		delete this.views[h]
	};
	window.dhx4._eventable(this);
	this._updateIdx();
	return this
}
dhtmlXCellObject.prototype.showView = function(a) {
	if (this.conf.view == a) {
		return false
	}
	this._viewSave(this.conf.view);
	this._viewRestore(a);
	this._updateIdx();
	this._adjustCont();
	this.conf.view = a;
	var b = (typeof (this.conf.views_loaded[this.conf.view]) == "undefined");
	this.conf.views_loaded[this.conf.view] = true;
	return b
};
dhtmlXCellObject.prototype.getViewName = function() {
	return this.conf.view
};
dhtmlXCellObject.prototype.unloadView = function(e) {
	if (e == this.conf.view) {
		var g = this.conf.unloading;
		this.conf.unloading = true;
		if (typeof (this.detachMenu) == "function") {
			this.detachMenu()
		}
		if (typeof (this.detachToolbar) == "function") {
			this.detachToolbar()
		}
		if (typeof (this.detachRibbon) == "function") {
			this.detachRibbon()
		}
		this.detachStatusBar();
		this._detachObject(null, true);
		this.conf.unloading = g;
		if (!this.conf.unloading) {
			this._adjustCont(this._idd)
		}
		return
	}
	if (this.views[e] == null) {
		return
	}
	var c = this.views[e];
	for ( var b in c.dataNodes) {
		if (typeof (c.dataNodes[b].unload) == "function") {
			c.dataNodes[b].unload()
		}
		c.dataNodes[b] = null;
		c.dataNodesCont[b] = null
	}
	if (c.dataType == "url") {
		if (c.cellCont != null && c.cellCont[0] != "null") {
			this._detachURLEvents(c.cellCont[0])
		}
	} else {
		if (c.dataObj != null) {
			if (typeof (c.dataObj.unload) == "function") {
				c.dataObj.unload()
			} else {
				if (typeof (c.dataObj.destructor) == "function") {
					c.dataObj.destructor()
				}
			}
			c.dataObj = null
		}
	}
	c = null;
	this._viewDelete(e);
	if (typeof (this.conf.views_loaded[e]) != "undefined") {
		delete this.conf.views_loaded[e]
	}
};
dhtmlXCellObject.prototype.getId = function() {
	return this._idd
};
dhtmlXCellObject.prototype.progressOn = function() {
	if (this.conf.progress == true) {
		return
	}
	this.conf.progress = true;
	var b = document.createElement("DIV");
	b.className = this.conf.idx_data.pr1;
	var a = document.createElement("DIV");
	if (this.conf.skin == "material"
			&& (window.dhx4.isFF || window.dhx4.isChrome || window.dhx4.isOpera || window.dhx4.isEdge)) {
		a.className = this.conf.idx_data.pr3;
		a.innerHTML = '<svg class="dhx_cell_prsvg" viewBox="25 25 50 50"><circle class="dhx_cell_prcircle" cx="50" cy="50" r="20"/></svg>'
	} else {
		a.className = this.conf.idx_data.pr2
	}
	if (this.conf.idx.cover != null) {
		this.cell.insertBefore(a, this.cell.childNodes[this.conf.idx.cover])
	} else {
		this.cell.appendChild(a)
	}
	this.cell.insertBefore(b, a);
	b = a = null;
	this._updateIdx();
	this._adjustProgress()
};
dhtmlXCellObject.prototype.progressOff = function() {
	if (this.conf.progress != true) {
		return
	}
	for ( var b in {
		pr3 : 3,
		pr2 : 2,
		pr1 : 1
	}) {
		var c = this.cell.childNodes[this.conf.idx[b]];
		if (c != null) {
			c.parentNode.removeChild(c)
		}
		c = null
	}
	this.conf.progress = false;
	this._updateIdx()
};
dhtmlXCellObject.prototype._adjustProgress = function() {
	if (this.conf.idx.pr1 == null) {
		return
	}
	if (!this.conf.pr) {
		this.conf.pr = {}
	}
	var b = this.cell.childNodes[this.conf.idx.pr1];
	var a = this.cell.childNodes[this.conf.idx.pr2]
			|| this.cell.childNodes[this.conf.idx.pr3];
	if (!this.conf.pr.ofs) {
		a.style.width = b.offsetWidth + "px";
		a.style.height = b.offsetHeight + "px";
		this.conf.pr.ofs = {
			w : a.offsetWidth - a.clientWidth,
			h : a.offsetHeight - a.clientHeight
		}
	}
	a.style.width = b.offsetWidth - this.conf.pr.ofs.w + "px";
	a.style.height = b.offsetHeight - this.conf.pr.ofs.h + "px";
	b = a = null
};
dhtmlXCellObject.prototype._showCellCover = function() {
	if (this.conf.cover == true) {
		return
	}
	this.conf.cover = true;
	var a = document.createElement("DIV");
	a.className = this.conf.idx_data.cover;
	this.cell.appendChild(a);
	a = null;
	this._updateIdx()
};
dhtmlXCellObject.prototype._hideCellCover = function() {
	if (this.conf.cover != true) {
		return
	}
	this.cell.removeChild(this.cell.childNodes[this.conf.idx.cover]);
	this._updateIdx();
	this.conf.cover = false
};
dhtmlXCellObject.prototype._showBorders = function(a) {
	if (this.conf.borders) {
		return
	}
	this.conf.borders = true;
	this.cell.childNodes[this.conf.idx.cont].className = "dhx_cell_cont"
			+ this.conf.css;
	this.conf.cells_cont = null;
	this._mtbUpdBorder();
	this.callEvent("_onBorderChange", [ true ]);
	if (a !== true) {
		this._adjustCont(this._idd)
	}
};
dhtmlXCellObject.prototype._hideBorders = function(a) {
	if (!this.conf.borders) {
		return
	}
	this.conf.borders = false;
	this.cell.childNodes[this.conf.idx.cont].className = "dhx_cell_cont"
			+ this.conf.css + " dhx_cell_cont_no_borders";
	this.conf.cells_cont = null;
	this._mtbUpdBorder();
	this.callEvent("_onBorderChange", [ false ]);
	if (a !== true) {
		this._adjustCont(this._idd)
	}
};
dhtmlXCellObject.prototype._getWidth = function() {
	return this.cell.offsetWidth
};
dhtmlXCellObject.prototype._getHeight = function() {
	return this.cell.offsetHeight
};
dhtmlXCellObject.prototype.showInnerScroll = function() {
	this.cell.childNodes[this.conf.idx.cont].style.overflow = "auto"
};
dhtmlXCellObject.prototype._unload = function() {
	this.conf.unloading = true;
	this.callEvent("_onCellUnload", []);
	this.progressOff();
	this.unloadView(this.conf.view);
	this.dataNodes = null;
	this.cell.parentNode.removeChild(this.cell);
	this.cell = null;
	window.dhx4._eventable(this, "clear");
	for ( var b in this.views) {
		this.unloadView(b)
	}
	this.conf = null;
	for ( var b in this) {
		this[b] = null
	}
};
dhtmlXCellObject.prototype.attachObject = function(e, c) {
	if (window.dhx4.s2b(c)
			&& !(typeof (window.dhtmlXWindowsCell) == "function" && this instanceof window.dhtmlXWindowsCell)) {
		c = false
	}
	if (typeof (e) == "string") {
		e = document.getElementById(e)
	}
	if (e.parentNode == this.cell.childNodes[this.conf.idx.cont]) {
		e = null;
		return
	}
	if (c) {
		e.style.display = "";
		var a = e.offsetWidth;
		var b = e.offsetHeight
	}
	this._attachObject(e);
	this.dataType = "obj";
	e.style.display = "";
	e = null;
	if (c) {
		this._adjustByCont(a, b)
	}
};
dhtmlXCellObject.prototype.appendObject = function(a) {
	if (typeof (a) == "string") {
		a = document.getElementById(a)
	}
	if (a.parentNode == this.cell.childNodes[this.conf.idx.cont]) {
		a = null;
		return
	}
	if (!this.conf.append_mode) {
		this.cell.childNodes[this.conf.idx.cont].style.overflow = "auto";
		this.conf.append_mode = true
	}
	this._attachObject(a, null, null, true);
	this.dataType = "obj";
	a.style.display = "";
	a = null
};
dhtmlXCellObject.prototype.detachObject = function(b, a) {
	this._detachObject(null, b, a)
};
dhtmlXCellObject.prototype.getAttachedStatusBar = function() {
	return this.dataNodes.sb
};
dhtmlXCellObject.prototype.getAttachedObject = function() {
	if (this.dataType == "obj" || this.dataType == "url"
			|| this.dataType == "url-ajax") {
		return this.cell.childNodes[this.conf.idx.cont].firstChild
	} else {
		return this.dataObj
	}
};
dhtmlXCellObject.prototype.attachURL = function(b, n, c) {
	if (c == true) {
		c = {}
	}
	var g = (typeof (c) != "undefined" && c != false && c != null);
	if (this.conf.url_data == null) {
		this.conf.url_data = {}
	}
	this.conf.url_data.url = b;
	this.conf.url_data.ajax = (n == true);
	this.conf.url_data.post_data = (c == true ? {} : (c || null));
	if (this.conf.url_data.xml_doc != null) {
		try {
			this.conf.url_data.xml_doc.xmlDoc.abort()
		} catch (j) {
		}
		this.conf.url_data.xml_doc.xmlDoc = null;
		this.conf.url_data.xml_doc = null
	}
	if (n == true) {
		var m = this;
		if (g) {
			var h = "";
			for ( var l in c) {
				h += "&" + encodeURIComponent(l) + "="
						+ encodeURIComponent(c[l])
			}
			this.conf.url_data.xml_doc = dhx4.ajax
					.post(
							b,
							h,
							function(a) {
								if (m.attachHTMLString != null
										&& typeof (a.xmlDoc.responseText) == "string") {
									m
											.attachHTMLString("<div style='position:relative;width:100%;height:100%;overflow:auto;'>"
													+ a.xmlDoc.responseText
													+ "</div>");
									if (typeof (m._doOnFrameContentLoaded) == "function") {
										m._doOnFrameContentLoaded()
									}
									m.dataType = "url-ajax"
								}
								m = a = null
							})
		} else {
			this.conf.url_data.xml_doc = dhx4.ajax
					.get(
							b,
							function(a) {
								if (m.attachHTMLString != null
										&& typeof (a.xmlDoc.responseText) == "string") {
									m
											.attachHTMLString("<div style='position:relative;width:100%;height:100%;overflow:auto;'>"
													+ a.xmlDoc.responseText
													+ "</div>");
									if (typeof (m._doOnFrameContentLoaded) == "function") {
										m._doOnFrameContentLoaded()
									}
									m.dataType = "url-ajax"
								}
								m = a = null
							})
		}
	} else {
		if (this.dataType == "url") {
			var i = this.getFrame()
		} else {
			var i = document.createElement("IFRAME");
			i.frameBorder = 0;
			i.border = 0;
			i.style.width = "100%";
			i.style.height = "100%";
			i.style.position = "relative";
			this._attachObject(i);
			this.dataType = "url";
			this._attachURLEvents()
		}
		if (g) {
			var k = (typeof (this.conf.url_data.post_ifr) == "undefined");
			this.conf.url_data.post_ifr = true;
			if (k) {
				this._attachURLEvents()
			}
			i.src = "about:blank"
		} else {
			i.src = b + window.dhx4.ajax._dhxr(b)
		}
		i = null
	}
	i = null
};
dhtmlXCellObject.prototype.reloadURL = function() {
	if (!(this.dataType == "url" || this.dataType == "url-ajax")) {
		return
	}
	if (this.conf.url_data == null) {
		return
	}
	this.attachURL(this.conf.url_data.url, this.conf.url_data.ajax,
			this.conf.url_data.post_data)
};
dhtmlXCellObject.prototype.attachHTMLString = function(str) {
	this._attachObject(null, null, str);
	var z = str.match(/<script[^>]*>[^\f]*?<\/script>/g) || [];
	for (var i = 0; i < z.length; i++) {
		var s = z[i].replace(/<([\/]{0,1})script[^>]*>/gi, "");
		if (s) {
			if (window.execScript) {
				window.execScript(s)
			} else {
				window.eval(s)
			}
		}
	}
};
dhtmlXCellObject.prototype.attachScheduler = function(a, i, b, e) {
	e = e || window.scheduler;
	var g = false;
	if (b) {
		var h = document.getElementById(b);
		if (h) {
			g = true
		}
	}
	if (!g) {
		var c = b
				|| '<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>';
		var h = document.createElement("DIV");
		h.id = "dhxSchedObj_" + new Date().getTime();
		h.style.width = "100%";
		h.style.height = "100%";
		h.style.position = "relative";
		h.style.overflow = "hidden";
		h.className = "dhx_cal_container";
		h.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>'
				+ c
				+ '</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>'
	}
	this._attachObject(h);
	this.dataType = "scheduler";
	this.dataObj = e;
	this.dataObj.setSizes = function() {
		this.update_view()
	};
	e.init(h.id, a, i);
	h = null;
	this.callEvent("_onContentAttach", []);
	return this.dataObj
};
dhtmlXCellObject.prototype.attachMap = function(a) {
	var b = document.createElement("DIV");
	b.style.width = "100%";
	b.style.height = "100%";
	b.style.position = "relative";
	b.style.overflow = "hidden";
	this._attachObject(b);
	if (!a) {
		a = {
			center : new google.maps.LatLng(40.719837, -73.992348),
			zoom : 11,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		}
	}
	this.dataType = "maps";
	this.dataObj = new google.maps.Map(b, a);
	this.dataObj.setSizes = function() {
		google.maps.event.trigger(this, "resize")
	};
	b = null;
	this.callEvent("_onContentAttach", []);
	return this.dataObj
};
dhtmlXCellObject.prototype._createNode_sb = function(j, e, i, a, g) {
	if (typeof (g) != "undefined") {
		j = g
	} else {
		var b = e || {};
		var k = (typeof (b.text) == "string" && b.text.length > 0 ? b.text
				: "&nbsp;");
		var c = (typeof (b.height) == "number" ? b.height : false);
		var j = document.createElement("DIV");
		j.className = "dhx_cell_statusbar_def";
		j.innerHTML = "<div class='"
				+ (b.paging == true ? "dhx_cell_statusbar_paging"
						: "dhx_cell_statusbar_text") + "'>" + k + "</div>";
		if (c != false) {
			j.firstChild.style.height = j.firstChild.style.lineHeight = c
					+ "px"
		}
	}
	if (this.conf.idx.pr1 != null) {
		this.cell.insertBefore(j, this.cell.childNodes[this.conf.idx.pr1])
	} else {
		this.cell.appendChild(j)
	}
	this.conf.ofs_nodes.b.sb = true;
	this._updateIdx();
	this._adjustCont(this._idd);
	return j
};
dhtmlXCellObject.prototype.attachStatusBar = function(a) {
	if (this.dataNodes.sb) {
		return
	}
	if (a != null && window.dhx4.s2b(a.paging) == true) {
		a.height = null
	}
	if (this.conf.skin == "dhx_skyblue"
			&& typeof (window.dhtmlXWindowsCell) == "function"
			&& this instanceof window.dhtmlXWindowsCell) {
		this.cell.childNodes[this.conf.idx.cont].className += " dhx_cell_statusbar_attached"
	}
	this.dataNodes.sb = this._attachObject("sb", a);
	this.dataNodes.sb.setText = function(b) {
		this.childNodes[0].innerHTML = b
	};
	this.dataNodes.sb.getText = function() {
		return this.childNodes[0].innerHTML
	};
	this.dataNodes.sb.onselectstart = function(b) {
		return false
	};
	return this.dataNodes.sb
};
dhtmlXCellObject.prototype.detachStatusBar = function() {
	if (!this.dataNodes.sb) {
		return
	}
	if (this.conf.skin == "dhx_skyblue"
			&& typeof (window.dhtmlXWindowsCell) == "function"
			&& this instanceof window.dhtmlXWindowsCell) {
		this.cell.childNodes[this.conf.idx.cont].className = this.cell.childNodes[this.conf.idx.cont].className
				.replace(/\s{0,}dhx_cell_statusbar_attached/, "")
	}
	this.dataNodes.sb.setText = this.dataNodes.sb.getText = this.dataNodes.sb.onselectstart = null;
	this.dataNodes.sb = null;
	delete this.dataNodes.sb;
	this._detachObject("sb")
};
dhtmlXCellObject.prototype.showStatusBar = function() {
	this._mtbShowHide("sb", "")
};
dhtmlXCellObject.prototype.hideStatusBar = function() {
	this._mtbShowHide("sb", "none")
};
dhtmlXCellObject.prototype._mtbShowHide = function(b, a) {
	if (!this.dataNodes[b]) {
		return
	}
	this.cell.childNodes[this.conf.idx[b]].style.display = a;
	this._adjustCont()
};
dhtmlXCellObject.prototype.getFrame = dhtmlXCellObject.prototype._getFrame = function() {
	if (this.dataType != "url") {
		return null
	}
	return this.cell.childNodes[this.conf.idx.cont].firstChild
};
dhtmlXCellObject.prototype._attachURLEvents = function() {
	if (this.dataType != "url") {
		return
	}
	var c = this;
	var b = this._idd;
	var a = this.cell.childNodes[this.conf.idx.cont].firstChild;
	if (typeof (this._doOnFrameMouseDown) != "function") {
		this._doOnFrameMouseDown = function(g) {
			c.callEvent("_onContentMouseDown", [ b, g || event ])
		}
	}
	if (typeof (window.addEventListener) == "function") {
		a.onload = function() {
			try {
				if (typeof (c._doOnFrameMouseDown) == "function") {
					this.contentWindow.document.body.addEventListener(
							"mousedown", c._doOnFrameMouseDown, false)
				}
			} catch (g) {
			}
			try {
				if (typeof (c._doOnFrameContentLoaded) == "function") {
					c._doOnFrameContentLoaded()
				}
			} catch (g) {
			}
		}
	} else {
		a.onreadystatechange = function(g) {
			if (this.readyState == "complete") {
				try {
					if (typeof (c._doOnFrameMouseDown) == "function") {
						this.contentWindow.document.body.attachEvent(
								"onmousedown", c._doOnFrameMouseDown)
					}
				} catch (h) {
				}
				try {
					if (typeof (c._doOnFrameContentLoaded) == "function") {
						c._doOnFrameContentLoaded()
					}
				} catch (h) {
				}
			}
		}
	}
};
dhtmlXCellObject.prototype._doOnFrameContentLoaded = function() {
	if (this.conf.url_data.post_ifr == true) {
		var h = this.getFrame().contentWindow.document;
		var g = h.createElement("FORM");
		g.method = "POST";
		g.action = this.conf.url_data.url;
		h.body.appendChild(g);
		var c = {};
		if (window.dhx4.ajax.cache != true) {
			c["dhxr" + new Date().getTime()] = "1"
		}
		for ( var b in this.conf.url_data.post_data) {
			c[b] = this.conf.url_data.post_data[b]
		}
		for ( var b in c) {
			var e = h.createElement("INPUT");
			e.type = "hidden";
			e.name = b;
			e.value = c[b];
			g.appendChild(e);
			e = null
		}
		this.conf.url_data.post_ifr = false;
		g.submit()
	} else {
		this.callEvent("_onContentLoaded", [ this._idd ])
	}
};
dhtmlXCellObject.prototype._detachURLEvents = function(a) {
	if (a == null) {
		if (this.dataType != "url") {
			return
		}
		a = this.cell.childNodes[this.conf.idx.cont].firstChild
	}
	if (!a) {
		return
	}
	if (typeof (window.addEventListener) == "function") {
		a.onload = null;
		try {
			a.contentWindow.document.body.removeEventListener("mousedown",
					this._doOnFrameMouseDown, false)
		} catch (b) {
		}
	} else {
		a.onreadystatechange = null;
		try {
			a.contentWindow.document.body.detachEvent("onmousedown",
					this._doOnFrameMouseDown)
		} catch (b) {
		}
	}
	a = null
};
dhtmlXCellObject.prototype._attachObject = function(g, b, e, a, c) {
	if (typeof (g) == "string" && {
		menu : 1,
		toolbar : 1,
		ribbon : 1,
		sb : 1
	}[g] == 1) {
		return this["_createNode_" + g].apply(this, arguments)
	}
	if (a != true) {
		this._detachObject(null, true, null)
	}
	if (typeof (e) == "string") {
		this.cell.childNodes[this.conf.idx.cont].innerHTML = e
	} else {
		this.cell.childNodes[this.conf.idx.cont].appendChild(g)
	}
	g = null
};
dhtmlXCellObject.prototype._detachObject = function(i, b, a) {
	this.callEvent("_onBeforeContentDetach", []);
	if (i == "menu" || i == "toolbar" || i == "ribbon" || i == "sb") {
		var h = this.cell.childNodes[this.conf.idx[i]];
		h.parentNode.removeChild(h);
		h = null;
		this.conf.ofs_nodes[i == "sb" ? "b" : "t"][i] = false;
		this._updateIdx();
		if (!this.conf.unloading) {
			this._adjustCont(this._idd)
		}
		return
	}
	if (b == true) {
		a = false
	} else {
		if (typeof (a) == "undefined") {
			a = document.body
		} else {
			if (typeof (a) == "string") {
				a = document.getElementById(a)
			}
		}
	}
	if (a === false) {
		if (this.conf.unloading == true
				&& String(this.dataType).match(/ajax/) != null) {
			if (this.conf.url_data != null
					&& this.conf.url_data.xml_doc != null) {
				try {
					this.conf.url_data.xml_doc.xmlDoc.abort()
				} catch (g) {
				}
				this.conf.url_data.xml_doc.xmlDoc = null;
				this.conf.url_data.xml_doc = null
			}
		}
		if (this.dataType == "url") {
			this._detachURLEvents()
		} else {
			if (this.dataObj != null) {
				if (typeof (this.dataObj.unload) == "function") {
					this.dataObj.unload()
				} else {
					if (typeof (this.dataObj.destructor) == "function") {
						this.dataObj.destructor()
					}
				}
			}
		}
	}
	var h = this.cell.childNodes[this.conf.idx.cont];
	while (h.childNodes.length > 0) {
		if (a === false) {
			h.removeChild(h.lastChild)
		} else {
			h.firstChild.style.display = "none";
			a.appendChild(h.firstChild)
		}
	}
	if (this.conf.append_mode) {
		h.style.overflow = "";
		this.conf.append_mode = false
	}
	var c = (this.dataType == "tabbar");
	this.dataObj = null;
	this.dataType = null;
	a = h = null;
	if (this.conf.unloading != true && c) {
		this.showHeader(true);
		this._showBorders()
	}
};
dhtmlXCellObject.prototype._attachFromCell = function(b) {
	this.detachObject(true);
	var e = "layout";
	if (typeof (window.dhtmlXWindowsCell) == "function"
			&& this instanceof window.dhtmlXWindowsCell) {
		e = "window"
	}
	if (typeof (window.dhtmlXWindowsCell) == "function"
			&& b instanceof window.dhtmlXWindowsCell
			&& b.wins.w[b._idd].conf.parked == true) {
		b.wins._winCellSetOpacity(b._idd, "open", false)
	}
	if (typeof (window.dhtmlXAccordionCell) == "function"
			&& b instanceof window.dhtmlXAccordionCell
			&& b.conf.opened == false) {
		b._cellSetOpacity("open", false)
	}
	for ( var c in b.dataNodes) {
		this._attachObject(c, null, null, null,
				b.cell.childNodes[b.conf.idx[c]]);
		this.dataNodes[c] = b.dataNodes[c];
		b.dataNodes[c] = null;
		b.conf.ofs_nodes[c == "sb" ? "b" : "t"][c] = false;
		b._updateIdx()
	}
	this._mtbUpdBorder();
	if (b.dataType != null && b.dataObj != null) {
		this.dataType = b.dataType;
		this.dataObj = b.dataObj;
		while (b.cell.childNodes[b.conf.idx.cont].childNodes.length > 0) {
			this.cell.childNodes[this.conf.idx.cont]
					.appendChild(b.cell.childNodes[b.conf.idx.cont].firstChild)
		}
		b.dataType = null;
		b.dataObj = null;
		if (this.dataType == "grid") {
			if (e == "window" && this.conf.skin == "dhx_skyblue") {
				this.dataObj.entBox.style.border = "1px solid #a4bed4";
				this.dataObj._sizeFix = 0
			} else {
				this.dataObj.entBox.style.border = "0px solid white";
				this.dataObj._sizeFix = 2
			}
		}
	} else {
		while (b.cell.childNodes[b.conf.idx.cont].childNodes.length > 0) {
			this.cell.childNodes[this.conf.idx.cont]
					.appendChild(b.cell.childNodes[b.conf.idx.cont].firstChild)
		}
	}
	this.conf.view = b.conf.view;
	b.conf.view = "def";
	for ( var c in b.views) {
		this.views[c] = b.views[c];
		b.views[c] = null;
		delete b.views[c]
	}
	b._updateIdx();
	b._adjustCont();
	this._updateIdx();
	this._adjustCont();
	if (b.conf.progress == true) {
		b.progressOff();
		this.progressOn()
	} else {
		this.progressOff()
	}
	if (e == "window" && this.wins.w[this._idd].conf.parked) {
		this.wins._winCellSetOpacity(this._idd, "close", false)
	}
};
function dhtmlXCellTop(g, b) {
	if (arguments.length == 0 || typeof (g) == "undefined") {
		return
	}
	var a = this;
	this.dataNodes = {};
	this.conf.ofs = {
		t : 0,
		b : 0,
		l : 0,
		r : 0
	};
	this.conf.ofs_nodes = {
		t : {},
		b : {}
	};
	this.conf.progress = false;
	this.conf.fs_mode = false;
	this.conf.fs_tm = null;
	this.conf.fs_resize = false;
	if (g == document.body) {
		this.conf.fs_mode = true;
		this.base = g;
		if (this.base == document.body) {
			var c = {
				dhx_skyblue : {
					t : 2,
					b : 2,
					l : 2,
					r : 2
				},
				dhx_web : {
					t : 8,
					b : 8,
					l : 8,
					r : 8
				},
				dhx_terrace : {
					t : 9,
					b : 9,
					l : 8,
					r : 8
				},
				material : {
					t : 9,
					b : 9,
					l : 8,
					r : 8
				}
			};
			this.conf.ofs = (c[this.conf.skin] != null ? c[this.conf.skin]
					: c.dhx_skyblue)
		}
	} else {
		this.base = (typeof (g) == "string" ? document.getElementById(g) : g)
	}
	this.base.className += " " + this.conf.css + "_base_" + this.conf.skin;
	this.cont = document.createElement("DIV");
	this.cont.className = this.conf.css + "_cont";
	this.base.appendChild(this.cont);
	if (b != null) {
		this.setOffsets(b, false)
	} else {
		if (this.base._ofs != null) {
			this.setOffsets(this.base._ofs, false);
			this.base._ofs = null;
			try {
				delete this.base._ofs
			} catch (h) {
			}
		}
	}
	this._adjustCont = function() {
		var j = this.conf.ofs.t;
		for ( var i in this.conf.ofs_nodes.t) {
			j += (this.conf.ofs_nodes.t[i] == true ? this.dataNodes[i].offsetHeight
					: 0)
		}
		var e = this.conf.ofs.b;
		for ( var i in this.conf.ofs_nodes.b) {
			e += (this.conf.ofs_nodes.b[i] == true ? this.dataNodes[i].offsetHeight
					: 0)
		}
		this.cont.style.left = this.conf.ofs.l + "px";
		this.cont.style.width = this.base.clientWidth - this.conf.ofs.l
				- this.conf.ofs.r + "px";
		this.cont.style.top = j + "px";
		this.cont.style.height = this.base.clientHeight - j - e + "px"
	};
	this._setBaseSkin = function(e) {
		this.base.className = this.base.className.replace(new RegExp(
				this.conf.css + "_base_" + this.conf.skin, "gi"), this.conf.css
				+ "_base_" + e)
	};
	this._initFSResize = function() {
		if (this.conf.fs_resize == true) {
			return
		}
		this._doOnResizeStart = function() {
			window.clearTimeout(a.conf.fs_tm);
			a.conf.fs_tm = window.setTimeout(a._doOnResizeEnd, 200)
		};
		this._doOnResizeEnd = function() {
			a.setSizes()
		};
		if (typeof (window.addEventListener) == "function") {
			window.addEventListener("resize", this._doOnResizeStart, false)
		} else {
			window.attachEvent("onresize", this._doOnResizeStart)
		}
		this.conf.fs_resize = true
	};
	if (this.conf.fs_mode == true) {
		this._initFSResize()
	}
	this._unloadTop = function() {
		this._mtbUnload();
		this.detachHeader();
		this.detachFooter();
		if (this.conf.fs_mode == true) {
			if (typeof (window.addEventListener) == "function") {
				window.removeEventListener("resize", this._doOnResizeStart,
						false)
			} else {
				window.detachEvent("onresize", this._doOnResizeStart)
			}
		}
		this.base.removeChild(this.cont);
		var e = new RegExp("s{0,}" + this.conf.css + "_base_" + this.conf.skin,
				"gi");
		this.base.className = this.base.className.replace(e, "");
		this.cont = this.base = null;
		a = null
	};
	g = null
}
dhtmlXCellTop.prototype.setOffsets = function(h, g) {
	var e = false;
	for ( var b in h) {
		var c = b.charAt(0);
		if (typeof (this.conf.ofs[c]) != "undefined" && !isNaN(h[b])) {
			this.conf.ofs[c] = parseInt(h[b]);
			e = true
		}
	}
	if (g !== false && typeof (this.setSizes) == "function" && e == true) {
		this.setSizes()
	}
};
dhtmlXCellTop.prototype.attachMenu = function(a) {
	if (this.dataNodes.menu != null) {
		return
	}
	this.dataNodes.menuObj = document.createElement("DIV");
	this.dataNodes.menuObj.className = "dhxcelltop_menu";
	this.base.insertBefore(this.dataNodes.menuObj, this.dataNodes.toolbarObj
			|| this.dataNodes.ribbonObj || this.cont);
	if (typeof (a) != "object" || a == null) {
		a = {}
	}
	a.skin = this.conf.skin;
	a.parent = this.dataNodes.menuObj;
	this.dataNodes.menu = new dhtmlXMenuObject(a);
	this.dataNodes.menuEv = this
			.attachEvent(
					"_onSetSizes",
					function() {
						if (this.dataNodes.menuObj.style.display == "none") {
							return
						}
						if (this.conf.ofs_menu == null) {
							this.dataNodes.menuObj.style.width = this.base.offsetWidth
									- this.conf.ofs.l - this.conf.ofs.r + "px";
							this.conf.ofs_menu = {
								w : this.dataNodes.menuObj.offsetWidth
										- parseInt(this.dataNodes.menuObj.style.width)
							}
						}
						this.dataNodes.menuObj.style.left = this.conf.ofs.l
								+ "px";
						this.dataNodes.menuObj.style.marginTop = (this.dataNodes.haObj != null ? 0
								: this.conf.ofs.t)
								+ "px";
						this.dataNodes.menuObj.style.width = this.base.offsetWidth
								- this.conf.ofs.l
								- this.conf.ofs.r
								- this.conf.ofs_menu.w + "px"
					});
	this.conf.ofs_nodes.t.menuObj = true;
	this.setSizes();
	a.parnt = null;
	a = null;
	return this.dataNodes.menu
};
dhtmlXCellTop.prototype.detachMenu = function() {
	if (this.dataNodes.menu == null) {
		return
	}
	this.dataNodes.menu.unload();
	this.dataNodes.menu = null;
	this.dataNodes.menuObj.parentNode.removeChild(this.dataNodes.menuObj);
	this.dataNodes.menuObj = null;
	this.detachEvent(this.dataNodes.menuEv);
	this.dataNodes.menuEv = null;
	delete this.dataNodes.menu;
	delete this.dataNodes.menuObj;
	delete this.dataNodes.menuEv;
	this.conf.ofs_nodes.t.menuObj = false;
	if (!this.conf.unloading) {
		this.setSizes()
	}
};
dhtmlXCellTop.prototype.attachToolbar = function(a) {
	if (!(this.dataNodes.ribbon == null && this.dataNodes.toolbar == null)) {
		return
	}
	this.dataNodes.toolbarObj = document.createElement("DIV");
	this.dataNodes.toolbarObj.className = "dhxcelltop_toolbar";
	this.base.insertBefore(this.dataNodes.toolbarObj, this.cont);
	this.dataNodes.toolbarObj.appendChild(document.createElement("DIV"));
	if (typeof (a) != "object" || a == null) {
		a = {}
	}
	a.skin = this.conf.skin;
	a.parent = this.dataNodes.toolbarObj.firstChild;
	this.dataNodes.toolbar = new dhtmlXToolbarObject(a);
	this.dataNodes.toolbarEv = this
			.attachEvent(
					"_onSetSizes",
					function() {
						if (this.dataNodes.toolbarObj.style.display == "none") {
							return
						}
						this.dataNodes.toolbarObj.style.left = this.conf.ofs.l
								+ "px";
						this.dataNodes.toolbarObj.style.marginTop = (this.dataNodes.haObj != null
								|| this.dataNodes.menuObj != null ? 0
								: this.conf.ofs.t)
								+ "px";
						this.dataNodes.toolbarObj.style.width = this.base.offsetWidth
								- this.conf.ofs.l - this.conf.ofs.r + "px"
					});
	this.dataNodes.toolbar._masterCell = this;
	this.dataNodes.toolbar.attachEvent("_onIconSizeChange", function() {
		this._masterCell.setSizes()
	});
	this.conf.ofs_nodes.t.toolbarObj = true;
	this.setSizes();
	a.parnt = null;
	a = null;
	return this.dataNodes.toolbar
};
dhtmlXCellTop.prototype.detachToolbar = function() {
	if (this.dataNodes.toolbar == null) {
		return
	}
	this.dataNodes.toolbar._masterCell = null;
	this.dataNodes.toolbar.unload();
	this.dataNodes.toolbar = null;
	this.dataNodes.toolbarObj.parentNode.removeChild(this.dataNodes.toolbarObj);
	this.dataNodes.toolbarObj = null;
	this.detachEvent(this.dataNodes.toolbarEv);
	this.dataNodes.toolbarEv = null;
	this.conf.ofs_nodes.t.toolbarObj = false;
	delete this.dataNodes.toolbar;
	delete this.dataNodes.toolbarObj;
	delete this.dataNodes.toolbarEv;
	if (!this.conf.unloading) {
		this.setSizes()
	}
};
dhtmlXCellTop.prototype.attachRibbon = function(a) {
	if (!(this.dataNodes.ribbon == null && this.dataNodes.toolbar == null)) {
		return
	}
	this.dataNodes.ribbonObj = document.createElement("DIV");
	this.dataNodes.ribbonObj.className = "dhxcelltop_ribbon";
	this.base.insertBefore(this.dataNodes.ribbonObj, this.cont);
	this.dataNodes.ribbonObj.appendChild(document.createElement("DIV"));
	if (typeof (a) != "object" || a == null) {
		a = {}
	}
	a.skin = this.conf.skin;
	a.parent = this.dataNodes.ribbonObj.firstChild;
	this.dataNodes.ribbon = new dhtmlXRibbon(a);
	this.dataNodes.ribbonEv = this
			.attachEvent(
					"_onSetSizes",
					function() {
						if (this.dataNodes.ribbonObj.style.display == "none") {
							return
						}
						this.dataNodes.ribbonObj.style.left = this.conf.ofs.l
								+ "px";
						this.dataNodes.ribbonObj.style.marginTop = (this.dataNodes.haObj != null
								|| this.dataNodes.menuObj != null ? 0
								: this.conf.ofs.t)
								+ "px";
						this.dataNodes.ribbonObj.style.width = this.base.offsetWidth
								- this.conf.ofs.l - this.conf.ofs.r + "px";
						this.dataNodes.ribbon.setSizes()
					});
	this.conf.ofs_nodes.t.ribbonObj = true;
	var b = this;
	this.dataNodes.ribbon.attachEvent("_onHeightChanged", function() {
		b.setSizes()
	});
	this.setSizes();
	a.parnt = null;
	a = null;
	return this.dataNodes.ribbon
};
dhtmlXCellTop.prototype.detachRibbon = function() {
	if (this.dataNodes.ribbon == null) {
		return
	}
	this.dataNodes.ribbon.unload();
	this.dataNodes.ribbon = null;
	this.dataNodes.ribbonObj.parentNode.removeChild(this.dataNodes.ribbonObj);
	this.dataNodes.ribbonObj = null;
	this.detachEvent(this.dataNodes.ribbonEv);
	this.dataNodes.ribbonEv = null;
	this.conf.ofs_nodes.t.ribbonObj = false;
	delete this.dataNodes.ribbon;
	delete this.dataNodes.ribbonObj;
	delete this.dataNodes.ribbonEv;
	if (!this.conf.unloading) {
		this.setSizes()
	}
};
dhtmlXCellTop.prototype.attachStatusBar = function(a) {
	if (this.dataNodes.sbObj) {
		return
	}
	if (typeof (a) == "undefined") {
		a = {}
	}
	this.dataNodes.sbObj = document.createElement("DIV");
	this.dataNodes.sbObj.className = "dhxcelltop_statusbar";
	if (this.cont.nextSibling != null) {
		this.base.insertBefore(this.dataNodes.sbObj, this.cont.nextSibling)
	} else {
		this.base.appendChild(this.dataNodes.sbObj)
	}
	this.dataNodes.sbObj.innerHTML = "<div class='dhxcont_statusbar'>"
			+ (typeof (a.text) == "string" && a.text.length > 0 ? a.text
					: "&nbsp;") + "</div>";
	if (typeof (a.height) == "number") {
		this.dataNodes.sbObj.firstChild.style.height = this.dataNodes.sbObj.firstChild.style.lineHeight = a.height
				+ "px"
	}
	this.dataNodes.sbObj.setText = function(b) {
		this.childNodes[0].innerHTML = b
	};
	this.dataNodes.sbObj.getText = function() {
		return this.childNodes[0].innerHTML
	};
	this.dataNodes.sbObj.onselectstart = function(b) {
		return false
	};
	this.dataNodes.sbEv = this
			.attachEvent(
					"_onSetSizes",
					function() {
						if (this.dataNodes.sbObj.style.display == "none") {
							return
						}
						this.dataNodes.sbObj.style.left = this.conf.ofs.l
								+ "px";
						this.dataNodes.sbObj.style.bottom = (this.dataNodes.faObj != null ? this.dataNodes.faObj.offsetHeight
								: 0)
								+ this.conf.ofs.t + "px";
						this.dataNodes.sbObj.style.width = this.base.offsetWidth
								- this.conf.ofs.l - this.conf.ofs.r + "px"
					});
	this.conf.ofs_nodes.b.sbObj = true;
	this.setSizes();
	return this.dataNodes.sbObj
};
dhtmlXCellTop.prototype.detachStatusBar = function() {
	if (!this.dataNodes.sbObj) {
		return
	}
	this.dataNodes.sbObj.setText = this.dataNodes.sbObj.getText = this.dataNodes.sbObj.onselectstart = null;
	this.dataNodes.sbObj.parentNode.removeChild(this.dataNodes.sbObj);
	this.dataNodes.sbObj = null;
	this.detachEvent(this.dataNodes.sbEv);
	this.dataNodes.sbEv = null;
	this.conf.ofs_nodes.b.sbObj = false;
	delete this.dataNodes.sb;
	delete this.dataNodes.sbObj;
	delete this.dataNodes.sbEv;
	if (!this.conf.unloading) {
		this.setSizes()
	}
};
dhtmlXCellTop.prototype.showMenu = function() {
	this._mtbShowHide("menuObj", "")
};
dhtmlXCellTop.prototype.hideMenu = function() {
	this._mtbShowHide("menuObj", "none")
};
dhtmlXCellTop.prototype.showToolbar = function() {
	this._mtbShowHide("toolbarObj", "")
};
dhtmlXCellTop.prototype.hideToolbar = function() {
	this._mtbShowHide("toolbarObj", "none")
};
dhtmlXCellTop.prototype.showRibbon = function() {
	this._mtbShowHide("ribbonObj", "")
};
dhtmlXCellTop.prototype.hideRibbon = function() {
	this._mtbShowHide("ribbonObj", "none")
};
dhtmlXCellTop.prototype.showStatusBar = function() {
	this._mtbShowHide("sbObj", "")
};
dhtmlXCellTop.prototype.hideStatusBar = function() {
	this._mtbShowHide("sbObj", "none")
};
dhtmlXCellTop.prototype._mtbShowHide = function(b, a) {
	if (this.dataNodes[b] == null) {
		return
	}
	this.dataNodes[b].style.display = a;
	this.setSizes()
};
dhtmlXCellTop.prototype._mtbUnload = function(b, a) {
	this.detachMenu();
	this.detachToolbar();
	this.detachStatusBar();
	this.detachRibbon()
};
dhtmlXCellTop.prototype.getAttachedMenu = function() {
	return this.dataNodes.menu
};
dhtmlXCellTop.prototype.getAttachedToolbar = function() {
	return this.dataNodes.toolbar
};
dhtmlXCellTop.prototype.getAttachedRibbon = function() {
	return this.dataNodes.ribbon
};
dhtmlXCellTop.prototype.getAttachedStatusBar = function() {
	return this.dataNodes.sbObj
};
dhtmlXCellTop.prototype.progressOn = function() {
	if (this.conf.progress) {
		return
	}
	this.conf.progress = true;
	var b = document.createElement("DIV");
	b.className = "dhxcelltop_progress";
	this.base.appendChild(b);
	var a = document.createElement("DIV");
	if (this.conf.skin == "material"
			&& (window.dhx4.isFF || window.dhx4.isChrome || window.dhx4.isOpera || window.dhx4.isEdge)) {
		a.className = "dhxcelltop_progress_svg";
		a.innerHTML = '<svg class="dhx_cell_prsvg" viewBox="25 25 50 50"><circle class="dhx_cell_prcircle" cx="50" cy="50" r="20"/></svg>'
	} else {
		var a = document.createElement("DIV");
		a.className = "dhxcelltop_progress_img"
	}
	this.base.appendChild(a);
	b = a = null
};
dhtmlXCellTop.prototype.progressOff = function() {
	if (!this.conf.progress) {
		return
	}
	var e = {
		dhxcelltop_progress : true,
		dhxcelltop_progress_img : true,
		dhxcelltop_progress_svg : true
	};
	for (var c = 0; c < this.base.childNodes.length; c++) {
		if (typeof (this.base.childNodes[c].className) != "undefined"
				&& e[this.base.childNodes[c].className] == true) {
			e[this.base.childNodes[c].className] = this.base.childNodes[c]
		}
	}
	for ( var b in e) {
		if (e[b] != true) {
			this.base.removeChild(e[b])
		}
		e[b] = null
	}
	this.conf.progress = false;
	e = null
};
dhtmlXCellTop.prototype.attachHeader = function(b, a) {
	if (this.dataNodes.haObj != null) {
		return
	}
	if (typeof (b) != "object") {
		b = document.getElementById(b)
	}
	this.dataNodes.haObj = document.createElement("DIV");
	this.dataNodes.haObj.className = "dhxcelltop_hdr";
	this.dataNodes.haObj.style.height = (a || b.offsetHeight) + "px";
	this.base.insertBefore(this.dataNodes.haObj, this.dataNodes.menuObj
			|| this.dataNodes.toolbarObj || this.cont);
	this.dataNodes.haObj.appendChild(b);
	b.style.visibility = "visible";
	b = null;
	this.dataNodes.haEv = this.attachEvent("_onSetSizes", function() {
		this.dataNodes.haObj.style.left = this.conf.ofs.l + "px";
		this.dataNodes.haObj.style.marginTop = this.conf.ofs.t + "px";
		this.dataNodes.haObj.style.width = this.base.offsetWidth
				- this.conf.ofs.l - this.conf.ofs.r + "px"
	});
	this.conf.ofs_nodes.t.haObj = true;
	this.setSizes()
};
dhtmlXCellTop.prototype.detachHeader = function() {
	if (!this.dataNodes.haObj) {
		return
	}
	while (this.dataNodes.haObj.childNodes.length > 0) {
		this.dataNodes.haObj.lastChild.style.visibility = "hidden";
		document.body.appendChild(this.dataNodes.haObj.lastChild)
	}
	this.dataNodes.haObj.parentNode.removeChild(this.dataNodes.haObj);
	this.dataNodes.haObj = null;
	this.detachEvent(this.dataNodes.haEv);
	this.dataNodes.haEv = null;
	this.conf.ofs_nodes.t.haObj = false;
	delete this.dataNodes.haEv;
	delete this.dataNodes.haObj;
	if (!this.conf.unloading) {
		this.setSizes()
	}
};
dhtmlXCellTop.prototype.attachFooter = function(c, a) {
	if (this.dataNodes.faObj != null) {
		return
	}
	if (typeof (c) != "object") {
		c = document.getElementById(c)
	}
	this.dataNodes.faObj = document.createElement("DIV");
	this.dataNodes.faObj.className = "dhxcelltop_ftr";
	this.dataNodes.faObj.style.height = (a || c.offsetHeight) + "px";
	var b = (this.dataNodes.sbObj || this.cont);
	if (this.base.lastChild == b) {
		this.base.appendChild(this.dataNodes.faObj)
	} else {
		this.base.insertBefore(this.dataNodes.faObj, b.nextSibling)
	}
	this.dataNodes.faEv = this.attachEvent("_onSetSizes", function() {
		this.dataNodes.faObj.style.left = this.conf.ofs.l + "px";
		this.dataNodes.faObj.style.bottom = this.conf.ofs.b + "px";
		this.dataNodes.faObj.style.width = this.base.offsetWidth
				- this.conf.ofs.l - this.conf.ofs.r + "px"
	});
	this.dataNodes.faObj.appendChild(c);
	c.style.visibility = "visible";
	b = c = null;
	this.conf.ofs_nodes.b.faObj = true;
	this.setSizes()
};
dhtmlXCellTop.prototype.detachFooter = function() {
	if (!this.dataNodes.faObj) {
		return
	}
	while (this.dataNodes.faObj.childNodes.length > 0) {
		this.dataNodes.faObj.lastChild.style.visibility = "hidden";
		document.body.appendChild(this.dataNodes.faObj.lastChild)
	}
	this.dataNodes.faObj.parentNode.removeChild(this.dataNodes.faObj);
	this.dataNodes.faObj = null;
	this.detachEvent(this.dataNodes.faEv);
	this.dataNodes.faEv = null;
	this.conf.ofs_nodes.b.faObj = false;
	delete this.dataNodes.faEv;
	delete this.dataNodes.faObj;
	if (!this.conf.unloading) {
		this.setSizes()
	}
};
function dhtmlXWindows(j) {
	var h = this;
	var e = {};
	if (typeof (j) != "undefined") {
		for ( var c in j) {
			e[c] = j[c]
		}
	}
	j = null;
	this.conf = {
		skin : window.dhx4.skin
				|| (typeof (dhtmlx) != "undefined" ? dhtmlx.skin : null)
				|| window.dhx4.skinDetect("dhxwins") || "material",
		vp_pos_ofs : 20,
		vp_custom : false,
		vp_of_auto : (e.vp_overflow == "auto"),
		vp_of_id : window.dhx4.newId(),
		ofs_w : null,
		ofs_h : null,
		button_last : null,
		dblclick_tm : 300,
		dblclick_last : null,
		dblclick_id : null,
		dblclick_mode : "minmax",
		dblclick_active : false,
		dblclick_ev : (window.dhx4.isIE6 || window.dhx4.isIE7 || window.dhx4.isIE8),
		fr_cover : (navigator.userAgent.indexOf("MSIE 6.0") >= 0)
	};
	var b = window.dhx4.transDetect();
	this.conf.tr = {
		prop : b.transProp,
		ev : b.transEv,
		height_open : "height 0.2s cubic-bezier(0.25,0.1,0.25,1)",
		height_close : "height 0.18s cubic-bezier(0.25,0.1,0.25,1)",
		op_open : "opacity 0.16s ease-in",
		op_close : "opacity 0.2s ease-out",
		op_v_open : "1",
		op_v_close : "0.4"
	};
	if (!e.viewport) {
		this.attachViewportTo(document.body)
	} else {
		if (e.viewport.object != null) {
			this.attachViewportTo(e.viewport.object)
		} else {
			if (e.viewport.left != null && e.viewport.top != null
					&& e.viewport.width != null && e.viewport.height != null) {
				this.setViewport(e.viewport.left, e.viewport.top,
						e.viewport.width, e.viewport.height, e.viewport.parent)
			} else {
				this.attachViewportTo(document.body)
			}
		}
	}
	this.w = {};
	this.createWindow = function(m, z, v, n, B) {
		var l = {};
		if (arguments.length == 1 && typeof (m) == "object") {
			l = m
		} else {
			l.id = m;
			l.left = z;
			l.top = v;
			l.width = n;
			l.height = B;
			if (typeof (l.id) == "undefined" || l.id == null) {
				l.id = window.dhx4.newId()
			}
			while (this.w[l.id] != null) {
				l.id = window.dhx4.newId()
			}
		}
		if (l.left == null) {
			l.left = 0
		}
		if (l.top == null) {
			l.top = 0
		}
		l.move = (l.move != null && window.dhx4.s2b(l.move) == false ? false
				: (l.deny_move != null && window.dhx4.s2b(l.deny_move) == true ? false
						: true));
		l.park = (l.park != null && window.dhx4.s2b(l.park) == false ? false
				: (l.deny_park != null && window.dhx4.s2b(l.deny_park) == true ? false
						: true));
		l.resize = (l.resize != null && window.dhx4.s2b(l.resize) == false ? false
				: (l.deny_resize != null
						&& window.dhx4.s2b(l.deny_resize) == true ? false
						: true));
		l.keep_in_viewport = (l.keep_in_viewport != null && window.dhx4
				.s2b(l.keep_in_viewport));
		l.modal = (l.modal != null && window.dhx4.s2b(l.modal));
		l.center = (l.center != null && window.dhx4.s2b(l.center));
		l.text = (l.text != null ? l.text : (l.caption != null ? l.caption
				: "dhtmlxWindow"));
		l.header = (!(l.header != null && window.dhx4.s2b(l.header) == false));
		var C = document.createElement("DIV");
		C.className = "dhxwin_active";
		this.vp.appendChild(C);
		C._isWindow = true;
		C._idd = l.id;
		var q = document.createElement("DIV");
		q.className = "dhxwin_hdr";
		q.style.zIndex = 0;
		q.innerHTML = "<div class='dhxwin_icon'></div><div class='dhxwin_text'><div class='dhxwin_text_inside'>"
				+ l.text + "</div></div><div class='dhxwin_btns'></div>";
		C.appendChild(q);
		q.onselectstart = function(a) {
			a = a || event;
			if (a.preventDefault) {
				a.preventDefault()
			} else {
				a.returnValue = false
			}
			return false
		};
		q.oncontextmenu = function(a) {
			a = a || event;
			a.cancelBubble = true;
			return false
		};
		q._isWinHdr = true;
		q.firstChild._isWinIcon = true;
		var o = document.createElement("DIV");
		o.className = "dhxwin_brd";
		C.appendChild(o);
		var u = document.createElement("DIV");
		u.className = "dhxwin_fr_cover";
		u.innerHTML = "<iframe class='dhxwin_fr_cover_inner' frameborder='0' border='0'></iframe><div class='dhxwin_fr_cover_inner'></div>";
		C.appendChild(u);
		this.w[l.id] = {
			win : C,
			hdr : q,
			brd : o,
			fr_cover : u,
			b : {},
			conf : {
				z_id : window.dhx4.newId(),
				actv : false,
				modal : false,
				maxed : false,
				parked : false,
				sticked : false,
				visible : true,
				header : true,
				text : l.text,
				keep_in_vp : l.keep_in_viewport,
				allow_move : l.move,
				allow_park : l.park,
				allow_resize : l.resize,
				max_w : null,
				max_h : null,
				min_w : 80,
				min_h : 80
			}
		};
		var p = {
			help : {
				title : "Help",
				visible : false
			},
			stick : {
				title : "Stick",
				visible : false
			},
			park : {
				title : "Park",
				visible : true
			},
			minmax : {
				title : "Min/Max",
				visible : true
			},
			close : {
				title : "Close",
				visible : true
			}
		};
		for ( var w in p) {
			var s = new dhtmlXWindowsButton(this, l.id, w, p[w].title, false);
			if (p[w].visible == false) {
				s.hide()
			}
			q.lastChild.appendChild(s.button);
			this.w[l.id].b[w] = s;
			s = null
		}
		this._winAdjustTitle(l.id);
		this.w[l.id].win.style.zIndex = window.dhx4.zim
				.reserve(this.w[l.id].conf.z_id);
		var A = new dhtmlXWindowsCell(l.id, this);
		this.w[l.id].win.insertBefore(A.cell, u);
		this.w[l.id].cell = A;
		if (typeof (window.addEventListener) == "function") {
			this.w[l.id].win.addEventListener("mousedown",
					this._winOnMouseDown, false);
			this.w[l.id].win.addEventListener("mouseup", this._winOnMouseDown,
					false);
			if (this.conf.dblclick_ev) {
				this.w[l.id].win.addEventListener("dblclick",
						this._winOnMouseDown, false)
			}
			if (this.conf.dnd_enabled == true
					&& window.dhx4.dnd.evs.start != null) {
				this.w[l.id].win.addEventListener(window.dhx4.dnd.evs.start,
						this._winOnMouseDown, false);
				if (window.dhx4.dnd.p_en != true) {
					this.w[l.id].win.addEventListener(
							window.dhx4.dnd.evs.start, this._winOnMouseDown,
							false);
					this.w[l.id].win.addEventListener(window.dhx4.dnd.evs.end,
							this._winOnMouseDown, false)
				}
			}
		} else {
			this.w[l.id].win.attachEvent("onmousedown", this._winOnMouseDown);
			this.w[l.id].win.attachEvent("onmouseup", this._winOnMouseDown);
			if (this.conf.dblclick_ev) {
				this.w[l.id].win
						.attachEvent("ondblclick", this._winOnMouseDown)
			}
		}
		this._winInitFRM(l.id);
		this._winSetPosition(l.id, l.left, l.top);
		this._winSetSize(l.id, l.width, l.height);
		this._winMakeActive(l.id);
		if (l.center == true) {
			this.w[l.id].cell.center()
		}
		if (l.modal == true) {
			this.w[l.id].cell.setModal(true)
		}
		if (l.header == false) {
			this.w[l.id].cell.hideHeader()
		}
		f = C = q = o = u = A = null;
		return this.w[l.id].cell
	};
	this._winOnMouseDown = function(l) {
		l = l || event;
		var a = l.target || l.srcElement;
		var k = {
			press_type : l.type
		};
		if (l.type == "MSPointerDown" || l.type == "pointerdown") {
			return
		} else {
			if (h.conf.ev_skip == true) {
				h.conf.ev_skip = false;
				a = null;
				return
			}
		}
		while (a != null && a._isWindow != true) {
			if (typeof (a.className) != "undefined" && k.mode == null) {
				if (typeof (a._buttonName) != "undefined") {
					k.mode = "button";
					k.button_name = a._buttonName
				} else {
					if (a._isWinHdr == true) {
						k.mode = "hdr"
					} else {
						if (a._isWinIcon == true) {
							k.mode = "icon"
						}
					}
				}
			}
			a = a.parentNode
		}
		if (k.mode == null) {
			k.mode = "win"
		}
		k.id = (a != null && a._isWindow == true ? a._idd : null);
		a = null;
		if (k.id != null && h.w[k.id] != null) {
			h.callEvent("_winMouseDown", [ l, k ])
		}
	};
	this._winOnParkTrans = function(k) {
		if (k.stopPropagation) {
			k.stopPropagation()
		}
		var a = h.w[this._idd];
		if (k.propertyName == "opacity") {
			h._winCellClearOpacity(this._idd)
		}
		if (k.propertyName == "height" && a.conf.tr_mode == "park") {
			if (a.conf.tr_mode == "park") {
				a.win.style[h.conf.tr.prop] = "";
				if (!a.conf.parked) {
					h._winAdjustCell(this._idd);
					h._callMainEvent("onParkDown", this._idd);
					if (a.conf.keep_in_vp) {
						h._winAdjustPosition(this._idd, a.conf.x, a.conf.y)
					}
				} else {
					a.hdr.style.zIndex = 3;
					h._callMainEvent("onParkUp", this._idd)
				}
			}
		}
		a = null
	};
	this.unload = function() {
		this.conf.unloading = true;
		if (this._dndInitModule) {
			this._dndUnloadModule()
		}
		for ( var k in this.w) {
			this._winClose(k)
		}
		this.w = null;
		if (this.cm != null && typeof (this._unloadContextMenu) == "function") {
			this._unloadContextMenu()
		}
		window.dhx4._eventable(this, "clear");
		this.attachViewportTo(null);
		for ( var k in this.conf) {
			this.conf[k] = null;
			delete this.conf[k]
		}
		for ( var k in this) {
			this[k] = null
		}
		h = k = null
	};
	window.dhx4._eventable(this);
	this.attachEvent("_winMouseDown", this._winMouseDownHandler);
	if (this._dndInitModule) {
		this._dndInitModule()
	}
	if (e.wins != null) {
		for (var i = 0; i < e.wins.length; i++) {
			var g = e.wins[i];
			this.createWindow(g)
		}
	}
	e = null;
	return this
}
dhtmlXWindows.prototype.forEachWindow = function(c) {
	for ( var b in this.w) {
		c.apply(window, [ this.w[b].cell ])
	}
};
dhtmlXWindows.prototype.window = function(a) {
	if (this.w[a] != null) {
		return this.w[a].cell
	}
	return null
};
dhtmlXWindows.prototype.isWindow = function(a) {
	return (this.w[a] != null)
};
dhtmlXWindows.prototype.findByText = function(e) {
	var c = [];
	for ( var b in this.w) {
		if ((this.w[b].cell.getText()).indexOf(String(e)) >= 0) {
			c.push(this.w[b])
		}
	}
	return c
};
dhtmlXWindows.prototype.setSkin = function(c) {
	if (c == this.conf.skin) {
		return
	}
	if (this.vp != null) {
		this.vp.className = String(this.vp.className).replace(
				"dhxwins_vp_" + this.conf.skin, " dhxwins_vp_" + c)
	}
	for ( var b in this.w) {
		this.w[b].cell._resetSizeState();
		this._winAdjustCell(b);
		this._winAdjustTitle(b)
	}
	this.conf.skin = c
};
dhtmlXWindows.prototype.getBottommostWindow = function() {
	return this._getTopBottomWin(false)
};
dhtmlXWindows.prototype.getTopmostWindow = function() {
	return this._getTopBottomWin(true)
};
dhtmlXWindows.prototype._getTopBottomWin = function(g) {
	var e = null;
	for ( var b in this.w) {
		if (this.w[b].conf.visible) {
			var c = false;
			if (e != null) {
				c = e.z > this.w[b].win.style.zIndex;
				if (g) {
					c = !c
				}
			}
			if (e == null || c) {
				e = {
					win : this.w[b].cell,
					z : this.w[b].win.style.zIndex
				}
			}
		}
	}
	return (e ? e.win : null)
};
dhtmlXWindows.prototype._winMakeActive = function(e, h) {
	if (e != null && h !== true && this.w[e].conf.actv == true) {
		return
	}
	var p = [];
	var l = {};
	for (var c = 0; c < this._zOrder.length; c++) {
		var j = this._zOrder[c].name;
		var g = this._zOrder[c].value;
		var r = [];
		for ( var n in this.w) {
			var o = this.w[n];
			if (l[n] == null && o.conf[j] === g && o.conf.visible == true) {
				if (e != n) {
					window.dhx4.zim.clear(o.conf.z_id);
					r.push([ n, Number(o.win.style.zIndex) ]);
					l[n] = true
				}
			}
			o = null
		}
		r.sort(function(q, k) {
			return (q[1] < k[1] ? 1 : -1)
		});
		if (e != null && this.w[e].conf[j] === g && l[e] == null) {
			window.dhx4.zim.clear(this.w[e].conf.z_id);
			var i = [ [ e, Number(this.w[e].win.style.zIndex) ] ];
			r = i.concat(r);
			l[e] = true
		}
		p = p.concat(r)
	}
	for (var c = p.length - 1; c >= 0; c--) {
		var n = p[c][0];
		var o = this.w[n];
		o.win.style.zIndex = window.dhx4.zim.reserve(o.conf.z_id);
		if (o.conf.modal && this.mcover != null) {
			for ( var m in this.mcover) {
				this.mcover[m].style.zIndex = o.win.style.zIndex
			}
		}
		this._winAdjustFRMZIndex(n);
		if (e == null && c == 0) {
			e = n
		}
		o.conf.actv = (e == n);
		o.win.className = (o.conf.actv ? "dhxwin_active" : "dhxwin_inactive");
		o = null
	}
	if (e != null && this.conf.last_active != e) {
		this._callMainEvent("onFocus", e)
	}
	this.conf.last_active = e
};
dhtmlXWindows.prototype._zOrder = [ {
	name : "modal",
	value : true
}, {
	name : "sticked",
	value : true
}, {
	name : "sticked",
	value : false
} ];
dhtmlXWindows.prototype._vpPull = {};
dhtmlXWindows.prototype._vpOf = {};
dhtmlXWindows.prototype._vpPullAdd = function() {
	if (this.vp == null) {
		return
	}
	var c = null;
	for ( var b in this._vpPull) {
		if (this._vpPull[b].vp == this.vp) {
			this._vpPull[b].count++;
			c = b
		}
	}
	if (c == null) {
		this._vpPull[window.dhx4.newId()] = {
			vp : this.vp,
			count : 1
		}
	}
	if (this.vp == document.body && this.conf.vp_of_auto == true) {
		this._vpOfInit()
	}
	this._vpOfUpd()
};
dhtmlXWindows.prototype._vpPullRemove = function() {
	if (this.vp == null) {
		return 0
	}
	var c = 0;
	for ( var b in this._vpPull) {
		if (this._vpPull[b].vp == this.vp) {
			c = --this._vpPull[b].count;
			if (c == 0) {
				this._vpPull[b].vp = null;
				this._vpPull[b].count = null;
				delete this._vpPull[b]
			}
		}
	}
	this._vpOfClear();
	return c
};
dhtmlXWindows.prototype._vpOfInit = function() {
	this._vpOf[this.conf.vp_of_id] = true
};
dhtmlXWindows.prototype._vpOfClear = function() {
	this._vpOf[this.conf.vp_of_id] = false;
	delete this._vpOf[this.conf.vp_of_id];
	this._vpOfUpd()
};
dhtmlXWindows.prototype._vpOfUpd = function() {
	var c = false;
	for ( var b in this._vpOf) {
		c = c || this._vpOf[b]
	}
	if (c == true) {
		if (document.body.className.match(/dhxwins_vp_auto/) == null) {
			document.body.className += " dhxwins_vp_auto"
		}
	} else {
		if (document.body.className.match(/dhxwins_vp_auto/) != null) {
			document.body.className = String(document.body.className).replace(
					/\s{0,}dhxwins_vp_auto/gi, "")
		}
	}
};
dhtmlXWindows.prototype.attachViewportTo = function(g) {
	var c = this._vpPullRemove();
	if (this.conf.vp_custom) {
		while (this.vp.childNodes.length > 0) {
			this.vp.removeChild(this.vp.lastChild)
		}
		this.vp.parentNode.removeChild(this.vp);
		this.vp = null
	} else {
		if (this.vp != null && c == 0) {
			this.vp.className = String(this.vp.className).replace(
					new RegExp("\\s{1,}dhxwins_vp_" + this.conf.skin), "")
		}
	}
	if (g == null) {
		this.vp = null
	} else {
		this.vp = (typeof (g) == "string" ? document.getElementById(g) : g);
		var e = "dhxwins_vp_" + this.conf.skin;
		if (this.vp.className.indexOf(e) < 0) {
			this.vp.className += " " + e
		}
		g = null;
		for ( var b in this.w) {
			this.vp.appendChild(this.w[b].win)
		}
		this.conf.vp_custom = false
	}
	if (this.vp == document.body) {
		document.body.style.position = "static"
	}
	this._vpPullAdd()
};
dhtmlXWindows.prototype.setViewport = function(b, h, e, a, g) {
	var c = document.createElement("DIV");
	c.style.position = "absolute";
	c.style.left = b + "px";
	c.style.top = h + "px";
	c.style.width = e + "px";
	c.style.height = a + "px";
	if (typeof (g) == "undefined" || g == null) {
		g = document.body
	} else {
		if (typeof (g) == "string") {
			g = document.getElementById(g)
		}
	}
	g.appendChild(c);
	this.attachViewportTo(c);
	this.conf.vp_custom = true;
	g = c = null
};
dhtmlXWindows.prototype._winSetPosition = function(e, a, c) {
	var b = this.w[e];
	if (b.conf.maxed) {
		b.conf.lastMX += (a - b.conf.x);
		b.conf.lastMY += (c - b.conf.y)
	}
	b.conf.x = a;
	b.conf.y = c;
	b.win.style.left = b.conf.x + "px";
	b.win.style.top = b.conf.y + "px";
	this._winAdjustFRMPosition(e);
	b = null
};
dhtmlXWindows.prototype._winAdjustPosition = function(i, b, h) {
	var c = this.w[i];
	if (typeof (b) == "undefined") {
		b = c.conf.x
	}
	if (typeof (h) == "undefined") {
		h = c.conf.y
	}
	var a = (c.conf.keep_in_vp ? 0 : -c.conf.w + this.conf.vp_pos_ofs);
	var g = (c.conf.keep_in_vp ? this.vp.clientWidth - c.conf.w
			: this.vp.clientWidth - this.conf.vp_pos_ofs);
	if (b < a) {
		b = a
	} else {
		if (b > g) {
			b = g
		}
	}
	var e = (c.conf.keep_in_vp ? this.vp.clientHeight - c.conf.h
			: this.vp.clientHeight - this.conf.vp_pos_ofs);
	if (h < 0) {
		h = 0
	} else {
		if (h > e) {
			h = e
		}
	}
	if (b != c.conf.x || h != c.conf.y) {
		this._winSetPosition(i, b, h)
	}
	c = null
};
dhtmlXWindows.prototype._winSetSize = function(j, h, c, i, b) {
	var e = this.w[j];
	var a = (h != null ? h : e.conf.w);
	var g = (c != null ? c : e.conf.h);
	if (this.conf.ofs_w == null) {
		e.win.style.width = a + "px";
		e.win.style.height = g + "px";
		this.conf.ofs_w = e.win.offsetWidth - a;
		this.conf.ofs_h = e.win.offsetHeight - g
	}
	if (e.conf.min_w != null && a < e.conf.min_w) {
		a = e.conf.min_w
	}
	if (e.conf.max_w != null && a > e.conf.max_w) {
		a = e.conf.max_w
	}
	if (!e.conf.parked && e.conf.min_h != null && g < e.conf.min_h) {
		g = e.conf.min_h
	}
	if (e.conf.max_h != null && g > e.conf.max_h) {
		g = e.conf.max_h
	}
	if (e.conf.keep_in_vp) {
		if (a > this.vp.clientWidth) {
			a = this.vp.clientWidth
		}
		if (g > this.vp.clientHeight) {
			g = this.vp.clientHeight
		}
	}
	e.win.style.width = a - this.conf.ofs_w + "px";
	e.win.style.height = g - this.conf.ofs_h + "px";
	e.conf.w = a;
	e.conf.h = g;
	this._winAdjustFRMSize(j);
	if (b) {
		this._winAdjustPosition(j, e.conf.x, e.conf.y)
	}
	if (!e.conf.parked && i != true) {
		this._winAdjustCell(j)
	}
	e = null
};
dhtmlXWindows.prototype._winMinmax = function(g, c) {
	if (typeof (c) != "undefined" && this.w[g].conf.maxed == c) {
		return
	}
	if (this.w[g].conf.allow_resize == false) {
		return
	}
	var b = this.w[g];
	if (b.conf.parked) {
		this._winPark(g, false)
	}
	if (b.conf.maxed) {
		this._winSetSize(g, b.conf.lastMW, b.conf.lastMH);
		this._winAdjustPosition(g, b.conf.lastMX, b.conf.lastMY);
		b.conf.maxed = false
	} else {
		var a = 0;
		var e = 0;
		if (b.conf.max_w != null) {
			a = b.conf.x + Math.round(b.conf.w - b.conf.max_w) / 2
		}
		if (b.conf.max_h != null) {
			e = Math.max(b.conf.y + Math.round(b.conf.h - b.conf.max_h) / 2, 0)
		}
		b.conf.lastMX = b.conf.x;
		b.conf.lastMY = b.conf.y;
		b.conf.lastMW = b.conf.w;
		b.conf.lastMH = b.conf.h;
		this._winSetSize(g, this.vp.clientWidth, this.vp.clientHeight);
		this._winAdjustPosition(g, a, e);
		b.conf.maxed = true
	}
	b.b.minmax.setCss(b.conf.maxed ? "minmaxed" : "minmax");
	if (b.conf.maxed) {
		this._callMainEvent("onMaximize", g)
	} else {
		this._callMainEvent("onMinimize", g)
	}
	this._callMainEvent("onResizeFinish", g);
	b = null
};
dhtmlXWindows.prototype._winShow = function(b, a) {
	if (this.w[b].conf.visible == true) {
		return
	}
	this.w[b].win.style.display = "";
	this.w[b].conf.visible = true;
	if (a == true || this.conf.last_active == null) {
		this._winMakeActive(b, true)
	}
	this._callMainEvent("onShow", b)
};
dhtmlXWindows.prototype._winHide = function(b, a) {
	if (this.w[b].conf.visible == false) {
		return
	}
	this.w[b].win.style.display = "none";
	this.w[b].conf.visible = false;
	if (this.w[b].conf.actv) {
		this.w[b].conf.actv = false;
		this.w[b].win.className = "dhxwin_inactive";
		this._winMakeActive(null, true)
	}
	this._callMainEvent("onHide", b)
};
dhtmlXWindows.prototype._winPark = function(c, a) {
	if (this.w[c].conf.allow_park == false) {
		return
	}
	if (this.w[c].conf.header == false) {
		return
	}
	var b = this.w[c];
	if (a == true && this.conf.tr.prop !== false) {
		b.win.style[this.conf.tr.prop] = this.conf.tr[b.conf.parked ? "height_open"
				: "height_close"];
		if (!b.conf.tr_ev) {
			b.win
					.addEventListener(this.conf.tr.ev, this._winOnParkTrans,
							false);
			b.conf.tr_ev = true
		}
	}
	if (b.conf.parked) {
		b.hdr.className = String(b.hdr.className).replace(
				/\s{1,}dhxwin_hdr_parked/gi, "");
		b.hdr.style.zIndex = 0;
		b.conf.parked = false;
		b.conf.tr_mode = "park";
		this._winCellSetOpacity(c, "open", a);
		this._winSetSize(c, b.conf.w, b.conf.lastPH,
				(a == true && this.conf.tr.prop !== false));
		if (!(a == true && this.conf.tr.prop !== false)) {
			this._callMainEvent("onParkDown", c);
			if (b.conf.keep_in_vp) {
				this._winAdjustPosition(c, b.conf.x, b.conf.y)
			}
		}
		if (window.dhx4.isIE8 == true && this.conf.tr.prop == false
				&& b.cell.cell.className.match(/dhxwin_parked/) != null) {
			b.cell.cell.className = b.cell.cell.className.replace(
					/\s{0,}dhxwin_parked/gi, "")
		}
	} else {
		b.conf.lastPH = b.conf.h;
		b.hdr.className += " dhxwin_hdr_parked";
		if (a == false || this.conf.tr.prop == false) {
			b.hdr.style.zIndex = 3
		}
		b.conf.parked = true;
		b.conf.tr_mode = "park";
		this._winCellSetOpacity(c, "close", a);
		this._winSetSize(c, b.conf.w, b.hdr.offsetHeight + this.conf.ofs_h,
				(a == true && this.conf.tr.prop !== false));
		if (!(a == true && this.conf.tr.prop !== false)) {
			this._callMainEvent("onParkUp", c)
		}
		if (window.dhx4.isIE8 == true && this.conf.tr.prop == false
				&& b.cell.cell.className.match(/dhxwin_parked/) == null) {
			b.cell.cell.className += " dhxwin_parked"
		}
	}
	b = null
};
dhtmlXWindows.prototype._winCellSetOpacity = function(i, h, c, g) {
	var b = this.w[i].cell;
	for ( var e in b.conf.idx) {
		if ({
			pr1 : true,
			pr2 : true
		}[e] != true) {
			if (c == true && this.conf.tr.prop != false) {
				b.cell.childNodes[b.conf.idx[e]].style[this.conf.tr.prop] = this.conf.tr["op_"
						+ h]
			}
			b.cell.childNodes[b.conf.idx[e]].style.opacity = this.conf.tr["op_v_"
					+ h]
		}
	}
	b = null
};
dhtmlXWindows.prototype._winCellClearOpacity = function(e) {
	var b = this.w[e].cell;
	for ( var c in b.conf.idx) {
		if ({
			pr1 : true,
			pr2 : true
		}[c] != true) {
			if (this.conf.tr.prop != false) {
				b.cell.childNodes[b.conf.idx[c]].style[this.conf.tr.prop] = ""
			}
		}
	}
	b = null
};
dhtmlXWindows.prototype._winStick = function(b, a) {
	if (typeof (a) != "undefined" && this.w[b].conf.sticked == a) {
		return
	}
	this.w[b].conf.sticked = !this.w[b].conf.sticked;
	this.w[b].b.stick.setCss(this.w[b].conf.sticked ? "sticked" : "stick");
	this._winMakeActive(this.conf.last_active, true);
	if (this.w[b].conf.sticked) {
		this._callMainEvent("onStick", b)
	} else {
		this._callMainEvent("onUnStick", b)
	}
};
dhtmlXWindows.prototype._winClose = function(e) {
	if (this._callMainEvent("onClose", e) !== true
			&& this.conf.unloading != true) {
		return
	}
	var c = this.w[e];
	if (c.conf.fs_mode) {
		c.cell.setToFullScreen(false)
	}
	if (c.conf.modal) {
		this._winSetModal(e, false)
	}
	window.dhx4.zim.clear(c.conf.z_id);
	if (this.cm != null && this.cm.icon[e] != null) {
		this._detachContextMenu("icon", e, null)
	}
	if (typeof (window.addEventListener) == "function") {
		c.win.removeEventListener("mousedown", this._winOnMouseDown, false);
		c.win.removeEventListener("mouseup", this._winOnMouseDown, false);
		if (this.conf.dblclick_ev) {
			c.win.removeEventListener("dblclick", this._winOnMouseDown, false)
		}
		if (this.conf.dnd_enabled == true && window.dhx4.dnd.evs.start != null) {
			c.win.removeEventListener(window.dhx4.dnd.evs.start,
					this._winOnMouseDown, false);
			if (window.dhx4.dnd.p_en != true) {
				c.win.removeEventListener(window.dhx4.dnd.evs.start,
						this._winOnMouseDown, false);
				c.win.removeEventListener(window.dhx4.dnd.evs.end,
						this._winOnMouseDown, false)
			}
		}
	} else {
		c.win.detachEvent("onmousedown", this._winOnMouseDown);
		c.win.detachEvent("onmouseup", this._winOnMouseDown);
		if (this.conf.dblclick_ev) {
			c.win.attachEvent("ondblclick", this._winOnMouseDown)
		}
	}
	for ( var b in c.b) {
		this._winRemoveButton(e, b, true)
	}
	c.b = null;
	c.cell._unload();
	c.cell = null;
	c.brd.parentNode.removeChild(c.brd);
	c.brd = null;
	if (c.fr_cover != null) {
		c.fr_cover.parentNode.removeChild(c.fr_cover);
		c.fr_cover = null
	}
	if (c.fr_m_cover != null) {
		c.fr_m_cover.parentNode.removeChild(c.fr_m_cover);
		c.fr_m_cover = null
	}
	c.hdr._isWinHdr = true;
	c.hdr.firstChild._isWinIcon = true;
	c.hdr.onselectstart = null;
	c.hdr.parentNode.removeChild(c.hdr);
	c.hdr = null;
	for ( var b in c.conf) {
		c.conf[b] = null;
		delete c.conf[b]
	}
	c.conf = null;
	c.win._idd = null;
	c.win._isWindow = null;
	c.win.parentNode.removeChild(c.win);
	c.win = null;
	c = null;
	this.w[e] = null;
	delete this.w[e];
	if (!this.conf.unloading) {
		this._winMakeActive(null, true)
	}
};
dhtmlXWindows.prototype._winSetModal = function(i, e, h) {
	if (this.w[i].conf.modal == e) {
		return
	}
	if (typeof (h) == "undefined") {
		h = true
	}
	var c = this.w[i];
	if (e == true && c.conf.modal == false) {
		if (this.conf.last_modal != null) {
			this._winSetModal(this.conf.last_modal, false, false)
		}
		if (this.mcover == null) {
			var g = document.createElement("DIV");
			g.className = "dhxwins_mcover";
			this.vp.insertBefore(g, c.fr_m_cover || c.win);
			this.mcover = {
				d : g
			};
			if (this.conf.fr_cover) {
				this.mcover.f = document.createElement("IFRAME");
				this.mcover.f.className = "dhxwins_mcover";
				this.mcover.f.border = 0;
				this.mcover.f.frameBorder = 0;
				this.vp.insertBefore(this.mcover.f, g)
			}
			g = null
		} else {
			if (this.mcover.d.nextSibling != (c.fr_m_cover || c.win)) {
				this.vp.insertBefore(this.mcover.d, c.fr_m_cover || c.win);
				if (this.mcover.f != null) {
					this.vp.insertBefore(this.mcover.f, this.mcover.d)
				}
			}
		}
		c.conf.modal = true;
		this.conf.last_modal = i;
		this._winMakeActive(i, true)
	} else {
		if (e == false && c.conf.modal == true) {
			c.conf.modal = false;
			this.conf.last_modal = null;
			if (h && this.mcover != null) {
				for ( var b in this.mcover) {
					this.vp.removeChild(this.mcover[b]);
					this.mcover[b] = null
				}
				this.mcover = null
			}
		}
	}
	c = null
};
dhtmlXWindows.prototype._winMouseDownHandler = function(c, b) {
	var a = c.target || c.srcElement;
	if (c.button >= 2) {
		return
	}
	if (b.mode == "button") {
		if (b.press_type == "mousedown") {
			this.conf.button_last = b.button_name
		} else {
			if ((b.press_type == "mouseup" && b.button_name == this.conf.button_last)
					|| b.press_type == "MSPointerDown"
					|| b.press_type == "pointerdown") {
				this.conf.button_last = null;
				if (this._winButtonClick(b.id, b.button_name, c) !== true) {
					return
				}
			}
		}
	}
	if ((b.press_type == "pointerdown" || b.press_type == "mousedown" || b.press_type == "dblclick")
			&& b.mode == "hdr") {
		this.conf.dblclick_active = false;
		if (this.conf.dblclick_ev == true) {
			if (b.press_type == "dblclick") {
				this.conf.dblclick_active = true
			}
		} else {
			if (this.conf.dblclick_last == null) {
				this.conf.dblclick_last = new Date().getTime();
				this.dblclick_id = b.id
			} else {
				var a = new Date().getTime();
				if (this.conf.dblclick_last + this.conf.dblclick_tm > a
						&& this.dblclick_id == b.id) {
					this.conf.dblclick_active = true;
					this.conf.dblclick_last = null;
					this.dblclick_id = null
				} else {
					this.conf.dblclick_last = a;
					this.dblclick_id = b.id
				}
			}
		}
		if (this.conf.dblclick_active) {
			this._winDoHeaderDblClick(b.id);
			return
		}
	}
	if (b.press_type == "mousedown"
			|| (b.press_type == window.dhx4.dnd.evs.start)) {
		this._winMakeActive(b.id)
	}
	if (b.press_type == "touchend") {
	}
};
dhtmlXWindows.prototype._winDoHeaderDblClick = function(a) {
	if (this.conf.dblclick_mode == "minmax") {
		this._winMinmax(a);
		return
	}
	if (this.conf.dblclick_mode == "park") {
		this._winPark(a, true);
		return
	}
	if (typeof (this.conf.dblclick_mode) == "function") {
		this.conf.dblclick_mode.apply(window, [ a ]);
		return
	}
	if (typeof (window[this.conf.dblclick_mode]) == "function") {
		window[this.conf.dblclick_mode].apply(window, [ a ]);
		return
	}
};
dhtmlXWindows.prototype._winAdjustCell = function(b) {
	var l = this.w[b];
	if (this.conf.skin == "material") {
		var k = 0;
		var j = (l.conf.header ? l.hdr.offsetHeight : 1);
		var e = l.win.clientWidth;
		var m = l.win.clientHeight - j
	} else {
		var k = 1;
		var j = (l.conf.header ? l.hdr.offsetHeight : 1);
		var e = l.win.clientWidth - 2;
		var m = l.win.clientHeight - j - 1
	}
	l.brd.style.left = k + "px";
	l.brd.style.top = j + "px";
	if (l.conf.brd == null) {
		l.brd.style.width = e + "px";
		l.brd.style.height = m + "px";
		l.conf.brd = {
			w : e - l.brd.offsetWidth,
			h : m - l.brd.offsetHeight
		}
	}
	l.brd.style.width = e + l.conf.brd.w + "px";
	l.brd.style.height = m + l.conf.brd.h + "px";
	var c = 5;
	if (this.conf.skin == "material") {
		c = 1
	}
	var a = 1 + c;
	var i = (l.conf.header ? j : j + c);
	var g = l.brd.clientWidth;
	var h = l.brd.clientHeight;
	l.cell._setSize(a, i, g, h);
	l.fr_cover.style.left = a + "px";
	l.fr_cover.style.top = i + "px";
	l.fr_cover.style.width = g + "px";
	l.fr_cover.style.height = h + "px";
	l = null
};
dhtmlXWindows.prototype._winAdjustTitle = function(g) {
	var b = this.w[g].hdr.childNodes[0];
	var e = this.w[g].hdr.childNodes[1];
	var c = this.w[g].hdr.childNodes[2];
	var a = (this.conf.skin == "material" ? 7 : 0);
	e.style.paddingLeft = b.offsetWidth + 12 + a + "px";
	e.style.paddingRight = c.offsetWidth + 10 + a + "px";
	e = c = b = null
};
dhtmlXWindows.prototype._callMainEvent = function(b, e) {
	var a = this.w[e];
	if (a.cell.checkEvent(b)) {
		var c = a.cell._callMainEvent(b, [ a.cell ])
	} else {
		var c = this.callEvent(b, [ a.cell ])
	}
	a = null;
	return c
};
dhtmlXWindows.prototype._winInitFRM = function(c) {
	if (this.conf.fr_cover != true) {
		return
	}
	var a = this.w[c];
	var b = document.createElement("IFRAME");
	b.className = "dhxwin_main_fr_cover";
	b.border = 0;
	b.frameBorder = 0;
	b.style.zIndex = a.win.style.zIndex;
	a.win.parentNode.insertBefore(b, a.win);
	a.fr_m_cover = b;
	b = null
};
dhtmlXWindows.prototype._winAdjustFRMSize = function(b) {
	var a = this.w[b];
	if (a.fr_m_cover != null) {
		a.fr_m_cover.style.width = a.conf.w + "px";
		a.fr_m_cover.style.height = a.conf.h + "px"
	}
	a = null
};
dhtmlXWindows.prototype._winAdjustFRMPosition = function(b) {
	var a = this.w[b];
	if (a.fr_m_cover != null) {
		a.fr_m_cover.style.left = a.win.style.left;
		a.fr_m_cover.style.top = a.win.style.top
	}
	a = null
};
dhtmlXWindows.prototype._winAdjustFRMZIndex = function(b) {
	var a = this.w[b];
	if (a.fr_m_cover != null) {
		a.fr_m_cover.style.zIndex = a.win.style.zIndex
	}
	a = null
};
function dhtmlXWindowsCell(g, e) {
	dhtmlXCellObject.apply(this, [ g, "_wins" ]);
	this.wins = e;
	this.cell._winId = g;
	this.conf.skin = this.wins.conf.skin;
	this.attachEvent("_onCellUnload", function() {
		if (this._unloadResize) {
			this._unloadResize()
		}
		window.dhx4._eventable(this.cell, "clear");
		this.cell._winId = null;
		this.wins = null;
		this.setText = null;
		this.getText = null;
		this.allowMove = null;
		this.denyMove = null;
		this.isMovable = null;
		this.allowResize = null;
		this.denyResize = null;
		this.isResizable = null;
		this.maximize = null;
		this.minimize = null;
		this.isMaximized = null;
		this.setPosition = null;
		this.getPosition = null;
		this.adjustPosition = null;
		this.park = null;
		this.isParked = null;
		this.allowPark = null;
		this.denyPark = null;
		this.isParkable = null;
		this.show = null;
		this.hide = null;
		this.isHidden = null;
		this.stick = null;
		this.unstick = null;
		this.isSticked = null;
		this.setDimension = null;
		this.getDimension = null;
		this.setMinDimension = null;
		this.getMinDimension = null;
		this.setMaxDimension = null;
		this.getMaxDimension = null;
		this.keepInViewport = null;
		this.center = null;
		this.centerOnScreen = null;
		this.bringToTop = null;
		this.bringToBottom = null;
		this.isOnTop = null;
		this.isOnBottom = null;
		this.showHeader = null;
		this.hideHeader = null;
		this.setModal = null;
		this.isModal = null;
		this.close = null;
		this._adjustByCont = null;
		this.button = null;
		this.addUserButton = null;
		this.removeUserButton = null;
		c = null
	});
	this.attachEvent("_onContentLoaded", function() {
		this.wins._callMainEvent("onContentLoaded", this._idd)
	});
	this.attachEvent("_onContentMouseDown", function(h, a) {
		this.wins.callEvent("_winMouseDown", [ a, {
			id : h,
			mode : "win"
		} ])
	});
	this._callMainEvent = function(h, a) {
		return this.callEvent(h, a)
	};
	this.conf.tr = {};
	for ( var b in this.wins.conf.tr) {
		this.conf.tr[b] = this.wins.conf.tr[b]
	}
	if (this.conf.tr.prop != false) {
	}
	if (this._initResize) {
		this._initResize()
	}
	window.dhx4._eventable(this.cell);
	var c = this;
	this.cell.attachEvent("_setCellSize", function(a, k) {
		var i = c.wins.w[this._winId].conf.w - c.conf.size.w;
		var j = c.wins.w[this._winId].conf.h - c.conf.size.h;
		c.setDimension(a + i, k + j)
	});
	return this
}
dhtmlXWindowsCell.prototype = new dhtmlXCellObject();
dhtmlXWindowsCell.prototype.setText = function(a) {
	this.wins.w[this._idd].conf.text = a;
	this.wins.w[this._idd].hdr.childNodes[1].firstChild.innerHTML = a
};
dhtmlXWindowsCell.prototype.getText = function() {
	return this.wins.w[this._idd].conf.text
};
dhtmlXWindowsCell.prototype.allowMove = function() {
	this.wins.w[this._idd].conf.allow_move = true
};
dhtmlXWindowsCell.prototype.denyMove = function() {
	this.wins.w[this._idd].conf.allow_move = false
};
dhtmlXWindowsCell.prototype.isMovable = function() {
	return (this.wins.w[this._idd].conf.allow_move == true)
};
dhtmlXWindowsCell.prototype.allowResize = function() {
	this.wins.w[this._idd].conf.allow_resize = true;
	this.wins.w[this._idd].b.minmax.enable()
};
dhtmlXWindowsCell.prototype.denyResize = function() {
	this.wins.w[this._idd].conf.allow_resize = false;
	this.wins.w[this._idd].b.minmax.disable()
};
dhtmlXWindowsCell.prototype.isResizable = function() {
	return (this.wins.w[this._idd].conf.allow_resize == true)
};
dhtmlXWindowsCell.prototype.maximize = function() {
	this.wins._winMinmax(this._idd, true)
};
dhtmlXWindowsCell.prototype.minimize = function() {
	this.wins._winMinmax(this._idd, false)
};
dhtmlXWindowsCell.prototype.isMaximized = function() {
	return (this.wins.w[this._idd].conf.maxed == true)
};
dhtmlXWindowsCell.prototype.setPosition = function(a, b) {
	this.wins._winSetPosition(this._idd, a, b)
};
dhtmlXWindowsCell.prototype.getPosition = function() {
	var a = this.wins.w[this._idd];
	var b = [ a.conf.x, a.conf.y ];
	a = null;
	return b
};
dhtmlXWindowsCell.prototype.adjustPosition = function() {
	this.wins._winAdjustPosition(this._idd)
};
dhtmlXWindowsCell.prototype.park = function() {
	this.wins._winPark(this._idd, true)
};
dhtmlXWindowsCell.prototype.isParked = function() {
	return (this.wins.w[this._idd].conf.parked == true)
};
dhtmlXWindowsCell.prototype.allowPark = function() {
	this.wins.w[this._idd].conf.allow_park = true;
	this.wins.w[this._idd].b.park.enable()
};
dhtmlXWindowsCell.prototype.denyPark = function() {
	this.wins.w[this._idd].conf.allow_park = false;
	this.wins.w[this._idd].b.park.disable()
};
dhtmlXWindowsCell.prototype.isParkable = function() {
	return (this.wins.w[this._idd].conf.allow_park == true)
};
dhtmlXWindowsCell.prototype.show = function(a) {
	this.wins._winShow(this._idd, window.dhx4.s2b(a))
};
dhtmlXWindowsCell.prototype.hide = function() {
	this.wins._winHide(this._idd)
};
dhtmlXWindowsCell.prototype.isHidden = function() {
	return (this.wins.w[this._idd].conf.visible != true)
};
dhtmlXWindowsCell.prototype.stick = function() {
	this.wins._winStick(this._idd, true)
};
dhtmlXWindowsCell.prototype.unstick = function() {
	this.wins._winStick(this._idd, false)
};
dhtmlXWindowsCell.prototype.isSticked = function() {
	return (this.wins.w[this._idd].conf.sticked == true)
};
dhtmlXWindowsCell.prototype.setDimension = function(c, a) {
	var b = this.wins.w[this._idd];
	if (b.conf.parked) {
		this.wins._winPark(this._idd, false)
	}
	if (b.conf.maxed) {
		if (c != null) {
			b.conf.lastMW = c
		}
		if (a != null) {
			b.conf.lastMH = a
		}
		this.wins._winMinmax(this._idd)
	} else {
		this.wins._winSetSize(this._idd, c, a, false, true)
	}
	b = null
};
dhtmlXWindowsCell.prototype.getDimension = function() {
	var a = this.wins.w[this._idd];
	var b = [ a.conf.w, a.conf.h ];
	a = null;
	return b
};
dhtmlXWindowsCell.prototype.setMinDimension = function(c, a) {
	var b = this.wins.w[this._idd];
	b.conf.min_w = c;
	b.conf.min_h = a;
	this.wins._winSetSize(this._idd, b.conf.w, b.conf.h);
	b = null
};
dhtmlXWindowsCell.prototype.getMinDimension = function() {
	var a = this.wins.w[this._idd];
	var b = [ a.conf.min_w, a.conf.min_h ];
	a = null;
	return b
};
dhtmlXWindowsCell.prototype.setMaxDimension = function(c, a) {
	var b = this.wins.w[this._idd];
	b.conf.max_w = c;
	b.conf.max_h = a;
	this.wins._winSetSize(this._idd, b.conf.w, b.conf.h);
	b = null
};
dhtmlXWindowsCell.prototype.getMaxDimension = function() {
	var a = this.wins.w[this._idd];
	var b = [ a.conf.max_w, a.conf.max_h ];
	a = null;
	return b
};
dhtmlXWindowsCell.prototype.keepInViewport = function(a) {
	this.wins.w[this._idd].conf.keep_in_vp = window.dhx4.s2b(a)
};
dhtmlXWindowsCell.prototype.center = function() {
	var c = this.wins.vp;
	var b = this.wins.w[this._idd];
	var a = Math.round((c.clientWidth - b.conf.w) / 2);
	var e = Math.round((c.clientHeight - b.conf.h) / 2);
	this.wins._winSetPosition(this._idd, a, e);
	c = b = null
};
dhtmlXWindowsCell.prototype.centerOnScreen = function() {
	var b = this.wins.w[this._idd];
	var h = window.dhx4.screenDim();
	var g = window.dhx4.absLeft(this.wins.vp);
	var e = window.dhx4.absTop(this.wins.vp);
	var c = this.wins.vp.parentNode;
	while (c != null) {
		if (c.scrollLeft) {
			g = g - c.scrollLeft
		}
		if (c.scrollTop) {
			e = e - c.scrollTop
		}
		c = c.parentNode
	}
	var a = Math.round((h.right - h.left - b.conf.w) / 2);
	var i = Math.round((h.bottom - h.top - b.conf.h) / 2);
	this.wins._winAdjustPosition(this._idd, a - g, i - e);
	d = b = null
};
dhtmlXWindowsCell.prototype.bringToTop = function() {
	this.wins._winMakeActive(this._idd, true)
};
dhtmlXWindowsCell.prototype.bringToBottom = function() {
	var a = (this.wins.w[this._idd].conf.actv ? null
			: this.wins.conf.last_active);
	window.dhx4.zim.clear(this.wins.w[this._idd].conf.z_id);
	this.wins.w[this._idd].win.style.zIndex = 0;
	this.wins._winMakeActive(a, true)
};
dhtmlXWindowsCell.prototype.isOnTop = function() {
	return (this.wins.w[this._idd].conf.actv == true)
};
dhtmlXWindowsCell.prototype.isOnBottom = function() {
	var c = {
		id : null,
		z : +Infinity
	};
	for ( var b in this.wins.w) {
		if (this.wins.w[b].conf.visible
				&& this.wins.w[b].win.style.zIndex < c.z) {
			c.id = b;
			c.z = this.wins.w[b].win.style.zIndex
		}
	}
	return (c.id == this._idd)
};
dhtmlXWindowsCell.prototype.showHeader = function() {
	var a = this.wins.w[this._idd];
	if (a.conf.header == false) {
		a.hdr.className = String(a.hdr.className).replace(
				/\s{0,}dhxwin_hdr_hidden/gi, "");
		a.brd.className = String(a.brd.className).replace(
				/\s{0,}dhxwin_hdr_hidden/gi, "");
		this.conf.cells_cont = null;
		a.conf.brd = null;
		a.conf.header = true;
		this.wins._winAdjustCell(this._idd)
	}
	a = null
};
dhtmlXWindowsCell.prototype.hideHeader = function() {
	var a = this.wins.w[this._idd];
	if (a.conf.header == true) {
		if (a.conf.parked) {
			this.wins._winPark(this._idd, false)
		}
		a.hdr.className += " dhxwin_hdr_hidden";
		a.brd.className += " dhxwin_hdr_hidden";
		this.conf.cells_cont = null;
		a.conf.brd = null;
		a.conf.header = false;
		this.wins._winAdjustCell(this._idd)
	}
	a = null
};
dhtmlXWindowsCell.prototype.setModal = function(a) {
	this.wins._winSetModal(this._idd, window.dhx4.s2b(a))
};
dhtmlXWindowsCell.prototype.isModal = function() {
	return (this.wins.w[this._idd].conf.modal == true)
};
dhtmlXWindowsCell.prototype._adjustByCont = function(a, b) {
	a += this.wins.w[this._idd].conf.w - this.conf.size.w;
	b += this.wins.w[this._idd].conf.h - this.conf.size.h;
	this.wins._winSetSize(this._idd, a, b)
};
dhtmlXWindowsCell.prototype.close = function() {
	this.wins._winClose(this._idd)
};
dhtmlXWindowsCell.prototype.setIconCss = function(a) {
	this.wins.w[this._idd].hdr.firstChild.className = "dhxwin_icon " + a;
	this.wins._winAdjustTitle(this._idd)
};
dhtmlXWindowsCell.prototype.setToFullScreen = function(b) {
	b = window.dhx4.s2b(b);
	var a = this.wins.w[this._idd];
	if (a.conf.fs_mode == b) {
		a = null;
		return
	}
	if (this.wins.fsn == null) {
		this.wins.fsn = document.createElement("DIV");
		this.wins.fsn.className = this.wins.vp.className + " dhxwins_vp_fs";
		document.body.appendChild(this.wins.fsn)
	}
	if (b) {
		this.wins.fsn.appendChild(a.win);
		this.maximize();
		this.hideHeader()
	} else {
		this.wins.vp.appendChild(a.win);
		this.minimize();
		this.showHeader();
		if (this.wins.fsn.childNodes.length == 0) {
			this.wins.fsn.parentNode.removeChild(this.wins.fsn);
			this.wins.fsn = null
		}
	}
	a.conf.fs_mode = b;
	a = null
};
dhtmlXWindowsCell.prototype.button = function(a) {
	if (a == "minmax1" || a == "minmax2") {
		a = "minmax"
	}
	return this.wins.w[this._idd].b[a]
};
dhtmlXWindowsCell.prototype.addUserButton = function(j, i, e) {
	var a = new dhtmlXWindowsButton(this.wins, this._idd, j, e, true);
	var g = null;
	var c = this.wins.w[this._idd].hdr.lastChild;
	if (isNaN(i)) {
		i = 0
	} else {
		if (i < 0) {
			i = 0
		}
	}
	if (c.childNodes[i] != null) {
		g = c.childNodes[i]
	}
	if (g != null) {
		c.insertBefore(a.button, g)
	} else {
		c.appendChild(a.button)
	}
	this.wins.w[this._idd].b[j] = a;
	a = g = c = null;
	this.wins._winAdjustTitle(this._idd)
};
dhtmlXWindowsCell.prototype.removeUserButton = function(a) {
	if (this.wins.w[this._idd].b[a] == null
			|| this.wins.w[this._idd].b[a].conf.custom != true) {
		return
	}
	this.wins._winRemoveButton(this._idd, a)
};
window.dhtmlXWindowsButton = function(g, b, a, e, c) {
	this.conf = {
		wins : g,
		winId : b,
		name : a,
		enabled : true,
		visible : true,
		custom : true
	};
	this.button = document.createElement("DIV");
	this.button._buttonName = a;
	this.button.title = e;
	this.enable = function() {
		this.conf.enabled = true;
		this.setCss(this.conf.css)
	};
	this.disable = function() {
		this.conf.enabled = false;
		this.setCss(this.conf.css)
	};
	this.isEnabled = function() {
		return (this.conf.enabled == true)
	};
	this.show = function() {
		this.button.style.display = "";
		this.conf.visible = true;
		this.conf.wins._winAdjustTitle(this.conf.winId)
	};
	this.hide = function() {
		this.button.style.display = "none";
		this.conf.visible = false;
		this.conf.wins._winAdjustTitle(this.conf.winId)
	};
	this.isHidden = function() {
		return (this.conf.visible == false)
	};
	this.setCss = function(i) {
		this.conf.css = i;
		var h = (this.conf.enabled ? "" : "_dis");
		this.button.className = "dhxwin_button" + h + " dhxwin_button_"
				+ this.conf.css + h
	};
	this._doOnClick = function(h) {
		return this.callEvent("onClick", [
				this.conf.wins.w[this.conf.winId].cell, this ])
	};
	this.unload = function(h) {
		dhx4._eventable(this, "clear");
		this.button._buttonName = null;
		this.button.parentNode.removeChild(this.button);
		if (this.conf.wins.cm != null
				&& this.conf.wins.cm.button[this.conf.winId] != null
				&& this.conf.wins.cm.button[this.conf.winId][this.conf.name] != null) {
			this.conf.wins._detachContextMenu("button", this.conf.winId,
					this.conf.name)
		}
		this.button = null;
		this.enable = null;
		this.disable = null;
		this.isEnabled = null;
		this.show = null;
		this.hide = null;
		this.isHidden = null;
		this.setCss = null;
		this.unload = null;
		if (h != true) {
			this.conf.wins._winAdjustTitle(this.conf.winId)
		}
		this.conf.wins = null;
		this.conf.winId = null;
		this.conf = null
	};
	this.setCss(a);
	dhx4._eventable(this);
	return this
};
dhtmlXWindows.prototype._winButtonClick = function(c, a, b) {
	if (!this.w[c].b[a].isEnabled()) {
		return true
	}
	if (this.w[c].b[a]._doOnClick() !== true) {
		return
	}
	if (a == "help") {
		this._callMainEvent("onHelp", c)
	}
	if (a == "park") {
		this._winPark(c, true)
	}
	if (a == "minmax") {
		this._winMinmax(c)
	}
	if (a == "stick") {
		this._winStick(c);
		return false
	}
	if (a == "close") {
		this._winClose(c);
		return false
	}
	return true
};
dhtmlXWindows.prototype._winRemoveButton = function(c, a, b) {
	this.w[c].b[a].unload(b);
	this.w[c].b[a] = null;
	delete this.w[c].b[a]
};
dhtmlXWindows.prototype._dndInitModule = function() {
	var a = this;
	this.conf.dnd_enabled = true;
	this.conf.dnd_tm = null;
	this.conf.dnd_time = 0;
	this._dndOnMouseDown = function(g, h) {
		if (a.conf.dblclick_active) {
			return
		}
		if (g.preventDefault) {
			g.preventDefault()
		} else {
			g.returnValue = false
		}
		if (a._callMainEvent("onBeforeMoveStart", h) !== true) {
			return
		}
		a.conf.dnd = {
			id : h,
			x : a._dndPos(g, "X"),
			y : a._dndPos(g, "Y"),
			ready : true,
			css : false,
			css_touch : false,
			css_vp : false,
			tr : null,
			mode : "def",
			moved : false,
			prevent : false
		};
		if (a.w[h].conf.keep_in_vp) {
			a.conf.dnd.minX = 0;
			a.conf.dnd.maxX = a.vp.clientWidth - a.w[h].conf.w;
			a.conf.dnd.minY = 0;
			a.conf.dnd.maxY = a.vp.clientHeight - a.w[h].conf.h
		} else {
			a.conf.dnd.minX = -a.w[h].conf.w + a.conf.vp_pos_ofs;
			a.conf.dnd.maxX = a.vp.clientWidth - a.conf.vp_pos_ofs;
			a.conf.dnd.minY = 0;
			a.conf.dnd.maxY = a.vp.clientHeight - a.conf.vp_pos_ofs
		}
		var b = [ "MozTransform", "WebkitTransform", "OTransform",
				"msTransform", "transform" ];
		for (var c = 0; c < b.length; c++) {
			if (document.documentElement.style[b[c]] != null
					&& a.conf.dnd.tr == null) {
				a.conf.dnd.tr = b[c];
				a.conf.dnd.mode = "tr"
			}
		}
		if (a.conf.dnd.mode == "tr") {
			a.w[h].win.style[a.conf.dnd.tr] = "translate(0px,0px)";
			if (a.w[h].fr_m_cover != null) {
				a.w[h].fr_m_cover.style[a.conf.dnd.tr] = a.w[h].win.style[a.conf.dnd.tr]
			}
		}
		if (window.dhx4.dnd._mTouch(g) == false
				&& g.type == window.dhx4.dnd.evs.start) {
			if (a.conf.dnd.css_touch == false) {
				a.w[h].win.className += " dhxwin_dnd_touch";
				a.conf.dnd.css_touch = true
			}
			if (a.conf.dnd.css_vp == false) {
				a.vp.className += " dhxwins_vp_dnd";
				a.conf.dnd.css_vp = true
			}
		} else {
			a._dndInitEvents()
		}
	};
	this._dndOnMouseMove = function(h) {
		h = h || event;
		var g = a.conf.dnd;
		var b = a._dndPos(h, "X") - g.x;
		var i = a._dndPos(h, "Y") - g.y;
		if (h.type == window.dhx4.dnd.evs.move) {
			if (g.moved != true && (Math.abs(b) > 20 || Math.abs(i) > 20)) {
				if (a.conf.dnd_tm != null) {
					window.clearTimeout(a.conf.dnd_tm);
					a.conf.dnd_tm = null
				}
				window.removeEventListener(window.dhx4.dnd.evs.start,
						a._dndOnMouseMove, false);
				return
			}
		}
		if (g.ready != true) {
			return
		}
		var c = a.w[g.id];
		if (h.preventDefault) {
			h.preventDefault()
		} else {
			h.returnValue = false
		}
		if (g.css != true) {
			if (g.css_touch == false) {
				c.win.className += " dhxwin_dnd"
			}
			c.fr_cover.className += " dhxwin_fr_cover_dnd";
			g.css = true
		}
		if (g.css_vp != true) {
			a.vp.className += " dhxwins_vp_dnd";
			g.css_vp = true
		}
		g.newX = c.conf.x + b;
		g.newY = c.conf.y + i;
		if (g.mode == "tr") {
			g.newX = Math.min(Math.max(g.newX, g.minX), g.maxX);
			b = g.newX - c.conf.x;
			g.newY = Math.min(Math.max(g.newY, g.minY), g.maxY);
			i = g.newY - c.conf.y;
			c.win.style[g.tr] = "translate(" + b + "px," + i + "px)";
			if (c.fr_m_cover != null) {
				c.fr_m_cover.style[g.tr] = c.win.style[g.tr]
			}
		} else {
			if (g.newX < g.minX || g.newX > g.maxX) {
				g.newX = Math.min(Math.max(g.newX, g.minX), g.maxX)
			} else {
				g.x = a._dndPos(h, "X")
			}
			if (g.newY < g.minY || g.newY > g.maxY) {
				g.newY = Math.min(Math.max(g.newY, g.minY), g.maxY)
			} else {
				g.y = a._dndPos(h, "Y")
			}
			a._winSetPosition(g.id, g.newX, g.newY)
		}
		g.moved = true;
		c = g = null
	};
	this._dndOnMouseUp = function(g) {
		g = g || event;
		a._dndUnloadEvents();
		if (a.conf.dnd != null && a.conf.dnd.id != null) {
			var c = a.conf.dnd;
			var b = a.w[c.id];
			if (c.newX != null) {
				if (c.mode == "tr") {
					a._winSetPosition(c.id, c.newX, c.newY);
					b.win.style[c.tr] = "translate(0px,0px)";
					if (b.fr_m_cover != null) {
						b.fr_m_cover.style[c.tr] = b.win.style[c.tr]
					}
				}
			}
			if (c.css == true) {
				if (c.css_touch == false) {
					b.win.className = String(b.win.className).replace(
							/\s{0,}dhxwin_dnd/gi, "")
				}
				b.fr_cover.className = String(b.fr_cover.className).replace(
						/\s{0,}dhxwin_fr_cover_dnd/gi, "")
			}
			if (c.css_touch == true) {
				b.win.className = String(b.win.className).replace(
						/\s{0,}dhxwin_dnd_touch/gi, "")
			}
			if (c.css_vp == true) {
				a.vp.className = String(a.vp.className).replace(
						/\s{0,}dhxwins_vp_dnd/gi, "")
			}
			if (c.moved == true) {
				a._callMainEvent("onMoveFinish", c.id)
			} else {
				a._callMainEvent("onMoveCancel", c.id)
			}
			b = c = a.conf.dnd = null
		}
		if (window.dhx4.dnd.p_en == true && g.type == window.dhx4.dnd.evs.end) {
			window.dhx4.dnd._touchOn();
			window.removeEventListener(window.dhx4.dnd.evs.end,
					a._dndOnMouseUp, false);
			window.removeEventListener(window.dhx4.dnd.evs.move,
					a._dndOnMouseMove, false);
			if (a.conf.dnd_tm != null) {
				window.clearTimeout(a.conf.dnd_tm)
			}
			a.conf.dnd_tm = null
		}
	};
	this._dndOnSelectStart = function(b) {
		b = b || event;
		if (b.preventDefault) {
			b.preventDefault()
		} else {
			b.returnValue = false
		}
		return false
	};
	this._dndInitEvents = function() {
		if (typeof (window.addEventListener) == "function") {
			window.addEventListener("mousemove", this._dndOnMouseMove, false);
			window.addEventListener("mouseup", this._dndOnMouseUp, false);
			window.addEventListener("selectstart", this._dndOnSelectStart,
					false)
		} else {
			document.body.attachEvent("onmousemove", this._dndOnMouseMove);
			document.body.attachEvent("onmouseup", this._dndOnMouseUp);
			document.body.attachEvent("onselectstart", this._dndOnSelectStart)
		}
	};
	this._dndUnloadEvents = function() {
		if (typeof (window.addEventListener) == "function") {
			window
					.removeEventListener("mousemove", this._dndOnMouseMove,
							false);
			window.removeEventListener("mouseup", this._dndOnMouseUp, false);
			window.removeEventListener("selectstart", this._dndOnSelectStart,
					false)
		} else {
			document.body.detachEvent("onmousemove", this._dndOnMouseMove);
			document.body.detachEvent("onmouseup", this._dndOnMouseUp);
			document.body.detachEvent("onselectstart", this._dndOnSelectStart)
		}
	};
	this._dndUnloadModule = function() {
		this.detachEvent(this.conf.dnd_evid);
		this.conf.dnd_evid = null;
		this._dndOnMouseDown = null;
		this._dndOnMouseMove = null;
		this._dndOnMouseUp = null;
		this._dndOnSelectStart = null;
		this._dndInitEvents = null;
		this._dndUnloadEvents = null;
		this._dndInitModule = null;
		this._dndUnloadModule = null;
		a = null
	};
	this._dndPos = function(c, b) {
		var e = c[this.conf.dnd_ev_prefix + b];
		if ((e == null || e == 0) && c.touches != null) {
			e = c.touches[0][this.conf.dnd_ev_prefix + b]
		}
		return e
	};
	this.conf.dnd_evid = this.attachEvent("_winMouseDown", function(c, b) {
		if (this.w[b.id] == null || this.w[b.id].conf.allow_move != true) {
			return
		}
		if (typeof (c.button) != "undefined" && c.button >= 2) {
			return
		}
		if (c.type == window.dhx4.dnd.evs.start) {
			if (b.mode == "hdr") {
				if (this.w[b.id].conf.maxed && this.w[b.id].conf.max_w == null
						&& this.w[b.id].conf.max_h == null) {
					return
				}
				this.conf.dnd_ev_prefix = "page";
				this.conf.dnd = {
					x : this._dndPos(c, "X"),
					y : this._dndPos(c, "Y")
				};
				if (this.conf.dnd_time < 1) {
					this._dndOnMouseDown(c, b.id)
				} else {
					if (this.conf.dnd_tm != null) {
						window.clearTimeout(this.conf.dnd_tm)
					}
					this.conf.dnd_tm = window.setTimeout(function() {
						a._dndOnMouseDown(c, b.id)
					}, this.conf.dnd_time)
				}
				if (window.dhx4.dnd.p_en == true) {
					window.dhx4.dnd._touchOff();
					window.addEventListener(window.dhx4.dnd.evs.end,
							this._dndOnMouseUp, false)
				}
				window.addEventListener(window.dhx4.dnd.evs.move,
						this._dndOnMouseMove, false)
			}
			return false
		}
		if (c.type == window.dhx4.dnd.evs.end) {
			if (this.conf.dnd_tm != null) {
				window.clearTimeout(this.conf.dnd_tm);
				this.conf.dnd_tm = null
			}
			this._dndOnMouseUp(c);
			window.removeEventListener(window.dhx4.dnd.evs.move,
					this._dndOnMouseMove, false);
			return false
		}
		this.conf.dnd_ev_prefix = "client";
		if (!(b.mode == "hdr" && c.type == "mousedown")) {
			return
		}
		if (this.w[b.id].conf.maxed && this.w[b.id].conf.max_w == null
				&& this.w[b.id].conf.max_h == null) {
			return
		}
		if (c.preventDefault) {
			c.preventDefault()
		} else {
			c.returnValue = false
		}
		this._dndOnMouseDown(c, b.id);
		return false
	})
};
dhtmlXWindowsCell.prototype._initResize = function() {
	var a = this;
	var b = navigator.userAgent;
	this.conf.resize = {
		b_width : 6,
		c_type : (b.indexOf("MSIE 10.0") > 0 || b.indexOf("MSIE 9.0") > 0
				|| b.indexOf("MSIE 8.0") > 0 || b.indexOf("MSIE 7.0") > 0 || b
				.indexOf("MSIE 6.0") > 0),
		btn_left : ((window.dhx4.isIE6 || window.dhx4.isIE7 || window.dhx4.isIE8)
				&& typeof (window.addEventListener) == "undefined" ? 1 : 0)
	};
	this._rOnCellMouseMove = function(j) {
		if (a.wins.conf.resize_actv == true
				|| a.wins.w[a._idd].conf.allow_resize == false
				|| a.conf.progress == true
				|| a.wins.w[a._idd].conf.maxed == true
				|| a.wins.w[a._idd].conf.fs_mode == true) {
			var h = a.wins.w[a._idd].brd;
			if (h.style.cursor != "default") {
				h.style.cursor = "default"
			}
			h = null;
			return
		}
		j = j || event;
		var p = a.wins.w[a._idd].brd;
		var c = a.conf.resize;
		var m = (a.wins.w[a._idd].conf.header == false);
		var n = j.clientX;
		var l = j.clientY;
		n += (document.documentElement.scrollLeft || document.body.scrollLeft || 0);
		l += (document.documentElement.scrollTop || document.body.scrollTop || 0);
		var g = window.dhx4.absLeft(p);
		var o = window.dhx4.absTop(p);
		var i = "";
		if (n <= g + c.b_width) {
			i = "w"
		} else {
			if (n >= g + p.offsetWidth - c.b_width) {
				i = "e"
			}
		}
		if (l >= o + p.offsetHeight - c.b_width) {
			i = "s" + i
		} else {
			if (m && l <= o + c.b_width) {
				i = "n" + i
			}
		}
		if (i == "") {
			i = false
		}
		if (c.mode != i) {
			c.mode = i;
			if (i == false) {
				p.style.cursor = "default"
			} else {
				p.style.cursor = i + "-resize"
			}
		}
		p = c = null
	};
	this._rOnCellMouseDown = function(i) {
		i = i || event;
		if (typeof (i.button) != "undefined"
				&& i.button != a.conf.resize.btn_left) {
			return
		}
		if (a.conf.resize.mode == false) {
			return
		}
		if (a.conf.progress == true) {
			return
		}
		if (a.wins.w[a._idd].conf.allow_resize == false) {
			return
		}
		if (a.wins.w[a._idd].conf.fs_mode == true) {
			return
		}
		if (i.preventDefault) {
			i.preventDefault()
		} else {
			i.returnValue = false
		}
		if (a.wins._callMainEvent("onBeforeResizeStart", a._idd) !== true) {
			return
		}
		var c = a.wins.w[a._idd];
		var h = a.conf.resize;
		a.wins.conf.resize_actv = true;
		h.min_w = c.conf.min_w;
		h.min_h = c.conf.min_h;
		h.max_w = c.conf.max_w || +Infinity;
		h.max_h = c.conf.max_h || +Infinity;
		if (c.cell.dataType == "layout" && c.cell.dataObj != null
				&& typeof (c.cell.dataObj._getWindowMinDimension) == "function") {
			var g = c.cell.dataObj._getWindowMinDimension(c.cell);
			h.min_w = Math.max(g.w, h.min_w);
			h.min_h = Math.max(g.h, h.min_h)
		}
		h.vp_l = a.wins.conf.vp_pos_ofs;
		h.vp_r = a.wins.vp.clientWidth - a.wins.conf.vp_pos_ofs;
		h.vp_b = a.wins.vp.clientHeight - a.wins.conf.vp_pos_ofs;
		h.x = i.clientX;
		h.y = i.clientY;
		if (typeof (window.addEventListener) == "function") {
			window.addEventListener("mousemove", a._rOnWinMouseMove, false);
			window.addEventListener("mouseup", a._rOnWinMouseUp, false);
			window.addEventListener("selectstart", a._rOnSelectStart, false)
		} else {
			document.body.attachEvent("onmousemove", a._rOnWinMouseMove);
			document.body.attachEvent("onmouseup", a._rOnWinMouseUp);
			document.body.attachEvent("onselectstart", a._rOnSelectStart)
		}
		h.resized = false;
		h.vp_cursor = a.wins.vp.style.cursor;
		a.wins.vp.style.cursor = h.mode + "-resize";
		c = h = null
	};
	this._rOnCellContextMenu = function(c) {
		c = c || event;
		if (c.preventDefault) {
			c.preventDefault()
		} else {
			c.returnValue = false
		}
		return false
	};
	this._rOnWinMouseMove = function(i) {
		i = i || event;
		var g = a.wins.w[a._idd];
		var h = a.conf.resize;
		if (!h.resized) {
			g.fr_cover.className += " dhxwin_fr_cover_resize";
			h.resized = true
		}
		var c = i.clientX - h.x;
		var j = i.clientY - h.y;
		if (h.mode.indexOf("e") >= 0) {
			h.rw = Math.min(Math.max(g.conf.w + c, h.min_w), h.max_w);
			h.rx = null;
			if (g.conf.x + h.rw < h.vp_l) {
				h.rw = h.vp_l - g.conf.x
			} else {
				if (g.conf.x + h.rw > a.wins.vp.clientWidth) {
					h.rw = a.wins.vp.clientWidth - g.conf.x
				}
			}
		} else {
			if (h.mode.indexOf("w") >= 0) {
				h.rw = Math.min(Math.max(g.conf.w - c, h.min_w), h.max_w);
				h.rx = g.conf.x + g.conf.w - h.rw;
				if (h.rx < 0) {
					h.rw = h.rw + h.rx;
					h.rx = 0
				} else {
					if (h.rx > h.vp_r) {
						h.rw = h.rw - h.vp_r;
						h.rx = h.vp_r
					}
				}
			}
		}
		if (h.mode.indexOf("s") >= 0) {
			h.rh = Math.min(Math.max(g.conf.h + j, h.min_h), h.max_h);
			h.ry = null;
			if (g.conf.y + h.rh > a.wins.vp.clientHeight) {
				h.rh = a.wins.vp.clientHeight - g.conf.y
			}
		} else {
			if (h.mode.indexOf("n") >= 0) {
				h.rh = Math.min(Math.max(g.conf.h - j, h.min_h), h.max_h);
				h.ry = g.conf.y + g.conf.h - h.rh;
				if (h.ry < 0) {
					h.rh = h.rh + h.ry;
					h.ry = 0
				} else {
					if (h.ry > h.vp_b) {
						h.rh = h.rh - h.vp_b;
						h.ry = h.vp_b
					}
				}
			}
		}
		a._rAdjustSizer();
		g = h = null
	};
	this._rOnWinMouseUp = function() {
		var e = a.conf.resize;
		var c = a.wins.w[a._idd];
		a.wins.conf.resize_actv = false;
		a.wins.vp.style.cursor = e.vp_cursor;
		c.fr_cover.className = String(c.fr_cover.className).replace(
				/\s{0,}dhxwin_fr_cover_resize/gi, "");
		if (e.resized) {
			a.wins._winSetSize(a._idd, e.rw, e.rh);
			if (e.rx == null) {
				e.rx = c.conf.x
			}
			if (e.ry == null) {
				e.ry = c.conf.y
			}
			if (e.rx != c.conf.x || e.ry != c.conf.y) {
				a.wins._winSetPosition(a._idd, e.rx, e.ry)
			}
		}
		if (e.obj != null) {
			e.obj.parentNode.removeChild(e.obj);
			e.obj = null
		}
		if (e.objFR != null) {
			e.objFR.parentNode.removeChild(e.objFR);
			e.objFR = null
		}
		if (typeof (window.addEventListener) == "function") {
			window.removeEventListener("mousemove", a._rOnWinMouseMove, false);
			window.removeEventListener("mouseup", a._rOnWinMouseUp, false);
			window.removeEventListener("selectstart", a._rOnSelectStart, false)
		} else {
			document.body.detachEvent("onmousemove", a._rOnWinMouseMove);
			document.body.detachEvent("onmouseup", a._rOnWinMouseUp);
			document.body.detachEvent("onselectstart", a._rOnSelectStart)
		}
		if (e.resized == true) {
			if (a.dataType == "layout" && a.dataObj != null) {
				a.dataObj.callEvent("onResize", [])
			}
			a.wins._callMainEvent("onResizeFinish", a._idd)
		} else {
			a.wins._callMainEvent("onResizeCancel", a._idd)
		}
		e.mode = "";
		c = e = null
	};
	this._rOnSelectStart = function(c) {
		c = c || event;
		if (c.preventDefault) {
			c.preventDefault()
		} else {
			c.returnValue = false
		}
		return false
	};
	this._rInitSizer = function() {
		var e = a.conf.resize;
		var c = a.wins.w[a._idd];
		e.obj = document.createElement("DIV");
		e.obj.className = "dhxwin_resize";
		e.obj.style.zIndex = c.win.style.zIndex;
		e.obj.style.cursor = e.mode + "-resize";
		a.wins.vp.appendChild(e.obj);
		if (a.wins.conf.fr_cover == true) {
			e.objFR = document.createElement("IFRAME");
			e.objFR.className = "dhxwin_resize_fr_cover";
			e.objFR.style.zIndex = e.obj.style.zIndex;
			a.wins.vp.insertBefore(e.objFR, e.obj)
		}
		e.rx = c.conf.x;
		e.ry = c.conf.y;
		e.rw = c.conf.w;
		e.rh = c.conf.h;
		e = null
	};
	this._rAdjustSizer = function() {
		var c = a.conf.resize;
		if (!c.obj) {
			this._rInitSizer()
		}
		c.obj.style.width = c.rw + "px";
		c.obj.style.height = c.rh + "px";
		if (c.rx != null) {
			c.obj.style.left = c.rx + "px"
		}
		if (c.ry != null) {
			c.obj.style.top = c.ry + "px"
		}
		if (c.objFR != null) {
			c.objFR.style.width = c.obj.style.width;
			c.objFR.style.height = c.obj.style.height;
			if (c.rx != null) {
				c.objFR.style.left = c.obj.style.left
			}
			if (c.ry != null) {
				c.objFR.style.top = c.obj.style.top
			}
		}
		c = null
	};
	if (typeof (window.addEventListener) == "function") {
		this.wins.w[this._idd].brd.addEventListener("mousemove",
				this._rOnCellMouseMove, false);
		this.wins.w[this._idd].brd.addEventListener("mousedown",
				this._rOnCellMouseDown, false);
		this.wins.w[this._idd].brd.addEventListener("contextmenu",
				this._rOnCellContextMenu, false)
	} else {
		this.wins.w[this._idd].brd.attachEvent("onmousemove",
				this._rOnCellMouseMove);
		this.wins.w[this._idd].brd.attachEvent("onmousedown",
				this._rOnCellMouseDown);
		this.wins.w[this._idd].brd.attachEvent("oncontextmenu",
				this._rOnCellContextMenu)
	}
	this._unloadResize = function() {
		if (typeof (window.addEventListener) == "function") {
			this.wins.w[this._idd].brd.removeEventListener("mousemove",
					this._rOnCellMouseMove, false);
			this.wins.w[this._idd].brd.removeEventListener("mousedown",
					this._rOnCellMouseDown, false);
			this.wins.w[this._idd].brd.removeEventListener("contextmenu",
					this._rOnCellContextMenu, false)
		} else {
			this.wins.w[this._idd].brd.detachEvent("onmousemove",
					this._rOnCellMouseMove);
			this.wins.w[this._idd].brd.detachEvent("onmousedown",
					this._rOnCellMouseDown);
			this.wins.w[this._idd].brd.detachEvent("oncontextmenu",
					this._rOnCellContextMenu)
		}
		this._initResize = null;
		this._rOnCellMouseMove = null;
		this._rOnCellMouseDown = null;
		this._rOnWinMouseMove = null;
		this._rOnWinMouseUp = null;
		this._rOnSelectStart = null;
		this._rInitSizer = null;
		this._rAdjustSizer = null;
		this._unloadResize = null;
		this.conf.resize = null;
		a = null
	}
};
dhtmlXWindows.prototype.attachContextMenu = function(a) {
	return this._renderContextMenu("icon", null, null, a)
};
dhtmlXWindows.prototype.getContextMenu = function() {
	if (this.cm != null && this.cm.global != null) {
		return this.cm.global
	}
	return null
};
dhtmlXWindows.prototype.detachContextMenu = function() {
	this._detachContextMenu("icon", null, null)
};
dhtmlXWindowsCell.prototype.attachContextMenu = function(a) {
	return this.wins._renderContextMenu("icon", this._idd, null, a)
};
dhtmlXWindowsCell.prototype.getContextMenu = function() {
	if (this.wins.cm != null && this.wins.cm.icon[this._idd] != null) {
		return this.wins.cm.icon[this._idd]
	}
	return null
};
dhtmlXWindowsCell.prototype.detachContextMenu = function() {
	this.wins._detachContextMenu("icon", this._idd, null)
};
dhtmlXWindowsButton.prototype.attachContextMenu = function(a) {
	return this.conf.wins._renderContextMenu("button", this.conf.winId,
			this.conf.name, a)
};
dhtmlXWindowsButton.prototype.getContextMenu = function() {
	if (this.conf.wins.cm == null
			|| this.conf.wins.cm.button[this.conf.winId] == null) {
		return null
	}
	if (this.conf.wins.cm.button[this.conf.winId][this.conf.name] != null) {
		return this.conf.wins.cm.button[this.conf.winId][this.conf.name]
	}
	return null
};
dhtmlXWindowsButton.prototype.detachContextMenu = function() {
	this.conf.wins
			._detachContextMenu("button", this.conf.winId, this.conf.name)
};
dhtmlXWindows.prototype._renderContextMenu = function(i, h, c, b) {
	var e = this;
	var a = false;
	if (this.cm == null) {
		this.cm = {
			global : null,
			icon : {},
			button : {}
		};
		a = true
	}
	if (h == null) {
		if (this.cm.global != null) {
			return
		}
	} else {
		if (i == "icon") {
			if (this.cm.icon[h] != null) {
				return
			}
		} else {
			if (i == "button") {
				if (this.cm.button[h] != null && this.cm.button[h][c] != null) {
					return
				}
			}
		}
	}
	if (b == null) {
		b = {}
	}
	b.parent = null;
	b.context = true;
	var g = new dhtmlXMenuObject(b);
	g.setAutoHideMode(false);
	g.attachEvent("onShow", function() {
		this.conf.wins_menu_open = true
	});
	g.attachEvent("onHide", function() {
		this.conf.wins_menu_open = false;
		e.conf.opened_menu = null
	});
	if (h == null) {
		this.cm.global = g
	} else {
		if (i == "icon") {
			this.cm.icon[h] = g
		} else {
			if (i == "button") {
				if (this.cm.button[h] == null) {
					this.cm.button[h] = {}
				}
				this.cm.button[h][c] = g
			}
		}
	}
	if (a) {
		this._showContextMenu = function(m, l) {
			if (m.button >= 2) {
				return
			}
			if (l.mode == "icon" && l.id != null && l.press_type == "mousedown") {
				var n = this.cm.icon[l.id] || this.cm.global;
				if (n == null) {
					return
				}
				m.cancelBubble = true;
				var k = this.w[l.id].hdr.firstChild;
				if (n.conf.wins_menu_open && this.conf.opened_menu == l.id) {
					n.hideContextMenu()
				} else {
					this._hideContextMenu();
					n.showContextMenu(window.dhx4.absLeft(k), window.dhx4
							.absTop(k)
							+ k.offsetHeight);
					this.conf.opened_menu = l.id
				}
				n = k = null
			}
			if (l.mode == "button" && l.id != null
					&& l.press_type == "mousedown") {
				if (this.cm.button[l.id] == null
						|| this.cm.button[l.id][l.button_name] == null) {
					return
				}
				m.cancelBubble = true;
				this.conf.button_last = null;
				var n = this.cm.button[l.id][l.button_name];
				var j = this.w[l.id].b[l.button_name].button;
				if (n.conf.wins_menu_open && this.conf.opened_menu == l.id) {
					n.hideContextMenu()
				} else {
					this._hideContextMenu();
					n.showContextMenu(window.dhx4.absLeft(j), window.dhx4
							.absTop(j)
							+ j.offsetHeight);
					this.conf.opened_menu = l.id
				}
				n = j = null
			}
		};
		this._hideContextMenu = function(o) {
			if (o != null) {
				o = o || event;
				if (o.type == "keydown" && o.keyCode != 27) {
					return
				}
				var n = o.target || o.srcElement;
				var k = true;
				while (n != null && k == true) {
					if (n.className != null
							&& n.className.search(/SubLevelArea_Polygon/) >= 0) {
						k = false
					} else {
						n = n.parentNode
					}
				}
			}
			if (k || o == null) {
				if (e.cm.global != null) {
					e.cm.global.hideContextMenu()
				}
				for ( var l in e.cm.icon) {
					if (e.cm.icon[l] != null) {
						e.cm.icon[l].hideContextMenu()
					}
				}
				for ( var l in e.cm.button) {
					for ( var j in e.cm.button[l]) {
						if (e.cm.button[l][j] != null) {
							e.cm.button[l][j].hideContextMenu()
						}
					}
				}
			}
		};
		this._detachContextMenu = function(l, k, j) {
			if (this.cm == null) {
				return
			}
			if (k == null) {
				if (this.cm.global != null) {
					this.cm.global.unload();
					this.cm.global = null
				}
			} else {
				if (l == "icon") {
					if (this.cm.icon[k] != null) {
						this.cm.icon[k].unload();
						this.cm.icon[k] = null
					}
				} else {
					if (l == "button") {
						if (this.cm.button[k] != null
								&& this.cm.button[k][j] != null) {
							this.cm.button[k][j].unload();
							this.cm.button[k][j] = null
						}
					}
				}
			}
		};
		this.attachEvent("_winMouseDown", this._showContextMenu);
		if (typeof (window.addEventListener) == "function") {
			window.addEventListener("mousedown", this._hideContextMenu, false);
			window.addEventListener("keydown", this._hideContextMenu, false)
		} else {
			document.body.attachEvent("onmousedown", this._hideContextMenu);
			document.body.attachEvent("onkeydown", this._hideContextMenu)
		}
		this._unloadContextMenu = function() {
			this._detachContextMenu("icon", null, null);
			this.cm = null;
			if (typeof (window.addEventListener) == "function") {
				window.removeEventListener("mousedown", this._hideContextMenu,
						false);
				window.removeEventListener("keydown", this._hideContextMenu,
						false)
			} else {
				document.body.detachEvent("onmousedown", this._hideContextMenu);
				document.body.detachEvent("onkeydown", this._hideContextMenu)
			}
			e = null
		}
	}
	return g
};