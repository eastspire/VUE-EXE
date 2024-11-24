const { ipcRenderer } = require('electron');

const bridge = {
  sendListen: function (name = '', data = {}) {
    ipcRenderer.send(name, data);
  },
  onListen: function (name = '', func = () => {}) {
    ipcRenderer.on(name, (event, ...args) => {
      func(event, ...args);
    });
  },
  offListen: function (name, func = () => {}) {
    ipcRenderer.off(name, (event, ...args) => {
      func(event, ...args);
    });
  },
  onceListen: function (name, func = () => {}) {
    ipcRenderer.once(name, (event, ...args) => {
      func(event, ...args);
    });
  },
  hasListen: function (name = '') {
    const listener_count = ipcRenderer.listenerCount(name);
    return listener_count > 0;
  },
  sendNotification: function (data) {
    ipcRenderer.send('send_notification', data);
  },
};

module.exports = {
  bridge: bridge,
};
