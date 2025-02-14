import { User } from "src/modules/user/models/user.model";
export declare class AddressDTO {
    account_address: string;
    account_name?: string;
    account_image?: string;
    user: User;
}
export declare class addAddressDTO {
    account_address: string;
    account_name?: string;
    account_image?: string;
}
export declare class deleteAddressDTO {
    account_address: string;
}
export declare class updateAddressImgDTO {
    account_address: string;
    new_account_image: string;
}
export declare class updateAddressNameDTO {
    account_address: string;
    new_account_name: string;
}
