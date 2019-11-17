// @flow

export type TextFieldStyleInterface = {
  name: string,
  type: string,
  value: string,
  placeholder: string,
  label: string,
  onChange: function,
  fullWidth: boolean,
  multiline?: boolean,
  style?: {},
  rows?: number,
  errorMsg?: string,
  className?: string
};

export type accountAccess = {
  user: string,
  access: {},
  error_code?: string,
  error_msg?: string
};
