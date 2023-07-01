import {Schema, model} from "mongoose"
import { getCurrentDate } from "../utils/helpers"

interface IUrl {
    shortened_url: string
    url: string
    code: string
    user_id: string
    clicks: number
    date: string
}

const urlSchema = new Schema<IUrl>({
    shortened_url: {type: String, required: true},
    url:{type: String, required: true},
    code: {type: String, required: true},
    user_id: { type: String, ref: 'User' },
    clicks: {type: Number, default: 0},
    date: { type: String, default: getCurrentDate() }
})

const UrlModel = model<IUrl>("Url", urlSchema)

export default UrlModel