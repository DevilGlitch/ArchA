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

    // function to send the request to ChatGPT and display the response
    function runArchA() {
        const highlightedText = window.getSelection().toString();
        if (!highlightedText) return;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer <YOUR_AUTH_TOKEN>'
            },
            body: JSON.stringify({
                'model': 'text-davinci-002',
                'prompt': highlightedText,
                'temperature': 0.7,
                'max_tokens': 100
            })
        };

        // replace <OPENAI_API_ENDPOINT> with the endpoint of the OpenAI GPT API
        fetch('<OPENAI_API_ENDPOINT>', requestOptions)
            .then(response => response.json())
            .then(data => {
            // replace <CONTAINER_ID> with the ID of the HTML element where you want to display the result
            const container = document.getElementById('<CONTAINER_ID>');
            container.textContent = data.choices[0].text;
        })
            .catch(error => console.error(error));
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
