export type Styles = {
  h1: string;
  h2: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
