import * as alertAction from "../reduxSlices/alert";
function alertAndLoaders(showLoader,dispatch,message,color) {
  if (showLoader === "UNSHOW_ALERT") {
      dispatch(alertAction.setLoader(false));
      dispatch(
        alertAction.setAlertData({
          message,
          show: true,
          color,
        })
      );
    setTimeout(() => {
      dispatch(alertAction.setAlertData({ show: false }));
    }, 4000);
  } else if (showLoader === "SHOW_ALERT") {
    dispatch(alertAction.setLoader(true));
  }
}

export default alertAndLoaders;
