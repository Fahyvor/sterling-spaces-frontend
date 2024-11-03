import React, {useState, useEffect} from 'react'
import { MdOutlineHomeWork } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosContacts } from "react-icons/io";
import { FaBarsStaggered } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";

const Nav: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHambugerOpen, setIsHambugerOpen] = useState(false);
    const [userFullName, setUserFullName] = useState('')

    useEffect(() => {
        const getUserData = localStorage.getItem("userData")
        if (getUserData) {
            setIsLoggedIn(true);
            const parsedUser = JSON.parse(getUserData)
            console.log(parsedUser.fullName)
            setUserFullName(parsedUser.fullName)
        }
    }, [])

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
        setIsHambugerOpen(false);
    };

    return (
        <>
        <div className='bg-white backdrop-blur-sm z-30 flex justify-between shadow-md fixed w-full p-3 px-8'>
            <div className="name_and_logo lg:w-[25%] md:w-[35%] w-1/2">
                <a href='/' className='no-underline text-green-600 font-semibold text-xl'>Sterling Spaces</a>
            </div>

            <div className='nav_links w-[75%] lg:flex md:flex hidden gap-4 justify-end items-center'> 
                <MdOutlineHomeWork className='w-5 h-5'/>
                <IoIosContacts className='w-5 h-5'/>
                <CgProfile className='w-5 h-5'/>

                <div className='logout_button'>
                    {isLoggedIn ? 
                    <button>Hello, {userFullName}</button>
                     : <button><a href="/#/login">Login</a></button>
                    }
                </div>
            </div>

            <div className='hamburger_menu lg:hidden md:hidden flex'>
                {isHambugerOpen ? 
                    <MdOutlineCancel 
                    className='w-5 h-5' 
                    onClick={() => {
                      setIsMenuOpen(!isMenuOpen);
                      setIsHambugerOpen(!isHambugerOpen);
                    }}
                  />
                   :
                    <FaBarsStaggered className='w-5 h-5' 
                    onClick={() => {
                      setIsMenuOpen(!isMenuOpen);
                      setIsHambugerOpen(!isHambugerOpen);
                    }}
                  />
                }
            </div>
        </div>
        <div className='w-1/2 z-20 fixed pt-12'>
            {isMenuOpen ? 
                (
                <div className='absolute p-4 z-40 bg-gray-200 h-screen w-full flex flex-col gap-10 pt-8'>
                <div className='menu_line flex gap-3 items-center cursor-pointer hover:underline-offset-2 hover:underline' onClick={handleMenuItemClick}>
                    <MdOutlineHomeWork className='w-5 h-5'/>
                    <a href='/'>Home</a>
                </div>
                <div className='menu_line flex gap-3 items-center cursor-pointer hover:underline-offset-2 hover:underline' onClick={handleMenuItemClick}>
                    <IoIosContacts className='w-5 h-5'/>
                    <p>Contact Us</p>
                </div>
                <div className='menu_line flex gap-3 items-center cursor-pointer hover:underline-offset-2 hover:underline' onClick={handleMenuItemClick}>
                    <CgProfile className='w-5 h-5'/>
                    <p>Profile</p>
                </div>
                <div className='logout_button'>
                    {isLoggedIn ? 
                    <button onClick={handleMenuItemClick}>Hello, {userFullName}</button>
                    : <button onClick={handleMenuItemClick}><a href="/#/login">Login</a></button>
                    }
                </div>
                </div>
                )
            : null}

        </div>
        </>
    )
}

export default Nav
