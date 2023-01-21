import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { MdQrCode2 } from "react-icons/md";
import { QRCodeSVG } from "qrcode.react";

import FallbackImage from "../FallbackImage";
import UserSocial from "./UserSocials";
import Tag from "../Tag";
import { abbreviateNumber } from "../../services/utils/abbreviateNumbers";

export default function UserProfile({ BASE_URL, data }) {
  const [qrShow, setQrShow] = useState(false);
  const fallbackImageSize = 120;
  return (
    <>
      <div className="flex justify-center items-center flex-col md:flex-row gap-x-6">
        <div className="inline-flex relative w-fit">
          {data.displayStatsPublic && (
            <div
              id="profile-views"
              className="absolute inline-block top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1 px-1.5 text-xs leading-none text-center whitespace-nowrap align-baseline font-bold bg-orange-600 text-black rounded-full z-10"
            >
              {abbreviateNumber(data.views)}
            </div>
          )}
          <FallbackImage
            src={data.avatar}
            alt={`Profile picture of ${data.name}`}
            width={fallbackImageSize}
            height={fallbackImageSize}
            fallback={data.name}
            className="rounded-full object-contain"
          />
          <div
            className="absolute inline-block bottom-0 left-0 top-auto right-auto translate-y-2/4 -translate-x-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 px-2 py-2 text-xs leading-none text-center whitespace-nowrap align-baseline font-bold border-2 border-orange-600 rounded-xl z-10 animate-bounce text-orange-600 cursor-pointer"
            onClick={() => (qrShow ? setQrShow(false) : setQrShow(true))}
          >
            <MdQrCode2 />
          </div>
        </div>

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
          {data.tags && data.tags.map((tag) => <Tag name={tag} key={tag} />)}
        </div>
      )}

      <div className="flex justify-center my-4">
        {qrShow && (
          <QRCodeSVG
            value={`${BASE_URL}/${data.username}`}
            size={fallbackImageSize * 2}
          />
        )}
      </div>
    </>
  );
}
