const app = require('./app.js');

const port = process.env.PORT;

app.listen(port);

process.stdout.write(`\nListening on port ${port}\n\n`);
