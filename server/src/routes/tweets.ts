import { Router, Response } from "express";
import { errorObj } from "../constants";
import { useAuth } from "../hooks";
import { IRequest } from "../interfaces";
import ProfileModel from "../models/Profile.model";
import TweetModel from "../models/Tweet.model";
import Logger from "../utils/Logger";

const router = Router();

router.get("/", useAuth, async (req: IRequest, res: Response) => {
  const tweets = await TweetModel.find();

  return res.json({ tweets, status: "success" });
});

router.get("/:tweetId", useAuth, async (req: IRequest, res: Response) => {
  const { tweetId } = req.params;

  try {
    const tweet = await TweetModel.findById(tweetId);

    if (!tweet) {
      return res.json(errorObj("Tweet was not found")).status(404);
    }

    return res.json({
      status: "success",
      tweet,
    });
  } catch (e) {
    Logger.error("GET: tweet", e);
  }
});

router.post("/", useAuth, async (req: IRequest, res: Response) => {
  const { body } = req.body;

  if (!body) {
    return res.json(errorObj("Please fill in all fields")).status(400);
  }

  if (body.length > 500) {
    return res.json(errorObj("Tweet has a max length of 500 characters"));
  }

  try {
    const profile = await ProfileModel.findOne({ user_id: req.user?._id });
    const newTweet = new TweetModel({ user_id: req.user?._id, profile, body });

    await newTweet.save();

    return res.json({
      status: "success",
      tweetId: newTweet._id,
    });
  } catch (e) {
    Logger.error("POST: tweets", e);
    return res.json(errorObj("An error occurred")).status(500);
  }
});

router.delete("/:tweetId", useAuth, async (req: IRequest, res: Response) => {
  const { tweetId } = req.params;

  try {
    const tweet = await TweetModel.findById(tweetId);

    if (!tweet) {
      return res.json(errorObj("tweet was not found")).status(404);
    }

    if (tweet.user_id.toString() !== req.user?._id.toString()) {
      return res.json(errorObj("Forbidden")).status(403);
    }

    await TweetModel.findByIdAndDelete(tweetId);

    return res.json({
      status: "success",
    });
  } catch (e) {
    Logger.error("DELETE: tweets", e);
    return res.json(errorObj("An error occurred")).status(500);
  }
});

export default router;
