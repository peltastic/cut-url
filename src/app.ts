import express, {Request, Response} from "express";
import path from "path"
import config from "config";
import ConnectDB from "./utils/connectDb";
import urlRoutes from "./routes/urls.routes";
import userRoutes from "./routes/user.routes";
import pagesRoutes from "./routes/pages.routes"
import getUrlRoutes from "./routes/getUrl.routes"

const PORT = config.get("PORT") || 8000;
const app = express();
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(getUrlRoutes)
app.use("/i", pagesRoutes)
app.use("/api/users", userRoutes);
app.use("/api/urls", urlRoutes);


ConnectDB();

app.listen(PORT, () => console.log(`App Listening at PORT ${PORT}`));
