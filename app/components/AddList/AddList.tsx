import { useEffect, useState, type FormEvent, useContext } from "react";
import { useNavigate } from "react-router";
import { ListContext } from "~/shared/contexts/ListContext";
import type { ListI } from "~/shared/interfaces/List.interface";

export default function AddList() {

  let {list, setList} = useContext(ListContext);

  let navigate = useNavigate();

  let [classList, setClassList] = useState("");

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !list.title ||
      list.elements.oeufs <= 0 ||
      list.elements.lait <= 0 ||
      list.elements.eau <= 0 ||
      list.elements.farine <= 0 ||
      list.elements.beurre <= 0
    ) {
      throw new Error(
        "Une (ou plusieurs) statistique est invalide."
      );
    }

    await fetch("http://127.0.0.1:5500/list/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    })
      .then((response) => {
        return response.json();
      })
      .then((datas) => {
        if (datas.status !== 200) {
          throw new Error(
            "Le statut de la requête est invalide."
          );
        }
        navigate("/");
      })
      .catch((err) => console.error(`Erreur : ${err}`));
  };

  return (
    <form
      action="#"
      method="POST"
      onSubmit={submitForm}
    >

      <label htmlFor="title">Titre</label>
      <input
        type="text"
        name="title"
        onChange={(e) => {
          let newTitle = e.target.value ?? null;
          setList((list: ListI) => {
            list.title = newTitle;
            return list;
          });
        }}
        required
      />

      <label htmlFor="oeufs">Oeufs</label>
      <input
        type="number"
        name="oeufs"
        value={list.elements.oeufs}
        min={0}
        onChange={(e) => {
          setList((list: ListI) => {
            list.elements.oeufs = Number(e.target.value);

            return list;
          });
        }}
        required
      />
      <label htmlFor="lait">Lait</label>
      <input
        type="number"
        name="lait"
        value={list.elements.lait}
        min={0}
        onChange={(e) => {
          setList((list: ListI) => {
            list.elements.lait = Number(e.target.value);

            return list;
          });
        }}
        required
      />
      <label htmlFor="eau">Eau</label>
      <input
        type="number"
        name="eau"
        value={list.elements.eau}
        min={0}
        onChange={(e) => {
          setList((list: ListI) => {
            list.elements.eau = Number(e.target.value);

            return list;
          });
        }}
        required
      />
      <label htmlFor="farine">
        Farine
      </label>
      <input
        type="number"
        name="farine"
        value={list.elements.farine}
        min={0}
        onChange={(e) => {
          setList((list: ListI) => {
            list.elements.farine = Number(e.target.value);

            return list;
          });
        }}
        required
      />
      <label htmlFor="beurre">Beurre</label>
      <input
        type="number"
        name="beurre"
        value={list.elements.beurre}
        onChange={(e) => {
          setList((list: ListI) => {
            list.elements.beurre = Number(e.target.value);

            return list;
          });
        }}
        required
      />
      <button type="submit">Créer</button>
    </form>
  );
}
