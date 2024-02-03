import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
const fetchSuperHeroes = () => axios.get(`http://localhost:4000/superheroes`)
const fetchFriends = () => axios.get(`http://localhost:4000/friends`)

export const ParallelQueriesPage = () => {
  const { data: SuperHeroes } = useQuery({         //inorder to resolve conflict in destuructured object use alliases
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes
  })
  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends
  })
  console.log(friends?.data)
  return (
    <>    <div> {friends?.data.map(i => i.name)}</div>
      <div> {SuperHeroes?.data.map(i => i.name)}</div>
    </>

  )
}
