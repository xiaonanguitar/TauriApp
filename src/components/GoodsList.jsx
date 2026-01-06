import React from 'react'

export default function GoodsList({ goods }) {
  if (!goods || goods.length === 0) return <p>没有货物。</p>
  return (
    <table className="goods-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>价格</th>
        </tr>
      </thead>
      <tbody>
        {goods.map((g) => (
          <tr key={g.id}>
            <td>{g.id}</td>
            <td>{g.name}</td>
            <td>{g.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}