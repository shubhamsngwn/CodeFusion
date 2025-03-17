import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useNavigate } from "react-router-dom";
import JitsiNavbar from "./JitsiNavbar";

const Jitsi = () => {
  return (
    <div>
      <JitsiNavbar />
      <JitsiMeeting
        roomName="YourUniqueRoomName"
        configOverwrite={{
          startWithAudioMuted: true,
          startWithVideoMuted: true,
        }}
        userInfo={{
          displayName: "Shubham",
        }}
        getIFrameRef = { iframeRef => { iframeRef.style.height = '650px'; } }
      />
    </div>
  );
};

export default Jitsi;
