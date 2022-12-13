 var Service = require('node-linux').Service;

    // Create a new service object
    var svc = new Service({
        name:'Queue Kios Server',
        description: 'The Node JS Kios Web Server.',
        script: require('path').join(__dirname, 'kios_queue_server.js'),
        env:[{
          name: "HOME",
          value: process.env["USERPROFILE"]
        },
        {
          name:"TEMP",
          value: require('path').join(__dirname,"temp")
        }]
    });

    // Listen for the "install" event, which indicates the
    // process is available as a service.
    svc.on('install',function(){
      console.log('\nInstallation Complete\n---------------------');
    	svc.start();
    });

    // Just in case this file is run twice.
  //svc.on('alreadyinstalled',function(){
    //console.log('This service is already installed.');
    //console.log('Attempting to start it.');
    //svc.start();
  //});

  // Listen for the "start" event and let us know when the
  // process has actually started working.
  svc.on('start',function(){
    console.log(svc.name + ' started!\nVisit http://192.168.44.30:1337 to see it in action.\n');
  });

  svc.install();