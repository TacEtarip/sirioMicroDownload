require('dotenv').config();

import bunyan from 'bunyan';

import pjs from '../package.json';

const { name, version } = pjs;

const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });


const config = {
    development: {
        name,
        version,
        log: () => getLogger(name, version, 'debug'),
      },
    production: {
        name,
        version,
        log: () => getLogger(name, version, 'info'),
    },
};

export default config;