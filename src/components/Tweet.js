import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { dbService, storageService } from "../myFirebase";

const Tweet = ({ tweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("정말로 삭제하시겠습니까?");
        if (ok) {
            //delete
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            await storageService.refFromURL(tweetObj.attachmentUrl).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text: newTweet,
        });
        setEditing(false);
    };
    const onChange = (evnet) => {
        const {
            target: { value },
        } = evnet;
        setNewTweet(value);
    };
    return (
        <div className="tweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container tweetEdit">
                        <input
                            type="text"
                            placeholder="Edit your tweet"
                            value={newTweet}
                            required
                            onChange={onChange}
                            autoFocus
                            className="formInput"
                        />
                        <input
                            type="submit"
                            value="Update Tweet"
                            className="formBtn"
                        />
                    </form>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </span>
                </>
            ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.attachmentUrl && (
                        <img src={tweetObj.attachmentUrl} />
                    )}
                    {isOwner && (
                        <div className="tweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Tweet;
