import React, { useState } from 'react'
import { usePatchSuperHeroData } from '../hooks/useSuperHeroData'
import { useParams } from 'react-router-dom'

export const Update = ({ heroId }) => {
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')
  // const { heroId } = useParams;

  const { mutate: updateHero } = usePatchSuperHeroData();

  const handleUpdateClick = () => {
    const updatedHero = { id, name, alterEgo };
    updateHero({ heroId, updatedHero });
  }

  console.log(heroId);

  return (
    <div>
      {/* <input
        type='text'
        value={id}
        placeholder='id'
        onChange={(e) => setId(e.target.value)}>

      </input> */}
      <input
        type='text'
        value={name}
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}>

      </input>

      <input
        type='text'
        value={alterEgo}
        placeholder='AlterEgo'
        onChange={(e) => setAlterEgo(e.target.value)}>

      </input>
      <button onClick={handleUpdateClick}>Update</button>
    </div>
  )
}
