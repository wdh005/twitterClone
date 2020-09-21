import React, { useEffect, useState } from "react";
import Tweet from "../components/Tweet";
import { dbService } from "../myFirebase";
import TweetFactory from "../components/TweetFactory";

const Home = ({ userObj }) => {
    const [tweets, setTweets] = useState([]);
    useEffect(() => {
        dbService.collection("tweets").onSnapshot((snapshot) => {
            const tweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        });
    }, []);

    return (
        <div>
            <TweetFactory userObj={userObj} />
            <div>
                {tweets.map((tweet) => (
                    <Tweet
                        ket={tweet.id}
                        tweetObj={tweet}
                        isOwner={tweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
