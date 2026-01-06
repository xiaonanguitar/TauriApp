# Tauri 货物管理桌面应用

简单的货物管理平台，使用 React + Webpack5 作为前端，Tauri (Rust) 作为后端。支持开发模式和生产打包。

## 要求
- Node.js（推荐最新 LTS）
- Rust + cargo
- Tauri CLI (`cargo install tauri-cli` 或参见官方文档)

## 安装
1. 安装依赖：

```bash
npm install
```

## 开发模式
1. 在一个终端运行前端开发服务器：

```bash
npm run dev
```

2. 在另一个终端运行 Tauri 开发：

```bash
npm run tauri:dev
```

也可以一次性运行：

```bash
npm run dev:all
```

访问开发模式时，前端运行在 `http://localhost:8080`，Tauri 会将其作为 devPath 加载。

## 打包/生产
1. 构建前端并使用 Tauri 打包：

```bash
npm run build
```

输出会生成在 `src-tauri/target` 或 Tauri 指定的打包路径。

## 存储
- 货物数据保存在应用目录中的 `goods.json`（由后端负责读写）。

## 备注
- 前端与后端通过 Tauri `invoke` 调用 `get_goods` / `add_good`。
- 货物属性：`id` (string), `name` (string), `price` (number)。
