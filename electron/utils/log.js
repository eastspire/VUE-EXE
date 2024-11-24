const path = require('path');
const fs = require('fs');
const { info_logs_file_dir, error_logs_file_dir } = require('./config.js');
const { getYearMonthDay } = require('./public.js');

/**
 * 获取日志文件路径
 * @param {string} logs_file_dir
 * @returns {string} path
 */
function getLogFilePath(logs_file_dir = '') {
  try {
    if (!fs.existsSync(logs_file_dir)) {
      fs.mkdirSync(logs_file_dir, { recursive: true });
    }
    const file_name = `${getYearMonthDay()}.log`;
    return path.join(logs_file_dir, file_name);
  } catch (err) {
    console.log('getLogFilePath error:', err);
  }
  return '';
}

/**
 * 写入信息日志
 * @param {*} message
 */
function writeInfoLog(message = '') {
  try {
    const current_time = new Date().toISOString();
    const log_file_path = getLogFilePath(info_logs_file_dir);
    fs.appendFile(log_file_path, `[${current_time}]\n${message}\n\n`, (err) => {
      if (err) {
        console.error('writeInfoLog error:', err);
      }
    });
  } catch (err) {
    console.log('writeInfoLog error:', err);
  }
}

/**
 * 写入错误日志
 * @param {*} message
 */
function writeErrorLog(message = '') {
  try {
    const current_time = new Date().toISOString();
    const log_file_path = getLogFilePath(error_logs_file_dir);
    fs.appendFile(log_file_path, `[${current_time}]\n${message}\n\n`, (err) => {
      if (err) {
        console.log('writeErrorLog error:', err);
      }
    });
  } catch (err) {
    console.log('writeErrorLog error:', err);
  }
}

module.exports = {
  writeInfoLog,
  writeErrorLog,
};
