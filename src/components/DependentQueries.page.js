import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const fetchUserIdByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
}

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
}

export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserIdByEmail(email)
  })

  const channelId = user?.data.channelId

  const { data: courses } = useQuery({
    queryKey: ["courses", channelId],
    queryFn: () => fetchCoursesByChannelId(channelId),
    enabled: !!channelId,

  })
  return (
    <div>
      <h1>email : {user?.data.id}</h1>
      <h3> id : {user?.data.channelId}</h3>
      <h1>Courses</h1>
      <ul>
        {courses?.data.courses.map(i => <h3 key={i}>{i}</h3>)}
      </ul>
    </div>
  )
}
