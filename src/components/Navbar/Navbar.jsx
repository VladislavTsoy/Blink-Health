import { withRouter } from 'react-router-dom'; 

const Navbar = ({ title, history }) => {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-2 lg:grid-cols-3 bg-white shadow-md p-5 md:px-10">
       {/* left */}
      <div className="w-33">
        <img 
          className="h-10 cursor-pointer my-auto "
          src="/logo.jpeg" alt="blink health"
          onClick={() => history.push("/drugs/search")}/>
      </div>

       {/* middle */}
      <div className="w-33 flex items-center justify-center">
        <h2 className="text-center font-semibold text-2xl">
          {title}
        </h2>
      </div>

       {/* right */}
      <div className="min-w-33 hidden lg:inline">

      </div>
    </header>
  );
};

export default withRouter(Navbar);