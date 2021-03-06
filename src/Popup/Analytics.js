import UniversalAnalytics from 'universal-analytics';
import uuidv4 from 'uuid/v4';
import localStorage from 'local-storage';
import Extension from 'Core/Extension';

const USER_UUID_KEY = 'USER_UUID';

const GA_IDENTIFY = 'UA-64948076-3';
const VERSION = Extension.getManifest().version;
const APPLICATION_NAME = 'WEX';
const DISPLAYED_VERSION = `${APPLICATION_NAME} ${VERSION}`;

const AnaliticsOptions = {};

let visitorUUID = localStorage.get(USER_UUID_KEY);

if (!visitorUUID) {
    visitorUUID = uuidv4();
    localStorage.set(USER_UUID_KEY, visitorUUID);
}

export const visitor = UniversalAnalytics(GA_IDENTIFY, visitorUUID, {https: true});

export const sendScreenView = (pageTitle) => {
    visitor.screenview(pageTitle, APPLICATION_NAME, DISPLAYED_VERSION).send();
};

export const sendEvent = (eventCategory, eventAction, eventLabel, eventValue, callback) => {
    visitor.event(eventCategory, eventAction, eventLabel, eventValue, callback).send();
};

export const sendTickerScreenView = () => {
    sendScreenView(`WEX / Popup`);
};