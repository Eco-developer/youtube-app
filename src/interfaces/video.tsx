import { Snippet } from "./snippet";
import { Channel } from "./channel";
import { ContentDetails } from "./content-details";
import { Status } from "./status";
import { Statistics } from "./statistics";
import { TopicDetails } from "./topic-details";

export interface Video {
    kind?: string,
    etag?: string,
    id?: any,
    snippet: Snippet,
    channel?: Channel,
    contentDetails?: ContentDetails,
    status?: Status,
    statistics?: Statistics,
    topicDetails?: TopicDetails,
}