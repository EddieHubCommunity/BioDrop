import { useState } from "react";
import { PageHead, Page, Alert, Button, PreviewModal, Input } from "@components";


export default function Playground() {
  const [profileJson, setProfileJson] = useState("");
  const [validateComplete, setValidateComplete] = useState(false);
  const [formatComplete, setFormatComplete] = useState(false);
  const [errorMessage, setErrMsg] = useState("");
  const [successMessage, setSuccessMsg] = useState("");
  const [gitUsername, setGitUsername] = useState("");
  const [previewModalState, setPreviewModalState] = useState(false);
  const [previewModalData, setPreviewModalData] = useState();

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
          Enter github username, profile json below and preview how it will
          actually look
        </p>
        <Input
          name={gitUsername}
          value={gitUsername}
          placeholder="Enter github username"
          onChange={(e) => setGitUsername(e.target.value)}
        />
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
      </Page>
    </>
  );
}
