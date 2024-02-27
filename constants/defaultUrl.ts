// export const defaultUrlDevelopment = 'http://52.78.115.75/';
export const defaultUrlDevelopment = 'http://172.23.251.72:80/';
export const defaultUrlProduction = 'http://52.78.115.75/';

export const defaultUrl = process.env.NODE_ENV === 'development' ? defaultUrlDevelopment : defaultUrlProduction;
