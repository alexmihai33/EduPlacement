import logo from "../assets/logo.png";

const News = () => {
    const newsArticles = [
      {
        title: 'Reforma învățământului - ce se schimbă în 2025?',
        date: '12 Decembrie 2024',
        //summary: 'În 2024, Ministerul Educației va introduce o serie de reforme pentru modernizarea învățământului preuniversitar. Ce impact va avea asupra elevilor și profesorilor?',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy1Ef16NGv4plNUY-g9gofnF_T-cWkOp2ZoA&s',
        content: 'În 2024, Ministerul Educației va implementa noi programe educaționale care includ învățământ digitalizat și îmbunătățirea infrastructurii școlilor. Măsurile vizează reducerea disparităților dintre școlile din mediul urban și cele din mediul rural, prin implementarea unui sistem de învățământ mai echitabil. Profesorii vor beneficia de formare continuă, iar elevii vor avea acces la resurse educaționale online pentru a sprijini procesul de învățare. Aceste reforme sunt menite să contribuie la modernizarea sistemului educațional din România și la creșterea calității învățământului.',
        link: '/articol/reforma-invatamantului-2024',
      },
      {
        title: 'Noi norme pentru învățământul superior în 2025',
        date: '10 Decembrie 2024',
        //summary: 'Ministerul Educației anunță modificări importante în regulamentele pentru universități. Ce măsuri vor fi implementate și ce efecte vor avea asupra studenților?',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDqclZOcuSAH2c_ZLp9ylnxUNpATNTInO3Jg&s',
        content: 'Noile norme pentru învățământul superior se vor concentra pe digitalizarea cursurilor și pe implementarea unui sistem de evaluare mai transparent. Universitățile vor trebui să adopte platforme online pentru predare și evaluare, iar studenții vor avea acces la materiale educaționale și examene într-un format digital. Se pune accent pe îmbunătățirea accesului la educație pentru studenții din mediul rural, iar noile reglementări vor încuraja mobilitatea studenților între universități din Europa și din afaceri internaționale. De asemenea, se vor introduce reglementări mai clare privind învățământul la distanță și formarea continuă a profesorilor universitari.',
        link: '/articol/noi-norme-pentru-invatamantul-superior',
      },
      {
        title: 'Cum se va implementa educația digitală în școlile din România',
        date: '5 Decembrie 2025',
        //summary: 'Un program guvernamental urmărește să implementeze tehnologia în educație. Care sunt pașii pentru integrarea completă a educației digitale?',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmQ1QaxFlsCtPRQGU30Yci8itLg3M1g-5PZw&s',
        content: 'Programul guvernamental de implementare a educației digitale va include achiziționarea de echipamente moderne pentru toate școlile din România. Fiecare elev va avea acces la un dispozitiv personalizat pentru învățământ, iar profesorii vor beneficia de instruire privind utilizarea platformelor educaționale digitale. De asemenea, se va pune accent pe crearea unor aplicații educaționale interactive care vor sprijini învățarea la distanță și învățarea colaborativă. Programul va include și evaluarea progresului elevilor prin sisteme automatizate care vor ajuta la urmărirea performanțelor școlare. Scopul final al educației digitale este de a integra tehnologia în procesul educativ pentru a spori accesul și eficiența învățării.',
        link: '/articol/educatia-digitala-in-scoli',
      },
    ];
  
    return (
      <div className="my-5">
        <div className="text-center mb-5">
          <img className="mb-3 app-logo" src={logo} alt="Logo" width="60" />
          <h1 className="mb-4">Vizualizați ultimele noutăți și știri din învățământ</h1>
        </div>

        <div className="container">
          <div className="row">
            {newsArticles.map((article, index) => (
              <div className="col-12 mb-4" key={index}>
                <div className="card">
                  {article.image && (
                    <img
                      src={article.image}
                      className="card-img-top"
                      alt={article.title}
                      style={{ maxHeight: '200px', objectFit: 'contain' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{article.date}</h6>
                
                    <p className="card-text">{article.content}</p>
                    <a className="btn" style={{backgroundColor:"#6610f2", color:"white"}}>Citește mai mult</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default News;
  