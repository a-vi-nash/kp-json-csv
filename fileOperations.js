module.exports.readJSONfileToMemory = (fileName) => {
  return require("./files/"+fileName);
};

module.exports.exportToCsv = csvData => {
  const fs = require("fs");
  //create csv content

  fs.writeFile("./files/kp.csv", csvData.join("\n"), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
};
