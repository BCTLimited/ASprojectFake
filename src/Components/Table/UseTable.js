import React, { useState } from 'react'
import './UseTable.css'
import {FiEdit} from 'react-icons/fi'
import {MdDelete} from 'react-icons/md'
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetPlayerOfferDetailsApi, PlayerAcceptOfferDetailsApi, PlayerDealsApi, PlayerDeleteOfferDetailsApi } from '../../Slice/Player/PlayerDeal/PlayerDealSlice';
import { CircularProgress } from '@mui/material';
import { PulseLoader } from "react-spinners";

const UseTable = ({header, data, handleShowEdit}) => {

  const [acceptIndex, setAcceptIndex] = useState(null)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const sentData = {}
  const dispatch = useDispatch()
  const userId = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user?.id)
  const handleAcceptOffer = async (id) =>{
    setAcceptIndex(id)
    sentData.offer_id = id
    sentData.user_id = userId
    // console.log('sent data ', sentData)
    await dispatch(PlayerAcceptOfferDetailsApi(sentData))
    await dispatch(PlayerDealsApi())
    setAcceptIndex(null)
  }

  const handleDeleteOffer = async (id) =>{
    setDeleteIndex(id)
    sentData.offer_id = id
    sentData.user_id = userId
    // console.log('sent data ', sentData)
    await dispatch(PlayerDeleteOfferDetailsApi(sentData))
    await dispatch(PlayerDealsApi())
    setDeleteIndex(null)
  }

  return (
    <table  className='AdminUserTable' >
      <thead>
        <tr>
            {header?.map((item, index)=>(
                <th key={index} colSpan={item?.name== "Actions" && 2} className="UseTable_tableheader">{item?.name == "AcceptDeclineOffer" ? "Actions" : item?.name}</th>
            ))}
          {/* <th className="UseTable_tableheader">First Name</th>
          <th className="UseTable_tableheader">Last Name</th>
          <th className="UseTable_tableheader">Username</th> */}
        </tr>
      </thead>
      <tbody>
        {data?.map((each, index)=>{
             return(
             <tr key={index}>
            {header?.map((item)=>{
                switch(item?.name) {
                    case 'Deal name':
                        return (<td  className='useTable_tableDetails'>{each?.offer?.deal?.DealName}</td>);
                    case 'Recipient':
                        return (<td className='useTable_tableDetails'><div style={{display:'flex', alignItems:'center'}}><img src={each?.offer?.player?.profile_pics} className='useTable_ImageRecipient' alt='Recipient image'/>{each?.offer?.player?.firstname} {each?.offer?.player?.surname}</div></td>);
                    case 'Sender':
                          return (<td className='useTable_tableDetails'><div style={{display:'flex', alignItems:'center'}}><img src={each?.offer?.sender?.profile_pics} className='useTable_ImageRecipient' alt='Recipient image'/>{each?.offer?.sender?.firstname} {each?.offer?.sender?.surname}</div></td>);
                    case 'Details':
                        return (<td className='useTable_tableDetails'>{each?.offer?.deal?.about || each?.offer?.deal?.detail}</td>);
                    case 'Amount':
                        return (<td className='useTable_tableDetails'>{each?.offer?.deal?.value}</td>);
                    case 'Payment':
                        return (<td className='useTable_tableDetails'>{each?.offer?.deal?.surname}</td>);
                    case 'Status':
                        return (<td className='useTable_tableDetails'>{each?.offer?.deal?.offerStatus || each?.offer?.deal?.status}</td>);
                    
                    case "AcceptDeclineOffer":
                      return (
                        <td
                          className="useTable_ViewEditSuspendDetails"
                          style={{ flex: 1, width: "200px" }}
                        >
                          {/* <Link className="Admin_playersviewprofile">Edit</Link> */}
                        {each?.offer?.deal?.offerStatus == 'accepted' ? 
                        <button className='AcceptedPlayerUseTable'>Accepted</button>
                        : each?.offer?.deal?.offerStatus == 'rejected' ?
                        <button className='RejectedPlayerUseTable'>Rejected</button> 
                        :<>
                          <button
                            className="Admin_playersviewprofile"
                            onClick={()=> handleAcceptOffer(each?.offer?.deal?.offerId)}
                          >
                            {acceptIndex == each?.offer?.deal?.offerId? 
                            <PulseLoader
                              color="#1D7F33"
                              size={13}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                            : <span>Accept</span>}
                          </button>
                          <button
                            className="Admin_playersSuspendprofile"
                            onClick={()=> handleDeleteOffer(each?.offer?.deal?.offerId)}
                          >
                              {deleteIndex == each?.offer?.deal?.offerId? 
                            <PulseLoader
                              color="#7F351D"
                              size={13}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                            : <span>Decline</span>}
                          </button>
                          </>}
                        </td>
                      );
                      case '':
                          return (<>
                          <td className='useTable_tableDetails'><Link to={`/afrisport/player/dealsmade/${each?.offer?.deal?.offerId}`} style={{color:'white'}} className='useTable_tableDetailsLink'>Details</Link></td>
                          </>);
                      case 'Scout Deals':
                          return (<>
                          <td className='useTable_tableDetails'><Link to={`/afrisport/scout/dealsmade/${each?.offer?.deal?.offerId}`} style={{color:'white'}} className='useTable_tableDetailsLink'>Details</Link></td>
                          </>);
                }
            })}
            
          </tr>
          )
})}
        
      </tbody>
    </table>
  )
}

export default UseTable