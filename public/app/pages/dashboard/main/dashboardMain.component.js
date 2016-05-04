"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var data_service_1 = require('../../../common/services/data.service');
var socketControl_service_1 = require('../../../common/services/socketControl.service');
var router_1 = require('angular2/router');
var userStore_service_1 = require('../../../common/services/userStore.service');
var DashboardMainComponent = (function () {
    function DashboardMainComponent(_router, _data, _socketControl, _userStore) {
        this._router = _router;
        this._data = _data;
        this._socketControl = _socketControl;
        this._userStore = _userStore;
        this.roomCreateToggle = false;
        this.rooms = _data.rooms;
        this.me = _userStore.getUser().data;
    }
    DashboardMainComponent.prototype.roomEnter = function (room) {
        this._router.navigate(['Room', { name: room.name }]);
    };
    DashboardMainComponent.prototype.roomCreate = function () {
        var _this = this;
        this._socketControl.roomCreate({ name: this.roomName, description: this.roomDescription })
            .catch(function (err) { return console.log(err); })
            .then(function () {
            _this.roomName = '';
            _this.roomDescription = '';
            _this.roomCreateToggle = false;
        });
    };
    DashboardMainComponent.prototype.roomDelete = function (room) {
        this._socketControl.roomDelete(room)
            .catch(function (err) { return console.log(err); });
    };
    DashboardMainComponent = __decorate([
        core_1.Component({
            selector: 'main',
            templateUrl: 'app/pages/dashboard/main/main.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, data_service_1.DataService, socketControl_service_1.SocketControlService, userStore_service_1.UserStoreService])
    ], DashboardMainComponent);
    return DashboardMainComponent;
}());
exports.DashboardMainComponent = DashboardMainComponent;
