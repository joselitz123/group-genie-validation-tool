import React from 'react';
import TextFieldComponent from '../ReusableComponent/TextFieldComponent/textField';

const ImportField = () => {

    const props = {
        type: "file",
        value: "",
        label: "Import Filters",
        placeholder: "What is the display name of the group?",
        fullWidth: false
    }
    

    return (
        <TextFieldComponent {...props} />
    )

}


export default ImportField;