import { createReadStream } from "fs";
import { parse } from "csv-parse";

// Read arguments from command line
const args = process.argv.slice(2);
const path = args[0];
const column = args[1];
const key = args[2];
if(path && column && key) searchCSVFile(path, column, key);
else console.log("Please provide the path, column and key as arguments");
function searchCSVFile(path, column, key) {
    //Open the file
    const search = []
    createReadStream(path)
    .pipe(parse({ delimiter: ",", from_line: 1 }))
    .on("data", function (row) {
        if (column < row.length && row[column] == key) search.push(row);
    })
    .on("error", function (error) {
        console.log(error.message);
    }).on("end", function () {
        if(search.length == 0) console.log("No results found");
        else console.log(search);
    });
}
