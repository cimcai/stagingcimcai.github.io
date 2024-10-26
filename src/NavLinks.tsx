function NavLinks() {
  return (
    <>
      <div className="md:hidden px-2 flex gap-3 items-center">
        <a href="#">
          <span className="leading-none cimc-logo-copy text-black">
            LIBRARY
          </span>
        </a>
        <a href="#">
          <span className="leading-none cimc-logo-copy text-black">
            EVENTS
          </span>
        </a>
      </div>
      
      <div className="md:hidden pl-8 flex gap-3 flex-wrap">
        <a href="https://twitter.com/Plinz" target="_new" aria-label="X">
          <div className="h-10 w-10 p-2 hover:scale-110 transition-transform delay-50 text-black">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0" y="0" width="16" height="16" viewBox="0, 0, 16, 16" className="w-6 h-6"><g id="Layer_1"><path d="M9.524,6.776 L15.481,-0 L14.07,-0 L8.895,5.882 L4.765,-0 L0,-0 L6.247,8.896 L0,16 L1.411,16 L6.873,9.787 L11.235,16 L16,16 M1.921,1.041 L4.089,1.041 L14.069,15.01 L11.9,15.01" fill="currentColor"></path></g>
            </svg>
          </div>
        </a>
        <a href="https://www.youtube.com/@JoschaBach" target="_new" aria-label="YouTube">
          <div className="h-10 w-10 p-2 hover:scale-110 transition-transform delay-50 text-black">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0" y="0" width="24" height="16" viewBox="0, 0, 24, 16" className="w-6 h-6"><g id="Layer_1"><path d="M9.677,11.377 L9.677,4.623 L15.613,8 L9.677,11.377 z M22.88,2.498 C22.619,1.515 21.85,0.741 20.873,0.478 C19.102,0 12,0 12,0 C12,0 4.898,0 3.127,0.478 C2.15,0.741 1.381,1.515 1.12,2.498 C0.645,4.281 0.645,8 0.645,8 C0.645,8 0.645,11.719 1.12,13.502 C1.381,14.485 2.15,15.259 3.127,15.522 C4.898,16 12,16 12,16 C12,16 19.102,16 20.873,15.522 C21.85,15.259 22.619,14.485 22.88,13.502 C23.355,11.719 23.355,8 23.355,8 C23.355,8 23.355,4.281 22.88,2.498" fill="currentColor"></path></g>
            </svg>
          </div>
        </a>
        <a href="https://open.spotify.com/show/6hMLQalUpXl0ErT7dOM7dY" target="_new" aria-label="Spotify">
          <div className="h-10 w-10 p-2 hover:scale-110 transition-transform delay-50 text-black">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0" y="0" width="16" height="16" viewBox="0, 0, 16, 16" className="w-6 h-6"><g id="Layer_1"><path d="M12.732,7.092 C10.154,5.561 5.9,5.42 3.438,6.167 C3.043,6.287 2.625,6.064 2.505,5.669 C2.385,5.273 2.608,4.855 3.004,4.735 C5.83,3.877 10.527,4.043 13.496,5.805 C13.852,6.016 13.968,6.476 13.758,6.831 C13.547,7.186 13.087,7.303 12.732,7.092 z M12.648,9.36 C12.467,9.654 12.083,9.746 11.79,9.566 C9.64,8.244 6.362,7.861 3.818,8.634 C3.488,8.733 3.14,8.547 3.04,8.218 C2.94,7.888 3.126,7.54 3.456,7.44 C6.361,6.558 9.973,6.985 12.443,8.503 C12.736,8.684 12.828,9.068 12.648,9.36 z M11.669,11.539 C11.525,11.775 11.218,11.848 10.983,11.705 C9.105,10.557 6.74,10.297 3.955,10.933 C3.687,10.995 3.42,10.827 3.358,10.558 C3.297,10.29 3.465,10.023 3.733,9.961 C6.781,9.265 9.395,9.565 11.503,10.853 C11.739,10.997 11.813,11.304 11.669,11.539 z M8,-0 C3.582,-0 -0,3.582 -0,8 C-0,12.419 3.582,16 8,16 C12.418,16 16,12.419 16,8 C16,3.582 12.418,-0 8,-0" fill="currentColor"></path></g>
            </svg>
          </div>
        </a>
      </div>
    </>
  )
}

export default NavLinks