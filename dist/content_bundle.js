(()=>{console.log("content.ts",chrome.runtime.id,chrome);var e,n=chrome.runtime.connect({}),o=function(){e=setInterval((function(){console.log("give me data"),n.postMessage("give me data")}),2e3)};o(),n.onMessage.addListener((function(n){console.log("msg",n,e),"logout status"===n&&e&&clearInterval(e)})),chrome.storage.onChanged.addListener((function(n,t){console.log("storage onChanged",n),n.loginId&&n.loginId.newValue&&"sync"===t?o():e&&clearInterval(e)}))})();