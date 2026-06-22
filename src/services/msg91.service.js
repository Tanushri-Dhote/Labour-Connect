const axios = require("axios");

const sendMsg91Otp = async (mobile) => {
  try {
    const response = await axios.post(
      "https://control.msg91.com/api/v5/widget/sendOtp",
      {
        mobile,
        widgetId: process.env.MSG91_WIDGET_ID,
      },
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "MSG91 ERROR:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = {
  sendMsg91Otp,
};