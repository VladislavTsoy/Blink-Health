import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
// import { useHistory } from 'react-router-dom';

// components
import Navbar from '../Navbar/Navbar';
import { 
  Search, 
  Button,
  StructuredListWrapper,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  Loading
} from 'carbon-components-react';

// api
import { 
  getSpellingSuggestions,
  getDrugs
} from '../../api/drugApis';

const DrugSearch = ({ history }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [warn, setWarn] = useState(false);

  useEffect(() => {
    if(search?.length > 0) {
      handleSuggestions()
    } else {
      setSuggestions([]);
      setWarn(false)
    }
  }, [search])

  const handleSuggestions = debounce(() => {
    getSpellingSuggestions(search).then(res => {
      let suggestions = res?.suggestionGroup?.suggestionList?.suggestion;
      if(suggestions) {
        setSuggestions(suggestions);
        if(warn) setWarn(false)
      } else {
        setSuggestions([]);
        setWarn(true)
      }
    })
  }, 300);

  const onKeyDown = (e) => {
    if(e.keyCode === 13) {
      handleSearch(search);
    }
  }

  const handleSearch = (drug) => {
    setIsLoading(true);
    getDrugs(drug).then(res => {
      setIsLoading(false);
      history.push({
        pathname: `/drugs/${drug}`,
        state: {
          drug: res?.drugGroup
        }
      })
    })
  }

  const displaySuggestions = () => {
    return (
      <StructuredListWrapper 
        selection 
        isCondensed
        isFlush={false}>
        <StructuredListBody>
          {suggestions.slice(0, 8).map(item => (
            <StructuredListRow 
              label 
              key={item}
              onClick={() => handleSearch(item)}>
              <StructuredListCell>{item}</StructuredListCell>
            </StructuredListRow>
          ))}
        </StructuredListBody>
      </StructuredListWrapper>
    )
  }

  return (
    <div 
      className="flex flex-col" 
      onKeyDown={onKeyDown}>
      <Navbar title="Drug Search"/>
      <section>
        <div className="flex-col mx-auto lg:w-1/2 md:w-3/4 w-10/12 flex mt-40">
          <div className="flex flex-row">
            <Search 
              id="drug-search-input"
              placeholder="Search Drug"
              labelText={""}
              value={search}
              onChange={e => setSearch(e.target.value)}/>
            <Button 
              onClick={() => handleSearch(search)}>
              Search
            </Button>
          </div>
          {warn && <div className="text-red-500">Nothing could be found for this term.</div>}
          {suggestions?.length > 0 && displaySuggestions()}
        </div>
      </section>
      {isLoading && <Loading withOverlay={true}/>}
    </div>
  );
};

export default DrugSearch;