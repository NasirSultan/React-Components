// ZoomMtg.jsx
import { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";

// Zoom SDK Setup
ZoomMtg.setZoomJSLib("https://source.zoom.us/2.17.0/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

const ZoomMtgComponent = ({ meetingNumber, password, userName, signature, sdkKey }) => {
  useEffect(() => {
    ZoomMtg.init({
      leaveUrl: "http://localhost:3000",
      success: () => {
        ZoomMtg.join({
          signature,
          sdkKey,
          meetingNumber,
          password,
          userName,
          success: () => console.log("Zoom meeting joined"),
          error: (error) => console.error("Zoom join error", error),
        });
      },
      error: (error) => console.error("Zoom init error", error),
    });
  }, []);

  return <div id="zmmtg-root"></div>;
};

export default ZoomMtgComponent;
