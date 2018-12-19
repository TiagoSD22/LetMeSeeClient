import { RouterModule, Routes } from "@angular/router";

import { LayoutComponent } from "./layout.component";

const LAYOUT_ROUTES: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            { path: "", redirectTo: "upload-image", pathMatch: "full" },
            {
                path: "upload-image",
                loadChildren: "../pages/upload-image/upload-image.module#UploadImageModule"
            },
            {
                path: "filtros",
                loadChildren: "../pages/filtros/filtros.module#FiltrosModule"
            },
            {
                path: "historico",
                loadChildren: "../pages/historico/historico.module#HistoricoModule"
            }
        ]
    }
]

export const LayoutRoutes = RouterModule.forChild(LAYOUT_ROUTES);
