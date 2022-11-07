import { useState } from "react";
import "./App.css";
import RCCheckbox from "./Components/RCCheckbox";
import RCForm from "./Components/RCForm";
import RCInput from "./Components/RCInput";
import RCPhone from "./Components/RCPhone";
import RCRadio from "./Components/RCRadio";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    phoneNo: "",
    password: "",
    accountType: "entity",
    agreementCheck: "",
  });

  function handleChange(event) {
    formData[`${event.target.name}`] = event.target.value;
    setFormData({ ...formData });
  }

  let { firstName, phoneNo, password, accountType, agreementCheck } = formData;
  return (
    <div className="App">
      <RCForm>
        <RCInput
          id="firstName"
          type="text"
          label="First Name"
          placeholder="Enter your name"
          value={firstName}
          name="firstName"
          handleChange={handleChange}
          validations={["isSpecialChar", "isWhitespace", "isEmpty", "isSpace"]}
          validErrors={[
            "Special characters not allowed",
            "White Space not allowed",
            "First Name should not be empty",
            "Space not allowed",
          ]}
        />

        <RCInput
          id="phone"
          type="number"
          label="Phone Number"
          placeholder="Enter your phone"
          value={phoneNo}
          name="phoneNo"
          handleChange={handleChange}
          validations={[
            "isWhitespace",
            "isEmpty",
            "isSpace",
            "minLength-4",
            "maxLength-9",
          ]}
          validErrors={[
            "White Space not allowed",
            "Phone Number should not be empty",
            "Space not allowed",
            "Min length should be 4",
            "Max length should be 9",
          ]}
        />

        <RCInput
          id="firstName"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          name="password"
          handleChange={handleChange}
          validations={["isWhitespace", "isEmpty"]}
          validErrors={[
            "White Space not allowed",
            "First Name should not be empty",
          ]}
        />

        <RCRadio
          // isGroup={true}
          label="Individual"
          value="individual"
          name="accountType"
          checked={accountType === "individual"}
          handleChange={handleChange}
        />

        <RCRadio
          // isGroup={true}
          label="Entity"
          value="entity"
          name="accountType"
          checked={accountType === "entity"}
          handleChange={handleChange}
        />

        <RCCheckbox
          id="agreementCheck"
          // isGroup={true}
          label={`<div className="check-label"> By checking this box you agree to AKRU specific <a target="_blank" href="/terms-of-use"> Terms of Use </a> and <a target="_blank" href="/privacy-policy">Privacy Policy</a> as well as our partner Dwolla's <a href="https://www.dwolla.com/legal/tos/" target="_blank" style="color: rgb(5, 36, 96);"> Terms of Service </a> and <a href="https://www.dwolla.com/legal/privacy/" target="_blank" style="color: rgb(5, 36, 96);"> Privacy Policy</a>.</div>`}
          value="agreeTerms"
          name="agreementCheck"
          checked={agreementCheck}
          handleChange={handleChange}
        />

        <RCPhone
          id="Phone"
          type="text"
          label="Phone"
          placeholder="Enter your phone"
          value={phoneNo}
          name="phoneNo"
          handleChange={handleChange}
          validations={["isWhitespace", "isEmpty"]}
          validErrors={[
            "White Space not allowed",
            "First Name should not be empty",
          ]}
        />
      </RCForm>
    </div>
  );
}

export default App;
