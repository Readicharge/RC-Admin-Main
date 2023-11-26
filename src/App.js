import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import DashboardComponent from "./scenes/dashboard";
import InstallerList from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import InstallerForm from "./scenes/installer/InstallerForm";
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import InstallerLabourRates from "./scenes/labourRates";
import MaterialTaxForm from "./scenes/materialTax";
import Material from "./scenes/material";
import Service from "./scenes/service";
import ServiceTime from "./scenes/service/ServiceTime";
import ServicePrice from "./scenes/service/servicePrice";
import CreateBookingForm from "./scenes/bookings";
import CustomerForm from "./scenes/customer";
import AdminForm from "./scenes/admin";
import LoginScreen from "./scenes/login";
import AdminList from "./scenes/admin/AdminList";
import NotAllowed from "./scenes/dashboard/NotAllowed";
import UnderProgress from "./scenes/dashboard/Progress";
import ResidenceForm from "./scenes/bookings_01/form_page_1";
import NumberOfChargersForm from "./scenes/bookings_01/form_page_2";
import ChargerDetails1Form from "./scenes/bookings_01/form_page_3";
import ChargingStationForm from "./scenes/bookings_01/form_page_4";
import CustomerList from "./scenes/customer/customerList";

const fixedUserName = "Brian@readicharge.com"
 function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [roles,setRoles] = useState([]);
   const handleLogin = (isValid) => {
    if (isValid) {
      setIsLoggedIn(true);
    }
  };
   const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    return <Navigate to="/login" />;
  };
   return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{
          backgroundColor:"#06061E",
      
        }}>
          {isLoggedIn ? (
            <>
              <Sidebar isSidebar={isSidebar} username={userName} isLoggedIn={isLoggedIn} enabledSections={roles} />
              <main className="content" style={{   
          overflow:"scroll"}}>
                <Topbar setIsSidebar={setIsSidebar} handleLogout={handleLogout} />
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/under-progress" element={<UnderProgress/>} />
                  <Route path="/dashboard" element={<DashboardComponent />} />
                  <Route path="/installer" element={<InstallerList/>} />
                  <Route path="/customer" element={<CustomerList/>} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/jobs" element={<Invoices admin={userName} />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/installerForm" element={<InstallerForm changedBy={userName}/>} />
                  <Route path="/labourRate" element={userName===fixedUserName ?<InstallerLabourRates />:<NotAllowed handleLogout={handleLogout}/>} />
                  <Route path="/materialTax" element={userName===fixedUserName ?<MaterialTaxForm />:<NotAllowed handleLogout={handleLogout}/>} />
                  <Route path="/material" element={userName===fixedUserName ?<Material />:<NotAllowed handleLogout={handleLogout}/>} />
                  <Route path="/service" element={userName===fixedUserName ?<Service />:<NotAllowed handleLogout={handleLogout}/>} />
                  <Route path="/serviceTime" element={userName===fixedUserName ?<ServiceTime />:<NotAllowed handleLogout={handleLogout}/>} />
                  <Route path="/servicePrice" element={userName===fixedUserName ?<ServicePrice />:<NotAllowed handleLogout={handleLogout}/>} />
                  <Route path="/bookingForm" element={<CreateBookingForm  admin={userName}/>} />
                  <Route path="/t1" element={<ResidenceForm/>}/>
                  <Route path="/t2" element={<NumberOfChargersForm/>}/>
                  <Route path="/t3" element={<ChargerDetails1Form/>}/>
                  <Route path="/t4" element={<ChargingStationForm/>}/>
                  <Route path="/customerForm" element={<CustomerForm />} />
                  <Route path="/admin" element={userName===fixedUserName ?<AdminForm />:<NotAllowed handleLogout={handleLogout}/>} />
                  <Route path="/admin-list" element={userName===fixedUserName ?<AdminList />:<NotAllowed handleLogout={handleLogout}/>} />

                </Routes>
              </main>
            </>
          ) : (
            <LoginScreen onLogin={handleLogin} setUserName={setUserName}  setRoles={setRoles}/>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
 export default App;
