let p;
let q;
let n;
let ϕn;
let e;
let d = 0;

function usePrimes() {
  p = document.getElementById("p").value;
  q = document.getElementById("q").value;
  if (p == '' || q == '') {
    alert("You need to enter primes first");
  } else {
    n = p * q;
    document.getElementById("n").innerHTML = "n=" + n;
    ϕn = (p - 1) * (q - 1);
    document.getElementById("ϕn").innerHTML = "ϕ(n)=" + ϕn;
  }
}

function generateD() {
  e = document.getElementById("e").value;
  while (((e * d) % ϕn) != 1) {
    d++;
  }
  document.getElementById("d").innerHTML = "d=" + d;
}

function generateKeys() {
  document.getElementById("private").innerHTML = 'private key (d,n) -> (' + d + ',' + n + ')';
  document.getElementById("public").innerHTML = 'public key (e,n) -> (' + e + ',' + n + ')';
}
