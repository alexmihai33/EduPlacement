import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import logo from "../assets/logo.png";

type TableRow = {
  id: number;
  [key: string]: string | number;
};

type Tables = {
  [key: string]: TableRow[];
};

const SchoolDashboard: React.FC = () => {
  const [currentTable, setCurrentTable] = useState<string>('Table 1');
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [data, setData] = useState<TableRow[]>([]); // To store the fetched data
  const tableRef = useRef<HTMLDivElement>(null);

  const tables: Tables = {
    'Table 1': Array.from({ length: 9 }, (_, i) => ({ id: i + 1, column1: '', column2: '', column3: '', column4: '', column5: '', column6: '', column7: '', column8: '', column9: '' })),
    'Table 2': Array.from({ length: 6 }, (_, i) => ({ id: i + 1, columnA: '', columnB: '', columnC: '', columnD: '', columnE: '', columnF: '' })),
  };

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://eduplacement-4.onrender.com/api/table1/user/1'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setData(data); // Store fetched data
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Effect to listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Render table rows dynamically
  const renderTableRows = () => {
    return data.map((row, index) => (
      <tr key={index}>
        {Object.keys(row).map((key) => (
          key !== 'id' && (
            <td key={key}>
              <input
                type="text"
                value={row[key] || ''}
                onChange={(e) => {
                  const updatedData = [...data];
                  updatedData[index][key] = e.target.value;
                  setData(updatedData); // Update state with modified data
                }}
              />
            </td>
          )
        ))}
      </tr>
    ));
  };

  // Handle full screen toggle
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      tableRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Send PATCH request to update data on the backend
  const handlePatchData = async () => {
    try {
      const response = await fetch('https://eduplacement-4.onrender.com/api/table1/user/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Just send the rows array (not wrapped in { userId: 1 })
      });
  
      if (response.ok) {
      } else {
        alert('Failed to update data!');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className={`container-fluid school-dashboard ${isFullScreen ? 'fullscreen' : ''}`} ref={tableRef}>
      <div className="text-center mb-5">
        <img className="mb-3 app-logo" src={logo} alt="Logo" width="60" />
        <h1 className="mb-4">School Dashboard</h1>
        <p className="lead">Completati tabelele de incadrare</p>
      </div>

      <div className="row">
        <div className={`col-md-${isFullScreen ? '12' : '9'}`}>
          <h2 className="mb-4">{currentTable}</h2>
          <div className="d-flex justify-content-between mb-2">
            <button className="btn btn-primary" onClick={toggleFullScreen}>
              {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
            </button>
          </div>
          <div className="table-container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  {Object.keys(data[0] || {}).map((key) => key !== 'id' && <th key={key}>{key}</th>)}
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-success me-2 mb-4" onClick={handlePatchData}>Save Changes</button>
            <button className="btn btn-secondary mb-4">Reset</button>
          </div>
        </div>

        {!isFullScreen && (
          <div className="col-md-3">
            <div className="menu">
              <h4>Switch Table</h4>
              <ul className="list-group">
                {Object.keys(tables).map((table) => (
                  <li
                    key={table}
                    className={`list-group-item ${table === currentTable ? 'active' : ''}`}
                    onClick={() => setCurrentTable(table)}
                  >
                    {table}
                  </li>
                ))}
              </ul>
              <div className="guidelines mt-4">
                <h5>Guidelines</h5>
                <p>
                  Completati tabelele de incadrare in invatamantul pre-universitar in conformitate cu legile actuale gasite: 
                  <a href="https://edu.ro/sites/default/files/_fi%C8%99iere/Minister/2023/Legi_educatie_Romania_educata/legi_monitor/Legea_invatamantului_preuniversitar_nr_198.pdf">
                    aici
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolDashboard;
