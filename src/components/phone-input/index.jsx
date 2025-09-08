import { useState, useEffect } from "react";
import IntlTelInput from "intl-tel-input/react";
import "intl-tel-input/build/css/intlTelInput.css";

const PhoneInput = ({
  name,
  register = () => {},
  setValue = () => {},
  errors = [],
  phoneNumber,
  setPhoneNumber,
}) => {
  // Local state for phone number

  const handlePhoneChange = (value) => {
    // Only allow digits and a leading +
    // Sanitize input: keep digits and one leading plus only
    let cleaned = value.replace(/[^\d+]/g, "");

    if (cleaned.startsWith("+")) {
      cleaned = "+" + cleaned.slice(1).replace(/[+]/g, "");
    } else {
      cleaned = cleaned.replace(/[+]/g, "");
    }
    setPhoneNumber(cleaned); // Update local state
    setValue(name, cleaned); // Update the form value via react-hook-form
  };

  useEffect(() => {
    register(name); // Manually register the input field
  }, [register, name]);

  const [country, setCountry] = useState(); // Default to 'us'

  // Function to get the user's country by IP
  const getIp = async () => {
    try {
      const resp = await fetch("https://api.country.is/");
      const data = await resp.json();

      setCountry(data?.country?.toLowerCase() || "us"); // Ensure lowercase country code
    } catch (error) {
      setCountry("us"); // Fallback to 'us'
    }
  };

  useEffect(() => {
    getIp();
  }, []);

  if (!country) {
    return <div>⏳</div>; // Display loading until the country is set
  }

  return (
    <div className="input-group mb-20">
      <IntlTelInput
        initialValue={phoneNumber} // Initialize with local state
        onChangeNumber={handlePhoneChange} // Update the phone number
        onChangeCountry={(val) => setCountry(val)}
        initOptions={{
          initialCountry: country, // Default country
          loadUtils: () => import("intl-tel-input/build/js/utils.js"), // Load utils dynamically
        }}
      />
      {errors[name] && (
        <span className="text-danger">{errors[name]?.message}</span>
      )}
    </div>
  );
};

export default PhoneInput;
