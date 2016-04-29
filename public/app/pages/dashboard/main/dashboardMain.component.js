System.register(['angular2/core', '../../../common/services/roomsData.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, roomsData_service_1;
    var DashboardMainComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (roomsData_service_1_1) {
                roomsData_service_1 = roomsData_service_1_1;
            }],
        execute: function() {
            DashboardMainComponent = (function () {
                function DashboardMainComponent(_roomsData) {
                    this._roomsData = _roomsData;
                    this.rooms = _roomsData.rooms;
                    console.log(this.rooms);
                }
                DashboardMainComponent = __decorate([
                    core_1.Component({
                        selector: 'main',
                        templateUrl: 'app/pages/dashboard/main/main'
                    }), 
                    __metadata('design:paramtypes', [roomsData_service_1.RoomsDataService])
                ], DashboardMainComponent);
                return DashboardMainComponent;
            }());
            exports_1("DashboardMainComponent", DashboardMainComponent);
        }
    }
});
//# sourceMappingURL=dashboardMain.component.js.map