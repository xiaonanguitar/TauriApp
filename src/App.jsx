import React, { useEffect, useState } from 'react'
import GoodsList from './components/GoodsList'
import AddGood from './components/AddGood'
import { getGoods, addGood } from './tauriApi'

export default function App() {
  const [goods, setGoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [isTauriEnv, setIsTauriEnv] = useState(true)

  const fetchGoods = async () => {
    setLoading(true)
    try {
      const res = await getGoods()
      setGoods(res || [])
    } catch (e) {
      console.error(e)
      setGoods([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Try fetching once; if it fails due to missing Tauri internals, fallback is used.
    fetchGoods()
  }, [])

  const handleAdd = async (good) => {
    try {
      await addGood(good)
      await fetchGoods()
    } catch (e) {
      console.error(e)
      alert('添加货物失败: ' + (e?.message || e))
    }
  }

  return (
    <div className="container">
      <h1>货物管理平台</h1>
      <AddGood onAdd={handleAdd} />
      <hr />
      {loading ? <p>加载中...</p> : <GoodsList goods={goods} />}
    </div>
  )
}