/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useQuery } from "urql";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { AUTH } from "apis/queries";
import jwt_decode from "jwt-decode";
import "./index.css";
import {useDispatch} from "react-redux";
import * as action from "../../../../reduxSlices/userRoles"

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [userName, setUserName] = useState('');
  const [msg, setMsg] = useState({ msg: "", color: "" });
  const [password, setPassword] = useState('');
  const [items, setItems] = useState(false);
  const [shouldPause,setShouldPause] = useState(true);
  const navigate = useNavigate();
  const [userResult, rexUserResult] = useQuery({
    query: AUTH,
    variables:{name:userName,password:password},
    pause: shouldPause,
  });
  const dispatch = useDispatch();
  const { data, fetching, error } = userResult;
  const [passIcon, setPassIcon] = useState(false);

  useEffect(() => {
    if (data) {
      let token = data.authenticate;
      const decoded = jwt_decode(token);
      localStorage.setItem("TOKEN_KEY", token);
      dispatch(action.setRoles(decoded.role));
      dispatch(action.setEmpcode(decoded.employee_code));
      setShouldPause(true);
      setMsg({ msg: "User Validated", color: "green" });
      navigate("/dashboards/main-dashboard");
    }
    if (error) {
      setMsg({ msg: "Incorrect user credentials", color: "red" });
    }
    if (fetching) {
      setMsg({msg: "Loading....", color: "#F7D060"});
    }
  }, [userResult]);

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserName(e.target.userName.value);
    setPassword(e.target.password.value);
    setShouldPause(false)
  }

  return (
    <BasicLayout>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="success"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white"mt={1}>
            Login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form" onSubmit={(e) => handleSubmit(e)}>
              <MDBox mb={2}>
                <MDInput type="text" label="User name" fullWidth name="userName" />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type={passIcon ? "text" : "password"} label="Password" name="password" fullWidth  InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password"
                  edge="end"
                  onClick={() => setPassIcon(!passIcon)}
                  color="white"
                  size="small"
                >
                  {passIcon ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }} />
                {msg.msg ? (
                  <span style={{ fontSize: "13px", marginLeft: "10px", color: `${msg.color}` }}>
                    {msg.msg}
                  </span>
                ) : (
                  ""
                )}
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton
                  class="button-30"
                  style={{ width: "100%" }}
                  variant="gradient"
                  color="info"
                  fullWidth
                  type="submit"
                >
                  Login
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  <MDTypography
                    // component={Link}
                    // to="/authentication/sign-up/cover"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Forgot password
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
