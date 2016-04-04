var continents = require('./continents');
// console.log(continents);
var fs2=require('fs');
var fss2=fs2.readFileSync('WDI_Data.csv','utf-8');
var line2=fss2.split('\n');
var com2=line2[0].split(',');
var result =[];

 // console.log(continents.get('AF'));
var AfricanCountries = continents.get('AF');
var countryIndex = com2.indexOf('Country Code');
var arableLandIndex = com2.indexOf('Indicator Code');
var index2010 = com2.indexOf('2010');
AfricanCountries.forEach(function(country){
    for (var i = 1; i < line2.length-1; i++) {
       var test = line2[i].split(',');
        if(test[countryIndex].trim()==country.countryCode.trim() && test[arableLandIndex].trim()=="AG.LND.ARBL.ZS".trim()){
          console.log(country.countryCode+" "+test[index2010]);
          result.push({country:country.countryName, arableLand:Number(test[index2010])});
          break;
        }
    }
});
// console.log(result);
fs2.writeFile("africa.json",JSON.stringify(result,null,4));
  
