
import { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';
import Constants from './Constants'; 

const MainContent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${Constants.apiBase}${Constants.tierIds.three}/users`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);

    return (
        <>
            {
              data ? (
                  <pre>{JSON.stringify(data, null, 2)}</pre>
              ) : (
                <Loader color="white" />
              )
            }
        </>
    )
};

export default MainContent;