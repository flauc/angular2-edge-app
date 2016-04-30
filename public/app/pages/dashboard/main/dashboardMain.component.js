System.register(['angular2/core', '../../../common/services/data.service', '../../../common/services/socketControl.service'], function(exports_1, context_1) {
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
    var core_1, data_service_1, socketControl_service_1;
    var DashboardMainComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            },
            function (socketControl_service_1_1) {
                socketControl_service_1 = socketControl_service_1_1;
            }],
        execute: function() {
            DashboardMainComponent = (function () {
                function DashboardMainComponent(_data, _socketControl) {
                    this._data = _data;
                    this._socketControl = _socketControl;
                    this.roomCreateToggle = false;
                    this.rooms = _data.rooms;
                    this.users = _data.users;
                }
                DashboardMainComponent.prototype.roomCreate = function () {
                    this._socketControl.roomCreate({ name: this.roomName, description: this.roomDescription });
                };
                DashboardMainComponent = __decorate([
                    core_1.Component({
                        selector: 'main',
                        templateUrl: 'app/pages/dashboard/main/main.html'
                    }), 
                    __metadata('design:paramtypes', [data_service_1.DataService, socketControl_service_1.SocketControlService])
                ], DashboardMainComponent);
                return DashboardMainComponent;
            }());
            exports_1("DashboardMainComponent", DashboardMainComponent);
        }
    }
});
//# sourceMappingURL=dashboardMain.component.js.map