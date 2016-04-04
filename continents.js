var continents = new Map();
var fs=require('fs');
var fss=fs.readFileSync('countries.csv','utf8');
var line =fss.split('\n');
var tempCount ={};
var values;
var array;
var countryList = [];
var headers=line[0].split(',');

var countryIndex = headers.indexOf("Country 3");
var countryCodeIndex = headers.indexOf("Country Code");
var countryNameIndex = headers.indexOf("Country Name");
var continentIndex = headers.indexOf("Continent");
// console.log(countryIndex);
// console.log(countryCodeIndex);
// console.log(countryNameIndex);
// console.log(continentIndex);

for (var i = 1; i < line.length -1; i++) {
  values = line[i].split(',');
  tempCount.countryCode = values[countryCodeIndex-1];
  tempCount.countryName = values[countryNameIndex];
  if(continents.has(values[continentIndex].trim())){
    // console.log("true" + i);
    array = continents.get(values[continentIndex].trim());
    array.push(tempCount);
    continents.set(values[continentIndex].trim(),array);
    tempCount={};
  }
  else{
    // console.log("false");
    countryList =[];
    countryList.push(tempCount);
    continents.set(values[continentIndex].trim(),countryList);
    tempCount={};
  }
}

module.exports = continents;
