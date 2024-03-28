import React from 'react'
import { Outlet } from 'react-router'
import GetBalance from './walletoperation/GetBalance'
import FundTransfer from './walletoperation/FundTransfer'
import HandelDeposit from './walletoperation/HandelDeposit'
import CreateWallet from './walletoperation/CreateWallet'

function Wallet() {
  return (
    <div>
      


     
     <GetBalance/>
     <FundTransfer/>
     <HandelDeposit/>
     <CreateWallet/>

    <Outlet/>
    </div>
  )
}

export default Wallet
