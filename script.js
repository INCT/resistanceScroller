var r1 = document.getElementById('resistance1');
var r2 = document.getElementById('resistance2');
var r3 = document.getElementById('resistance3');
var r4 = document.getElementById('resistance4');
var isScroll = true;

window.onload = setResistance;
window.onhashchange = setResistance;
r1.onscroll = getResistance;
r2.onscroll = getResistance;
r3.onscroll = getResistance;

function getResistance() {
  var re,sis,tan,ce;
  re = scrollIndex(r1) + 1;
  sis = scrollIndex(r2);
  tan = scrollIndex(r3);
  ce = scrollIndex(r4);

  var resistance = (re*10 + sis) *  Math.pow(10,tan);
  var deniminations = ['','k','M','G'];
  for(var i=0; i<deniminations.length; i++) {
    if(resistance < Math.pow(10, (i + 1)*3)) { break; }
  }
  resistance /= Math.pow(10, i*3);
  resistance = resistance + deniminations[i];
  isScroll = false;
  location.hash = resistance;
}

function scrollIndex(element) {
  return Math.round( element.scrollTop / (element.scrollHeight - element.offsetHeight ) * (element.childElementCount - 3) );
}

function setResistance() {
  var resistance = location.hash.replace('#','');
  if (!(/^[1-9]\.?[0-9]*[kMG]?$/i).test(resistance)) return;

  var deniminations = ['k','M','G'];
  var zeros = '';
  for(var i=0; i<deniminations.length; i++) {
    var reg = new RegExp(deniminations[i], 'i');
    if(reg.test(resistance)) {
      resistance = resistance.replace(reg, '') * Math.pow(1000, i+1);
      break;
    }
  }
  resistance -= 0;

  for(var i=0; resistance >= 10; i++) { resistance /= 10; }
  var digits = i - 1;
  var dig1 = Math.floor(resistance);
  var dig2 = Math.round((resistance - dig1) * 10);
  var dig4 = 2;

  if(isScroll) {
    scrollTo(r1, dig1 - 1);
    scrollTo(r2, dig2);
    scrollTo(r3, digits);
    scrollTo(r4, dig4);
  }
  isScroll = true;
}

function scrollTo(element, index) {
  element.scrollTop = index * (element.scrollHeight - element.offsetHeight ) / (element.childElementCount - 3);
}