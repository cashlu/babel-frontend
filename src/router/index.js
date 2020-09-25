import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login"
import Home from "../components/Home"
import Welcome from "../components/Welcome"
import BasicInfos from "../components/BasicInfos"
import ApprInfos from "../components/ApprInfos"
import ApprFile from "../components/ApprFile"
import FilePhases from "../components/FilePhases"
import ApprfileRecs from "../components/ApprfileRecs"
import LocFiles from "../components/LocFiles"
import ApprSample from "../components/ApprSample"
import AddiFiles from "../components/AddiFiles"
import Orgs from "../components/Orgs"
import Devices from "../components/Devices"
import CheckRecord from "@/components/CheckRecord";
import Proofread from "@/components/Proofread";
import FinalReview from "@/components/FinalReview";
import TodoList from "@/components/TodoList";
import Review from "@/components/Review";

Vue.use(VueRouter)

const routes = [
    {path: '/', redirect: '/login/'},
    {path: '/login', component: Login},
    {
        path: '/home',
        component: Home,
        redirect: "/welcome",
        children: [
            {path: '/welcome', component: Welcome},
            {path: '/basicinfos', component: BasicInfos},
            {path: '/apprinfos', component: ApprInfos},
            {path: '/apprfiles', component: ApprFile},
            {path: '/filephases', component: FilePhases},
            {path: '/apprfilerecs', component: ApprfileRecs},
            {path: '/locfiles', component: LocFiles},
            {path: '/apprsamps', component: ApprSample},
            {path: '/addifiles', component: AddiFiles},
            {path: '/orgs', component: Orgs},
            {path: '/devices', component: Devices},
            {path: '/checkrecords', component: CheckRecord},
            {path: '/proofread/:id', component: Proofread},
            {path: '/finalreview/:id', component: FinalReview},
            {path: '/todolist', component: TodoList},
            {path: '/review', component: Review},
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router
