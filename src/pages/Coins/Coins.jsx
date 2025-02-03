import React from 'react'
import './Coins.css'
import { useParams } from 'react-router-dom'

const Coins = () => {

  const { coinId } = useParams()

  return (
    <div>
      <h2>Coins : {coinId}</h2>
    </div>
  )
}

export default Coins