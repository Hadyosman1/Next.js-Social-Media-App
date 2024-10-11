import styles from "./styles.module.css";
const { dotSpinner, dotSpinner__dot } = styles;

const SmallSpinner = () => {
  return (
    <div className={dotSpinner}>
      <div className={dotSpinner__dot}></div>
      <div className={dotSpinner__dot}></div>
      <div className={dotSpinner__dot}></div>
      <div className={dotSpinner__dot}></div>
      <div className={dotSpinner__dot}></div>
      <div className={dotSpinner__dot}></div>
      <div className={dotSpinner__dot}></div>
      <div className={dotSpinner__dot}></div>
    </div>
  );
};

export default SmallSpinner;
