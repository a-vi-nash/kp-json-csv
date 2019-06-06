
const fileOperations = require("./fileOperations");
// get bot json from the file
let kpJSON = fileOperations.readJSONfileToMemory('knowledge_pack.json');

//extract bot text
let extractedCSV = require("./extractedData")(kpJSON);

//export to csv file
fileOperations.exportToCsv(extractedCSV);
