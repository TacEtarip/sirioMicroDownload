require('dotenv').config();

import axios from 'axios';
import http from 'http';

import preConfig from '../config/index';
import app from '../server/service';

const config = preConfig[process.env.NODE_ENV];
const log = config.log();

const PORT = process.env.PORT;

app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT || 0);


server.on('listening', () => {
  
    const registerService = () => axios.put(`https://siriodinar-registro-ms.herokuapp.com/register/${config.name}/${config.version}/${server.address().port}`)
                                  .catch(err => log.fatal(err));
    
    const unregisterService = () => axios.delete(`https://siriodinar-registro-ms.herokuapp.com/register/${config.name}/${config.version}/${server.address().port}`)
                                  .catch(err => log.fatal(err));

    registerService();

    const interval = setInterval(registerService, 15000);
    
    const cleanup = async () => {
        let clean = false;
        if (!clean) {
          clean = true;
          clearInterval(interval);
          await unregisterService();
        }
    };

    process.on('uncaughtException', async () => {
      await cleanup();
      process.exit(0);
    });
  
    process.on('SIGINT', async () => {
      await cleanup();
      process.exit(0);
    });
  
    process.on('SIGTERM', async () => {
      await cleanup();
      process.exit(0);
    });

    log.info(
        `Hi there! I'm listening on port ${server.address().port} in ${app.get('env')} mode.`,
      );
});