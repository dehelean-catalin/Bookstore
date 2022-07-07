import React from "react";

export const AuthContext = React.createContext({ authenticationHandler: () => {}, authenticationToken: "" });
