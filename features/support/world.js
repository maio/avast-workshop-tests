function CustomWorld () {
  this.users = {};
}

module.exports = function () {
  this.World = CustomWorld;
};
