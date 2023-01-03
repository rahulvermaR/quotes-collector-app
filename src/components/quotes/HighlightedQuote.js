import classes from "./HighlightedQuote.module.css";

const HighlightedQuote = (props) => {
  console.log(props.text);

  return (
    <figure className={classes.quote}>
      <p>{props.text}</p>
      <figcaption>{props.author}</figcaption>
    </figure>
  );
};

export default HighlightedQuote;
