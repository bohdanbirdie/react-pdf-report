export type Styles = {
  red: string;
  gray: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
