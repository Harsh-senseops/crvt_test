import React from "react";
import { useQuery } from "urql";

export default function useCustomQuery(query){
    let [result,setResult] = React.useState("")
    const [res] = useQuery({
        query
    })
    React.useEffect(()=>{
        if(res.data){
            setResult(res.data)
        }
    },[res])
   if(result !== 0){
    return result
   }
}