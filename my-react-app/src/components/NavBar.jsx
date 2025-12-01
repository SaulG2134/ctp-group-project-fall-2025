import NavbarBg from '../assets/rectangle.png';
import Logo from '../assets/Logo.png';

function Navbar({ onNavigate }) {
    return (
        <nav className="relative h-20">
            <img 
                src={NavbarBg} 
                alt="Navbar background" 
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative container mx-auto h-full flex justify-between items-center px-1">
                <div className="flex items-center">
                    <img 
                        src={Logo} 
                        alt="Logo" 
                        className="h-40 w-40 mt-18"
                    />
                </div>
                <ul className="flex space-x-6">
                    <li>
                        <button 
                            onClick={() => onNavigate('home')}
                            className="text-white hover:text-[rgb(188,138,82)] transition-colors font-semibold"
                        >
                            Home
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => onNavigate('coursepicker')}
                            className="text-white hover:text-[rgb(188,138,82)] transition-colors font-semibold"
                        >
                            Course Picker
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => onNavigate('contact')}
                            className="text-white hover:text-[rgb(188,138,82)] transition-colors font-semibold"
                        >
                            Schedule Builder
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => onNavigate('progress')}
                            className="text-white hover:text-[rgb(188,138,82)] transition-colors font-semibold"
                        >
                            Progress
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;