var book = {
  _year: 2004,
  edition: 1
};

Object.defineProperty(book, 'year', {
  get() {
    return this._year;
  },
  set(v) {
    if (v > 2004) {
      this._year = v;
      this.edition += v - 2004;
    }
  }
});

book.year = 2005;
console.log(book.edition);

// NOTE: _year和edition为数据属性；year为访问器属性