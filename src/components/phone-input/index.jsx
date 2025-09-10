import { useState, useCallback } from "react";
import IntlTelInput from "intl-tel-input/react";
import "intl-tel-input/build/css/intlTelInput.css";

const PhoneInput = ({ value, onChange }) => {
  const [loading, setLoading] = useState(true);

  // sanitize and forward phone number
  const handlePhoneChange = (val) => {
    let cleaned = val.replace(/[^\d+]/g, "");
    if (cleaned.startsWith("+")) {
      cleaned = "+" + cleaned.slice(1).replace(/[+]/g, "");
    } else {
      cleaned = cleaned.replace(/[+]/g, "");
    }
    onChange(cleaned);
  };

  // geoIpLookup with loader
  const geoIpLookup = useCallback((success, failure) => {
    fetch("https://api.country.is/")
      .then((res) => res.json())
      .then((data) => {
        if (data?.country) {
          success(data.country.toLowerCase());
        } else {
          failure();
        }
      })
      .catch(() => failure())
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="position-relative">
      {loading && (
        <div
          className="position-absolute d-flex align-items-center justify-content-center"
          style={{
            width: "40px",
            height: "100%",
            left: 0,
            top: 0,
            zIndex: 10,
          }}
        >
          <div className="spinner-border spinner-border-sm text-primary" />
        </div>
      )}

      <IntlTelInput
        initialValue={value || ""}
        onChangeNumber={handlePhoneChange}
        initOptions={{
          initialCountry: "auto",
          strictMode: true,
          formatAsYouType: true,
          geoIpLookup,
          loadUtils: () => import("intl-tel-input/build/js/utils.js"),
        }}
        inputClassName="form-control"
      />
    </div>
  );
};

export default PhoneInput;
