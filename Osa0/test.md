```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: HTML document
    deactivate server

Note left of server: Server responds with HTTP-status 302. (redirect).

Note right of browser: The browser responds to redirct and makes a HTTP GET -request.
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

Note right of browser: After loading the content from request address, the Browser makes four HTTP -requests

Note right of browser: Browser requests the JavaSript file.
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

Note right of browser: The browser starts executing the JavaScript code.

Note right of browser: Browser requests the css file.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

Note right of browser: The JavaScript code on the browser fetches the JSON from the server.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content":"NewNoteDiagram","date":"2023-09-21T06:31:51.097Z"},...]
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/favicon.ico
    activate server
    server-->>browser: HTML document
    deactivate server
```
