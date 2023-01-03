import React, { useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getSingleQuote } from "../../lib/api";
import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";
import LoadingSpinner from "../UI/LoadingSpinner";
// const DUMMY_QUOTES = [
//   {
//     id: "q1",
//     author: "rahul",
//     text: "Learning react is fun!",
//   },
//   {
//     id: "q2",
//     author: "max",
//     text: "Learning react is Great!",
//   },
// ];
export default function QuoteDetails() {
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);
  const params = useParams();
  const { quoteId } = params;
  const match = useRouteMatch();

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="cerntered">{error}</p>;
  }
  // const quote = DUMMY_QUOTES.find((quo) => quo.id === params.quoteId);
  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
}
/* { <Route path={`/quotes/${params.quoteId}/comments`}>} */

/* <Route path={`/quotes/${params.quoteId}`} exact></Route> */

/* <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}></Link> */
