const routesList = [
	/* {
        path:'/',
        redirect:'/home',
        component:() => import('@/views/login/index')
    }, */
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index"),
	},
	{
		path: "/IIAS",
		name: "IIAS",
		component: () => import("@/layout/index"),
		children: [
			//经济
			{
				path: "economic",
				name: "economic",
				component: () => import("views/economic"),
			},
			//政情
			{
				path: "general",
				name: "general",
				component: () => import("views/politics/general"),
			},
			{
				path: "strategy",
				name: "strategy",
				component: () => import("views/politics/strategy"),
			},
			{
				path: "party",
				name: "party",
				component: () => import("views/politics/party"),
			},
			{
				path: "election",
				name: "election",
				component: () => import("views/politics/election"),
			},
			//社情
			{
				path: "feature",
				name: "feature",
				component: () => import("views/social/feature"),
			},
			{
				path: "contradiction",
				name: "contradiction",
				component: () => import("views/social/contradiction"),
			},
			{
				path: "development",
				name: "development",
				component: () => import("views/social/development"),
			},
			{
				path: "safety",
				name: "safety",
				component: () => import("views/social/safety"),
			},
			//军情
			{
				path: "tracking",
				name: "tracking",
				component: () => import("views/militia/tracking"),
			},
			{
				path: "activity",
				name: "activity",
				component: () => import("views/militia/activity"),
			},
			{
				path: "opinion",
				name: "opinion",
				component: () => import("views/militia/opinion"),
			},
			//民意
			{
				path: "ideology",
				name: "ideology",
				component: () => import("views/polls/ideology"),
			},
			{
				path: "cultural",
				name: "cultural",
				component: () => import("views/polls/cultural"),
			},
			{
				path: "war",
				name: "war",
				component: () => import("views/polls/war"),
			},
			{
				path: "people",
				name: "people",
				component: () => import("views/polls/people"),
			},
			// 外交
			{
				path: "agency",
				name: "agency",
				component: () => import("views/diplomatic/agency"),
			},
			{
				path: "consulate",
				name: "consulate",
				component: () => import("views/diplomatic/consulate"),
			},
			{
				path: "analysis",
				name: "analysis",
				component: () => import("views/diplomatic/analysis"),
			},
			// 历史
			{
				path: "person",
				name: "person",
				component: () => import("views/history/person"),
			},
			{
				path: "oldwar",
				name: "oldwar",
				component: () => import("views/history/oldwar"),
			},
			{
				path: "oldevent",
				name: "oldevent",
				component: () => import("views/history/oldevent"),
			},
			{
				path: "dynasty",
				name: "dynasty",
				component: () => import("views/history/dynasty"),
			},
			// 用户管理
			{
				path: "user",
				name: "user",
				component: () => import("views/user/user"),
			},
		],
	},
];
export default routesList;
