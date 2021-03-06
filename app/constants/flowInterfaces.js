//@flow

export type TextFieldStyleInterface = {|
  type: string,
  value: string,
  placeholder: string,
  label: string,
  onChange: function,
  fullWidth: boolean,
  multiline?: boolean,
  style?: {},
  rows?: number,
  errorMsg?: string
|};

export type accountAccess = {
  user: string,
  access: {},
  error_code?: string,
  errorg_msg?: string
};
