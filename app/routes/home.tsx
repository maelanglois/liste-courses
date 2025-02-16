import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Accueil" },
    { name: "description", content: "Bienvenue sur l'application Liste de courses." },
  ];
}

export default function Home() {
  return <>
  <div id="navbar">
    <Link to="/list/add">
      Créer sa liste de courses
    </Link>
    <Link to="/list/get/list">
      Voir ses précédentes listes de courses
    </Link>
    <Link to="/list/delete">
      Supprimer une liste de course
    </Link>
  </div>
    
  </>;
}
