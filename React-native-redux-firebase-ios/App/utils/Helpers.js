const Helpers = {

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

};

export default Helpers;
