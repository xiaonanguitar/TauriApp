import axios from 'axios'

const API_BASE = 'http://localhost:8080/api/goods'

export async function getGoods() {
  try {
    const res = await axios.get(API_BASE)
    return res.data || []
  } catch (e) {
    console.error('getGoods error', e)
    // Re-throw so caller can show error
    throw e
  }
}

export async function addGood(good) {
  try {
    await axios.post(API_BASE, good)
  } catch (e) {
    console.error('addGood error', e)
    throw e
  }
}