// Server data
// Alice public key
let SAn = 12533;
let SAe = 17;
let SAs = "6e625e58b03c4ecf 1a5e7eb497a103dd 56edcfe5bb25528f 5094a57a28440620"; // signature
// Bob public key
let SBn = 21311;
let SBe = 179;
let SBs = "999bd551d9418dbd 38fb322e8acf6791 58c51f41b2bde020 077c06baf352dc96"; // signature
// Alice data
let Anonce = 77; // one time nonce
let An = 12533; // private and public key numbers
let Ae = 17;
let Ad = 10853;
let AnonceReceived; // nonce received by Alice
let AnonceDec; // nonce decrypted
let AnonceBack; // nonce send back to Bob
let AmyNonce; // nonce of Alice received back
// Bob data
let Bnounce = 61; // Bob's nonce
let Bn = 21311; // private and public key numbers
let Be = 179;
let Bd = 18419;
let BnonceReceived; // nonce received by Bob
let BnonceDec; // nonce decrypted
// global boolean logic responsible for eaach part of process
let aliceAsked = false;
let bobAsked = false;
let aliceEncryptedAndSend = false;
let bobDecrypted = false;
let bobEncryptedAndSendBack = false;
let aliceDecrypted = false;
let aliceSendBackNonce = false;

function aliceAsk() {
  document.getElementById("ABkey").innerHTML = '(' + SBe + ',' + SBn + ')';
  document.getElementById("ABsig").innerHTML = SBs;
  aliceAsked = true;
}

function aliceSendNonce() {
  if (aliceAsked) {
    aliceEncryptedAndSend = true;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        let res = (xmlHttp.responseText);
        res = JSON.parse(res);
        res = res.result;
        BnonceReceived = res;
        document.getElementById("BAnonce").innerHTML = BnonceReceived;
      }
    }
    xmlHttp.open("GET", 'http://localhost:8080/rsa/' + Anonce + '/' + Ad + '/' + An, true);
    xmlHttp.send(null);
  } else {
    alert("Ask for Alice's public key first");
  }
}

// below functions are basen on AJAX callbacks which are using node js api on the server side
function bobDecrypt() {
  if (bobAsked && aliceEncryptedAndSend) {
    bobDecrypted = true;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        let res = (xmlHttp.responseText);
        res = JSON.parse(res);
        res = res.result;
        BnonceDec = res;
        document.getElementById("BAnonced").innerHTML = BnonceDec;
      }
    }
    xmlHttp.open("GET", 'http://localhost:8080/rsa/' + BnonceReceived + '/' + Ae + '/' + An, true);
    xmlHttp.send(null);
  } else if (!aliceEncryptedAndSend) {
    alert("Alice needs to send nonce first");
  } else if (!bobAsked) {
    alert("Ask for Bob's public key first");
  }
}

function bobAsk() {
  document.getElementById("BAkey").innerHTML = '(' + SAe + ',' + SAn + ')';
  document.getElementById("BAsig").innerHTML = SAs;
  bobAsked = true;
}

function bobSendNonce() {
  if (bobDecrypted) {
    bobEncryptedAndSendBack = true;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        let res = (xmlHttp.responseText);
        res = JSON.parse(res);
        res = res.result;
        AnonceReceived = res;
        document.getElementById("ABnonce").innerHTML = AnonceReceived;
        bobSendNonce2();
      }
    }
    xmlHttp.open("GET", 'http://localhost:8080/rsa/' + Bnounce + '/' + Bd + '/' + Bn, true);
    xmlHttp.send(null);
  } else {
    alert("You have to decrypt nonce Bob recieved first");
  }

}

function bobSendNonce2() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      AmyNonce = res;
      document.getElementById("Aback").innerHTML = AmyNonce;
      bobSendNonce3();
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + Anonce + '/' + Bd + '/' + Bn, true);
  xmlHttp.send(null);
}

function bobSendNonce3() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      document.getElementById("AbackD").innerHTML = res;
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + AmyNonce + '/' + Be + '/' + Bn, true);
  xmlHttp.send(null);
}

function aliceDecrypt() {
  if (bobEncryptedAndSendBack) {
    aliceDecrypted = true;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        let res = (xmlHttp.responseText);
        res = JSON.parse(res);
        res = res.result;
        AnonceDec = res;
        document.getElementById("ABnonced").innerHTML = AnonceDec;
      }
    }
    xmlHttp.open("GET", 'http://localhost:8080/rsa/' + AnonceReceived + '/' + Be + '/' + Bn, true);
    xmlHttp.send(null);
  } else {
    alert("Bob has to send nonce first");
  }
}

function aliceSendBack() {
  if (aliceDecrypted) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        let res = (xmlHttp.responseText);
        res = JSON.parse(res);
        res = res.result;
        AnonceBack = res;
        document.getElementById("BAback").innerHTML = AnonceBack;
        aliceSendBackDec();
      }
    }
    xmlHttp.open("GET", 'http://localhost:8080/rsa/' + Bnounce + '/' + Ad + '/' + An, true);
    xmlHttp.send(null);
  } else {
    alert("Alice have to decrypt nonce first");
  }

}

function aliceSendBackDec() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let res = (xmlHttp.responseText);
      res = JSON.parse(res);
      res = res.result;
      AnonceBack = res;
      document.getElementById("BAbackD").innerHTML = AnonceBack;
      setTimeout(function() {
        alert("Process of authentication has been finished");
      }, 1000);
    }
  }
  xmlHttp.open("GET", 'http://localhost:8080/rsa/' + AnonceBack + '/' + SAe + '/' + SAn, true);
  xmlHttp.send(null);
}
