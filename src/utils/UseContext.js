import React from "react";
import { createContext } from "react";

const UserContext=createContext({
    group:{
        flag:false,
        status:false,
        name:false,
        priority:false,

    },
    order:{
        flag:false,
        priority:false,
        title:false
    }
})
export default UserContext;