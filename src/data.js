function s(b) {
  var tries = 0;
  b = b.map(r=>r.map(s=>s===''?shuffle([1,2,3,4,5,6,7,8,9]):[s]));
  for (var i = 0 ; i < b.length ; i++) {
    for (var j = 0 ; j < b.length ; j++) {
      if (b[i][j].length===1 && !goodBoard(i,j)) {
        return {tries,b:'  --  invalid board'};
      }
    }
  }
  var stop = false;
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
    if (changed && !stop) {
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
        return false;
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
      if (!stop) {
        stop = ![1,2,3,4,5,6,7,8,9].every(v=>a.reduce((o,s)=>o.concat(b[s[0]][s[1]]),[]).some(n=>n===v));
      }
    }
  }());
  if (stop) {
    return {tries,b:'  --  no solution'};
  }
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
          return {tries,b};
        }
      }
    }
    b[i][j] = c;
  }(0,0)) || {tries,b:'  --  no solution'};
  function shuffle(a) {
    a.forEach((v,i)=>a.push(a.splice(Math.random()*(a.length-i),1)[0]));
    return a;
  }
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
}

export default s;
