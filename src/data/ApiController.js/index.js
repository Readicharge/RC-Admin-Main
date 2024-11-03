import axios from "axios";


async function generateHmacSHA256(message, secretKey) {
    // Convert the secret key and message to ArrayBuffer
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secretKey);
    const messageData = encoder.encode(message);

    // Import the secret key
    const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: { name: 'SHA-256' } },
        false,
        ['sign']
    );

    // Generate the HMAC signature
    const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, messageData);

    // Convert ArrayBuffer to a hex string
    return Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}




// Function to create headers with HMAC authentication
const createHeaders = async (body = "") => {
    const secret = 'your_shared_secret_code'; // Replace with your HMAC secret
    const timestamp = Date.now().toString();
    const signature = await generateHmacSHA256(`${body}:${timestamp}`, secret);

    return {
        'Content-Type': 'application/json',
        Accept: 'Application/json',
        'x-timestamp': timestamp, // Send timestamp in the headers
        'x-hmac-signature': signature
    };
};


// *********************************************************************************
const createService = async (formData) => {

    try {
        console.log(formData)
        const headers = await createHeaders("/api/admin_web_app/service-create");
        const response = await axios.post(`https://api.readicharge.com/api/admin_web_app/service-create`, formData, { headers });
        alert(response)
        console.log(response)
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};



const getserviceList = async () => {
    try {
        const headers = await createHeaders("/api/admin_web_app/service-get-all");
        const response = await axios.get(`https://api.readicharge.com/api/admin_web_app/service-get-all`, { headers });
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getServiceNameById = async (serviceId) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/service-name/${serviceId}`);
        const response = await axios.get(`https://api.readicharge.com/api/admin_web_app/service-name/${serviceId}`, { headers });
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getServiceCodeById = async (serviceId) => {
    try {
        const headers = await createHeaders(`api/admin_web_app/service-code/${serviceId}`);
        const response = await axios.get(`https://api.readicharge.com/api/admin_web_app/service-code/${serviceId}`, { headers });
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}


const deleteServiceTimeById = async (id) => {
    try {
        const headers = await createHeaders(`api/admin_web_app/service-time-delete-specific/${id}`);
        const response = await axios.delete(`https://api.readicharge.com/api/admin_web_app/service-time-delete-specific/${id}`, { headers });
        if (response.status === 200) {
            alert("Service Time deleted successfully")
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}


const createTime = async (formData) => {
    try {
        const headers = await createHeaders(`api/admin_web_app/service-time-create`);
        const resposne = await axios.post(`https://api.readicharge.com/api/admin_web_app/service-time-create`, formData, { headers });
        alert(resposne)
    }
    catch (error) {
        console.log(error)
    }
}

const getserviceTimeList = async (formData) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/service-time-get-all`);
        const resposne = await axios.get(`https://api.readicharge.com/api/admin_web_app/service-time-get-all`, { headers });
        return resposne;

    }
    catch (error) {
        console.log(error)
    }
}


const updateServiceTime = async (id, formData) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/service-time-update/${id}`);
        const resposne = await axios.put(`https://api.readicharge.com/api/admin_web_app/service-time-update/${id}`, formData, { headers });
        return resposne;

    }
    catch (error) {
        console.log(error)
    }
}


const validateAdmin = async (formData) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/sign-in`);
        console.log(formData, headers)
        const response = await axios.post(`https://api.readicharge.com/api/admin_web_app/sign-in`, formData, { headers });
        console.log(response)
        return response;
    }
    catch (error) {
        console.log(error);

    }
}



const createServicePrice = async (formData) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/service-price-create`);
        const resposne = await axios.post(`https://api.readicharge.com/api/admin_web_app/service-price-create`, formData, { headers });
        alert(resposne)
    }
    catch (error) {
        console.log(error)
    }
}


const getServicePriceList = async () => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/service-price-get-all`);
        const resposne = await axios.get(`https://api.readicharge.com/api/admin_web_app/service-price-get-all`, { headers });
        return resposne;
    }
    catch (error) {
        console.log(error)
    }
}

const deleteServicePrice = async (id) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/service-price-delete/${id}`);
        const response = await axios.delete(`https://api.readicharge.com/api/admin_web_app/service-price-delete/${id}`, { headers });

    } catch (error) {
        console.log(error);
        return null;
    }
}


const updateServicePrice = async (id, formData) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/service-price-update/${id}`);
        const resposne = await axios.put(`https://api.readicharge.com/api/admin_web_app/service-price-update/${id}`, formData, { headers });
        return resposne;

    }
    catch (error) {
        console.log(error)
    }
}

