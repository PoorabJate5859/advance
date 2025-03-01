import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPostData } from "../feature/blogSlice";
import LoadingSpinner from "./LoadingSpinner";

function EntryDetail() {
  const { entryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedEntry, loadingStatus, errorMessage } = useSelector(
    (state) => state.blogData
  );

  useEffect(() => {
    dispatch(loadPostData(entryId));
  }, [dispatch, entryId]);

  if (loadingStatus === "loading") {
    return <LoadingSpinner />;
  }

  if (loadingStatus === "failed") {
    return (
      <div className="error-container">
        <h3>Error Loading Entry</h3>
        <p>{errorMessage}</p>
        <button className="action-button" onClick={() => navigate("/")}>
          Return to List
        </button>
      </div>
    );
  }

  return (
    <div className="entry-details-container">
      <button className="back-button" onClick={() => navigate("/")}>
        &larr; Back to List
      </button>

      <article className="entry-content">
        <h1>{selectedEntry?.title}</h1>
        <p className="entry-body">{selectedEntry?.body}</p>
        <span className="user-id">ID: {selectedEntry?.id}</span>
        <span className="user-tag">Author ID: {selectedEntry?.userId}</span>
      </article>

      <section className="comments-section">
        <h2>Reader Comments</h2>
        <div className="comment-list">
          {selectedEntry?.comments?.map((comment) => (
            <div key={comment.id} className="comment-item">
              <h4 className="comment-author">{comment.name}</h4>
              <p className="comment-email">{comment.email}</p>
              <p className="comment-text">{comment.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default EntryDetail;