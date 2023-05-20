import { useState } from "react";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Button from "@components/Button";
import Modal from "@components/Modal";
import Input from "@components/form/Input";
import UserPage from "@components/user/UserPage";
import Notification from "@components/Notification";

export default function Playground() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const defaultJson = `{
    "name": "Your Name",
    "bio": "Write a short bio about yourself",
    "links": [
      {
        "name": "Follow on Twitter",
        "url": "https://twitter.com/yourusername",
        "icon": "FaTwitter"
      }
    ]
  }`;
  const [profileJson, setProfileJson] = useState(defaultJson);
  const [validateComplete, setValidateComplete] = useState(false);
  const [formatComplete, setFormatComplete] = useState(false);
  const [errorMessage, setErrMsg] = useState("");
  const [successMessage, setSuccessMsg] = useState("");
  const [gitUsername, setGitUsername] = useState("");
  const [previewModalState, setPreviewModalState] = useState(false);
  const [previewModalData, setPreviewModalData] = useState();
  const [showNotification, setShowNotification] = useState(false);

  const handleValidateJson = () => {
    try {
      JSON.parse(profileJson);
      setSuccessMsg("Valid Json");
      setErrMsg("");
      setValidateComplete(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1500);
      return true;
    } catch (err) {
      setErrMsg(err.toString());
      setError(true);
      setSuccessMsg("");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1500);
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
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1500);
    }
  };

  const handlePreview = () => {
    if (!gitUsername) {
      setErrMsg("Github username required");
      setSuccessMsg("");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1500);
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
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1500);
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

        {errorMessage && (
          <Notification
            show={showNotification}
            type="error"
            onClose={() => setShowNotification(false)}
            message={errorMessage}
          />
        )}
        {successMessage && (
          <Notification
            show={showNotification}
            type="success"
            onClose={() => setShowNotification(false)}
            message={successMessage}
          />
        )}

        <Input
          name="username"
          label="Enter github username, profile json below and preview how it will
          actually look"
          value={gitUsername}
          placeholder="Enter github username"
          onChange={(e) => setGitUsername(e.target.value)}
        />

        <label htmlFor="profileJson" className="mt-4 mb-3">
          Your Profile Json
        </label>
        <textarea
          className="h-80 dark:bg-primary-high dark:text-white border-2 hover:border-tertiary-medium focus:ring-0 focus:border-tertiary-medium focus:outline-0 transition-all duration-250 ease-linear rounded px-6 py-2 mb-4 block w-full"
          id="profileJson"
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

        <Modal
          title="Profile Preview (note: new links will not be clickable)"
          show={previewModalState}
          setShow={setPreviewModalState}
        >
          <UserPage data={previewModalData} BASE_URL={BASE_URL} />
        </Modal>
      </Page>
    </>
  );
}
