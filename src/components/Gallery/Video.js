import React, {useEffect, useState} from "react";
import axiosInstance from "../../helper/axios";
import Axios from "axios"

function Video() {
  const [videos, setVideos] = useState()

  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/video-gallery`, {
          cancelToken: source.token,
        });
        setVideos((await response).data.videos )
        
      } catch (error) {
        if (!Axios.isCancel(error)) {
          throw error;
        }
      }
      return () => {
        source.cancel();
      };
    };
    loadData();
  }, [])
  console.log(videos)
  return (
    <div>
      <div className="video-gallery-section">
        <div className="container">
          <div className="row">
            {videos && videos.map((video)=>
            <div className="col-md-4">
              <div className="video">
                <iframe
                  width="100%"
                  height="175px"
                  src={video.youtube_url}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
