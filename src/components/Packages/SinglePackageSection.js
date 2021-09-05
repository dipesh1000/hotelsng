import React, { useEffect, useState } from "react";
import Axios from "axios";
import axiosInstance from "../../helper/axios";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import PackageForm from "./PackageForm";

function SinglePackageSection() {
  let { slug } = useParams();
  const [packages, setPackages] = useState();
  const [packageId, setPackageId] = useState();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(false);

  const modalOff = () => {
    document.getElementById("modal_btn").click();
    setSending(true);
  };

  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/package/single/${slug}`, {
          cancelToken: source.token,
        });
        setPackages((await response).data.packages);
        setPackageId((await response).data.packages.id);
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
      <div className="package-section">
        <div className="package-quick-info">
          <div className="package-quick-info-title">Quick Information</div>
          <div className="divider-in-package"></div>

          {packages ? (
            <div className="package-quick-info-content">
              <div className="package-quick-info-fact">
                <i className="fa fa-location-arrow"></i>
                <span>Location:</span> Kathmandu, Nepal
              </div>
              {packages && packages.duration ? (
                <div className="package-quick-info-fact">
                  <i className="fa fa-clock"></i>
                  <span>Duration:</span> 3 nights, 4 days
                </div>
              ) : null}

              {packages && packages.language ? (
                <div className="package-quick-info-fact">
                  <i className="fa fa-language"></i>
                  <span>Language:</span>
                  {packages.language}
                </div>
              ) : null}

              {packages && packages.min_group_size ? (
                <div className="package-quick-info-fact">
                  <i className="fa fa-users"></i>
                  <span>Min. group size:</span> {packages.min_group_size}
                </div>
              ) : null}
            </div>
          ) : (
            <div style={{ marginBottom: "30px" }}>
              <Skeleton />
            </div>
          )}
        </div>

        <div className="package-overview">
          {packages ? (
            <div className="overview-title">
              Package Overview: {packages && packages.title}
            </div>
          ) : (
            <div className="overview-title">
              <Skeleton width={400} />
            </div>
          )}

          <div className="divider-in-package"></div>
          {packages ? (
            <div
              className="package-overview-description"
              dangerouslySetInnerHTML={
                packages && { __html: packages.description }
              }
            ></div>
          ) : (
            <Skeleton count={2} />
          )}

          <div className="package-enquiry-modal">
            {/* <!-- Button trigger modal --> */}
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              id="modal_btn"
              disabled={sending}
            >
              Book Now{" "}
              {sending && (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
            </button>
            {message && (
              <div className="send_message enquiry_message">
                <h3>Message Send Successfully</h3>
              </div>
            )}

            {/* {sending && (
              <div className="send_message enquiry_message">
                <h3>Message Send Successfully</h3>
              </div>
            )} */}
            {/* <button onClick={modalOff}>off</button> */}

            {/* <!-- Modal --> */}

            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Enquire with our
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  {packages && (
                    <PackageForm
                      packageId={packageId}
                      modal={modalOff}
                      setSending={setSending}
                      setMessage={setMessage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="package-overview-note">
            <strong>NOTE:</strong> Price = NRS 15,000 (For Nepali), INR 11,000
            (For Indian) and $200 (For tourists outside Nepal & India)
          </div>
          <div className="divider-in-package-overview"></div>
          <div className="package-include-list">
            <p>Included</p>
            <ul>
              {packages &&
                packages.inclusions.map((include, index) => (
                  <li>
                    {" "}
                    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUwNy4yIDUwNy4yIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MDcuMiA1MDcuMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGNpcmNsZSBzdHlsZT0iZmlsbDojMzJCQTdDOyIgY3g9IjI1My42IiBjeT0iMjUzLjYiIHI9IjI1My42Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMEFBMDZFOyIgZD0iTTE4OC44LDM2OGwxMzAuNCwxMzAuNGMxMDgtMjguOCwxODgtMTI3LjIsMTg4LTI0NC44YzAtMi40LDAtNC44LDAtNy4yTDQwNC44LDE1MkwxODguOCwzNjh6Ii8+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTI2MCwzMTAuNGMxMS4yLDExLjIsMTEuMiwzMC40LDAsNDEuNmwtMjMuMiwyMy4yYy0xMS4yLDExLjItMzAuNCwxMS4yLTQxLjYsMEw5My42LDI3Mi44DQoJCWMtMTEuMi0xMS4yLTExLjItMzAuNCwwLTQxLjZsMjMuMi0yMy4yYzExLjItMTEuMiwzMC40LTExLjIsNDEuNiwwTDI2MCwzMTAuNHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTM0OC44LDEzMy42YzExLjItMTEuMiwzMC40LTExLjIsNDEuNiwwbDIzLjIsMjMuMmMxMS4yLDExLjIsMTEuMiwzMC40LDAsNDEuNmwtMTc2LDE3NS4yDQoJCWMtMTEuMiwxMS4yLTMwLjQsMTEuMi00MS42LDBsLTIzLjItMjMuMmMtMTEuMi0xMS4yLTExLjItMzAuNCwwLTQxLjZMMzQ4LjgsMTMzLjZ6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" />
                    {include}
                  </li>
                ))}
            </ul>
          </div>
          <div className="divider-in-package-overview"></div>
          <div className="package-exclude-list">
            <p>Excluded</p>
            <ul>
              {packages &&
                packages.exclusions.map((exclude, index) => (
                  <li>
                    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0UwMjMwRDsiIGQ9Ik0yNTguOTA1LDAuMDIxdjUxMS45NTlDMzk4Ljk0OCw1MTAuNDI0LDUxMiwzOTYuNDE0LDUxMiwyNTZTMzk4Ljk0OCwxLjU3NiwyNTguOTA1LDAuMDIxeiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGNTQ0MDsiIGQ9Ik0yNTguOTA1LDAuMDIxQzM4MS44NzgsMS43OTMsNDgxLjA5NSwxMTUuNzIsNDgxLjA5NSwyNTZzLTk5LjIxNywyNTQuMjA3LTIyMi4xODksMjU1Ljk3OQ0KCUMyNTcuOTM3LDUxMS45OSwyNTYuOTY4LDUxMiwyNTYsNTEyQzExNC42MTgsNTEyLDAsMzk3LjM4MiwwLDI1NlMxMTQuNjE4LDAsMjU2LDBDMjU2Ljk2OCwwLDI1Ny45MzcsMC4wMSwyNTguOTA1LDAuMDIxeiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0M2RThGRjsiIGQ9Ik00MTMuNDIyLDE0Mi4yODlsLTE2LjE5NCwxNi4xOTRMMjY1LjUxOSw0NDkuODU5YzQ2LjUxMy0yLjI1NSw5Mi4zNDUtMjEuMDk3LDEyNy43OTQtNTYuNTQ3DQoJQzQ2MS41OTMsMzI1LjAzMiw0NjguMjg5LDIxOC4xNTEsNDEzLjQyMiwxNDIuMjg5eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOTcuMjI4LDE1OC40ODNjMTQuMDMxLDI4LjY2LDIyLjA1Niw2MS45NjUsMjIuMDU2LDk3LjUxNw0KCWMwLDEwMy40NTEtNjguMDEzLDE4OC4wMDgtMTUzLjc2NSwxOTMuODU5Yy0wLjA2MiwwLjAxLTAuMTI0LDAuMDEtMC4xODUsMC4wMWMtNDMuMDMxLDIuMDUtODYuNjE4LTEwLjA5Ni0xMjMuMDQ1LTM2LjQ0OA0KCUwzOTcuMjI4LDE1OC40ODN6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQzZFOEZGOyIgZD0iTTM2OS43MTEsOTguNTc4bC04LjcwNSw4LjcwNWwtOTUuMzAyLTQ1LjEzMkMzMDIuMzg5LDYzLjk2NCwzMzguNjUxLDc2LjExLDM2OS43MTEsOTguNTc4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zNjEuMDA2LDEwNy4yODNMOTguNTc4LDM2OS43MTFjLTU0Ljg2Ny03NS44NjMtNDguMTcxLTE4Mi43NDQsMjAuMTA5LTI1MS4wMjQNCgljNDAuMzIxLTQwLjMyMSw5NC4xMDctNTkuMTc0LDE0Ny4wMTctNTYuNTM2QzMwMS44OTUsNjQuNjc1LDMzNC45MzIsODEuMjE5LDM2MS4wMDYsMTA3LjI4M3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
                    {exclude}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePackageSection;
