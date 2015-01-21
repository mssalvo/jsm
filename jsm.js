/**
 * @author Salvatore Mariniello
 * from https://github.com/mssalvo/jsm
 *
 The contents of this file are subject to the Mozilla Public License
 Version 1.1 (the "License"); you may not use this file except in
 compliance with the License. You may obtain a copy of the License at
 http://www.mozilla.org/MPL/
 
 Software distributed under the License is distributed on an "AS IS"
 basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 License for the specific language governing rights and limitations
 under the License.
 
 The Original Code is javascript.
 
 The Initial Developer of the Original Code is Salvatore Mariniello.
 Portions created by Salvatore Mariniello are Copyright (C) 2015
 jsmScript. All Rights Reserved.
 
 */


function jsmScript(e, c) {
    c.element ? c = c.element[0] : c ? c = c : c = d;
    e ? (this.element = e.element ? e.element : (typeof e == "string" && /^<(\w+)\s*\/?>(?:<\/\1>|)$/.exec(e)) ? [d.createElement(/^<(\w+)\s*\/?>(?:<\/\1>|)$/.exec(e)[1])] : typeof e == "string" ? c.querySelectorAll(e) : e.length ? e : [e]) : this.element = {}; 
}
var jsm = function(s, c) {
    return new jsmScript(s ? s : 0, c ? c : 0)
}, jsmCommand = jsmScript.prototype, d = document;
jsmCommand.util = {};

jsmCommand.util.isFunction = function(e) {
    return typeof e == typeof Function
};
jsmCommand.util.isUndefined = function(e) {
    return e ? typeof e == "undefined" : true
};
jsmCommand.util.isArray = function(e) {
    return !!e && e.constructor == Array
};
jsmCommand.util.isObject = function(e) {
    return !!e && e.constructor === Object
};
jsmCommand.util.isString = function(e) {
    return typeof e == "string"
};
jsmCommand.util.styleProName = function(a, e) {
    e = e || this.get(0);
    var t = a.split("-");
    var n = "";
    for (var r = 0; r < t.length; r++) {
        var tx = t[r].toLowerCase();
        if (r > 0) {
            var s = tx.charAt(0);
            var o = tx.substr(1);
            tx = s.toUpperCase() + o.toLowerCase()
        }
        n += tx
    }
    if (n == "float") {
        n = e.style.cssFloat != undefined ? "cssFloat" : "float";
    }
    return n
}

jsmCommand.pro = {};
jsmCommand.pro.forEach = Array.prototype.forEach;
jsmCommand.pro.slice = Array.prototype.slice;
jsmCommand.pro.nativeBind = Function.prototype.bind;
jsmCommand.each = function(f) {
    this.pro.forEach.call(this.element, f)
};
jsmCommand.bindPro = function(e, t) {
    if (e.bind === this.pro.nativeBind && this.pro.nativeBind)
        return this.pro.nativeBind.apply(e, this.pro.slice.call(arguments, 1));

    var n = this.pro.slice.call(arguments, 2);

    return function() {
        return e.apply(t, n.concat(this.pro.slice.call(arguments)))
    }
}
jsmCommand.querys = function(selector) {
    return this.pro.slice.call(d.querySelectorAll(selector))
};
jsmCommand.get = function(i) {
    return this.element[i]
};
jsmCommand.event = function(e, t, n) {
    if (d.attachEvent) {
        this.get(0).attachEvent("on" + e, t)
    } else if (d.addEventListener) {
        this.get(0).addEventListener(e, t, n)
    } else {
        this.get(0)["on" + e] = t
    }
    return this
};
jsmCommand.attach = function(e, t) {
    this.event(e, this.bindPro(t, this), false);
    return this
};
jsmCommand.bind = function(e, t) {
    var n = (new String(e)).split(" ");
    for (var r = 0; r < n.length; r++) {
        this.event(n[r],  this.bindPro(t, this), true)
    }
    return this
}
jsmCommand.html = function() {
    if (!this.util.isUndefined(arguments[0])) {
        this.get(0).innerHTML = arguments[0];
        return this
    } else
        return this.get(0).innerHTML
}
jsmCommand.val = function() {
    if (!this.util.isUndefined(arguments[0])) {
        if (this.get(0).value) {
            this.get(0).value = arguments[0];
        }
        if (this.get(0).innerHTML) {
            this.get(0).innerHTML = arguments[0];
        }
        return this
    }
    return this.get(0).value
}
jsmCommand.attr = function() {
    if (arguments && arguments.length > 1) {
        this.get(0).setAttribute(arguments[0], arguments[1]);
        return this
    } else {
        return this.get(0).getAttribute(arguments[0])
    }
}
jsmCommand.removeAttr = function(e) {
    this.get(0).attributes.removeNamedItem(e);
    return this
}
jsmCommand.remove = function() {
    if (arguments && arguments.length > 0) {
        var e = (new jsmScript(arguments[0]).get(0));
        e.parentNode.removeChild(e);
        return this
    } else
        this.get(0).parentNode.removeChild(this.get(0));
    return this
}

