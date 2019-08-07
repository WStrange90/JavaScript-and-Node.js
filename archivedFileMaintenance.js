const fs = require('fs');
var path = require('path');
var moment = require("moment");
var tools = require('./tools');

var filePath;

//put the path to folders that need to be maintained here
var targetFolderArray = [
    './ReportOutput',
    '/home/orders/Logs'
];
var today = moment();

//can be configured to take any number of months, days, or years
var monthAgo = moment().subtract(1, 'months');

targetFolderArray.forEach(targetFolder => {

    var fileArray = [];

	//loop through each file in the target folders and build an array of objects 
    fs.readdirSync(targetFolder).forEach(file => {

        filePath = targetFolder + "/" + file //set filePath to current file's path

        var fileInfo = {
            fileName: '',
            fileStats: '',
            filePath: ''
        }

        fileInfo.fileStats = fs.statSync(filePath); //Used to get information about current file.
        fileInfo.fileName = file;
        fileInfo.filePath = filePath;
        fileArray.push(fileInfo); //add file to array 

    });

	//loop through the file array and remove old files (log files, old reports etc)
    for (var i = 0; i < fileArray.length; i++) {
        var currentFile = fileArray[i]

		//skip files that you don't want deleted
        if (currentFile.fileName == ".gitignore") {
            continue;
        }

        var fileCreationDate = moment(currentFile.fileStats.mtime);
        var oldFile = fileCreationDate.isBefore(monthAgo);

		//print the dates and Y/N for weather or not the file should be deleted
        console.log("file created: " + fileCreationDate.format("MM/DD/YYYY HH"));
        console.log("1 month ago: " + monthAgo.format("MM/DD/YYYY HH"));
        console.log("file is older than 1 month?: " + oldFile + "\n");

		//true if the file was created more than a month ago
        if (oldFile) {
            try {
                fs.unlink(currentFile.filePath, function (err) {
                    if (err) {
                        throw err;
                    }
                    // if no error, file has been deleted successfully

                });
                console.log(currentFile.fileName + ' deleted Successfully!');
            } catch (error) {
                console.log(e);
            }

        }

    }

});