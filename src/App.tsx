import { Navigation } from './pages';
import { useEffect, useState } from 'react';
import * as API from './const/youtube-api';
import './App.css';
import axios from 'axios';
import { Api } from '@mui/icons-material';

const request = axios.create({baseURL: API.BASE_URL});


function App() {
  const [tumbnails, setTumbnails] = useState<any | null>(null);
  useEffect(()=> {
		const fetchApi = async () => {
			try {
				const searchResponse = await request.get(
					'search',
					{ 
						params : {
							part: 'snippet',
							maxResults: API.MAXRESULTS,
							order: API.ORDER,
							safeSearch: API.SAFE,
							q: '',
							key: API.KEY,
						}
					}
				);
				
				const searchItems : any = searchResponse.data.items.filter((item:any) => !!item.id.videoId).filter((item:any) => !!item.snippet.channelId);

				const videosId = searchItems.map((item:any) => item.id.videoId);
				const channelsId = Array.from(new Set(searchItems.map((item:any) => item.snippet.channelId)))
				
				const videosResponse = await request.get('videos',
					{ 
						params : {
							part: 'id,snippet,contentDetails,statistics,status,topicDetails',
							id: videosId.join(','),
							key: API.KEY,
						}
					}
				);

				
				const channelsResponse = await request.get('channels',
					{ 
						params : {
						part: 'snippet',
						id: channelsId.join(','),
						q:'react',
						key:API.KEY,
					}});
				
				const homeVideos = searchItems.map((itemSearch: any) => {
					const videoInfo = videosResponse.data.items.find((itemVideos: any) => itemVideos.id === itemSearch.id.videoId);
					const channel = channelsResponse.data.items.find((itemChannel: any) => itemChannel.id === itemSearch.snippet.channelId)
					return {
						...videoInfo,
						snippet: {...videoInfo.snippet, ...itemSearch.snippet},
						channel,
					}
				})
				console.log(homeVideos);
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
