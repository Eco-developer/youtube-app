import { ResulstMain } from '../../components/results-main/index';
import { ResultsPageContainer } from "./style"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Channel, Video } from "../../interfaces";
import { request } from "../../services";
import * as API from "../../const/youtube-api";
import { Footer } from '../../components/footer';
import { NotFound } from '../../components/not-found';

interface SetVideos {
  items: Video[] | null, 
  nextPageToken?: string | null | undefined, 
}

interface SearchItem {
  etag: string
  id: {
    kind: string, 
    videoId: string
  }
  kind: string
}

export const ResultsPage = () => {
  const [videos, setVideos] = useState<SetVideos | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [queries] = useSearchParams();
  const q = queries.get('q');
  const navigate = useNavigate();

  useEffect(() => {
    if (!q) {
        navigate('/');
    }
    let controller: AbortController | null = new AbortController();

    const fetchApi = async () => {
        try {
            const searchResponse = await request.get('search',
            {
              params : {
                maxResults: API.MAXRESULTS.SERACH,
                part: API.PART.SERACH,
                q,
                safeSearch: API.SAFE,
                order: API.ORDER,
                type: API.TYPE,
                key: API.KEY,
                regionCode: API.REGIONCODE,
              },
              signal: controller?.signal,
            }
          )

          if(!searchResponse.data.items.length) {
            setError(true);
            return;
          }

          const videosIds = searchResponse.data.items.map((item: SearchItem) => item.id.videoId);

          const videosResponse = await request.get('videos',
            { 
              params : {
                  maxResults: API.MAXRESULTS.VIDEOS,
                  part: API.PART.VIDEOS,
                  id: videosIds.join(','),
                  key: API.KEY,
              },
              signal: controller?.signal
            }
          );

          const channelsId : (string | undefined)[] = Array.from(new Set(videosResponse.data.items.map((item:Video) => item.snippet?.channelId)))

          const channelsResponse = await request.get('channels',
            { 
              params : {
                  maxResults: API.MAXRESULTS.CHANNEL,
                  part: API.PART.CHANNEL,
                  id: channelsId.join(','),
                  key:API.KEY,
              },
              signal: controller?.signal,
            }
          );  
          const videosItems : Video[] = videosResponse.data.items.map((itemVideo: Video) => {
				    const channel = channelsResponse.data.items.find((itemChannel: Channel) => itemChannel.id === itemVideo.snippet?.channelId)
					  return {
              ...itemVideo,
              channel,
					  }
				  })

          setVideos({items: videosItems, nextPageToken: searchResponse.data.nextPageToken})
           
          } catch (errorRes: any) {
              console.log(errorRes)
              if (errorRes) {
                  setError(true);
              } 
          }
          controller = null;
        }
        setError(false);
        setVideos(null);
        fetchApi();
        return () => controller?.abort()
    }, [q])

  return (
    <ResultsPageContainer> 
      {!error ? (
        <>
          <ResulstMain 
            videos={videos?.items} 
            nextPageToken={videos?.nextPageToken} 
            q={q} 
            setVideos={setVideos}
          />
          <Footer/>
        </>
       )
      : <NotFound/>}
    </ResultsPageContainer>
  )
}
