import React, { useEffect, useState } from "react";
import "../AdminNegotiate/AdminNegotiate.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import AdminUseTable from "../../Table/AdminUseTable";
import Lottie from "lottie-react";
import empty from "../../../assets/lottie/emptyState.json";
import imgRecipient from "../../../assets/imgRecipient.png";
import ChatCircle from "../../../assets/ChatsCircle.png";
import {
  Admin_Get_ALLPlayers_fun,
  Admin_Get_All_Review_Player_fun,
} from "../../../Slice/Admin/AdminUpdate_profileSlice";
import { useDispatch, useSelector } from "react-redux";

const AdminPlayersReview = ({
  handleAllNegotiate,
  handleSuspended,
  handleClosed,
  handleTerminated,
}) => {
  const { Admin_Get_All_Review_Player } = useSelector(
    (state) => state.reducer.AdminUpdate_profileSlice
  );

  const dispatch = useDispatch();

  const header = [
    {
      id: 1,
      name: "Player Name",
    },
    {
      id: 2,
      name: "Position",
    },
    {
      id: 3,
      name: "Nationality",
    },
    {
      id: 4,
      name: "Images",
    },
    {
      id: 5,
      name: "Video",
    },
    {
      id: 6,
      name: "  ",
      case: "Admin_All_player_ViewDetail",
    },
  ];

  useEffect(() => {
    dispatch(Admin_Get_All_Review_Player_fun());
    return () => {};
  }, []);

  const [searchInput, setSearchInput] = useState("");

  const filteredArray = Admin_Get_All_Review_Player?.plus?.filter(
    (user) =>
      user.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.surname.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="AdminPage_NegotiateTab">
      <div className="AdminPage_NegotiateTabTitle">
        <p
          className="AdminPAge_Negotiate_TabNegotiateInactive"
          onClick={handleAllNegotiate}
        >
          All Players
        </p>
        <p
          className="AdminPAge_Negotiate_TabNegotiateActive"
          onClick={handleClosed}
        >
          Review
          <span className="AdminPage_NegotiateTab_TabNumber">
            {filteredArray?.length}
          </span>
        </p>
        <p
          className="AdminPAge_Negotiate_TabNegotiateInactive"
          onClick={handleSuspended}
        >
          Suspended
        </p>
      </div>
      <div className="AdminPage_TableTitleandLink">
        <p className="AdminPage_NegotiateTitleText">Review</p>
        <div className="AdminDashboard_Search">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            className="AdminDashboard_SearchInput"
            placeholder="Search name"
          />

          <RiSearchLine className="AdminDashboard_SearchIcon" />
        </div>
      </div>
      <div className="AdminPage_TableInfo">
        <AiOutlineInfoCircle style={{ fontSize: "18px" }} />
        <span className="AdminPage_TableInfoText">
          This is a table of recent communication on the platform
        </span>
      </div>
      <div className="AdminTable_NegotiateTable">
        {filteredArray?.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Lottie
              style={{ width: "200px", height: "200px" }}
              animationData={empty}
            />
          </div>
        ) : (
          <AdminUseTable header={header} data={filteredArray} />
        )}
      </div>
    </div>
  );
};

export default AdminPlayersReview;
