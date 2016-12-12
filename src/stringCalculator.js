function add (s) {
  var numbers = s.split(',').map((n) => parseInt(n));

  return numbers.reduce((sum, n) => sum + n, 0);
}

exports.add = add;
