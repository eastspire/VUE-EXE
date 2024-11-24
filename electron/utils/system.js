const { dialog } = require('electron');

/**
 * 展示系统弹窗
 * @param {string} title
 * @param {string} message
 * @param {Array<string>} buttons
 * @returns
 */
async function showMessageBox(title = '', message = '', buttons = []) {
  const result = await dialog.showMessageBox({
    type: 'info',
    title,
    message,
    buttons,
  });
  return result?.response || 0;
}

module.exports = {
  showMessageBox,
};
