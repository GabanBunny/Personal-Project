import React, { useEffect } from "react";
export const AddUserForm = ({
  setButtonClicked,
  setAddUserStatus,
  addUserStatus,
}) => {
  const backgroundColor = "#00C853";
  const cancelButton = 30;
  const inputStyle = {
    fontSize: "12px",
    borderRadius: 20,
    width: 150,
    border: "1px solid silver",
    paddingLeft: "3px" /* Optional: add padding for better appearance */,
  };
  const inputDiv = {
    display: "flex",
    flexDirection: "column",
  };
  const groupInput = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: "10px",
  };

  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const validateForm = () => {
    const { username, password, firstName, lastName, email, role } = formData;

    return (
      username.trim() != "" &&
      password.trim() != "" &&
      firstName.trim() != "" &&
      lastName.trim() != "" &&
      email.trim() != "" &&
      role.trim() != ""
    );
  };

  const [isPasswordShown, setIsPasswordShown] = React.useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const SaveCreateUserInfo = async (formData) => {
    const endpoint = "/api/create/new/user";
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch(endpoint, settings);
      if (response.ok) {
        const data = await response.json();
        setAddUserStatus(true);
      } else {
        setAddUserStatus(false);
        console.error("Failed to create new user");
      }
    } catch (error) {
      console.error("Error creating new user");
    }
  };

  const [isPassWordStrong, setIsPasswordStrong] = React.useState(null);

  const CheckPassWordStrong = (password) => {
    const oneLowerCase = /^(?=.*[a-z])/.test(password);
    const oneUpperCase = /(?=.*[A-Z])/.test(password);
    const containOneDigit = /(?=.*\d)/.test(password);
    const oneSpecialChar = /(?=.*[@$!%*?&])/.test(password);
    const password8Char = /[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if (!oneLowerCase) return "oneLowerCase";
    if (!oneUpperCase) return "oneUpperCase";
    if (!containOneDigit) return "containOneDigit";
    if (!oneSpecialChar) return "oneSpecialChar";
    if (!password8Char) return "password8Char";
    if (
      oneLowerCase &&
      oneUpperCase &&
      containOneDigit &&
      oneSpecialChar &&
      password8Char
    ) {
      return true;
    }
  };

  useEffect(() => {
    if (addUserStatus !== null) {
      const timeout = setTimeout(() => {
        setAddUserStatus(null); // Reset to null after 5 seconds
      }, 1500);

      return () => clearTimeout(timeout); // Cleanup timeout on component unmount or state change
    }
  }, [addUserStatus]);

  return (
    <div
      style={{
        display: "flex",
        justifySelf: "center",
        alignSelf: "center",
        position: "absolute",
        top: "200px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "400px",
        height: "300px",
        backgroundColor: "white",
        zIndex: 5,
        fontSize: "50px",
        borderRadius: 20,
      }}
    >
      {/* Form div */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "250px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Close form div */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "50px",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: backgroundColor,
          }}
        >
          <div
            style={{
              fontSize: 30,
              color: "white",
              margin: 15,
            }}
          >
            Create New User
          </div>

          {/* Close form button */}
          <button
            style={{
              width: cancelButton,
              height: cancelButton,
              backgroundColor: "transparent",
              border: "none",
              alignSelf: "flex-start",
              margin: 5,
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.backgroundColor = "#009E43")
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#009E43";
            }}
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            onClick={() => {
              setButtonClicked(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={cancelButton}
              height={cancelButton}
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#c80010"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
              />
            </svg>
          </button>
        </div>
        {/* Check Strong password */}
        {isPassWordStrong !== true && (
          <ul
            style={{
              margin: "10px",
              backgroundColor: "#fedce0",
              borderRadius: "5px",
              color: "#8e2b25",
              listStyle: "none",
              fontSize: "13.5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ padding: "10px" }}>
              {isPassWordStrong === "oneLowerCase" && (
                <li>Password must contain at least one lowercase letter</li>
              )}
              {isPassWordStrong === "oneUpperCase" && (
                <li>Password must contain at least one uppercase letter</li>
              )}
              {isPassWordStrong === "containOneDigit" && (
                <li>Password must contain at least one digit</li>
              )}
              {isPassWordStrong === "oneSpecialChar" && (
                <li>Password must contain at least one special character</li>
              )}
              {isPassWordStrong === "password8Char" && (
                <li>Password must be at least 8 characters long</li>
              )}
            </div>
          </ul>
        )}
        {/* Middle part */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); //Prevent the page reload
          }}
          style={{
            fontSize: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Log in status */}
          {addUserStatus !== null ? (
            addUserStatus ? (
              <div
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                }}
              >
                <div style={{ backgroundColor: "#32a836", borderRadius: 20 }}>
                  <div
                    style={{
                      paddingRight: 10,
                      paddingLeft: 10,
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                  >
                    Success
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                }}
              >
                <div style={{ backgroundColor: "#8e2b25", borderRadius: 20 }}>
                  <div
                    style={{
                      paddingRight: 10,
                      paddingLeft: 10,
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                  >
                    Failed
                  </div>
                </div>
              </div>
            )
          ) : null}

          {/* Group 1 */}
          <div style={groupInput}>
            <div style={inputDiv}>
              Username
              <input
                name="username"
                value={formData.username}
                onChange={handleInput}
                style={inputStyle}
                required
                placeholder="Enter your username"
              />
            </div>
            <div style={{ ...inputDiv }}>
              Password
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "0.5px solid silver",
                  borderRadius: "20px",
                  height: "23px",
                }}
              >
                <input
                  type={isPasswordShown ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    setIsPasswordStrong(CheckPassWordStrong(e.target.value));
                    handleInput(e);
                  }}
                  style={{
                    ...inputStyle,
                    width: "125px",
                    border: "none",
                    outline: "none",
                  }}
                  required
                  placeholder="Enter your password"
                />
                {isPasswordShown ? (
                  // Hide password
                  <button
                    onClick={() => setIsPasswordShown(false)}
                    style={{
                      width: "25px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#black"
                        d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"
                      />
                    </svg>
                  </button>
                ) : (
                  // Show password
                  <button
                    onClick={() => setIsPasswordShown(true)}
                    style={{
                      width: "25px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="black"
                        d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Group 2 */}
          <div style={groupInput}>
            <div style={inputDiv}>
              First name
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInput}
                style={inputStyle}
                required
                placeholder="Enter your first name"
              />
            </div>
            <div style={inputDiv}>
              Last name
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInput}
                style={inputStyle}
                required
                placeholder="Enter your last name"
              />
            </div>
          </div>
          {/* Group 3 */}
          <div style={groupInput}>
            <div style={inputDiv}>
              Email
              <input
                name="email"
                value={formData.email}
                onChange={handleInput}
                style={inputStyle}
                type="email"
                required
                placeholder="Enter your email"
              />
            </div>
            <div style={inputDiv}>
              Role
              <select
                name="role"
                value={formData.role}
                onChange={handleInput}
                style={{
                  ...inputStyle,
                  height: "20px",
                  fontSize: 13,
                  padding: 0,
                  paddingLeft: 10,
                }}
              >
                <option></option>
                <option>admin</option>
                <option>user</option>
              </select>
            </div>
          </div>
          {/* Create button div*/}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              backgroundColor: "#ededed ",
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          >
            <button
              onClick={async () => {
                if (validateForm()) {
                  await SaveCreateUserInfo(formData);
                }
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.backgroundColor = "#009E43")
              }
              onMouseUp={(e) =>
                (e.currentTarget.style.backgroundColor = backgroundColor)
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#009E43";
              }}
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = backgroundColor)
              }
              style={{
                border: "solid",
                borderRadius: 20,
                borderWidth: 0.4,
                color: "white",
                backgroundColor: backgroundColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 100,
                margin: 10,
              }}
              type="submit"
            >
              <div style={{ margin: 7, fontSize: 20 }}>Create</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
