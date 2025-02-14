import { type RouteConfig, index, prefix, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("list", [
    layout("layouts/ListLayout.tsx", [
      // index(""),
      route("add", "routes/showAddForm.tsx"),
      route("list", "routes/showList.tsx"),
      route("update/:id", "routes/showListCard.tsx")
    ]),
  ])
] satisfies RouteConfig;
