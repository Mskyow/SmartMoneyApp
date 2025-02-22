export const  AppError = {
    USER_EXIST : "User with this email exist",
    USER_NOT_EXIST: "User with this email does not exist",
    USER_WRONG_DATA: "Wrong data",

    JWT_SECRET_UNDEFINED: "JWT secret is undefined",
    JWT_AUNTIFICATION_FAILED: "Invalid token: missing userId",

    SOLANA_HTTPS_PROVIDER_UNDEFIND: "Solana https provider is undefind" ,

    UPDATE_WATCHLIST_ADDRESS_ERROR : "no one rows was updated. Update was failed",
    DELETE_WATCHLIST_ADDRESS_ERROR : "Delete was failed. No one rows was deleted",
    ADD_WATCHLIST_ADDRESS_ERROR :  "New address was not added to watchlist. Watchlist obj is undefined",
}