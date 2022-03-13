import { useEffect, useState } from 'react';
import * as API from './const/youtube-api';
import './App.css';
import axios from 'axios';

function App() {
  const [tumbnails, setTumbnails] = useState<any | null>(null);
  useEffect(()=> {
		const fetchApi = async () => {
			try {
				const response = await axios.get(`${API.BASE_URL}?part=${API.PART}&maxResults=${API.MAXRESULTS}&order=${API.ORDER}&safeSearch=${API.SAFE}&q=marvel&key=${API.KEY}`);
				const { data: { items } } = response;
        setTumbnails(items[0].snippet.thumbnails)
        console.log(items[0]);
			} catch (err) {
				console.error(err)
			}
		}
		fetchApi()
	}, [])
  return (
    <div className="App">
    
        

    </div>
  );
}

export default App;
