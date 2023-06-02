import React from "react";
import "./index.css"

function MDAwsomeButton({name,onPress}){
    return(
        <>
        <button class="button-30" role="button" onClick={onPress}>{name}</button>
        </>
    )
}

export default MDAwsomeButton