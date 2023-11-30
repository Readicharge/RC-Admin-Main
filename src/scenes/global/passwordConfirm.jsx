import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Header from '../../components/Header';

const PasswordModal = ({ open, handleClose, onConfirm }) => {
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsPasswordValid(true); // Reset validation on password change
  };

  const handleConfirm = async () => {
    // Perform password verification logic (replace with your actual logic)
    const isVerified = await verifyPassword(password);

    if (isVerified) {
      onConfirm(); // Invoke the desired function if password is correct
      handleClose(); // Close the modal
    } else {
      setIsPasswordValid(false); // Display error if password is incorrect
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>

      <div style={{ backgroundColor: "#06061E", borderRadius: "14px", padding: "20px", color: "#FFF", alignItems: "center", textAlign: "center", justifyContent: "center", position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -80%)', width: 300, boxShadow: 24, p: 4 }}>
        <Header title="Confirm Action" subtitle="Enter your password to confirm" />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={!isPasswordValid}
          helperText={!isPasswordValid && 'Incorrect password'}
          InputLabelProps={{
            style: {
              color: '#fff',
              
            },
          }}
          InputProps={{
            style: {
              color: '#fff',
              border : 'solid 1px #fff',
            },
          }}
        />
        <Button variant="contained" onClick={handleConfirm} disabled={!password} style={{ backgroundColor: "#96D232", padding: "17px", marginTop: "10px", padding: "4px", width: "180px" }}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};

// Replace this function with your actual password verification logic
const verifyPassword = async (enteredPassword) => {
  // Example: Assume the correct password is 'secret'
  const correctPassword = 'secret';
  return enteredPassword === correctPassword;
};

export default PasswordModal;
