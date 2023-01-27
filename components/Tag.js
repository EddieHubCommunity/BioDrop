import Link from "../components/Link";
import { abbreviateNumber } from "../services/utils/abbreviateNumbers";
import { useRouter } from "next/router";

export default function Tag({ name, total, path,currentInput, selected, tags }) {
  const router = useRouter();
  const { search } = router.query;
  const tagNames = []
  tags && tags.slice(0,10).map(tag=> tagNames.push(tag.name))

  return (
    <div className="relative">
      <Link
        href={path && path ==='/search'?
        (!selected?
        (currentInput !== '' && search === '' ||currentInput !== '' && search === undefined?
        `/search?search=${currentInput}and${name}`:currentInput === ''?
        search === ''||search === undefined?
        `/search?search=${name}`: search.split('and').every(s => tagNames.indexOf(s)>=0)?
        `/search?search=${search}and${name}`: search.split('and').filter(s => tagNames.indexOf(s) < 0).reduce((result, word) => result.replace(word, ''), search).split('and').filter(s=> s!=='').join('and') === ''?
        `/search?search=${name}`:`/search?search=${search.split('and').filter(s => tagNames.indexOf(s) < 0).reduce((result, word) => result.replace(word, ''), search).split('and').filter(s=> s!=='').join('and')}and${name}`
        
        :search.split('and').filter(s => tagNames.indexOf(s) < 0).reduce((result, word) => result.replace(word, ''), search).split('and').filter(s=> s!=='').join('and') === ''?
        `/search?search=${currentInput.split(', ').join('and')}and${name}`:currentInput.split(', ').filter(input => tagNames.indexOf(input) < 0).join('and') === ''?
        `/search?search=${search.split('and').filter(s => tagNames.indexOf(s) < 0).reduce((result, word) => result.replace(word, ''), search).split('and').filter(s=> s!=='').join('and')}and${name}`:`/search?search=${currentInput.split(', ').filter(input => tagNames.indexOf(input) < 0).join('and')}and${search.split('and').filter(s => tagNames.indexOf(s) < 0).reduce((result, word) => result.replace(word, ''), search).split('and').filter(s=> s!=='').join('and')}and${name}`)
        : currentInput === ''?
        `/search?search=${search.split('and').filter(query => query !== name).filter(query => tagNames.indexOf(query) >= 0).join('and')}`:currentInput.split(', ').filter(input => tagNames.indexOf(input) < 0).join('and') === ''?
        `/search?search=${search.split('and').filter(query => query !== name).filter(query => tagNames.indexOf(query) >= 0).join('and')}`:search.split('and').filter(query => query !== name).filter(query => tagNames.indexOf(query) >= 0).join('and') === ''?
        `/search?search=${currentInput.split(', ').filter(input => tagNames.indexOf(input) < 0).join('and')}`:`/search?search=${currentInput.split(', ').filter(input => tagNames.indexOf(input) < 0).join('and')}and${search.split('and').filter(query => query !== name).filter(query => tagNames.indexOf(query) >= 0).join('and')}`
        ):`/search?search=${name}`}
        
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
