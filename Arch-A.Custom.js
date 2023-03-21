// ==UserScript==
// @name         Arch-A
// @namespace    https://github.com/DevilGlitch/ArchA
// @version      C.1.0.0
// @description  Highlight text, hold shift, and click to run Arch-A and display result in a container
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    let highlightedText = '';
    let container = null;

    // function to send the request to the Arch-A API and display the response in the container
    function runArchA() {
        const url = 'https://arch-a-api.example.com';
        GM_xmlhttpRequest({
            method: 'POST',
            url: url,
            data: highlightedText,
            headers: {
                'Content-Type': 'text/plain'
            },
            onload: function(response) {
                container.textContent = response.responseText;
            }
        });
    }

    // event listener for when the shift key is held down while text is highlighted
    document.addEventListener('selectionchange', function() {
        if (window.getSelection().toString() && window.event.shiftKey) {
            highlightedText = window.getSelection().toString();
            if (!container) {
                container = document.createElement('div');
                container.style.position = 'fixed';
                container.style.top = '10px';
                container.style.right = '10px';
                container.style.width = '400px';
                container.style.height = '200px';
                container.style.backgroundColor = 'white';
                container.style.border = '1px solid black';
                container.style.padding = '10px';
                document.body.appendChild(container);
            }
            if (confirm('Do you want to run Arch-A on the selected text?')) {
                runArchA();
            }
        }
    });
})();
