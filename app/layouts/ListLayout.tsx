import { Outlet } from "react-router";
import ListProvider from "~/shared/contexts/ListContext";


export default function ListLayout(){
  return(<>
    <ListProvider children={<Outlet/>}/>
  </>);
}