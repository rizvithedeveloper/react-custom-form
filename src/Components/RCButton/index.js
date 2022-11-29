import "./RCButton.scss";
export default function RCButton({ type, isDisabled, children }) {
  return (
    <button className="rc_button" type={type} disabled={isDisabled}>
      {children}
    </button>
  );
}
