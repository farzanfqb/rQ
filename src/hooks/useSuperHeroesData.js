import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const fetchSuperHeroes = () => axios.get('http://localhost:4000/superheroes')

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery({
    queryKey: ["super-heroes"],
    // queryFn: async () => (await axios.get('http://localhost:4000/superheroes')).data
    //queryFn: () => axios.get('http://localhost:4000/superheroes')
    queryFn: fetchSuperHeroes,
    gcTime: 50000,  // 5min default if no observer for queryKey , its garbage collected
    staleTime: 1, //0ms by defaut i.e for every cache fetch background check for change is performed
    // enabled: false,    //but it will not update automatically if invalidated
    onSuccess: onSuccess,
    onError: onError,
    // select: (data) => {        //Data Transformation
    //   const superHeroNames = data.data.map(hero => hero.name)
    //   return superHeroNames;}


  })
}
const addSuperHero = hero => {
  return axios.post(`http://localhost:4000/superheroes`, hero)
}
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()
  return useMutation(
    {
      mutationKey: ["add-hero"],
      mutationFn: addSuperHero,

      /**query invalidation */
      // onSuccess: () => {
      //   queryClient.invalidateQueries('super-heroes')
      // }

      /** setQueryData on success to handle mutation result on previous query */
      // onSuccess: (data) => {    //data is response data of mutation fn
      //   queryClient.setQueryData('super-hero', oldQueryData => {
      //     return {
      //       ...oldQueryData,  //spread old data in object
      //       data: [...oldQueryData.data, data.data]  //data.data is mutation response
      //     }

      /**Optimistic Query Update */
      onMutate: async (newHero) => {                                        // called before mutationFn
        await queryClient.cancelQueries({ queryKey: ['super-heroes'] })                     // cancel pending refetch requests
        const previousHeroData = queryClient.getQueryData(['super-heroes'])   // store previous data in variable 
        queryClient.setQueryData(['super-heroes'], (oldQueryData) => {
          const updatedQueryData = [...oldQueryData.data, newHero];                            //update the .data array of previous query but return full query
          oldQueryData.data = updatedQueryData
          return oldQueryData;
        }
        )
        return {
          previousHeroData
        }
      },
      onError: (_error, _hero, context) => {     //using context we get hold of previousHeroData
        queryClient.setQueryData('super-heroes', context.previousHeroData)
      },
      onSettled: () => { queryClient.invalidateQueries({ queryKey: ['super-heroes'] }) }       //called either on success or error

    })

}
//   new Syntax
//  onMutate: async (newHero) => {
//       await queryClient.cancelQueries({ queryKey: ['super-heroes'] })
//       const previousHeroData = queryClient.getQueryData(['super-heroes'])   // store previous data in variable
//       queryClient.setQueryData(['super-heroes'], (old) => [...(old), newHero])      // update
//       return {previousHeroData}