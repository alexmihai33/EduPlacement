import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { Spinner } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/logo.png';
import Messaging from './Messaging';
import { useAuth0 } from '@auth0/auth0-react';
import GeminiVerification from './GeminiVerification';
import BorderAnimationButton from './buttons/BorderAnimationButton';
import GradientButton from './buttons/GradientButton';

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

const formatColumnLabel = (key: string): string => {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, s => s.toUpperCase()) 
        .replace(/ Nr /g, ' Nr. ') 
        .replace(/ Gr /g, ' Gr. '); 
};

const InspectorateDashboard: React.FC = () => {
    const [selectedTable, setSelectedTable] = useState(tableOptions[0].value);
    const [selectedPJ, setSelectedPJ] = useState('');
    const [schoolOptions, setSchoolOptions] = useState<Option[]>([]);
    const [data, setData] = useState<TableRow[]>([]);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [loading, setLoading] = useState(false);
    const tableRef = useRef<HTMLDivElement>(null);
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
            const response = await axios.get(`https://eduplacement-4.onrender.com/api/export/${selectedTable}?pj=${selectedPJ}`, {
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
            const response = await axios.get(`https://eduplacement-4.onrender.com/api/${selectedTable}/distinct-pjs`);
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
            const response = await axios.get(`https://eduplacement-4.onrender.com/api/${selectedTable}/by-pj?pj=${selectedPJ}`);
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
                                    <th className="row-number-header">Nr.</th>
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
                                        <td className="row-number-cell">{rowIdx + 1}</td>
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
                                onClick={toggleFullScreen}
                                icon={isFullScreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'}
                            >
                                {isFullScreen ? 'Ieșire ecran complet' : 'Ecran complet'}
                            </BorderAnimationButton>
                        </div>


                        <div className="d-flex gap-2 mb-2">
                            <GeminiVerification tableData={data} />

                            <GradientButton
                                onClick={handleExportExcel}
                                icon="bi-file-earmark-arrow-down"
                            >
                                Export
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

            {!isFullScreen ? (user?.pj && user?.email && (
                <Messaging key={selectedPJ} pj={selectedPJ} />
            )) : null}
        </div>
    );
};

export default InspectorateDashboard;