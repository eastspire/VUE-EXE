const path = require('path');
const { nativeImage } = require('electron');

// 是否是开发环境
const is_dev = process.env.NODE_ENV === 'LTPP-APP-DEV-NODE-ENV';

// app名称
const app_name = 'LTPP在线开发平台';

// 信息日志文件地址
const info_logs_file_dir = '/LTPP/logs/info/';

// 错误日志文件地址
const error_logs_file_dir = '/LTPP/logs/error/';

// APP地址
const app_url = is_dev ? 'http://localhost:8080' : 'https://ltpp.vip';

// 文档地址
const docs_url = 'https://docs.ltpp.vip';

// LTPP-WEB-IDE地址
const ltpp_web_ide_url = 'https://ide.ltpp.vip/?language=';

// LTPP-QRCODE地址
const ltpp_qrcode_url = 'https://qrcode.ltpp.vip';

// APP URL对象
const app_url_obj = new URL(app_url);

// 资源加载完成后最大等待时间（毫秒）
const max_source_load_finish_wait_time = 0;

// 资源加载失败后最大等待时间（毫秒）
const max_source_load_fail_wait_time = 666;

// 图标
const app_icon = path.join(__dirname, '../src/photo/logo.png');

// 文档图标
const docs_icon = nativeImage
  .createFromPath(path.join(__dirname, '../src/photo/docs.png'))
  .resize({ width: 22, height: 22 });

// 最小化图标
const minimize_icon = nativeImage
  .createFromPath(path.join(__dirname, '../src/photo/minimize.png'))
  .resize({ width: 22, height: 22 });

// 最大化图标
const maximize_icon = nativeImage
  .createFromPath(path.join(__dirname, '../src/photo/maximize.png'))
  .resize({ width: 22, height: 22 });

// 在线图标
const online_icon = nativeImage
  .createFromPath(path.join(__dirname, '../src/photo/online.png'))
  .resize({ width: 22, height: 22 });

// 在线代码编辑器图标
const web_ide_icon = nativeImage
  .createFromPath(path.join(__dirname, '../src/photo/web-ide.png'))
  .resize({ width: 22, height: 22 });

// 重启图标
const restart_icon = nativeImage
  .createFromPath(path.join(__dirname, '../src/photo/restart.png'))
  .resize({ width: 22, height: 22 });

// LTPP-QRCODE图标
const ltpp_qrcode_icon = nativeImage
  .createFromPath(path.join(__dirname, '../src/photo/ltpp-qrcode.png'))
  .resize({ width: 22, height: 22 });

// 退出图标
const exit_icon = nativeImage
  .createFromPath(path.join(__dirname, '../src/photo/exit.png'))
  .resize({ width: 22, height: 22 });

const system_info_title = '系统通知';

const network_error_msg = '网络异常！请网络恢复后重试！';

const url_illegal_error_msg = '网络地址不符合规范！请修改网络地址后重试！';

const url_will_to_outer_msg = '系统检测到外部网络地址！';

const ltpp_main_btn_error_msg = '关闭应用';

const ltpp_other_btn_error_msg = '好的';

const ltpp_other_btn_confirm_msg = '确认访问';

const ltpp_other_btn_cancel_msg = '取消访问';

const logo_path = path.join(__dirname, '../src/photo/logo.png');

const splashscreen_path = path.join(__dirname, '../src/html/splashscreen.html');

const preload_path = path.join(__dirname, '../preload.js');

