import React, { useEffect, useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import axiosInstance from "../../helper/axios";
import RestaurantTab from "./RestaurantTab";
import Axios from "axios";
import RestaurantSlider from "./RestaurantSlider";
import Skeleton from "react-loading-skeleton";

function ResturantSection() {
  const [foods, setFoods] = useState();
  const [sliders, setSliders] = useState();
  const [foodItem, setFoodItem] = useState();
  const [active, setActive] = useState();
  const [title, setTitle] = useState();

  const handleActive = (slug) => {
    const foodFilter = foods.filter((food) => food.slug === slug)[0];
    setActive(slug);
    setFoodItem(foodFilter);
  };
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/restaurant`, {
          cancelToken: source.token,
        });
        setTitle((await response).data.title);
        setFoods((await response).data.foodCategories);
        setSliders((await response).data.sliders);
        setFoodItem((await response).data.foodCategories[0]);
        setActive((await response).data.foodCategories[0].slug);
        // console.log((await response).data.foodCategories[0].slug, 'hello')
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
    <div>
      <div className="restaurant-section">
        <div className="happy-hours">
          <div dangerouslySetInnerHTML={{ __html: title && title }} />
          <div class="restaurant-menu">
            {/* <!-- Tab links --> */}

            <div class="tab">
              {foods ? (
                foods.map((duration) => (
                  <button
                    className={
                      active && active === duration.slug ? "active" : " "
                    }
                    onClick={() => handleActive(duration.slug)}
                  >
                    {duration.title}
                  </button>
                ))
              ) : (
                <Skeleton width={450} />
              )}
            </div>

            {/* <!-- Tab content --> */}
            <div class="menu-tab-content-all">
              <RestaurantTab foodItem={foodItem} />
            </div>
          </div>
        </div>
      </div>
      <RestaurantSlider sliders={sliders} />
    </div>
  );
}

export default ResturantSection;
