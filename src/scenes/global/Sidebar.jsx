import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Image } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';


import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const fixed_username = 'Brian@readicharge.com';

const Item = ({ title, to, icon, selected, setSelected, isLoggedIn, username, enabled }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSectionEnabled = () => {
    if (!isLoggedIn) {
      return false;
    }

    if (username === fixed_username) {
      return true; // Enable all sections for the fixed username
    }


    const lowercaseTitle = title.toLowerCase();
    console.log(enabled.some((role) => lowercaseTitle.includes(role.toLowerCase())))
    // Enable the section if any role from the roles list is present in the lowercase title
    return enabled.some((role) => lowercaseTitle.includes(role.toLowerCase()));
  };


  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[200],
        width: "200px",
        backgroundColor: selected === title ? "#96D232" : "inherit",
        borderRadius: selected === title ? "23px" : 0,
        pointerEvents: isSectionEnabled() ? "auto" : "none",
        opacity: isSectionEnabled() ? 1 : 0.5,

      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography
        style={{
          fontSize: "16px",
        }}>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ username, isLoggedIn, enabledSections }) => {
  console.log(enabledSections)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#06061E !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#D2FF00 !important",
        },
        "& .pro-menu-item.active": {
          color: "#0B0E37 !important",
          fontWeight: "bold",
        },
      }}
      style={{
        position: "sticky",

      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "-15px 0 40px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                ml="7px"
              >
                <img
                  alt="profile-user"
                  width="200px"
                  height="200px"
                  src={`./images/logo.png`}
                  style={{ cursor: "pointer", position: "fixed", zIndex: 100, backgroundColor: "#06061E" }}
                />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>



          <Box paddingLeft={isCollapsed ? undefined : "10%"} height="110vh"
            style={{
              borderRight: '1px solid transparent',
              backgroundImage: 'linear-gradient(to bottom, rgba(0, 128, 0, 0), rgba(16, 50, 87, 0.8))',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              animation: 'glitter 2s infinite linear',
              animationName: 'glitter',
              animationDuration: '2s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',


            }}
          >
            <Item
              title="Dashboard"
              to="/"
              icon={<ViewQuiltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />

            <Typography
              variant="h6"
              color="#fff"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            {/* <Item
              title="Installers"
              to="/installer"
              icon={<PermIdentityOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            /> */}
            {/* <Item
              title="Customers"
              to="/customer"
              icon={<PermIdentityOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            /> */}
            <Item
              title="Admins"
              to="admin-list"
              icon={<SupervisorAccountOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />

            {/* <Item
              title="Job Tickets"
              to="/jobs"
              selected={selected}
              icon={<BusinessOutlinedIcon />}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            /> */}

            <Typography
              variant="h6"
              color="#fff"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Create New
            </Typography>
            {/* <Item
              title="Installer"
              to="/installerForm"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Customer"
              to="/customerForm"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            /> */}
            {/* <Item
              title="Job Ticket"
              to="/bookingForm"
              icon={<NoteAddOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            /> */}
            <Item
              title="Admin Users"
              to="/admin"
              icon={<AdminPanelSettingsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />

            <Typography
              variant="h6"
              color="#fff"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Others
            </Typography>

            <Item
              title="Service Time"
              to="/serviceTime"
              icon={<AccessTimeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Price"
              to="/servicePrice"
              icon={<MonetizationOnOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Materials"
              to="/material"
              icon={<PostAddOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Labor Rate"
              to="/labourRate"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />

          </Box>
        </Menu>
        {!isCollapsed && (
          <Box mb="25px" style={{
            position: "fixed",
            padding: 18, bottom: -20, left: 10,
            borderTopRightRadius: "14px",
            borderTopLeftRadius: "14px",
            backgroundColor: "#EBEBEF", color: "#EBEBEF"
          }}>
            <Box textAlign="center">
              <Typography
                variant="h4"
                color="#06061E"
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                {username}
              </Typography>
              {username === fixed_username ? (
                <Typography variant="h5" color="#06061E">
                  Super Admin
                </Typography>
              ) : (
                <Typography variant="h5" color="#06061E">
                  Sub Admin
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </ProSidebar>

    </Box>
  );
};

export default Sidebar;
