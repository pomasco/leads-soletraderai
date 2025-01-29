export interface FormFieldBase {
  id: string;
  type: string;
  label: string;
  description?: string;
  required: boolean;
  order: number;
}

export interface TextFieldConfig extends FormFieldBase {
  type: 'text';
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
}

export interface NumberFieldConfig extends FormFieldBase {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

export interface SelectFieldConfig extends FormFieldBase {
  type: 'select';
  options: Array<{
    label: string;
    value: string;
  }>;
  multiple?: boolean;
}

export interface LocationFieldConfig extends FormFieldBase {
  type: 'location';
  defaultCountry?: string;
  restrictToCountries?: string[];
}

export interface KeywordsFieldConfig extends FormFieldBase {
  type: 'keywords';
  maxItems: number;
  suggestions?: string[];
}

export type FormFieldConfig = 
  | TextFieldConfig 
  | NumberFieldConfig 
  | SelectFieldConfig
  | LocationFieldConfig
  | KeywordsFieldConfig;

export interface FormConfig {
  id: string;
  name: string;
  description?: string;
  fields: FormFieldConfig[];
  validation: Record<string, any>;
  metadata: {
    version: string;
    lastUpdated: string;
    author: string;
  };
}