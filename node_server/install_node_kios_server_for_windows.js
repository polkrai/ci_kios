var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'NodeKiosServer',
  description: 'The nodejs web server.',
  script: require('path').join(__dirname, 'node_kios_server.js'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  console.log('\nInstallation Complete\n---------------------');
  //svc.start();
});

// Just in case this file is run twice.
svc.on('alreadyinstalled',function(){
  console.log('This service is already installed.');
  console.log('Attempting to start it.');
  svc.start();
});

// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on('start',function(){
  console.log(svc.name+' started!\nVisit http://127.0.0.1:1337 to see it in action.\n');
});

// Install the script as a service.
svc.install();
