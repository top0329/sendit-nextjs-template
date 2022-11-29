
import Link from 'next/link';
import {useEffect, useRef} from 'react';
import data from '../../lib/data';


export default function Navigation({ children, page }) {

    useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
          window.removeEventListener("scroll", isSticky);
        };
      }, []);
   
    const isSticky = () => {
        var windscroll = $(window).scrollTop();
        if (windscroll >= 70) {
            $('#mainnavigationBar').addClass('sticky-nav');
        } else {
            $('#mainnavigationBar').removeClass('sticky-nav');
        }
    }
    const handleClick = event => {
        var navbar = $('#mainnavigationBar');
        navbar.toggleClass('bg-nav');
    };

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg position-fixed w-100 zindex-dropdown" id="mainnavigationBar">
                    <div className="container-fluid">
                        <Link className="navbar-brand" href="/">
                            <img src={data.navigation.logo} alt="Nav-Logo" />
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={handleClick}
                        >
                            <span className="navbar-toggler-default">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <line
                                        x1="3.5"
                                        y1="5.5"
                                        x2="21.5"
                                        y2="5.5"
                                        stroke="#292D32"
                                        stroke-width="3"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <line
                                        x1="4.5"
                                        y1="12.5"
                                        x2="21.5"
                                        y2="12.5"
                                        stroke="#292D32"
                                        stroke-width="3"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <line
                                        x1="11.5"
                                        y1="19.5"
                                        x2="21.5"
                                        y2="19.5"
                                        stroke="#292D32"
                                        stroke-width="3"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </span>
                            <span className="navbar-toggler-toggled">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21.5 6.5L6.5 21.5"
                                        stroke="#404152"
                                        stroke-width="3"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M21.5 21.5L6.5 6.5"
                                        stroke="#404152"
                                        stroke-width="3"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-20 mb-lg-0">

                                {data.navigation.items.map((link, i) => (
                                    <li key={i} className="nav-item">
                                        <Link href={`${link.link}`} className={`nav-link ${page?.slug?.toLowerCase() === link.text.toLowerCase() ? 'active' : ''}`}>
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="d-none d-lg-block">
                            <div className="nav-item">
                                <Link href={`${data.navigation.button.link}`} className="btn btn-sm btn-links">
                                    {data.navigation.button.text}
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
