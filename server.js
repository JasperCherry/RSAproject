var Client = require('node-wolfram');
var Wolfram = new Client('LU2W26-EPRQKKG36V');
Wolfram.query("(3^37) mod 119", function(err, result) {
    if(err)
        console.log(err);
    else
    {
      console.log(result.queryresult.pod[1].subpod[0].plaintext[0]);
      console.log("<><><><><><><><><><><><><><><><><><><><>");
    }
});
