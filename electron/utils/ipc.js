

const {
    ipcMain,
    Notification,
} = require('electron');

/**
 * 桥发送通知
 */
function addBridgeFunction () {
    try {
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
    } catch (err) { }
}

module.exports = {
    addBridgeFunction
};