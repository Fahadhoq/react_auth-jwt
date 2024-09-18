import classes from "../styles/Button.module.css";

export default function Button({ className, children, onClick }) {
  return (
    <button className={`${classes.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
