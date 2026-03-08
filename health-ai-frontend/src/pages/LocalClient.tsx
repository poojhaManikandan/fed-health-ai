import { motion } from 'framer-motion';
import {
    CheckCircle, Download
} from 'lucide-react';
import './LocalClient.css';

export default function LocalClient() {
    // Download Hospital Node Setup (.exe)
    const downloadNodeSetup = () => {
        const url = '/FedHealthAI_HospitalNodeSetup.exe';
        const a = document.createElement('a');
        a.href = url;
        a.download = 'FedHealthAI_HospitalNodeSetup.exe';
        a.click();
    };

    return (
        <div className="local-page">
            <div className="container">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="local-header">
                    <div>
                        <span className="mono-tag">// local_client</span>
                        <h1 style={{ marginTop: '0.75rem' }}>Hospital Node Setup</h1>
                        <p style={{ marginTop: '0.5rem', maxWidth: 520, color: 'var(--text-secondary)' }}>
                            Download the Hospital Node application to run local training and upload secure updates. All training happens on your computer—no coding required.
                        </p>
                    </div>
                    <div className="privacy-badge-group">
                        <span className="badge badge-green"><CheckCircle size={11} /> Data Stays Local</span>
                        <span className="badge badge-amber">ε-DP Protected</span>
                        <span className="badge badge-blue">Federated</span>
                    </div>
                </motion.div>

                <div className="local-layout">
                    {/* Download Hospital Node Setup (.exe) */}
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <button className="btn btn-primary btn-lg" style={{ width: '100%', maxWidth: 320 }} onClick={downloadNodeSetup}>
                            <Download size={16} />Download Hospital Node Setup
                        </button>
                        <p className="mono-tag" style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                            For Windows · No coding required
                        </p>
                    </div>

                    {/* Placeholder to maintain vertical spacing if needed or simply to keep layout consistent */}
                    <div style={{ marginBottom: '2rem' }}></div>

                    {/* Instructions */}
                    <div className="card" style={{ margin: '0 auto', maxWidth: 600, textAlign: 'left' }}>
                        <h3>How It Works</h3>
                        <ol style={{ marginLeft: 20, marginTop: 10, color: 'var(--text-secondary)' }}>
                            <li>Download the Hospital Node Setup (.exe).</li>
                            <li>Run the Hospital Node app on your computer.</li>
                            <li>Select a disease model and upload your patient dataset (CSV).</li>
                            <li>Local training runs automatically—no coding required.</li>
                            <li>Secure update is uploaded to the central server immediately.</li>
                            <li>Global model on the website improves with every update.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
