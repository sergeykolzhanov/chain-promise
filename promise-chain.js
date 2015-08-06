var Promise = require('promise');
/**
 * Promises chaining
 * chain([
 *    promise,
 *    chain.toContext('prop'),
 *    function(r)  { return promise(r) },
 *    chain.toContext('nestedProp'),
 *    chain.context  
 * ], initialValue)
 * @param {Array} items Chain items
 * @param {} value Value passed into chain start
 */
function chain(queue, v) {
    var context = {};
    return new Promise(function(resolve, reject){
        var  i = -1,  l = queue.length,
            next = function(r) {
                var p;
                i++;
                if(i == l) resolve(r);
                p = queue[i];
                if(typeof p === 'function') {
                    try {
                        p = p.call(context, r);
                    } catch(e) {
                        reject(e);
                    }
                }
                if(p && typeof p.then == 'function') {
                    p.then(next).catch(reject);
                } else {
                    next(p);
                }
            };
        next(v);
    });
}

/**
 *  @param {string} Context property name to put marker value
 */
chain.toContext = function(name) {
    return function(a) { this[name] = a; }
};

/**
 * Returns chain context
 */
chain.context = function() {
    return this;
};
chain.all = Promise.all;

module.exports = chain;