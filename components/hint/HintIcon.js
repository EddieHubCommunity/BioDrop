import Link from "next/link"
// import Image from "next/image"
// import { FaQuestionCircle } from "react-icons";
import { FaQuestionCircle } from "react-icons/fa";
import { IconContext } from "react-icons";


export default function HintIcon({ path, placeholderText }) {
    return (
        <Link href={path} title={placeholderText} type="button" className="relative flex flex-col items-center group w-fit h-fit p-2">
            <IconContext.Provider
                value={{
                    color: "black",
                    style: {
                        verticalAlign: "middle",
                        color: '#FF9119'
                    },
                }}
            >
                <FaQuestionCircle aria-label="Help" className="text-[#FF9119]" />
            </IconContext.Provider>
        </Link>
    )
}
