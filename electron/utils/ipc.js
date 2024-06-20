

const {
    ipcMain,
    Notification,
    desktopCapturer
} = require('electron');

/**
 * 通知
 */
const addSendNotification = function () {
    ipcMain.on('send_notification', (event, data) => {
        try {
            const res_data = {
                subtitle: app_name,
                title: data?.title,
                body: data?.body,
                icon: data?.icon || app_icon,
            };
            const notification = new Notification(res_data);
            notification.show();
        } catch (error) {
        }
    });
}

/**
 * 录屏
 */
const getVideoRecorder = async function () {
    // 获取屏幕
    ipcMain.on('get_video_recording', async (event) => {
        const sources = await desktopCapturer.getSources({ types: ['screen'] });
        const source = sources?.[0] || null;
        event.reply('get_video_recording', source);
    });
}

/**
 * 桥
 */
const addBridgeFunction = function () {
    try {
        addSendNotification();
        getVideoRecorder();
    } catch (err) { }
}

module.exports = {
    addBridgeFunction
};