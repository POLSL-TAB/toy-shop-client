import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

function SimpleMenu({text}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseOver={handleClick}
        style={{fontWeight:"bold"}}
      >
        {text}
      </Button>
      <Menu
      style={{marginTop: "50px"}}
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        <MenuItem style={{background: "white"}} onClick={handleClose}><Link to="/zamowienia" style={{textDecoration: "none", color: "black", width: "100%", height: "100%"}}>MOJE ZAMÓWIENIA</Link></MenuItem>
      </Menu>
    </div>
  );
}

export default SimpleMenu;