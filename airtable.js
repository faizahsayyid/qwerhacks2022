import Airtable from "airtable";
import config from "./config.json";

const base = new Airtable({ apiKey: config.userKey }).base(config.baseKey);

export default base;
