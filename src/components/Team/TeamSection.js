import React, { useEffect, useState } from "react";
import axiosInstance from "../../helper/axios";
import Axios from "axios";

function TeamSection() {
  const [team, setTeam] = useState();

  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/teams`, {
          cancelToken: source.token,
        });
        setTeam((await response).data.teams);
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
      <div className="team-section">
        <div
          className="team-heading"
          dangerouslySetInnerHTML={{
            __html: team && team.heading.team_description,
          }}
        ></div>
        <div className="team-all">
          {team &&
            team?.teams?.map((team) => (
              <div className="team-member">
                <div className="row">
                  <div className="col-sm-3">
                    <div className="team-member-image">
                      <img src={team.image} />
                    </div>
                  </div>
                  <div className="col-sm-9">
                    <div className="team-member-text">
                      <div className="team-member-name">{team.title}</div>
                      <div className="team-member-position">
                        {team.designation}
                      </div>
                      <div
                        className="para"
                        dangerouslySetInnerHTML={{ __html: team.description }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TeamSection;
