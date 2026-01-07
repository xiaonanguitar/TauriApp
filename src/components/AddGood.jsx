import React, { useState } from 'react'

export default function AddGood({ onAdd }) {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!id || !name || !price) return alert('请填写所有字段')
    const p = Number(price)
    if (isNaN(p)) return alert('价格必须为数字')
    onAdd({ name, price: p })
    setId('')
    setName('')
    setPrice('')
  }

  return (
    <form onSubmit={submit} className="add-form">
      <div>
        <label>ID: <input value={id} onChange={(e) => setId(e.target.value)} /></label>
      </div>
      <div>
        <label>名称: <input value={name} onChange={(e) => setName(e.target.value)} /></label>
      </div>
      <div>
        <label>价格: <input value={price} onChange={(e) => setPrice(e.target.value)} /></label>
      </div>
      <button type="submit">添加货物</button>
    </form>
  )
}