import dotenv from "dotenv";

dotenv.config();

export const SENDBIRD_API_URL = `https://api-${process.env.SENDBIRD_APP_ID}.sendbird.com/v3`;