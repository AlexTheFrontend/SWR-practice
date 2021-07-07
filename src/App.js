import './App.css';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json())

function App() {

  const url = 'https://jsonplaceholder.typicode.com/posts/?_limit=10'
  const { data, error } = useSWR(url, fetcher)
  console.log('What is it', data, 'errorDisplay?', error)

  return (
    <div className="App">
      SWR
    </div>
  );
}

export default App;

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