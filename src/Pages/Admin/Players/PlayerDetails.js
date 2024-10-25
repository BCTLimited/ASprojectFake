import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Admin_Get_Players_Profile_detailsfun,
  reset_Profile_post_request,
} from "../../../Slice/Admin/AdminUpdate_profileSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { GrFormNext } from "react-icons/gr";
import { BsShareFill } from "react-icons/bs";
import { Skeleton } from "@mui/material";
import { TbCurrencyNaira } from "react-icons/tb";
import ReactPlayer from "react-player";

import { BsFillPatchCheckFill, BsHouseDoor, BsDot } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { RiDashboardLine } from "react-icons/ri";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

function PlayerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    Admin_Get_Players_Profile_details,
    Admin_update_user_image_isSuccess,
  } = useSelector((state) => state.reducer.AdminUpdate_profileSlice);

  console.log({
    Admin_Get_Players_Profile_details,
  });
  let user_Data = Admin_Get_Players_Profile_details?.data;
  let PlayerDetails = user_Data;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Admin_Get_Players_Profile_detailsfun(id));

    dispatch(reset_Profile_post_request());

    return () => {};
  }, [Admin_update_user_image_isSuccess]);

  const [loading, setLoading] = useState(false);

  const handleSuspend_Unsuspend = async (data, id) => {
    let API_URL;
    if (data === "UnSuspend") {
      API_URL = `${baseURL}admin/player/unsuspend`;
    }
    if (data === "suspend") {
      API_URL = `${baseURL}admin/player/suspend`;
    }

    const tokengot = localStorage.getItem("token");

    try {
      // Set the loading state to true before sending the request
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${tokengot}`,
        },
      };

      const response = await axios.post(
        API_URL,
        {
          user_id: id,
        },
        config
      );

      // Reset the loading state to false after receiving the response
      setLoading(false);

      toast.success(`${response.data.message} `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      // Reset the loading state to false in case of an error
      setLoading(false);

      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "Forbidden403",
      });
    }
  };

  // this is for the new

  //   const dispatch = useDispatch()
  //   const [loading, setLoading] = useState(false)

  const VerifiedStatus = useSelector(
    (state) => state.reducer?.PlayerProfileSlice?.VerificationStatusData?.data
  );
  let progress =
    VerifiedStatus?.bio +
    VerifiedStatus?.price +
    VerifiedStatus?.physical_stat +
    VerifiedStatus?.images +
    VerifiedStatus?.videos;

  const userId = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.message?.id
  );

  useEffect(() => {
    const getInfo = async () => {
      setLoading(true);
      // await dispatch(ProfileDetailsPlayer(userId));
      // await dispatch(PlayerProfileVerificationStatus());
      setLoading(false);
    };
    getInfo();
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="AdminDashboard ">
        <div className="AdminPage_Dashboard">
          <div className=" w-[70%] xl:ml-[10%]">
            <div className="ScoutViewProfile_navigation">
              <div className="ScoutViewProfile_navigationprogress">
                <Link
                  to={`/admin/players`}
                  className="ScoutViewProfile_navigationback"
                >
                  Player-list
                </Link>
                <GrFormNext style={{ fontSize: "16px" }} />
                <p className="ScoutViewProfile_navigationprofile">details</p>
              </div>
            </div>

            <div className="ScoutViewProfile_AboutSection bg-white flex justify-between px-5 py-5 rounded-xl w-full">
              {/* <div className="bg-white  "> */}
              <div className="flex gap-2 font-normal items-center">
                <img
                  src={user_Data?.profile_pics}
                  alt=""
                  className="w-[116px] h-[116px] rounded-[100%] shadow-lg block"
                />

                <div>
                  <p className=" f text-3xl font-normal">
                    {user_Data?.firstname} {user_Data?.surname}
                  </p>
                  <p className="f text-lg">Score: 60/100</p>
                  <p className="f text-base mb-3">
                    Currently{" "}
                    {user_Data?.available === "0"
                      ? "Unavailable"
                      : " Available"}{" "}
                  </p>

                  {user_Data?.position.map((item) => {
                    return (
                      <span className="bg-[#F4F4F4] font-normal text-sm py-2 px-2">
                        {item?.position.toUpperCase()},
                      </span>
                    );
                  })}
                  <span className="block  rounded-lg border-2 mt-4 pl-2 py-2 ">
                    Contract:
                    {`  $${user_Data?.price?.minimum}
                    -
                    $${user_Data?.price?.maximum}
                    
                    `}
                    {user_Data?.price?.service_type === "open" ||
                    user_Data?.price?.service_type === "free" ? (
                      <>{user_Data?.price?.service_type} Transfer</>
                    ) : (
                      " "
                    )}
                  </span>
                </div>
              </div>

              <div className="flex">
                <div>
                  <button
                    className="Admin_playersviewprofile"
                    onClick={() => navigate(`/admin/players/profile/${id}`)}
                  >
                    edit
                  </button>
                </div>

                <div>
                  {user_Data?.status === "suspended" && (
                    <button
                      className="Admin_playersSuspendprofile"
                      onClick={() =>
                        handleSuspend_Unsuspend("UnSuspend", user_Data?.id)
                      }
                    >
                      Un-Suspend
                    </button>
                  )}

                  {user_Data?.status === "active" && (
                    <button
                      className="Admin_playersSuspendprofile"
                      onClick={() =>
                        handleSuspend_Unsuspend("suspend", user_Data?.id)
                      }
                    >
                      Suspend
                    </button>
                  )}
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className="ScoutViewProfile_AboutSection bg-white w-full">
              <p className="ScoutViewProfile_AboutTopicText">About</p>
              <div className="ScoutViewProfile_AboutSectionInfo">
                <p className="ScoutViewProfile_AboutSectionIcon">66</p>
                <div className="max-w-full ">
                  <p className="ScoutViewProfile_AboutSectionIconTopic">
                    Biography
                  </p>
                  <p className="ScoutViewProfile_AboutSectionIconText ">
                    {loading == true ? (
                      <Skeleton variant="rounded" width="90%" height={22} />
                    ) : (
                      PlayerDetails?.bio?.about
                    )}
                  </p>
                </div>
              </div>
              <div className="ScoutViewProfile_AboutSectionInfo">
                <p className="ScoutViewProfile_AboutSectionIcon">
                  <MdOutlineDashboard />
                </p>
                <div>
                  <p className="ScoutViewProfile_AboutSectionIconTopic">
                    Current Club
                  </p>
                  <p className="ScoutViewProfile_AboutSectionIconText">
                    {loading == true ? (
                      <Skeleton variant="rounded" width="90%" height={22} />
                    ) : (
                      PlayerDetails?.bio?.current_club
                    )}
                  </p>
                </div>
              </div>
              <div className="ScoutViewProfile_AboutSectionInfo">
                <p className="ScoutViewProfile_AboutSectionIcon">
                  <SlLocationPin />
                </p>
                <div>
                  <p className="ScoutViewProfile_AboutSectionIconTopic">
                    Location
                  </p>
                  <p className="ScoutViewProfile_AboutSectionIconText">
                    {loading == true ? (
                      <Skeleton variant="rounded" width="90%" height={22} />
                    ) : (
                      PlayerDetails?.bio?.location
                    )}
                  </p>
                </div>
              </div>
              <div className="ScoutViewProfile_AboutSectionInfo">
                <p className="ScoutViewProfile_AboutSectionIcon">
                  <BsHouseDoor />
                </p>
                <div>
                  <p className="ScoutViewProfile_AboutSectionIconTopic">
                    Hometown
                  </p>
                  <p className="ScoutViewProfile_AboutSectionIconText">
                    {loading == true ? (
                      <Skeleton variant="rounded" width="90%" height={22} />
                    ) : (
                      PlayerDetails?.bio?.home_town
                    )}
                    .
                  </p>
                </div>
              </div>
              <div className="ScoutViewProfile_AboutSectionInfo">
                <p className="ScoutViewProfile_AboutSectionIcon">
                  <RiDashboardLine />
                </p>
                {/* <div>
                  <p className="ScoutViewProfile_AboutSectionIconTopic">
                    Interest
                  </p>
                  <p className="ScoutViewProfile_AboutSectionIconText">
                    Gamming, Singing.
                  </p>
                </div> */}
              </div>
              <p className="ScoutViewProfile_PhysicalStatsText">
                Physical Stats
              </p>
              <div className="ScoutViewProfile_PhysicalStatsInfo">
                <p className="ScoutViewProfile_PhysicalStatsGender">
                  Gender:{" "}
                  {loading == true ? (
                    <Skeleton variant="rounded" width="90%" height={22} />
                  ) : (
                    PlayerDetails?.physical_stat?.gender
                  )}
                </p>
                <p className="ScoutViewProfile_PhysicalStatsGender">
                  Height:{" "}
                  {loading == true ? (
                    <Skeleton variant="rounded" width="90%" height={22} />
                  ) : (
                    PlayerDetails?.physical_stat?.height
                  )}
                  ft
                </p>
                <p className="ScoutViewProfile_PhysicalStatsGender">
                  Language:{" "}
                  {loading == true ? (
                    <Skeleton variant="rounded" width="90%" height={22} />
                  ) : (
                    PlayerDetails?.physical_stat?.language
                  )}
                </p>
                <p className="ScoutViewProfile_PhysicalStatsGender">
                  Weight:{" "}
                  {loading == true ? (
                    <Skeleton variant="rounded" width="90%" height={22} />
                  ) : (
                    PlayerDetails?.physical_stat?.weight
                  )}
                  kg
                </p>
                <p className="ScoutViewProfile_PhysicalStatsGender">
                  Religion: Christian
                </p>
                <p className="ScoutViewProfile_PhysicalStatsGender">
                  Stronger foot:{" "}
                  {loading == true ? (
                    <Skeleton variant="rounded" width="90%" height={22} />
                  ) : (
                    PlayerDetails?.physical_stat?.strong_foot
                  )}
                </p>
              </div>
            </div>

            {/* <p className="ScoutViewProfile_PhysicalStatsText">
              Images <BsDot style={{ fontSize: "25px" }} />{" "}
              {PlayerDetails?.images.length}{" "}
            </p> */}

            {/* <div className="ScoutViewProfile_ImageSection"></div> */}

            <div className=" bg-white rounded pl-5 flex flex-wrap mb-5 py-5 gap-2  w-[700px] mt-4">
              {PlayerDetails?.images.map((each, index) => (
                <div class="shadow-lg border-2 border-blue-500 rounded-lg  w-[30%]">
                  <img
                    src={each?.image_url}
                    key={index}
                    className="h-[200px] w-full"
                  />
                </div>
              ))}
            </div>

            {/* <div className=" bg-white rounded pl-5 flex flex-wrap mb-5 py-5 gap-2  w-[700px] mt-4">
              {PlayerDetails?.videos.map((each, index) => (
                <li className=" cursor-pointer">
                  <a
                    href={each?.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    click to view video {index}
                  </a>
                </li>
              ))}
            </div> */}

            <div className="ScoutViewProfile_VideoSection">
              {PlayerDetails?.videos?.map((each, index) => (
                <div key={index} className="ScoutViewProfile_VideoDiv">
                  <ReactPlayer
                    width="300px"
                    height="300px"
                    controls
                    url={each?.video_url}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerDetails;
