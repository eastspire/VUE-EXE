## BrowserWindow 配置

```bash
width Integer - 窗口宽度,单位像素. 默认是 800 .

height Integer - 窗口高度,单位像素. 默认是 600 .

x Integer - 窗口相对于屏幕的左偏移位置.默认居中. y Integer - 窗口相对于屏幕的顶部偏移位置.默认居中. useContentSize Boolean - width 和 height 使用web网页size, 这意味着实际窗口的size应该包括窗口框架的 size，稍微会大一点，默认为 false . center

Boolean - 窗口屏幕居中. minWidth Integer - 窗口最小宽度，默认为 0 .

minHeight Integer - 窗口最小高度，默认为 0 .

maxWidth Integer - 窗口最大宽度，默认无限制.

maxHeight Integer - 窗口最大高度，默认无限制.

resizable Boolean - 是否可以改变窗口size，默认为 true .

movable Boolean - 窗口是否可以拖动. 在 Linux 上无效. 默认为 true .

minimizable Boolean - 窗口是否可以最小化. 在 Linux 上无效. 默认为 true .

maximizable Boolean - 窗口是否可以最大化. 在 Linux 上无效. 默认为 true .

closable Boolean - 窗口是否可以关闭. 在 Linux上无效. 默认为 true .

alwaysOnTop Boolean - 窗口是否总是显示在其他窗口之前. 在 Linux上无效. 默认为 false .

fullscreen Boolean - 窗口是否可以全屏幕. 当明确设置值为When false ，全屏化按钮将会隐藏，在 macOS 将禁用. 默认 false .

fullscreenable Boolean - 在 macOS 上，全屏化按钮是否可用，默认为 true . skipTaskbar Boolean - 是否在任务栏中显示窗口. 默认是 false .

kiosk Boolean - kiosk 方式. 默认为 false . title String - 窗口默认title. 默认 "Electron" .

icon NativeImage - 窗口图标, 如果不设置，窗口将使用可用的默认图标.

show Boolean - 窗口创建的时候是否显示. 默认为 true .

frame Boolean - 指定 false 来创建一个 Frameless Window. 默认为 true .

acceptFirstMouse Boolean - 是否允许单击web view来激活窗口 . 默认为 false .

disableAutoHideCursor Boolean - 当 typing 时是否隐藏鼠标.默认 false .

autoHideMenuBar Boolean - 除非点击 Alt ，否则隐藏菜单栏.默认为 false .

enableLargerThanScreen Boolean - 是否允许允许改变窗口大小大于屏幕. 默认是 false .

backgroundColor String -窗口的 background color 值为十六进制,如 #66CD00 或 #FFF 或 #80FFFFFF (支持透明 度). 默认为在 Linux和 Windows 上为 #000 (黑色) , Mac上为 #FFF (或透明).

hasShadow Boolean - 窗口是否有阴影. 只在 macOS 上有效. 默认为 true .

darkTheme Boolean - 为窗口使用 dark 主题, 只在一些拥有 GTK+3 桌面环境上有效. 默认为 false .

transparent Boolean - 窗口 透明. 默认为 false .

type String - 窗口type, 默认普通窗口. 下面查看更多. titleBarStyle String - 窗口标题栏样式. 下面查看更多.

webPreferences Object - 设置界面特性. 下面查看更多.
```

## build 参数

```shell
--mac, -m, -o, --macos   Build for macOS,                             [array]
--linux, -l             Build for Linux                               [array]
--win, -w, --windows     Build for Windows                             [array]
--x64                   Build for x64 (64 位安装包)                     [boolean]
--ia32                   Build for ia32(32 位安装包)                     [boolean]
--armv7l                 Build for armv7l                             [boolean]
--arm64                 Build for arm64                               [boolean]
--dir                   Build unpacked dir. Useful to test.           [boolean]
--prepackaged, --pd     预打包应用程序的路径（以可分发的格式打包）
--projectDir, --project 项目目录的路径。 默认为当前工作目录。
--config, -c             配置文件路径，默认为`electron-builder.yml`（或`js`，或`js5`)
```
