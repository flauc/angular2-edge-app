"use strict";
var room_component_1 = require('./room/room.component');
var dashboard_component_1 = require('./dashboard.component');
var rooms_component_1 = require('./rooms/rooms.component');
var auth_guard_1 = require('../../common/guards/auth.guard');
exports.dashboardRoutes = [
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent,
        children: [
            { path: '', component: rooms_component_1.RoomsComponent },
            { path: ':name', component: room_component_1.RoomComponent },
        ]
    }
];
exports.dashboardRoutingComponents = [
    dashboard_component_1.DashboardComponent,
    rooms_component_1.RoomsComponent,
    room_component_1.RoomComponent
];
exports.dashboardProviders = [
    auth_guard_1.AuthGuard
];
//# sourceMappingURL=dashboard.router.js.map