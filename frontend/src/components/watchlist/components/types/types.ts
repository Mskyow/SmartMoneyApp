interface IWatchList {
    id: number,
   account_address: string,
   account_name: string,
    profile_image: string,
  }

  interface INewAddress {

    account_address: string 

    account_name: string 

    account_image: string 
}

interface IAddressData {
    account_name: string;
    account_address: string;
    account_image: string;
  }
  

interface AddAddressModalProps {
    open: boolean;
    onClose: () => void;
    onAddAddress: (newAddress: IAddressData) => Promise<void>; // Добавляем onAddAddress
  }
