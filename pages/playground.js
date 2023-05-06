import { useState } from "react";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Alert from "@components/Alert";
import Button from "@components/Button";
import PreviewModal from "@components/modals/ProfilePreview";
import Input from "@components/form/Input";

export default function Playground() {
  const defaultJson = `{
    "name": "Your Name",
    "type": "personal",
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
