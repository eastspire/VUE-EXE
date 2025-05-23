const { app, BrowserWindow, nativeTheme, Menu } = require('electron');

const { app_name } = require('./config.js');
const { addBridgeFunction } = require('./ipc.js');
const { listenRequest, listenScreenChange } = require('./listen.js');
const { writeErrorLog } = require('./log.js');
const { createWindow } = require('./window.js');
const { createTray } = require('./tray.js');
const { app_url } = require('./config.js');

/**
 * 监听错误
 */
function listenError() {
  // 监听未捕获的异常
  process.on('uncaughtException', (err) => {
    const err_msg = `Unhandled Error at: ${err.message}`;
    console.warn(err_msg);
    writeErrorLog(err_msg);
  });
  // 捕获未处理的 Promise 拒绝
  process.on('unhandledRejection', (reason, promise) => {
    const err_msg = `Unhandled Rejection at: ${promise};reason: ${reason}`;
    console.warn(err_msg);
    writeErrorLog(err_msg);
  });
}

/**
 * 主窗口初始化运行
 * @returns {promises} main_window
 */
function mainWindowInitRun() {
  return new Promise((resolve) => {
    createWindow(app_url).then((main_window) => {
      createTray(main_window);
      resolve(main_window);
    });
  });
}

/**
 * 运行
 */
function run() {
  listenError();
  // 设置应用程序名称
  app.setName(app_name);
  // 设置通知应用名
  app.setAppUserModelId(app_name);
  // 防多开
  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) {
    app.quit();
  }
  // 禁止默认菜单
  Menu.setApplicationMenu(null);

  app.whenReady().then(() => {
    // 监听屏幕变化
    listenScreenChange();
    listenRequest();
    addBridgeFunction();
    nativeTheme.themeSource = 'system';
    mainWindowInitRun();
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) {
        mainWindowInitRun();
      }
    });
  });

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}

module.exports = {
  run,
};
