import React, { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "urql";
import alertAndLoaders from "utils/alertAndLoaders";
import { ADD_MONTHLY_UPLOAD_HISTORY } from "apis/queries";

function ConfirmationDialogRaw({ onClose, value: valueProp, open, optionList,mutation, ...other }) {
  const radioGroupRef = useRef(null);
  const [addMontlyPlannerResults, addMonthlyPlanner] = useMutation(mutation);
  const store = useSelector((store) => store.monthlyPlanner);
  const userStore = useSelector((store) => store.userRoles);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const [addMonthlyUploadHistoryResult, addMonthlyUploadHistory] = useMutation(
    ADD_MONTHLY_UPLOAD_HISTORY
  );

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  useEffect(() => {
    if (!open) {
      setValue(""); // Clear the value when the dialog is closed
    }
  }, [open]);

  const handleEntering = useCallback(() => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  }, []);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleOk = useCallback(() => {
    const [vendorName, vendorCode] = value.split("-");
    if(vendorName){
        addMonthlyPlanner({
            partCode: store.detailsToPush.partCode,
            partName: store.detailsToPush.partName,
            vendorDetails: JSON.stringify({ vendorName, vendorCode }),
            status: 1,
            month:store.date.month
          }).then((res) => {
            if (res.error) {
              console.log(res.error);
              alertAndLoaders("UNSHOW_ALERT", dispatch, "Something went wrong.", "error");
            } else if (res.data) {
                addMonthlyUploadHistory({
                    partCode:store.detailsToPush.partCode,
                    description:`Successfully added in ${store.testName} test`,
                    status: "success",
                    empCode: userStore.empCode,
                  }).then((res)=>{
                      if(res.error){
                          console.log(res.error)
                      }else if(res.data){
                        alertAndLoaders("UNSHOW_ALERT", dispatch, "Successfully added monthly planner.", "success");
                      }
                  })
            }
          });
         
        //   alert(JSON.stringify(store.detailsToPush) + JSON.stringify({ vendorName, vendorCode }));
          onClose(value);
    }else{
        alertAndLoaders("UNSHOW_ALERT", dispatch, "Please Select Vendor Name.", "warning");
    }

  }, [addMontlyPlannerResults,dispatch, onClose, store.detailsToPush, value]);

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Select vendors.</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {optionList.map((option) => (
            <FormControlLabel
              value={` ${option.vendorName} - ${option.vendorCode}`}
              key={option.vendorCode}
              control={<Radio />}
              label={`${option.vendorName} ${option.vendorCode}`}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  optionList: PropTypes.array.isRequired,
  mutation:PropTypes.string.isRequired
};

function DialogSelectComponent({ open, setOpen, option, setOption, mutation, }) {
  const handleClose = useCallback(
    (newValue) => {
      setOpen(false);
      setOption([]);
      if (newValue) {
        setValue(newValue);
      }
    },
    [setOpen, setOption]
  );

  const [value, setValue] = React.useState("");

  return (
    <List component="div" role="group">
      <ConfirmationDialogRaw
        id="ringtone-menu"
        keepMounted
        open={open}
        optionList={option}
        onClose={handleClose}
        value={value}
        mutation={mutation}
      />
    </List>
  );
}

export default React.memo(DialogSelectComponent)

