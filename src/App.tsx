import { Navigation } from './pages';
import { useEffect, useState } from 'react';
import * as API from './const/youtube-api';
import { useAppDispatch } from './hooks/index';
import { request } from './services/index';
import { setVideos } from './features/videos/videosSlice';
import { Video, Channel } from './interfaces/index';
import './App.css';
import { Api } from '@mui/icons-material';

function App() {
  
  const dispatch = useAppDispatch();
  useEffect(()=> {
		const fetchApi = async () => {
			try {
				const searchResponse = await request.get(
					'search',
					{ 
						params : {
							part: API.PART.SERACH,
							maxResults: API.MAXRESULTS.SERACH,
							order: API.ORDER,
							safeSearch: API.SAFE,
							q: 'reactjs',
							key: API.KEY,
						}
					}
				);
				
				const searchItems : Video[] = searchResponse.data.items.filter((item:Video) => !!item.id.videoId).filter((item:Video) => !!item.snippet?.channelId);

				const videosId = searchItems.map((item:Video) => item.id.videoId);
				const channelsId = Array.from(new Set(searchItems.map((item:Video) => item.snippet?.channelId)))
				
				const videosResponse = await request.get('videos',
					{ 
						params : {
							maxResults: API.MAXRESULTS.VIDEOS,
							part: API.PART.VIDEOS,
							id: videosId.join(','),
							key: API.KEY,
						}
					}
				);

				const channelsResponse = await request.get('channels',
					{ 
						params : {
							maxResults: API.MAXRESULTS.CHANNEL,
							part: API.PART.CHANNEL,
							id: channelsId.join(','),
							key:API.KEY,
						}
					}
				);
				
				const homeVideos : Video[] = searchItems.map((itemSearch: Video) => {
					const videoInfo = videosResponse.data.items.find((itemVideos: Video) => itemVideos.id === itemSearch.id.videoId);
					const channel = channelsResponse.data.items.find((itemChannel: Channel) => itemChannel.id === itemSearch.snippet?.channelId)
					return {
						...videoInfo,
						snippet: {...videoInfo.snippet, ...itemSearch.snippet},
						channel,
					}
				})
				dispatch(setVideos(homeVideos));
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
