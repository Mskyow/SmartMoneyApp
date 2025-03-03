interface IWatchList {
    id: number,
   account_address: string,
   account_name: string,
    profile_image: string,
  }

  interface IAddressEntityProps  {

    account_address: string 

    account_name: string 

    account_image: string 

    onDeleteAddress: (account_address: string) => void; // Добавляем пропс для функции удаления

    onEditAddress: (account_address: string, newName: string, newImage: string) => void;


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
