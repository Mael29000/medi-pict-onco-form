import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { QRCode } from 'react-qr-svg';
import { useTraitmentsContext } from '../contexts/TraitmentsContext';

const styles = {
  root: {
    fontFamily: 'sans-serif',
  },
  h1: {
    textAlign: 'center',
  },
  qrcode: {
    textAlign: 'center',
  },
};


export default function QrCode(){
    const {allTraitments} = useTraitmentsContext();
    useEffect(() => {
    // componentDidMount logic
    }, []);
    return (
        <div style={styles.root}>
            <QRCode
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="Q"
                style={{ width: 256 }}
                value={JSON.stringify(allTraitments)}
            />
        </div>
    );
}