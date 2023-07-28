import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 PRO React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 PRO React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 PRO React routes
import routes from "./routes/routes";
import operatorRoutes from "routes/operator";
import superUserRoutes from "routes/superuser";

// Material Dashboard 2 PRO React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import heroLogo from "assets/images/logos/logo192.png";

// urql imports
import { Client, Provider, defaultExchanges, subscriptionExchange } from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { devtoolsExchange } from '@urql/devtools';
import UserContext from "layouts/pages/userContext";
import {useSelector} from "react-redux";

// graphql url
const senseopsHTTPServerURL = "http://127.0.0.1:5052/graphql";
const senseopsWSServerURL = "ws://127.0.0.1:5052/graphql";
// const hmclHTTPServerURL = "http://192.168.84.45:5000/graphql";
// const hmclWSServerURL = "ws://192.168.84.45:5000/graphql";


export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const userRoles = useSelector((store)=>{
    return store.userRoles
  });

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
  allRoutes.map((route) => {
    if (route.collapse) {
      return getRoutes(route.collapse);
    }

    if (route.route) {
      return <Route exact path={route.route} element={route.component} key={route.key} />;
    }

    return null;
  });
function authorizeUser() {
    let user = userRoles.roles
    if(user === 1){
      return {
        fun:getRoutes(routes),
        route:routes,
        location:"/dashboards/main-dashboard"
      }
    }
    else if(user === 2){
      return {
        fun:getRoutes(operatorRoutes),
        route:operatorRoutes,
        location:"/dashboards/main-dashboard"
      }
    }else{
      return {
        fun:getRoutes(superUserRoutes),
        route:superUserRoutes,
        location:"/dashboards/main-dashboard"
      }
    }
  }

    // urql client
    const subscriptionClient = new SubscriptionClient(senseopsWSServerURL, {
      reconnect: true,
    });
  
    const client = new Client({
      url: senseopsHTTPServerURL,
      exchanges: [
        devtoolsExchange,
        ...defaultExchanges,
        subscriptionExchange({
          forwardSubscription: (operation) => subscriptionClient.request(operation),
        }),
      ],
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return direction === "rtl" ? (
    <Provider value={client}>
    <UserContext.Provider value={{ name: 'abc' }}>
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? heroLogo : heroLogo}
              brandName="logo"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/authentication/sign-in/basic" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
    </UserContext.Provider>
    </Provider>
  ) : (
    <Provider value={client}>
    <UserContext.Provider value={{ name: 'abc' }}>
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? heroLogo : heroLogo}
            brandName="CRVT LAB"
            routes={authorizeUser().route}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {/* {configsButton} */}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
      {authorizeUser().fun}
        <Route path="*" element={<Navigate to={authorizeUser().location} />} />
      </Routes>
    </ThemeProvider>
    </UserContext.Provider>
    </Provider>
  );
}
