import axios from "axios";
import { BASE_URL } from "../const/youtube-api";

const headers = {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Content-Type": "text/plain",
};


export const request = axios.create({baseURL: BASE_URL});