import React from 'react'
import GameSizeComp from '../components/GameSizeComp'
import CardTwo from '../components/UI/CardTwo'
import Classes from './ChooseGameSizePage.module.css'

const ChooseGameSizePage = () => {
  const gameSizeSmall={
    size:"SHORT",
    price:60,
    numberOfQuestion:10
}
const gameSizeMedium={
  size:"MEDIUM",
  price:90,
  numberOfQuestion:15
}
const gameSizeLong={
  size:"LONG",
  price:120,
  numberOfQuestion:25
}
const gameSizeUnlimited={
  size:"UNLIMITED",
  price:200,
  numberOfQuestion:100
}
  return (
    <div>

    <table className={Classes.table}>
      <tbody>
        <tr>
         <GameSizeComp gameSize={gameSizeSmall}/>  
        </tr>
        <tr>
         <GameSizeComp gameSize={gameSizeMedium}/>  
        </tr>
        <tr>
         <GameSizeComp gameSize={gameSizeLong}/>  
        </tr>
        <tr>
         <GameSizeComp gameSize={gameSizeUnlimited}/>  
        </tr>
        </tbody>
    </table>


    </div>
  )
}

export default ChooseGameSizePage