import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

function ImageTab({ imageItem }) {
  const [imgUrl, setImgUrl] = useState();
  const arr = [0, 1, 2, 3, 4, 5];

  return (
    <>
      <SimpleReactLightbox>
        <SRLWrapper>
          <div className="row">
            {imageItem ? (
              imageItem.images.map((image) => (
                <div className="col-md-4 image_gallery">
                  <img src={image.image} className="img-fluid" />
                </div>
              ))
            ) : (
              <>
                {[0, 1, 2, 3, 4, 5].map((a) => (
                  <div className="col-md-4 image_gallery">
                    <Skeleton height={200} />
                  </div>
                ))}
              </>
            )}
          </div>
        </SRLWrapper>
      </SimpleReactLightbox>
    </>
  );
}

export default ImageTab;