jsmCommand.append = function() {
    if (!this.util.isUndefined(this.get(0))) {
        if (this.get(0).appendChild) {
            d.body.appendChild(this.get(0))
        } else {
            this.get(0).parentNode.appendChild(this.get(0))
        }
    } else
        d.body.appendChild(this.get(0));
    return this
}
jsmCommand.appendTo = function(e) {
    if (e == null || e == "undefined") {
        d.body.appendChild(this.get(0));
        return this
    } else {
        if ("object" == typeof e) {
            if (e.appendChild) {
                e.appendChild(this.element[0])
            } else {
                e.parentNode.appendChild(this.get(0))
            }
        } else {
            var elm = jsm(e).get(0);
            if (elm.appendChild) {
                elm.appendChild(this.get(0))
            } else {
                this.get(0).parentNode.appendChild(this.get(0))
            }
        }
    }
    return this
}
jsmCommand.put = function(e) {
    if (e == null || e == "undefined" || !this.get(0).appendChild) {
        return this
    } else {
        if ("object" == typeof e) {
            if (e.element) {
                this.get(0).appendChild(e.get(0))
            } else {
                this.get(0).appendChild(e)
            }
        }
    }
    return this
}
jsmCommand.create = function(tag) {
    if (typeof tag == "string" && /^<(\w+)\s*\/?>(?:<\/\1>|)$/.exec(tag)) {
        this.element = [d.createElement(/^<(\w+)\s*\/?>(?:<\/\1>|)$/.exec(tag)[1])]
    } else {
        this.element = [d.createElement(tag)]
    }
    return this
}
jsmCommand.click = function(f) {
    this.event("click", this.bindPro(f, this), false);
    return this
}
jsmCommand.focus = function(f) {
    this.event("focus", this.bindPro(f, this), false);
    return this
}
jsmCommand.blur = function(f) {
    this.event("blur", this.bindPro(f, this), false);
    return this
}
jsmCommand.scroll = function(f) {
    this.event("scroll", this.bindPro(f, this), false);
    return this
}
jsmCommand.change = function(f) {
    this.event("change", this.bindPro(f, this), false);
    return this
}
jsmCommand.keydown = function(f) {
    this.event("keydown", this.bindPro(f, this), false);
    return this
}
jsmCommand.keyup = function(f) {
    this.event("keyup", this.bindPro(f, this), false);
    return this
}
jsmCommand.mouseout = function(f) {
    this.event("mouseout", this.bindPro(f, this), false);
    return this
}
jsmCommand.mouseover = function(f) {
    this.event("mouseover", this.bindPro(f, this), false);
    return this
}
jsmCommand.css = function() {
    if (arguments && arguments.length > 0) {
        for (var i = 0; i < arguments.length; i++) {
            if (this.util.isArray(arguments[i])) {
                for (j in arguments[i]) {
                    for (x in arguments[i][j]) {
                        this.get(0).style[this.util.styleProName(x, this.get(0))] = arguments[i][j][x];
                    }
                }
            } else if (this.util.isObject(arguments[i])) {
                for (j in arguments[i]) {
                    this.get(0).style[this.util.styleProName(j, this.get(0))] = arguments[i][j];
                }
            } else {
                this.get(0).style[this.util.styleProName(arguments[i], this.get(0))] = arguments[i + 1];
            }
        }
    }
    return this
}
jsmCommand.checked = function() {
    return "input" === this.get(0).nodeName.toLowerCase() && !!this.get(0).checked || "option" === this.get(0).nodeName.toLowerCase() && !!this.get(0).selected
}
jsmCommand.grafic = {};
jsmCommand.grafic.linear = function(progress) {
    return progress
}
jsmCommand.grafic.elastic = function(progress, x) {
    return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress)
}
jsmCommand.grafic.bounce = function(progress) {
    for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (progress >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2)
        }
    }
}
jsmCommand.grafic.makeEaseOut = function(delta) {
    return function(progress) {
        return 1 - delta(1 - progress)
    }
}
jsmCommand.grafic.bounceEaseOut = jsmCommand.grafic.makeEaseOut(jsmCommand.grafic.bounce)
jsmCommand.grafic.back = function(progress, x) {
    return Math.pow(progress, 2) * ((x + 1) * progress - x)
}
jsmCommand.grafic.circ = function(progress) {
    return 1 - Math.sin(Math.acos(progress))
}
jsmCommand.grafic.quad = function(progress) {
    return Math.pow(progress, 2)
}
jsmCommand.grafic.makeEaseInOut = function(delta) {
    return function(progress) {
        if (progress < .5)
            return delta(2 * progress) / 2;
        else
            return (2 - delta(2 * (1 - progress))) / 2
    }
}
jsmCommand.grafic.bounceEaseInOut = jsmCommand.grafic.makeEaseInOut(jsmCommand.grafic.bounce)
jsmCommand.grafic.hexToRGB = function(h) {
    var hex = parseInt(h.replace("#", ""), 16), r = hex >> 16, g = hex >> 8 & 0xFF, b = hex & 0xFF;
    return [r, g, b];
}
jsmCommand.grafic.convertToRGB = function(h) {
    if (h.indexOf("rbg") > -1) {
        h = h.replace("rbg(", "").replace(")", "");
        return h.split(",");
    } else
        return this.hexToRGB(h);
}
//tipi di animazioni possibili > linear - circ - quad - elastic - bounce - makeEaseOut - bounceEaseOut - makeEaseInOut - bounceEaseInOut  
jsmCommand.moves = function(opts) {
		 
    var start = new Date(), elements = this.get(0), durations = opts.duration || 600, delay = opts.delay || 100, fdelta = this.grafic[opts.type || "linear"];
    var idanimate = setInterval(function() {
        var timePassed = new Date() - start, progress = timePassed / durations;
        if (progress > 1) {
            progress = 1
        }
        var delta = fdelta(progress, 1.5);

        if (opts.step) 
            opts.step(delta)
      
        if (progress >= 1){ 
          clearInterval(idanimate)
		if (opts.fn && typeof opts.fn == typeof Function) 
            opts.fn(elements)
			opts.fn=0 
        }
		 
    }, delay);
	
    return this
}
jsmCommand.highlight = function(opts) {
    var from_ = opts && opts.backgroundStart ? opts.backgroundStart : "00FF00", to_ = opts && opts.backgroundEnd ? opts.backgroundEnd : "FFFFFF", from = this.grafic.convertToRGB(from_), to = this.grafic.convertToRGB(to_), elem = this.get(0);
    this.moves({delay: 10, duration: 1000, type: "linear", step: function(delta) {
            elem.style.background = 'rgb(' + Math.max(Math.min(parseInt((delta * (to[0] - from[0])) + from[0], 10), 255), 0) + ',' + Math.max(Math.min(parseInt((delta * (to[1] - from[1])) + from[1], 10), 255), 0) + ',' + Math.max(Math.min(parseInt((delta * (to[2] - from[2])) + from[2], 10), 255), 0) + ')'
        },fn:opts && opts.fn ? opts.fn : 0});
    return this
}
jsmCommand.animateText = function(opts) {
   var delay = opts && opts.delay ? opts.delay : 50, duration = opts && opts.duration ? opts.duration : 6000, delta_ = opts && opts.type ? opts.type : "linear", elem = this.get(0), text = elem.value ? elem.value : elem.innerHTML, to = text.length, from = 0, prop = elem.value ? "value" : "innerHTML";
    this.moves({ delay: delay, duration: duration, type: delta_, step: function (delta) {
        var result = (to - from) * delta + from;
        elem[prop] = text.substr(0, Math.ceil(result));
    },fn:opts && opts.fn ? opts.fn : 0});
    return this;
}
jsmCommand.animate = function(opts) {
    var delay = opts && opts.delay ? opts.delay : 10, duration = opts && opts.duration ? opts.duration : 600, delta_ = opts && opts.type ? opts.type : "linear", elem = this.get(0),actual=[];
    this.moves({delay: delay, duration: duration, type: delta_, step: function(delta) {
            for (var i in opts)
                switch (i) {
                    case "width":
                    case "height":
                    case "top":
                    case "left":
                    case "right":
                    case "bottom":
                    case "fontSize":
                    case "margin":
                    case "marginTop":
                    case "marginLeft":
                    case "marginRight":
                    case "marginBottom":
                    case "padding":
                    case "paddingLeft":
                    case "paddingTop":
                    case "paddingRight":
                    case "paddingBottom":
                    case "border":
                    case "borderTop":
                    case "borderLeft":
                    case "borderRight":
                    case "borderBottom":
                    case "borderRadius":
                    case "borderTopLeftRadius":
                    case "borderTopRightRadius":
                    case "borderBottomRightRadius":
                    case "borderBottomLeftRadius":
               					case "borderBottomWidth":
               					case "borderTopWidth":
               					case "borderLeftWidth":
               					case "borderRightWidth":
               					case "letterSpacing":
					 if(!actual[i]){
					 actual[i]=String(elem.style[i]).toLowerCase().replace('px','').replace('%','')
					 actual[i]=!actual[i]?1:actual[i];
					 }
					 var valAct=opts[i]-parseFloat(actual[i]);
					elem.style[i] = (valAct * delta +parseFloat(actual[i])) +'px';
               					break;
                    case "color":
               					case "borderColor":
               					case "borderBottomColor":
               					case "borderTopColor":
               					case "borderLeftColor":
               					case "borderRightColor":
                    case "background":
                    case "backgroundColor":
					var from_ = opts && opts.backgroundStart ? opts.backgroundStart : "FFFFFF", from = jsmCommand.grafic.convertToRGB(from_), to = jsmCommand.grafic.convertToRGB(opts[i]);
					elem.style[i] = 'rgb(' + Math.max(Math.min(parseInt((delta * (to[0] - from[0])) + from[0], 10), 255), 0) + ',' + Math.max(Math.min(parseInt((delta * (to[1] - from[1])) + from[1], 10), 255), 0) + ',' + Math.max(Math.min(parseInt((delta * (to[2] - from[2])) + from[2], 10), 255), 0) + ')';
              					break;
              					case "borderStyle":	
                   case "font":
                   case "fontFamily":
              					case "fontWeight":
              					case "fontStyle":
                   case "position":
              					case "lineHeight":
              					case "wordSpacing":
              					case "whiteSpace":
              					case "textTransform":
              					case "textDecoration":
              					case "textAlign":
              					case "verticalAlign":
              					case "backgroundRepeat":
              					case "backgroundAttachment":
              					case "backgroundPosition":
              					elem.style[i] = opts[i] + '';
              					break;
              					case "opacity":
					if(!actual[i]){
					 actual[i]=String(elem.style[i]).toLowerCase().replace('px','').replace('%','')
					 actual[i]=!actual[i]?1:actual[i];
					 }
					var valAct=opts[i]-parseFloat(actual[i]);
					elem.style[i] =  (valAct * delta +parseFloat(actual[i]))+'';
             					break;
             					case "backgroundImage":
             					elem.style[i] = 'url(' + opts[i] + ')';
             					break;			
                 default:
                     break;
                }
        },fn:opts && opts.fn ? opts.fn : 0});
    return this
}


    jsmCommand.hasClass = function (c) {return this }
    jsmCommand.addClass = function (c) { return this }
    jsmCommand.removeClass = function (c) { return this }
    jsmCommand.toggleClass = function (c) { return this.hasClass(c) ? this.removeClass(c) : this.addClass(c); }
    jsmCommand.util.regClass = function (c) { return new RegExp("(^|\\s+)" + c + "(\\s+|$)"); }
 
    if ('classList' in document.documentElement) {
        jsmCommand.hasClass = function (c) {
            return this.get(0).classList.contains(c);
        };
        jsmCommand.addClass = function (c) {
            this.get(0).classList.add(c);
            return this
        };
        jsmCommand.removeClass = function (c) {
            this.get(0).classList.remove(c);
            return this
        };
    }
    else {
        jsmCommand.hasClass = function (c) {
            return this.util.regClass(c).test(this.get(0).className);
             
        };
        jsmCommand.addClass = function (c) {
            if (!this.hasClass(c)) {
                this.get(0).className = this.get(0).className + ' ' + c;
            }
            return this
        };
        jsmCommand.removeClass = function (c) {
            this.get(0).className = this.get(0).className.replace(this.util.regClass(c), ' ');
            return this
        };
    }
