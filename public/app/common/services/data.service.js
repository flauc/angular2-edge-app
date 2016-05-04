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
var core_1 = require('@angular/core');
var api_service_1 = require('./api.service');
var DataService = (function () {
    function DataService(_api) {
        this._api = _api;
    }
    DataService.prototype.getAllData = function () {
        return Promise.all([this.getRooms(), this.getUsers()]);
    };
    DataService.prototype.getRooms = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._api.send('getRooms').subscribe(function (res) {
                _this.rooms = res.data;
                resolve(res);
            }, function (err) { return reject(err); });
        });
    };
    DataService.prototype.getUsers = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._api.send('getUsers').subscribe(function (res) {
                _this.users = res.data;
                resolve(res);
            }, function (err) { return reject(err); });
        });
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [api_service_1.ApiService])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map