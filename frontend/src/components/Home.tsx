import logo from "../assets/channels4_profile.png";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const BorderAnimationButton = styled(Button)({
  backgroundColor: 'transparent',
  border: '2px solid transparent',
  borderRadius: '8px',
  color: '#6610f2',
  padding: '12px 28px',
  fontWeight: 700,
  position: 'relative',
  transition: 'all 0.4s ease',
  '&:hover': {
    backgroundColor: 'rgba(102, 16, 242, 0.05)',
    color: '#4d0cb8'
  },
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '2px',
    backgroundColor: '#6610f2',
    transition: 'all 0.4s ease'
  },
  '&::before': {
    top: 0,
    left: 0,
  },
  '&::after': {
    bottom: 0,
    right: 0,
  },
  '&:hover::before, &:hover::after': {
    width: '100%'
  }
});

const Hero = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <>
      <div className="container my-5">
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-3 fw-bold text-body-emphasis">EduPlacement</h1>
            <p className="lead">Platforma proiectului de încadrare în învățământul preuniversitar.</p>
            <hr />
            <p className="lead">Pentru cont instituțional contactați:</p>
            <p className="lead">
              <i className="bi bi-envelope me-2"></i> support@eduplacement.ro
            </p>
            <p className="lead">
              <i className="bi bi-telephone me-2"></i> +40783013933
            </p>
            <hr />
            {isAuthenticated ? (
              <p className="lead">
              Bine ai venit! Ești autentificat. Poți continua pe <a href="/dashboard" style={{color:"#6610f2"}}>Dashboard</a>
              </p>
            ) : (
              <div>
              <p className="lead">
              Ai deja cont?
              <BorderAnimationButton
                type="button"
                onClick={() => loginWithRedirect()}
                className="btn ms-1"
              >
                Log in
              </BorderAnimationButton>
              </p>    
              <p className="lead mt-2">Pentru a putea utiliza platforma, este necesar un cont.</p>        
              </div>
            )}
            </div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            <img
              src={logo}
              className="home-logo d-block mx-lg-auto img-fluid"
              alt="EduPlacement logo"
              width="600"
              height="375"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="container px-4 py-5">
        <h2 className="pb-2 border-bottom">Ce oferă platforma?</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3" style={{color:"#6610f2"}}>
              <i className="bi bi-robot"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">Asistență AI</h3>
            <p>Utilizează inteligența artificială pentru a automatiza sarcini și a îndruma utilizatorii în procesul de încadrare.</p>
          </div>

          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3" style={{color:"#6610f2"}}>
              <i className="bi bi-lock-fill"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">Securitate completă</h3>
            <p>Autentificare și autorizare prin conturi instituționale, păstrând datele în siguranță.</p>
          </div>

          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3" style={{color:"#6610f2"}}>
              <i className="bi bi-chat-dots-fill"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">Comunicare ușoară</h3>
            <p>Sistem de mesagerie integrat pentru colaborare rapidă între cadrele didactice și administrație.</p>
          </div>

          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3" style={{color:"#6610f2"}}>
              <i className="bi bi-file-earmark-excel-fill"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">Export în Excel</h3>
            <p>Export rapid al datelor în format Excel pentru raportări și arhivare ușoară.</p>
          </div>

          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3" style={{color:"#6610f2"}}>
              <i className="bi bi-lightning"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">Eficientizarea muncii</h3>
            <p>Platforma este concepută pentru a ușura munca depusă în cadrul proiectului de încadrare, reducând timpul și efortul necesar.</p>
          </div>

          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3" style={{color:"#6610f2"}}>
              <i className="bi bi-stars"></i>
            </div>
            <h3 className="fs-2 text-body-emphasis">Design modern</h3>
            <p>Feature-urile sunt împachetate într-un design modern și ușor de utilizat, ce crează plăcere în munca depusă.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
