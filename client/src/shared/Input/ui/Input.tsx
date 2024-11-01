import React from 'react';

import useInput from '@hooks/useInput';
import { InputProps } from '@shared/Input/types';
// import '@styles/ui/input.scss'




const Input: React.FunctionComponent<InputProps> = ({
    className = '',
    onChange,

    type = 'text',
    name = '',
    placeholder = '',
    required = false,

    initialValue = '',
    suggestions = [],
    strictSuggestions = false,

}) => {

    const labelRef = React.useRef<HTMLDivElement>(null)
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const InputHook = useInput({
        initial: initialValue,
        required: required,
    })

    const [value, setValue] = React.useState(initialValue)
    const [focus, setFocus] = React.useState(initialValue ? true : false)
    const [filteredSuggestions, setFilteredSuggestions] = React.useState<string[]>([]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        if (type === 'number' && isNaN(Number(newValue))) return;

        setValue(newValue);
        onChange(newValue);


        if (suggestions.length > 0) {
            setFilteredSuggestions(suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(newValue.toLowerCase())
            ));
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        console.log(suggestion);
        setValue(suggestion);
        onChange(suggestion);
        setFilteredSuggestions([]);
    };



    React.useEffect(() => {
        if (placeholder && !value) {
            focus ?
                labelRef.current?.classList.add('moved')
                :
                labelRef.current?.classList.remove('moved')
        } else if (placeholder && value) {
            labelRef.current?.classList.add('moved')
        }
    }, [value, focus])


    return (
        <>
            <div
                className={`input-component ${className}`}
            >
                <div className="input-component__wrapper" ref={wrapperRef}>
                    {placeholder &&
                        <span className="label-form" ref={labelRef}>
                            {placeholder}
                            {required && <span className='required'> *</span>}
                        </span>
                    }

                    <input
                        type={type}

                        value={value}

                        onChange={handleChange}

                        onBlur={event => {
                            InputHook.onBlur(event);
                            setFocus(false)
                        }}
                        onFocus={event => setFocus(true)}
                    />
                </div>
                {filteredSuggestions.length > 0 && (
                    <div className="input-component__suggestions">
                        {filteredSuggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="input-component__suggestion"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
                {/* {
                    InputHook.error &&
                        <span className={`${InputHook.error.type}`}>
                            {InputHook.error.text}
                        </span>
                } */}
            </div>
        </>
    );
}

export default Input;