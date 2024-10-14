import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./User.css";
import "./Card/Card.css";
import UserContext from "../utils/UseContext";
import Card from "./Card/Card";
import my_pic from "./my_pic.jpg";
import {
  BacklogIcon,
  TodoIcon,
  InProgressIcon,
  DoneIcon,
  DefaultStatusIcon,
  LowPriorityIcon,
  MediumPriorityIcon,
  HighPriorityIcon,
  UrgentPriorityIcon,
  NoPriorityIcon,
  PlusIcon,
  ThreeDotIcon,
} from "./Icons";

const User = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { navdata } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        setTickets(res.data.tickets);
        setUsers(res.data.users);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const gettingdata = () => {
    return tickets.reduce((acc, ticket) => {
      const user = users.find((user) => user.id === ticket.userId);
      const namee = user ? user.name : "Unknown";

      if (!acc[namee]) {
        acc[namee] = { name: namee, tickets: [] };
      }

      acc[namee].tickets.push(ticket);

      return acc;
    }, {});
  };
  const realdata = gettingdata();

  const sortTickets = (tickets) => {
    if (navdata.order.priority) {
      
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (navdata.order.title) {
      
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets; 
  };

  const groupByStatus = () => {
    return Object.entries(realdata).reduce((acc, current) => {
      current[1]?.tickets?.forEach((element) => {
        if (acc[element.status]) {
          acc[element.status].push(element);
        } else {
          acc[element.status] = [element];
        }
      });
      return acc;
    }, {});
  };
  const priorityLabels = {
    0: "No Priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent",
  };
  const groupBypriority = () => {
    return Object.entries(realdata).reduce((acc, current) => {
      current[1]?.tickets?.forEach((element) => {
        const priorityLabel = priorityLabels[element.priority] || "Unknown";
        if (acc[priorityLabel]) {
          acc[priorityLabel].push(element);
        } else {
          acc[priorityLabel] = [element];
        }
      });
      return acc;
    }, {});
  };

  const a = groupByStatus();
  const c = groupBypriority();

  if (isLoading) {
    return (
      <div class="loader-container">
  <div class="loader"></div>
</div>

    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h1>Error fetching data.</h1>
      </div>
    );
  }

  let content;
  if (navdata.group.status) {
    content = (
      <>
        <div
          className="dashContainer"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          {Object.entries(a).map(([status, ticketss], index) => {
            
            const tickets = sortTickets(ticketss);
            
            const a = tickets?.length;

            const cardWidthPercentage = 18.7;
            return (
              <div
                key={index}
                className="dashCardContainer"
                style={{ width: `${cardWidthPercentage}%` }}
              >
                <div className="dashCardHeading flex-sb">
                  <div className="leftView">
                    <div
                      className="cardTitle"
                      style={{
                        width: "15px",
                        height: "15px",
                        display: "inline-block",
                        fontWeight: 200,
                      }}
                    >
                      {status === "Backlog" ? (
                        <BacklogIcon />
                      ) : status === "Todo" ? (
                        <TodoIcon />
                      ) : status === "In progress" ? (
                        <InProgressIcon />
                      ) : status === "Done" ? (
                        <DoneIcon />
                      ) : (
                        <DefaultStatusIcon />
                      )}
                    </div>
                    <span
                      style={{
                        paddingLeft: "5px",
                      }}
                    >
                      {status}
                    </span>
                    <span className="totalcountcards">{a}</span>
                  </div>

                  <div className="rightView">
                    <PlusIcon />{" "}
                    <span>
                      <ThreeDotIcon />
                    </span>
                  </div>
                </div>

                <div className="dashList flex-gap-10">
                  {tickets.map((ticket) => (
                    <Card
                      id={ticket.id}
                      title={ticket.title}
                      tag={ticket.tag}
                      status={ticket.status}
                      priority={ticket.priority}
                      type="status"
                    />
                  ))}
                </div>
              </div>
            );
          })}
          <>
            <div className="dashCardHeading flex-sb">
              <div
                className="leftView"
                style={{
                  fontSize: "15px",
                  marginRight: "90px",
                  wordSpacing: "4px",
                }}
              >
                <div
                  className="cardTitle"
                  style={{
                    width: "13px",
                    height: "13px",
                    display: "inline-block",
                    fontWeight: 200,
                  }}
                >
                  <DoneIcon />
                </div>{" "}
                <span style={{ fontSize: "13px", fontWeight: "lighter" }}>
                  Done
                </span>{" "}
                <span className="totalcountcards">0</span>
              </div>

              <div className="rightView">
                <PlusIcon />{" "}
                <span>
                  <ThreeDotIcon />
                </span>
              </div>
            </div>
            <div className="dashCardHeading flex-sb">
              <div
                className="leftView"
                style={{
                  fontSize: "15px",
                  marginRight: "60px",
                  wordSpacing: "4px",
                }}
              >
                <div
                  className="cardTitle"
                  style={{
                    width: "9px",
                    height: "9px",
                    display: "inline-block",
                    fontWeight: 200,
                  }}
                >
                  <DefaultStatusIcon />
                </div>{" "}
                <span style={{ fontSize: "13px", fontWeight: "lighter" }}>
                  Canceled
                </span>{" "}
                <span className="totalcountcards">0</span>
              </div>

              <div className="rightView">
                <PlusIcon />{" "}
                <span>
                  <ThreeDotIcon />
                </span>
              </div>
            </div>
          </>
        </div>
      </>
    );
  } else if (navdata.group.user) {
    content = (
      <>
        <div
          className="dashContainer"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          {Object.entries(realdata).map((e, index) => {
            const name = e[1].name;
            const userinfoo = e[1].tickets;
            const userinfo = sortTickets(userinfoo);
            const a = userinfo?.length;

            const cardWidthPercentage = 18.7;
            return (
              <div
                key={index}
                className="dashCardContainer"
                style={{ width: `${cardWidthPercentage}%` }}
              >
                <div className="dashCardHeading flex-sb">
                  <div
                    className="leftView"
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      className="imageContainer relative"
                      style={{ width: "30px", height: "30px" }}
                    >
                      <img
                        src={my_pic}
                        style={{ width: "25px", borderRadius: "50%" }}
                      />
                      <div className="showStatus"></div>
                    </div>
                    <div
                      style={{
                        paddingLeft: "20px",
                      }}
                    >
                      {name}
                    </div>
                    <span className="totalcountcards">{a}</span>
                  </div>

                  <div className="rightView">
                    <PlusIcon />{" "}
                    <span>
                      <ThreeDotIcon />
                    </span>
                  </div>
                </div>

                <div className="dashList flex-gap-10">
                  {userinfo.map((ticket) => (
                    <Card
                      id={ticket.id}
                      title={ticket.title}
                      tag={ticket.tag}
                      status={ticket.status}
                      priority={ticket.priority}
                      type="user"
                    />
                  ))}
                </div>
              </div>
            );
          })}
          <></>
        </div>
      </>
    );
  } else {
    content = (
      <>
        <div
          className="dashContainer"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          {Object.entries(c).map(([priority, ticketss], index) => {
            const cardWidthPercentage = 18.7;
            const tickets = sortTickets(ticketss);
            const a = tickets?.length;

            return (
              <div
                key={index}
                className="dashCardContainer"
                style={{ width: `${cardWidthPercentage}%` }}
              >
                <div className="dashCardHeading flex-sb">
                  <div className="leftView">
                    <div
                      className="tags color-grey"
                      style={{
                        width: "35px",
                        height: "30px",
                        display: "inline-block",
                      }}
                    >
                      {priority === "Low" && <LowPriorityIcon />}
                      {priority === "Medium" && <MediumPriorityIcon />}
                      {priority === "High" && <HighPriorityIcon />}

                      {priority === "Urgent" && <UrgentPriorityIcon />}

                      {priority === "No Priority" && <NoPriorityIcon />}
                    </div>
                    <span>{priority}</span>
                    <span className="totalcountcards">{a}</span>
                  </div>

                  <div className="rightView">
                    <PlusIcon />{" "}
                    <span>
                      <ThreeDotIcon />
                    </span>
                  </div>
                </div>

                <div className="dashList flex-gap-10">
                  {tickets.map((ticket) => (
                    <Card
                      id={ticket.id}
                      title={ticket.title}
                      tag={ticket.tag}
                      status={ticket.status}
                      priority={ticket.priority}
                      type="priority"
                    />
                  ))}
                </div>
              </div>
            );
          })}
          <></>
        </div>
      </>
    );
  }

  return content;
};

export default User;
