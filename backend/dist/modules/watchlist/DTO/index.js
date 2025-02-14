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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressNameDTO = exports.updateAddressImgDTO = exports.deleteAddressDTO = exports.addAddressDTO = exports.AddressDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_model_1 = require("../../user/models/user.model");
class AddressDTO {
}
exports.AddressDTO = AddressDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddressDTO.prototype, "account_address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddressDTO.prototype, "account_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddressDTO.prototype, "account_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", user_model_1.User)
], AddressDTO.prototype, "user", void 0);
class addAddressDTO {
}
exports.addAddressDTO = addAddressDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], addAddressDTO.prototype, "account_address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], addAddressDTO.prototype, "account_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], addAddressDTO.prototype, "account_image", void 0);
class deleteAddressDTO {
}
exports.deleteAddressDTO = deleteAddressDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], deleteAddressDTO.prototype, "account_address", void 0);
class updateAddressImgDTO {
}
exports.updateAddressImgDTO = updateAddressImgDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateAddressImgDTO.prototype, "account_address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateAddressImgDTO.prototype, "new_account_image", void 0);
class updateAddressNameDTO {
}
exports.updateAddressNameDTO = updateAddressNameDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateAddressNameDTO.prototype, "account_address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateAddressNameDTO.prototype, "new_account_name", void 0);
//# sourceMappingURL=index.js.map