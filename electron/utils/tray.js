const { app, Menu, Tray } = require('electron');

const {
  docs_url,
  logo_path,
  exit_icon,
  language_map,
  ltpp_git_url,
  ltpp_git_icon,
  ltpp_web_ide_url,
  restart_icon,
  web_ide_icon,
  docs_icon,
  online_icon,
  ltpp_qrcode_url,
  ltpp_qrcode_icon,
  maximize_icon,
  minimize_icon,
} = require('./config.js');

const { createWindow, showWindow } = require('./window.js');

/**
 * 创建系统托盘
 * @param {BrowserWindow} main_window
 */
function creatTray(main_window) {
  tray = new Tray(logo_path);
  const web_ide_submenu = [];
  for (const key in language_map) {
    if (Object.hasOwnProperty.call(language_map, key)) {
      const map = language_map[key];
      web_ide_submenu.push({
        label: `${key}编辑器`,
        icon: map.icon,
        click: () => {
          createWindow(
            `${ltpp_web_ide_url}${map.value}`,
            {
              resizable: true,
              movable: true,
              frame: true,
              transparent: false,
            },
            {}
          );
        },
      });
    }
  }
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '我在线上',
      icon: online_icon,
      click: () => {},
    },
    {
      label: '应用文档',
      icon: docs_icon,
      click: () => {
        createWindow(
          docs_url,
          {
            resizable: true,
            movable: true,
            frame: true,
            transparent: false,
          },
          {}
        );
      },
    },
    {
      label: '代码编辑器',
      icon: web_ide_icon,
      submenu: web_ide_submenu,
    },
    {
      label: 'LTPP-GIT仓库',
      icon: ltpp_git_icon,
      click: () => {
        createWindow(
          ltpp_git_url,
          {
            resizable: true,
            movable: true,
            frame: true,
            transparent: false,
          },
          {}
        );
      },
    },
    {
      label: 'LTPP-QRCODE',
      icon: ltpp_qrcode_icon,
      click: () => {
        createWindow(
          ltpp_qrcode_url,
          {
            resizable: true,
            movable: true,
            frame: true,
            transparent: false,
          },
          {}
        );
      },
    },
    {
      label: '显示窗口',
      icon: maximize_icon,
      click: () => {
        if (main_window) {
          showWindow(main_window);
        }
      },
    },
    {
      label: '隐藏窗口',
      icon: minimize_icon,
      click: () => {
        if (main_window) {
          main_window.hide();
        }
      },
    },
    {
      label: '重启应用',
      icon: restart_icon,
      click: () => {
        app.relaunch();
        app.exit(0);
      },
    },
    { label: '退出应用', icon: exit_icon, role: 'quit' },
  ]);
  tray.setContextMenu(contextMenu);
  // 点击托盘图标时显示窗口
  tray.on('click', () => {
    if (main_window) {
      showWindow(main_window);
    }
  });
}

module.exports = {
  creatTray,
};
