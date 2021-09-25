import { useState, useEffect } from 'react';

// components
import Navbar from '../Navbar/Navbar';
import DrugCard from '../DrugCard/DrugCard';
import {
  Loading,
} from 'carbon-components-react';

// api
import {
  getDrugs
} from '../../api/drugApis';

const DrugDetails = ({ location }) => {
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(location?.state?.drug) {
      setList(location.state.drug);
    } else {
      setIsLoading(true);
      let url = location.pathname.split("/");
      let drug = url[url.length - 1];
      getDrugs(drug).then(res => {
        setIsLoading(false);
        setList(res?.drugGroup)
      })
    }
  }, [])

  const displayList = () => {
    return (
      list?.conceptGroup.map(item => item.conceptProperties.map(drug => (
        <DrugCard key={drug.rxcui} drug={drug}/>
      )))
    )
  }

  return (
    <div className="flex flex-col">
      <Navbar title="Drug Details" />
      {list && (
        <section>
          <div className="flex-col mx-auto lg:w-1/2 md:w-3/4 w-10/12 flex mt-8">
            {displayList()}
          </div>
        </section>
      )}
      {isLoading && <Loading withOverlay={true}/>}
    </div>
  );
};

export default DrugDetails;