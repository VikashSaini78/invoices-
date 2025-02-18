import { useEffect } from "react";

function Getdata() {
  useEffect(() => {
    fetch("http://etour.responseinfoway.com/restapi/updatedata.aspx", {
      mode: "no-cors"
    })
      .then(res => console.log(res))
      .catch(err => console.error("Fetch error:", err));
    
  }, []); 

  return


 
}

export default Getdata;
