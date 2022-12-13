var Service = require('node-linux').Service;

// Create a new service object
var svc = new Service({
	name:'NodeKios',
	script: require('path').join(__dirname, 'node_kios_for_linux.js'),
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('systemv',function(){
	
	console.log('Uninstall complete.');
  
	console.log('The service exists: ', svc.exists);
});

// Uninstall the service.
svc.uninstall();
