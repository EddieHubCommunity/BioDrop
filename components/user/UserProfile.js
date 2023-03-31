import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { MdQrCode2 } from "react-icons/md";
import { QRCodeCanvas } from "qrcode.react";
import { saveAs } from "file-saver";

import FallbackImage from "@components/FallbackImage";
import UserSocial from "./UserSocials";
import Tag from "@components/Tag";
import Link from "@components/Link";
import Badge from "@components/Badge";
import Button from "@components/Button";

function UserProfile({ BASE_URL, data }) {
  const [qrShow, setQrShow] = useState(false);
  const fallbackImageSize = 120;

  const downloadQR = () =>
    document
      .getElementById("qrcode")
      .toBlob((blob) => saveAs(blob, `linkfree-${data.username}.png`));

  return (
    <>
      <div className="flex justify-center items-center flex-col md:flex-row gap-x-6">
        <Badge
          content={<MdQrCode2 size="2em" />}
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
            {data.socials &&
              data.socials.map((social, index) => (
                <UserSocial
                  social={social}
                  key={index}
                  BASE_URL={BASE_URL}
                  username={data.username}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4 text-center">
        <ReactMarkdown>{data.bio}</ReactMarkdown>
      </div>
      {!qrShow && (
        <div className="flex flex-wrap justify-center">
          {data.tags &&
            data.tags.map((tag) => (
              <Link
                href={`/search?keyword=${tag}`}
                key={tag}
                className="no-underline"
              >
                <Tag name={tag} />
              </Link>
            ))}
        </div>
      )}

      <div className="flex justify-center my-4">
        {qrShow && (
          <QRCodeCanvas
            value={`${BASE_URL}/${data.username}`}
            size={fallbackImageSize * 2}
            id="qrcode"
          />
        )}
      </div>
      <div className="flex justify-center mb-4">
        {qrShow && (
          <Button text="Download QR code" primary={true} onClick={downloadQR} />
        )}
      </div>
    </>
  );
}

export default React.memo(UserProfile);
