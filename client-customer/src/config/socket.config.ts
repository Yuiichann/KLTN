import { io } from 'socket.io-client';
import config from './config';

const socket = io(config.app_URL);

export default socket;
