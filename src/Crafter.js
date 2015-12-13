/**
 *  @overview Crafter.js , minimalist front-end library
 *  @author Saul van der Walt - https://github.com/SaulDoesCode/
 *  @license MIT
 */
"use strict";
((doc, root) => {

  let type = (obj, str) => toString.call(obj) === str,
    isT = (val, str) => typeof val === str,
    nT = (val, str) => !isT(val, str),
    eachisInstanceof = (test, collection) => {
      if (isT(collection, 'string') || collection === undefined || collection === null) return false;
      let i = 0,
        allgood = true;
      for (; i < collection.length; i++) {
        if (collection[i] instanceof test) {
          allgood = false;
          break;
        }
      }
      return allgood;
    },
    Ready = false,
    head = doc.getElementsByTagName('head')[0],
    CrafterStyles = doc.createElement('style'),
    ua = navigator.userAgent,
    tem, _br = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if (_br && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) _br[2] = tem[1];
  _br ? [_br[1], _br[2]] : [navigator.appName, navigator.appVersion, '-?'];

  CrafterStyles.setAttribute('crafterstyles', '');
  CrafterStyles.innerHTML = `\n@keyframes NodeInserted {from {opacity:.99;}to {opacity: 1;}} [view-bind] {animation-duration: 0.001s;animation-name: NodeInserted;}`;
  head.appendChild(CrafterStyles);
  CrafterStyles = doc.querySelector('[crafterstyles]', head);

  /** is - Type Testing / Assertion */
  var is = {
    /**
     * Test if something is a boolean type
     * @param val - value to test
     */
    Bool: val => typeof val === 'boolean',
    /**
     * Test if something is a String
     * @param args - value/values to test
     */
    String: (...args) => args.length && args.every(o => isT(o, 'string')),
    /**
     * Test if something is a Number
     * @param args - value/values to test
     */
    Num: (...args) => args.length && args.every(o => isT(o, 'number')),
    /**
     * Test if something is an Array
     * @param args - value/values to test
     */
    Arr: (...args) => args.length && args.every(o => Array.isArray(o)),
    /**
     * Test if something is an Array-Like
     * @param args - value/values to test
     */
    Arraylike: (...args) => args.length && args.every(o => is.Def(o.length) ? true : false),
    /**
     * Determine whether a variable is undefined
     * @param args - value/values to test
     */
    Undef: (...args) => args.length && args.every(o => isT(o, 'undefined')),
    /**
     * Determine whether a variable is in fact defined
     * @param args - value/values to test
     */
    Def: (...args) => args.length && args.every(o => nT(o, 'undefined')),
    /**
     * Determine whether a variable is null
     * @param args - value/values to test
     */
    Null: (...args) => args.length && args.every(o => o === null),
    /**
     * Determine whether a variable is a DOM Node
     * @param args - value/values to test
     */
    Node: (...args) => args.length && args.every(o => o instanceof Node),
    /**
     * Determine whether a variable is a DOM NodeList or Collection of Nodes
     * @param args - value/values to test
     */
    NodeList: (...args) => args.length ? args.every(n => n === null ? false : n instanceof NodeList || eachisInstanceof(Node, n)) : false,
    /**
     * Determine if a variable is an Object
     * @param args - value/values to test
     */
    Object: (...args) => args.length && args.every(o => type(o, '[object Object]')),
    /**
     * Determine if a variable is a HTMLElement
     * @param args - value/values to test
     */
    Element: (...args) => args.length && args.every(o => type(o, '[object HTMLElement]')),
    /**
     * Determine if a variable is a File Object
     * @param args - value/values to test
     */
    File: (...args) => args.length && args.every(o => type(o, '[object File]')),
    /**
     * Determine if a variable is of a FormData type
     * @param args - value/values to test
     */
    FormData: (...args) => args.length && args.every(o => type(o, '[object FormData]')),
    /**
     * Determine if a variable is a Map
     * @param args - value/values to test
     */
    Map: (...args) => args.length && args.every(o => type(o, '[object Map]')),
    /**
     * Determine if a variable is a function
     * @param args - value/values to test
     */
    Func: (...args) => args.length && args.every(o => typeof o === 'function'),
    /**
     * Determine if a variable is of Blob type
     * @param obj - variable to test
     */
    Blob: obj => type(obj, '[object Blob]'),
    /**
     * Determine if a variable is a Regular Expression
     * @param obj - variable to test
     */
    RegExp: obj => type(obj, '[object RegExp]'),
    /**
     * Determine if a variable is a Date type
     * @param obj - variable to test
     */
    Date: obj => type(obj, '[object Date]'),
    /**
     * Determine if a variable is a Set
     * @param obj - variable to test
     */
    Set: obj => type(obj, '[object Set]'),
    /**
     * Determine if a variable is a Symbol
     * @param obj - variable to test
     */
    Symbol: obj => type(obj, '[object Symbol]'),
    /**
     * Determine if a String (Single Character) is UPPERCASE
     * @param {string} char - variable to test
     */
    UpperCase: char => (char >= 'A') && (char <= 'Z'),
    /**
     * Determine if a String contains only characters and numbers (alphanumeric)
     * @param {string} str - variable to test
     */
    Alphanumeric: str => /^[0-9a-zA-Z]+$/.test(str),
    /**
     * Determines whether a String is a valid Email
     * @param {string} email - variable to test
     */
    Email: email => /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(email),
    /**
     * Determines whether a Number is between a maximum and a minimum
     * @param {Number} val - number value to test
     * @param {Number} max - maximum to compare the value with
     * @param {Number} min - minimum to compare the value with
     * @returns {Boolean} wether or not the value is between the max and min
     */
    Between: (val, max, min) => (val <= max && val >= min),
    /**
     * Determines if two variables are equal
     * @param a - first value to compare
     * @param b - second value to compare
     */
    eq: (a, b) => a === b,
    /**
     * Determines if a number is LOWER than another
     * @param {Number} val - value to test
     * @param {Number} other - num to test with value
     */
    lt: (val, other) => val < other,
    /**
     * Determines if a number is LOWER than or equal to another
     * @param {Number} val - value to test
     * @param {Number} other - num to test with value
     */
    lte: (val, other) => val <= other,
    /**
     * Determines if a number is BIGGER than another
     * @param {Number} val - value to test
     * @param {Number} other - num to test with value
     */
    bt: (val, other) => val > other,
    /**
     * Determines if a number is BIGGER than or equal to another
     * @param {Number} val - value to test
     * @param {Number} other - num to test with value
     */
    bte: (val, other) => val >= other,
    /**
     * Determines if a value is an instance of the ReactiveVariable class
     * @param args - value/values to test
     */
    ReactiveVariable: (...args) => args.length && args.every(o => o instanceof ReactiveVariable ? true : false),
    /**
     * Test if something is a Native JavaScript feature
     * @param val - value to test
     */
    Native: val => {
      let type = typeof val;
      return type === 'function' ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : (val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString)) || false;
    },
  };

  /**
   * Converts any Query/QueryAll to an Array of Nodes even if there is only one Node
   * @param {Node|NodeList|Array|String} val - pass either a CSS Selector string , Node/NodeList or Array of Nodes
   */
  function QueryOrNodetoNodeArray(val) {
    if (is.String(val)) val = queryAll(val);
    if (is.Node(val)) return [val];
    else if (is.NodeList(val)) return Array.from(val);
  }

  /**
   * associative collection of functions
   * that can be added,removed or iterated through
   */
  class FunctionIterator {
    constructor() {
        this.functions = {};
        this.length = Object.keys(this.functions).length;
      }
      /**
       * Check if the FunctionIterator Collection contains a certain function
       * @param {string} funcName - name to identify the function with
       */
    has(funcName) {
        if (this.functions.has(funcName)) return true;
        return false;
      }
      /**
       * Add a function to the collection
       * @param {string} funcName - name to identify the function with
       * @param {Function} func - function to be stored in the FunctionIterator Collection
       */
    add(funcName, func) {
        if (is.Func(func)) {
          this.functions[funcName] = func;
        } else if (is.Func(funcName)) {
          this.functions[Craft.randomString()] = funcName;
        } else console.error("Invalid function parameter in FunctionIterator.add(funcName , _function_ )");
        this.length = Object.keys(this.functions).length;
      }
      /**
       * Remove a function from the collection
       * @param {string} funcName - name to identify the function with
       */
    remove(funcName) {
        if (this.functions.has(funcName)) {
          this.functions[funcName] = null;
          delete this.functions[funcName];
        } else console.warn("No Such Function Entry in FunctionIterator");
        this.length = Object.keys(this.functions).length;
      }
      /**
       * Remove all functions from the collection
       * @param {string} funcName - name to identify the function with
       */
    removeAll() {
        delete this.functions;
        this.functions = null;
        this.functions = {};
        this.length = Object.keys(this.functions).length;
      }
      /**
       * Execute each function in the Collection
       * all arguments passed will be applied to each function in the collection
       * usefull for centralizing an Event Listener such as a Window Resize event
       */
    runEach() {
        for (let i in this.functions) this.functions[i].apply(this, arguments);
      }
      /**
       * Execute a single function in the collection
       * @param {string} funcName - name to identify the function with
       * @param {...*=} args - arguments/parameters to pass to the function
       */
    runOne(funcName, ...arg) {
      this.functions.hasOwnProperty(funcName) ? this.functions[funcName].apply(this, args) : console.warn("No Such Function Entry in FunctionIterator");
    }
  }

  /** Handles WebSockets in a contained manner with send and recieve methods */
  class CraftSocket {
    /**
     * Creates a new WebSocket connection
     * @param {string} wsAddress - the WebSocket address example "ws://localhost:3000/"
     * @param {Array=} protocols - the protocols to pass to the WebSocket Connection
     */
    constructor(wsAddress, protocols) {
        is.Arr(protocols) ? this.Socket = new WebSocket(wsAddress, protocols) : this.Socket = new WebSocket(wsAddress);
        this.messageCalls = [];
        this.RecieveCalls = [];
        this.Socket.onmessage = e => this.RecieveCalls.forEach(call => call(e));
      }
      /**
       * Sends a message along the WebSocket Connection
       * @param {string} message - the WebSocket address example "ws://localhost:3000/"
       * @param {function=} func - optional function to recieve the response with -> "function ( response , event ) { ... } or response => ..."
       */
    send(message, func) {
        this.messageCalls.push(() => {
          this.Socket.send(message);
          if (is.Def(func) && is.Func(func)) this.recieve((data, e) => func(data, e));
        });
        this.Socket.onopen = e => this.messageCalls[this.messageCalls.length - 1]();
      }
      /**
       * Recieves messages from the WebSocket Server
       * @param {function} func - function to recieve the response and event with -> "function ( response , event ) { ... } or response => ..."
       */
    recieve(func) {
        is.Func(func) ? this.RecieveCalls.push(e => func(e.data, e)) : console.error("callback is not a function or is not defined")
      }
      /** Closes the WebSocket Connection */
    close() {
      this.Socket.close()
    }
  }

  /**
   * Variable that is used for Data Binding and other reactive processes
   */
  class ReactiveVariable {
    /**
     * Creates a ReactiveVariable
     * @param {*} val - value you'd liek the ReactiveVariable to Store
     * @param {function} handle - function that gets called whenever the ReactiveVariable changes -> "function( OldValue , newValue ) {...}"
     * @returns {*} Returns the value assigned to the ReactiveVariable
     */
    constructor(val, handle) {
        if (is.Func(handle)) {
          this.val = val;
          this.Handle = handle;
        } else console.error('ReactiveVariable needs a handler function after the value');
        return this.val
      }
      /**
       * Sets the new value of the ReactiveVariable , this will also call the handle function
       * @param {*} val - new value to assign the ReactiveVariable
       */
    set(val) {
        if (this.val !== val) {
          this.Oldval = this.val;
          this.val = val;
          this.Handle(this.Oldval, val);
        }
        return this.val;
      }
      /**
       * Gets the value of the ReactiveVariable , ReactiveVariable.val also does this
       */
    get() {
        return this.val
      }
      /**
       * Redefine the handle function of the ReactiveVariable
       * @param {function} handle - function that gets called whenever the ReactiveVariable changes -> "function( OldValue , newValue ) {...}"
       */
    reset(handle) {
      is.Func(handle) ? this.Handle = handle : console.error('ReactiveVariable.Reset only takes a function');
    }
  }

  /**
   * Event Handling Class
   * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can also be a NodeList to listen on multiple Nodes
   * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @param {...*} args - extra optional arguments/parameters to pass to the handler function
   * @returns Interface On,Off,Once
   */
  class EventHandler {
    constructor(EventType, Target, Func, ...args) {
        this.EventType = EventType;
        this.Target = (Target !== window && Target !== document) ? QueryOrNodetoNodeArray(Target) : Target;
        this.FuncWrapper = e => Func(e, e.srcElement, args || []);
      }
      /**
       * Activates the EventHandler to start listening for the EventType on the Target/Targets
       */
    On() {
        is.Arr(this.Target) ? this.Target.forEach(target => target.addEventListener(this.EventType, this.FuncWrapper)) : this.Target.addEventListener(this.EventType, this.FuncWrapper)
      }
      /**
       * De-activates / turns off the EventHandler to stop listening for the EventType on the Target/Targets
       * can still optionally be re-activated with On again
       */
    Off() {
        is.Arr(this.Target) ? this.Target.forEach(target => target.removeEventListener(this.EventType, this.FuncWrapper)) : this.Target.removeEventListener(this.EventType, this.FuncWrapper);
      }
      /**
       * Once the the Event has been triggered the EventHandler will stop listening for the EventType on the Target/Targets
       * the Handler function will be called only Once
       */
    Once() {
      let func = this.FuncWrapper,
        target = this.Target,
        etype = this.EventType,
        listenOnce = e => {
          func(e);
          is.Arr(target) ? target.forEach(t => t.removeEventListener(etype, listenOnce)) : target.removeEventListener(etype, listenOnce);
        }
      is.Arr(target) ? target.forEach(t => t.addEventListener(etype, listenOnce)) : target.addEventListener(etype, listenOnce);
    }
  }

  /**
   * Easy way to loop through Collections and Objects
   * @param {Array|Object|NodeList} iterable - any collection that is either an Object or has a .length value
   * @param {function} func - function called on each iteration -> "function( value , indexOrKey ) {...}"
   */
  function forEach(iterable, func) {
    if (is.Undef(iterable)) throw new Error("forEach -> cannot iterate through undefined");
    if (!is.Func(func)) throw new Error("forEach -> invalid or undefined function provided");
    let i = 0;
    if (is.Def(iterable.length))
      for (; i < iterable.length; i++) func(iterable[i], i);
    else
      for (i in iterable)
        if (iterable.hasOwnProperty(i)) func(iterable[i], i)
  }

  /**
   * Easy way to get a DOM Node or Node within another DOM Node using CSS selectors
   * @param {string} selector - CSS selector to query the DOM Node with
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   */
  function query(selector, element) {
    if (is.String(element)) return doc.querySelector(element).querySelector(selector);
    if (is.Node(element)) return element.querySelector(selector);
    return doc.querySelector(selector);
  }
  /**
   * Easy way to get a DOM NodeList or NodeList within another DOM Node using CSS selectors
   * @param {string} selector - CSS selector to query the DOM Nodes with
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   */
  function queryAll(selector, element) {
    if (is.String(element)) return doc.querySelector(element).querySelectorAll(selector);
    if (is.Node(element)) return element.querySelectorAll(selector);
    return doc.querySelectorAll(selector);
  }
  /**
   * Easy way to loop through Nodes in the DOM using a CSS Selector or a NodeList
   * @param {string|NodeList} selector - CSS selector to query the DOM Nodes with or NodeList to iterate through
   * @param {Node|string=} element - Optional Node or CSS selector to search within insead of document
   * @param {function} func - function called on each iteration -> "function( Element , index ) {...}"
   */
  function queryEach(selector, element, func) {
    if (is.Func(element)) {
      func = element;
      element = doc;
    }
    let elements, i = 0;
    if (is.String(element, selector)) elements = doc.querySelector(element).querySelectorAll(selector);
    if (is.String(selector)) elements = element.querySelectorAll(selector);
    if (is.NodeList(selector) || is.Element(selector)) elements = [selector];
    for (; i < elements.length; i++) func(elements[i], i);
  }

  /**
   * Starts listening for an EventType on the Target/Targets
   * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
   * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @returns Off - when On is defined as a variable "var x = On(...)" it allows you to access all the EventHandler interfaces Off,Once,On
   */
  function On(EventType, Target, func) {
    if (is.Func(Target)) {
      func = Target;
      Target = root;
    }
    let handle = new EventHandler(EventType, Target, func);
    handle.On();
    return handle;
  }

  /**
   * Starts listening for an EventType on the Target/Targets ONCE after triggering the Once event Listener will stop listening
   * @param {string} EventType - set the type of event to listen for example "click" or "scroll"
   * @param {Node|NodeList|window|document} Target - the Event Listener's target , can be a NodeList to listen on multiple Nodes
   * @param {function} Func - Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
   * @returns On,Off,Once - when Once is defined as a variable "var x = Once(...)" it allows you to access all the EventHandler interfaces Off,Once,On
   */
  function Once(EventType, Target, func) {
    if (is.Func(Target)) {
      func = Target;
      Target = root;
    }
    let handle = new EventHandler(EventType, Target, func);
    handle.Once();
    return handle;
  }

  function make_element(name, inner, attributes, NodeForm, extraAttr) {
    if (is.Bool(attributes)) {
      NodeForm = attributes;
      attributes = undefined;
    }
    if (is.Bool(inner)) {
      NodeForm = inner;
      attributes = undefined;
    }
    if (NodeForm === true) {
      let newEl = doc.createElement(name);
      newEl.innerHTML = inner;
      if (is.Object(attributes)) forEach(attributes, (val, attr) => newEl.setAttribute(attr, val));
      if (is.String(attributes)) attributes.split('&').forEach(attr => is.Def(attr.split('=')[1]) ? newEl.setAttribute(attr.split('=')[0], attr.split('=')[1]) : newEl.setAttribute(attr.split('=')[0], ''));
      if (is.Def(extraAttr) && is.Object(extraAttr)) forEach(extraAttr, (val, attr) => newEl.setAttribute(attr, val));
      return newEl;
    }
    let attrString = ``;
    if (is.String(attributes)) attributes.split('&').forEach(attr => attrString += is.Def(attr.split('=')[1]) ? `${attr.split('=')[0]}="${attr.split('=')[1]}" ` : `${attr.split('=')[0]} `);
    if (is.Object(attributes)) forEach(attributes, (val, attr) => attrString += ` ${attr}="${val}" `);
    if (is.Def(extraAttr) && is.Object(extraAttr)) forEach(extraAttr, (val, attr) => attrString += ` ${attr}="${val}" `);
    return `<${name} ${attrString}>${inner}</${name}>`;
  }

  /**
   * Function that returns many useful methods for interacting with and manipulating the DOM or creating elements
   * @param {Node|NodeList|string=} element - optional Node, NodeList or CSS Selector that will be affected by the methods returned
   */
  var dom = element => {
    if (is.String(element)) {
      let elements = queryAll(element);
      (elements.length > 1) ? element = elements: element = elements[0];
    }
    if (is.Node(element)) return {
      html: val => val ? element.innerHTML = val : element.innerHTML,
      text: val => val ? element.textContent = val : element.textContent,
      replace: val => element.parentNode.replaceChild(el, element),
      remove: () => element.parentNode.removeChild(element),
      appendTo: val => {
        let el;
        is.Node(val) ? el = val : el = query(val);
        if (el !== null) el.appendChild(element);
      },
      append: val => is.String(val) ? element.innerHTML += val : element.parentNode.appendChild(element),
      prepend: val => is.String(val) ? element.innerHTML = val + element.innerHTML : element.insertBefore(val, element.firstChild),
      On: (eventType, func) => On(eventType, element, func),
      css: styles => is.Def(styles) ? forEach(styles, (prop, key) => element.style[key] = prop) : console.error('Styles Object undefined'),
      gotClass: CSSclass => element.classList.contains(CSSclass),
      addClass: CSSclass => element.classList.add(CSSclass),
      stripClass: CSSclass => element.classList.remove(CSSclass),
      stripAttr: Attr => element.removeAttribute(Attr),
      hasAttr: Attr => element.hasAttribute(Attr),
      setAttr: (Attr, val) => element.setAttribute(Attr, val),
      getAttr: Attr => element.getAttribute(Attr),
      getSiblings: () => {
        let siblings = [],
          AllChildren = element.parentNode.childNodes;
        for (let i = 0; i < AllChildren.length; i++)
          if (AllChildren[i] !== element) siblings.push(AllChildren[i]);
        return siblings;
      },
      Width: () => element.getBoundingClientRect().width,
      Height: () => element.getBoundingClientRect().height,
      getRect: () => element.getBoundingClientRect(),
      setWidth: Width => element.style.width = Width,
      setHeight: Height => element.style.height = Height,
      find: (selector, forceSelectAll) => {
        let Localelement = queryAll(selector, element);
        if (Localelement.length > 1 || forceSelectAll === true && !is.Null(Localelement)) return Localelement;
        if (!is.Null(Localelement)) return Localelement[0];
        return null;
      }
    };
    else if (is.NodeList(element)) return {
      On: (eventType, func) => On(eventType, element, func),
      find: (selector, forceSelectAll) => {
        let Localelement = queryAll(selector, element);
        if (Localelement.length > 1 || forceSelectAll === true && !is.Null(Localelement)) return Localelement;
        if (!is.Null(Localelement)) return Localelement[0];
        return null;
      },
      includes: SelectorNode => {
        if (!is.Node(SelectorNode)) SelectorNode = query(SelectorNode);
        for (let index = 0; index < element.length; index++)
          if (element[index] === SelectorNode) return true;
        return false;
      },
      css: styles => is.Def(styles) ? forEach(element, el => forEach(styles, (prop, key) => el.style[key] = prop)) : console.error('styles unefined'),
    }
    return {
      div: (inner, attr, node) => make_element('div', inner, attr, node),
      span: (inner, attr, node) => make_element('span', inner, attr, node),
      label: (inner, attr, node) => make_element('label', inner, attr, node),
      p: (inner, attr, node) => make_element('p', inner, attr, node),
      img: (src, alt, inner, attr, node) => make_element('img', inner, attr, node, {
        src: src,
        alt: alt
      }),
      ul: (items, attr, node) => {
        let list = ``;
        if (is.Arr(items)) items.forEach(item => {
          if (is.String(item)) list += make_element('li', item);
          else if (is.Object(items)) list += make_element('li', item.inner, item.attr);
        });
        return make_element('ul', list, attr, node)
      },
      ol: (items, attr, node) => {
        let list = ``;
        if (is.Arr(items)) items.forEach(item => {
          if (is.String(item)) list += make_element('li', item);
          else if (is.Object(items)) list += make_element('li', item.inner, item.attr);
        });
        return make_element('ol', list, attr, node)
      },
      h: (level, inner, attr, node) => make_element('h' + level, inner, attr, node),
      a: (link, inner, attr, node) => make_element('a', inner, attr, node, {
        href: link
      }),
      script: (code, attr, node) => make_element('script', code, attr, node, {
        type: 'text/javascript'
      }),
      table: (rows, attr, node) => {
        if (!is.Arr(rows)) return is.String(rows) ? make_element('table', rows, attr, node) : make_element('table', '', attr, node);
        if (!rows.every(o => is.Object(o))) throw new TypeError('dom.table -> rows : all entries need to be objects');
        let tableInner = ``;
        forEach(rows, row => forEach(row, (val, key) => {
          let row = `<tr>`;
          if (key === 'cell' || key === 'td' || key === 'data') {
            if (is.String(val)) row += `<td>${val}</td>`;
            else if (is.Object(val)) row += make_element('tr', val.inner, val.attr)
          } else if (key === 'head' || key === 'th') {
            if (is.String(val)) row += `<th>${val}</th>`;
            else if (is.Object(val)) row += make_element('th', val.inner, val.attr)
          }
          row += '</tr>'
          tableInner += row;
        }));
        return make_element('table', tableInner, attr, node);
      },
    }
  };

  /**
   * Craft is Crafter.js Core Object containing most methods.
   * @namespace
   */
  var Craft = {
    ArraytoObject: function(arr) {
      let i, NewObject = {};
      for (i in arr)
        if (is.Def(arr[i])) NewObject[i] = arr[i];
      return NewObject;
    },
    filterArr: (arr, func) => {
      let i = -1,
        x = -1,
        result = [];
      while (++i < arr.length)
        if (func(arr[i], i, arr)) result[++x] = arr[i];
      return result;
    },
    removeFromArr: (Arr, val) => {
      let index = Arr.IndexOf(val),
        temp = [],
        string = false,
        i = 0;
      if (is.String(Arr)) {
        Arr = Array.from(Arr);
        string = true;
      }
      for (; i < Arr.length; i++)
        if (i !== index) temp.push(Arr[i]);
      return string ? temp : temp;
    },
    sameArray: (arr1, arr2) => {
      let i = arr1.length;
      if (i !== arr2.length) return false;
      while (i--)
        if (arr1[i] !== arr2[i]) return false;
      return true;
    },
    concatObjects: (hostobj, ...Objs) => {
      forEach(hostobj, () => {
        Objs.forEach(obj => {
          forEach(obj, (prop, key) => {
            if (key in hostobj) {
              if (is.Arr(hostobj[key])) {
                if (!hostobj[key].includes(prop)) hostobj[key].push(prop);
              } else if (prop !== hostobj[key]) hostobj[key] = [prop, hostobj[key]];
            } else hostobj[key] = prop;
          });
        });
      });
      return hostobj;
    },
    mergeObjects: (hostobj, ...Objs) => Object.assign(hostobj, Objs),
    omit: (obj, val) => {
      if (is.Object(obj) && obj !== val) {
        forEach(obj, (prop, key) => {
          if (val === key || val === prop) delete obj[key];
        });
        if (obj.hasOwnProperty(val)) console.error(`couldn't omit ${val} from Object`);
      } else if (is.Arr(obj) || is.String(obj)) {
        obj.forEach(i => {
          if (val === i) obj = Craft.removeArrItem(obj, i);
        });
        if (val.IndexOf(i) !== -1) console.error(`couldn't omit ${val} from Array or String`);
      }
      return obj;
    },
    CurrentBrowser: {
      is: browser => _br.join(' ').toLowerCase().includes(browser.toLowerCase()) ? true : false,
      browser: _br.join(' ')
    },
    loader: {
      pre: 'craft:',
      CraftImport: obj => {
        let now = +new Date(),
          key = obj.key || obj.url,
          src = Craft.loader.get(key);
        if (src || src.expire - now > 0) return new Promise(resolve => resolve(src));
        return new Promise((success, failed) => fetch(obj.url).then(res => res.text().then(data => {
          obj.data = data;
          obj.stamp = now;
          obj.expire = now + ((obj.expire || 4000) * 60 * 60 * 1000);
          if (obj.cache) localStorage.setItem(Craft.loader.pre + key, JSON.stringify(obj));
          success(obj);
        })).catch(err => failed(`Craft.loader: problem fetching import -> ${err}`)));
      },
      Import: (...args) => {
        let obj, promises = [];
        args.forEach(arg => {
          obj = {
            url: arg.css || arg.script,
            type: arg.css ? 'css' : 'script',
            exec: arg.execute !== false,
            cache: arg.cache !== false
          }
          if (is.Def(arg.key)) obj.key = arg.key;
          if (is.Def(arg.defer)) obj.defer = arg.defer;
          if (is.Def(arg.expire)) obj.expire = arg.expire;
          arg.test === false ? Craft.loader.remove(obj.url) : promises.push(Craft.loader.CraftImport(obj));
        });
        return Promise.all(promises).then(src => src.map(obj => obj.exec ? obj.type === 'css' ? CrafterStyles.innerHTML += '\n' + obj.data : head.appendChild(dom().script(obj.data, {
          defer: obj.defer || undefined
        }, true)) : undefined))
      },
      setPrekey: str => Craft.loader.pre = str + ':',
      get: key => JSON.parse(localStorage.getItem(key.includes(Craft.loader.pre) ? key : Craft.loader.pre + key) || false),
      remove: key => localStorage.removeItem(key.includes(Craft.loader.pre) ? key : Craft.loader.pre + key),
      removeAll: expired => {
        for (let i in localStorage)
          if (!expired || Craft.loader.get(i).expire <= +new Date()) Craft.loader.remove(i)
      }
    },
    router: {
      handle: (RouteLink, func) => {
        if (location.hash === RouteLink || location === RouteLink) func();
        Craft.router.handlers.push({
          link: RouteLink,
          func: func
        })
      },
      handlers: [],
      links: [],
      link: (Selector, link, newtab, eventType) => Craft.router.links.push(() => On(is.Def(eventType) ? eventType : 'click', query(Selector), e => newtab ? open(link) : location = link)),
      open: (link, newtab) => newtab ? open(link) : location = link,
      setTitle: title => doc.title = title,
      setView: (viewHostSelector, view) => query(viewHostSelector).innerHTML = view,
      fetchView: (viewHostSelector, viewURL, cache, id) => {
        if (is.Null(localStorage.getItem("RT_" + id))) fetch(viewURL).then(res => {
          res.text().then(txt => {
            if (cache && is.Def(id) && is.String(id) && is.Null(localStorage.getItem("RT_" + id))) localStorage.setItem(("RT_" + id), txt);
            query(viewHostSelector).innerHTML = txt;
          });
        }).catch(msg => console.warn('Could not fetch view -> ' + msg));
        else if (cache) query(viewHostSelector).innerHTML = localStorage.getItem("RT_" + id)
      },
      clearCache: () => {
        for (let i in localStorage)
          if (localStorage.key(i).includes("RT_")) localStorage.removeItem(localStorage.key(i));
      },
    },
    Cookies: {
      get: (key) => key ? decodeURIComponent(doc.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null : null,
      set: (key, val, expires, path, domain, secure) => {
        if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) return false;
        let expiry = "";
        if (expires) {
          if (is.Num(expires)) expiry = expires === Infinity ? "; expires=Fri, 11 April 9997 23:59:59 UTC" : "; max-age=" + expires;
          if (is.String(expires)) expiry = "; expires=" + expires;
          if (is.Date(expires)) expiry = "; expires=" + expires.toUTCString();
        }
        doc.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(val) + expiry + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (secure ? "; secure" : "");
        return true;
      },
      remove: (key, path, domain) => {
        if (!Craft.Cookies.has(key)) return false;
        doc.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "");
        return true;
      },
      has: key => key ? (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(doc.cookie) : false,
      keys: () => {
        let all = doc.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        all.forEach(c => decodeURIComponent(c));
        return all;
      }
    },
    after: function (n, func) {
      if (!is.Func(func)) is.Func(n) ? func = n : console.error("after : func is not a function");
      n = Number.isFinite(n = +n) ? n : 0;
      return (...args) => --n < 1 ? func.apply(this, args) : () => null;
    },
    debounce: function (wait, func, immediate) {
      let timeout;
      return function () {
        let args = arguments,
          later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
          },
          callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
      };
    },
    throttle: function (wait, func, options) {
      let context, args, result,
        timeout = null,
        previous = 0;
      if (!options) options = {};
      let later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      };
      return function () {
        let now = Date.now();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) timeout = setTimeout(later, remaining);
        return result;
      };
    },
    once: (func, context) => {
      let res;
      return function () {
        if (is.Func(func)) {
          res = func.apply(context || this, arguments);
          func = null;
        }
        return res;
      }
    },
    css: (el, styles) => (is.Def(styles, el) && is.Node(el)) ? forEach(styles, (prop, key) => el.style[key] = prop) : console.error('invalid args'),
    hasCapitals: string => {
      for (let i = 0; i < string.length; i++)
        if (is.UpperCase(string[i])) return true;
      return false;
    },
    OverrideFunction: (funcName, Func, ContextObject) => {
      let namespaces = funcName.split("."),
        func = namespaces.pop();
      for (let i = 0; i < namespaces.length; i++) ContextObject = ContextObject[namespaces[i]];
      ContextObject[func] = Func;
    },
    len: val => {
      if (is.Object(val)) return Object.keys(val).length;
      if (is.Map(val) || is.Set(val)) return val.size;
      try {
        return val.length;
      } catch (e) {
        console.error('could not find length of value');
      }
    },
    indexOfDate: (Collection, date) => {
      for (let i = 0; i < Collection.length; i++)
        if (+Collection[i] === +date) return i;
      return -1;
    },
    type: (...args) => {
      let types = [];
      args.forEach(arg => types.push(typeof arg));
      if (types.length < 2) return types[0];
      return types;
    },
    memoize: function (func, resolver) {
      if (!is.Func(func) || (resolver && !is.Func(resolver))) throw new TypeError("arg provided is not a function");
      let cache = new WeakMap;
      let memoized = function (...args) {
        let key = resolver ? resolver.apply(this, args) : args[0];
        if (cache.has(key)) return cache.get(key);
        let result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      return memoized;
    },
    Scope: {},
    WebComponents: [],
    ResizeHandlers: new FunctionIterator,
    Binds: new Map,
    mouse: {
      x: 0,
      y: 0,
      over: null
    },
    nodeExists: (selector, within) => queryAll(selector, (is.Node(within) ? within = within : within = query(within))) !== null,
    ObjToFormData: obj => {
      let key, formData = new FormData();
      for (key in obj) formData.append(key, obj[key]);
      return formData;
    },
    URLfrom: text => URL.createObjectURL(new Blob([text])),
    OnScroll: (element, func) => is.Func(func) ? On('scroll', element, e => func(e.deltaY < 1 ? false : true, e)) : console.error('second param needs to be a function'),
    OnResize: func => is.Func(func) ? Craft.ResizeHandlers.add(func) : console.error("Craft.OnResize -> func is not a function"),
    OnScrolledTo: (Scroll, ifFunc, elseFunc) => On('scroll', e => {
      if (pageYOffset >= Scroll) ifFunc(e);
      else if (is.Def(elseFunc)) elseFunc(e);
    }),
    WhenScrolledTo: Scroll => new Promise((resolve, reject) => {
      let scrollEvent = On('scroll', e => {
        if (pageYOffset >= Scroll || pageYOffset <= Scroll) {
          scrollEvent.Off();
          resolve(e);
        }
      })
    }),
    /**
     * function that returns a promise when the DOM and WebComponents are finished loading
     * @param {Object=} Scope - Optional overide to the default Craft.Scope passed to the promise
     */
    WhenReady: Scope => new Promise((resolve, reject) => {
      let waitIncase = Craft.CurrentBrowser.is("Firefox") || Craft.CurrentBrowser.is("msie");
      Scope = Scope || Craft.Scope;
      if (Ready) waitIncase ? setTimeout(() => resolve(Scope), 500) : resolve(Scope);
      else {
        let ReadyYet = setInterval(() => {
          if (Ready) {
            waitIncase ? setTimeout(() => resolve(Scope), 500) : resolve(Scope);
            clearInterval(ReadyYet);
          }
        }, 20);
        setTimeout(() => {
          clearInterval(ReadyYet);
          if (!Ready) reject("Things didn't load correctly/intime -> load failed");
        }, 4500)
      }
    }),
    poll: (test, interval, timeout, success, fail) => {
      return (() => {
        if (is.Func(timeout)) {
          if (is.Func(success)) fail = success;
          success = timeout;
          timeout = undefined;
        }
        let Interval = setInterval(() => {
          if ((is.Bool(test) && test === true) || (is.Func(test) && test() === true)) {
            success();
            clearInterval(Interval);
          }
        }, interval || 20);
        if (is.Num(timeout)) setTimeout(() => {
          clearInterval(Interval);
          if ((is.Bool(test) && test === false) || (is.Func(test) && test() === false)) fail();
        }, timeout);
      })();
    },
    /**
     * Usefull method for validating passwords , example Craft.strongPassword('#MyFancyPassword18',8,true,true,"#") -> true requirements met
     * @param {string} pass - string containing the password
     * @param {Number} length - Character length in numbers (Minimum password length)
     * @param {Boolean} caps - Should the password contains Capital Letters
     * @param {Boolean} number - should the password contain Numbers
     * @param {...string} includeChars - every extra argument should be a string containing a character you want the password to include
     */
    strongPassword: (pass, length, caps, number, ...includeChars) => {
      if (pass.length <= length) return false;
      if (caps === true && Craft.hasCapitals(pass) === false) return false;
      if (number === true && /\d/g.test(pass) === false) return false;
      if (includeChars.length !== 0) {
        let hasChars = true;
        includeChars.forEach(ch => {
          if (!pass.includes(ch)) hasChars = false;
        });
        if (!hasChars) return false
      }
      return true;
    },
    /** method for generating random alphanumeric strings*/
    randomString: () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
    /**
    * similar to Craft.randomString in that it generates a unique string , in this case a Unique ID with random alphanumeric strings separated by hyphens
    * example 0ebf-c7d2-ef81-2667-08ef-4cde
    */
    GenUID: () => Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString() + '-' + Craft.randomString(),
    /**
    * Part of Crafter.js's own WebComponent format (.wc) it takes a json object that contains .css and .js values then imports and executes them
    * @param {string} webcomponent - JSON string from Crafter.js's (.wc) WebComponent format
    */
    createWebComponent: webcomponent => {
      if (is.String) webcomponent = JSON.parse(webcomponent);
      CrafterStyles.innerHTML += webcomponent.css;
      let wcJS = dom().script('', {
        src: Craft.URLfrom(webcomponent.js),
        webcomponent: webcomponent.name
      }, true);
      wcJS.onload = e => Craft.WebComponents.push(webcomponent.name);
      head.appendChild(wcJS);
    },
    /**
     * method for creating custom elements configuring their lifecycle's and inheritance
     * the config Object has 5 distinct options ( created , inserted , destroyed , attr and extends )
     * Craft.newComponent('custom-element',{
     * // note : inside each lifecycle method the "this" is a reference to the element being created -> this === element
     *    created : function () { ... }, // this method gets called when the custom-element is first instanciated
     *    inserted : function () { ... }, // this method gets called when the custom-element is first inserted into the DOM
     *    destroyed : function () { ... }, // this method gets called when the custom-element removed from the DOM (AKA. destroyed)
     *    attr : function (attributeChangedName , oldValue , newValue) { ... }, // attr method gets called when attributes are changed on the element
     *    extends : 'button' //tagName of element being inherited from should you want to
     * });
     * @param {string} tag - a hyphenated custom HTML tagname for the new element -> "custom-element"
     * @param {object} config - Object containing all the element's lifecycle methods / extends and attached methods or properties
     */
    newComponent: function (tag, config) {
      if (is.Undef(config)) console.error("Invalid Component Configuration");
      else {
        let element = Object.create(HTMLElement.prototype),
          settings = {}
        forEach(config, (prop, key) => {
          if (key === 'created') element.createdCallback = prop;
          else if (key === 'inserted') element.attachedCallback = prop;
          else if (key === 'destroyed') element.detachedCallback = prop;
          else if (key === 'attr') element.attributeChangedCallback = prop;
          else if (key === 'extends') settings.extends = prop;
          else if (is.Func(prop)) element[key] = prop;
          else if (key !== 'extends' && !is.Func(prop)) element[key] = prop
        });
        settings['prototype'] = element;
        doc.registerElement(tag, settings)
      }
    },
    /** creates a new bound variable , part of Crafter.js's Data Binding System */
    newBind: (key, val, handle) => {
      is.Func(handle) ? Craft.Binds.set(key, new ReactiveVariable(val, handle)) : Craft.Binds.set(key, val);
      queryEach('[view-bind]', el => {
        if (Craft.Binds.has(el.getAttribute('view-bind'))) el.innerHTML = is.Func(handle) ? Craft.Binds.get(el.getAttribute('view-bind')).val : Craft.Binds.get(el.getAttribute('view-bind'));
      });
    },
    /** sets the value of a bound variable */
    setBind: (key, val) => {
      is.ReactiveVariable(Craft.Binds.get(key)) ? Craft.Binds.get(key).set(val) : Craft.Binds.set(key, val);
      queryEach('[view-bind]', el => {
        if (Craft.Binds.has(el.getAttribute('view-bind'))) el.innerHTML = is.ReactiveVariable(Craft.Binds.get(key)) ? Craft.Binds.get(el.getAttribute('view-bind')).val : Craft.Binds.get(el.getAttribute('view-bind'))
      });
    },
  };

  Craft.loader.removeAll(true);

  On('animationstart', doc, e => {
    if (e.animationName === 'NodeInserted' && is.Node(e.target)) {
      if (e.target.hasAttribute('[view-bind]') && Craft.Binds.has(e.target.getAttribute('view-bind'))) e.target.innerHTML = is.ReactiveVariable(Craft.Binds.get(key)) ? Craft.Binds.get(e.target.getAttribute('view-bind')).val : Craft.Binds.get(e.target.getAttribute('view-bind'));
    }
  });

  root.onresize = Craft.throttle(450, e => Craft.ResizeHandlers.runEach(e));
  root.onmousemove = e => {
    Craft.mouse.x = e.clientX;
    Craft.mouse.y = e.clientY;
    Craft.mouse.over = e.target;
  }
  root.onblur = e => Craft.tabActive = false;
  root.onfocus = e => Craft.tabActive = true;

  Craft.newComponent('fetch-webcomponent', {
    created: function () {
      if (this.hasAttribute('src')) {
        let wc = null;
        if (this.hasAttribute('cache-component')) {
          wc = localStorage.getItem(this.getAttribute('src'));
          if (wc !== null) Craft.createWebComponent(wc);
        }
        if (wc === null) fetch(this.getAttribute('src')).then(res => res.json().then(webcomponent => {
          CrafterStyles.innerHTML += webcomponent.css;
          let wcJS = dom().script('', {
            src: Craft.URLfrom(webcomponent.js),
            webcomponent: webcomponent.name
          }, true);
          wcJS.onload = e => {
            Craft.WebComponents.push(webcomponent.name);
            wcJS = null;
            webcomponent = null;
          }
          head.appendChild(wcJS);
          if (this.getAttribute('cache-component') === 'true') localStorage.setItem(this.getAttribute('src'), JSON.stringify(webcomponent));
        })).catch(err => console.error(err + ': could not load webcomponent'))
      }
    }
  });

  Once('DOMContentLoaded', e => {
    queryEach('[link]', el => On('click', el, e => el.hasAttribute('newtab') ? open(el.getAttribute('link')) : Craft.router.open(el.getAttribute('link'))));
    Craft.router.links.forEach(link => link());
    if (Craft.WebComponents.length === queryAll('fetch-webcomponent').length) Ready = true;
    else Craft.poll(() => Craft.WebComponents.length === queryAll('fetch-webcomponent').length, 35, 2000, () => Ready = true, () => {
      console.log('loading is taking longer than usual :(');
      Ready = true
    })
  });


  On('hashchange', e => Craft.router.handlers.forEach(handler => (location.hash === handler.link || location === handler.link) ? handler.func() : null));

  root.is = is;
  root.dom = dom;
  root.Craft = Craft;
  root.On = On;
  root.Once = Once;
  root.forEach = forEach;
  root.QueryOrNodetoNodeArray = QueryOrNodetoNodeArray;
  root.make_element = make_element;
  root.FunctionIterator = FunctionIterator;
  root.CraftSocket = CraftSocket;
  root.EventHandler = EventHandler;
  root.ReactiveVariable = ReactiveVariable;
  root.query = query;
  root.queryAll = queryAll;
  root.queryEach = queryEach;
})(document, self);
