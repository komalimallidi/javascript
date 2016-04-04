var fs = require('fs');
var data = fs.readFileSync('WDI_Data.csv');
var line= data.toString().split('\r\n');
var n=line.length;
var headers = line[0].split(",");
//console.console.log('headers');
var arr1 = [];
var arr2 = [];
var arr3= [];
//var arr4= [];

//var i=0;
for (var i =1; i < n- 1; i++) {
    var line1 = line[i].toString().split(',');//split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    var object= {};
    for (var j = 0; j <=headers.length-1; j++ ){

        object[headers[j]] = line1[j];

   }

   if((object["Indicator Name"].includes("Arable land (% of land area)")) && (object["Country Name"].includes("India"))){

   arr1.push(object);
    }
//console.log(arr1);
    if((object["Indicator Name"].includes("Arable land (hectares per person)")) && (object["Country Name"].includes("India"))){
   //console.log(object);
      arr2.push(object);

     }
//console.log(arr2);
     if((object["Indicator Name"].includes("Arable land (hectares)")) && (object["Country Name"].includes("India"))){
    //console.log(object);
      arr3.push(object);
      }
}

fs.writeFile("output1.json",JSON.stringify(finalParse(arr2,arr3,arr1),null,2));



function finalParse(ALhpp,ALh,ALpla) {
var json=[];
  for(var i=1960;i<=2015;i++){
    var temp2={};
    var temp1={};
    temp1["Arablelandhectares"]=Number(ALh[0][i]);
    temp1["Arablelandhectaresperperson"]=Number(ALhpp[0][i]);
    temp1["Arablelandoflandarea"]=Number(ALpla[0][i]);
    temp2["year"]=i;
    temp2["values"]=temp1;
    json.push(temp2);
  }
return json;
}
