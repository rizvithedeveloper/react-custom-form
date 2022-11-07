import { useState, useEffect } from "react";
import "./RCPhone.scss";

export default function RCPhone({
  label,
  type,
  value,
  name,
  placeholder,
  id,
  handleChange,
  validations,
  validErrors,
}) {
  const [isMounted, setMounted] = useState(false);
  const [isShrinkable, setShrinkable] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldStatus, setFieldStatus] = useState("");
  const [isPassVisible, setPassVisible] = useState(false);

  useEffect(() => {
    if (isMounted) {
      handleValidation();
    } else {
      setMounted(true);
    }
  }, [value]);

  function handleValidation() {
    if (value) {
      let isWhitespace = value.trim().length === 0;
      let isSpecialChar = !/^[A-Za-z ]+$/.test(value);
      let isSpace = value.includes(" ");
      let isEmail = !/\S+@\S+\.\S+/.test(value);

      // ## Length Validation
      let getlengthIdx = extractIndexFromArr(validations, "length");
      let length = getlengthIdx
        ? validations[getlengthIdx].split("-")[1]
        : undefined;
      let isLength = length ? value.length === Number(length) : false;

      // ## Min Length Validation
      let getMinLengthIdx = extractIndexFromArr(validations, "minLength");
      let minlength = getMinLengthIdx
        ? validations[getMinLengthIdx].split("-")[1]
        : undefined;
      let isMinLength = minlength ? value.length >= Number(minlength) : false;

      // ## Max Length Validation
      let getMaxLengthIdx = extractIndexFromArr(validations, "maxLength");
      let maxlength = getMaxLengthIdx
        ? validations[getMaxLengthIdx].split("-")[1]
        : undefined;
      let isMaxLength = maxlength ? value.length <= Number(maxlength) : false;

      // ## Validation Process
      if (validations.includes("isWhitespace") && isWhitespace) {
        // ## WhiteSpace
        findAndSetError("isWhitespace");
      } else if (validations.includes("isSpace") && isSpace) {
        // ## isSpace
        findAndSetError("isSpace");
      } else if (validations.includes("isSpecialChar") && isSpecialChar) {
        // ## isSpecialChar
        findAndSetError("isSpecialChar");
      } else if (validations.includes("isEmail") && isEmail) {
        // ## isEmail
        findAndSetError("isEmail");
      } else if (!isMinLength) {
        // ## MinLength
        findAndSetError(validations[getMinLengthIdx]);
      } else if (!isMaxLength) {
        // ## MaxLength
        findAndSetError(validations[getMaxLengthIdx]);
      } else if (!isLength) {
        // ## Length
        findAndSetError(validations[getlengthIdx]);
      } else {
        findAndSetError();
      }
    } else {
      if (validations.includes("isEmpty")) {
        findAndSetError("isEmpty");
      } else {
        findAndSetError();
      }
    }
  }

  function extractIndexFromArr(arr = [], m) {
    let itemIdx;
    arr.map((txt, idx) => {
      if (txt.includes(m)) itemIdx = idx;
    });
    return itemIdx;
  }

  function findAndSetError(validationType) {
    if (validationType) {
      let errIdx = validations.indexOf(validationType);
      let errMessage = validErrors[errIdx];
      setError(true);
      setErrorMessage(errMessage);
      setFieldStatus("warning");
    } else {
      setError(false);
      setErrorMessage("");
      setFieldStatus("");
    }
  }
  return (
    <div
      className={
        value || isShrinkable
          ? `rcfield_container shrinkable ${fieldStatus}`
          : `rcfield_container ${fieldStatus}`
      }
    >
      <select name="countryCode" id="">
        <option value="1">+1</option>
        <option value="92">+92</option>
      </select>
      {label && (
        <label htmlFor={id} className="rc_label">
          {label}
        </label>
      )}

      <input
        className="rc_input"
        id={id}
        type={type}
        name={name}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        onFocus={() => setShrinkable(true)}
        onBlur={() => setShrinkable(false)}
      />

      {isError && <span className="rc_message warning">{errorMessage}</span>}
    </div>
  );
}
