import "./Scanner.css";
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import QrDecoder from './QrDecoder';

const Scanner = () => {
    const [ scanResult, setScanResult ] = useState(null);
    const [ QRFields, setQRFields ] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });
    
        scanner.render(success, error);
    
        function success(result) {
            scanner.clear();
            setScanResult(result);
            setQRFields(QrDecoder(result));
        }
    
        function error(err) {
            console.warn(err);
        }
    }, []);

    return (
        <div className="Scanner">
            {scanResult ?
                <>
                    <h2>Success</h2>
                    <div className="qr-string">
                        <p>{scanResult}</p>
                    </div>
                    {QRFields &&
                        <div className="qr-fields">
                            {
                                Object.entries(QRFields).map((field) => {
                                    if (typeof field[1] === "object" && field[1] !== null) {
                                        return (
                                            <>
                                                <span><b>{field[0]}</b>: </span>
                                                <div className="qr-subfields">
                                                    {
                                                        Object.entries(field[1]).map((subfield) => {
                                                            return (
                                                                <>
                                                                    <span><b>{subfield[0]}</b>:  {subfield[1]}</span>
                                                                    <br />
                                                                </>
                                                            )
                                                        })                                                 
                                                    }
                                                </div>
                                            </>
                                        );
                                        
                                    }
                        
                                    return (
                                        <>
                                            <span><b>{field[0]}</b>: {field[1]}</span> 
                                            <br />
                                        </>
                                    )
                                })
                            }
                        </div>
                    }
                </> :
                <div id="reader"></div>        
            }
        </div>
    );
}

export default Scanner;