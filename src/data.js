var e = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ];

var f = [
    [0,0,0,1,0,4,0,0,0],
    [0,0,1,0,0,0,8,0,0],
    [0,8,0,7,0,3,0,6,0],
    [9,0,7,0,0,0,1,0,6],
    [0,0,0,0,0,0,0,0,0],
    [3,0,4,0,0,0,5,0,8],
    [0,5,0,2,0,6,0,3,0],
    [0,0,9,0,0,0,6,0,0],
    [0,0,0,8,0,5,0,0,0]
  ];

var g = [
    [7,0,8,0,0,0,0,0,1],
    [0,6,0,9,0,7,0,0,0],
    [0,0,0,0,2,5,0,0,7],
    [0,0,3,0,0,0,0,1,5],
    [0,0,0,0,3,0,0,0,0],
    [6,2,0,0,0,0,4,0,0],
    [3,0,0,7,4,0,0,0,0],
    [0,0,0,2,0,6,0,5,0],
    [4,0,0,0,0,0,7,0,9]
  ];

var h = [
    [0,0,0,1,0,0,8,0,0],
    [0,0,4,0,5,9,0,1,0],
    [5,0,0,0,0,6,0,0,4],
    [0,0,7,0,0,0,0,8,0],
    [0,3,0,0,1,0,0,2,0],
    [0,8,0,0,0,0,9,0,0],
    [4,0,0,3,0,0,0,0,8],
    [0,7,0,9,2,0,3,0,0],
    [0,0,3,0,0,1,0,0,0]
  ];

(function(b) {
  function shuffle(a) {
    // a.forEach((v,i)=>a.push(a.splice(Math.random()*(a.length-i),1)[0]));
    return a;
  }
  b = b.map(r=>r.map(s=>s===0?shuffle([1,2,3,4,5,6,7,8,9]):[s]));
  (function prune() {
    var changed = 0;
    (function rec(i,r,c) {
      trim(row(i));
      trim(column(i));
      trim(grid(r,c));
      if (i<8) {
        rec(i+1,c<6?r:r+3,c<6?c+3:0);
      }
    }(0,0,0));
    if (changed) {
      prune();
    }
    function trim(a) {
      var done = [];
      var s;
      a.filter(p=>{
        if (b[p[0]][p[1]].length>1) {
          return true;
        }
        done.push(b[p[0]][p[1]][0]);
      }).forEach(p=>
        done.forEach(v=>{
          s = b[p[0]][p[1]].indexOf(v);
          if (s>-1) {
            b[p[0]][p[1]].splice(s,1);
            changed++;
          }
        })
      );
      var tally = {};
      a.forEach(p=>{
        b[p[0]][p[1]].forEach(v=>{
          if (!tally[v]) {
            tally[v] = {val:v,n:0,p:p};
          }
          tally[v].n++;
        });
      });
      for (var key in tally) {
        if (tally[key].n===1 && b[tally[key].p[0]][tally[key].p[1]].length>1) {
          b[tally[key].p[0]][tally[key].p[1]] = [tally[key].val];
          changed++;
        }
      }
    }
  }());
  var tries = 0;
  return (function step(i,j) {
    var res;
    var c = b[i][j].slice();
    for (var n = 0 ; n < c.length ; n++) {
      b[i][j] = [c[n]];
      if (goodBoard(i,j)) {
        tries++;
        if (j<8) {
          res = step(i,j+1);
          if (res) {return res}
        }
        else if (i<8) {
          res = step(i+1,0);
          if (res) {return res}
        }
        else {
          return {tries,b:b.map(r=>r.map(s=>s[0]))};
        }
      }
    }
    b[i][j] = c;
  }(0,0)) || tries;
  function goodBoard(i,j) {
    return check(row(i)) && check(column(j)) && check(grid(i,j));
    function check(a) {
      for (var n = 0 ; n < a.length ; n++) {
        if (!(a[n][0]===i&&a[n][1]===j)&&b[a[n][0]][a[n][1]].length===1) {
          if (b[i][j][0]===b[a[n][0]][a[n][1]][0]) {
            return false;
          }
        }
      }
      return true;
    }
  }
  function row(i) {
    return b.map((v,j)=>[i,j]);
  }
  function column(j) {
    return b.map((v,i)=>[i,j]);
  }
  function grid(i,j,cb) {
    while (i%3!==0) {i--}
    while (j%3!==0) {j--}
    var res = [];
    for (var r = 0 ; r < 3 ; r++) {
      for (var c = 0 ; c < 3 ; c++) {
        res.push([i+r,j+c]);
      }
    }
    return res;
  }
}(e));
