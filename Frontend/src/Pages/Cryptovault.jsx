import { useNavigate } from 'react-router-dom';
import ConnectWallet from '../Components/connectwallet';
import { BsDisplay } from 'react-icons/bs';
import { MdMargin } from 'react-icons/md';
import Navbar from '../Components/navbar';
import Sidebar from '../Components/sideBar';


const Crypto = () => {
    const navigate = useNavigate();

    return (
    
    <>      
    <Sidebar/>
    
    <div className='flex text-white bg-[#080F25] min-h-screen'>
           </div>
    </>

);
}

export default Crypto;