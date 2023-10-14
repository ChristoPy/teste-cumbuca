// adapted from: https://github.com/carvalhoviniciusluiz/cpf-cnpj-validator/tree/master/types
declare module 'cpf-cnpj-validator' {
  export const cpf: {
    verifierDigit: (digits: string) => number;
    strip: (number: string, strict?: boolean) => string;
    format: (number: string) => string;
    isValid: (number: string, strict?: boolean) => boolean;
    generate: (formatted?: boolean) => string;
  };

  export const cnpj: {
    verifierDigit: (digits: string) => number;
    strip: (number: string, strict?: boolean) => string;
    format: (number: string) => string;
    isValid: (number: string, strict?: boolean) => boolean;
    generate: (formatted?: boolean) => string;
  };

  export const validator: (joi: any) => {
    type: string;
    base: any;
    messages: {
      'document.cpf': string;
      'document.cnpj': string;
    };
    rules: {
      cpf: {
        validate(value: any, helpers: any, args: any, options: any): any;
      };
      cnpj: {
        validate(value: any, helpers: any, args: any, options: any): any;
      };
    };
  };
}
