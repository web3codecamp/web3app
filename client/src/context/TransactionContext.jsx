import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants'

export const TransactionContext = React.createContext();

const { ethereum } = window;


const getEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const transactionContract = new ethers.Contract(contractAddress, contractABI, provider);
    
    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [ connectedAccount, setConnectedAccount ] = useState('');
    const [ formData, setFormData ] = useState({ addressTo: '', amount: '', keyword: '', message: ''});

    const [ isLoading, setIsLoading ] = useState(false)

    const [ transactionCount, setTransactionCount ] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]:e.target.value }))
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert('Please install metamask');

            const accounts = await ethereum.request({ method: 'eth_accounts' })
            
            if(accounts.length) {
                setConnectedAccount(accounts[0]);
                //getAllTransactions
            } else {
                console.log('No Accounts found');
                }
            
        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object.')             
        }
        
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert('Please install metamask');

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

            setConnectedAccount(accounts[0]);
        } catch (error) {
          console.log(error);
          throw new Error('No ethereum object.')  
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert('Please install metamask');

            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = await getEthereumContract();
            const parsedAmount = ethers.parseEther(amount);

            // await ethereum.request({
            //     method: 'eth_sendTransaction',
            //     params: [{
            //         from: connectedAccount,
            //         to: addressTo,
            //         gas: '12F7DB8', //21000 GWEI
            //         value: parsedAmount._hex, //0.00001
            //     }]
            // });

            const transactionHash = await transactionContract["getTransactionCount"];

            setIsLoading(true);
            console.log(transactionContract.getAllTransactions);

            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);
            await transactionHash.wait();

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object.') 
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    return(
        <TransactionContext.Provider value={{ connectWallet , connectedAccount, formData, setFormData, handleChange, sendTransaction}}>
            {children}
        </TransactionContext.Provider>
        
    )    
}

