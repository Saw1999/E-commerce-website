import React, { useEffect, useState } from 'react';
import './newCollection.css';
import { Item } from '../item/Item';

export const NewCollection = () => {
  const [newCollections, setNewCollections] = useState([]);

  useEffect(()=> {
    fetch("http://localhost:8888/newcollection")
    .then((res) => res.json())
    .then((data) => {setNewCollections(data)});
  },[]);

  return (
    <div className='newCollections'>
        <h1>NEW COLLECTION</h1>
        <hr />
        <div className="newCollectionItem">
            {newCollections.map((collectionItem) => {
                return <Item key={collectionItem._id} id={collectionItem.id} 
                name={collectionItem.name} image={collectionItem.image} 
                new_price={collectionItem.new_price} old_price={collectionItem.old_price}/>
            })}
        </div>
    </div>
  )
}
