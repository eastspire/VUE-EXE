const { session, globalShortcut, BrowserWindow, screen } = require('electron');
const { writeInfoLog } = require('./log.js');

/**
 * 监听请求
 */
function listenRequest () {
    // 监听所有的网络请求
    session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
        const msg = `Request URL => ${details.url}`;
        writeInfoLog(msg);
        callback({});
    });
    // 监听响应
    session.defaultSession.webRequest.onCompleted((details) => {
        const msg = `${details.url} => ${JSON.stringify(details, null, 2)}`;
        writeInfoLog(msg);
    });
}

/**
 * 监听键盘事件
 * @param {BrowserWindow} main_window 
 * @returns 
 */
function listenKeydown (main_window = null) {
    if (!main_window) {
        return;
    }
    const accelerator = process.platform === 'darwin' ? 'Command+W' : 'Control+W';
    globalShortcut.register(accelerator, () => {
        // 当快捷键被按下时，检查哪个窗口是活动的
        const focused_window = BrowserWindow.getFocusedWindow();
        if (!focused_window?.id) {
            return;
        }
        // 聚焦窗口是主窗口则隐藏
        if (main_window?.id === focused_window?.id && main_window.isVisible() && !main_window.isDestroyed()) {
            main_window.hide();
        }
        // 聚焦窗口不是主窗口则关闭
        if (focused_window.id !== main_window.id && focused_window.isVisible() && !focused_window.isDestroyed()) {
            focused_window.close();
        }
    });
}

/**
 * 移除键盘监听
 */
function removeListenKeydown () {
    globalShortcut.unregisterAll();
}

/**
 * 监听屏幕变化
 * 必须app.whenReady之后使用
 */
function listenScreenChange () {
    // 监听显示器缩放变化
    screen.on('display-metrics-changed', (event, display, changedMetrics) => {
        // 获取所有窗口
        const windows = BrowserWindow.getAllWindows();
        // 更新所有窗口的大小和位置
        windows.forEach((win) => {
            win.maximize();
        });
    });
}

module.exports = {
    listenRequest,
    listenKeydown,
    removeListenKeydown,
    listenScreenChange
};