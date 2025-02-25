const Footer = () => {

  function getYear(){
    const date = new Date();
    const year = date.getFullYear();

    return year;
  }

  const currentYear = getYear()
  
  return(
  <footer className="bg-light p-3 text-center">
    <div className="logo" />
    <p>
      Ministerul Educatiei {currentYear}
    </p>
  </footer>
  );
};

export default Footer;
