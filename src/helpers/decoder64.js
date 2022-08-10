const path = require('path');
const Buffer = require('buffer').Buffer;
const fs = require('fs');

const decode_base64 = (base64str, filename) => {
    const buf = Buffer.from(base64str, 'base64');
    
    fs.writeFile( path.join(__dirname, '/public/', filename), buf, (error) => {
        if(error){
            console.log('Error writing file:', error);
            return false;
        } else {
        console.log('File created from base64 string!');
        return true;
        }
      }
    );
};

const encode_base64 = (filename) =>{
    fs.readFile(path.join(__dirname,'/public/',filename),function(error,data){
      if(error){
        throw error;
      }else{
        var buf = Buffer.from(data);
        var base64 = buf.toString('base64');
        return base64;
      }
    });
  }
  

module.exports = { 
  decode_base64, 
  encode_base64 
};