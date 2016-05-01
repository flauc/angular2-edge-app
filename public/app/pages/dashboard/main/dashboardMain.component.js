System.register(['angular2/core', '../../../common/services/data.service', '../../../common/services/socketControl.service', '../../../common/components/userBlock/userBlock.component', 'angular2/router', '../../../common/services/userStore.service'], function(exports_1, context_1) {
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
    var core_1, data_service_1, socketControl_service_1, userBlock_component_1, router_1, userStore_service_1;
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
            },
            function (userBlock_component_1_1) {
                userBlock_component_1 = userBlock_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (userStore_service_1_1) {
                userStore_service_1 = userStore_service_1_1;
            }],
        execute: function() {
            DashboardMainComponent = (function () {
                function DashboardMainComponent(_router, _data, _socketControl, _userStore) {
                    this._router = _router;
                    this._data = _data;
                    this._socketControl = _socketControl;
                    this._userStore = _userStore;
                    this.roomCreateToggle = false;
                    this.rooms = _data.rooms;
                    this.users = _data.users;
                    this.me = _userStore.getUser().data;
                    console.log(this.me);
                    console.log(this.rooms);
                }
                DashboardMainComponent.prototype.roomEnter = function (room) {
                    this._router.navigate(['Room', { name: room.name }]);
                };
                DashboardMainComponent.prototype.roomCreate = function () {
                    var _this = this;
                    this._socketControl.roomCreate({ name: this.roomName, description: this.roomDescription })
                        .then(function () {
                        _this.roomName = '';
                        _this.roomDescription = '';
                        _this.roomCreateToggle = false;
                    });
                };
                DashboardMainComponent.prototype.roomDelete = function (room) {
                    this._socketControl.roomDelete(room);
                };
                DashboardMainComponent = __decorate([
                    core_1.Component({
                        selector: 'main',
                        directives: [userBlock_component_1.UserBlockComponent],
                        templateUrl: 'app/pages/dashboard/main/main.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, data_service_1.DataService, socketControl_service_1.SocketControlService, userStore_service_1.UserStoreService])
                ], DashboardMainComponent);
                return DashboardMainComponent;
            }());
            exports_1("DashboardMainComponent", DashboardMainComponent);
        }
    }
});
//# sourceMappingURL=dashboardMain.component.js.map