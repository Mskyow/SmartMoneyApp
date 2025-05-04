// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from 'framer-motion';

// const WalletTab = () => {
//     const [walletAddress, setWalletAddress] = useState('');
//     const [isWalletSet, setIsWalletSet] = useState(false);
//     const [saveSuccess, setSaveSuccess] = useState(false);
//       const [error, setError] = useState<string | null>(null);
  
//     useEffect(() => {
//       // Здесь должна быть логика загрузки адреса кошелька пользователя
//       // Например, из localStorage или API
//       const savedAddress = localStorage.getItem('walletAddress'); // Заглушка
//       if (savedAddress) {
//         setWalletAddress(savedAddress);
//         setIsWalletSet(true);
//       }
//     }, []);
  
//     const handleSave = () => {
//       try {
//           // Здесь должна быть логика сохранения адреса кошелька
//           if (!walletAddress) {
//             setError("Please enter wallet address")
//             return
//           }
//           localStorage.setItem('walletAddress', walletAddress); // Заглушка
//           setIsWalletSet(true);
//           setSaveSuccess(true);
//           setError(null);
//           setTimeout(() => setSaveSuccess(false), 3000);
//       } catch (e: any) {
//           setError(e.message)
//       }
//     };
  
//     const disconnectWallet = () => {
//       localStorage.removeItem('walletAddress'); // Заглушка
//       setWalletAddress('');
//       setIsWalletSet(false);
//     }
  
//     return (
//       <AnimatePresence>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.3 }}
//         >
//           <SectionHeader>Your Wallet</SectionHeader>
//           {isWalletSet ? (
//             <>
//               <Text className="mb-4">
//                 Connected wallet address:
//               </Text>
//                <div className="flex items-center gap-2 mb-4">
//                   <Wallet className="text-green-500" />
//                   <Text>{walletAddress}</Text>
//               </div>
//               <CosmicButton variant="destructive" onClick={disconnectWallet}>Disconnect Wallet</CosmicButton>
//             </>
//           ) : (
//             <>
//               <Text className="mb-4">
//                 Enter your Solana wallet address to receive notifications:
//               </Text>
//               <div className="mb-4">
//                 <Label htmlFor="walletAddress" className="block mb-2 text-white">Wallet Address</Label>
//                 <InputField
//                   id="walletAddress"
//                   value={walletAddress}
//                   onChange={(e) => setWalletAddress(e.target.value)}
//                   placeholder="Enter wallet address"
//                 />
//               </div>
//               <CosmicButton onClick={handleSave}>Save</CosmicButton>
//                {saveSuccess && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="mt-4 text-green-500"
//                   >
//                     Wallet connected successfully!
//                   </motion.div>
//                 )}
//                 {error && (
//                   <Alert variant="destructive" className="mt-4">
//                       <AlertCircle className="h-4 w-4" />
//                       <AlertTitle>Error</AlertTitle>
//                       <AlertDescription>{error}</AlertDescription>
//                   </Alert>
//               )}
//             </>
//           )}
//         </motion.div>
//       </AnimatePresence>
//     );
//   };


