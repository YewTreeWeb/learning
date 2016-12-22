---
layout: post
title:  "Flightplan.js"
date:   2016-12-15 23:37:00
tags: [flightplan, development, js]
---
Run sequences of shell commands against local and remote hosts. It deploys changes using rsync to your remote server really quickly.

Flightplan code example:

{% highlight ruby %}

var plan = require('flightplan');

// configuration
plan.target('production', [
  {
    host: 'something.host.com',
    username: 'username',
    port: 22,
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

{% endhighlight %}

<a class="btn btn-default" href="https://gist.github.com/learncodeacademy/393c8ec3ebaa92df9a29" role="button">View details »</a>
<a class="btn btn-danger" href="https://youtu.be/vmekjPhQuCc?list=PLoYCgNOIyGAB_8_iq1cL8MVeun7cB6eNc" role="button">View Video »</a>
