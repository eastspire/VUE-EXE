# VUE-EXE

> **LTPP 桌面客户端** —— [LTPP 宇宙文档](https://docs.ltpp.vip/LTPP/LTPP-EXE/)
>
> 同时提供 **Electron** 和 **Tauri** 两套实现，跨 **Windows / macOS / Linux** 三平台。
> 通过 Web 技术承载 LTPP（Learning Teaching Practice Platform）主服务的桌面外壳。

---

## 📦 仓库结构

```
VUE-EXE/
├── electron/                  # Electron + Vue 桌面端（成熟方案）
│   ├── main.js                # Electron 主进程入口
│   ├── preload.js             # 预加载脚本（暴露安全 IPC）
│   ├── renderer.js            # 渲染进程入口
│   ├── styles.css
│   ├── vue.config.js
│   ├── package.json           # name: ltpp, appId: ltpp.vip
│   ├── utils/                 # 11 个子模块
│   │   ├── init.js            #   启动入口
│   │   ├── config.js          #   dev / prod 切换
│   │   ├── window.js          #   BrowserWindow 管理
│   │   ├── tray.js            #   系统托盘
│   │   ├── ipc.js             #   IPC 通道
│   │   ├── bridge.js          #   preload 桥接
│   │   ├── listen.js          #   全局事件监听
│   │   ├── public.js          #   公共工具
│   │   ├── log.js             #   日志
│   │   ├── system.js          #   系统调用
│   │   └── helper.js
│   ├── src/                   # 资源（html、photo 等）
│   ├── build/                 # electron-builder 输出
│   ├── buildResources/        # 图标 / 品牌资源
│   ├── Must/                  # NSIS / 安装所需素材（main.rtf）
│   ├── package_win.sh         # 三平台打包脚本
│   ├── package_mac.sh
│   ├── package_linux.sh
│   ├── ltpp-x64.aip           # 已编译安装包（x86_64）
│   ├── ltpp-ia32.aip          # 已编译安装包（ia32）
│   ├── ltpp-arm64.aip         # 已编译安装包（arm64）
│   └── LICENSE.md
└── tauri/                     # Tauri 1.2 + Rust 桌面端（轻量方案）
    ├── LTPP.aip               # 已编译安装包
    ├── tauri/                 # 资源（main.rtf）
    └── tauri-ltpp-code/       # 实际可开发项目
        ├── package.json       #   @tauri-apps/api ^1.2.0
        ├── yarn.lock / pnpm-lock.yaml / package-lock.json
        └── src-tauri/         #   Rust 后端
            ├── Cargo.toml
            ├── tauri.conf.json
            ├── build.rs
            └── src/
```

---

## 🚀 快速开始

### Electron 版（推荐，成熟方案）

```bash
cd electron
yarn install                          # 需要 Node v20.18.1 / Yarn v1.22.22
yarn serve-exe-dev                    # 开发模式（需配合 LTPP-CODE/Frontend dev server）
yarn serve-exe-prod                   # 生产模式
```

### Tauri 版（轻量方案）

```bash
cd tauri/tauri-ltpp-code
yarn install
yarn tauri dev                        # 开发模式
yarn tauri build                      # 打包安装包
```

### 跨平台打包（Electron）

```bash
cd electron
yarn build:win      # NSIS (x64 / arm64) + portable (x64 / ia32)
yarn build:mac      # DMG
yarn build:linux    # AppImage
```

输出落在 `electron/out/`,也可直接用仓里提供的 `package_*.sh`。

---

## 🛠️ 环境要求

| 工具 | 版本 |
| --- | --- |
| Node.js | v20.18.1（仓内 `package.json` 锁定） |
| Yarn | v1.22.22 |
| Rust（Tauri 用） | 与 Tauri 1.2 兼容的 stable toolchain |

外部依赖（开发 Electron 版时）：

- [`LTPP-CODE/Frontend`](https://github.com/eastspire) 的 dev server（见 `package.json` 的 `serve-web` 脚本）；
  在 `electron/` 目录下运行时，它会期望 `../../LTPP-CODE/Frontend` 存在。

---

## 📥 已编译安装包

| 文件 | 平台 / 架构 | 来自 |
| --- | --- | --- |
| `electron/ltpp-x64.aip` | Windows x86_64 | electron-builder |
| `electron/ltpp-ia32.aip` | Windows ia32 | electron-builder |
| `electron/ltpp-arm64.aip` | Windows / macOS arm64 | electron-builder |
| `tauri/LTPP.aip` | 跨平台 | Tauri |

`.aip` 是 LTPP 项目专用的安装包格式，**不是标准的 `.exe` / `.dmg` / `.AppImage`**；
安装前请用 LTPP 提供的加载器或阅读 [LTPP-EXE 文档](https://docs.ltpp.vip/LTPP/LTPP-EXE/)。

---

## 🧩 与 LTPP 生态的关系

- 主服务：[`eastspire/LTPP`](https://github.com/eastspire/LTPP)
- 配套桌面端：**本仓 `VUE-EXE`**
- 文档站：[docs.ltpp.vip/LTPP/LTPP-EXE/](https://docs.ltpp.vip/LTPP/LTPP-EXE/)

Electron 版的 `serve-web` 脚本会拉起 `LTPP-CODE/Frontend` 的 Vite dev server 作为 UI；
打包后内置生产构建，离线也能用。

---

## 🩺 常见问题

- **`.aip` 怎么安装？** LTPP 项目定制的安装包格式，配合 LTPP 主服务的 `Install` 模块使用，详见文档站。
- **Electron / Tauri 该选哪个？** Electron 成熟、调试方便，体积大；Tauri 体积小、性能好（Rust 后端），
  但 Tauri 1.2 已 EOL，生产环境建议评估 Tauri 2.x。
- **`serve-web` 报错找不到 `../../LTPP-CODE/Frontend`**：把 `LTPP-CODE` 仓 clone 到 `VUE-EXE` 的同级目录即可。

---

## 📜 版权

主程序、配置与文档版权归原作者 [eastspire](https://github.com/eastspire) 所有。
