import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSuperHeroData } from '../hooks/useSuperHeroData'
import { Update } from './Update'

export const RQSuperHeroPage = () => {

  const { heroId } = useParams()
  const [showUpdate, setShowUpdate] = useState(false);
  const handleButtonClick = () => {
    setShowUpdate(true);
  }
  const { isLoading, data, isError, error } = useSuperHeroData(heroId)
  console.log(data);     //data.data is object
  // if (isLoading) {
  //   return <h2> Loading...</h2>
  // }
  if (isError) {
    return <h2>{error.message}</h2>
  }
  return (
    <>
      <div>
        <h1>In This Page Initial Data Is Preloaded From Previous Query  </h1>
        <p> id: {data?.data.id} Name: {data?.data.alterEgo} Character: {data?.data.name}</p>
      </div>
      <div>
        <button onClick={handleButtonClick}>Update details</button>
        {showUpdate && <Update heroId={heroId} />}
      </div>
    </>
  )
}
