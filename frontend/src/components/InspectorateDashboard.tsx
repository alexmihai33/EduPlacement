import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { Modal, Spinner } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/logo.png';
import { GoogleGenAI } from '@google/genai';
import Messaging from './Messaging';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from "@mui/material"
import { styled } from '@mui/material/styles';

const GradientButton = styled(Button)({
    background: 'linear-gradient(45deg, #6610f2 30%, #9d4edd 90%)',
    border: 0,
    borderRadius: '10px',
    color: 'white',
    padding: '12px 28px',
    fontWeight: 700,
    letterSpacing: '1px',
    boxShadow: '0 3px 5px 2px rgba(102, 16, 242, .3)',
    backgroundSize: '200% auto',
    transition: '0.5s',
    '&:hover': {
        backgroundPosition: 'right center',
        boxShadow: '0 5px 10px 3px rgba(102, 16, 242, .4)',
        transform: 'translateY(-2px)'
    },
    '&:active': {
        transform: 'translateY(0)'
    }
});

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

type TableRow = {
    id: number;
    [key: string]: string | number | null;
};

type Option = { label: string; value: string };

const tableOptions: Option[] = [
    { label: 'Tabel 1A1', value: 'table1a1' },
    { label: 'Tabel 1A2', value: 'table1a2' },
    { label: 'Tabel 1B', value: 'table1b' }
];

// Format column labels the same way as in SchoolDashboard
const formatColumnLabel = (key: string): string => {
    return key
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, s => s.toUpperCase()) // Capitalize first letter
        .replace(/ Nr /g, ' Nr. ') // Add dot after Nr
        .replace(/ Gr /g, ' Gr. '); // Add dot after Gr
};

const InspectorateDashboard: React.FC = () => {
    const [selectedTable, setSelectedTable] = useState(tableOptions[0].value);
    const [selectedPJ, setSelectedPJ] = useState('');
    const [schoolOptions, setSchoolOptions] = useState<Option[]>([]);
    const [data, setData] = useState<TableRow[]>([]);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [loading, setLoading] = useState(false);
    const tableRef = useRef<HTMLDivElement>(null);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const { user } = useAuth0()

    // Format columns using the same transformation as SchoolDashboard
    const columns = (() => {
        if (data.length === 0) return [];

        const firstRow = data[0];
        return Object.keys(firstRow)
            .filter(key => key !== 'id') // Exclude id column
            .map((key) => ({
                key,
                label: formatColumnLabel(key)
            }));
    })();

    const handleExportExcel = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/export/${selectedTable}?pj=${selectedPJ}`, {
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

    const fetchSchoolOptions = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/${selectedTable}/distinct-pjs`);
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
            const response = await axios.get(`http://localhost:8080/api/${selectedTable}/by-pj?pj=${selectedPJ}`);
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
    }, [selectedTable]);

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
                <h1 className="mb-2">Tabelele Unităților</h1>
            </div>

            <div className="row mb-4 align-items-end">
                <div className="col-md-4 position relative">
                    <label className="form-label">Selectează unitatea (PJ):</label>
                    <select
                        className="form-select glass-select"
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
                        className="form-select glass-select"
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
                                            {/* Split multi-line labels */}
                                            {col.label.split('\n').map((line, index) => (
                                                <div key={index}>{line}</div>
                                            ))}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, rowIdx) => (
                                    <tr key={rowIdx}>
                                        {columns.map((col) => (
                                            <td key={col.key} className="text-nowrap align-middle">
                                                {row[col.key] ?? ''}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap mb-5">
                        <div className="d-flex gap-2 mb-2">
                            <BorderAnimationButton
                                variant="outlined"
                                onClick={toggleFullScreen}
                                style={{
                                    padding: '8px 16px',
                                    borderWidth: '1px',
                                    opacity: 0.85,
                                }}
                            >
                                <i className={`bi ${isFullScreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'} me-1`}></i>
                                {isFullScreen ? 'Ieșire ecran complet' : 'Ecran complet'}
                            </BorderAnimationButton>
                        </div>


                        <div className="d-flex gap-2 mb-2">
                            <GradientButton
                                className="btn-AI"
                                onClick={handleVerifyWithGemini}
                            >
                                <i className="bi bi-robot me-2"></i> Sugestii AI
                            </GradientButton>

                            <GradientButton variant="outlined" onClick={handleExportExcel}>
                                <i className="bi bi-file-earmark-arrow-down me-2"></i> Export
                            </GradientButton>
                        </div>
                    </div>

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
                                        <p className="mb-0">Puteți selecta un alt tabel folosind meniul "Selectează tabelul" din partea de sus</p>
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
                                        <i className="bi bi-arrow-clockwise fs-5"></i>
                                    </div>
                                    <div>
                                        <h6 className="mb-1" style={{ fontWeight: 600 }}>Schimbare PJ</h6>
                                        <p className="mb-0">
                                            Selectați PJ-ul dorit cu meniul "Selectează unitatea (PJ)" din partea de sus
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
                                        <p className="mb-0">Folosiți "Sugestii AI" pentru detectarea posibilelor greșeli</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="d-flex">
                                    <div className="me-3" style={{ color: '#6610f2' }}>
                                        <i className="bi bi-chat-dots fs-5"></i>
                                    </div>
                                    <div>
                                        <h6 className="mb-1" style={{ fontWeight: 600 }}>Comunicare Școli</h6>
                                        <p className="mb-0">Utilizați funcția de chat pentru comunicarea cu școlile</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
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
                    <GradientButton onClick={() => setShowModal(false)} style={{
                        backgroundColor: '#6f42c1', color: "white"
                    }}>
                        Închide
                    </GradientButton>
                </Modal.Footer>
            </Modal>

            {!isFullScreen ? (user?.pj && user?.email && (
                <Messaging key={selectedPJ} pj={selectedPJ} />
            )) : null}
        </div>
    );
};

export default InspectorateDashboard;