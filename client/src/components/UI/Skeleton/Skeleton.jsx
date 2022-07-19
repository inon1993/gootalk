import Card from "../Card/Card";
import classes from "./Skeleton.module.css";

export default function Skeleton({ type, counter }) {
  const COUNTER = counter;
  const PostSkeleton = () => (
    <Card className={classes["post-skeleton"]}>
      <div className={classes["post-upper-sk"]}>
        <div className={classes["post-profile-pic-sk"]}></div>
        <div className={classes["post-name-sk"]}></div>
      </div>
      <div className={classes["post-body-sk"]}>
        <div className={classes["post-body-text-sk"]}></div>
        <div className={classes["post-body-text-sk"]}></div>
        <div className={classes["post-img-sk"]}></div>
      </div>
      <div className={classes["post-like-sk"]}></div>
    </Card>
  );
  if (type === "post") return Array(COUNTER).fill(<PostSkeleton />);
}
