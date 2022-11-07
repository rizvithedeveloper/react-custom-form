import "./RCCheckbox.scss";

export default function RCCheckbox({ label, checked, isGroup }) {
  return (
    <div
      className={
        isGroup ? "rcfield_container rc_checkbox_group" : "rcfield_container"
      }
    >
      <label className="rc_checkbox">
        <input type="checkbox" defaultChecked={checked} name="radio" />
        <span className="checkmark"></span>
        <div dangerouslySetInnerHTML={{ __html: label }}></div>
      </label>
    </div>
  );
}
