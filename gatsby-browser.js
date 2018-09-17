exports.onInitialClientRender = (n, options) => {
  // console.info(`options: ${options}`)
  // see https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement
  // https://www.html5rocks.com/en/tutorials/speed/script-loading/
  var importScript = (function (oHead) {
    function loadError(oError) {
      throw new URIError("The script " + oError.target.src + " is not accessible.");
    }
    return function (sSrc, fOnload) {
      var oScript = document.createElement("script");
      oScript.type = "text\/javascript";
      oScript.onerror = loadError;
      if (fOnload) { oScript.onload = fOnload; }
      oHead.appendChild(oScript);
      oScript.src = sSrc;
    }
  })(document.head || document.getElementsByTagName("head")[0]);

  importScript("https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min.js", function () {
    importScript("https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js", function () {
      importScript("https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js", function () {
        importScript("https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js", function () {
          importScript("https://cdnjs.cloudflare.com/ajax/libs/js-sequence-diagrams/1.0.6/sequence-diagram-min.js", function () {
            var sequenceElements = document.getElementsByClassName("sequence");
            var sequenceElementsCount = sequenceElements.length;
            for (var i = 0; i < sequenceElementsCount; i++) {
              var element = sequenceElements[i];
              var diagram = Diagram.parse(element.childNodes[0].nodeValue);
              sequenceElements[i].childNodes[0].nodeValue = "";
              diagram.drawSVG(sequenceElements[i], options);
            }
          });
        });
      });
    });
  });
}
