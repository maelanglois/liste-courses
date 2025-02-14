import { useState, useContext } from "react";
import type { Route } from "../+types/root";
import type { ListI } from "~/shared/interfaces/Element.interface";
import { ListContext } from "~/shared/contexts/ListContext";
import { useNavigate } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  /**
   * L'argument params va stocker les QueryStrings (ici: id).
   */
}

export default function ShowListCard({
  params,
}: Route.ComponentProps) {
  const { id } = params;

  let navigate = useNavigate();

  let { MIN, MAX, list, setList, jobs } =
    useContext(ListContext);

  const submitUpdateForm = async (e: any) => {
    e.preventDefault();

    if (
      !list.pseudo ||
      !list.title ||
      !list.job ||
      list.stats.strength <= 0 ||
      list.stats.dexterity <= 0 ||
      list.stats.luck <= 0 ||
      list.stats.intelligence <= 0 ||
      list.stats.wisdom <= 0
    ) {
      throw new Error(
        "Une (ou plusieurs) statistique est invalide."
      );
    }

    await fetch("http://localhost:5500/list/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify(list)
    })
    .then(response => response.json())
    .then(datas => {
      if(datas.status !== 200){
        throw new Error("Le status de la requête est invalide.");
      }

      navigate("/list/list");
    })
    .catch(err=>console.error(err));
  };

  return (
    <form
      action="#"
      method="POST"
      onSubmit={submitUpdateForm}
    >
      <label htmlFor="pseudo">Pseudo</label>
      <input
        type="text"
        name="pseudo"
        defaultValue={list.pseudo}
        onChange={(e) => {
          let newPseudo = e.target.value ?? null;
          setList((list: ListI) => {
            list.pseudo = newPseudo;
            return list;
          });
        }}
        required
      />
      <label htmlFor="title">Titre</label>
      <input
        type="text"
        name="title"
        defaultValue={list.title}
        onChange={(e) => {
          let newTitle = e.target.value ?? null;
          setList((list: ListI) => {
            list.title = newTitle;
            return list;
          });
        }}
        required
      />
      <label htmlFor="class">Choix de la classe</label>
      <select
        name="class"
        defaultValue={list.job}
        onChange={(e) => {
          setList((list: ListI) => {
            list.job = e.target.value;
            return list;
          });
        }}
        required
      >
        <option
          value=""
          selected
          disabled
        >
          -- Choisir une classe --
        </option>
        {jobs.map((item: any) => (
          <option
            value={item.value}
            key={`${item.name}-${item.value}`}
          >
            {item.name}
          </option>
        ))}
      </select>
      <label htmlFor="stat_force">Force</label>
      <input
        type="number"
        name="stat_force"
        defaultValue={list.stats.strength}
        min={MIN}
        max={MAX}
        onChange={(e) => {
          setList((list: ListI) => {
            list.stats.strength = Number(e.target.value);
            return list;
          });
        }}
        required
      />
      <label htmlFor="stat_dexterity">Agilité</label>
      <input
        type="number"
        name="stat_dexterity"
        defaultValue={list.stats.dexterity}
        min={MIN}
        max={MAX}
        onChange={(e) => {
          setList((list: ListI) => {
            list.stats.strength = Number(e.target.value);
            return list;
          });
        }}
        required
      />
      <label htmlFor="stat_luck">Chance</label>
      <input
        type="number"
        name="stat_luck"
        defaultValue={list.stats.luck}
        min={MIN}
        max={MAX}
        onChange={(e) => {
          setList((list: ListI) => {
            list.stats.strength = Number(e.target.value);
            return list;
          });
        }}
        required
      />
      <label htmlFor="stat_intelligence">
        Intelligence
      </label>
      <input
        type="number"
        name="stat_intelligence"
        defaultValue={list.stats.intelligence}
        min={MIN}
        max={MAX}
        onChange={(e) => {
          setList((list: ListI) => {
            list.stats.strength = Number(e.target.value);
            return list;
          });
        }}
        required
      />
      <label htmlFor="stat_knowledge">Sagesse</label>
      <input
        type="number"
        name="stat_knowledge"
        defaultValue={list.stats.wisdom}
        min={MIN}
        max={MAX}
        onChange={(e) => {
          setList((list: ListI) => {
            list.stats.strength = Number(e.target.value);
            return list;
          });
        }}
        required
      />
      <input
        type="hidden"
        value={id}
        name="id"
      />
      <button type="submit">Créer</button>
    </form>
  );
}