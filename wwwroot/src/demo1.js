import _ from "lodash"
import {Wa} from "Wa"

console.log("demo1.js");

// lodash via jspm
console.log(_);
console.log( _.map( [0,1] , (x)=> {return x+1;} )  );

// Wideta , Wa
console.log(Wa);
console.log((new Wa()).foo());



