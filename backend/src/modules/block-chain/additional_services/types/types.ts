export interface ITransactionInfo {
    tokenName: string;
    formattedDate: string;
    amountTransferred: number;
    transactionType: 'Transfer' | 'Swap' | 'Unknown';
  }

  export interface IFungibleTokensListObject {
    id: string,          // Mint address
    name: string,        // Название токена
    symbol: string,      // Символ (например USDC)
    decimals: number,    // Разрядность (6 для USDC)
    balance: number,     // Реальное количество (balance / 10^decimals)
    rawBalance: number,  // Баланс в наименьших единицах
    pricePerToken: number | null,  // Цена за 1 токен
    totalValue: number | null,     // Общая стоимость
    currency: string | null,       // Валюта цены (обычно USDC)
    tokenProgram: string,          // Программа токена
    associatedTokenAddress: string,// ATA адрес
    image: string | null,          // Ссылка на изображение
    metadataUri: string | null,    // Ссылка на метаданные
    tokenStandard: string | null,  // Стандарт токена
    extensions: any | null         // Расширения Token-2022
  }