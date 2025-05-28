import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import logo from "../assets/logo.png";
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Messaging from './Messaging';
import GeminiVerification from './GeminiVerification';
import GradientButton from './buttons/GradientButton';
import BorderAnimationButton from './buttons/BorderAnimationButton';

type TableRow = {
  id: number;
  [key: string]: string | number | null;
};

const SchoolDashboard: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [columns, setColumns] = useState<{ key: string; label: string }[]>([]);
  const [selectedTable, setSelectedTable] = useState<'table1a1' | 'table1a2' | 'table1b'>('table1a1');
  const [data, setData] = useState<TableRow[]>([]);
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


  const handleExportExcel = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/export/${selectedTable}?pj=${user?.pj}`, {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${selectedTable}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
      window.alert("Unable to export table");
    }
  }

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
        <td className="row-number-cell">{rowIndex + 1}</td>
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

  return (
    <div className={`container-fluid school-dashboard ${isFullScreen ? 'fullscreen' : ''}`} ref={tableRef}>
      <div className="text-center mb-5 mt-5">
        <img className="mb-3 app-logo" src={logo} alt="Logo" width="60" />
        <h1 className="mb-4">Tabele Incadrare | PJ: {user?.pj}</h1>
        <h2></h2>
      </div>

      <div className="row">
        <div className={`col-md-${isFullScreen ? '12' : '9'}`}>

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
                  <th className="row-number-header">Nr.</th>
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
          <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap mb-5">
            <div className="d-flex gap-2 mb-2">
              <BorderAnimationButton
                onClick={toggleFullScreen}
                icon={`${isFullScreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'}`}

              >
                {isFullScreen ? 'Ieșire ecran complet' : 'Ecran complet'}
              </BorderAnimationButton>

              <BorderAnimationButton
                onClick={() => {
                  const newRow: TableRow = { id: -Date.now() };
                  editableColumns.forEach(col => {
                    newRow[col.key] = '';
                  });
                  setData(prev => [...prev, newRow]);
                }}
                icon="bi-plus-circle"

              >
                Adaugă rând
              </BorderAnimationButton>
            </div>

            <div className="d-flex gap-2 mb-2">
              <GeminiVerification tableData={data} />

              <GradientButton
                onClick={handlePatchData}
                icon="bi-bookmark-check"
              >
                Save
              </GradientButton>

              <GradientButton
                onClick={handleExportExcel}
                icon="bi-file-earmark-arrow-down"
              >
                Export
              </GradientButton>
            </div>
          </div>
        </div>

        {!isFullScreen && (
          <div className="col-md-3">
            <div className="menu">
              {/* Modern Card with Glass Effect */}
              <div className="card glass-card mb-4 border-0">
                <div className="card-body">
                  <h4 className="mb-3" style={{ color: '#6610f2' }}>Lista Tabele</h4>
                  <label className="form-label mb-2">Selectează tabelul:</label>
                  <div className="position-relative">
                    <select
                      className="form-select glass-select"
                      value={selectedTable}
                      onChange={(e) => setSelectedTable(e.target.value as 'table1a1' | 'table1a2' | 'table1b')}
                    >
                      <option value="table1a1">Tabel 1A1</option>
                      <option value="table1a2">Tabel 1A2</option>
                      <option value="table1b">Tabel 1B</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Modern Glass Cards */}
              <div className="card glass-card border-0 mb-4">
                <div className="card-body">
                  <h3 style={{ color: "#6610f2" }}>
                    <i className="bi bi-robot me-2"></i>Asistent AI
                  </h3>
                  <p className="mb-0">
                    Utilizați sugestiile AI prin butonul aflat sub tabel, pentru corectarea mai usoara a datelor.
                  </p>
                </div>
              </div>

              <div className="card glass-card border-0 mb-4">
                <div className="card-body">
                  <h3 style={{ color: "#6f42c1" }}>
                    <i className="bi bi-chat-dots me-2"></i>Chat
                  </h3>
                  <p className="mb-0">
                    Utilizați funcția de chat găsită în partea de jos-dreapta a ecranului pentru a comunica cu inspectoratul școlar județean.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {!isFullScreen && (<div className="instructions-card mt-4 border rounded p-4 shadow mb-4" style={{ borderColor: '#dee2e6' }}>
          <h4 className="mb-3" style={{ color: '#6610f2' }}>
            <i className="bi bi-info-circle me-2"></i>Instrucțiuni importante
          </h4>

          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <div className="me-3" style={{ color: '#6610f2' }}>
                  <i className="bi bi-table fs-5"></i>
                </div>
                <div>
                  <h6 className="mb-1" style={{ fontWeight: 600 }}>Schimbare tabel</h6>
                  <p className="mb-0">Puteți selecta un alt tabel folosind meniul "Selectează tabelul" din bara laterală</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <div className="me-3" style={{ color: '#6610f2' }}>
                  <i className="bi bi-file-earmark-excel fs-5"></i>
                </div>
                <div>
                  <h6 className="mb-1" style={{ fontWeight: 600 }}>Export Excel</h6>
                  <p className="mb-0">Apăsați butonul "Export" pentru a descărca tabelul curent în format Excel</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <div className="me-3" style={{ color: '#6610f2' }}>
                  <i className="bi bi-save fs-5"></i>
                </div>
                <div>
                  <h6 className="mb-1" style={{ fontWeight: 600 }}>Salvare modificări</h6>
                  <p className="mb-0">
                    <span>Obligatoriu:</span> Apăsați "Save"
                    după <u>fiecare modificare</u> pentru a salva schimbările
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <div className="me-3" style={{ color: '#6610f2' }}>
                  <i className="bi bi-arrows-fullscreen fs-5"></i>
                </div>
                <div>
                  <h6 className="mb-1" style={{ fontWeight: 600 }}>Mod ecran complet</h6>
                  <p className="mb-0">Folosiți butonul "Full Screen" pentru vizualizare optimă pe tot ecranul</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex">
                <div className="me-3" style={{ color: '#6610f2' }}>
                  <i className="bi bi-robot fs-5"></i>
                </div>
                <div>
                  <h6 className="mb-1" style={{ fontWeight: 600 }}>Asistență AI</h6>
                  <p className="mb-0">Folosiți "Sugestii AI" pentru corectări automate și sfaturi</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex">
                <div className="me-3" style={{ color: '#6610f2' }}>
                  <i className="bi bi-chat-dots fs-5"></i>
                </div>
                <div>
                  <h6 className="mb-1" style={{ fontWeight: 600 }}>Suport inspectorat</h6>
                  <p className="mb-0">Utilizați funcția de chat pentru întrebări adresate inspectoratului</p>
                </div>
              </div>
            </div>
          </div>
        </div>)}
      </div>

      {!isFullScreen ? (user?.pj && user?.email && (
        <Messaging pj={user.pj} />
      )) : null}

    </div >
  );
};

export default SchoolDashboard;
