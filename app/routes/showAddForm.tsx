import { Link } from "react-router";
import AddList from "~/components/AddList/AddList";

export default function ShowAddForm() {
  return (
    <>
      <Link to="/">Retour à l'accueil</Link>
      <AddList />
    </>
  );
}