import { Box, IconButton, Link, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { Navigate } from "react-router-dom";
import { LogoutOutlined } from "@mui/icons-material";
 const Topbar = ({ handleLogout }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
   return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      ></Box>
      {/* ICONS */}
      <Box display="flex" style={{marginRight:"9px"}}>
     
        <IconButton style={{
          color:"red",
          width:"30px",
          height:"30px",
          width:"110px",
          border:"1px solid red",
          borderRadius:"14px",
          
          alignContent:"space-between",
          justifyContent:"space-between"
        }} onClick={handleLogout}>
          Logout 
          <LogoutOutlined/>
        </IconButton>
      </Box>
    </Box>
  );
};
 export default Topbar;