const language_map = {
  C: {
    value: 'c',
    icon: nativeImage
      .createFromPath(path.join(__dirname, '../src/photo/c.png'))
      .resize({ width: 22, height: 22 }),
  },
  'C++': {
    value: 'cpp',
    icon: nativeImage
      .createFromPath(path.join(__dirname, '../src/photo/cpp.png'))
      .resize({ width: 22, height: 22 }),
  },
  Rust: {
    value: 'rust',
    icon: nativeImage
      .createFromPath(path.join(__dirname, '../src/photo/rust.png'))
      .resize({ width: 22, height: 22 }),
  },
  JavaScript: {
    value: 'javascript',
    icon: nativeImage
      .createFromPath(path.join(__dirname, '../src/photo/javascript.png'))
      .resize({ width: 22, height: 22 }),
  },
  TypeScript: {
    value: 'typescript',
    icon: nativeImage
      .createFromPath(path.join(__dirname, '../src/photo/typescript.png'))
      .resize({ width: 22, height: 22 }),
  },
  PHP: {
    value: 'php',
    icon: nativeImage
      .createFromPath(path.join(__dirname, '../src/photo/php.png'))
      .resize({ width: 22, height: 22 }),
  },
  JAVA: {
    value: 'java',
    icon: nativeImage
      .createFromPath(path.join(__dirname, '../src/photo/java.png'))
      .resize({ width: 22, height: 22 }),
  },
  GoLang: {
    value: 'golang',
    icon: nativeImage
      .createFromPath(path.join(__dirname, '../src/photo/golang.png'))
      .resize({ width: 22, height: 22 }),
  },
  Python3: {
    value: 'python3',
    icon: nativeImage
      .createFromPath(path.join(__dirname, '../src/photo/python3.png'))
      .resize({ width: 22, height: 22 }),
  },
  'C#': {
    value: 'csharp',
    icon: nativeImage
      .createFromPath(path.join(__dirname, '../src/photo/csharp.png'))
      .resize({ width: 22, height: 22 }),
  },
  Ruby: {
    value: 'ruby',
    icon: nativeImage
      .createFromPath(path.join(__dirname, '../src/photo/ruby.png'))
      .resize({ width: 22, height: 22 }),
  },
};

// webPreferences配置
const web_preferences_config = {
  cache: true, // 启用页面缓存
  offscreen: false, // 关闭离屏渲染
  preload: preload_path,
  devTools: is_dev ?? false, // 控制台状态
  allowRunningInsecureContent: true, // 允许使用透明度
  experimentalFeatures: false, // 实验功能
  webSecurity: true, // CSP 的安全限制
  nativeWindowOpen: true, // <a>标签打开新窗口
  nodeIntegration: false, // Node.js 整合
  nodeIntegrationInWorker: false, // 是否在Web工作器中启用了Node集成
  nodeIntegrationInSubFrames: false, // 是否允许在子页面(iframe)或子窗口(child window)中集成Node.js
  webviewTag: true, // WebView标签
  contextIsolation: true, // 开启上下文隔离
};

const loading_window_width = 582;
const loading_window_height = 360;

// BrowserWindow配置
const new_window_config = {
  show: false,
  resizable: false, //是否可以更改窗口大小
  movable: false,
  autoHideMenuBar: true,
  maximize: false,
  darkTheme: true,
  minHeight: loading_window_height,
  minWidth: loading_window_width,
  center: true, // 自动居中
  frame: false, // 窗口边框
  alwaysOnTop: false, // 窗口始终在顶部显示
  hasShadow: false, // 窗口阴影
  transparent: true, // 窗口背景透明
  icon: app_icon,
  backgroundColor: 'transparent',
  webPreferences: {},
};

module.exports = {
  is_dev,
  app_name,
  app_url,
  app_icon,
  docs_url,
  logo_path,
  ltpp_qrcode_url,
  ltpp_qrcode_icon,
  exit_icon,
  docs_icon,
  maximize_icon,
  minimize_icon,
  app_url_obj,
  language_map,
  ltpp_git_icon,
  ltpp_git_url,
  web_ide_icon,
  online_icon,
  restart_icon,
  url_illegal_error_msg,
  info_logs_file_dir,
  error_logs_file_dir,
  ltpp_web_ide_url,
  splashscreen_path,
  new_window_config,
  max_source_load_finish_wait_time,
  web_preferences_config,
  loading_window_height,
  loading_window_width,
  system_info_title,
  network_error_msg,
  ltpp_main_btn_error_msg,
  ltpp_other_btn_error_msg,
  max_source_load_fail_wait_time,
  url_will_to_outer_msg,
  ltpp_other_btn_confirm_msg,
  ltpp_other_btn_cancel_msg,
};
