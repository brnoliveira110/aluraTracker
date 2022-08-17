import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from "@/views/Tarefas.vue"
import Projetos from "@/views/Projetos.vue"
import Lista from "@/views/projetos/Lista.vue"
import Formulario from "@/views/projetos/Formulario.vue"



const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas,
    },
    {
        path: '/projetos',
        component: Projetos,
        children:[
            {
                path: '',
                name: 'Projetos',
                component: Lista,
            },
            {
                path: 'novo',
                name: 'Novo projetos',
                component: Formulario,
            },
            {
                path: ':id',
                name: 'Editar projetos',
                component: Formulario,
                props: true
            },
        ]

    }

]



const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
});


export default roteador