// @flow
import config from 'config';
import process from 'global/process';
import {Server} from 'onefx/lib/server';
import {setModel} from '../model';
import {OnefxAuth} from '../shared/onefx-auth';
import {authConfig} from '../shared/onefx-auth/auth-config';
import {setMiddleware} from './middleware';
import {setServerRoutes} from './server-routes';
import {setGateways} from './gateway/gateway';

export async function startServer() {
  const server = new Server(config);
  setGateways(server);
  server.auth = new OnefxAuth(server, authConfig);
  setMiddleware(server);
  setModel(server);
  setServerRoutes(server);

  // eslint-disable-next-line no-process-env,no-undef
  const port = process.env.PORT || config.get('server.port');
  server.listen(port);
  return server;
}
