# vite-gen-index.html-issue
Generated index.html is the same for different requests.

### How to reproduce

1. Install packages using `npm install`
2. Run script `node ./vite-run.js`
3. As a result, 2 pages with `http://localhost:4444/uuid=12345` and `http://localhost:4444/uuid=67890` urls will open. And both of them will have `12345` in the log (it is almost always reproduced with rare exceptions).
