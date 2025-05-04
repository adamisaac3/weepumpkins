'use client'

import React, { useState } from 'react'

export default function TestPage() {
  const [value, setValue] = useState('')

  return (
    <div>
      <h1>Test Page</h1>
      <select onChange={(e) => {
        console.log('Select changed:', e.target.value)
        setValue(e.target.value)
      }}>
        <option value="">-- Select --</option>
        <option value="one">One</option>
        <option value="two">Two</option>
      </select>
      <p>Selected: {value}</p>
    </div>
  )
}