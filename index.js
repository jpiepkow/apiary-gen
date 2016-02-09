var request = require('request');
var fs = require('fs');
var exec = require('child_process').exec;
var DocGen = function (config) {
    this.token = config.token;
    this.name = config.api_name;
    this.port = config.port || '8000';
    this.path = './swagger.json'
};
DocGen.prototype.generate = function () {
    var self = this;
    var swagger;
    var execStr;
    console.log(`http://localhost:${self.port}/swagger.json`);
    request.get({
        url: `http://localhost:${self.port}/swagger.json`
    }, (err, body, r) => {
        if (err) {
            console.log(err);
            return new Error('Error trying to get swagger.json')
        }
        swagger = r;
        fs.writeFile('./swagger.json', swagger.toString(), (err) => {
            if (err) {
                console.log(err);
                return new Error('Error while trying to write swagger.json locally')
            }
            execStr = `APIARY_API_KEY=${self.token} apiary publish --api-name=${self.name} --path=${self.path}`;
            exec(execStr, (error, stdout, stderr) => {
                if (error || stderr) {
                    console.log(error);
                    return new Error('Error executing apiary command')
                } else {
                    fs.unlink('./swagger.json', (err) => {
                        if (err) {
                            console.log('Error removing file');
                            return new Error('Error deleting swagger.json');
                        }
                    })
                }

            })

        })
    })

};
module.exports = DocGen;