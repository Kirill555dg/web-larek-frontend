import './scss/styles.scss';

import { CDN_URL, API_URL } from './utils/constants';
import { LarekApi } from './components/LarekApi';
import { EventEmitter } from './components/core/EventEmitter';

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

