// alice data
let p;
let q;
let n;
let ϕn;
let e;
let d = 0;
let m;
let msgSent;

// control
let genKeys = false;
let keyInt = false;
let msgInt = true;

// bob data
let bobN;
let bobE;
let bobMsg;

function usePrimes() {
  p = document.getElementById("p").value;
  q = document.getElementById("q").value;
  if (p == '' || q == '') {
    alert("You need to enter both primes");
  } else {
    if (!checkIfPrime(p)) {
      alert("p is not a prime");
    } else if (!checkIfPrime(q)) {
      alert("q is not a prime");
    } else {
      n = p * q;
      document.getElementById("n").innerHTML = "n=" + n;
      ϕn = (p - 1) * (q - 1);
      document.getElementById("ϕn").innerHTML = "ϕ(n)=" + ϕn;
    }

  }
}

function generateD() {
  e = document.getElementById("e").value;
  if (n == null || ϕn == null) {
    alert("You need to generate n and ϕn first");
  } else if (e == '') {
    alert("Enter your e first");
  } else if (e <= 0 || e >= ϕn) {
    alert("e has to be larger then 0 and smaller then ϕn");
  } else {
    if (!(checkIfPrime(e))) {
      alert("e has to be prime");
    } else {
      while (((e * d) % ϕn) != 1) {
        d++;
      }
      document.getElementById("d").innerHTML = "d=" + d;
    }
  }
}

function generateKeys() {
  if (d == 0) {
    alert("You need to generate d first");
  } else {
    genKeys = true;
    document.getElementById("private").innerHTML = 'private key (d,n) -> (' + d + ',' + n + ')';
    document.getElementById("public").innerHTML = 'public key (e,n) -> (' + e + ',' + n + ')';
  }
}

function checkIfPrime(number) {
  if (number < 2) {
    return false;
  }
  for (let x = 2; x < (number / 2) + 1; x++) {
    if (number % x == 0) {
      return false;
    }
  }
  return true;
}

function sendPublicKey() {
  if (!genKeys) {
    alert("You need to generate key first");
  } else {
    bobN = n;
    bobE = e;
    document.getElementById("bobKey").innerHTML = '(e,n) -> (' + e + ',' + n + ')';
  }
}

function sendMessage() {
  msg = document.getElementById("msg").value;
  if (bobN == null || bobE == null) {
    alert("You need to send Bob the public key first");
  } else if (msg == '') {
    alert("The message is empty");
  } else {
    // needs wolfram alpha


  }
}
