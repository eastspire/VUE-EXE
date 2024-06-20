
const {
  contextBridge,
  ipcRenderer,
} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('set-media-source', async (event, sourceId) => {
    try {
      console.log(1);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sourceId,
            maxWidth: window.screen.width,
            maxHeight: window.screen.height
          }
        }
      });
      handleStream(stream);
    } catch (e) {
      handleError(e);
    }
  });

  function handleStream (stream) {
    const video = document.querySelector('video');
    video.srcObject = stream;
    video.onloadedmetadata = (e) => video.play();
  }

  function handleError (e) {
    console.log(e);
  }
});

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
  send: function (name = '', data = {}) {
    ipcRenderer.send(name, data);
  },
  on: function (name = '', func = () => { }) {
    ipcRenderer.on(name, (event, ...args) => {
      func(event, ...args);
    });
  },
  sendNotification: function (data) {
    ipcRenderer.send('send_notification', data);
  },
});
