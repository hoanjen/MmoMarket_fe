import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

export const socket = io(process.env.WEBSOCKET_SERVER_URL, {
  transports: ['websocket'],
  autoConnect: true,
  upgrade: false,
  reconnection: true,
  query: { token: Cookies.get('access_token') },
});
