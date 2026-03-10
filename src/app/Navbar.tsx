
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {

    const [show, setShow] = useState(false);

    const tl = gsap.timeline();
    const tl2 = gsap.timeline();
    useGSAP(() => {
        if (!show) {

            tl.from('.navv', {
                y: -20,
            })

            tl.from('.head', {
                y: -30,
                opacity: 0,
                stagger: 0.2
            })

            tl.from('.one , .two , .three', {
                y: -30,
                opacity: 0,
                stagger: 0.2,
            })
        }

        if (show) {
            tl2.from(".hamburger", {
                x: 200,
                opacity: 0,
            })

            tl2.from('.one , .two , .three , .cross', {
                x: 30,
                opacity: 0,
                stagger: 0.2,
            })
        }
    }, [show])

    return (

        <div>
<div className="bg-navy flex items-center justify-between max-w-[100%] navv py-3 px-5 relative z-50">
                <h1 className=" text-xl sm:text-2xl md:text-4xl my-poppins text-white font-bold head">Expense Tracker</h1>
                <NavigationMenu className="">

                    {!show && <NavigationMenuList className="flex gap-5">

                        <div className="one">
                            <NavigationMenuItem>
                                <NavigationMenuLink className="my-poppins font-semibold bg-white px-4 py-2 rounded text-[14px] md:text-[15px] lg:text-[16px]
                            hidden sm:block">
                                    <Link to="/">Dashboard</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </div>
                        <div className="two">
                            <NavigationMenuItem>
                                <NavigationMenuLink className="my-poppins font-semibold bg-white px-4 py-2 rounded text-[14px] md:text-[15px] lg:text-[16px]
                            hidden sm:block">
                                    <Link to="/transactions">Transactions</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </div>

                        <div className="three">
                            <NavigationMenuItem>
                                <NavigationMenuLink className="my-poppins font-semibold bg-white px-4 py-2 rounded text-[14px] md:text-[15px] lg:text-[16px]
                            hidden sm:block">
                                    <Link to='/report'>Report</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </div>


                    </NavigationMenuList>}

                    {show && <NavigationMenuList className="flex gap-5 relative hamburger">
                        <div className="z-2 flex flex-col gap-3 absolute top-[-35px] right-[-55px] bg-navyHover/80 py-20 px-10 rounded-2xl backdrop-blur-xs">
                            <p className="cross text-2xl text-white font-bold absolute top-5 right-5 rounded-full p-2 cursor-pointer hover:bg-navy"
                                onClick={() => tl2.reverse()}>×</p>
                            <div className="one">
                                <NavigationMenuItem>
                                    <NavigationMenuLink className="my-poppins font-semibold bg-white px-4 py-2 rounded text-[14px] md:text-[15px] lg:text-[16px]
                            ">
                                        <Link to="/">Dashboard</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </div>
                            <div className="two">
                                <NavigationMenuItem>
                                    <NavigationMenuLink className="my-poppins font-semibold bg-white px-4 py-2 rounded text-[14px] md:text-[15px] lg:text-[16px]
                            ">
                                        <Link to="/transactions">Transactions</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </div>

                            <div className="three">
                                <NavigationMenuItem>
                                    <NavigationMenuLink className="my-poppins font-semibold bg-white px-4 py-2 rounded text-[14px] md:text-[15px] lg:text-[16px]
                            ">
                                        <Link to='/report'>Report</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </div>

                        </div>
                    </NavigationMenuList>}

                        <div className="">
                        <p className={`block sm:hidden text-xl text-white font-semibold cursor-pointer hover:bg-navyHover rounded-full p-2`}
                        onClick={()=> {
                            setShow(!show)
                        }
                            } >☰</p>
                    </div>
                </NavigationMenu>
            </div>


        </div>
    )
}

export default Navbar