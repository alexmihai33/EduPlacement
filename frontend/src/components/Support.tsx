import logo from "../assets/logo.png";

const Support = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 mt-5">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center">
        <img className="mx-auto mb-4" src={logo} alt="Logo" width="60" />
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Contactează Support-ul
        </h1>
        <p className="text-gray-600 mb-6">
          Pentru întrebări sau asistență, te rugăm să ne scrii la:
        </p>
        <a
          href="mailto:support@support.com"
          className="text-blue-600 font-medium hover:underline"
        >
          support@support.com
        </a>
        <div className="mt-6">
          <p className="text-sm text-gray-400 italic">Work in progress...</p>
        </div>
      </div>
    </div>
  );
};

export default Support;
