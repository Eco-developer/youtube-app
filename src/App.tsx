import { Navigation } from './pages';
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

				//buscar los videos
				const list = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=id,snippet,contentDetails,statistics,status,topicDetails&id=${items.filter((item:any) => !!item.id.videoId).map((item:any) => item.id.videoId).join(',')}&key=${API.KEY}`);
				//buscar las imagenes de los canales
				const chanels = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&maxResults=15&id=${items.filter((item:any) => !!item.snippet.channelId).map((item:any) => item.snippet.channelId).join(',')}&key=${API.KEY}`);
				
				console.log(chanels.data)
        setTumbnails(items[0].snippet.thumbnails)
        console.log(new Set(items.filter((item:any) => !!item.snippet.channelId).map((item:any) => item.snippet.channelId)));
			} catch (err) {
				console.error(err)
			}
		}
		fetchApi()
	}, [])
  return (
    <div className="App">
        <Navigation/>
    </div>
  );
}

export default App;
