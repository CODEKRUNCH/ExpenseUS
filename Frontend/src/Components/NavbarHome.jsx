import React,{useState} from "react";
const NavbarHome=()=>{ 
 const [openMenu, setOpenMenu] = useState(false); // React state
    return(
        <header
      className="flex justify-between items-center shadow-md rounded-full p-3 mx-4 fixed top-5 left-0 right-0 z-20 bg-white/90 backdrop-blur-sm"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* <!-- Logo --> */}
       
          <a href="index.html" class="logo w-48 py-1">
          <svg
            preserveAspectRatio="xMidYMid meet"
            data-bbox="0 0 456.82 52.14"
            viewBox="0 0 456.82 52.14"
            xmlns="http://www.w3.org/2000/svg"
            data-type="color"
            role="presentation"
            aria-hidden="true"
            aria-label=""
          >
            <g>
              <path
                d="M8.84 1.03h30.33l-.83 4.64H13.51l-3.23 18.3h21.39l-.83 4.64H9.46L5.51 51.1H0z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M54.04.69h5.33L69.62 51.1h-5.54l-7.43-39.06c-.16-.87-.3-1.73-.43-2.56-.13-.84-.22-1.67-.29-2.49h-.34c-.34.83-.72 1.66-1.12 2.49s-.83 1.69-1.29 2.56L31.83 51.1h-5.71zM38.7 33.01h24.55l.93 4.57H36.12z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M77.48 24.66c1.4-7.84 4.43-13.91 9.1-18.21Q93.57 0 102.42 0c8.85 0 9.8 1.57 12.55 4.71q4.125 4.71 3.3 12l-.03.34h-5.5l.03-.34c.37-3.58-.37-6.46-2.22-8.65s-4.84-3.29-8.99-3.29c-4.36 0-8.24 1.69-11.66 5.07s-5.7 8.32-6.84 14.81l-.48 2.82c-1.12 6.33-.58 11.22 1.63 14.68s5.51 5.19 9.89 5.19 7.73-1.19 10.25-3.58c2.52-2.38 4.22-5.17 5.09-8.36l.1-.34h5.5l-.1.34c-1.28 4.66-3.75 8.6-7.41 11.85-3.66 3.24-8.42 4.87-14.29 4.87s-10.42-2.14-13.58-6.41c-3.16-4.28-4.05-10.36-2.65-18.24l.48-2.82Z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M123.99 1.03h38.51l-.83 4.64h-16.5l-8.01 45.43h-5.5l8.01-45.43h-16.51z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M161.73 24.66c1.4-7.84 4.43-13.91 9.1-18.21S180.9 0 187.04 0s10.76 2.15 13.93 6.45c3.16 4.3 4.05 10.37 2.65 18.21l-.48 2.82c-1.38 7.84-4.4 13.91-9.08 18.21q-7.02 6.45-16.2 6.45c-9.18 0-10.79-2.15-13.94-6.45s-4.04-10.37-2.66-18.21l.48-2.82Zm6.74 17.48c2.2 3.47 5.62 5.21 10.25 5.21s8.63-1.74 12.05-5.21c3.43-3.47 5.69-8.36 6.79-14.67l.48-2.82c1.12-6.31.58-11.19-1.63-14.67-2.21-3.47-5.61-5.21-10.2-5.21s-8.66 1.74-12.09 5.21-5.7 8.36-6.83 14.67l-.48 2.82c-1.1 6.31-.55 11.19 1.65 14.67Z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M216.9 1.03h15.89c5.3 0 9.12 1.32 11.47 3.96s3.13 6.17 2.35 10.59-2.81 7.98-6.1 10.66-7.58 4.02-12.88 4.02h-10.39l-3.68 20.84h-5.5zm11.52 24.66c4.06 0 7.06-.96 9.01-2.89s3.17-4.33 3.68-7.22c.5-2.89.12-5.27-1.15-7.15s-3.94-2.82-7.99-2.82h-10.39l-3.54 20.08zm.49 2.3 5.36-.65 8.6 23.76h-5.78z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M251.41 24.52c1.45-8.21 4.66-14.34 9.65-18.4S272.1.03 279.23.03c6.53 0 11.44 1.51 14.72 4.54s4.4 6.96 3.37 11.8l-.14.55h-13.27l.07-.41c.39-2.06.02-3.7-1.1-4.92s-3.12-1.82-5.98-1.82-5.23 1-7.29 2.99c-2.06 2-3.49 5.31-4.3 9.94l-1.2 6.74c-.85 4.82-.46 8.19 1.17 10.13q2.445 2.91 7.29 2.91c1.53 0 2.88-.17 4.02-.5 1.15-.33 2.33-.88 3.54-1.63l1.27-7.08h-7.87l1.65-9.42h20.84l-3.68 20.8c-2.2 1.86-5.1 3.57-8.7 5.12-3.6 1.56-7.86 2.34-12.79 2.34-7.64 0-13.23-2.03-16.78-6.09s-4.62-10.19-3.2-18.4l.55-3.1Z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M306.79 1.03h35.25l-1.72 9.73h-22.21l-1.75 9.83h19.09l-1.68 9.52h-19.09l-1.96 11.31h22.59l-1.72 9.66h-35.63l8.84-50.07Z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M348.83 1.03h14.03l9.94 28.4a20.4 20.4 0 0 1 .89 3.92h.27c.09-.83.18-1.52.28-2.1.09-.57.21-1.27.34-2.1l4.99-28.13h10.9l-8.84 50.07h-14.44l-9.77-27.96c-.25-.69-.42-1.35-.5-1.98s-.17-1.35-.26-2.15h-.27c-.09.83-.19 1.61-.29 2.34q-.15 1.095-.39 2.34l-4.82 27.41h-10.9l8.84-50.07Z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M399.44 1.03h13.17l-8.84 50.07H390.6z"
                fill="#008ff5"
                data-color="1"
              ></path>
              <path
                d="M421.57 1.03h35.25l-1.72 9.73h-22.21l-1.75 9.83h19.09l-1.68 9.52h-19.09l-1.96 11.31h22.59l-1.72 9.66h-35.63l8.84-50.07Z"
                fill="#008ff5"
                data-color="1"
              ></path>
            </g>
          </svg>
        </a>
        {/* <!-- Desktop Menu --> */}
        <nav className="hidden md:flex space-x-6 items-center text-black">
          <a href="index.html" className="hover:text-purple-600">Features</a>
          <a href="integrations.html" className="hover:text-purple-600"
            >Integrations</a
          >
          <a href="#" className="hover:text-purple-600">Contact Us</a>
          <a href="#" className="hover:text-purple-600">Pricing</a>
          <a
            href="#"
            className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700"
            >Demo Your App</a
          >
        </nav>

        {/* <!-- Mobile Menu Button --> */}
 
 <div className="md:hidden flex items-center">
      <button
        onClick={() => setOpenMenu(!openMenu)} // React click handler
        className="text-gray-700 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Conditionally render mobile menu */}
      {openMenu && (
        <div>
          {/* Your mobile menu content  */}
            {/* Mobile Menu */}
        <div
          x-show="openMenu"
          x-transition
          className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-2 py-2"
        >
          <a
            href="index.html"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
          >Features</a>
          <a
            href="integrations.html"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
          >Integrations</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Contact Us</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Pricing</a>
          <a
            href="#"
            className="block bg-blue-500 text-white text-center px-4 py-2 rounded-full hover:bg-blue-600"
          >Demo Your App</a>
        </div>
        </div>
      )}
    </div>
      </div>
</header>
);
};
export default NavbarHome