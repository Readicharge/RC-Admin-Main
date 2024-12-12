import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const fixed_username = 'Brian@readicharge.com';

const Item = ({ title, to, icon, selected, setSelected, isLoggedIn, username, enabled }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSectionEnabled = () => {
    if (!isLoggedIn) return false;
    if (username === fixed_username) return true;
    const lowercaseTitle = title.toLowerCase();
    return enabled.some((role) => lowercaseTitle.includes(role.toLowerCase()));
  };

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        backgroundColor: selected === title ? "#96D232" : "transparent",
        borderRadius: "8px",
        margin: "5px 10px",
        pointerEvents: isSectionEnabled() ? "auto" : "none",
        opacity: isSectionEnabled() ? 1 : 0.5,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography style={{ fontSize: "14px", fontWeight: selected === title ? "bold" : "normal" }}>
        {title}
      </Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ username, isLoggedIn, enabledSections }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#06061E !important`,
          boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          transition: "all 0.2s ease-in-out",
        },
        "& .pro-inner-item:hover": {
          color: "#D2FF00 !important",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        },
        "& .pro-menu-item.active": {
          color: "#0B0E37 !important",
          fontWeight: "bold",
        },
      }}
      style={{
        position: "sticky",
        height: "100vh",
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img
                  alt="ReadiCharge logo"
                  width="140px"
                  src={`./images/logo.png`}
                  style={{ cursor: "pointer" }}
                />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <KeyboardArrowLeftIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {isCollapsed && (
            <Box display="flex" justifyContent="center" alignItems="center" mb="25px">
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
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
              color="rgba(255, 255, 255, 0.6)"
              sx={{ m: "15px 0 5px 20px", fontSize: "12px", fontWeight: "bold" }}
            >
              Data
            </Typography>
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

            <Typography
              variant="h6"
              color="rgba(255, 255, 255, 0.6)"
              sx={{ m: "15px 0 5px 20px", fontSize: "12px", fontWeight: "bold" }}
            >
              Create New
            </Typography>
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
              color="rgba(255, 255, 255, 0.6)"
              sx={{ m: "15px 0 5px 20px", fontSize: "12px", fontWeight: "bold" }}
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

        <Box
          style={{
            padding: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            borderTopRightRadius: "17px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            marginTop: "auto",
          }}
        >
          <Box
            display="flex"
            justifyContent={isCollapsed ? "center" : "flex-start"}
            alignItems="center"
          >
            <Avatar
              src="/path-to-avatar-image.jpg"
              alt={username}
              style={{
                width: 40,
                height: 40,
                marginRight: isCollapsed ? 0 : 12,
              }}
            />
            {!isCollapsed && (
              <Box>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {username}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "12px",
                  }}
                >
                  {username === fixed_username ? "Super Admin" : "Sub Admin"}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

