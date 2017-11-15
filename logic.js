// alice data
let p;
let q;
let n;
let ϕn;
let e;
let d = 0;
let m;
let msgSent;
let msgReceived;
let msgDecrypted;

// control
let genKeys = false;
let keyInt = false;
let msgInt = true;

// bob data
let bobMsgReceived;
let bobMsgDecrypted;
let bobN;
let bobE;
let bobMsg;

function test() {
  //processRsa(3,37,119);
}

function processBobDec() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      document.getElementById("bobMsgD").innerHTML = res;
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + bobMsgReceived + '/' + bobE + '/' + bobN, true); // true for asynchronous
  xmlHttp.send(null);
}

function processBob() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      bobMsgReceived = res;
      document.getElementById("bobMsgR").innerHTML = bobMsgReceived;
      processBobDec();
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + msg + '/' + d + '/' + n, true); // true for asynchronous
  xmlHttp.send(null);
}

function processAliceDec() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      document.getElementById("msgD").innerHTML = res;
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + msgReceived + '/' + d + '/' + n, true); // true for asynchronous
  xmlHttp.send(null);
}

function processAlice() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      msgReceived = res;
      document.getElementById("msgR").innerHTML = msgReceived;
      processAliceDec();
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + bobMsg + '/' + bobE + '/' + bobN, true); // true for asynchronous
  xmlHttp.send(null);
}

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
    if (!(checkIfRelPrime(e, ϕn))) { // first argument should be smaller then second
      alert("e has to be relatively prime to ϕn");
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

function checkIfRelPrime(number, number2) {
  for (let x = 2; x < number + 1; x++) {
    if (number % x == 0 && number2 % x == 0) {
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
    processBob();
  }
}

function bobSendMessage() {
  bobMsg = document.getElementById("bobMsg").value;
  if (bobN == null || bobE == null) {
    alert("You need to send Bob the public key first");
  } else if (bobMsg == '') {
    alert("The message is empty");
  } else {
    processAlice();
  }
}
