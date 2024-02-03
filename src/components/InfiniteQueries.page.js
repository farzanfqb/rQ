import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { Fragment } from 'react'

const fetchColors = ({ pageParam = 1 }) => { // =1 defaults load page 1 
  return axios.get(`http://localhost:4000/colors/?_per_page=2&_page=${pageParam}`)
}
export const InfiniteQueriesPage = () => {
  const { isLoading, isError, error, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < 6) { return pages.length + 1 }
      else { return undefined }

    }


  })

  if (isLoading) { return <h2>Loading...</h2> }
  if (isError) { return <h2>{error.message}</h2> }
  //console.log(data);
  return (
    <>
      <div>
        {data?.pages?.map((group, i) => {
          console.log(group.data.data)
          return (
            <Fragment key={i}>{
              group.data.data.map(color => (
                <h2 key={color.id}>{color.id} : {color.label}</h2>
              ))
            }</Fragment>
          )
        })}
      </div>
      {/* <div>{data?.pages[0].data.data.map(color => (<h2> {color.label}</h2>))}</div> */}
      <div>      <button disabled={!hasNextPage} onClick={fetchNextPage}>Load more</button>
      </div >
      <div>{isFetching && !isFetchingNextPage ? 'Fetching' : null}</div>
    </>
  )
}
