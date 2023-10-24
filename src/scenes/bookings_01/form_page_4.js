import React, { useState } from "react";

const ChargingStationForm = () => {
  const [question, setQuestion] = useState(1);
  const [existingOutlet, setExistingOutlet] = useState("");
  const [outletType, setOutletType] = useState("");
  const [upgradeOutlet, setUpgradeOutlet] = useState("");
  const [installationType, setInstallationType] = useState("");
  const [hardwiredType, setHardwiredType] = useState("");
  const [installationLocation, setInstallationLocation] = useState("");
  const [attachedToHome, setAttachedToHome] = useState("");
  const [hasElectricalPanel, setHasElectricalPanel] = useState("");
  // Add more state variables for other questions as needed

  const handleNext = () => {
    setQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleBack = () => {
    setQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleSubmit = () => {
    // Add logic to submit the form data
    // You can use the state variables to gather all the user responses
  };

  return (
    <div>
      {question === 1 && (
        <div>
          <p>Do you have an existing high voltage (240v) outlet you would like to use?</p>
          <button onClick={() => setExistingOutlet("Yes")}>Yes</button>
          <button onClick={() => setExistingOutlet("No")}>No</button>
          <br />
          {existingOutlet === "Yes" && (
            <button onClick={handleNext}>Next</button>
          )}
          {existingOutlet === "No" && (
            <button onClick={handleNext}>Next</button>
          )}
        </div>
      )}

      {question === 2 && existingOutlet === "Yes" && (
        <div>
          <p>If yes, what type of high voltage outlet is installed?</p>
          <button onClick={() => setOutletType("NEMA 14-50")}>NEMA 14-50</button>
          <button onClick={() => setOutletType("NEMA 10-30")}>NEMA 10-30</button>
          <button onClick={() => setOutletType("NEMA 6-50")}>NEMA 6-50</button>
          <button onClick={() => setOutletType("NEMA 6-30")}>NEMA 6-30</button>
          <button onClick={() => setOutletType("NEMA 6-20")}>NEMA 6-20</button>
          <br />
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {question === 2 && existingOutlet === "No" && (
        <div>
          <p>
            No further action required. ReadiCharge does not offer NEMA 6-20 / 6-30 / 6-50 / 10-30 chargers at this time.
            If you still want to contact an installer, click here to see a list of referrals.
          </p>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {question === 2 && outletType === "NEMA 14-50" && (
        <div>
          {/* Proceed to the checkpoint to purchase a charger */}
        </div>
      )}

      {question === 2 && outletType !== "NEMA 14-50" && (
        <div>
          <p>
            The NEMA 14-50 is the most common and provides the fastest plug-and-play charging capabilities.
            Your outlet and charger should optimize your vehicle's charging efficiency.
            If you have already purchased a hardwired charger, but currently have a NEMA 14-50 outlet in your desired installation location,
            we recommend you purchase a NEMA 14-50 charger to make use of your existing outlet and avoid the cost of a hardwired installation.
          </p>
          <button onClick={() => setUpgradeOutlet("Yes")}>Yes</button>
          <button onClick={() => setUpgradeOutlet("No")}>No</button>
          <br />
          {upgradeOutlet === "Yes" && (
            <button onClick={handleNext}>Next</button>
          )}
          {upgradeOutlet === "No" && (
            <div>
              <p>
                Your charger and outlet may not be compatible. In order to move forward with a ReadiCharge installation project,
                you need to upgrade your outlet to a NEMA 14-50 or hardwired installation and purchase a compatible charger.
              </p>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          )}
        </div>
      )}

      {question === 3 && (
        <div>
          <p>What is your installation type preference?</p>
          <button onClick={() => setInstallationType("Hardwired")}>Hardwired</button>
          <button onClick={() => setInstallationType("NEMA 14-50 Outlet")}>NEMA 14-50 Outlet</button>
          <br />
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {question === 3 && installationType === "Hardwired" && (
        <div>
          <p>What type of hardwired charger do you want installed?</p>
          <button onClick={() => setHardwiredType("50A - 12kw")}>50A - 12kw</button>
          <button onClick={() => setHardwiredType("80A - 19.2kw")}>80A - 19.2kw</button>
          <br />
          {hardwiredType === "80A - 19.2kw" && (
            <p>
              ReadiCharge does not currently offer 80A - 19.2kw EV chargers for sale.
              You will need to purchase an 80A - 19.2kw EV charger outside of ReadiCharge before scheduling your installation.
            </p>
          )}
          <button onClick={handleBack}>Back</button>
          {hardwiredType !== "80A - 19.2kw" && (
            <button onClick={handleNext}>Next</button>
          )}
          {hardwiredType !== "80A - 19.2kw" && (
            <div>
              <p>
                ReadiCharge does not currently offer 80A - 19.2kw EV chargers for sale.
                You will need to purchase an 80A - 19.2kw EV charger outside of ReadiCharge before scheduling your installation.
              </p>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          )}
        </div>
      )}

      {question === 4 && (
        <div>
          <p>Where do you want your charger installed?</p>
          <button onClick={() => setInstallationLocation("Inside garage/carport")}>Inside garage/carport</button>
          <button onClick={() => setInstallationLocation("Inside pole barn or out-building")}>Inside pole barn or out-building</button>
          <button onClick={() => setInstallationLocation("Outside wall of home")}>Outside wall of home</button>
          <button onClick={() => setInstallationLocation("Outside wall of garage/carport")}>Outside wall of garage/carport</button>
          <button onClick={() => setInstallationLocation("Outside wall of pole barn or out-building")}>Outside wall of pole barn or out-building</button>
          <button onClick={() => setInstallationLocation("Other")}>Other</button>
          <br />
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {question === 5 && installationLocation === "Outside wall of home" && (
        <div>
          <p>Is your garage, carport, pole barn, or out-building attached to your home?</p>
          <button onClick={() => setAttachedToHome("Yes, attached")}>Yes, attached</button>
          <button onClick={() => setAttachedToHome("No, detached")}>No, detached</button>
          <br />
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {question === 5 && attachedToHome === "No, detached" && (
        <div>
          <p>Do you have an electrical panel in your detached garage, carport, pole barn, out-building?</p>
          <button onClick={() => setHasElectricalPanel("Yes")}>Yes</button>
          <button onClick={() => setHasElectricalPanel("No")}>No</button>
          <br />
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {/* Continue with other questions and content for each question */}
      {/* Use state to store user's answers for each question */}
    </div>
  );
};

export default ChargingStationForm;
