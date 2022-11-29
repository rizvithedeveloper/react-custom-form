import React, { useState } from "react";
import "./RCForm.scss";

function RCForm({ children }) {
  const [isFormErrors, setFormErrors] = useState(false);
  function handleSubmit(event) {
    event.preventDefault();

    if (isFormErrors) {
      console.log("Error");
    }
  }
  const updateChildrenWithProps = React.Children.map(children, (child, i) => {
    return React.cloneElement(child, {
      setFormErrors: setFormErrors,
      index: i,
    });
  });
  return (
    <form action="#" onSubmit={handleSubmit}>
      {updateChildrenWithProps}
    </form>
  );
}

export default RCForm;
