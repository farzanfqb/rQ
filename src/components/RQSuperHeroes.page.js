import React, { useState } from 'react'
import { useAddSuperHeroData, useSuperHeroesData } from '../hooks/useSuperHeroesData'
import { Link } from 'react-router-dom'


export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  const onSuccess = (data) => { console.log("perform callback sideEffects on success ", data); }
  const onError = (error) => { console.log("perform callback sideEffects on error ", error); }

  const { data, isLoading, isError, error, refetch } = useSuperHeroesData(onSuccess, onError)

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    addHero(hero);    // mutate({ name, alterEgo }) ~useMutation().mutate(body)
  }
  const { mutate: addHero, isPending, variables } = useAddSuperHeroData()
  if (isLoading) { return <h2>data is loading</h2> }
  if (isError) { return <h2>{error.message}</h2> }
  return (
    <>
      <h1>RQ Super Heroes page</h1>
      <h3>In this page mutation and Optimistic Update is performed using onMutate: queryClient.getQueryData,setQueryData, invalidateQueries </h3>
      <div>

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
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>fetch Heroes</button>
      {
        data?.data.map(hero => {
          return <>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link><br />
          </>
        })
      }
      {/* {isPending && <Link to={`/rq-super-heroes/`}>{variables.name}</Link>}    * optimistic update via ui */}
      {/* {data?.map((item) => <div key={item}>{item} </div>)}   if select used*/}
    </>
  )
}
