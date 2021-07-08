import './App.css';
import useSWR, { SWRConfig } from 'swr';
import React from 'react';

//custom fetcher function which returns a promise
const fetcher = (...args) => fetch(...args).then(res => res.json())


export default function App() {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, fetcher }}>
      <Crimes />
    </SWRConfig>
  );
}

function Crimes() {
  const url =
    "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";
  const { data, error } = useSWR(url);

  if (error) return <div>Error...</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <DisplayCrimes
      crimes={data}
      categories={[...new Set(data.map(crime => crime.category))]}
    />
  );
}

function DisplayCrimes({ crimes, categories }) {
  const [filterCategory, setFilterCategory] = React.useState(null);

  const filteredCrimes = filterCategory
    ? crimes.filter(crime => crime.category === filterCategory)
    : crimes;

  return (
    <>
      {categories.map(category => (
        <button
          onClick={() => {
            setFilterCategory(category);
          }}
          key={category}
        >
          {category}
        </button>
      ))}
      {filterCategory && (
        <button
          onClick={() => {
            setFilterCategory(null);
          }}
        >
          reset
        </button>
      )}

      <pre>{JSON.stringify(filteredCrimes, null, 2)}</pre>
    </>
  );
}

// const fetcher = (...args) => fetch(...args).then(res => res.json())



// function Profile () {
//   const { data, error } = useSWR('/api/user/123', fetcher)

//   if (error) return <div>failed to load</div>
//   if (!data) return <div>loading...</div>

//   // render data
//   return <div>hello {data.name}!</div>
// }
// Normally, there're 3 possible states of a request: "loading", "ready", or "error".
// You can use the value of data and error to determine the current state of the request, and return the corresponding UI.