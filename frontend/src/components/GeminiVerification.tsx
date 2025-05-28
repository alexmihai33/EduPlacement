import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Modal, Spinner } from 'react-bootstrap';
import GradientButton from './buttons/GradientButton';

type GeminiVerificationProps = {
    tableData: any[];
};

const GeminiVerification: React.FC<GeminiVerificationProps> = ({ tableData }) => {
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleVerifyWithGemini = async () => {
        setShowModal(true);
        setLoading(true);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            const ai = new GoogleGenAI({ apiKey: apiKey });

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-04-17",
                contents: `
                Pentru următoarele datele
                ${JSON.stringify(tableData, null, 2)}
                Corectează-le dupa următoarele reguli: 
                1. valoare pentru specializare trebuie să fie "Filologie", "Matematică-Informatică", "Mecanică", "Arte Vizuale", "Engleză-Franceză", "Agricolă", "Psihologie", "Schi-Alpinism"
                2. numărul de copii pentru oricare dintre valori (propus/existent) trebuie sa fie intre 5 si 200 - NU SE APLICA PENTRU VALORI NULE, NU LE LUA IN CONSIDERARE PE ACELEA
                3. numărul de copii pentru oricare dintre valori (propus/existent) trebuie să fie intre 2 si 10 - NU SE APLICA PENTRU VALORI NULE, NU LE LUA IN CONSIDERARE PE ACELEA
                4. cuvintele trebuie să fie corecte din punct de vedere gramatical în limba română (dacă observi greșeli, punctează-le)
                Raspunde doar cu ce valori ai schimba din input și de ce (răspuns succint)
                Exemplu format răspuns (fiecare sugestie urmărește acest format): "Pe linia a 2-a, coloana filieră, valoarea ... ar trebui schimbata in ... | justificare: ..."
                Notite suplimentare: Cand denumesti coloana, NU PUNE NUMELE TABELEI (nrCopiiExistentAnteprescolar) deoarce nu este lizibil, ci transforma in valoarea de pe prima linia din coloana (Nr Copii Existent Anteprescolar) !FOARTE IMPORTANT
                Nu pune stelute sau alte caractere la inceput de randuri. Nu include in justificare numarul regulii pe care ti-am spus-o. In plus, include un spatiu intre randuri.
                Nu lua in considerare adjective - nu sugera schimbarea adjectivelor din feminin in masculin/vice-versa.
                !Verifica cu atentie fiecare coloana pentru a observa care dintre acestea nu respecta regulile.
                !Scrie in limba romana cu diacritice
                `,
            });

            setAiResponse(response.text ?? null);
        } catch (error) {
            console.error('Error with Gemini API:', error);
            setAiResponse("A apărut o eroare la procesarea cererii. Vă rugăm încercați din nou.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <GradientButton
                onClick={handleVerifyWithGemini}
                icon="bi-robot"
            >
                A.I. HELP
            </GradientButton>

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
                    <GradientButton
                        onClick={() => setShowModal(false)}

                    >
                        Închide
                    </GradientButton>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default GeminiVerification;