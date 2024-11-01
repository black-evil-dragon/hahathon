import React from "react";

type useInputProps = {
    initial: string,
    required?: boolean
};

const useInput = (props: useInputProps) => {
    const [value, setValue] = React.useState(props.initial);
    const [error, setError] = React.useState({
        text: '',
        type: '',
    });

    const onBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        // ...

        if (!event.target.value && props.required) {
            setError({
                text: "Обязательное поле!",
                type: "error",
            });
        }
        else {
            setError({
                text: '',
                type: '',
            });
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // ...

        setValue(event.target.value)
    }


    return {
        value,
        onBlur,
        onChange,
        error,
    };
};

export default useInput;
