import { useState } from "react";


import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Alert from "@components/Alert";
import Button from "@components/Button";
import PreviewModal from "@components/modals/ProfilePreview";
import EventPreviewModal from "@components/modals/EventPreview";
import Input from "@components/form/input";


export default function Playground() {
 const [profileJson, setProfileJson] = useState("");
 const [eventJson, setEventJson] = useState("");
 const [validateComplete, setValidateComplete] = useState(false);
 const [validateEventComplete, setValidateEventComplete] = useState(false);
 const [formatComplete, setFormatComplete] = useState(false);
 const [formatEventComplete, setFormatEventComplete] = useState(false);
 const [errorMessage, setErrMsg] = useState("");
 const [errorEventMessage, setEventErrMsg] = useState("");
 const [successMessage, setSuccessMsg] = useState("");
 const [successEventMessage, setSuccessEventMsg] = useState("");
 const [gitUsername, setGitUsername] = useState("");
 const [previewModalState, setPreviewModalState] = useState(false);
 const [previewEventModalState, setPreviewEventModalState] = useState(false);
 const [previewModalData, setPreviewModalData] = useState();
 const [previewEventModalData, setEventPreviewModalData] = useState();




 const handleValidateJson = () => {
   try {
     JSON.parse(profileJson);
     setSuccessMsg("Valid Json");
     setErrMsg("");
     setValidateComplete(true);
     return true;
   } catch (err) {
     setErrMsg(err.toString());
     setError(true);
     setSuccessMsg("");
     return false;
   }
 };


 const handleValidateEventJson = () => {
   try {
     JSON.parse(eventJson);
     setSuccessEventMsg("Valid Json");
     setEventErrMsg("");
     setValidateEventComplete(true);
     return true;
   } catch (err) {
     setEventErrMsg(err.toString());
     setError(true);
     setSuccessEventMsg("");
     return false;
   }
 };


 const handleFormatJson = () => {
   try {
     let parsedJson = JSON.parse(profileJson);
     let formattedJson = JSON.stringify(parsedJson, undefined, 4);
     setProfileJson(formattedJson);
     setErrMsg("");
     setFormatComplete(true);
   } catch (err) {
     setErrMsg(err.toString());
     setSuccessMsg("");
   }
 };


 const handleFormatEventJson = () => {
   try {
     let parsedJson = JSON.parse(eventJson);
     let formattedJson = JSON.stringify(parsedJson, undefined, 4);
     setEventJson(formattedJson);
     setEventErrMsg("");
     setFormatEventComplete(true);
   } catch (err) {
     setEventErrMsg(err.toString());
     setSuccessEventMsg("");
   }
 };


 const handlePreview = () => {
   if (!gitUsername) {
     setErrMsg("Github username required");
     setSuccessMsg("");
   }


   try {
     if (gitUsername && profileJson && handleValidateJson()) {
       setErrMsg("");
       let actualJson = { username: gitUsername, ...JSON.parse(profileJson) };
       delete actualJson.testimonials;
       setPreviewModalData(actualJson);
       setPreviewModalState(true);
     }
   } catch (err) {
     setErrMsg(err.toString());
     setSuccessMsg("");
   }
 };


 const handleEventPreview = () => {
   try {
      if (eventJson && handleValidateEventJson()) {
        console.log(eventJson)
       setEventErrMsg("");
       let actualJson = {...JSON.parse(eventJson) };
       delete actualJson.testimonials;
       setEventPreviewModalData(actualJson);
       setPreviewEventModalState(true);
     }
   } catch (err) {
     setEventErrMsg(err.toString());
     setSuccessEventMsg("");
   }
 };

 
 return (
   <>
     <PageHead
       title="Playground"
       description="Playground for verifying and preview linkfree profile json"
     />


     <Page>
       <h1 className="text-2xl md:text-4xl mb-4 font-bold">Playground</h1>


       {errorMessage && <Alert type="error" message={errorMessage} />}
       {successMessage && <Alert type="success" message={successMessage} />}


       <p className="mt-4 mb-5">
         Enter github username, profile json and event json below and preview how it will
         actually look
       </p>
       <Input
         name={gitUsername}
         value={gitUsername}
         placeholder="Enter github username"
         onChange={(e) => setGitUsername(e.target.value)}
       />
       <p className="mt-4 mb-5">
         Enter Profile Json:
       </p>
       <textarea
         placeholder={`{          
           name: "user name",
           type: "personal",
           bio: "about the user",
           links: [
             {
               name: "Follow on Twitter",
               url: "https://twitter.com/username",
               icon: "FaTwitter",
             },
           ],
        }`}
         className="mt-4 h-80 border-2 hover:border-orange-600 transition-all duration-250 ease-linear rounded px-6 py-2 mb-4 block w-full"
         name="profileJson"
         value={profileJson}
         onChange={(e) => {
           setProfileJson(e.target.value);
           setFormatComplete(false);
           setValidateComplete(false);
           setSuccessMsg("");
           setErrMsg("");
         }}
       />
       <div className="flex flex-row justify-end mb-3 gap-2">
         {!formatComplete && (
           <Button text="Format" onClick={handleFormatJson} primary={false} />
         )}
         {formatComplete && !validateComplete && (
           <Button
             text="Validate"
             onClick={handleValidateJson}
             primary={false}
           />
         )}
         {formatComplete && validateComplete && (
           <Button text="Preview" onClick={handlePreview} primary={true} />
         )}
       </div>


       {previewModalData && previewModalState && (
         <PreviewModal
           toggle={() => setPreviewModalState(!previewModalState)}
           data={previewModalData}
         />
       )}
      <p className="mt-4 mb-5">
         Enter Event Json:
       </p>
       <textarea
         placeholder={`{
           "isVirtual": true,
           "isInPerson": true,
           "color": "red",
           "name": "Open Source GitHub reviews",
           "description": "In this livestream I will be going reviewing your **Open Source projects** and profiles! I will be joined by **Amanda**, a Developer Advocate.",
           "date": {
             "start": "2022-12-09T16:00:00.000+00:00",
             "end": "2022-12-09T17:00:00.000+00:00",
             "cfpClose": "2022-10-09T17:00:00.000+00:00"
           },
           "url": "https://www.youtube.com/watch?v=iqIFD02OkVE",
           "location": {
             "road": "Messe Berlin South Entrance & CityCube",
             "city": "Jafféstrasse",
             "state": "Berlin",
             "country": "Germany"
           }
         }`}
         className="mt-4 h-80 border-2 hover:border-orange-600 transition-all duration-250 ease-linear rounded px-6 py-2 mb-4 block w-full"
         name="eventJson"
         value={eventJson}
         onChange={(e) => {
           setEventJson(e.target.value);
           setFormatEventComplete(false);
           setValidateEventComplete(false);
           setSuccessEventMsg("");
           setEventErrMsg("");
         }}
       />
       <div className="flex flex-row justify-end mb-3 gap-2">
         {!formatEventComplete && (
           <Button text="Format" onClick={handleFormatEventJson} primary={false} />
         )}
         {formatEventComplete && !validateEventComplete && (
           <Button
             text="Validate"
             onClick={handleValidateEventJson}
             primary={false}
           />
         )}
         {formatEventComplete && validateEventComplete && (
           <Button text="Preview" onClick={handleEventPreview} primary={true} />
         )}
       </div>


       {previewEventModalData && previewEventModalState && (
         <EventPreviewModal
           toggle={() => setPreviewEventModalState(!previewEventModalState)}
           data={previewEventModalData}
         />
       )}
     </Page>
   </>
 );
}



