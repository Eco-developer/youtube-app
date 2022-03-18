import axios from "axios";
import { BASE_URL } from "../const/youtube-api";

export const request = axios.create({baseURL: BASE_URL});