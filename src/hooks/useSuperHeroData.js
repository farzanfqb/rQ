import React from 'react'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}
export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient()   // it has access to react query cache 
  return useQuery({
    queryKey: ["super-hero", heroId],
    // queryFn: () => fetchSuperHero    //it automatically gets 
    queryFn: () => fetchSuperHero(heroId),
    initialData: () => {
      const prevQuery = queryClient.getQueryData(['super-heroes'])

      if (prevQuery) {
        const heroData = prevQuery?.data?.find(hero => hero.id === heroId)
        console.log(heroData);
        return { data: heroData }
      } else return undefined
    }
    // initialData: () => {
    //     const hero = queryClient.getQueryData(["super-heroes"])?.data?.find(hero => hero.id === parseInt(heroId))
    //     if (hero) {
    //       return {
    //         data: hero //return an object whose data property is set to hero because in rqsuperhero page we access object data.data.name not array
    //       }
    //     } else {
    //       return undefined // if initial data is undefined rq will save us from runtime error
    //     }
    //   }
    // })
    /**                      chat */
    /** queryKey: ["super-hero", heroId],
    queryFn: () => fetchSuperHero(heroId),
    initialData: async () => {
      try {
        const superheroesData = await queryClient.fetchQuery(['super-heroes']); // Fetch the data from the cache
        const superhero = superheroesData?.find(hero => hero && hero.id === parseInt(heroId));
        
        // Return the query object with the expected structure
        return {
          data: superhero || null,
          status: superheroesData ? 'success' : 'error',
          error: null, // or handle errors appropriately
        };
      } catch (error) {
        console.error('Error fetching initial data:', error);
 
        // Return the query object with error status
        return {
          data: null,
          status: 'error',
          error: error.message,
        };
      }
    }, */
  })
}
const updateHero = (heroId, updatedHero) => {
  return axios.patch(`http://localhost:4000/superheroes/${heroId}`, updatedHero)
}
export const usePatchSuperHeroData = () => {
  const queryClient = useQueryClient()
  return useMutation(
    {
      mutationKey: ["update-hero"],
      mutationFn: (variables) => updateHero(variables.heroId, variables.updatedHero),
      onSuccess: (_data, variables) => {
        // Invalidate and refetch the query associated with the mutated data
        queryClient.invalidateQueries(['superheroes', variables.heroId]);
      }
    }
  )
}
