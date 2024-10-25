import React, { useEffect, useState } from 'react'
import '../Scout/Scout.css';
import {RxExit} from 'react-icons/rx'
import { NavLink, useLocation } from 'react-router-dom';
import ScoutHeader from '../Header/ScoutHeader';
import { Table } from 'react-bootstrap';
import UseTable from '../Table/UseTable';
import imgRecipient from '../../assets/imgRecipient.png'
import Lottie from 'lottie-react';
import empty from '../../assets/lottie/emptyState.json'
import { LogoutAuth } from '../../Slice/auth/Login';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import football from '../../assets/lottie/92356-football.json'
import { useDispatch, useSelector } from 'react-redux';
import { GetPlayerOfferDetailsApi, PlayerDealsApi } from '../../Slice/Player/PlayerDeal/PlayerDealSlice';
import {reset as resetGetAllPlayerDealSlice} from "../../Slice/Player/PlayerDeal/PlayerDealSlice"
import { UserLogout } from './UserLogOut';
import { ToastContainer } from 'react-toastify';
import { ClockLoader } from "react-spinners";
import ReactPaginate from 'react-paginate';
import { reset as resetLoginSlice } from "../../Slice/auth/Login";
import {reset as resetPlayerDealSlice} from "../../Slice/Player/PlayerDeal/PlayerDealSlice"
import {reset as resetPlayerFanDealSlice} from "../../Slice/Player/PlayerDeal/PlayerFanDealSlice"
import {reset as resetPlayerHomepageSlice} from "../../Slice/Player/PlayerHomePage/GetAllPlayersHomePage"
import {reset as resetManagerSlice} from "../../Slice/Player/PlayerManager/PlayerManagerSlice"
import {reset as resetPaymentSlice} from "../../Slice/Player/PlayerPayment/PaymentSlice"
import {reset as resetViewSlice} from "../../Slice/Player/PlayerView/PlayerViewSlice"
import {reset as resetPlayerProfileSlice} from "../../Slice/Player/Playerprofile/PlayerProfileSlice"
import {reset as resetFanDealSlice} from "../../Slice/Fan/FanDealsApiPage/FanDealSlice"

import {reset as resetFanProfileSlice} from "../../Slice/Fan/ProfileFanSlice/ProfileFanSlice"

import {reset as resetScoutProfileSlice} from "../../Slice/Scout/ProfileScoutSlice/ProfileScoutSlice"

import {reset as resetScoutDealSlice} from "../../Slice/Scout/ScoutDealsApiPage/ScoutDealSlice"

const PlayerViewAllTransactions = () => {

    const dispatch = useDispatch()
    const [DataDisplay, setDataDisplay] = useState([])
    let { state } = useLocation();
    const handleLogout = async () =>{
        await dispatch(LogoutAuth())
        // await dispatch(resetPlayerProfileSlice())
        // await dispatch(resetGetAllPlayerDealSlice())
        // UserLogout()
    await dispatch(resetLoginSlice())
    await dispatch(resetPlayerDealSlice())
    await dispatch(resetPlayerFanDealSlice())
    await dispatch(resetPlayerHomepageSlice())
    await dispatch(resetManagerSlice())
    await dispatch(resetPaymentSlice())
    await dispatch(resetViewSlice())
    await dispatch(resetPlayerProfileSlice())
    await dispatch(resetFanDealSlice())
    await dispatch(resetFanProfileSlice())
    await dispatch(resetScoutProfileSlice())
    await dispatch(resetScoutDealSlice())
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }
    const dataTable = state?.OfferPaymentTrans || state?.AdvertPaymentTrans

    console.log('ofeer passed ', dataTable )
   
    const data = [
        {id: 1, pathTo: '/afrisport/player/profile', pathName: 'Profile'},
        {id: 2, pathTo: '/afrisport/player/deal', pathName: 'Scout Deals'},
        // {id: 3, pathTo: '/afrisport/player/fandeal', pathName: 'Fan Deals'},
        {id: 4, pathTo: '/afrisport/player/managerdeal', pathName: 'Talent Manager Request'},
        {id: 5, pathTo: '/afrisport/player/views', pathName: 'Views'},
        {id: 6, pathTo: '/afrisport/player/payment', pathName: 'Payment'}
    ]

    const header= [
        
      {
          id: 1,
          name: 'Sent by'
      },
      {
          id: 2,
          name: "Date sent"
      },
      {
          id:3,
          name:'Description'
      },
      {
          id:4,
          name:'Amount sent'
      },
      {
        id:5,
        name: 'Payment type'
      }
  ]
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 210,
    p: 4,
  };
  

  //for paginating
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + 5;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = dataTable?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(dataTable?.length / 5);
  console.log('currentItems ',currentItems)
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % dataTable.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  
  const [show, setShow] = useState(false);

  useEffect(()=>{
    const DealSlice = async ()=>{
        setShow(true)
        await dispatch(PlayerDealsApi())
        await dispatch(GetPlayerOfferDetailsApi())
        setShow(false)
    }
    DealSlice()
  },[])

//   const dataTable= [
//     {
//         id: 1,dealname: '5 Season Deal', imgRecip: imgRecipient, recipient: 'David Dada', firstname:'tunde', surname: 'kunle',  email: 'mayana@mail.com', role: "teacher", user_type: "teacher", description: 'jhkjhkjjj jjjjjjjjj jjjjjj jjjjkhk  iuhhiuhiuh uhiuhiyu8gu  ygug'
//     }
// ]



  return (
    <div className="Scoutpage_maxWidthContainer">
    <div  className='Scoutpage_contents'>
        <ToastContainer />
    <div className='Scoutpage_AccountLogout_div'>
        <p className='Scoutpage_AccountWord'>Account</p>
        <p className='Scoutpage_AccountWord' style={{cursor:'pointer'}} onClick={handleLogout}>Logout <RxExit /></p>
    </div>
    <div className='Scoutpage_LinkPages'>
       <p className='font-bold text-2xl'>Transactions</p>
    </div>
        <div className='Scoutpage_DealContent'>
          {dataTable?.length ===0 ? 
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
                <Lottie style={{width: '200px', height:'200px'}} animationData={empty} />
        </div>
        : show ?
        <div className='flex justify-center p-2'>
          <ClockLoader
                                  color="#7F351D"
                                  size={25}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                />
        </div>
        :<>
            <UseTable header={header} data={currentItems} />
            <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakLabel="..."
        pageCount={pageCount}
        pageRangeDisplayed={5}
        pageLinkClassName='page-link'
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeLinkClassName="active"
      />
            </>
        }
        </div>
        {/* <Modal
        open={show}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Lottie style={{width: '200px', height:'200px'}} animationData={football} />
            </Box>
        
      </Modal> */}
        </div>
        </div>
  )
}

export default PlayerViewAllTransactions