const getLabourRate = async () => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/labor-rate-get-all`);
        const response = await axios.get(`https://api.readicharge.com/api/admin_web_app/labor-rate-get-all`, { headers });
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getLabourRateByServiceId = async (serviceId) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/labor-rate-get-service-id/${serviceId}`);
        const response = await axios.get(`https://api.readicharge.com/api/admin_web_app/labor-rate-get-service-id/${serviceId}`, { headers });
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createLabourRate = async (formData) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/labor-rate-get-all`);
        const response = await axios.get(`https://api.readicharge.com/api/admin_web_app/labor-rate-get-all`, { headers });
        const sortedResponse = response.data.filter(item => item.service_id === formData.service_id && item.number_of_installs === formData.number_of_installs);
        console.log(sortedResponse)
        if (sortedResponse.length > 0) {
            const headers = await createHeaders(`/api/admin_web_app/labor-rate-update/${sortedResponse[0]._id}`);
            await axios.put(`https://api.readicharge.com/api/admin_web_app/labor-rate-update/${sortedResponse[0]._id}`, formData, { headers });
        } else {
            const headers = await createHeaders(`/api/admin_web_app/labor-rate-create`);
            await axios.post(`https://api.readicharge.com/api/admin_web_app/labor-rate-create`, formData, { headers });
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}





const createMaterial = async (formData) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/material-create`);
        const response = await axios.post(`https://api.readicharge.com/api/admin_web_app/material-create`, formData, { headers });
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteMaterialById = async (id) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/material-delete/${id}`);
        const response = await axios.delete(`https://api.readicharge.com/api/admin_web_app/material-delete/${id}`, { headers });
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getMaterialList = async () => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/material-get-all`);
        const response = await axios.get(`https://api.readicharge.com/api/admin_web_app/material-get-all`, { headers });
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateMaterial = async (id, formData) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/material-update/${id}`);
        const response = await axios.put(`https://api.readicharge.com/api/admin_web_app/material-update/${id}`, formData, { headers });
        return response;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}


const createCustomer = async (formData) => {
    try {
        const headers = await createHeaders(`/api/customerApp/register`);
        const response = await axios.post(`https://api.readicharge.com/api/customerApp/register`, formData, { headers });

        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}



const createInstaller = async (formData) => {
    try {
        const headers = await createHeaders(`/api/installerApp/register`);
        const response = await axios.post(`https://api.readicharge.com/api/installerApp/register`, formData, { headers });
        console.log(response)

    } catch (error) {
        console.log(error);
        return null;
    }
}


const createAdmin = async (formData) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/registerAdmin`);
        console.log("Over Here")
        const response = await axios.post(`https://api.readicharge.com/api/admin_web_app/registerAdmin`, formData, { headers });
        console.log(response)
    }
    catch (error) {
        console.log(error);

    }
}


const getAdminData = async () => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/getAdmin`);
        const response = await axios.get(`https://api.readicharge.com/api/admin_web_app/getAdmin`, { headers });
        return response;
    } catch (error) {
        console.log(error);
    }
}




const getInstallerList = async () => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/installer-get-all`);
        const response = await axios.get(`https://api.readicharge.com/api/admin_web_app/installer-get-all`, { headers });
        return response;
    } catch (error) {
        console.log(error);
    }
}



const deleteInstaller = async (id) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/installer-delete/${id}`);
        const response = await axios.delete(`https://api.readicharge.com/api/admin_web_app/installer-delete/${id}`, { headers });
        return response;
    } catch (error) {
        console.log(error);
    }
}




const updateInstaller = async (id, dataObject) => {
    try {
        const dataToBePushed = {
            id: dataObject._id,
            shown_id: `RC-I-${dataObject._id}`,
            firstName: dataObject.firstName,
            lastName: dataObject.lastName,
            companyName: dataObject.companyName,
            email: dataObject.email,
            password: dataObject.password,
            phoneNumber: dataObject.phoneNumber,
            yearsOfExperience: dataObject.yearsOfExperience,
            description: dataObject.description,
            addressLine1: dataObject.addressLine1,
            addressLine2: dataObject.addressLine2,
            city: dataObject.city,
            zip: dataObject.zip,
            miles_distance: dataObject.miles_distance,
            state: dataObject.state,
            licenseNumber: dataObject.licenseNumber,
            licenseExpirationDate: dataObject.licenseExpirationDate,
            businessInsuranceCompany: dataObject.businessInsuranceCompany,
            businessInsuranceNumber: dataObject.businessInsuranceNumber,
            businessAgentPhoneNumber: dataObject.businessAgentPhoneNumber,
            businessPolicyNumber: dataObject.businessPolicyNumber,
            businessInsuranceEffectiveStartDate: dataObject.businessInsuranceEffectiveStartDate,
            businessInsuranceEffectiveEndDate: dataObject.businessInsuranceEffectiveEndDate,
            bondingCertificationNumber: dataObject.bondingCertificationNumber,
            bondingCompany: dataObject.bondingCompany,
            bondingAgentPhoneNumber: dataObject.bondingAgentPhoneNumber,
            bondAmount: dataObject.bondAmount,
            bondingEffectiveStartDate: dataObject.bondingEffectiveStartDate,
            bondingEffectiveEndDate: dataObject.bondingEffectiveEndDate,
            services: dataObject.services
        };
        const headers = await createHeaders(`/api/installerApp/update/${id}`);
        const response = await axios.put(`https://api.readicharge.com/api/installerApp/update/${id}`, dataToBePushed, { headers });
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
    }
};



