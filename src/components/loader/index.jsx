
const Spinner = ({ color = "text-primary", size = "md" }) => {
  return (
    <div className={`spinner-border ${color} spinner-${size}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
