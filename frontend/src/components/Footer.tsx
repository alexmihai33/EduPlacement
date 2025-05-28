const Footer = () => {
  function getYear(){
    const date = new Date();
    const year = date.getFullYear();
    return year;
  }

  const currentYear = getYear()
  
  return(
    <footer className="custom-footer">
      <div className="logo" />
      <p>
        Ministerul Educatiei {currentYear}
      </p>
    </footer>
  );
};

export default Footer;