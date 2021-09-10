import React from "react";
import { Button } from "primereact/button";

function Links(){
    return (<div className="p-d-flex p-jc-center">
    <div className="p-d-flex p-flex-column" style={{ width: 70 + "%" }}>
      <Button className="p-p-3 p-m-2">
        <i className="pi pi-youtube p-px-2"></i>
        <span className="p-px-3">Youtube</span>
      </Button>
      <Button className="p-p-3 p-m-2">
        <i className="pi pi-twitter p-px-2"></i>
        <span className="p-px-3">Twitter</span>
      </Button>
    </div>
  </div>)
}

export default Links;