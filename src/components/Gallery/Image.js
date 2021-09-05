import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import ImageTab from "./ImageTab";
import Axios from "axios";
import axiosInstance from "../../helper/axios";
import Skeleton from "react-loading-skeleton";

function Image() {
  const [images, setImages] = useState();
  const [imageItem, setImageItem] = useState();
  const [active, setActive] = useState();

  const handleActive = (slug) => {
    const imageFilter = images.filter((img) => img.slug === slug)[0];
    setActive(slug);
    setImageItem(imageFilter);
  };

  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/gallery`, {
          cancelToken: source.token,
        });
        setImages((await response).data.gallery);
        setImageItem((await response).data.gallery[0]);
        setActive((await response).data.gallery[0].slug);
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
  }, []);
  console.log(imageItem, "hello");
  return (
    <div>
      <div class="gallery-section">
        <div class="gallery-menu">
          <div class="tab">
            {images ? (
              images.map((tab) => (
                <>
                  <button
                    className={
                      "my_tabs" + active && active === tab.slug ? "active" : " "
                    }
                    onClick={() => handleActive(tab.slug)}
                  >
                    {tab.title}
                  </button>
                </>
              ))
            ) : (
              <Skeleton width={400} />
            )}
          </div>

          <div class="gallery-tab-content-all">
            <div id="room">
              <ImageTab imageItem={imageItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Image;
