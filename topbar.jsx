import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link, useHistory} from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [searchResults,setSearchResults] = useState([])
  const [searchInput,setSearchInput] = useState('')
  
  useEffect(() => {
    const getallusers = async () => {
      try {
        const getalluser = await axios.get(`/users/allusers?username=${searchInput}`);
        setSearchResults(getalluser.data);
      } catch (err) {
        console.log(err);
      }
    };
    getallusers();
  }, [searchInput]);

  
  const history = useHistory()
  
  function handleLogout(){
    localStorage.clear();
    history.push('/register');
    window.location.reload(true)
    }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Vuecom</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput" onChange = {(e)=>setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      <Button
      variant = "contained"
      size = "small"
      onClick={handleLogout}
      startIcon = {<LogoutIcon />}>LOGOUT</Button>
    </div>
  );
}