const deleteAdmin = async (id) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/deleteAdmin/${id}`);
        const response = await axios.delete(`https://api.readicharge.com/api/admin_web_app/deleteAdmin/${id}`, { headers });
        return response;
    } catch (error) {
        console.log(error);
    }
}




// Progress


const getCustomerData = async () => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/customer-get-all`);
        const response = await axios.get(`https://api.readicharge.com/api/admin_web_app/customer-get-all`, { headers });
        return response
    }
    catch (error) {
        console.log(error)
    }
}


const updateCustomerData = async (id, idata) => {
    try {
        const headers = await createHeaders(`/api/customerApp/getCustomer/${id}`);
        const response = await axios.put(`https://api.readicharge.com/api/customerApp/getCustomer/${id}`, idata, { headers });
        return response
    }
    catch (error) {
        console.log(error)
    }
}

const deleteCustomer = async (id) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/deleteAdmin/${id}`);
        const response = await axios.delete(`https://api.readicharge.com/api/admin_web_app/deleteAdmin/${id}`, { headers });
        return response;
    } catch (error) {
        console.log(error);
    }
}



const dashboardInstallerCard_data = async () => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/dashboard-get-installer-header-card-data`);
        const response = await axios.get('https://api.readicharge.com/api/admin_web_app/dashboard-get-installer-header-card-data', { headers });
        return response;
    }
    catch (error) {
        console.log(error)
        return null;
    }
}


const dashboardJobMainCard_data = async () => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/dashboard-get-jobs-main-card-data`);
        const response = await axios.get('https://api.readicharge.com/api/admin_web_app/dashboard-get-jobs-main-card-data', { headers });
        return response;
    }
    catch (error) {
        console.log(error)
        return null;
    }
}



const deleteCustomerById = async (id) => {
    try {
        const headers = await createHeaders(`/api/admin_web_app/customer-delete/${id}`);
        const response = await axios.delete(`https://api.readicharge.com/api/admin_web_app/customer-delete/${id}`, { headers });
        return response;
    }
    catch (error) {
        console.log(error)
        return null;
    }
}




const updateAdmin = async (id, dataObject) => {
    try {


        const headers = await createHeaders(`/api/admin_web_app/updateAdmin/${id}`);
        const dataToBePushed = {
            id: dataObject._id,
            name: dataObject.name,
            email: dataObject.email,
            phoneNumber: dataObject.phoneNumber,
            address: dataObject.address,
            password: dataObject.password,
            roles: dataObject.roles

        };


        const response = await axios.put(`https://api.readicharge.com/api/admin_web_app/updateAdmin/${id}`, dataToBePushed, { headers });
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
    }
}


// ********************************************************************************







