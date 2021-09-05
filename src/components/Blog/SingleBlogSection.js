import React, { useEffect, useState } from "react";
import Banner from "../Common/Banner";
import Axios from "axios";
import axiosInstance from "../../helper/axios";
import Skeleton from "react-loading-skeleton";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { Link, useParams } from "react-router-dom";
// import {
//   FacebookShareButton,
//   InstapaperShareButton,
//   TwitterShareButton,
// } from "react-share";

function SingleBlogSection() {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState();
  const [recents, setRecents] = useState();

  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/blog/single/${slug}`, {
          cancelToken: source.token,
        });
        setBlogs((await response).data.blogs);
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
  }, [slug]);
  console.log(blogs, "From Blogs in Single Page")
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/recent_blogs`, {
          cancelToken: source.token,
        });
        setRecents((await response).data.recent_blogs);
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
  return (
    <>
      <main className="blog_single blog-detail">
        <div className="row">
          <div className="col-lg-8">
            <div className="products products-detail">
              <div className="header">
                {blogs ? (
                  <h1>{blogs.title}</h1>
                ) : (
                  <h1>
                    <Skeleton />
                  </h1>
                )}
              </div>
              <div className="details">
                {blogs ? (
                  <>
                    <h2>by {blogs.author}</h2>
                    <div className="line">|</div>
                    <h2>{blogs.date}</h2>
                  </>
                ) : (
                  <h2>
                    <Skeleton width={400} />
                  </h2>
                )}
              </div>
              <div className="image-coantainer">
                {blogs ? (
                  <img className="img-fluid" src={blogs.image} alt={blogs.title} />
                ) : (
                  <Skeleton height={600} />
                )}
              </div>
              {/* <FacebookShareButton /> */}
              {blogs ? (
                <div
                  className="para"
                  dangerouslySetInnerHTML={{ __html: blogs.description }}
                ></div>
              ) : (
                <Skeleton count={10} />
              )}
            </div>
            <div className="product-footer">
              <div className="share-list">
                {/* <ul>
                  <li className="text">Share :</li>
                  <li>
                    <FacebookShareButton url={`https://hotelsng.com.np/blog/${slug}`} quote={""} hashtag="">
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                  </li>

                  <li>
                    <TwitterShareButton url={shareUrl}>
                      <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="side-header">
              <div className="header">Recent Posts</div>

              {recents &&
                recents.map((recent) => (
                  <Link to={"/blog/" + recent.slug}>
                    <div className="list">
                      <div className="text">{recent.title}</div>
                      <div className="date">{recent.date}</div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SingleBlogSection;
