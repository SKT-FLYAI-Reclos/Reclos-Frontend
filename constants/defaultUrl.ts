// export const defaultUrl = 'http://52.78.115.75/';
export const defaultUrlDevelopment = 'http://52.78.115.75/';
export const defaultUrlProduction = 'http://52.78.115.75/';
// export const defaultUrlDevelopment = 'http://localhost:3000/v2/';
// export const defaultUrlProduction = 'https://reclos.vercel.app/v2/';

export const defaultUrl = process.env.NODE_ENV === 'development' ? defaultUrlDevelopment : defaultUrlProduction;
