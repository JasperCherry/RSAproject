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
let intercept = false;
// bob data
let bobMsgReceived;
let bobMsgDecrypted;
let bobN;
let bobE;
let bobMsg;
// charlie data
// false key data
let falseKeyN = 583951;
let falseKeyE = 6711;
let falseKeyD = 1760391;
let keyInterN;
let keyInterE;
let msgFromAlice;
let msgFromAliceD;
let msgFromBob;
let msgFromBobD;


function restart() {
  // alice data
  p = null;
  q = null;
  n = null;
  ϕn = null;
  e = null;
  d = 0;
  m = null;
  msgSent = null;
  msgReceived = null;
  msgDecrypted = null;
  // control
  genKeys = false;
  keyInt = false;
  msgInt = true;
  intercept = false;
  // bob data
  bobMsgReceived = null;
  bobMsgDecrypted = null;
  bobN = null;
  bobE = null;
  bobMsg = null;
  // charlie data
  // false key data
  falseKeyN = 583951;
  falseKeyE = 6711;
  falseKeyD = 1760391;
  keyInterN = null;
  keyInterE = null;
  msgFromAlice = null;
  msgFromAliceD = null;
  msgFromBob = null;
  msgFromBobD = null;
  // intercept option
  intercept = document.getElementById("intercept");
  intercept = intercept.checked;
  // html restart
  document.getElementById("p").value = null;
  document.getElementById("q").value = null;
  document.getElementById("n").innerHTML = "n=";
  document.getElementById("ϕn").innerHTML = "ϕ(n)=";
  document.getElementById("e").value = null;
  document.getElementById("d").innerHTML = "d=";
  document.getElementById("public").innerHTML = "public key (e,n) ->";
  document.getElementById("private").innerHTML = "private key (d,n) ->";
  document.getElementById("msg").value = null;
  document.getElementById("msgR").innerHTML = "none";
  document.getElementById("msgD").innerHTML = "none";
  document.getElementById("bobKey").innerHTML = "none";
  document.getElementById("bobMsgR").innerHTML = "none";
  document.getElementById("bobMsgD").innerHTML = "none";
  document.getElementById("bobMsg").value = null;
  document.getElementById("interceptedKey").innerHTML = "none";
  document.getElementById("falseKeySend").innerHTML = "none";
  document.getElementById("CharlieMsgBob").innerHTML = "none";
  document.getElementById("CharlieMsgBobD").innerHTML = "none";
  document.getElementById("CharlieMsgAlice").innerHTML = "none";
  document.getElementById("CharlieMsgAliceD").innerHTML = "none";
  alert("Configuration has been restarted");
}



function processBobInter4() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      bobMsgReceived = res;
      document.getElementById("bobMsgD").innerHTML = bobMsgReceived;
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + bobMsgReceived + '/' + bobE + '/' + bobN, true);
  xmlHttp.send(null);
}

function processBobInter3() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      bobMsgReceived = res;
      document.getElementById("bobMsgR").innerHTML = bobMsgReceived;
      processBobInter4();
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + msgFromAliceD + '/' + falseKeyD + '/' + falseKeyN, true);
  xmlHttp.send(null);
}

function processBobInter2() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      msgFromAliceD = res;
      document.getElementById("CharlieMsgAliceD").innerHTML = msgFromAliceD;
      processBobInter3();
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + msgFromAlice + '/' + keyInterE + '/' + keyInterN, true);
  xmlHttp.send(null);
}

function processBobInter() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      msgFromAlice = res;
      document.getElementById("CharlieMsgAlice").innerHTML = msgFromAlice;
      processBobInter2();
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + msg + '/' + d + '/' + n, true);
  xmlHttp.send(null);
}



function processAliceInter4() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      msgD = res;
      document.getElementById("msgD").innerHTML = msgD;
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + msgR + '/' + d + '/' + n, true);
  xmlHttp.send(null);
}

function processAliceInter3() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      msgR = res;
      document.getElementById("msgR").innerHTML = msgR;
      processAliceInter4();
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + msgFromBobD + '/' + keyInterE + '/' + keyInterN, true);
  xmlHttp.send(null);
}

function processAliceInter2() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      msgFromBobD = res;
      document.getElementById("CharlieMsgBobD").innerHTML = msgFromBobD;
      processAliceInter3();
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + msgFromBob + '/' + falseKeyD + '/' + falseKeyN, true);
  xmlHttp.send(null);
}

function processAliceInter() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      msgFromBob = res;
      document.getElementById("CharlieMsgBob").innerHTML = msgFromBob;
      processAliceInter2();
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + bobMsg + '/' + bobE + '/' + bobN, true);
  xmlHttp.send(null);
}




function processBobDec() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      bobMsgReceived = res;
      document.getElementById("bobMsgD").innerHTML = bobMsgReceived;
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + bobMsgReceived + '/' + bobE + '/' + bobN, true);
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
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + msg + '/' + d + '/' + n, true);
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
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + msgReceived + '/' + d + '/' + n, true);
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
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + bobMsg + '/' + bobE + '/' + bobN, true);
  xmlHttp.send(null);
}



function usePrimes() {
  p = document.getElementById("p").value;
  q = document.getElementById("q").value;
  if (p == '' || q == '') {
    alert("You need to enter both primes");
  } else if (isNaN(p) || isNaN(q)) {
    alert("You need to enter only numbers");
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
    if (intercept) {
      keyInterN = n;
      keyInterE = e;
      document.getElementById("interceptedKey").innerHTML = '(e,n) -> (' + keyInterE + ',' + keyInterN + ')';
      document.getElementById("falseKeySend").innerHTML = '(e,n) -> (' + falseKeyE + ',' + falseKeyN + ')';
      bobN = falseKeyN;
      bobE = falseKeyE;
      document.getElementById("bobKey").innerHTML = '(e,n) -> (' + bobE + ',' + bobN + ')';
    } else {
      bobN = n;
      bobE = e;
      document.getElementById("bobKey").innerHTML = '(e,n) -> (' + bobE + ',' + bobN + ')';
    }
  }
}

function sendMessage() {
  msg = document.getElementById("msg").value;
  if (bobN == null || bobE == null) {
    alert("You need to send Bob the public key first");
  } else if (msg == '') {
    alert("The message is empty");
  } else {
    if (intercept) {
      processBobInter();
    } else {
      processBob();
    }
  }
}

function bobSendMessage() {
  bobMsg = document.getElementById("bobMsg").value;
  if (bobN == null || bobE == null) {
    alert("You need to send Bob the public key first");
  } else if (bobMsg == '') {
    alert("The message is empty");
  } else {
    if (intercept) {
      processAliceInter();
    } else {
      processAlice();
    }
  }
}
