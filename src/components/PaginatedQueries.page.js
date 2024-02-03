import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'

const fetchColors = pageNumber => {
    return axios.get(`http://localhost:4000/colors/?_per_page=2&_page=${pageNumber}`)
}

export const PaginatedQueriesPage = () => {
    const [pageNumber, setPageNumber] = useState(1) //view ist page by default
    const { isLoading, isError, error, data, } = useQuery({
        queryKey: ["colors", pageNumber],
        queryFn: () => fetchColors(pageNumber),
        placeholderData: keepPreviousData,
    })
    if (isLoading) { return <h2>Loading...</h2> }
    if (isError) { return <h2>{error.message}</h2> }
    console.log(data);
    return (
        <>

            {data?.data?.data?.map(color => {
                return (
                    <div key={color.id}> <h2>{color.id} : {color.label}</h2> </div>
                )
            })}
            <div>

                <button disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)}>Prev Page</button>
                <button disabled={pageNumber === 6} onClick={() => setPageNumber(pageNumber + 1)}>Next Page</button>

            </div >
        </>
    )
}
