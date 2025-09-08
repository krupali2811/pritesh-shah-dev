import Select from "react-select";

const DropDown = ({
  name,
  className = "",
  placeholder,
  state,
  setState,
  options,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "var(--bs-dropdown-bg)",
      color: "var(--bs-body-color)",
      minWidth: "150px",

      borderColor: state.isFocused
        ? "var(--bs-primary)"
        : localStorage.getItem("theme") === "dark"
        ? "var(--bs-secondary)"
        : "#CFCFCF",

      "&:hover": {
        borderColor: state.isFocused
          ? "var(--bs-primary)" // Ensure focus color remains even on hover
          : localStorage.getItem("theme") === "dark"
          ? "var(--bs-secondary)"
          : "#CFCFCF",
      },

      boxShadow: "none",
      ...(state.isFocused && {
        borderColor: "var(--bs-primary)",
        boxShadow: "none",
      }),
      fontSize: "15px",
    }),
    input: (provided) => ({
      ...provided,
      color: "var(--bs-body-color)",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--bs-body-color)",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "var(--bs-body-color)",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--bs-body-bg)",
      width: "100%",
      minWidth: "150px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "transparent" : "var(--bs-body-bg)",
      color: state.isSelected ? "var(--bs-primary)" : "var(--bs-body-color)",

      fontSize: "13px",
      "&:hover": {
        color: "var(--bs-primary)",
        backgroundColor: "var(--bs-dropdown-bg)",
      },
      lineHeight: "19.5px",
    }),
  };

  const customSingleValue = ({ data }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        cursor: "pointer",
        position: "absolute",
        width: "100%",
        left: 0,
      }}
      className="single-value-block"
    >
      <img
        src={`/assets/images/coins/${data?.value.toLowerCase()}.png`}
        alt={data.label}
        style={{ width: 20, height: 20, marginRight: 8 }}
      />
      {data.label}
    </div>
  );

  const customOption = (props) => {
    const { data, innerRef, innerProps } = props;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          cursor: "pointer",
          backgroundColor: innerProps.isFocused ? "#f0f0f0" : "transparent",
        }}
      >
        <img
          src={`/assets/images/coins/${data?.value.toLowerCase()}.png`}
          alt={data.label}
          style={{ width: 20, height: 20, marginRight: 8 }}
        />
        <span style={{ flex: 1 }}>{data.label}</span>
        <span style={{ fontWeight: "bold", marginLeft: "auto" }}>
          {data.balance}
        </span>
      </div>
    );
  };

  const customDepositCoinOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          cursor: "pointer",
          backgroundColor: innerProps.isFocused ? "#f0f0f0" : "transparent",
        }}
      >
        <img
          src={`/assets/images/coins/${data?.value.toLowerCase()}.png`}
          alt={data.label}
          style={{ width: 20, height: 20, marginRight: 8 }}
        />
        <span style={{ flex: 1 }}>{data.label}</span>
        {/* <span style={{ fontWeight: "bold", marginLeft: "auto" }}>
          {data.balance}
        </span> */}
      </div>
    );
  };

  const customChainTypeOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
          cursor: "pointer",
          backgroundColor: innerProps.isFocused ? "#f0f0f0" : "transparent",
        }}
      >
        <img
          src={`/assets/images/coins/${data?.value.toLowerCase()}.png`}
          alt={data.label}
          style={{ width: 20, height: 20, marginRight: 8 }}
        />
        <span style={{ flex: 1 }}>{data.label}</span>
        <span className="fs-14" style={{ flex: 1 }}>
          Deposit Completion: {data.chain.confirmation} confirmation(s)
        </span>
        <span className="fs-14" style={{ flex: 1 }}>
          Min. Deposit Amount: {data.chain.depositMin} {data.label}
        </span>
      </div>
    );
  };
  const customWithdrawChainTypeOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
          cursor: "pointer",
          backgroundColor: innerProps.isFocused ? "#f0f0f0" : "transparent",
        }}
      >
        <img
          src={`/assets/images/coins/${data?.value.toLowerCase()}.png`}
          alt={data.label}
          style={{ width: 20, height: 20, marginRight: 8 }}
        />
        <span style={{ flex: 1 }}>{data.label}</span>
        <span className="fs-14">
          Transaction Fees: {data.chain.withdrawFee || 0}
        </span>
      </div>
    );
  };

  return (
    <>
      {name === "transferCoin" ? (
        <Select
          className={`${className} selectpicker`}
          value={state}
          placeholder={placeholder}
          onChange={(selectedOption) => setState(selectedOption)}
          name={name}
          options={options}
          styles={customStyles}
          components={{ SingleValue: customSingleValue, Option: customOption }}
           
        />
      ) : name === "depositCoin" ? (
        <Select
          className={`${className} selectpicker`}
          value={state}
          placeholder={placeholder}
          onChange={(selectedOption) => setState(selectedOption)}
          name={name}
          options={options}
          styles={customStyles}
          components={{
            SingleValue: customSingleValue,
            Option: customDepositCoinOption,
          }}
           
        />
      ) : name === "chainType" ? (
        <Select
          className={`${className} selectpicker`}
          value={state}
          placeholder={placeholder}
          onChange={(selectedOption) => setState(selectedOption)}
          name={name}
          options={options}
          styles={customStyles}
          components={{
            SingleValue: customSingleValue,
            Option: customChainTypeOption,
          }}
           
        />
      ) : name === "withdrawChainType" ? (
        <Select
          className={`${className} selectpicker`}
          value={state}
          placeholder={placeholder}
          onChange={(selectedOption) => setState(selectedOption)}
          name={name}
          options={options}
          styles={customStyles}
          components={{
            SingleValue: customSingleValue,
            Option: customWithdrawChainTypeOption,
          }}
           
        />
      ) : (
        <Select
          className={`${className} selectpicker`}
          value={state}
          placeholder={placeholder}
          onChange={(selectedOption) => setState(selectedOption)}
          name={name}
          options={options}
          styles={customStyles}
           
        />
      )}
    </>
  );
};

export default DropDown;
