import React, { useEffect, useState, useContext } from "react";
import ChatRoom from "../chatRoom/ChatRoom";

export default function Parent() {
      return (
            <>
                  <h1>PARENT!!!!!</h1>
                  <ChatRoom />
            </>
      )
}