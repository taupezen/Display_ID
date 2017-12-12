// ==UserScript==
// @name        ULiege Display ID
// @author      Taupezen
// @namespace   taupezen
// @version     1
// @downloadURL https://github.com/taupezen/Display_ID/raw/master/display_id.user.js
// @grant       none
// @match       http://www.uliege.be/*
// @match       https://www.uliege.be/*
// @match       http://www.ulg.ac.be/*
// @match       https://www.ulg.ac.be/*
// @require     https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.12/clipboard.min.js
// @run-at      document-end
// ==/UserScript==

function tagid(mutation) {
  //console.log("TYPE: " + mutation.type);
  var tags = document.querySelectorAll('a[href*=getFicheDetail]');

  for (var i = 0; i < tags.length; ++i) {
    var id = (tags[i].href).split('\'') [1].toLowerCase();
    var pnode = tags[i].parentNode;

    tags[i].remove();
    if (id.length == 7) {
      var ins = '<button style="height: 2.5em; margin-bottom: 1px;" class="clipme btn btn-default btn-sm" data-clipboard-text="'+id+'">'+id+'</button> &nbsp; ';
      ins += '<button style="height: 2.5em; margin-bottom: 1px;" class="btn btn-success btn-sm" onclick="javascript:getFicheDetail(\''+id.toUpperCase()+'\')">Details</button> &nbsp; ';
      pnode.insertAdjacentHTML('afterbegin', ins);
      pnode.removeClassName("u-results__row");
    }
  }

  if(tags.length > 0) {
    new Clipboard('.clipme');
  }
}

// create an observer instance
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(
    //function (mutation) { console.log(mutation.type); }
    tagid
  );
});

// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };
observer.observe(document.querySelector('#WSTrombiSearchDIV'), config);
