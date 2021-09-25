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

  /**
   * Mount: if location has state then render drug 
   * else split the url for search term and find the drug
   */
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

    return () => {
      setList(null);
      setIsLoading(false)
    }
  }, [])

  /**
   * Renders drug information
   */
  const displayList = () => {
    return (
      list?.conceptGroup
      .filter(item => {
        return item.conceptProperties
      })
      .map(item => {
        return item.conceptProperties.map(drug => (
          <DrugCard key={drug.rxcui} drug={drug}/>
        )
      )})
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