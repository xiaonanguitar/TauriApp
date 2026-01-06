use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;

#[derive(Serialize, Deserialize, Clone)]
struct Good {
  id: String,
  name: String,
  price: f64,
}

fn storage_path() -> Result<PathBuf, String> {
  dirs::data_dir()
    .ok_or_else(|| "无法获取应用目录".into())
    .map(|p: PathBuf| p.join("tauri-goods-app").join("goods.json"))
}

#[tauri::command]
fn get_goods() -> Result<Vec<Good>, String> {
  let path = storage_path()?;
  if !path.exists() {
    return Ok(Vec::new());
  }
  let s = fs::read_to_string(&path).map_err(|e| e.to_string())?;
  let goods: Vec<Good> = serde_json::from_str(&s).map_err(|e| e.to_string())?;
  Ok(goods)
}

#[tauri::command]
fn add_good(good: Good) -> Result<(), String> {
  let path = storage_path()?;
  let mut goods = if path.exists() {
    let s = fs::read_to_string(&path).map_err(|e| e.to_string())?;
    serde_json::from_str(&s).map_err(|e| e.to_string())?
  } else {
    Vec::new()
  };
  goods.push(good);
  let s = serde_json::to_string_pretty(&goods).map_err(|e| e.to_string())?;
  fs::create_dir_all(path.parent().unwrap()).map_err(|e| e.to_string())?;
  fs::write(&path, s).map_err(|e| e.to_string())?;
  Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![get_goods, add_good])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
