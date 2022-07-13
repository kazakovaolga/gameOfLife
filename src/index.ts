// import "./styles.css";
console.log("index.ts");
import "./index.scss";
import { gameOfLife } from "./utils/gameOfLife";

// const appDiv:HTMLElement=document.querySelector("#app");
// console.log('appDiv=',appDiv);

gameOfLife(document.querySelector("#app") as HTMLElement);
