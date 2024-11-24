const { app, BrowserWindow, screen, shell } = require('electron');

const {
  is_dev,
  url_illegal_error_msg,
  splashscreen_path,
  web_preferences_config,
  new_window_config,
  app_url,
  max_source_load_finish_wait_time,
  loading_window_height,
  loading_window_width,
  system_info_title,
  network_error_msg,
  url_will_to_outer_msg,
  ltpp_main_btn_error_msg,
  ltpp_other_btn_error_msg,
  max_source_load_fail_wait_time,
  ltpp_other_btn_confirm_msg,
  ltpp_other_btn_cancel_msg,
} = require('./config.js');

const {
  checkUrlCanLoad,
  judgeIsStrictLTPPUrl,
  judgeIsLTPPUrl,
  sleep,
  judgeIsValidUrl,
} = require('./public.js');
const { listenKeydown, removeListenKeydown } = require('./listen.js');
const { showMessageBox } = require('./system.js');
const { runFunc } = require('./helper.js');

let window_id = 1;

/**
 * 创建加载窗口
 * @returns {BrowserWindow} loading_window
 */
function creatLoadingWindow() {
  const loading_window = new BrowserWindow({
    ...new_window_config,
    height: loading_window_height,
    width: loading_window_width,
    alwaysOnTop: true,
    webPreferences: {
      ...web_preferences_config,
    },
  });
  loading_window.id = window_id++;
  creatChildWin(loading_window);
  // 资源加载放最后
  loading_window.loadFile(splashscreen_path);
  showWindowWhenReady(loading_window);
  return loading_window;
}

/**
 * 创建主窗口
 * @param {string} url
 * @param {object} param_new_window_config
 * @param {object} param_web_preferences_config
 * @returns {BrowserWindow|null} loading_window
 */
async function createWindow(
  url = app_url,
  param_new_window_config = {},
  param_web_preferences_config = {}
) {
  const loading_window = creatLoadingWindow();
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const is_strict_ltpp_url = judgeIsStrictLTPPUrl(url);
  const res = await checkUrlCanLoad(url);
  if (!res) {
    await sleep(max_source_load_fail_wait_time);
    loading_window.hide();
    await showMessageBox(system_info_title, network_error_msg, [
      is_strict_ltpp_url ? ltpp_main_btn_error_msg : ltpp_other_btn_error_msg,
    ]);
    loading_window.close();
    is_strict_ltpp_url && app.quit();
    return null;
  }
  const window_config = {
    ...new_window_config,
    ...param_new_window_config,
    webPreferences: {
      ...web_preferences_config,
      ...param_web_preferences_config,
      nodeIntegration: is_strict_ltpp_url,
      nodeIntegrationInWorker: is_strict_ltpp_url,
      webviewTag: is_strict_ltpp_url,
    },
  };
  if (is_strict_ltpp_url) {
    window_config.minWidth = window_config.width = width;
    window_config.minHeight = window_config.height = height;
  } else {
    window_config.minWidth = window_config.width = Math.ceil(width >> 1);
    window_config.minHeight = window_config.height = Math.ceil(height >> 1);
  }
  const main_window = new BrowserWindow(window_config);
  main_window.id = window_id++;
  creatChildWin(main_window);
  if (is_strict_ltpp_url) {
    main_window.maximize();
  }
  main_window.on('focus', () => {
    // 获取焦点，注册监听
    listenKeydown(main_window);
  });
  main_window.on('blur', () => {
    // 失去焦点，注销监听
    removeListenKeydown();
  });
  // 资源准备就绪后展示
  main_window.once('ready-to-show', () => {
    setTimeout(() => {
      try {
        loading_window.close();
        showWindow(main_window);
      } catch (err) {
        app.quit();
      }
    }, max_source_load_finish_wait_time);
  });
  // 资源加载放最后
  main_window.loadURL(url);
  if (is_dev) {
    main_window.webContents.openDevTools();
  }
  return main_window;
}

/**
 * 创建子窗口
 * @param {BrowserWindow} main_window
 */
function creatChildWin(main_window) {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const child_window_config = {
    ...new_window_config,
    resizable: true,
    movable: true,
    frame: true,
    width: Math.ceil(width / 2),
    height: Math.ceil(height / 2),
    minWidth: Math.ceil(width / 2),
    minHeight: Math.ceil(height / 2),
    transparent: false, // 此处设置false，resizable才能生效
    webPreferences: {
      ...web_preferences_config,
    },
  };
  main_window.webContents.setWindowOpenHandler((details) => {
    let loading_window = null;
    try {
      loading_window = creatLoadingWindow();
      loading_window?.show();
    } catch (error) {}
    const url = details?.url || '';
    const child_window = new BrowserWindow(child_window_config);
    if (!url || !judgeIsValidUrl(url)) {
      loading_window?.hide();
      showMessageBox(system_info_title, url_illegal_error_msg, [
        ltpp_other_btn_error_msg,
      ]);
      child_window.close();
      return { action: 'deny' };
    }
    const is_ltpp_url = judgeIsLTPPUrl(url);
    if (!is_ltpp_url) {
      loading_window?.hide();
      showMessageBox(system_info_title, url_will_to_outer_msg, [
        ltpp_other_btn_cancel_msg,
        ltpp_other_btn_confirm_msg,
      ]).then((click_idx) => {
        // 传入的按钮数组，下标为1的为确认
        if (click_idx === 1) {
          shell.openExternal(url);
        }
      });
      child_window.close();
      return { action: 'deny' };
    }
    checkUrlCanLoad(url).then((res) => {
      if (!res) {
        loading_window?.hide();
        showMessageBox(system_info_title, network_error_msg, [
          ltpp_other_btn_error_msg,
        ]);
        child_window.close();
        return { action: 'deny' };
      }
    });
    child_window.id = window_id++;
    child_window.on('focus', () => {
      // 获取焦点，注册监听
      listenKeydown(main_window);
    });
    child_window.on('blur', () => {
      // 失去焦点，注销监听
      removeListenKeydown();
    });
    child_window.loadURL(url);
    creatChildWin(child_window);
    showWindowWhenReady(child_window, () => {
      loading_window?.hide();
    });
    return { action: 'deny' };
  });
}

/**
 * 显示窗口
 * @param {BrowserWindow} main_window
 */
function showWindow(main_window) {
  try {
    main_window?.show();
    main_window?.setAlwaysOnTop(true);
    setTimeout(() => {
      try {
        main_window?.setAlwaysOnTop(false);
        main_window?.focus();
      } catch (error) {}
    }, 0);
  } catch (error) {}
}

/**
 * 显示窗口
 * @param {BrowserWindow} main_window
 */
function showWindowWhenReady(main_window, cb = () => {}, ...args) {
  main_window?.once('ready-to-show', () => {
    try {
      // 资源准备就绪后展示
      showWindow(main_window);
      try {
        runFunc(cb, args);
      } catch (error) {}
    } catch (err) {
      app.quit();
    }
  });
}

module.exports = {
  creatLoadingWindow,
  createWindow,
  creatChildWin,
  showWindow,
};
