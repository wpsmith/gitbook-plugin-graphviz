require([
    'gitbook'
], function (gitbook) {
    gitbook.events.bind('page.change', function () {
        // init vis
        (function () {
            var ie = !!(window.attachEvent && !window.opera), wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
            var fn = [], run = function () { for (var i = 0; i < fn.length; i++)fn[i](); }, d = document; d.ready = function (f) {
                if (!ie && !wk && d.addEventListener) { return d.addEventListener('DOMContentLoaded', f, false); } if (fn.push(f) > 1) return;
                if (ie) (function () { try { d.documentElement.doScroll('left'); run(); } catch (err) { setTimeout(arguments.callee, 0); } })();
                else if (wk) var t = setInterval(function () { if (/^(loaded|complete)$/.test(d.readyState)) clearInterval(t), run(); }, 0);
            };
        })();

        (function (doc) {
            function initVizPNG(id, el) {
                var options = {
                    src: el.textContent,
                    engine: "dot",
                    format: "png-image-element"
                },
                    image = Viz(el.textContent, options);

                image.style.display = "block";
                image.style.margin = "auto";
                el.innerHTML = "";
                el.appendChild(image);
                el.style = "display: block";
            }
            function initViz(id, el) {
                    image = Viz(el.textContent),
                    widthRx = /\swidth=[\"\'].*[\"\']/,
                    heightRx = /\sheight=[\"\'].*[\"\']/,
                    svg = image.substr(image.indexOf("<svg"));

                    svg = svg.replace(widthRx, "").replace(heightRx, "").replace("<svg", "<svg id=\"" + id + "\"");
                    
                el.innerHTML = svg;
                el.style = "display: block";
            }

            function go() {
                var diagrams = document.getElementsByClassName("viz");
                for (var i = 0; i < diagrams.length; i++) {

                    var el = diagrams.item(i),
                        id = "viz-";
                    initViz(id + i, el);
                }
            }

            go();

            // Support RevealJS
            window.addEventListener('ready', function (event) {
                go();
            });
        })(document);
    });
});