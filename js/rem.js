(function(doc, win) {
    var ps_width = 750,
        ps_height = 667,
        rem = 100;
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var w = window.innerWidth /*docEl.clientWidth*/ ;
            var h = window.innerHeight /*docEl.clientHeight*/ ;

            if (!w)
                return;
            if (w <= h || /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase())) {
                //if(w>ps_width){w=ps_width;}
                docEl.style.fontSize = rem * (w / ps_width) + 'px';
            } else {
                var w2 = h / ps_height * ps_width;
                docEl.style.fontSize = rem * (w2 / ps_width) + 'px';
                docEl.style.width = w2 + 'px';
                docEl.style.margin = '0 ' + (w - w2) / 2 + 'px';
            }
        };
    if (!doc.addEventListener)
        return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
})(document, window);