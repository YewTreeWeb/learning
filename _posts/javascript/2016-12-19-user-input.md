---
layout: post
title:  "User Input"
date:   2016-12-19 23:45:00
categories: js
tags: [beginner, input, events]
---
<div class="row">
  <div class="col-xs-6">

    <h2><small>List</small></h2>
    <ul class="list">
      <li>
        <a data-img="me-pic" id="me" href="#">Mat</a>
      </li>
      <li>
        <a data-img="alice-pic" id="alice" href="#">Alice</a>
      </li>
      <li>
        <a data-img="mum-pic" id="mum" href="#">Mum</a>
      </li>
      <li>
        <a data-img="dad-pic" id="dad" href="#">Dad</a>
      </li>
    </ul>
  </div>
  <div class="col-xs-6 images">
    <img id="alice-pic" src="images/alice.jpg" alt="" class="hide">
    <img id="me-pic" src="images/me.jpg" alt="" class="hide">
    <img id="mum-pic" src="images/mum.jpg" alt="" class="hide">
    <img id="dad-pic" src="images/dad.jpg" alt="" class="hide">
  </div>
</div>
<hr>
<div class="row">
  <div class="col-md-6 col-xs-12">

    <h2>Pure JS example</h2>
    {% highlight ruby %}
      var alice = document.getElementById('alice');
      var me = document.getElementById('me');
      var mum = document.getElementById('mum');
      var dad = document.getElementById('dad');

      alice.addEventListener('click', picLink);
      me.addEventListener('click', picLink);
      mum.addEventListener('click', picLink);
      dad.addEventListener('click', picLink);

      function picLink(){

        var allImages = document.querySelectorAll("img");

        for (var i = 0; i < allImages.length; i++){
          allImages[i].className = "hide";
        }

        var picId = this.attributes["data-img"].value;
        var pic = document.getElementById(picId);

        if (pic.className === "hide") {
          pic.className = "show";
        }
        else {
          pic.className = "hide";
        }

      }
    {% endhighlight %}

  </div>
  <div class="col-md-6 col-xs-12">

    <h2>jQuery example</h2>
    {% highlight ruby %}
      $('.list li > a').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var info = $this.attr('id');

        $(".list li").removeClass("active");
        $this.addClass("active");
        $('.images img').find('.hide').removeClass('hide');
        $('.images img').find('img#' + info).addClass('show');

      });
    {% endhighlight %}

  </div>
</div>
