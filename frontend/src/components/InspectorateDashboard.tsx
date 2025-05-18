import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { Button, Modal, Spinner } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/logo.png';
import { GoogleGenAI } from '@google/genai';
import Messaging from './Messaging';
import { useAuth0 } from '@auth0/auth0-react';

type TableRow = {
    id: number;
    [key: string]: string | number | null;
};

type Option = { label: string; value: string };

const tableOptions: Option[] = [
    { label: 'Tabel 1A1', value: '1a1' },
    { label: 'Tabel 1A2', value: '1a2' }
];

const InspectorateDashboard: React.FC = () => {
    const [selectedTable, setSelectedTable] = useState(tableOptions[0].value);
    const [selectedPJ, setSelectedPJ] = useState('');
    const [schoolOptions, setSchoolOptions] = useState<Option[]>([]);
    const [data, setData] = useState<TableRow[]>([]);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [loading, setLoading] = useState(false);
    const tableRef = useRef<HTMLDivElement>(null);
    const [aiResponse, setAiResponse] = useState<string | null>(null); // To store AI response
    const [showModal, setShowModal] = useState(false); // For controlling modal visibility\
    const { user } = useAuth0()

    const columns = Object.keys(data[0] || {}).map((key) => ({
        key,
        label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())
    }));

    const fetchSchoolOptions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/table1a1/distinct-pjs');
            const options = response.data.map((pj: string) => ({
                label: pj,
                value: pj
            }));
            setSchoolOptions(options);
            if (options.length > 0) {
                setSelectedPJ(options[0].value);
            }
        } catch (error) {
            console.error('Error fetching school options:', error);
        }
    };



    const fetchData = async () => {
        if (!selectedPJ) return;
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/table1a1/by-pj?pj=${selectedPJ}`);
            const cleaned = response.data.map((row: TableRow) => {
                const newRow: TableRow = { ...row };
                Object.keys(newRow).forEach((key) => {
                    if (newRow[key] == null) newRow[key] = '';
                });
                return newRow;
            });
            setData(cleaned);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };
    const handleVerifyWithGemini = async () => {
        setShowModal(true)
        setLoading(true)

        const userTableData = data;
        console.log(JSON.stringify(data));

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        const ai = new GoogleGenAI({ apiKey: apiKey });

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

    useEffect(() => {
        fetchSchoolOptions();
    }, []);

    useEffect(() => {
        fetchData();
    }, [selectedTable, selectedPJ]);

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

    return (
        <div className={`container-fluid inspectorate-dashboard ${isFullScreen ? 'fullscreen' : ''}`} ref={tableRef}>
            <div className="text-center mt-5 mb-5">
                <img className="mb-3 app-logo" src={logo} alt="Logo" width="60" />
                <h1 className="mb-2">Inspectorate Dashboard</h1>
                <p className="lead">Verifică datele introduse de unități</p>
            </div>

            <div className="row mb-4 align-items-end">
                <div className="col-md-4">
                    <label className="form-label">Selectează unitatea (PJ):</label>
                    <select
                        className="form-select"
                        value={selectedPJ}
                        onChange={(e) => setSelectedPJ(e.target.value)}
                    >
                        {schoolOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <label className="form-label">Selectează tabelul:</label>
                    <select
                        className="form-select"
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                    >
                        {tableOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4 d-flex justify-content-end">
                    <button className="btn btn-outline-primary mt-3" onClick={toggleFullScreen}>
                        <i className="bi bi-arrows-fullscreen me-1"></i>
                        {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Se încarcă datele...</p>
                </div>
            ) : (
                <>
                    <div
                        className="table-container mb-2"
                        style={{
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            maxHeight: isFullScreen ? '60vh' : '500px',
                            border: '1px solid #dee2e6',
                            borderRadius: '0.5rem',
                        }}
                    >
                        <table className="table table-bordered table-hover">
                            <thead className="table-light sticky-top">
                                <tr>
                                    {columns.map((col) => (
                                        <th key={col.key} className="text-nowrap text-center align-middle">
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, rowIdx) => (
                                    <tr key={rowIdx}>
                                        {columns.map((col) => (
                                            <td key={col.key} className="text-nowrap align-middle">
                                                {row[col.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-end">
                        <button className="btn btn-AI mb-4 me-2" style={{ backgroundColor: '#6610f2', color: 'white' }} onClick={handleVerifyWithGemini}>
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                <i className="bi bi-robot" style={{ fontSize: '1.5rem' }}></i> Sugestii AI
                            </span>
                        </button>

                        <button className="btn btn-success me-2 mb-4">
                            <i className="bi bi-patch-check" style={{ marginRight: '5px' }}></i> Aprobare
                        </button>

                    </div>
                    {!isFullScreen? ( <div className="row mb-4">
                        <div className="col-md-6 mb-3">
                            <div className="card shadow border-0 h-100">
                                <div className="card-body">
                                    <h3 style={{ color: "#6610f2" }}>
                                        A.I. <i className="bi bi-robot ms-2" style={{ fontSize: '1.5rem' }}></i>
                                    </h3>
                                    <p>
                                        Utilizați sugestiile AI prin butonul aflat sub tabel, pentru a primi sugestii legate de corecții necesare în datele tale, folosind inteligența artificială!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="card shadow border-0 h-100">
                                <div className="card-body">
                                    <h3 style={{ color: "#6f42c1" }}>
                                        Chat <i className="bi bi-chat-dots ms-2"></i>
                                    </h3>
                                    <p>
                                        Utilizați funcția de chat găsită în partea de jos-dreapta a ecranului pentru a comunica cu inspectoratul școlar județean!
                                        Puteți primi sau trimite mesaje către această instituție.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>):null}
                   

                </>
            )}

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

            {!isFullScreen?(user?.pj && user?.email && (
                <Messaging key={selectedPJ} pj={selectedPJ} />
            )):null}

        </div>
    );
};

export default InspectorateDashboard;
