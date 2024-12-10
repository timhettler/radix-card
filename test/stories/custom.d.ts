declare module "*.module.css";
declare module "*.module.scss";

declare module "*.png" {
  const value: string;
  export = value;
}

declare module "*.svg" {
  const value: string;
  export = value;
}