const getMaterialTax = async () => {
    try {
        const headers = await createHeaders(`/api/MaterialTax`);
        const response = await axios.get(`https://api.readicharge.com/api/MaterialTax`, { headers });
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createMaterialTax = async (formData) => {
    try {
        const headers = await createHeaders(`/api/MaterialTax/`);
        const response = await axios.get(`https://api.readicharge.com/api/MaterialTax/`, { headers });

        if (response.data.length === 0) {

            await axios.post(`https://api.readicharge.com/api/MaterialTax/`, formData, { headers });
        }
        else {
            const id = response.data[0]._id;
            const headers1 = await createHeaders(`/api/MaterialTax/${id}`);
            await axios.put(`https://api.readicharge.com/api/MaterialTax/${id}`, formData, { headers: headers1 });
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}







const getInstallerNameById = async (id) => {
    try {
        const headers = await createHeaders(`/api/installer/${id}`);
        const response = await axios.get(`https://api.readicharge.com/api/installer/${id}`, { headers });
        console.log(response)
        return response.data.firstName;
    } catch (error) {
        console.log(error);
    }
}


const getMaterialNameById = async (id) => {
    try {
        const headers = await createHeaders(`/api/materials/${id}`);
        const response = await axios.get(`https://api.readicharge.com/api/materials/${id}`);
        console.log(response)
        return response.data.material_name;
    } catch (error) {
        console.log(error);
    }
}


const getCountInstaller = async () => {
    try {
        const headers = await createHeaders(`/api/installer`);
        const response = await axios.get(`https://api.readicharge.com/api/installer`, { headers });
        return response.data.length;
    } catch (error) {
        console.log(error);
    }
}






const getMostSuitableInstaller = async (formData) => {
    try {
        const headers = await createHeaders(`/api/booking/installer_mapping`);
        const response = await axios.post(`https://api.readicharge.com/api/booking/installer_mapping`, formData, { headers });
        return response;
    }
    catch (error) {
        console.log(error);

    }
}


const createBooking = async (formData) => {
    try {
        const headers = await createHeaders(`/api/booking`);
        const response = await axios.post(`https://api.readicharge.com/api/booking`, formData, { headers });
        return response
    }
    catch (error) {
        console.log(error);

    }
}








const getBookingsList = async () => {
    try {
        const headers = await createHeaders(`/api/booking`);
        const response = await axios.get(`https://api.readicharge.com/api/booking`, { headers });
        return response;
    } catch (error) {
        console.log(error);
    }
}


const getBookingCount = async () => {
    try {
        const headers = await createHeaders(`/api/booking`);
        const response = await axios.get(`https://api.readicharge.com/api/booking`, { headers });
        return response.data.length;
    } catch (error) {
        console.log(error);
    }
}


const deleteBooking = async (id) => {
    try {
        const headers = await createHeaders(`/api/booking/${id}`);
        const response = await axios.delete(`https://api.readicharge.com/api/booking/${id}`, { headers });
        return response;
    } catch (error) {
        console.log(error);
    }
}


const updateBooking = async (id, dataObject) => {
    try {
        const headers = await createHeaders(`/api/booking/${id}`);


        const dataToBePushed = {
            id: dataObject._id,
            date: dataObject.date,
            time_start: dataObject.time_start,
            time_end: dataObject.time_end,
            number_of_installs: dataObject.number_of_installs,
            materialCost: dataObject.materialCost,
            materialTax: dataObject.materialTax,
            material_details: dataObject.material_details,
            customerShowingCost: dataObject.customerShowingCost,
            paymentStatus: dataObject.paymentStatus,
            completionStatus: dataObject.completionStatus,
            installer: dataObject.installer,
            service: dataObject.service_id,
            machinePurchasedByUser: dataObject.machinePurchasedByUser,
            labourRates: dataObject.labourRates,
            changedBy: dataObject.changedBy
        };


        const response = await axios.put(`https://api.readicharge.com/api/booking/${id}`, dataToBePushed, { headers });
        return response;
    } catch (error) {
        console.log(error);
    }
}

















const fetchPayments = async () => {
    try {
        const headers = await createHeaders(`/api/payments/getPaymentList`);
        const response = await fetch('https://api.readicharge.com/api/payments/getPaymentList', { headers });
        const data = await response.data();
        return data;

    } catch (error) {
        console.error('Error fetching payments:', error);
    }
};







export {
    deleteCustomerById,
    dashboardJobMainCard_data,
    updateMaterial,
    getCustomerData,
    createCustomer,
    updateServicePrice,
    updateServiceTime,
    getServiceCodeById,
    fetchPayments,
    getMaterialNameById,
    getBookingCount
    , getCountInstaller,
    getAdminData,
    deleteAdmin,
    updateAdmin,
    deleteInstaller,
    updateInstaller,
    createService,
    createTime,
    getserviceList,
    getServiceNameById,
    getserviceTimeList,
    deleteServiceTimeById,
    createServicePrice,
    getServicePriceList,
    deleteServicePrice,
    createMaterial,
    deleteMaterialById,
    getMaterialList,
    getMaterialTax,
    createMaterialTax,
    getLabourRate,
    createLabourRate,
    getInstallerList,
    createInstaller,
    getMostSuitableInstaller,
    createBooking,
    createAdmin,
    validateAdmin,
    getLabourRateByServiceId,
    getBookingsList,
    deleteBooking,
    updateBooking
    , getInstallerNameById,
    dashboardInstallerCard_data
}

