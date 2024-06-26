import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SignupForm from "../SignupForm";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import SubscriptionForm from "../SubscriptionForm";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {xs: 300, sm: 500, md:600},
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "14px",
  p: {xs: 1, sm:2, md: 4},
};

export default function SubscriptionPopover() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleBack = () => {
    setValue("1");
  };

  const handleForward = () => {
    setValue("2");
  };
  return (
    <div>
      <div className="flex flex-col gap-2 p-2 sm:p-4 rounded-lg bg-black sm:h-36 md:h-32">
        <Button
          onClick={handleOpen}
          sx={{
            padding: {xs: "1px 2px", sm:"1px 2px", md:"4px 8px"},
            background: "white",
            borderRadius: "8px",
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            fontSize: { xs: '12px', sm: '14px', md: '16px' },
            fontWeight: 800,
            "&:hover": {
              background: "rgba(255, 255, 255, 0.9)",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -2px",
            },
          }}
        >
          Subscription
        </Button>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: '12px', sm: '14px', md: '16px' },
            fontWeight: 600,
            padding: { xs: '1px', sm: '2px', md: '4px' },
            color: "white",
            minWidth:  { xs: '50px', sm: '100px', md: '300px' },
          }}
        >
          To get weather information daily
        </Typography>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Sign-up" value="1" sx={{ fontWeight: 800 }} />
                <Tab label="subscribe" value="2" sx={{ fontWeight: 800 }} />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{padding: {xs:"5px", sm:"10px", md:"24px"}}}>
              <SignupForm handleForward={handleForward}/>
            </TabPanel>
            <TabPanel value="2" sx={{padding: {xs:"5px", sm:"10px", md:"24px"}}}>
              <SubscriptionForm handleBack={handleBack} />
            </TabPanel>
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
}
