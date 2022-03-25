import { Navigation } from './pages';
import { useEffect, useState } from 'react';
import * as API from './const/youtube-api';
import { useAppDispatch } from './hooks/index';
import { request } from './services/index';
import { setVideos } from './features/videos/videosSlice';
import { setCategories } from './features/catergories/categoriesSlice';
import { 
	Video, 
	Channel,
	Category
} from './interfaces/index';
import './App.css';

function App() {
  
  const dispatch = useAppDispatch();
  useEffect(()=> {
		const fetchApi = async () => {
			try {
				
				const videosResponse = await request.get('videos',
					{ 
						params : {
							maxResults: API.MAXRESULTS.VIDEOS,
							part: API.PART.VIDEOS,
							chart:'mostPopular',
							key: API.KEY,
						}
					}
				);
				const videosItems : Video[] = videosResponse.data.items

				const categoryResponse = await request.get('videoCategories',
					{
						params : {
							regionCode: API.REGIONCODE,
							maxResults: API.PART.VIDEOS,
							part: API.PART.CATEGORIES,
							key: API.KEY,
						}
					}
				)
				const categories : Category[] = categoryResponse.data.items.filter((item:any) => item.snippet.assignable);

				const channelsId : (string | undefined)[] = Array.from(new Set(videosItems.map((item:Video) => item.snippet?.channelId)))
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
				
				const homeVideos : Video[] = videosItems.map((itemVideo: Video) => {
					
					const channel = channelsResponse.data.items.find((itemChannel: Channel) => itemChannel.id === itemVideo.snippet?.channelId)
					return {
						...itemVideo,
						channel,
					}
				})
				dispatch(setVideos(homeVideos));
				dispatch(setCategories(categories));
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
