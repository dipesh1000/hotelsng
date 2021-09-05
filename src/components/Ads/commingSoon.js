import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import axiosInstance from "../../helper/axios";
import Axios from "axios";

const CommingSoon = () => {
  const closeModal = (id) => {
    $("#commingModal_"+id).toggle();
  };
  const clickModal = () => {
    $(".modal_div").toggleClass("active");
  };

  const [popup, setPopup] = useState();

  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/pop-images`, {
          cancelToken: source.token,
        });
        setPopup((await response).data.data);
        console.log((await response).data.data);
        $(".comming_modal").toggle();
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
      {popup &&
        popup.map((popup) => (
          <div className="modal_div active" onClick={clickModal}>
            <div className="comming-soon-section">
              <div
                className="modal comming_modal"
                id={`commingModal_${popup.id}`}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="text-right pr-2">
                      <button
                        type="button"
                        className="close"
                        onClick={() => closeModal(popup.id)}
                      >
                        &times;
                      </button>
                    </div>

                    <div className="modal-body">
                      <img
                        src={popup && popup.image}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
export default CommingSoon;
