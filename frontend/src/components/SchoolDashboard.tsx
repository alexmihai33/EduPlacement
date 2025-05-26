import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import logo from "../assets/logo.png";
import { Button, Modal } from 'react-bootstrap';
import { GoogleGenAI } from "@google/genai";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Messaging from './Messaging';


type TableRow = {
  id: number;
  [key: string]: string | number | null;
};

const SchoolDashboard: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [columns, setColumns] = useState<{ key: string; label: string }[]>([]);
  const [selectedTable, setSelectedTable] = useState<'table1a1' | 'table1a2'>('table1a1');
  const [data, setData] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(false); // To handle the loading state
  const [aiResponse, setAiResponse] = useState<string | null>(null); // To store AI response
  const [showModal, setShowModal] = useState(false); // For controlling modal visibility\
  const tableRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth0()

  const editableColumns = columns.filter(col => col.key !== 'pj');

  useEffect(() => {
    const fetchData = async () => {
      const userPj = user?.pj;

      if (!userPj) {
        alert("Nu s-a putut prelua codul unității (pj).");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/${selectedTable}/by-pj`, {
          params: { pj: userPj },
        });

        const result = response.data;

        // Compute columns from API result keys (exclude "id" or any unwanted keys)
        if (result.length > 0) {
          const dynamicColumns = Object.keys(result[0])
            .filter(key => key !== 'id')  // Exclude columns you don’t want displayed
            .map(key => ({
              key,
              label: key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
            }));

          setColumns(dynamicColumns);

          // Add missing keys as empty string
          const cleanedResult = result.map((row: TableRow) => {
            const newRow: TableRow = { ...row };
            dynamicColumns.forEach(col => {
              if (newRow[col.key] == null) newRow[col.key] = '';
            });
            return newRow;
          });

          setData(cleanedResult);
        } else {
          setColumns([]);
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching filtered data:', error);
        alert("Eroare la încărcarea datelor.");
      }
    };


    fetchData();
  }, [user, selectedTable]);


  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      tableRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };


  const handlePatchData = async () => {
    const userPj = user?.pj;

    if (!userPj) {
      alert("Nu s-a putut prelua codul unității (pj).");
      return;
    }

    // Add pj to all rows
    const dataWithPj = data.map(row => ({ ...row, pj: userPj }));

    // Separate new and existing rows
    const newRows = dataWithPj.filter(row => row.id < 0).map(({ id, ...rest }) => rest);
    const existingRows = dataWithPj.filter(row => row.id >= 0);

    try {
      // POST new rows
      if (newRows.length > 0) {
        await Promise.all(
          newRows.map(row => axios.post(`http://localhost:8080/api/${selectedTable}`, row))
        );
      }

      // PATCH existing rows
      if (existingRows.length > 0) {
        await axios.patch(`http://localhost:8080/api/${selectedTable}`, existingRows);
      }
    } catch (error) {
      console.error('Eroare la salvarea datelor:', error);
      alert("Eroare la salvarea datelor.");
    }
  };

  const handleDeleteRow = async (id: number) => {
    if (!window.confirm('Ești sigur că dorești să ștergi acest rând?')) return;

    try {
      await axios.delete(`http://localhost:8080/api/${selectedTable}/${id}`);
      setData(prevData => prevData.filter(row => row.id !== id));
    } catch (error) {
      console.error('Eroare la ștergerea rândului:', error);
      alert('Eroare la ștergerea rândului.');
    }
  };



  const renderTableRows = () => {
    return data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {editableColumns.map((col) => (
          <td key={col.key}>
            <input
              className='tableInput'
              type="text"
              value={row[col.key] ?? ''}
              onChange={(e) => {
                const updatedData = [...data];
                updatedData[rowIndex][col.key] = e.target.value;
                setData(updatedData);
              }}
            />
          </td>
        ))}

        {/* Delete button cell */}
        <td style={{ whiteSpace: 'nowrap' }}>
          {row.id >= 0 && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteRow(row.id)}
              title="Șterge rândul"
            >
              <i className="bi bi-trash"></i>
            </button>
          )}
        </td>
      </tr>
    ));
  };

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const handleVerifyWithGemini = async () => {
    setShowModal(true)
    setLoading(true)

    const userTableData = data;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: `
            Pentru următoarele datele
            ${JSON.stringify(userTableData, null, 2)}
            Corectează-le dupa următoarele reguli: 
            1. valoare pentru specializare trebuie să fie "Filologie", "Matematică-Informatică", "Mecanică", "Arte Vizuale", "Engleză-Franceză", "Agricolă", "Psihologie", "Schi-Alpinism"
            2. numărul de copii pentru oricare dintre valori (propus/existent) trebuie să nu depășească 200
            3. cuvintele trebuie să fie corecte din punct de vedere gramatical în limba română (dacă observi greșeli, punctează-le)
            Raspunde doar cu ce valori ai schimba din input și de ce (răspuns succint)
            Exemplu format răspuns (fiecare sugestie urmărește acest format): "Pe linia a 2-a, coloana filieră, valoarea ... ar trebui schimbata in ... | justificare: ..."
            Notite suplimentare: Cand denumesti coloana, NU PUNE NUMELE TABELEI (nrCopiiExistentAnteprescolar) deoarce nu este lizibil, ci transforma in valoarea de pe prima linia din coloana (Nr Copii Existent Anteprescolar) !FOARTE IMPORTANT
            Nu pune stelute sau alte caractere la inceput de randuri. Nu include in justificare numarul regulii pe care ti-am spus-o. In plus, include un spatiu intre randuri.
            Nu lua in considerare adjective - nu sugera schimbarea adjectivelor din feminin in masculin/vice-versa.
            !Verifica cu atentie fiecare coloana pentru a observa care dintre acestea nu respecta regulile.
            !Scrie in limba romana cu diacritice
            `,
    });

    const aiResponse: any = response.text
    console.log(response.text);
    setLoading(false)
    setAiResponse(aiResponse);

  };

  return (
    <div className={`container-fluid school-dashboard ${isFullScreen ? 'fullscreen' : ''}`} ref={tableRef}>
      <div className="text-center mb-5 mt-5">
        <img className="mb-3 app-logo" src={logo} alt="Logo" width="60" />
        <h1 className="mb-4">School Dashboard</h1>
        <p className="lead">Completati tabelele de incadrare</p>
      </div>

      <div className="row">
        <div className={`col-md-${isFullScreen ? '12' : '9'}`}>
          <h4 className="mb-2"><i className="bi bi-table me-2 ms-1" style={{ color:"#007bff" }}></i>{selectedTable === 'table1a1' ? '1A1' : '1A2'}</h4>
          <div
            className="table-container"
            style={{
              overflow: 'auto',
              maxHeight: isFullScreen ? '60vh' : '500px',
              maxWidth: '100%',
            }}
          >
            
            <table className="table table-bordered">
              <thead>
                <tr>
                  {editableColumns.map((col) => (
                    <th key={col.key}>
                      {col.label.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </th>
                  ))}
                  <th>Sterge</th>
                </tr>
              </thead>

              <tbody>{renderTableRows()}</tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end mt-3">

            <button className="btn btn-AI mb-4 me-2" style={{ backgroundColor: '#6610f2', color: 'white' }} onClick={handleVerifyWithGemini}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <i className="bi bi-robot" style={{ fontSize: '1.5rem' }}></i> Sugestii AI
              </span>
            </button>

            <button className="btn btn-outline-primary me-2 mb-4" onClick={handlePatchData}>
              <i className="bi bi-save" style={{ marginRight: '5px' }}></i> Save
            </button>
            <button className="btn btn-outline-primary me-2 mb-4" onClick={() => {
              const newRow: TableRow = { id: -Date.now() };
              editableColumns.forEach(col => {
                newRow[col.key] = '';
              });
              setData(prev => [...prev, newRow]);
            }}>
              <i className="bi bi-plus-circle" style={{ marginRight: '5px' }}></i> Adaugă rând
            </button>

            <button className="btn btn-outline-primary me-2 mb-4" onClick={toggleFullScreen}>
              <i className="bi bi-arrows-fullscreen me-1"></i>
              {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
            </button>


          </div>
        </div>

        {!isFullScreen && (
          <div className="col-md-3">
            <div className="menu">

              <div className="card shadow border-0 mb-2">
                <div className="card-body">
                  <h4>Lista Tabele</h4>
                  <label className="form-label">Selectează tabelul:</label>
                  <select
                    className="form-select"
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value as 'table1a1' | 'table1a2')}
                  >
                    <option value="table1a1">Tabel 1A1</option>
                    <option value="table1a2">Tabel 1A2</option>
                  </select>

                </div>
              </div>

              <div className="">
                <div className="card shadow border-0 mb-2">
                  <div className="card-body">
                    <h3 style={{ color: "#6610f2" }}>
                      A.I. <i className="bi bi-robot ms-2" style={{ fontSize: '1.5rem' }}></i>
                    </h3>
                    <p>
                      Utilizați sugestiile AI prin butonul aflat sub tabel, pentru corectarea mai usoara a datelor.
                    </p>
                  </div>
                </div>

                <div className="card shadow border-0 mb-2">
                  <div className="card-body">
                    <h3 style={{ color: "#6f42c1" }}>
                      Chat <i className="bi bi-chat-dots ms-2"></i>
                    </h3>
                    <p>
                      Utilizați funcția de chat găsită în partea de jos-dreapta a ecranului pentru a comunica cu inspectoratul școlar județean.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Modal for AI Response */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered>
        <Modal.Header closeButton style={{ background: 'linear-gradient(to right, #6f42c1, #b07fff)', color: 'white' }}>
          <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <i className="bi bi-robot" style={{ fontSize: '1.5rem' }}></i> Edu AI
            </span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: '#f5f0ff', maxHeight: '70vh', overflowY: 'auto', paddingBottom: '80px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <Spinner animation="border" variant="primary" role="status" style={{ width: '4rem', height: '4rem' }} />
              <p style={{ marginTop: '1rem', color: '#6f42c1', fontWeight: 'bold' }}>Se verifică răspunsul AI...</p>
            </div>
          ) : (
            <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: 'white', padding: '1rem', borderRadius: '10px' }}>
              {aiResponse || "No AI response yet."}
            </pre>
          )}
        </Modal.Body>

        {/* Sticky Footer */}
        <Modal.Footer
          style={{
            backgroundColor: '#f5f0ff',
            position: 'sticky',
            bottom: 0,
            zIndex: 10,
            borderTop: '1px solid #ddd',
            justifyContent: 'center'
          }}
        >
          <Button variant="secondary" onClick={() => setShowModal(false)} style={{
            backgroundColor: '#6f42c1', color: "white"
          }}>
            Închide
          </Button>
        </Modal.Footer>
      </Modal>

      {!isFullScreen ? (user?.pj && user?.email && (
        <Messaging pj={user.pj} />
      )) : null}

    </div >
  );
};

export default SchoolDashboard;
