import { useState, useEffect } from 'react';
import { 
  Tile,
  OrderedList,
  ListItem,
  SkeletonText
} from 'carbon-components-react';

// api
import { 
  getNDCs,
} from '../../api/drugApis';

const DrugCard = ({ drug }) => {
  const [NDCList, setNDCList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    getNDCs(drug.rxcui).then(res => {
      setNDCList(res?.ndcGroup?.ndcList?.ndc || []);
      setIsLoading(false)
    })
  }, [])

  const displayNDCs = () => {
    return (
      <OrderedList style={{ marginLeft: 32 }}>
        {NDCList.map(item => (
          <ListItem key={item}>{item}</ListItem>
        ))}
      </OrderedList>
    )
  }

  return (
    <Tile 
      style={{ marginBottom: 8 }} 
      className="animate__animated animate__fadeIn animate__faster">
      <div>
        <h5 className="text-xl underline mb-2">Name of Drug</h5>
        <div className="mb-1">
          <span className="font-semibold">
            ID:	&nbsp;
          </span> 
          {drug.rxcui}
        </div>
        <div className="mb-1">
          <span className="font-semibold">
          Name:	&nbsp;
        </span>
          {drug.name}
        </div>
        <div className="mb-1">
          <span className="font-semibold">
          Synonym:	&nbsp;
        </span>
          {drug.synonym}
        </div>
      </div>
      <div>
        <h5 className="text-xl underline my-2">Associated NDCs</h5>
        {displayNDCs()}
        {isLoading && <SkeletonText />}
      </div>
    </Tile>
  );
};

export default DrugCard;