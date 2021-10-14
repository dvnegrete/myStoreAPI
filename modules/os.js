const os = require("os");

exports.ipAddress = function () {
    const port = os.networkInterfaces().eth0;
    const ipA = port[0].address;
    return ipA    
}