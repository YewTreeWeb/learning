var plan = require('flightplan');

// configuration
plan.target('production', [
  {
    host: 'shell.gridhost.co.uk',
    username: 'yewtreew1',
    port: 22,
    privateKey: '/Users/Mat/.ssh/new-key',
    agent: process.env.SSH_AUTH_SOCK
  },
]);

// run commands on localhost
plan.local(function(local) {
  // uncomment these if you need to run a build on your machine first
  // local.log('Run build');
  // local.exec('gulp build');

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  // rsync files to all the destination's hosts
  local.transfer(filesToCopy, '~/public_html/html-pages/learning');
});
