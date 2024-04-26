import React from 'react'
import { Outlet } from 'react-router'
import GetBalance from './walletoperation/GetBalance'
import FundTransfer from './walletoperation/FundTransfer'
import HandelDeposit from './walletoperation/HandelDeposit'
import CreateWallet from './walletoperation/CreateWallet'
import './wallet.css';

function Wallet() {
  return (



    <div >
      


     
     
     <div ><GetBalance/>
     </div>
     <div id="cont1">
     <FundTransfer/>
     <div id="dep"></div>
     <div id="depositer">
     <HandelDeposit/>
     </div>
     </div>
     <CreateWallet/>

    <Outlet/>
    </div>
  )
}

export default Wallet
