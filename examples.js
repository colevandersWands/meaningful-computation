{ console.log('--- alphebetize a string of letters ---');

  /* challenge description
    challenge: given a string of letters, return a new string with all the letters ordered alphabetically

    problem space: strings containing only letters
    solution space: array of charcodes
    justification: letters and charcode charecters both have an ordering, and their ordering behaves the same.  ie. s1 < s2 -> ch1 < ch2
  */

console.log('--- develop mapping ---');

  const mapping_tests = [
    {name: 'abc', args: ['abc'], expected: [97, 98, 99]},
    {name: 'azc', args: ['azc'], expected: [97, 122, 99]},
    {name: 'zde', args: ['zde'], expected: [122, 100, 101]},
    {name: 'DeD', args: ['DeD'], expected: [68, 101, 68]},
  ]
  function map(str) {
    let result = []
    for (let letter of str) {
      result.push(letter.charCodeAt(0))
    }
    return result;
  }
  run_tests(map, mapping_tests)

console.log('--- develop demapping ---');

  const demapping_tests = [
    {name: 'abc', args: [[97, 98, 99]], expected: 'abc'},
    {name: 'azc', args: [[97, 122, 99]], expected: 'azc'},
    {name: 'zde', args: [[122, 100, 101]], expected: 'zde'},
    {name: 'DeD', args: [[68, 101, 68]], expected: 'DeD'},
  ]
  function demap(arr) {
    let result = ''
    for (let number of arr) {
      result += String.fromCharCode(number)
    }
    return result;
  }
  run_tests(demap, demapping_tests)

console.log('--- demonstrate inversion ---');

  const identity_tests = [
    {name: 'abc', args: ['abc'], expected: 'abc'},
    {name: 'azc', args: ['azc'], expected: 'azc'},
    {name: 'zde', args: ['zde'], expected: 'zde'},
    {name: 'DeD', args: ['DeD'], expected: 'DeD'},
  ]
  function identity(str) {
    return demap(map(str))
  }
  run_tests(identity, identity_tests)

console.log('--- build solution in mapped set ---');

  const mapped_solution_tests = [
    {name: 'abc', args: [[97, 98, 99]], expected: [97, 98, 99]},
    {name: 'azc', args: [[97, 122, 99]], expected: [97, 99, 122]},
    {name: 'zde', args: [[122, 100, 101]], expected: [100, 101, 122]},
    {name: 'DeD', args: [[68, 101, 68]], expected: [68, 68, 101]},
  ]
  function mapped_solution(arr) {

    return arr.sort(sortNumber);

    function sortNumber(a,b) {
      return a - b;
    }
  }
  run_tests(mapped_solution, mapped_solution_tests)
   // https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly

console.log('--- apply mapping & demapping ---')

  const full_solution_tests = [
    {name: 'abc', args: ['abc'], expected: 'abc'},
    {name: 'azc', args: ['azc'], expected: 'acz'},
    {name: 'zde', args: ['zde'], expected: 'dez'},
    {name: 'DeD', args: ['DeD'], expected: 'DDe'},
    {name: 'DeD', args: ['Ded'], expected: 'Dde'},
  ]
  function full_solution(str) {
    const mapped_arg = map(str);
    const mapped_sol = mapped_solution(mapped_arg);
    const solution = demap(mapped_sol);
    return solution;
  }
  run_tests(full_solution, full_solution_tests);




  // testing utils
  function run_tests(_target, _cases, _log) {
    for (let t_case of _cases) {
      let expected = t_case.expected;

      let actual;
      let msg;
      let log;
      if (_log) {
        log = _target(... t_case.args, true);
        actual = log.result;
      } else {
        actual = _target(... t_case.args, false);
      };

      let pass;
      if (typeof expected === 'object') {
        const _actual = JSON.stringify(actual);
        const _expected = JSON.stringify(expected);
        pass = _actual === _expected;
      } else {
        pass = actual === expected;
      };

      if (!pass && _log) {
        console.log(`    ${t_case.name}: \n` + 
            "actual: ", log, "\n" +
            `expected: {${typeof expected}, ${expected}}`);
      } else if (!pass) {
        console.log(`${t_case.name}: \n` + 
            `   actual: {${typeof actual}, ${actual}} \n` +
            `   expected: {${typeof expected}, ${expected}}`);
      };
    };
  };

}