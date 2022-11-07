import { useState, useEffect } from "react";
import "./RCInput.scss";

export default function RCInput({
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
      {label && (
        <label htmlFor={id} className="rc_label">
          {label}
        </label>
      )}

      {/* ### Password Field */}
      {type === "password" ? (
        <div className="rcpassword_field">
          <input
            className="rc_input"
            id={id}
            type={isPassVisible ? "text" : "password"}
            name={name}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
            onFocus={() => setShrinkable(true)}
            onBlur={() => setShrinkable(false)}
          />
          <div
            className="rcpassword_iconBtn"
            onClick={() => setPassVisible(!isPassVisible)}
          >
            {isPassVisible ? (
              <svg
                version="1.1"
                viewBox="0 0 488.85 488.85"
                style={{ enableBackground: "new 0 0 512 512" }}
              >
                <g>
                  <g>
                    <path
                      d="M244.425,98.725c-93.4,0-178.1,51.1-240.6,134.1c-5.1,6.8-5.1,16.3,0,23.1c62.5,83.1,147.2,134.2,240.6,134.2
		s178.1-51.1,240.6-134.1c5.1-6.8,5.1-16.3,0-23.1C422.525,149.825,337.825,98.725,244.425,98.725z M251.125,347.025
		c-62,3.9-113.2-47.2-109.3-109.3c3.2-51.2,44.7-92.7,95.9-95.9c62-3.9,113.2,47.2,109.3,109.3
		C343.725,302.225,302.225,343.725,251.125,347.025z M248.025,299.625c-33.4,2.1-61-25.4-58.8-58.8c1.7-27.6,24.1-49.9,51.7-51.7
		c33.4-2.1,61,25.4,58.8,58.8C297.925,275.625,275.525,297.925,248.025,299.625z"
                      fill="#052460"
                      data-original="#000000"
                    ></path>
                  </g>
                </g>
              </svg>
            ) : (
              <svg
                version="1.1"
                x="0"
                y="0"
                viewBox="0 0 32 32"
                style={{ enableBackground: "new 0 0 512 512" }}
              >
                <g>
                  <path
                    d="m26.707 5.293a1 1 0 0 0 -1.414 0l-3.174 3.174a14.471 14.471 0 0 0 -6.119-1.467c-8.126 0-14.519 8.041-14.787 8.383a1 1 0 0 0 0 1.234 27.724 27.724 0 0 0 6.823 5.933l-2.743 2.743a1 1 0 1 0 1.414 1.414l20-20a1 1 0 0 0 0-1.414zm-15.707 10.707a5.006 5.006 0 0 1 5-5 4.892 4.892 0 0 1 2.73.856l-6.874 6.874a4.892 4.892 0 0 1 -.856-2.73z"
                    fill="#757575"
                    data-original="#000000"
                  ></path>
                  <path
                    d="m30.787 15.383a27.937 27.937 0 0 0 -5.116-4.812l-4.741 4.741a4.874 4.874 0 0 1 .07.688 5.006 5.006 0 0 1 -5 5 4.874 4.874 0 0 1 -.688-.07l-3.4 3.4a13.529 13.529 0 0 0 4.088.67c8.126 0 14.519-8.041 14.787-8.383a1 1 0 0 0 0-1.234z"
                    fill="#757575"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
            )}
          </div>
        </div>
      ) : (
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
      )}

      {isError && <span className="rc_message warning">{errorMessage}</span>}
    </div>
  );
}
