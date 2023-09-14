import HostnameAssignedMessage from '../messages/hostname-assigned-message.js';
import HostipWebSocket from '../websocket/host-ip-websocket.js';
import { Options } from '../options.js';
import { eventHandler, URL_ASSIGNED } from '../events/event-handler.js';

export default async function hostnameAssigned(message: HostnameAssignedMessage, websocket: HostipWebSocket, options: Options) {
    const port = options.port;

    if (typeof port === 'undefined') {
        console.error('Please specify a port e.g. run "tmole 80"');
    }

    const host = options.host || 'localhost';

    const httpUrl = `http://${message.hostname}`;
    const httpsUrl = `https://${message.hostname}`;

    console.info(`${httpUrl} is forwarding to ${host}:${port}`);
    console.info(`${httpsUrl} is forwarding to ${host}:${port}`);
    eventHandler.emit(URL_ASSIGNED, httpsUrl);
}
