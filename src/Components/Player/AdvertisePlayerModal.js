import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import './MakeARequest.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { OfferPlayApi } from '../../Slice/Player/PlayerView/PlayerViewSlice';
import { ToastContainer } from 'react-toastify';
import {TbCurrencyNaira} from 'react-icons/tb'
import {BsFillPatchCheckFill, BsHouseDoor, BsDot} from 'react-icons/bs'
import { PlayerProfileAdvertiseApi } from '../../Slice/Player/Playerprofile/PlayerProfileSlice';
import { CircularProgress } from '@mui/material';




const AdvertisePlayerModal = ({show, progress, hideAdvertiseProfile, positionPlayed}) => {

    const [payValue, setPayValue] = useState('')
    const { id } = useParams();
    const [data, setData] = useState({})
    const [change, setChange] = useState(false)
    const PlayerDetails = useSelector((state)=>state?.reducer?.PlayerProfileSlice?.AllProfileDetailsData?.data)
    const userId = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user?.id)
    const userType = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user_type)
    const [loadingOffer, setLoadingOffer] = useState(false)
    const dispatch = useDispatch()
    const AdvertValue = 100


    const handleChangePayValue =(e) =>{
      setPayValue(e.target.value)
    }
    const handleOfferChange = (e) => {
      setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmitOffer = async (e) =>{
      e.preventDefault()
      data.player_id = userId;
      // data.amount = AdvertValue
      const start = new Date(data.start_date);
    const end = new Date(data.end_date);
    const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    const timeDifference = Math.abs(end - start);
    const weeks = Math.ceil(timeDifference / millisecondsPerWeek);
      if(weeks/4 < 1){
        data.value = AdvertValue
      }
      else {
        const weeksData = weeks/4 
        console.log(weeksData)
        if(weeksData%4 == 0){
          data.value = AdvertValue * Math.floor(weeksData)
        }
        else if (weeksData % 4 != 0){
          data.value = AdvertValue * Math.floor(weeksData) + AdvertValue
        }
      }
      setLoadingOffer(true)
      await dispatch(PlayerProfileAdvertiseApi(data))
      setLoadingOffer(false)
      // console.log('data ', data)
    }
    

  return (
    <Modal
    open={show}
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className='HomePage_ViewProfileModal'>
      <ToastContainer />
      <form onSubmit={handleSubmitOffer} className='AdvertisePlayer_ModalView'>
       
       <div style={{margin:'15px 25px', padding: '1rem'}}>
        <p className='text-xl font-bold mb-2'>Advertise Profile</p>
        <p className='text-[14px] w-[75%]'>Make your profile more visible to scout and fans coming to the platform</p>
        <div className='mt-[20px] flex justify-between'>
            <div className='flex'>
            <img src={PlayerDetails?.profile_pics} alt='image placeholder' className='AdvertisewProfile_UserProfileImage' />
            <div>
            <p className='AdvertiseProfile_UserProfiledetailsUsername'><span style={{display:'flex', alignItems:'center'}}>{PlayerDetails?.firstname} {PlayerDetails?.surname} <BsFillPatchCheckFill style={{fontSize:'22px', color:'#0F7BEF', marginLeft:'10px'}} /></span></p>
            <p className='text-[14px] w-[75%]'>Score: {progress}/100</p>
            </div>
            </div>
            <div>
            <p className='ScoutViewProfile_UserProfilePosition'>{positionPlayed}</p>
            <p className='ScoutViewProfile_UserProfilePricerange'>Contract: <span style={{display:'flex', alignItems:'center'}}><TbCurrencyNaira style={{fontSize:"18px"}} />{PlayerDetails?.price?.minimum} - {PlayerDetails?.price?.maximum}</span></p>
            </div>
        </div>
        <p className=' mt-[15px]'><span className='font-bold'>Amount:</span> ${AdvertValue}</p>
        <div className='flex justify-between'>
            <div>
            <p className='font-bold mt-[10px]'>Start Date</p>
            <input type='date' name='start_date' onChange={handleOfferChange} className='w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
            <div>
            <p className='font-bold mt-[10px]'>End Date</p>
            <input type='date' name='end_date' onChange={handleOfferChange} className='w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
        </div>
        <div className='flex justify-between'>
            <div>
            <p className='font-bold mt-[10px]'>Card Number</p>
            <input type='text' name='card' onChange={handleOfferChange} className='w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
            <div>
            <p className='font-bold mt-[10px]'>CVV</p>
            <input type='text' name='cvv' maxLength={3} onChange={handleOfferChange} className='w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
        </div>
        <div className='flex justify-between'>
            <div>
            <p className='font-bold mt-[10px]'>Month</p>
            <input type='text' maxLength={2} name='month' onChange={handleOfferChange} className='w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
            <div>
            <p className='font-bold mt-[10px]'>Year</p>
            <input type='text' name='year' maxLength={2} onChange={handleOfferChange} className='w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
        </div>

        <div className='flex justify-end mt-[20px]'>
            <button className='font-bold py-1.5 px-2.5 mr-3' onClick={hideAdvertiseProfile}>Cancel</button>
            <button className='text-white p-1.5 rounded bg-black'>
            {loadingOffer? <CircularProgress size={15} /> : <span>Payment</span>}
                </button>
        </div>
       </div>
       </form>
    </div>
    
  </Modal>
  )
}

export default AdvertisePlayerModal