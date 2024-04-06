import {UilEstate,UilCheckCircle,UilProcess,UilUsersAlt,UilFileEditAlt,UilFilePlusAlt,UilPackage,UilChart,UilSignOutAlt,UilUsdSquare} from '@iconscout/react-unicons'


export const sidebarData = [
    {
        icon:UilEstate,
        heading:"Dashboard",
        path:"/admin/"
    },
    {
        icon:UilFilePlusAlt,
        heading:"My Projects",
        path:"/admin/project"
    },
    {
        icon:UilCheckCircle,
        heading:"Completed Task",
        path:"/admin/completed"
    },
    { 
        icon:UilProcess, 
        heading:"Pending Task",
        path:"/admin/pending"
    },
    {
        icon:UilFileEditAlt,
        heading:"Active Task",
        path:"/admin/activ"
    },
    {
        icon:UilUsersAlt,
        heading:"Users",
        path:"/admin/users"
    },
    
]


export const cardData = [
    {
        title:"sales",
        color:{
            background:"linear-gradient(180deg,#bb67ff,#c484f3)",
            boxshadow:"0px 10px 20px 0px #e0c6f5",    
            },
        barvalue:70,
        value:"25,970",
        png: UilUsdSquare,
        series:[
            {
                name:"sales",
                data:[31,40,28,51,42,109,100]
            },
        ],

    },
    {
        title:"revenue",
        color:{
            background:"linear-gradient(180deg,#bb67ff,#c484f3)",
            boxshadow:"0px 10px 20px 0px #e0c6f5",    
            },
        barvalue:70,
        value:"25,970",
        png: UilUsdSquare,
        series:[
            {
                name:"sales",
                data:[31,40,28,51,42,109,100]
            },
        ],

    },
    {
        title:"expenses",
        color:{
            background:"linear-gradient(180deg,#bb67ff,#c484f3)",
            boxshadow:"0px 10px 20px 0px #e0c6f5",    
            },
        barvalue:70,
        value:"25,970",
        png: UilUsdSquare,
        series:[
            {
                name:"sales",
                data:[31,40,28,51,42,109,100]
            },
        ],

    },
]