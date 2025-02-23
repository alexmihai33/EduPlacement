
import logo from "../assets/logoHome.jpg";

const Hero = () => {

  return (


    <div className="container col-xxl-8 px-4 py-3">
      <div className="container my-5">
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-5 fw-bold lh-1 text-body-emphasis">EduPlacement</h1>
            <p className="lead">O platforma menita sincronizarii scolilor si a inspectoratelor scolare pe percursul proiectului de incardare in invatamantul pre-universitar.
            Scopul acesteia este usurarea si eficientizarea muncii depuse de catre oamenii implicati in acest proiect.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
            </div>
          </div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <img src={logo} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="600" height="375" loading="lazy" />
          </div>
        </div>
      </div>

   

      {/*features*/}
      <div className="container px-4 py-5" id="hanging-icons">
        <h2 className="pb-2 border-bottom">Ce poti face?</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="col d-flex align-items-start">
            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              <svg className="bi" width="1em" height="1em"></svg>
            </div>
            <div>
              <h3 className="fs-2 text-body-emphasis">Noutati</h3>
              <p>Viziteaza ultimele noutati si modificari legale legislative care te pot ajuta in alegeri si decizii imbunatatite.</p>
              <a href="/news" className="btn btn-primary">
                News
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              <svg className="bi" width="1em" height="1em"></svg>
            </div>
            <div>
              <h3 className="fs-2 text-body-emphasis">Ghid</h3>
              <p>Viziteaza ghidul nostru pentru a beneficia de toate cunostintele necesare utilizarii acestei platforme cu un rezultat bun.</p>
              <a href="/guide" className="btn btn-primary">
                Guide
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
              <svg className="bi" width="1em" height="1em"></svg>
            </div>
            <div>
              <h3 className="fs-2 text-body-emphasis">Ajutor</h3>
              <p>Daca intampini probleme sau vrei sa semnalezi un defect in functionalitatea acestei platforme, contacteaza-ne.</p>
              <a href="/support" className="btn btn-primary">
                Help
              </a>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};


export default Hero;
