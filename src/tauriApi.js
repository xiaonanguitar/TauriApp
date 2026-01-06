import { invoke, isTauri } from '@tauri-apps/api/core'

export async function getGoods() {
  if (!isTauri()) {
    // Fallback in web dev: use localStorage
    try {
      const s = localStorage.getItem('goods')
      return s ? JSON.parse(s) : []
    } catch (e) {
      console.warn('local fallback read error', e)
      return []
    }
  }
  return invoke('get_goods')
}

export async function addGood(good) {
  if (!isTauri()) {
    try {
      const goods = await getGoods()
      goods.push(good)
      localStorage.setItem('goods', JSON.stringify(goods))
      return
    } catch (e) {
      throw e
    }
  }
  return invoke('add_good', { good })
}