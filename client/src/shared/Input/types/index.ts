export type InputProps = {
    onChange: any,

    className?: string,

    type?: 'text' | 'tel' | 'number',
    name?: string,
    initialValue?: string,

    placeholder?: string,
    required?: boolean,

    suggestions?: string[];
    strictSuggestions?: boolean;
}