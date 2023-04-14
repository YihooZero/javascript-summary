Function.prototype.bind = Function.prototype.bind
    || function () {
        var self = this,
            context = [].shift.call(arguments),
            args = [].slice.call(arguments);
        return function () {
            return self.apply(context, [].concat.call(args, [].slice.call(arguments)))
        }
    }

Function.prototype.bind = Function.prototype.bind
    || function (context) {
        if (typeof this !== 'function') {
            throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
        }

        const self = this
        const args = Array.prototype.slice.call(arguments, 1)

        const fNOP = function () {}

        const fBound = function () {
            const bindArgs = Array.prototype.slice.call(arguments)
            return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
        }

        fNOP.prototype = this.prototype
        fBound.prototype = new fNOP()
        return fBound
    }

// 具体可参照https://muyiy.cn/blog/3/3.4.html#bind，此文章考虑了更多的边界情况
// 权威参照地址https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/function-bind.js
