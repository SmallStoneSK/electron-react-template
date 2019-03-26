import path from 'path';
import {app, BrowserWindow} from 'electron';

// 加载本地入口页面地址，开发环境下用devServer，所以用的http协议；生产模式下用file协议
const entryUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/index.html'
  : `file://${path.join(__dirname, 'index.html')}`;

let window = null;

app.on('ready', () => {
  window = new BrowserWindow({width: 800, height: 600});
  window.loadURL(entryUrl);
  window.on('closed', () => window = null);
});

app.on('window-all-closed', () => {
  // mac下比较特殊，所有窗口关闭了也不退出程序
  if(process.platform !== 'darwin') {
    app.quit();
  }
});