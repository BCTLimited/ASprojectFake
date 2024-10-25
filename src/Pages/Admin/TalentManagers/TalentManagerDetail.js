import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { GrFormNext } from "react-icons/gr";
import { BsShareFill } from "react-icons/bs";
import { Skeleton } from "@mui/material";

import { FiMail, FiPhoneCall } from "react-icons/fi";
import TalentManagerNegotiateStep from "./TalentManagerNegotiateStep";
import {
  Admin_talent_get_negotiations_fun,
  Admin_talent_manager_single_fun,
} from "../../../Slice/Admin/AdminTalentMangerSlice";

let baseURL = process.env.REACT_APP_AFRISPORTURL;

function TalentManagerDetail() {
  const { id } = useParams();

  const { Admin_talent_manager_single } = useSelector(
    (state) => state.reducer.AdminTalentMangerSlice
  );

  console.log({
    Admin_talent_manager_single,
  });
  let user_Data = Admin_talent_manager_single?.data;
  let PlayerDetails = user_Data;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Admin_talent_manager_single_fun(id));
    dispatch(Admin_talent_get_negotiations_fun(id));
    return () => {};
  }, []);

  const [loading, setLoading] = useState(false);

  const handleSuspend_Unsuspend = async (data, id) => {
    let API_URL;
    if (data === "UnSuspend") {
      API_URL = `${baseURL}admin/talent-manager/unsuspend`;
    }
    if (data === "suspend") {
      API_URL = `${baseURL}admin/talent-manager/suspend`;
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

  const [setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="AdminDashboard">
        <div className="AdminPage_Dashboard">
          <div>
            <div className="ScoutViewProfile_navigation">
              <div className="ScoutViewProfile_navigationprogress">
                <Link
                  to={`/admin/talentManager`}
                  className="ScoutViewProfile_navigationback"
                >
                  Back
                </Link>
                <GrFormNext style={{ fontSize: "16px" }} />
                <p className="ScoutViewProfile_navigationprofile">Profile</p>
              </div>
              <Link className="ScoutViewProfile_share">
                {" "}
                <BsShareFill style={{ color: "rgba(150, 150, 150, 1)" }} />{" "}
                <span
                  style={{
                    color: "rgba(150, 150, 150, 1)",
                    marginLeft: "10px",
                  }}
                >
                  Share
                </span>
              </Link>
            </div>

            <div className="  mt-1 border border-[#D0D4D9]  flex justify-between px-5 py-5 rounded-xl items-center">
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

                  <span className=" font-normal text-sm py-2 px-5">
                    {/* {user_Data?.bio?.position.toUpperCase()} */}
                    Talent manager
                  </span>
                </div>
              </div>

              <div className="flex">
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
                <div>
                  <button
                    className="Admin_playersviewprofile"
                    // onClick={() => navigate(`/admin/players/profile/19`)}
                  >
                    message
                  </button>
                </div>
              </div>
              {/* </div> */}
            </div>

            <div className=" bg-white  mt-1 border border-[#D0D4D9] px-8 py-4 rounded-xl">
              <p className="ScoutViewProfile_AboutTopicText">About</p>
              <div className="ScoutViewProfile_AboutSectionInfo">
                <p className="ScoutViewProfile_AboutSectionIcon">
                  <FiMail />
                </p>
                <div>
                  <p className="ScoutViewProfile_AboutSectionIconTopic">
                    <span className="block"> Email</span>
                    <span> {user_Data?.email}</span>
                  </p>
                  <p className="ScoutViewProfile_AboutSectionIconText">
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
                  <FiPhoneCall />
                </p>
                <div>
                  <p className="ScoutViewProfile_AboutSectionIconTopic">
                    <span className="block"> Phone</span>
                    <span> {user_Data?.phone}</span>
                  </p>
                  <p className="ScoutViewProfile_AboutSectionIconText"></p>
                </div>
              </div>
            </div>

            <div className="ScoutViewProfile_PhysicalStatsText">
              <div className="flex flex-wrap gap-3">
                {PlayerDetails?.videos.map((each, index) => (
                  <>
                    <a
                      href={each?.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {each?.video_url}
                    </a>
                  </>
                ))}
              </div>
            </div>
          </div>

          <TalentManagerNegotiateStep />
        </div>
      </div>
    </>
  );
}

export default TalentManagerDetail;
