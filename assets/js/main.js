console.log('hello world');
console.log('testing');
/*

User Input - Hide/Show images

*/
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
