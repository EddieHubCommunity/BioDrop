import { useState } from "react";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Button from "@components/Button";
import Modal from "@components/Modal";
import Input from "@components/form/Input";
import UserPage from "@components/user/UserPage";
import Notification from "@components/Notification";
import { clientEnv } from "@config/schemas/clientSchema";
import {
  profileSchema,
  usernameSchema,
} from "@config/schemas/jsonProfileSchemas";
import * as z from "zod";
import { PROJECT_NAME } from "@constants/index";

export async function getServerSideProps() {
  return {
    props: { BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL },
  };
}

export default function Playground({ BASE_URL }) {
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
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMsg] = useState("");
  const [gitUsername, setGitUsername] = useState("");
  const [previewModalState, setPreviewModalState] = useState(false);
  const [previewModalData, setPreviewModalData] = useState();
  const [showNotification, setShowNotification] = useState(false);

  const handleValidateJson = () => {
    setErrors([]);
    try {
      const parsedProfile = JSON.parse(profileJson);
      profileSchema.parse(parsedProfile);
      setSuccessMsg("Valid Json");
      setErrMsg("");
      setValidateComplete(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1500);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError || z.ZodError.create(err).errors) {
        setErrMsg("Invalid JSON. Please check the errors below.");
        setErrors(err.errors);
      } else {
        setErrMsg(err.toString());
      }
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
    setErrors([]);
    try {
      usernameSchema.parse(gitUsername);
    } catch (e) {
      const errors = [...e.errors];
      errors[0].path = ["GitHub username"];
      setErrMsg("GitHub username required");
      setErrors(e.errors);
      setSuccessMsg("");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1500);
      return false;
    }

    try {
      if (gitUsername && profileJson && handleValidateJson()) {
        setErrMsg("");
        let actualJson = { username: gitUsername, ...JSON.parse(profileJson) };
        actualJson.testimonials = actualJson.testimonials || [];
        actualJson.socials = actualJson.socials || [];
        setPreviewModalData(actualJson);
        setPreviewModalState(true);
      }
    } catch (e) {
      setErrMsg(e.toString());
      setSuccessMsg("");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1500);
    }
  };

  const buttonProps = () => {
    if (!formatComplete) {
      return { children: "Format", onClick: handleFormatJson, primary: false };
    }

    if (formatComplete && !validateComplete) {
      return {
        children: "Validate",
        onClick: handleValidateJson,
        primary: false,
      };
    }

    if (formatComplete && validateComplete) {
      return { children: "Preview", onClick: handlePreview, primary: true };
    }

    return { children: "", disable: true };
  };

  return (
    <>
      <PageHead
        title="Playground"
        description={`Playground for verifying and preview ${PROJECT_NAME} profile json`}
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
          className="h-80 dark:bg-primary-high dark:text-primary-low border-2 hover:border-tertiary-medium focus:ring-0 focus:border-tertiary-medium focus:outline-0 transition-all duration-250 ease-linear rounded px-6 py-2 mb-4 block w-full"
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

        <span className="mb-5">
          {errors.map((error, idx) => {
            return (
              <p key={idx} className="text-red-500">
                {error.path.length === 1
                  ? error.path
                  : `${error.path[0]} - ${error.path[2]}`}
                : {error.message}
              </p>
            );
          })}
        </span>

        <div className="flex flex-row justify-end mb-3 gap-2">
          <Button {...buttonProps()} />
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
