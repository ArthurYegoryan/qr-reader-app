const QrDecoder = (QR) => {
    console.log("QR: ", QR);

    const QRFields = {};

    for (let i = 0; i < 11; i++) {
        const fieldKey = QR.slice(0, 2);

        const fieldLength = Number(QR.slice(2, 4));
        let fieldValue = "";

        for (let j = 4; j < 4 + fieldLength; j++) {
            fieldValue += QR[j];
        }

        if (fieldKey === "29") {
            let subFields = fieldValue;
            fieldValue = {};

            for (let k = 0; k < 3; k++) {
                const subFieldKey = subFields.slice(0, 2);
                const subFieldLength = Number(subFields.slice(2, 4));
                let subFieldieldValue = "";

                for (let j = 4; j < 4 + subFieldLength; j++) {
                    subFieldieldValue += subFields[j];
                }

                fieldValue[subFieldKey] = subFieldieldValue;

                subFields = subFields.slice(4 + subFieldieldValue.length);
            }
        } else if (fieldKey === "62") {
            let subFields = fieldValue;
            fieldValue = {};

            for (let k = 0; k < 5; k++) {
                const subFieldKey = subFields.slice(0, 2);
                const subFieldLength = Number(subFields.slice(2, 4));
                let subFieldieldValue = "";

                for (let j = 4; j < 4 + subFieldLength; j++) {
                    subFieldieldValue += subFields[j];
                }

                fieldValue[subFieldKey] = subFieldieldValue;

                subFields = subFields.slice(4 + subFieldieldValue.length);
            }
        }

        QRFields[fieldKey] = fieldValue;

        QR = QR.slice(4 + fieldLength);
    }

    return QRFields;
}

export default QrDecoder;