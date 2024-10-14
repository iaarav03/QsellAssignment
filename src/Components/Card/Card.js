import React from "react";
import "./Card.css";
import my_pic from "../my_pic.jpg"
import { 
  BacklogIcon, 
  TodoIcon, 
  InProgressIcon, 
  DoneIcon, 
  DefaultStatusIcon,
  LowPriorityIcon,
  MediumPriorityIcon,
  HighPriorityIcon,
  UrgentPriorityIcon2,
  NoPriorityIcon,
  

}  from "../Icons";
const Card = ({ id, title, tag, status, priority,type }) => {
    console.log("priority",priority);
  const isStatus = type === "status";
  const isPriority = type === "priority";
  const isUser=type==="user";
//   console.log(type);
  const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done'];
  const getStatusIndex = (status) => {
    return statusOrder.indexOf(status);
  };
  return (
    <div className="cardContainer flex-gap-10" style={{ gap: "5px" }}>
      <div className="cardHeading flex-sb">
        <span style={{ textTransform: "uppercase" }} className="color-grey">
          {id}
        </span>
        {isUser===false && (<div
          className="imageContainer relative"
          style={{ width: "30px", height: "30px" }}
        >
           
           <img
                        src={my_pic}
                        style={{ width: "25px", borderRadius: "50%" }}
                      />
          <div className="showStatus"></div>
        </div>)}
        
      </div>
      <div className="cardTitle" style={{ fontWeight: 200 }}>
        {!isStatus &&
          (
            status === "Backlog" ? (
              <BacklogIcon/>
            )
              : status === "Todo" ? (
               <TodoIcon/>
              ) : status === "In progress" ? (
                <InProgressIcon/>
              ) : status === "Done" ? (
               <DoneIcon/>
              )
                : (
                 <DefaultStatusIcon/>
                ))}
        <span style={{ margin: "0.2px", paddingLeft:"5px" }}>{title}</span>
      </div>
      <div className="cardTags">
        {!isPriority ? (
          <div className="tags color-grey">
            
            
               {priority === 1 && (
                   <LowPriorityIcon/>
                    
                  )}
                  {priority === 2 && (
                   <MediumPriorityIcon/>
                    
                  )}
                  {priority === 3 && (
                   <HighPriorityIcon/>
                    
                  )}
                  {priority === 4 && (
                    <UrgentPriorityIcon2/>
                  )

}
{priority === 0 && 
  <NoPriorityIcon/>

}
             
          </div>
        ) : null}
        {tag?.map((element, index) => {
          return (
            <div key={index} className="tags color-grey">
              {" "}
              <span>•</span> {element}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Card;
