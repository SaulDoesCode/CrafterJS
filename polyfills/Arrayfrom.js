if (!Array.from) Array.from = (function () {
  var toStr = Object.prototype.toString,
    isFunc = function (fn) {return typeof fn === 'function' || toStr.call(fn) === '[object Function]'},
    toInt = function (val) {
      var num = Number(val);
      if (isNaN(num)) return 0;
      if (num === 0 || !isFinite(num)) return num;
      return (num > 0 ? 1 : -1) * Math.floor(Math.abs(num));
    },
    toLength = function (val) {return Math.min(Math.max(toInt(val), 0), (Math.pow(2, 53) - 1))};
  return function from(arrlike) {
    var C = this, items = Object(arrlike);
    if (arrlike == null) {throw new TypeError("Array.from needs arraylike object !null || undefined")}
    var T, mapFn = arguments.length > 1 ? arguments[1] : void undefined;
    if (typeof mapFn !== 'undefined') {
      if (!isFunc(mapFn)) {throw new TypeError('Array.from second arg must be a function')}
      if (arguments.length > 2) T = arguments[2];
    }
    var len = toLength(items.length), A = isFunc(C) ? Object(new C(len)) : new Array(len), k = 0, kval;
    while (k < len) {
      kval = items[k];
      (mapFn) ? A[k] = typeof T === 'undefined' ? mapFn(kval, k) : mapFn.call(T, kval, k): A[k] = kval;
      k += 1;
    }
    A.length = len;
    return A;
  };
}());
