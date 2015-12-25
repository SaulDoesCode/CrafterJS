"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _typeof(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();!function(doc,root){function forEach(e,t){if(is.Undef(e))throw new Error("forEach -> cannot iterate through undefined");if(!is.Func(t))throw new Error("forEach -> invalid or undefined function provided");var n=0;if(is.Def(e.length))for(;n<e.length;n++)t(e[n],n);else for(n in e)e.hasOwnProperty(n)&&t(e[n],n)}function queryEach(e,t,n){is.Func(t)&&(n=t);var r=void 0,i=0;for(r=is.Node(e)?[e]:is.Func(t)?_queryAll(e):_queryAll(e,t);i<r.length;i++)n(r[i],i)}function _On(e,t,n,r){if(is.Func(t))return new EventHandler(e,root,t).On();if(arguments.length<3&&!Array.from(arguments).some(function(e){return is.Func(e)})){var i=function(){var n=function(n,r){return new EventHandler(n,e,r,t).On()};return{v:{Click:function(e){return n("click",e)},Input:function(e){return n("input",e)},DoubleClick:function(e){return n("dblclick",e)},Focus:function(e){return n("focus",e)},Blur:function(e){return n("blur",e)},Keydown:function(e){return n("keydown",e)},Mousemove:function(e){return n("mousemove",e)},Mousedown:function(e){return n("mousedown",e)},Mouseup:function(e){return n("mouseup",e)},Mouseover:function(e){return n("mouseover",e)},Mouseout:function(e){return n("mouseout",e)},Mouseenter:function(e){return n("mouseenter",e)},Mouseleave:function(e){return n("mouseleave",e)},Scroll:function(e){return n("scroll",e)}}}}();if("object"===("undefined"==typeof i?"undefined":_typeof(i)))return i.v}return is.Func(n)?new EventHandler(e,t,n).On():new EventHandler(e,t,r,n).On()}function Once(e,t,n,r){if(is.Func(t))return new EventHandler(e,root,t).Once();if(arguments.length<3&&!Array.from(arguments).some(function(e){return is.Func(e)})){var i=function(){var n=function(n,r){return new EventHandler(n,e,r,t).Once()};return{v:{Click:function(e){return n("click",e)},Input:function(e){return n("input",e)},DoubleClick:function(e){return n("dblclick",e)},Focus:function(e){return n("focus",e)},Blur:function(e){return n("blur",e)},Keydown:function(e){return n("keydown",e)},Mousemove:function(e){return n("mousemove",e)},Mousedown:function(e){return n("mousedown",e)},Mouseup:function(e){return n("mouseup",e)},Mouseover:function(e){return n("mouseover",e)},Mouseout:function(e){return n("mouseout",e)},Mouseenter:function(e){return n("mouseenter",e)},Mouseleave:function(e){return n("mouseleave",e)},Scroll:function(e){return n("scroll",e)}}}}();if("object"===("undefined"==typeof i?"undefined":_typeof(i)))return i.v}return is.Func(n)?new EventHandler(e,t,n).Once():new EventHandler(e,t,r,n).Once()}function make_element(e,t,n,r,i){if(is.Bool(t)&&t===!0&&(r=t,t="",n=void 0),is.Bool(n)&&(r=n,n=void 0),is.Undef(t,n,r)&&(t="",r=!0),r===!0){var o=function(){var r=doc.createElement(e);return r.innerHTML=t,is.Object(n)&&forEach(n,function(e,t){return r.setAttribute(t,e)}),is.String(n)&&n.split("&").forEach(function(e){return is.Def(e.split("=")[1])?r.setAttribute(e.split("=")[0],e.split("=")[1]):r.setAttribute(e.split("=")[0],"")}),is.Def(i)&&is.Object(i)&&forEach(i,function(e,t){return r.setAttribute(t,e)}),{v:r}}();if("object"===("undefined"==typeof o?"undefined":_typeof(o)))return o.v}var u="";return is.String(n)&&n.split("&").forEach(function(e){return u+=is.Def(e.split("=")[1])?e.split("=")[0]+'="'+e.split("=")[1]+'" ':e.split("=")[0]+" "}),is.Object(n)&&forEach(n,function(e,t){return u+=" "+t+'="'+e+'" '}),is.Def(i)&&is.Object(i)&&forEach(i,function(e,t){return u+=" "+t+'="'+e+'" '}),"<"+e+" "+u+">"+t+"</"+e+">"}function domNodeList(e){return{On:function(t,n){return _On(t,e,n)},includes:function(t){for(var n=0;n<e.length;n++)if(e[n]===t)return!0;return!1},css:function(e){return is.Def(e)?forEach(this.element,function(t){return forEach(e,function(e,n){return t.style[n]=e})}):console.error("styles unefined")}}}var type=function(e,t){return toString.call(e)===t},isT=function(e,t){return("undefined"==typeof e?"undefined":_typeof(e))===t},nT=function(e,t){return!isT(e,t)},eachisInstanceof=function(e,t){if(isT(t,"string")||void 0===t||null===t)return!1;for(var n=0,r=!0;n<t.length;n++)if(t[n]instanceof e){r=!1;break}return r},ifelse=function(e,t,n){return e?t:n},regexps={url:/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,timeString:/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,dateString:/^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,hexadecimal:/^[0-9a-fA-F]+$/,hexColor:/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,ipv4:/^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,ipv6:/^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,ip:/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/},Ready=!1,Craft=void 0,processInvocation=function(e,t,n){return t=t.length>n?t.slice(0,n):t,t.length===n?e.apply(null,t):createFn(e,t,n)},createFn=function createFn(fn,Args,totalArity){var remainingArity=totalArity-Args.length;return is.Between(remainingArity,10,0)?function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return processInvocation(fn,Args.concat(t),totalArity)}:function(fn,args,arity){for(var a=[],i=0;arity>i;i++)a.push("a"+i.toString());return eval("false||function("+a.join(",")+"){ return processInvocation(fn, args.concat(Array.from(arguments)));}")}(fn,args,remainingArity)},head=doc.getElementsByTagName("head")[0],CrafterStyles=doc.createElement("style"),ua=navigator.userAgent,tem=void 0,_br=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);_br&&null!==(tem=ua.match(/version\/([\.\d]+)/i))&&(_br[2]=tem[1]),_br?[_br[1],_br[2]]:[navigator.appName,navigator.appVersion,"-?"],CrafterStyles.setAttribute("crafterstyles",""),CrafterStyles.innerHTML="\n@keyframes NodeInserted {from {opacity:.99;}to {opacity: 1;}} [view-bind],[input-bind] {animation-duration: 0.001s;animation-name: NodeInserted;}",head.appendChild(CrafterStyles),CrafterStyles=doc.querySelector("[crafterstyles]",head);var is={Bool:function(e){return"boolean"==typeof e},String:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length&&t.every(function(e){return isT(e,"string")})},Arr:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length&&t.every(function(e){return Array.isArray(e)})},Arraylike:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length&&t.every(function(e){return is.Def(e.length)?!0:!1})},Undef:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length&&t.every(function(e){return isT(e,"undefined")})},Def:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length&&t.every(function(e){return nT(e,"undefined")})},Null:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length&&t.every(function(e){return null===e})},Node:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length&&t.every(function(e){return e instanceof Node})}),NodeList:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length?!is.Node(t[0])&&t.every(function(e){return null===e?!1:e instanceof NodeList||eachisInstanceof(Node,e)}):!1}),Num:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length&&t.every(function(e){return!isNaN(Number(e))})},Object:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length&&t.every(function(e){return type(e,"[object Object]")})},Element:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length&&t.every(function(e){return type(e,"[object HTMLElement]")})},File:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length&&t.every(function(e){return type(e,"[object File]")})},FormData:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length&&t.every(function(e){return type(e,"[object FormData]")})},Map:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length&&t.every(function(e){return type(e,"[object Map]")})},Func:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length&&t.every(function(e){return"function"==typeof e})},Blob:function(e){return type(e,"[object Blob]")},RegExp:function(e){return type(e,"[object RegExp]")},Date:function(e){return type(e,"[object Date]")},Set:function(e){return type(e,"[object Set]")},Args:function(e){return!is.Null(e)&&(type(e,"[object Arguments]")||"object"===("undefined"==typeof e?"undefined":_typeof(e))&&"callee"in e)},Symbol:function(e){return type(e,"[object Symbol]")},"char":function(e){return is.String(e)&&1===e.length},space:function(e){return is["char"](e)?e.charCodeAt(0)>8&&e.charCodeAt(0)<14||32===e.charCodeAt(0):!1},Uppercase:function(e){return is.String(e)&&!is.Num(e)&&e===e.toUpperCase()},Lowercase:function(e){return is.String(e)&&e===e.toLowerCase()},Alphanumeric:function(e){return/^[0-9a-zA-Z]+$/.test(e)},Email:function(e){return regexps.email.test(e)},URL:function(e){return regexps.url.test(e)},HexColor:function(e){return regexps.hexColor.test(e)},ip:function(e){return regexps.ip.test(e)},ipv4:function(e){return regexps.ipv4.test(e)},ipv6:function(e){return regexps.ipv6.test(e)},hexadecimal:function(e){return regexps.hexadecimal.test(e)},today:function(e){return is.Date(e)&&e.toDateString()===(new Date).toDateString()},yesterday:function(e){var t=new Date;return is.Date(e)&&e.toDateString()===new Date(t.setDate(t.getDate()-1)).toDateString()},tomorrow:function(e){var t=new Date;return is.Date(e)&&e.toDateString()===new Date(t.setDate(t.getDate()+1)).toDateString()},past:function(e){return is.Date(e)&&e.getTime()<(new Date).getTime()},future:function(e){return!is.past(e)},time:function(e){return regexps.timeString.test(e)},dateString:function(e){return regexps.dateString.test(e)},Between:function(e,t,n){return t>=e&&e>=n},"int":function(e){return is.Num(e)&&e%1===0},even:function(e){return is.Num(e)&&e%2===0},odd:function(e){return is.Num(e)&&e%2!==0},positive:function(e){return is.Num(e)&&e>0},negative:function(e){return is.Num(e)&&0>e},eq:function(e,t){return e===t},lt:function(e,t){return t>e},lte:function(e,t){return t>=e},bt:function(e,t){return e>t},bte:function(e,t){return e>=t},empty:function(e){if(is.Object(e)){var t=Object.getOwnPropertyNames(e).length;return 0===t||1===t&&is.Arr(e)||2===t&&is.Args(e)?!0:!1}return is.Arr(e)?e.length<=0:""===e},ReactiveVariable:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return t.length&&t.every(function(e){return e instanceof _ReactiveVariable?!0:!1})},Native:function(e){var t="undefined"==typeof e?"undefined":_typeof(e);return"function"===t?RegExp("^"+String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g,"\\$&").replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$").test(Function.prototype.toString.call(e)):e&&"object"==t&&/^\[object .+?Constructor\]$/.test(e.toString)||!1}},QueryOrNodetoNodeArray=function(e,t){return is.String(e)&&is.String(t)||is.Node(t)?e=_queryAll(e,t):is.String(e)&&(e=_queryAll(e)),ifelse(!is.Null(e)&&is.Node(e),function(){return[e]},function(){return is.NodeList(e)?Array.from(e):[]})()},CraftSocket=function(){function e(t,n){var r=this;_classCallCheck(this,e),is.Arr(n)?this.Socket=new WebSocket(t,n):this.Socket=new WebSocket(t),this.messageCalls=[],this.RecieveCalls=[],this.Socket.onmessage=function(e){return r.RecieveCalls.forEach(function(t){return t(e)})}}return _createClass(e,[{key:"send",value:function(e,t){var n=this;this.messageCalls.push(function(){n.Socket.send(e),is.Def(t)&&is.Func(t)&&n.recieve(function(e,n){return t(e,n)})}),this.Socket.onopen=function(e){return n.messageCalls[n.messageCalls.length-1]()}}},{key:"recieve",value:function(e){is.Func(e)?this.RecieveCalls.push(function(t){return e(t.data,t)}):console.error("callback is not a function or is not defined")}},{key:"close",value:function(){this.Socket.close()}}]),e}(),_ReactiveVariable=function(){function e(t,n){return _classCallCheck(this,e),is.Func(n)?(this.val=t,this.Handle=n):console.error("ReactiveVariable needs a handler function after the value"),this.val}return _createClass(e,[{key:"set",value:function(e){return this.val!==e&&(this.Oldval=this.val,this.val=e,this.Handle(this.Oldval,e)),this.val}},{key:"get",value:function(){return this.val}},{key:"reset",value:function(e){is.Func(e)?this.Handle=e:console.error("ReactiveVariable.Reset only takes a function")}}]),e}(),EventHandler=function(){function e(t,n,r,i){for(var o=arguments.length,u=Array(o>4?o-4:0),a=4;o>a;a++)u[a-4]=arguments[a];_classCallCheck(this,e),this.EventType=t,this.Target=n!==root&&n!==doc?QueryOrNodetoNodeArray(n,i):n,this.FuncWrapper=function(e){return r(e,e.srcElement,u||[])}}return _createClass(e,[{key:"On",value:function(){var e=this;return is.Arr(this.Target)?this.Target.forEach(function(t){return t.addEventListener(e.EventType,e.FuncWrapper)}):this.Target.addEventListener(this.EventType,this.FuncWrapper),this}},{key:"Off",value:function(){var e=this;return is.Arr(this.Target)?this.Target.forEach(function(t){return t.removeEventListener(e.EventType,e.FuncWrapper)}):this.Target.removeEventListener(this.EventType,this.FuncWrapper),this}},{key:"Once",value:function(){var e=this.FuncWrapper,t=this.Target,n=this.EventType,r=function i(r){e(r),is.Arr(t)?t.forEach(function(e){return e.removeEventListener(n,i)}):t.removeEventListener(n,i)};return is.Arr(t)?t.forEach(function(e){return e.addEventListener(n,r)}):t.addEventListener(n,r),this}}]),e}(),_query=function(e,t){return is.Def(t)?ifelse(is.String(t),function(){return doc.querySelector(t).querySelector(e)},function(){return t.querySelector(e)})():doc.querySelector(e)},_queryAll=function(e,t){return is.Def(t)?is.Node(t)||t===doc?t.querySelectorAll(e):_query(t).querySelectorAll(e):doc.querySelectorAll(e)},domMethods=function(){function e(t,n){_classCallCheck(this,e),is.String(t)&&(t=is.Def(n)?_query(t,n):_query(t)),this.element=t}return _createClass(e,[{key:"html",value:function(e){return is.Def(e)?this.element.innerHTML:(this.element.innerHTML=e,this)}},{key:"text",value:function(e){return is.Def(e)?this.element.textContent:(this.element.textContent=e,this)}},{key:"replace",value:function(e){return this.element.parentNode.replaceChild(el,this.element),this}},{key:"appendTo",value:function(e){return is.String(e)&&(e=_query(e)),null!==e&&e.appendChild(this.element),this}},{key:"append",value:function(e){return is.String(e)?this.element.innerHTML+=e:this.element.appendChild(e),this}},{key:"prepend",value:function(e){return is.String(e)?this.element.innerHTML=e+this.element.innerHTML:this.element.insertBefore(e,this.element.firstChild),this}},{key:"On",value:function(e,t){return _On(e,this.element,t)}},{key:"css",value:function(e){var t=this;return is.Def(e)?forEach(e,function(e,n){return t.element.style[n]=e}):console.error("Styles Object undefined"),this}},{key:"gotClass",value:function(e){return this.element.classList.contains(e)}},{key:"addClass",value:function(e){return this.element.classList.add(e),this}},{key:"stripClass",value:function(e){return this.element.classList.remove(e),this}},{key:"stripAttr",value:function(e){return this.element.removeAttribute(e),this}},{key:"hasAttr",value:function(e){return this.element.hasAttribute(e)}},{key:"setAttr",value:function(e,t){return this.element.setAttribute(e,t),this}},{key:"getAttr",value:function(e){return this.element.getAttribute(e)}},{key:"getSiblings",value:function(){for(var e=[],t=this.element.parentNode.childNodes,n=0;n<t.length;n++)t[n]!==this.element&&e.push(t[n]);return e}},{key:"Width",value:function(e){return is.Def(e)?(this.element.style.width=e,this):this.element.getBoundingClientRect().width}},{key:"Height",value:function(e){return is.Def(e)?(this.element.style.height=e,this):this.element.getBoundingClientRect().height}},{key:"getRect",value:function(){return this.element.getBoundingClientRect()}},{key:"move",value:function(e,t,n,r,i){return is.Bool(r)&&(i=r),is.String(n)&&(r=transfrom),n===!0?this.element.style.transform="translateX("+e+"px) translateY("+t+"px)":this.css({position:is.String(r)?r:"",left:e+"px",top:t+"px"}),i===!0?this:void 0}},{key:"query",value:function(e){return _query(e,this.element)}},{key:"queryAll",value:function(e){return _queryAll(e,this.element)}}]),e}(),dom=function(e,t){if(is.Node(e))return new domMethods(e);if(is.NodeList(e))return new domNodeList(e);if(is.String(e)){var n=is.String(t)||is.Node(t)?_queryAll(e,t):_queryAll(e);return n.length?1===n.length?new domMethods(n[0]):domNodeList(n):console.warn("dom('"+e+"') -> null CSS selector")}return Craft.dom};Craft={ArraytoObject:function(e){var t=void 0,n={};for(t in e)is.Def(e[t])&&(n[t]=e[t]);return n},filterArr:function(e,t){for(var n=-1,r=-1,i=[];++n<e.length;)t(e[n],n,e)&&(i[++r]=e[n]);return i},removeFromArr:function(e,t){var n=e.IndexOf(t),r=[],i=!1,o=0;for(is.String(e)&&(e=Array.from(e),i=!0);o<e.length;o++)o!==n&&r.push(e[o]);return i?r:r},sameArray:function(e,t){var n=e.length;if(n!==t.length)return!1;for(;n--;)if(e[n]!==t[n])return!1;return!0},concatObjects:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];return forEach(e,function(){return n.forEach(function(t){return forEach(t,function(t,n){n in e?is.Arr(e[n])?e[n].includes(t)||e[n].push(t):t!==e[n]&&(e[n]=[t,e[n]]):e[n]=t})})}),e},mergeObjects:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];return Object.assign(e,n)},omit:function(e,t){if(is.Object(e)&&e!==t?forEach(e,function(n,r){(t===r||t===n)&&delete e[r]}):(is.Arr(e)||is.String(e))&&e.forEach(function(n){t===n&&(e=Craft.removeArrItem(e,n))}),is.Object(e)&&e.hasOwnProperty(t))throw new Error("couldn't omit "+t+" from Object");if(e.includes(t))throw new Error("couldn't omit "+t+" from Array/String");return e},dom:{div:function(e,t,n){return make_element("div",e,t,n)},span:function(e,t,n){return make_element("span",e,t,n)},label:function(e,t,n){return make_element("label",e,t,n)},p:function(e,t,n){return make_element("p",e,t,n)},img:function(e,t,n,r){return make_element("img","",n,r,{src:e,alt:t})},ul:function(e,t,n){var r="";return is.Arr(e)&&e.forEach(function(t){is.String(t)?r+=make_element("li",t):is.Object(e)&&(r+=make_element("li",t.inner,t.attr))}),make_element("ul",r,t,n)},ol:function(e,t,n){var r="";return is.Arr(e)&&e.forEach(function(t){is.String(t)?r+=make_element("li",t):is.Object(e)&&(r+=make_element("li",t.inner,t.attr))}),make_element("ol",r,t,n)},h:function(e,t,n,r){return make_element("h"+e,t,n,r)},a:function(e,t,n,r){return make_element("a",t,n,r,{href:e})},script:function e(t,n,r){var e=make_element("script",t,n,!0,{type:"text/javascript"});return e.defer=r!==!1,e},table:function(e,t,n){if(!is.Arr(e))return is.String(e)?make_element("table",e,t,n):make_element("table","",t,n);if(!e.every(function(e){return is.Object(e)}))throw new TypeError("dom.table -> rows : all entries need to be objects");var r="";return forEach(e,function(e){return forEach(e,function(e,t){var n="<tr>";"cell"===t||"td"===t||"data"===t?is.String(e)?n+="<td>"+e+"</td>":is.Object(e)&&(n+=make_element("tr",e.inner,e.attr)):("head"===t||"th"===t)&&(is.String(e)?n+="<th>"+e+"</th>":is.Object(e)&&(n+=make_element("th",e.inner,e.attr))),n+="</tr>",r+=n})}),make_element("table",r,t,n)}},CurrentBrowser:{is:function(e){return _br.join(" ").toLowerCase().includes(e.toLowerCase())?!0:!1},browser:_br.join(" ")},loader:{pre:"craft:",fetchImport:function(e){e.key=e.key||e.url;var t=+new Date,n=Craft.loader.get(e.key);return n||n.expire-t>0?new Promise(function(e){return e(n)}):new Promise(function(n,r){return fetch(e.url).then(function(r){return r.text().then(function(r){e.data=r,e.stamp=t,e.expire=t+60*(e.expire||4e3)*60*1e3,e.cache&&localStorage.setItem(Craft.loader.pre+e.key,JSON.stringify(e)),n(e)})})["catch"](function(e){return r("Craft.loader problem fetching import -> "+e)})})},setPrekey:function(e){return Craft.loader.pre=e+":"},get:function(e){return JSON.parse(localStorage.getItem(e.includes(Craft.loader.pre)?e:Craft.loader.pre+e)||!1)},remove:function(e){return localStorage.removeItem(e.includes(Craft.loader.pre)?e:Craft.loader.pre+e)},removeAll:function(e){for(var t in localStorage)(!e||Craft.loader.get(t).expire<=+new Date)&&Craft.loader.remove(t)}},Import:function(){for(var e=[],t=arguments.length,n=Array(t),r=0;t>r;r++)n[r]=arguments[r];return n.forEach(function(t){return t.test===!1?Craft.loader.remove(t.css||t.script):e.push(Craft.loader.fetchImport({url:t.css||t.script,type:t.css?"css":"script",exec:t.execute!==!1,cache:t.cache!==!1,defer:t.defer?"defer":null,key:t.key||void 0,expire:t.expire||void 0}))}),Promise.all(e).then(function(e){return e.map(function(e){return e.exec?"css"===e.type?CrafterStyles.innerHTML+="\n"+e.data:head.appendChild(dom().script(e.data,"key="+e.key,e.defer)):void 0})})},router:{addHandle:function(e,t){Craft.router.handlers.push({link:e,func:t})},handle:function(e,t){is.String(e)?(location.href.includes(e)&&t(e),Craft.router.addHandle(e,t)):is.Arr(e)&&e.forEach(function(e){location.href.includes(e)&&t(e),Craft.router.addHandle(e,t)})},handlers:[],links:[],link:function(e,t,n,r){return Craft.router.links.push(function(){return _On(is.String(r)?r:"click",e,function(e){return n?open(t):location=t})})},open:function(e){function t(t,n){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e,t){return t?open(e):location=e}),setTitle:function(e){return doc.title=e},setView:function(e,t,n){var r=is.String(e)?_query(e):e;r.insertAdjacentHTML(is.String(n)?n:"beforeend",t)},fetchView:function(e,t,n,r){var i=is.String(e)?_query(e):e,o="Cr:"+t,u=localStorage.getItem(o);r=is.String(r)?r:"beforeend",null!==i&&null===u?fetch(t).then(function(e){return e.text().then(function(e){n===!0&&is.Null(u)&&localStorage.setItem(o,e),i.insertAdjacentHTML(r,e)})})["catch"](function(e){return console.error("Couldn't fetch view -> "+e)}):i.insertAdjacentHTML(r,u)},clearCache:function(){for(var e in localStorage)localStorage.key(e).includes("Cr:")&&localStorage.removeItem(localStorage.key(e))}},Cookies:{get:function(e){return e?decodeURIComponent(doc.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},set:function(e,t,n,r,i,o){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var u="";return n&&(is.Num(n)&&(u=n===1/0?"; expires=Fri, 11 April 9997 23:59:59 UTC":"; max-age="+n),is.String(n)&&(u="; expires="+n),is.Date(n)&&(u="; expires="+n.toUTCString())),doc.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+u+(i?"; domain="+i:"")+(r?"; path="+r:"")+(o?"; secure":""),!0},remove:function(e,t,n){return Craft.Cookies.has(e)?(doc.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(t?"; path="+t:""),!0):!1},has:function(e){return e?new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(doc.cookie):!1},keys:function(){var e=doc.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/);return e.forEach(function(e){return decodeURIComponent(e)}),e}},curry:function(e){return createFn(e,[],e.length)},delay:function(e,t){return setTimeout(e,t)},after:function(e,t){var n=this;if(is.Func(t)||!is.Func(e))throw new Error("Craft.after -> func is not a function");return t=e,e=Number.isFinite(e=+e)?e:0,--e<1?function(){for(var e=arguments.length,r=Array(e),i=0;e>i;i++)r[i]=arguments[i];return t.apply(n,r)}:void 0},debounce:function(e,t,n){var r=void 0;return function(){for(var i=this,o=arguments.length,u=Array(o),a=0;o>a;a++)u[a]=arguments[a];var c=function(){r=null,n||t.apply(i,u)},s=n&&!r;clearTimeout(r),r=setTimeout(c,e),s&&t.apply(this,u)}},throttle:function(e,t,n){var r=void 0,i=void 0,o=void 0,u=null,a=0;n||(n={});var c=function(){a=n.leading===!1?0:Date.now(),u=null,o=t.apply(r,i),u||(r=i=null)};return function(){var s=Date.now();a||n.leading!==!1||(a=s);var f=e-(s-a);return r=this,i=arguments,0>=f||f>e?(u&&(clearTimeout(u),u=null),a=s,o=t.apply(r,i),u||(r=i=null)):u||n.trailing===!1||(u=setTimeout(c,f)),o}},once:function(e,t){var n=void 0;return function(){return is.Func(e)&&(n=e.apply(t||this,arguments),e=null),n}},css:function(e,t){return is.Def(t,e)&&is.Node(e)?forEach(t,function(t,n){return e.style[n]=t}):console.error("invalid args")},hasCapitals:function(e){return Array.from(e).some(function(e){return is.Uppercase(e)})},OverrideFunction:function(e,t,n){for(var r=e.split("."),i=r.pop(),o=0;o<r.length;o++)n=n[r[o]];n[i]=t},len:function(e){if(is.Object(e))return Object.keys(e).length;if(is.Map(e)||is.Set(e))return e.size;try{return e.length}catch(t){console.error("could not find length of value")}},indexOfDate:function(e,t){for(var n=0;n<e.length;n++)if(+e[n]===+t)return n;return-1},type:function(){for(var e=[],t=arguments.length,n=Array(t),r=0;t>r;r++)n[r]=arguments[r];return n.forEach(function(t){return e.push("undefined"==typeof t?"undefined":_typeof(t))}),e.length<2?e[0]:e},memoize:function(e,t){if(!is.Func(e)||t&&!is.Func(t))throw new TypeError("arg provided is not a function");var n=new WeakMap,r=function i(){for(var r=arguments.length,o=Array(r),u=0;r>u;u++)o[u]=arguments[u];var a=t?t.apply(this,o):o[0];if(n.has(a))return n.get(a);var c=e.apply(this,o);return i.cache=n.set(a,c),c};return r},Scope:{},WebComponents:[],tabActive:!0,make_element:make_element,Binds:new Map,mouse:{x:0,y:0,over:null,observe:new _ReactiveVariable(!1,function(e,t){return t?Craft.mouse.eventhandler.On():Craft.mouse.eventhandler.Off()})},easing:{inOutQuad:function(e,t,n,r){return e/=r/2,1>e?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)}},JumpTo:function(e,t){t=t||{},t.duration=t.duration||400,t.offset=t.offset||0,t.callback=t.callback||void 0;var n=void 0,r=void 0,i=root.pageYOffset,o=is.String(e)?t.offset+_query(e).getBoundingClientRect().top:e,u=0,a=function c(e){0===u&&(n=e),u++,r=e-n,root.scrollTo(0,Craft.easing.inOutQuad(r,i,o,t.duration)),r<t.duration?requestAnimationFrame(function(e){return c(e)}):function(){root.scrollTo(0,i+o),is.Func(t.callback)&&t.callback.call(),n=void 0}()};requestAnimationFrame(function(e){return a(e)})},nodeExists:function(e,t){return null!==_queryAll(e,t=is.Node(t)?t:_query(t))},ObjToFormData:function(e){var t=void 0,n=new FormData;for(t in e)n.append(t,e[t]);return n},URLfrom:function(e){return URL.createObjectURL(new Blob([e]))},OnScroll:function(e,t){return is.Func(t)?_On("scroll",e,function(e){return t(e.deltaY<1?!1:!0,e)}):console.error("second param needs to be a function")},OnResize:function(e){return is.Func(e)?Craft.ResizeHandlers.add(e):console.error("Craft.OnResize -> func is not a function")},OnScrolledTo:function(e,t,n){return _On("scroll",function(r){pageYOffset>=e?t(r):is.Def(n)&&n(r)})},WhenScrolledTo:function(e){return new Promise(function(t,n){var r=_On("scroll",function(n){(pageYOffset>=e||pageYOffset<=e)&&(r.Off(),t(n))})})},WhenReady:function(e){return new Promise(function(t,n){e=e||Craft.Scope,Ready?t(e):!function(){var r=setInterval(function(){Ready&&(t(e),clearInterval(r))},25);setTimeout(function(){clearInterval(r),Ready||n("Things didn't load correctly/intime -> load failed")},4500)}()})},poll:function(e,t,n,r,i){return function(){is.Func(n)&&(is.Func(r)&&(i=r),r=n,n=void 0);var o=setInterval(function(){(is.Bool(e)&&e===!0||is.Func(e)&&e()===!0)&&(r(),clearInterval(o))},t||20);is.Num(n)&&setTimeout(function(){clearInterval(o),(is.Bool(e)&&e===!1||is.Func(e)&&e()===!1)&&i()},n);
}()},strongPassword:function(e,t,n,r,i){if(e.length<=t-1)return i?"Password too short":!1;if(n===!0&&Craft.hasCapitals(e)===!1)return i?"Password should contain Capital letters":!1;if(r===!0&&/\d/g.test(e)===!1)return i?"Password should contain a number":!1;for(var o=arguments.length,u=Array(o>5?o-5:0),a=5;o>a;a++)u[a-5]=arguments[a];if(0!==u.length){var c=!0;u.join();if(u.forEach(function(t){e.includes(t)||(c=!1)}),!c)return i?"":!1}return!0},randomString:function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)},GenUID:function(){return Craft.randomString()+"-"+Craft.randomString()+"-"+Craft.randomString()+"-"+Craft.randomString()+"-"+Craft.randomString()+"-"+Craft.randomString()},createWebComponent:function(e,t){is.String&&(e=JSON.parse(e)),CrafterStyles.innerHTML+=e.css,head.appendChild(dom().script(e.js+("\nCraft.WebComponents.push('"+t+"')"),"webcomponent="+e.name,!0))},newComponent:function(e,t){if(is.Undef(t))throw new Error("newComponent: "+e+" -> config is undefined");var n=Object.create(HTMLElement.prototype),r={};forEach(t,function(e,t){"created"===t?n.createdCallback=e:"inserted"===t?n.attachedCallback=e:"destroyed"===t?n.detachedCallback=e:"attr"===t?n.attributeChangedCallback=e:"extends"===t?r["extends"]=e:n[t]=e}),r.prototype=n,document.registerElement(e,r)},applyBinds:function(e,t){var n=t?t.get(e):Craft.Binds.get(e),r=is.ReactiveVariable(n)?n.val:n;queryEach('[input-bind="'+e+'"],[view-bind="'+e+'"]',function(e){return"INPUT"===e.tagName||"TEXTAREA"===e.tagName?e.value=r:e.innerHTML=r})},newBind:function(e,t,n,r){is.Func(n)?Craft.Binds.set(e,new _ReactiveVariable(t,n)):r?r.set(e,t):Craft.Binds.set(e,t),Craft.applyBinds(e,r)},setBind:function(e,t,n){var r=n?n.get(e):Craft.Binds.get(e);is.ReactiveVariable(r)?r.set(t):n?n.set(e,t):Craft.Binds.set(e,t),Craft.applyBinds(e)},getBind:function(e,t){var n=t?t.get(e):Craft.Binds.get(e);return is.ReactiveVariable(n)?n.val:n},BindExists:function(e,t){return t?t.has(e):Craft.Binds.has(e)}},Craft.curry.to=Craft.curry(function(e,t){return createFn(t,[],e)}),Craft.curry.adaptTo=Craft.curry(function(e,t){return Craft.curry.to(e,function(e){for(var n=arguments.length,r=Array(n>1?n-1:0),i=1;n>i;i++)r[i-1]=arguments[i];return t.apply(null,r.slice(1).concat(e))})}),Craft.curry.adapt=function(e){return Craft.curry.adaptTo(e.length,e)},Craft.loader.removeAll(!0),_On("animationstart",doc,function(e){"NodeInserted"===e.animationName&&is.Node(e.target)&&!function(){var t=e.target;if(t.hasAttribute("input-bind")&&!function(){var e=t.getAttribute("input-bind"),n="INPUT"===t.tagName||"TEXTAREA"===t.tagName,r=_On("input",t,function(){return Craft.setBind(e,n?t.value:t.innerHTML)}),i=new MutationObserver(function(e){return e.forEach(function(e){"attributes"===e.type&&("input-bind"!==e.attributeName||t.hasAttribute("input-bind")||(r.Off(),i.disconnect()))})});i.observe(t,{attributes:!0}),Craft.BindExists(e)?Craft.applyBinds(e):Craft.newBind(e,n?t.value:t.innerHTML)}(),t.hasAttribute("view-bind")){var n=t.getAttribute("view-bind");Craft.BindExists(n)?Craft.applyBinds(n):Craft.newBind(n,"INPUT"===t.tagName||"TEXTAREA"===t.tagName?t.value:t.innerHTML)}t.hasAttribute("link")&&_On("click",t,function(e){return t.hasAttribute("newtab")?open(t.getAttribute("link")):Craft.router.open(t.getAttribute("link"))})}()}),Craft.mouse.eventhandler=_On("mousemove",function(e){Craft.mouse.observe.val===!0&&(Craft.mouse.x=e.clientX,Craft.mouse.y=e.clientY,Craft.mouse.over=e.target)}),_On("blur",function(e){return Craft.tabActive=!1}),_On("focus",function(e){return Craft.tabActive=!0}),Craft.newComponent("fetch-webcomponent",{inserted:function(){var e=this,t=this.getAttribute("src");if(null!==t){var n=function(){var n=null,r=dom(e),i="cache-component";return Craft.WebComponents.includes(t)?{v:!1}:(r.hasAttr(i)&&(n=localStorage.getItem(t),null!==n&&Craft.createWebComponent(n,t)),void(null===n&&fetch(t).then(function(e){return e.json().then(function(e){CrafterStyles.innerHTML+=e.css,head.appendChild(dom().script(e.js+("\nCraft.WebComponents.push('"+t+"')"),"webcomponent="+e.name,!0)),"true"==r.getAttr(i)&&localStorage.setItem(t,JSON.stringify(e))})})["catch"](function(e){return console.error(e+": could not load webcomponent")})))}();if("object"===("undefined"==typeof n?"undefined":_typeof(n)))return n.v}}}),Once("DOMContentLoaded",function(e){Craft.router.links.forEach(function(e){return e()}),Craft.WebComponents.length===_queryAll("fetch-webcomponent").length?Ready=!0:Craft.poll(function(){return Craft.WebComponents.length===_queryAll("fetch-webcomponent").length},35,2e3,function(){return Ready=!0},function(){console.warn("loading is taking longer than usual :("),Ready=!0})}),_On("hashchange",function(e){return Craft.router.handlers.forEach(function(e){return location.hash===e.link||location===e.link?e.func(location.hash):null})}),root.is=is,root.dom=dom,root.Craft=Craft,root.On=_On,root.Once=Once,root.forEach=forEach,root.QueryOrNodetoNodeArray=QueryOrNodetoNodeArray,root.CraftSocket=CraftSocket,root.EventHandler=EventHandler,root.ReactiveVariable=_ReactiveVariable,root.query=_query,root.queryAll=_queryAll,root.queryEach=queryEach}(document,self);