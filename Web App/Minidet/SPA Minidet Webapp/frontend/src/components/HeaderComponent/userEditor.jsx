import { values } from "lodash";
import React, { useEffect } from "react";
const cancelButton = 30;
const buttonStyle = {
  width: 60,
  height: cancelButton,
  backgroundColor: "transparent",
  borderRadius: "20px",
  border: "none",
  margin: 5,
};
import Location from "./Location";
const UserEditor = ({
  saveLogin,
  userData,
  setButtonClicked,
  setLocation,
  fetchData,
}) => {
  const [userDataModified, setUserDataModified] = React.useState(null);
  const [isEditing, setIstEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });

  const [hasEditPassword, setHasEditPassword] = React.useState(false);

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

  const [isPassWordStrong, setIsPasswordStrong] = React.useState(null);
  const [updateProfileStatus, setUpdateProfileStatus] = React.useState(false);

  const updateProfile = async (formData) => {
    const endpoint = `/api/user/update/profile`;
    const settings = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: saveLogin, formData: formData }),
    };

    try {
      const response = await fetch(endpoint, settings);
      if (response.ok) {
        const data = await response.json();
        setUpdateProfileStatus(data["Update user status"]);
      } else {
        console.error("Error from server, can't updating user profile");
      }
    } catch (error) {
      console.error("Error updating user profile", error);
    }
  };

  useEffect(() => {
    if (userData && typeof userData === "object") {
      setUserDataModified({
        userData: [
          // { key: "Username", value: userData.userData["username"] || "N/A" },
          { key: "Password", value: userData.userData["password"] || "N/A" },
          {
            key: "First name",
            value: userData.userData["first_name"] || "N/A",
          },
          { key: "Last name", value: userData.userData["last_name"] || "N/A" },
          { key: "Email", value: userData.userData["email"] || "N/A" },
          { key: "Role", value: userData.userData["role"] || "N/A" },
        ],
      });

      formData.username = userData.userData["username"];
      formData.password = userData.userData["password"];
      formData.first_name = userData.userData["first_name"];
      formData.last_name = userData.userData["last_name"];
      formData.email = userData.userData["email"];
      formData.role = userData.userData["role"];
    }
  }, [userData]);

  return (
    <div
      style={{
        position: "fixed",
        top: "200px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "400px",
        height: isPassWordStrong ? "350px" : "325px",
        border: "solid",
        borderWidth: 0.2,
        zIndex: 5,
        fontSize: "30px",
        borderRadius: 20,
        backgroundColor: "white",
        height: "auto",
      }}
    >
      {/* Content */}
      <div
        style={{
          fontWeight: "bold",
          padding: "10px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {saveLogin}
          </div>

          {updateProfileStatus != false && (
            <div
              style={{
                backgroundColor: "#32a836",
                borderRadius: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "auto",
              }}
            >
              <div
                style={{
                  paddingRight: 10,
                  paddingLeft: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                  textAlign: "center",
                }}
              >
                {updateProfileStatus}
              </div>
            </div>
          )}
          {isPassWordStrong !== null &&
            isPassWordStrong !== true &&
            isPassWordStrong && (
              <ul
                style={{
                  backgroundColor: "#fedce0",
                  borderRadius: "5px",
                  color: "#8e2b25",
                  padding: 5,
                  listStyle: "none",
                  fontSize: "13.5px",
                }}
              >
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
              </ul>
            )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingLeft: "15px",
              fontSize: "22px",
              fontWeight: "normal",
              marginBottom: "-15px",
            }}
          >
            <div>Location:</div>
            <select
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              style={{
                width: "auto", // or 'fit-content' in modern browsers
              }}
            >
              {Location.map((item) => (
                <option key={item.city}>
                  {item.region}/{item.city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {userDataModified && userDataModified.userData ? (
        userDataModified.userData.map(({ key, value }, index) => {
          const formKey = key.toLowerCase().replace(" ", "_");
          return (
            <div
              style={{
                paddingLeft: "25px",
                paddingRight: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "20px",
              }}
              key={key}
            >
              {/* Editing interface */}
              {isEditing === key ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div> {key}:</div>
                  <div>
                    <input
                      onChange={(e) => {
                        // Display on edit
                        setFormData((prev) => ({
                          ...prev,
                          [formKey]: e.target.value,
                        })); // Display on save
                        if (key == "Password") {
                          setIsPasswordStrong(
                            CheckPassWordStrong(e.target.value)
                          );
                          setHasEditPassword(true);
                        } else {
                          userDataModified.userData[index].value =
                            e.target.value;
                        }
                      }}
                      style={{
                        marginLeft: "5px",
                        border: "none",
                        outline: "none", //remove outline when clicked
                        borderRadius: "5px",
                        width: "200px",
                        height: "24px",
                      }}
                      type="text"
                      value={formData[formKey]}
                    />
                  </div>
                </div>
              ) : (
                // Normal interface
                <div>
                  {key}: {value}
                </div>
              )}

              {/* Edit icon */}
              <button
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "20px",
                  border: "none",
                  margin: 5,
                }}
                onMouseDown={(e) =>
                  (e.currentTarget.style.backgroundColor = "#d3d3d3")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#d3d3d3";
                }}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                onClick={(e) => {
                  setIstEditing(isEditing === null ? key : null);
                  if (isPassWordStrong === true) {
                    userDataModified.userData[index].value =
                      formData[key.toLowerCase().replace(" ", "_")];
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="#000"
                      d="M13 3a1 1 0 0 1 .117 1.993L13 5H5v14h14v-8a1 1 0 0 1 1.993-.117L21 11v8a2 2 0 0 1-1.85 1.995L19 21H5a2 2 0 0 1-1.995-1.85L3 19V5a2 2 0 0 1 1.85-1.995L5 3zm6.243.343a1 1 0 0 1 1.497 1.32l-.083.095l-9.9 9.899a1 1 0 0 1-1.497-1.32l.083-.094z"
                    />
                  </g>
                </svg>
              </button>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: "20px",
        }}
      >
        <button
          style={buttonStyle}
          onMouseDown={(e) =>
            (e.currentTarget.style.backgroundColor = "#d3d3d3")
          }
          onMouseUp={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#d3d3d3";
          }}
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
          onClick={() => {
            setButtonClicked(false);
          }}
        >
          Cancel
        </button>
        <button
          style={buttonStyle}
          onMouseDown={(e) =>
            (e.currentTarget.style.backgroundColor = "#d3d3d3")
          }
          onMouseUp={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#d3d3d3";
          }}
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
          onClick={() => {
            if (hasEditPassword) {
              if (isPassWordStrong === true) {
                updateProfile(formData);
              }
            } else {
              updateProfile(formData);
            }
            fetchData();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UserEditor;
