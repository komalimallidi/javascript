var fs = require("fs");
var data = '';
var index1;
var index2;
var chunckflag =false;
var output={};
var map={};
var Continents = [];

var data1=fs.readFileSync('countries.csv','utf8');
var line1=data1.split('\r\n');
var n=line1.length;
for(j=1;j<n-1;j++){
   var cnt=line1[j].split(',');
    map[(cnt[4].split(' '))[1]]=cnt[6].split(' ')[1];
 }
 // console.log(map);
// Create a readable stream
var readerStream = fs.createReadStream('WDI_Data.csv');
var writeStream = fs.createWriteStream('conoutput.json');
// Set the encoding to be utf8.
readerStream.setEncoding('UTF8');
readerStream.on('data', function(chunk) {
   data = chunk;
   var line2= data.split('\r\n');
   var m=line2.length;
   if(chunckflag == false){
     index1=line2[0].split(',').indexOf('1960');
     index2=line2[0].split(',').indexOf('2015');
     chunckflag = true;
   }
     for(i=0;i<m;i++){
       var arr=line2[i].split(',');
       if(arr[3]==='AG.LND.ARBL.HA'){
         var year=arr.slice(index1,index2);
         var Agg_Land = year.reduce(add,0);
        //  var Continents={};
         if(map[arr[1]]==undefined){
           key='Others';
         }
         else{
           key=map[arr[1]];

         }
         if(output[key]!=undefined){
           output[key]=output[key]+Agg_Land;
         }
         else {
           output[key]=Agg_Land;
           Continents.push(key);
         }
        //  console.log(key);
        //  console.log(output[key]);
        }
      }
});
function add(a,b){
  return +a + +b;
}
readerStream.on('end',function(){
  var output2 = [];
  for(i = 0;i<Continents.length;i++){
    var contValue = {};
     contValue["continent"] = Continents[i];
     contValue["Value"] = output[Continents[i]];
     output2.push(contValue);
  }
  writeStream.write(JSON.stringify( output2, null,2));
});
readerStream.on('error', function(err){
   console.log(err.stack);
});
console.log("Output Created");
