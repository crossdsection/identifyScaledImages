
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'assets/images/');

var ExifImage = require('exif').ExifImage;
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    var fs = require('fs');
    var stream = fs.createWriteStream("output.txt");
    stream.once('open', function(fd) {
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            try {
                new ExifImage({ image : directoryPath + file }, function (error, exifData) {
                    if (error){
                        console.log('Error: '+error.message);
                    }
                    else {
                        if( exifData['thumbnail']['Compression'] == 6 ){
                            var fileString = file + '\r\n';
                            console.log('File: ' + fileString);
                            stream.write( fileString );
                        }
                    }
                });
            } catch (error) {
                console.log('Error: ' + error.message);
            }
        });
    });
});