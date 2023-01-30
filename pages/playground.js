import PageHead from "../components/PageHead";
import Page from "../components/Page";
import { useEffect, useState } from "react";
import Alert from "./../components/Alert";
import { useRouter } from "next/router";
import PreviewModal from "../components/PreviewModal";

export default function Playground() {
  const [profileJson, setProfileJson] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();
  const [gitUsername, setGitUsername] = useState("");
  const [previewModalState, setPreviewModalState] = useState(false);

  useEffect(() => {
    handleInitialData();
  }, []);

  const handleInitialData = () => {
    let userPreviewData = localStorage.getItem("PREVIEW_PROFILE_DATA");
    if (userPreviewData) {
      let parsedJson = JSON.parse(userPreviewData);
      let parsedJsonCopy = { ...parsedJson };
      delete parsedJsonCopy["username"];
      let formattedJson = JSON.stringify(parsedJsonCopy, undefined, 4);
      setProfileJson(formattedJson);
      setGitUsername(parsedJson?.username);
    } else {
      setProfileJson("");
      setGitUsername("");
    }
  };

  const handleValidateJson = () => {
    try {
      if (profileJson) {
        let parsedJson = JSON.parse(profileJson);
        setSuccessMsg("Valid Json");
        setErrMsg("");
      }
      return true;
    } catch (err) {
      setErrMsg(err.toString());
      setSuccessMsg("");
      return false;
    }
  };

  const handleFormatJson = () => {
    try {
      if (profileJson) {
        let parsedJson = JSON.parse(profileJson);
        let formattedJson = JSON.stringify(parsedJson, undefined, 4);
        setProfileJson(formattedJson);
        setErrMsg("");
      }
    } catch (err) {
      setErrMsg(err.toString());
      setSuccessMsg("");
    }
  };

  const handleReset = () => {
    localStorage.removeItem("PREVIEW_PROFILE_DATA");
    setSuccessMsg("");
    setErrMsg("");
    handleInitialData();
  };

  const handlePreview = () => {
    try {
      if (!profileJson) {
        setErrMsg("Profile json required");
        setSuccessMsg("");
      }
      if (!gitUsername) {
        setErrMsg("Github username required");
        setSuccessMsg("");
      }

      if (gitUsername && profileJson && handleValidateJson()) {
        setErrMsg("");
        let actualJson = { username: gitUsername, ...JSON.parse(profileJson) };
        actualJson = JSON.stringify(actualJson);
        console.log(actualJson);
        localStorage.setItem("PREVIEW_PROFILE_DATA", actualJson);
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
        <p>Enter github username, profile json below and preview how it will actually look</p>
        <input
          type="text"
          placeholder="Enter github username"
          className="mt-4 border-2 hover:border-orange-600 transition-all duration-250 ease-linear rounded px-6 py-2 mb-4 block w-full"
          name="githubUsername"
          value={gitUsername}
          onChange={(e) => setGitUsername(e.target.value)}
        />
        <textarea
          placeholder="Enter profile json"
          className="mt-4 h-80 border-2 hover:border-orange-600 transition-all duration-250 ease-linear rounded px-6 py-2 mb-4 block w-full"
          name="profileJson"
          value={profileJson}
          onChange={(e) => setProfileJson(e.target.value)}
        />
        <div className="flex flex-row justify-end mb-3">
          <span className="mr-3 cursor-pointer" onClick={handleReset}>
            Reset
          </span>
          <span className="mr-3 cursor-pointer" onClick={handleValidateJson}>
            Validate
          </span>
          <span className="mr-3 cursor-pointer" onClick={handleFormatJson}>
            Format
          </span>
          <span className="cursor-pointer" onClick={handlePreview}>
            Preview
          </span>
        </div>
        {errMsg && <Alert type="error" message={errMsg} />}
        {successMsg && <Alert type="success" message={successMsg} />}
        <PreviewModal
          isOpen={previewModalState}
          toggle={() => setPreviewModalState(!previewModalState)}
        />
      </Page>
    </>
  );
}
