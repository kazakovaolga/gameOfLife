import "./index.scss";
import { gameOfLife } from "./utils/gameOfLife";

gameOfLife(document.querySelector("#app") as HTMLDivElement);
