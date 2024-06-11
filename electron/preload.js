
const {
  contextBridge,
  ipcRenderer,
} = require('electron');

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
});

// 桥
contextBridge.exposeInMainWorld('bridge', {
  sendNotification: function (data) {
    ipcRenderer.send('send_notification', data);
  },
});
