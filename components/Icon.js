import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as CgIcons from "react-icons/ci";
import * as CiIcons from "react-icons/cg";
import * as DiIcons from "react-icons/di";
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
import * as FiIcons from "react-icons/fi";
import * as GiIcons from "react-icons/gi";
import * as GoIcons from "react-icons/go";
import * as GrIcons from "react-icons/gr";
import * as HiIcons from "react-icons/hi2";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io5";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as SlIcons from "react-icons/sl";
import * as TbIcons from "react-icons/tb";
import * as TfiIcons from "react-icons/tfi";
import * as TiIcons from "react-icons/ti";
import * as VscIcons from "react-icons/vsc";
import * as WiIcons from "react-icons/wi";

export default function getIcon(name) {
  let icon = FaIcons["FaGlobe"];
  if (!name) {
    return icon;
  }

  switch (name.slice(0, 2)) {
    case "Ai":
      icon = AiIcons[name];
      break;
    case "Bi":
      icon = BiIcons[name];
      break;
    case "Bs":
      icon = BsIcons[name];
      break;
    case "Ci":
      icon = CiIcons[name];
      break;
    case "Cg":
      icon = CgIcons[name];
      break;
    case "Di":
      icon = DiIcons[name];
      break;
    case "Fa":
      icon = FaIcons[name];
      break;
    case "Fc":
      icon = FcIcons[name];
      break;
    case "Fi":
      icon = FiIcons[name];
      break;
    case "Gi":
      icon = GiIcons[name];
      break;
    case "Go":
      icon = GoIcons[name];
      break;
    case "Gr":
      icon = GrIcons[name];
      break;
    case "Hi":
      icon = HiIcons[name];
      break;
    case "Im":
      icon = ImIcons[name];
      break;
    case "Io":
      icon = IoIcons[name];
      break;
    case "Md":
      icon = MdIcons[name];
      break;
    case "Si":
      icon = SiIcons[name];
      break;
    case "Ri":
      icon = RiIcons[name];
      break;
    case "Sl":
      icon = SlIcons[name];
      break;
    case "Tb":
      icon = TbIcons[name];
      break;
    case "Ti":
      icon = TiIcons[name];
      break;
    case "Wi":
      icon = WiIcons[name];
      break;
  }

  switch (name.slice(0, 3)) {
    case "Tfi":
      icon = TfiIcons[name];
      break;
    case "Vsc":
      icon = VscIcons[name];
      break;
  }

  if (!icon) {
    icon = FaIcons["FaGlobe"];
  }

  return icon;
}
