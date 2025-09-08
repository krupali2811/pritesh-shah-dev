import moment from "moment/moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import react-datepicker's CSS
import { LuCalendarDays } from "react-icons/lu";

const DatePickerComponent = ({
  showMonthYear,
  label,
  dateformat,
  date,
  setDate,
}) => {

  const handleDateChange = (value) => {
    setDate(value);
  };

  return (
    <>
      <label htmlFor="yearFilter" className="mb-12">
        {label} :
      </label>
      <div className="date">
        <DatePicker
          showIcon
          // selected={moment(date, "YYYY-MM-DD").format("DD-MM-YYYY")}
          selected={date ? moment(date).toDate() : null}   //For today's date
          onChange={handleDateChange}
          showMonthYearPicker={showMonthYear}
          dateFormat={dateformat}
          className="form-control"
          id="yearFilter"
          icon={<LuCalendarDays />}
        />
      </div>
    </>
  );
};

export default DatePickerComponent;
