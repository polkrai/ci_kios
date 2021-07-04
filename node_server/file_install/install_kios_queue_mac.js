 var Service = require('node-mac').Service;

    // Create a new service object
    var svc = new Service({
      name:'Queue Kios Serverr',
      description: 'The Node JS Kios Web Server.',
      script: require('path').join(__dirname, 'kios_queue_server.js'),
    });

    // Listen for the "install" event, which indicates the
    // process is available as a service.
    svc.on('install',function(){
	    
    	svc.start();
    });

    svc.install();