import React from 'react'
import { useQueries } from '@tanstack/react-query'
import axios from 'axios'

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const DynamicParallelPage = ({ heroIds }) => {
  const ids = Object.values(heroIds)
  const queryResults = useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      }
    })
  }
  )
  console.log(queryResults[0]?.data?.data);
  return (
    <>
      <div>
        {queryResults[0]?.data?.data.id} <span> : </span> {queryResults[0]?.data?.data.name} <span> : </span> {queryResults[0]?.data?.data.alterEgo}
        <br />
        {queryResults[1]?.data?.data.id} <span> : </span> {queryResults[1]?.data?.data.name} <span> : </span> {queryResults[1]?.data?.data.alterEgo}
      </div>
      <br />
      {queryResults.forEach(element => <div>{element?.data?.data.id}</div>)}
    </>
  )
}
