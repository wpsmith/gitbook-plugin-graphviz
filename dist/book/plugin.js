require([
    'gitbook'
], function (gitbook) {
    gitbook.events.bind('page.change', function () {
        // init vis
        (function () {
            var ie =!!(window.attachEvent&&!window.opera),wk=/webkit\/(\d+)/i.test(navigator.userAgent)&&(RegExp.$1<525);
            var fn =[],run=function(){for(var i=0;i<fn.length;i++)fn[i]();},d=document;d.ready=function(f){
                if(!ie&&!wk&&d.addEventListener){return d.addEventListener('DOMContentLoaded',f,false);}if(fn.push(f)>1)return;
                if(ie)(function(){try{d.documentElement.doScroll('left');run();}catch(err){setTimeout(arguments.callee,0);}})();
                else if(wk)var t=setInterval(function(){if(/^(loaded|complete)$/.test(d.readyState))clearInterval(t),run();},0);};
        })();
        
        (function(doc){
            console.log('viz.init');
            function initViz(id, el) {
                var image = Viz({ src: el.textContent, engine: "dot", format: "png-image-element" }),
                    node = document.createElement("img");
                node.src = image.svgXml;
                el.innerHTML = "";
                el.appendChild(node);
                el.style = "display: block";
            }
        
            function go() {
                var diagrams = document.getElementsByClassName("viz");
                for(var i = 0; i < diagrams.length; i++) {
        
                    var el = diagrams.item(i),
                        id = "viz-";
                    initViz(id + i, el);
                }
            }
        
            go();
        
            // Support RevealJS
            window.addEventListener( 'ready', function( event ) {
                console.log('ready: ', event);
                go();
            });
        })(document);
    });
});