import "./RCRadio.scss";

export default function RCRadio({ label, checked, isGroup }) {
  return (
    <div
      className={
        isGroup ? "rcfield_container rc_radio_group" : "rcfield_container"
      }
    >
      <label className="rc_radio">
        <input type="radio" defaultChecked={checked} name="radio" />
        <span className="checkmark"></span>
        {label}
      </label>
    </div>
  );
}
