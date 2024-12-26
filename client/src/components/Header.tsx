import Logo from '../assets/logo.png';

const Header = () => {
  return (
    <>
    <header className="sticky top-0 z-50  backdrop-blur-md flex justify-between items-center p-6 shadow-md">
        <div>
          <a href="/" className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
              className="h-10 w-10"
            />
            <span className="font-bold text-2xl">MentG</span>
          </a>
        </div>
      </header>
    </>
  )
}

export default Header