import classes from "./RightMenuFriends.module.css";
import RightMenuFriend from "./RightMenuFriend/RightMenuFriend";

const RightMenuFriends = ({ notification, friends }) => {
  return (
    <div
      className={`${classes["right-menu-friends"]} ${
        !notification && classes["no-notification"]
      }`}
    >
      {friends.map((res, i) => {
        return <RightMenuFriend key={i} friend={res} />;
      })}
    </div>
  );
};

export default RightMenuFriends;
