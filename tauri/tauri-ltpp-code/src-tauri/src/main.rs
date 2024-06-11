/*
 * @Author: 18855190718 1491579574@qq.com
 * @Date: 2023-02-21 09:03:47
 * @LastEditors: 18855190718 1491579574@qq.com
 * @LastEditTime: 2023-08-22 13:57:09
 * @FilePath: \vue-exe\tauri\tauri-ltpp-code\src-tauri\src\main.rs
 * @Description: Email:1491579574@qq.com
 * QQ:1491579574
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use reqwest::blocking::get;
use std::process;
use tauri::Manager;

fn get_page(mut try_times: u64) -> u64 {
    if try_times > 1024 {        
        process::exit(1);
    }
    let url: &str = "http://ltpp.vip";
    let response: Result<reqwest::blocking::Response, reqwest::Error> = get(url);
    match response {
        Ok(res) => {
            let _body: String = res.text().unwrap();
        }
        Err(_err) => {
            try_times = try_times + 1;
            return get_page(try_times);
        }
    }
    return try_times;
}

fn main() {
    let _res: u64 = get_page(1) + 6;
    tauri::Builder::default()
        .setup(move |app| {
            let splashscreen_window: tauri::Window = app.get_window("splashscreen").unwrap();
            let main_window: tauri::Window = app.get_window("main").unwrap();
            tauri::async_runtime::spawn(async move {
                std::thread::sleep(std::time::Duration::from_secs(_res));
                splashscreen_window.close().unwrap();
                main_window.show().unwrap();
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("Failed to run app");
}
