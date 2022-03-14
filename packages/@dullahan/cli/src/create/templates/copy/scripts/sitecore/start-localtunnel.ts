import localtunnel from 'localtunnel';

import fs from 'fs';

(async () => {
  console.log('Starting tunnel...');
  const tunnel = await localtunnel({ port: 3000 });
  fs.writeFileSync('./.tunnel', tunnel.url);
  console.log(`\n\n\x1b[42m\x1b[30mStarted tunnel on: ${tunnel.url} \x1b[0m`);
  console.log(
    `\x1b[42m\x1b[30mUsage in Experience Editor: &sc_httprenderengineurl=${tunnel.url}/api/editing/render\x1b[0m`
  );
})();
