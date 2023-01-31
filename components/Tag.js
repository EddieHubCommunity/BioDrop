import Link from "../components/Link";
import { abbreviateNumber } from "../services/utils/abbreviateNumbers";

export default function Tag({ name, total, path, currentInput, selected, method }) {

  return (
    <div className="relative">
      <Link
        onClick={()=>{
          if(!selected){
            if(currentInput !== '')
            {
              method(`${currentInput.toLowerCase().split(',').filter(input => input !== '').join(',')},${name}`)
            }
            else{
              method(`${name}`)
            }
          }else{
            method(currentInput.toLowerCase().split(',').filter(input => input !== '' && input !== name.toLowerCase()).join(','))
          }
        }}
        href={path && path ==='/search'? '':`/search?search=${name}`}

        className={`flex flex-row p-1 m-2 rounded-lg text-sm font-mono border-2 cursor-pointer shadow-none ${selected? 'hover:border-white bg-orange-600 text-white' : 'hover:border-orange-600'}`}
      >
        {name}
      </Link>
      {total && (
        <div className={`absolute inline-block top-0 right-0 bottom-auto left-auto translate-x-1/4 -translate-y-1/3 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1 px-1.5 text-xs leading-none text-center whitespace-nowrap align-baseline border font-bold ${selected ? ' bg-white text-orange-600 border-orange-600':  'bg-orange-600 text-black'} rounded-full z-10`}>
          {abbreviateNumber(total)}
        </div>
      )}
    </div>
  );
}
