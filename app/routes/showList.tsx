import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import type { ListI } from "~/shared/interfaces/Element.interface";
import DeleteList from "~/components/deleteList/DeleteList";
import { ListContext } from "~/shared/contexts/ListContext";

export default function ShowLists() {
  let { setList } = useContext(ListContext);

  let [lists, setLists] = useState([]);

  useEffect(() => {
    if (lists.length <= 0) {
      fetchLists();
    }
  }, [lists]);

  const fetchLists = async () => {
    await fetch("http://127.0.0.1:5500/list/get/list", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((datas) => {
        if (datas.status !== 200) {
          throw new Error(
            "Le statut de la requête n'est pas valide."
          );
        }

        if (!datas.lists) {
          throw new Error(
            "Aucune liste n'a été retournée."
          );
        }

        let listsList = datas.lists.map(
          (list: ListI) => {
            list = {
              id: list.id,
              title: list.title,
              creation_date: list.creation_date,
            };
            return list;
          }
        );

        setLists(listsList);
      })
      .catch((err) => console.error(err));
  };

  const updateListContext = (list: ListI) => {
    setList(list);
  }

  return (
    <section className="main-sections">
      {lists.length > 0 &&
        lists.map((list: ListI) => (
          <article
            className="main-articles"
            key={list.id}
          >
            <h2 className="main-articles-title">
              {list.title}
            </h2>
            <Link
              to={`/list/update/${list.id}`}
              onClick={() => updateListContext(list)}
            >
              Modifier
            </Link>

            <DeleteList listId={list.id} />
          </article>
        ))}
    </section>
  );
}