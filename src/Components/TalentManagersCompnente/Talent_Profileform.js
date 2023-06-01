import React, { useEffect, useState } from "react";
import "../Scout/profileform.css";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  ProfileDetailsScout,
  ScoutProfileProfileformApi,
  ScoutProfileVerificationStatus,
} from "../../Slice/Scout/ProfileScoutSlice/ProfileScoutSlice";
import {
  ProfileDetailsfan,
  fanProfileProfileformApi,
  fanProfileVerificationStatus,
} from "../../Slice/Fan/ProfileFanSlice/ProfileFanSlice";

const Talent_Profileform = ({ userId }) => {
  const PlayerDetails = useSelector(
    (state) => state?.reducer?.FanProfileSlice?.fanAllProfileDetailsData?.data
  );
  // console.log(PlayerDetails)

  const [profileInfo, setProfileInfo] = useState({});
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [current_club, setCurrentClub] = useState("");
  const [available, setAvailable] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [home_town, setHomeTown] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");

  const UserProfileLogin = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.data?.user
  );
  useEffect(() => {
    setFullname(`${UserProfileLogin?.firstname} ${UserProfileLogin?.surname}`);
    setPhone(UserProfileLogin?.phone);
  }, []);
  useEffect(() => {
    if (PlayerDetails) {
      setCurrentClub(PlayerDetails?.bio?.current_club);
      setAvailable(PlayerDetails?.bio?.available);
      setAge(PlayerDetails?.bio?.age);
      setAbout(PlayerDetails?.bio?.about);
      setLocation(PlayerDetails?.bio?.location);
      setHomeTown(PlayerDetails?.bio?.home_town);
      setFullname(`${PlayerDetails?.firstname} ${PlayerDetails?.surname}`);
      setPhone(PlayerDetails?.phone);
    }
  }, [PlayerDetails]);

  const dispatch = useDispatch();
  const [loadProfileform, setLoadProfileform] = useState(false);
  const handleProfileform = (e) => {
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };
  const userDataLogin = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.data?.user
  );

  const handleSubmitProfileform = async (event) => {
    event.preventDefault();
    profileInfo.user_id = userId;
    profileInfo.current_club = current_club;
    profileInfo.location = location;
    profileInfo.home_town = home_town;
    profileInfo.fullname = fullname;
    profileInfo.user_type = "scout";
    profileInfo.phone = phone;
    profileInfo.age = age;
    setLoadProfileform(true);
    // console.log('profile info submitted ', profileInfo)
    await dispatch(fanProfileProfileformApi(profileInfo));
    await dispatch(ProfileDetailsfan());
    await dispatch(fanProfileVerificationStatus(userId));
    setLoadProfileform(false);
  };
  const available_form = 1;
  const notavailable_form = 0;
  const handleCurrentClubClick = (e) => {
    setCurrentClub(e.target.value);
  };
  const handleAvailableClick = (e) => {
    setAvailable(e.target.value);
  };
  const handleAboutClick = (e) => {
    setAbout(e.target.value);
  };
  const handleLocationClick = (e) => {
    setLocation(e.target.value);
  };
  const handleHometownClick = (e) => {
    setHomeTown(e.target.value);
  };
  const handleFullnameClick = (e) => {
    setFullname(e.target.value);
  };
  const handlePhoneClick = (e) => {
    setPhone(e.target.value);
  };
  const handleAgeClick = (e) => {
    setAge(e.target.value);
  };
  const handlePositionClick = (e) => {
    setPosition(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmitProfileform}
      className="Scoutpage_ProfileforContent"
    >
      <p className="Scoutpage_Profile_Profiledetailstext">Profile Details</p>
      <p className="Scoutpage_Profile_filldetailstext">
        Fill in the following details
      </p>
      <p className="Scoutpage_Profile_Profileformlabeltext">Full Name</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={fullname}
        onChange={handleFullnameClick}
        placeholder="first name and last name"
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">
        Email Address
      </p>
      <input
        type="email"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={userDataLogin?.email}
        placeholder="abc@mail.com"
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Phone Number</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={phone}
        onChange={handlePhoneClick}
        placeholder="08000000000000"
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Location</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={location}
        name="location"
        onChange={handleLocationClick}
        placeholder="Country of Residence"
        required
      />
      <p className="Scoutpage_Profile_Profileformlabelnexttext">Home Town</p>
      <input
        type="text"
        className="Scoutpage_Profile_ProfileformlabelInput"
        value={home_town}
        name="home_town"
        onChange={handleHometownClick}
        placeholder="---"
        required
      />

      <button type="submit" className="Scoutpage_Profileform_savebutton">
        {loadProfileform ? <CircularProgress size={15} /> : <span>Save</span>}
      </button>
    </form>
  );
};

export default Talent_Profileform;
