var visRx = /^```vis((.*[\r\n]+)+?)?```$/im;

function processVis(page) {

  var match;

  while ((match = visRx.exec(page.content))) {
    var rawBlock = match[0];
    var visContent = match[1];
    page.content = page.content.replace(rawBlock, '<div class="viz" style="display:none;">' +
    visContent + '</div>');
  }

  return page;
}


module.exports = {
  website: {
    assets: './dist',
    css: [
      'vis/vis.min.css'
    ],
    js: [
      'book/plugin.js'
    ]
  },
  hooks: {
    'page:before': processVis
  }
};