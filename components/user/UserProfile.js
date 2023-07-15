import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FaShare } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";

import FallbackImage from "@components/FallbackImage";
import UserSocial from "./UserSocials";
import Tag from "@components/Tag";
import Link from "@components/Link";
import Badge from "@components/Badge";
import Button from "@components/Button";
import Modal from "@components/Modal";
import ClipboardCopy from "@components/ClipboardCopy";
import { socials } from "@config/socials";

function UserProfile({ BASE_URL, data }) {
  const [qrShow, setQrShow] = useState(false);
  const router = useRouter();
  const fallbackImageSize = 120;

  //Declared Ref object for QR
  const qrRef = useRef(null);

  //qrRef.current is pointing to the DOM node and firstChild to its canvas
  const downloadQR = () =>
    qrRef.current.firstChild.toBlob((blob) =>
      saveAs(blob, `linkfree-${data.username}.png`)
    );

  // Custom component for rendering links within ReactMarkdown
  const LinkRenderer = ({ href, children }) => (
    <Link href={href}>{children}</Link>
  );

  return (
    <>
      <div className="flex justify-center items-center flex-col md:flex-row gap-x-6">
        <Badge
          content={<FaShare size="1.5em" color="white" />}
          position="bottom-left"
          badgeClassName="cursor-pointer"
          onClick={() => (qrShow ? setQrShow(false) : setQrShow(true))}
        >
          <FallbackImage
            src={`https://github.com/${data.username}.png`}
            alt={`Profile picture of ${data.name}`}
            width={fallbackImageSize}
            height={fallbackImageSize}
            fallback={data.name}
            priority
            className="rounded-full object-contain"
          />
        </Badge>

        <div className="flex flex-col self-center gap-3">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <div className="flex md:w-full gap-2 mx-auto text-xl">
            {data.socials?.map((social) => (
              <UserSocial
                social={social}
                key={social._id}
                BASE_URL={BASE_URL}
                username={data.username}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4 text-center">
        <ReactMarkdown components={{ a: LinkRenderer }}>
          {data.bio}
        </ReactMarkdown>
      </div>
      {!qrShow && (
        <div className="flex flex-wrap justify-center">
          {data.tags?.length > 0 &&
            data.tags.map((tag, index) => {
              const trimmedTag = tag.trim();
              if (!trimmedTag) {
                return null;
              }
              return (
                <Tag
                  name={trimmedTag}
                  key={index}
                  onClick={() =>
                    router.push(`/search?keyword=${trimmedTag.toLowerCase()}`)
                  }
                />
              );
            })}
        </div>
      )}

      {/* Passed Ref object as the ref attribute to the JSX of the DOM node of QR */}
      <Modal show={qrShow} setShow={setQrShow} modalStyles="w-fit m-auto">
        <div className="flex flex-col items-center justify-center px-8">
          <div>
            <div className="flex justify-center my-4" ref={qrRef}>
              {qrShow && (
                <QRCodeCanvas
                  className="border border-white"
                  value={`${BASE_URL}/${data.username}`}
                  size={fallbackImageSize * 2}
                />
              )}
            </div>
            <div className="w-full px-2 mx-auto flex justify-center mb-4">
              {qrShow && (
                <Button primary={true} onClick={downloadQR}>
                  Download QR code
                </Button>
              )}
            </div>
          </div>
          {qrShow && (
            <>
              <div className="h-full m-4 p-2 flex flex-row items-start justify-center space-x-2">
                {socials.map(({ SOCIAL_SHARE_LINK, Icon, includeText }) => (
                  <Link
                    key={SOCIAL_SHARE_LINK}
                    href={`${SOCIAL_SHARE_LINK}${BASE_URL}/${data.username}${
                      includeText
                        ? `&text=${encodeURIComponent(
                            `Check out ${data.name}'s profile on LinkFree.io`
                          )}`
                        : ""
                    }`}
                    target="_blank"
                    className="rounded-full p-2 border border-primary-low-medium hover:border-secondary-high hover:text-secondary-high dark:hover:text-primary-low dark:hover:border-primary-low-medium dark:hover:bg-primary-medium-low cursor-pointer  dark:bg-primary-medium"
                  >
                    <Icon size={24} />
                  </Link>
                ))}
              </div>
              <div className="w-full flex items-center justify-center">
                <ClipboardCopy>
                  <p className="dark:text-gray-300 border p-3 rounded-md">
                    {`${BASE_URL}/${data.username}`}
                  </p>
                </ClipboardCopy>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

export default React.memo(UserProfile);
