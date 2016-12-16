---
layout: post
title:  "Bash Profile Examples"
date:   2016-12-15 23:46:00
categories: bash
tags: [bash]
---
To create a bash profile, make sure your in the root directory of your terminal and do:

{% highlight ruby %}
touch .bash_profile
{% endhighlight %}

To show your Git branch within the command line put this at the top of your bash profile:

{% highlight ruby %}
parse_git_branch() {
   git branch 2> /dev/null | sed -e '/^[^​*]/d' -e 's/*​ \(.*\)/ (\1)/'
}
export PS1="\u@\h \W\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "
{% endhighlight %}

To create an alias for quick commands you need:

{% highlight language %}
alias sites='cd ~/path/to/desired/folder'
{% endhighlight %}

<a class="btn btn-danger" href="https://www.youtube.com/watch?v=OQXc_hjqZps" role="button">View Video »</a>
